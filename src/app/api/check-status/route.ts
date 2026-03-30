import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const invoiceNumber = searchParams.get('invoice')?.trim();

    if (!invoiceNumber) {
      return NextResponse.json({ error: 'Invoice number is required' }, { status: 400 });
    }

    const clientId = (process.env.DOKU_CLIENT_ID || '').trim();
    const secretKey = (process.env.DOKU_SECRET_KEY || '').trim();
    const apiUrl = (process.env.DOKU_API_URL || '').trim();

    if (!clientId || !secretKey || !apiUrl) {
      return NextResponse.json({ error: 'DOKU configuration missing' }, { status: 500 });
    }

    const requestId = Date.now().toString();
    const timestamp = new Date().toISOString().split('.')[0] + 'Z'; 

    // MENCOBA BEBERAPA PATH (DOKU Kadang membingungkan antar versi)
    const pathsToTry = [
      `/orders/v1/status/${invoiceNumber}`,
      `/checkout/v1/payment-status/${invoiceNumber}`
    ];

    let lastData = null;

    for (const targetPath of pathsToTry) {
        // Signature GET (No Digest)
        const stringToSign = `Client-Id:${clientId}\n` +
                             `Request-Id:${requestId}\n` +
                             `Request-Timestamp:${timestamp}\n` +
                             `Request-Target:${targetPath}`;

        const signature = crypto.createHmac('sha256', secretKey)
          .update(stringToSign)
          .digest('base64');

        const response = await fetch(`${apiUrl}${targetPath}`, {
          method: 'GET',
          headers: {
            'Client-Id': clientId,
            'Request-Id': requestId,
            'Request-Timestamp': timestamp,
            'Signature': `HMACSHA256=${signature}`
          },
          cache: 'no-store'
        });

        const data = await response.json();
        lastData = data;

        // Jika fungsional (bukan 404 atau Signature Error), kita pakai hasilnya
        if (response.status === 200 && (data.transaction || data.response)) {
            const transaction = data?.transaction || data?.response?.transaction;
            const dokuStatus = (transaction?.status || 'PENDING').toUpperCase();
            
            return NextResponse.json({ 
              status: dokuStatus,
              path: targetPath,
              raw: data 
            });
        }
    }

    // Jika semua path dicoba tetap tidak ketemu (atau error)
    return NextResponse.json({ 
        status: 'PENDING', 
        message: 'Belum ada data dari DOKU',
        raw: lastData 
    });

  } catch (err: any) {
    console.error('Check Status API Error:', err);
    return NextResponse.json({ status: 'ERROR', message: err.message }, { status: 500 });
  }
}
