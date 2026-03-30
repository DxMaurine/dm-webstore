'use client';
import React, { useMemo, useRef, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Printer, Download, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function InvoiceContent({ params }: { params: { invoiceNumber: string } }) {
  const searchParams = useSearchParams();
  const invoiceRef = useRef<HTMLDivElement>(null);
  
  const invoiceNumber = params.invoiceNumber;
  const dataParam = searchParams.get('d');

  const data = useMemo(() => {
    try {
      if (!dataParam) return null;
      
      // Menggunakan atob (browser standard) alih-alih Buffer (Node component)
      // Ditambah decodeURIComponent(escape()) untuk mendukung karakter UTF-8 spesial
      const decodedString = decodeURIComponent(escape(window.atob(dataParam)));
      const decoded = JSON.parse(decodedString);
      
      const items = decoded.i || [];
      const subtotal = items.reduce((acc: number, item: any) => acc + (item.p * item.q), 0);
      const tax = 0; 
      const total = decoded.t || subtotal;
      const customer = {
        n: decoded.n,
        w: decoded.w,
        a: decoded.a || '(Alamat Pengiriman Sesuai Data Checkout)'
      };

      return { items, customer, subtotal, tax, total };
    } catch (e) {
      console.error('Invoice data error', e);
      return null;
    }
  }, [dataParam]);

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;
    
    // Memberi sedikit waktu agar browser siap rendering
    const canvas = await html2canvas(invoiceRef.current, {
      scale: 3, // Lebih tajam
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice-${invoiceNumber}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-secondary">Data Invoice Tidak Ditemukan</h1>
          <Link href="/" className="text-primary hover:underline">Kembali ke Beranda</Link>
        </div>
      </div>
    );
  }

  const dateStr = new Date().toLocaleDateString('id-ID', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-gray-100 py-12 lg:py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Actions Bar - JANGAN DI-PRINT */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-200 no-print">
          <Link href="/" className="flex items-center gap-2 text-muted hover:text-secondary font-bold text-sm transition-all group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke DM POS
          </Link>
          
          <div className="flex gap-3">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 bg-white border border-gray-200 text-secondary px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-50 transition-all"
            >
              <Printer size={18} /> Cetak
            </button>
            <button 
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-secondary text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-black transition-all shadow-lg shadow-black/10"
            >
              <Download size={18} /> Download PDF
            </button>
          </div>
        </div>

        {/* Invoice Container for PDF/Print */}
        <div 
          ref={invoiceRef}
          className="bg-white rounded-[1.5rem] shadow-2xl p-10 lg:p-12 border border-gray-100 print:shadow-none print:p-0 print:border-none print:m-0"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
            <div className="space-y-3">
              <div className="bg-secondary text-white px-4 py-1.5 rounded-full inline-block font-black text-[10px] tracking-widest uppercase italic">
                DM POS Invoice
              </div>
              <h1 className="text-2xl font-black text-secondary font-outfit uppercase tracking-tighter italic">
                Diamond Media <span className="text-primary">Solution.</span>
              </h1>
              <div className="text-muted text-[11px] font-medium leading-relaxed">
                Jl.Raya Penawangan-Sedadi Km 5, Area Persawahan Kluwan,<br />
                Pengkol, Penawangan, Grobogan, Jawa Tengah 58161<br />
                WhatsApp: 0851-1704-2204 | Email: support@dmpos.id
              </div>
            </div>
            
            <div className="text-right space-y-1">
              <div className="text-primary font-black uppercase tracking-widest text-[10px]">Nomor Invoice</div>
              <div className="text-xl font-black text-secondary uppercase tracking-tight">#{invoiceNumber}</div>
              <div className="text-muted text-[11px] font-bold pt-1">{dateStr}</div>
              <div className="flex items-center justify-end gap-1 text-green-500 font-black text-[9px] uppercase tracking-widest pt-2">
                 <CheckCircle2 size={10} /> PAID / LUNAS
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-100 w-full mb-8"></div>

          {/* Billing Info */}
          <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
            <div className="space-y-2">
              <div className="text-primary font-black uppercase tracking-widest text-[9px]">Ditagihkan Kepada:</div>
              <div className="space-y-0.5">
                <div className="text-lg font-black text-secondary leading-none">{data.customer.n}</div>
                <div className="text-muted text-[11px] font-bold">{data.customer.w}</div>
                <div className="text-muted text-[11px] font-medium max-w-xs">{data.customer.a}</div>
              </div>
            </div>
            
            <div className="space-y-2 md:text-right">
              <div className="text-primary font-black uppercase tracking-widest text-[9px]">Metode Pembayaran:</div>
              <div className="text-sm font-black text-secondary uppercase italic">DOKU Checkout</div>
              <div className="text-muted text-[10px] font-bold uppercase tracking-widest">Otomatis Terverifikasi</div>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto mb-10">
            <table className="w-full text-left text-[12px]">
              <thead>
                <tr className="border-b-2 border-secondary/5">
                  <th className="py-3 font-black uppercase tracking-widest text-[10px] text-primary">Deskripsi Barang</th>
                  <th className="py-3 font-black uppercase tracking-widest text-[10px] text-primary text-center font-bold px-4">Harga</th>
                  <th className="py-3 font-black uppercase tracking-widest text-[10px] text-primary text-center font-bold px-4">Qty</th>
                  <th className="py-3 font-black uppercase tracking-widest text-[10px] text-primary text-right font-bold">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 border-b border-gray-100">
                {data.items.map((item: any, idx: number) => (
                  <tr key={idx} className="group">
                    <td className="py-4">
                      <div className="font-bold text-secondary text-sm">{item.n}</div>
                      <div className="text-[9px] text-muted font-bold uppercase tracking-widest">Hardware Unit</div>
                    </td>
                    <td className="py-4 text-center font-medium text-secondary px-4">Rp {item.p.toLocaleString('id-ID')}</td>
                    <td className="py-4 text-center font-medium text-secondary px-4">{item.q}</td>
                    <td className="py-4 text-right font-bold text-secondary">Rp {(item.p * item.q).toLocaleString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end pt-4">
            <div className="w-full max-w-[200px] space-y-2">
              <div className="flex justify-between items-center text-[11px] font-bold text-muted">
                <span>Subtotal:</span>
                <span>Rp {data.subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between items-center text-[11px] font-bold text-muted">
                <span>Pajak (0%):</span>
                <span>Rp 0</span>
              </div>
              <div className="h-px bg-gray-100 w-full my-1"></div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-secondary font-black uppercase tracking-widest text-[10px]">Total:</span>
                <span className="text-xl font-black text-secondary">Rp {data.total.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-100 text-center">
            <p className="text-muted text-[10px] font-bold italic mb-2">"Membantu transformasi digital bisnis Anda dengan data yang akurat."</p>
            <p className="text-[9px] text-secondary font-black uppercase tracking-[0.2em]">Terima kasih telah berbisnis bersama DM POS</p>
            <div className="mt-6 flex justify-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-primary/20"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-primary/20"></div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-12 text-center no-print">
          <p className="text-muted font-bold">
            Ada kendala dengan bukti pembayaran? <a href="https://wa.me/6285117042204" target="_blank" className="text-primary underline">Hubungi Admin DM POS</a>
          </p>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background-color: white !important;
            padding: 0 !important;
          }
          @page {
            margin: 20mm;
          }
        }
      `}</style>
    </div>
  );
}

export default function InvoicePage({ params }: { params: { invoiceNumber: string } }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="font-black text-secondary tracking-widest text-xs uppercase">Menyiapkan Invoice...</p>
      </div>
    }>
      <InvoiceContent params={params} />
    </Suspense>
  );
}
