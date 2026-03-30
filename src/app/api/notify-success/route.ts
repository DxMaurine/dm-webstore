import { NextResponse } from 'next/server';
import { sendTelegramNotification } from '@/lib/telegram';

export async function POST(req: Request) {
  try {
    const { name, whatsapp, invoiceNumber, totalAmount, items } = await req.json();

    const itemsList = items.map((item: any) => `- ${item.n} (x${item.q})`).join('\n');

    // Compress data for URL to avoid Telegram truncation
    const compressedData = Buffer.from(JSON.stringify({
      n: name,
      w: whatsapp,
      t: totalAmount,
      i: items
    })).toString('base64');

    const message = `<b>✅ PEMBAYARAN BERHASIL!</b>\n\n` +
                    `<b>👤 Pembeli:</b> ${name}\n` +
                    `<b>📱 WhatsApp:</b> ${whatsapp}\n` +
                    `<b>No. Invoice:</b> <code>${invoiceNumber}</code>\n` +
                    `<b>Total:</b> Rp ${totalAmount.toLocaleString('id-ID')}\n\n` +
                    `<b>📦 Barang:</b>\n${itemsList}\n\n` +
                    `<a href="${process.env.NEXT_PUBLIC_BASE_URL}/invoice/${invoiceNumber}?d=${compressedData}">Lihat Digital Invoice</a>`;
    
    await sendTelegramNotification(message);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Notify Success Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
