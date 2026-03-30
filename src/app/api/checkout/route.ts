import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { sendTelegramNotification } from '@/lib/telegram';

export async function POST(req: Request) {
  try {
    const { items, totalAmount, customerDetails } = await req.json();

    if (!customerDetails || !customerDetails.name) {
      return NextResponse.json({ error: 'Data pengiriman tidak lengkap. Mohon isi form alamat dengan benar.' }, { status: 400 });
    }

    const clientId = process.env.DOKU_CLIENT_ID;
    const secretKey = process.env.DOKU_SECRET_KEY;
    const apiUrl = process.env.DOKU_API_URL;

    if (!clientId || !secretKey || !apiUrl) {
      return NextResponse.json({ error: 'DOKU configuration missing' }, { status: 500 });
    }

    const requestId = Date.now().toString();
    const timestamp = new Date().toISOString().split('.')[0] + 'Z'; // UTC ISO8601
    const invoiceNumber = 'DMPOS-' + Date.now();
    const targetPath = '/checkout/v1/payment';

    // Format data untuk dikirim balik di URL (Minified)
    const simplifiedItems = items.map((item: any) => ({
      n: item.name,
      p: item.price,
      q: item.quantity
    }));
    const encodedItems = Buffer.from(JSON.stringify(simplifiedItems)).toString('base64');
    const encodedCustomer = Buffer.from(JSON.stringify({ 
      n: customerDetails.name, 
      w: customerDetails.whatsapp,
      a: `${customerDetails.addressDetail}, ${customerDetails.district}, ${customerDetails.city}, ${customerDetails.province}`
    })).toString('base64');

    // Format nomor HP ke standar internasional (628...)
    let phone = customerDetails.whatsapp.replace(/\D/g, '');
    if (phone.startsWith('0')) {
      phone = '62' + phone.substring(1);
    }

    const body = {
      order: {
        amount: totalAmount,
        invoice_number: invoiceNumber,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?invoice=${invoiceNumber}&items=${encodedItems}&customer=${encodedCustomer}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel?invoice=${invoiceNumber}&items=${encodedItems}&customer=${encodedCustomer}`,
        auto_redirect: true,
      },
      payment: {
        payment_due_date: 60, // 60 minutes
      },
      customer: {
        name: customerDetails.name.substring(0, 50),
        email: customerDetails.email || 'customer@dmpos.id',
        phone: phone,
        address: `${customerDetails.addressDetail}, ${customerDetails.district}, ${customerDetails.city}, ${customerDetails.province}`.substring(0, 255)
      }
    };

    const minifiedBody = JSON.stringify(body);
    const digest = crypto.createHash('sha256').update(minifiedBody, 'utf8').digest('base64');
    
    const stringToSign = `Client-Id:${clientId}\n` +
                         `Request-Id:${requestId}\n` +
                         `Request-Timestamp:${timestamp}\n` +
                         `Request-Target:${targetPath}\n` +
                         `Digest:${digest}`;

    const signature = crypto.createHmac('sha256', secretKey)
      .update(stringToSign)
      .digest('base64');

    const response = await fetch(`${apiUrl}${targetPath}`, {
      method: 'POST',
      headers: {
        'Client-Id': clientId,
        'Request-Id': requestId,
        'Request-Timestamp': timestamp,
        'Signature': `HMACSHA256=${signature}`,
        'Content-Type': 'application/json',
      },
      body: minifiedBody,
    });

    const data = await response.json();

    if (data.response && data.response.payment && data.response.payment.url) {
      // Send Telegram Notification to Admin
      const itemsList = items.map((item: any) => `- ${item.name} (x${item.quantity})`).join('\n');
      const customerInfo = `<b>👤 Pembeli:</b> ${customerDetails.name}\n` +
                           `<b>📱 WhatsApp:</b> ${customerDetails.whatsapp}\n` +
                           `<b>📍 Alamat:</b> ${customerDetails.addressDetail}, ${customerDetails.district}, ${customerDetails.city}, ${customerDetails.province}`;

      const message = `<b>🚀 PESANAN BARU MASUK!</b>\n\n` +
                      `${customerInfo}\n\n` +
                      `<b>No. Invoice:</b> <code>${invoiceNumber}</code>\n` +
                      `<b>Total:</b> Rp ${totalAmount.toLocaleString('id-ID')}\n\n` +
                      `<b>📦 Barang:</b>\n${itemsList}\n\n` +
                      `<a href="${data.response.payment.url}">Link Pembayaran DOKU</a>`;
      
      await sendTelegramNotification(message);

      return NextResponse.json({ url: data.response.payment.url });
    } else {
      console.error('DOKU API Error Details:', JSON.stringify(data, null, 2));
      
      // Jika error dari DOKU, kita kirimkan status code aslinya biar gampang debug
      const errorMsg = data?.error?.message || data?.message || 'Gagal terhubung ke metode pembayaran';
      return NextResponse.json({ error: errorMsg, details: data }, { status: response.status || 500 });
    }
  } catch (err: any) {
    console.error('Checkout API Route Error:', err);
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
