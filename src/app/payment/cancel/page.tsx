'use client';
import React, { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { XCircle, MessageCircle, ArrowLeft, RefreshCw, HelpCircle } from 'lucide-react';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';

function CancelContent() {
  const searchParams = useSearchParams();
  const invoice = searchParams.get('invoice');
  const name = searchParams.get('name');
  const whatsapp = searchParams.get('whatsapp');

  useEffect(() => {
    // Send notification to admin that the order was cancelled
    if (invoice && name && whatsapp) {
      fetch('/api/notify-cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoiceNumber: invoice, name, whatsapp }),
      }).catch(err => console.error('Failed to notify cancel', err));
    }
  }, [invoice, name, whatsapp]);

  const contactWA = () => {
    const waNumber = '6285117042204'; // Official DM POS WA
    const msg = `Halo Admin DM POS, saya ${name || 'ingin bertanya'} terkait pesanan ${invoice ? 'Inv: ' + invoice : ''} yang tadi batal bayar. Bisa bantu?`;
    window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="bg-gray-50 min-h-screen selection:bg-primary/20">
      <Navigation />
      
      <main className="pt-32 pb-24 lg:pt-48 lg:pb-40">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            
            {/* Cancel Card */}
            <div className="bg-white rounded-[3rem] p-12 lg:p-20 text-center border border-gray-100 shadow-2xl shadow-black/5 space-y-12 animate-scale-up">
              
              {/* Icon */}
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto">
                  <XCircle size={64} />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg text-primary">
                  <HelpCircle size={24} />
                </div>
              </div>

              <div className="space-y-4 max-w-2xl mx-auto">
                <h1 className="text-4xl lg:text-6xl font-black text-secondary font-outfit uppercase tracking-tighter leading-tight italic">
                  Pembayaran <span className="text-red-500">Dibatalkan.</span>
                </h1>
                <p className="text-lg font-medium text-muted leading-relaxed">
                  Tenant tenang saja, pesanan Anda <b>{invoice}</b> belum diproses. Mungkin ada kendala metode pembayaran atau ingin mengganti item?
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto pt-4">
                <button 
                  onClick={contactWA}
                  className="flex items-center justify-center gap-3 bg-secondary text-white py-6 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all active:scale-95 shadow-xl shadow-black/10"
                >
                  <MessageCircle size={20} /> Hubungi Support WA
                </button>
                
                <Link 
                  href="/#hardware"
                  className="flex items-center justify-center gap-3 bg-white border-2 border-gray-100 text-secondary py-6 rounded-2xl font-black text-sm uppercase tracking-widest hover:border-primary hover:text-primary transition-all active:scale-95"
                >
                  <RefreshCw size={20} /> Coba Keluar Lagi
                </Link>
              </div>

              <div className="h-px bg-gray-50 w-full"></div>

              <Link href="/" className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs hover:gap-4 transition-all">
                <ArrowLeft size={16} /> Kembali ke Beranda
              </Link>
            </div>

            {/* Support Message */}
            <div className="mt-12 text-center">
              <p className="text-muted font-bold flex items-center justify-center gap-2">
                Punya pertanyaan lain? <span onClick={contactWA} className="text-primary underline cursor-pointer">Live Chat dengan kami</span>
              </p>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CancelPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <CancelContent />
    </Suspense>
  );
}
