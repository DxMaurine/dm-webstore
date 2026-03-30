import { NextResponse } from 'next/server';
import { sendTelegramNotification } from '@/lib/telegram';

export async function POST(req: Request) {
  try {
    const { name, whatsapp, invoiceNumber } = await req.json();

    const message = `<b>❌ PESANAN DIBATALKAN!</b>\n\n` +
                    `<b>👤 Pembeli:</b> ${name}\n` +
                    `<b>📱 WhatsApp:</b> ${whatsapp}\n` +
                    `<b>No. Invoice:</b> <code>${invoiceNumber}</code>\n\n` +
                    `<i>Saran: Bapak bisa coba hubungi pembeli untuk menanyakan kendala pembayarannya.</i>`;
    
    await sendTelegramNotification(message);

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Notify Cancel Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
