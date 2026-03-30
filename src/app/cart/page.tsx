'use client';
import React from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, CreditCard, Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';
import { ShippingModal, ShippingData } from '../../components/ShippingModal';

export default function CartPage() {
  const { cartItems, removeItem, updateQuantity, totalPrice, cartCount } = useCart();

  const [isLoading, setIsLoading] = React.useState(false);
  const [isShippingOpen, setIsShippingOpen] = React.useState(false);

  const handleCheckoutClick = () => {
    if (cartItems.length === 0) return;
    setIsShippingOpen(true);
  };

  const processPayment = async (shippingData: ShippingData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items: cartItems, 
          totalAmount: totalPrice,
          customerDetails: shippingData
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Gagal membuat sesi pembayaran: ' + (data.error || 'Terjadi kesalahan sistem'));
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Terjadi kesalahan saat menghubungkan ke server.');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-gray-50 min-h-screen selection:bg-primary/20">
      <Navigation />
      
      <main className="pt-32 pb-24 lg:pt-48 lg:pb-40">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left: Cart Items */}
            <div className="lg:w-2/3 space-y-8">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl lg:text-5xl font-black text-secondary font-outfit">
                  Keranjang <span className="text-primary italic">Belanja.</span>
                </h1>
                <span className="bg-white px-4 py-2 rounded-full border border-gray-100 text-sm font-black text-muted shadow-sm">
                  {cartCount} Item Terpilih
                </span>
              </div>

              {cartItems.length === 0 ? (
                <div className="bg-white rounded-[2.5rem] p-16 text-center border border-gray-100 shadow-sm space-y-8">
                  <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                    <ShoppingBag size={48} />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-secondary font-outfit">Keranjang Anda masih kosong</h3>
                    <p className="text-muted font-medium">Sepertinya Anda belum memilih hardware untuk bisnis Anda.</p>
                  </div>
                  <Link href="/#hardware" className="btn-primary inline-flex items-center gap-2 px-10">
                    <ArrowLeft size={20} /> Mulai Belanja
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-[2rem] p-6 lg:p-8 border border-gray-100 shadow-sm flex flex-col md:row items-center gap-8 group hover:border-primary/20 transition-all duration-300">
                      <div className="w-32 h-32 bg-gray-50 rounded-2xl overflow-hidden shrink-0 border border-gray-50 flex items-center justify-center p-4">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      
                      <div className="flex-1 space-y-2 text-center md:text-left">
                        <p className="text-xs font-black text-primary uppercase tracking-widest">{item.type}</p>
                        <h3 className="text-xl font-black text-secondary font-outfit">{item.name}</h3>
                        <p className="text-lg font-black text-primary">{formatPrice(item.price)}</p>
                      </div>

                      <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-secondary hover:text-primary transition-colors hover:shadow-sm"
                        >
                          <Minus size={16} strokeWidth={3} />
                        </button>
                        <span className="w-8 text-center font-black text-secondary font-outfit text-lg">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-secondary hover:text-primary transition-colors hover:shadow-sm"
                        >
                          <Plus size={16} strokeWidth={3} />
                        </button>
                      </div>

                      <button 
                        onClick={() => removeItem(item.id)}
                        className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-black/5 sticky top-32 space-y-8">
                <h3 className="text-2xl font-black text-secondary font-outfit uppercase tracking-tighter">Ringkasan <span className="text-primary italic">Pesanan.</span></h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-muted font-bold">
                    <span>Subtotal</span>
                    <span className="text-secondary">{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-muted font-bold">
                    <span>Pajak (0%)</span>
                    <span className="text-secondary">Rp 0</span>
                  </div>
                  <div className="flex justify-between text-muted font-bold">
                    <span>Pengiriman</span>
                    <span className="text-green-500 text-sm uppercase font-black tracking-widest">Gratis Ongkir</span>
                  </div>
                  <div className="h-px bg-gray-100 my-4"></div>
                  <div className="flex justify-between items-end">
                    <span className="text-muted font-black text-sm uppercase tracking-widest">Total Bayar</span>
                    <span className="text-3xl font-black text-primary font-outfit">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button 
                    disabled={cartItems.length === 0 || isLoading}
                    onClick={handleCheckoutClick}
                    className={`w-full py-6 text-xl shadow-lg group flex items-center justify-center gap-3 transition-all duration-300 ${
                      (cartItems.length === 0 || isLoading)
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                      : 'btn-buy shadow-blue-500/20 active:scale-95'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Menghubungkan...
                      </div>
                    ) : (
                      <>
                        <CreditCard size={24} /> Proses Checkout
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-muted font-bold leading-relaxed px-4">
                    Dengan menekan tombol di atas, Anda setuju dengan <Link href="/terms" className="text-primary underline">Syarat dan Ketentuan</Link> DM POS.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <ShippingModal 
        isOpen={isShippingOpen} 
        onClose={() => setIsShippingOpen(false)} 
        onSubmit={processPayment}
        isLoading={isLoading}
      />
    </div>
  );
}
