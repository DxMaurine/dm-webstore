'use client';
import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navigation } from '../../../components/Navigation';
import { Footer } from '../../../components/Footer';
import { CheckCircle, ArrowRight, Clock, XCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext';

export default function PaymentSuccessPage() {
  const { clearCart } = useCart();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'success' | 'pending' | 'failed' | 'checking'>('checking');
  const [invoice, setInvoice] = useState<string | null>(null);

  useEffect(() => {
    const inv = searchParams.get('invoice');
    setInvoice(inv);

    const checkPaymentStatus = async () => {
      if (!inv) {
        setStatus('pending');
        return;
      }

      try {
        const res = await fetch(`/api/check-status?invoice=${inv}`);
        const data = await res.json();
        
        const finalStatus = data.status?.toUpperCase();

        if (['SUCCESS', 'PAID', 'SETTLEMENT', 'DONE'].includes(finalStatus)) {
          setStatus('success');
          clearCart();
        } else if (['FAILED', 'CANCEL'].includes(finalStatus)) {
          setStatus('failed');
          router.push(`/payment/cancel?invoice=${inv}`);
        } else {
          setStatus('pending');
        }
      } catch (err) {
        console.error('Status check failed:', err);
        setStatus('pending');
      }
    };

    checkPaymentStatus();
    
    // Auto refresh status every 10 seconds if it's still pending
    const interval = setInterval(() => {
      if (status === 'pending' || status === 'checking') {
        checkPaymentStatus();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [searchParams, status]);

  return (
    <div className="bg-white min-h-screen selection:bg-primary/20">
      <Navigation />
      
      <main className="pt-40 pb-24 lg:pt-56 lg:pb-40">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <div className="space-y-8 animate-scale-up">
            
            {status === 'success' && (
              <>
                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/10">
                  <CheckCircle size={56} strokeWidth={2.5} />
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-6xl font-black text-secondary font-outfit uppercase tracking-tighter italic">
                    Pembayaran <span className="text-primary">Berhasil!</span>
                  </h1>
                  <p className="text-lg text-muted font-medium leading-relaxed">
                    Terima kasih telah mempercayakan kebutuhan hardware bisnis Anda kepada DM POS. Pesanan Anda sedang kami proses.
                  </p>
                </div>
              </>
            )}

            {status === 'pending' && (
              <>
                <div className="w-24 h-24 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-blue-500/10">
                  <Clock size={56} strokeWidth={2.5} />
                </div>
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-6xl font-black text-secondary font-outfit uppercase tracking-tighter italic">
                    Menunggu <span className="text-blue-500">Konfirmasi.</span>
                  </h1>
                  <p className="text-lg text-muted font-medium leading-relaxed">
                    Terima kasih! Kami sedang menunggu konfirmasi pembayaran dari sistem. Jika Anda sudah membayar, pesanan akan segera diproses.
                  </p>
                </div>
              </>
            )}

            {status === 'checking' && (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="font-black text-secondary uppercase tracking-widest text-xs">Memvalidasi Status...</p>
              </div>
            )}

            <div className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-4">
              <div className="flex items-center justify-center gap-2 text-primary">
                <AlertCircle size={18} />
                <p className="text-sm font-black uppercase tracking-widest">Penting untuk Diketahui</p>
              </div>
              <p className="text-muted text-sm font-medium">
                Admin kami akan menghubungi Anda melalui WhatsApp (<b>0851-1704-2204</b>) untuk konfirmasi akhir dan pengiriman resi.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/" className="btn-primary flex items-center justify-center gap-2 px-10">
                Kembali ke Beranda <ArrowRight size={20} />
              </Link>
              <a href="https://wa.me/6285117042204" target="_blank" className="bg-white border-2 border-primary text-primary font-black py-4 px-10 rounded-2xl hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                Konfirmasi via WA
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
