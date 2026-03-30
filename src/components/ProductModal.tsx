'use client';
import React, { useState } from 'react';
import { X, Star, Plus, Minus, ShoppingCart, ShieldCheck, Truck, CreditCard, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { HardwareItem } from '../data/hardware';
import { useCart } from '../context/CartContext';
import { ShippingModal, ShippingData } from './ShippingModal';

interface ProductModalProps {
  product: HardwareItem | null;
  onClose: () => void;
  onAddToCart: (qty: number) => void;
}

export const ProductModal = ({ product, onClose, onAddToCart }: ProductModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const { addItem } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [isShippingOpen, setIsShippingOpen] = useState(false);

  const handleBuyClick = () => {
    if (!product) return;
    setIsShippingOpen(true);
  };

  const processDirectPayment = async (shippingData: ShippingData) => {
    if (!product) return;
    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ ...product, quantity }],
          totalAmount: product.price * quantity,
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
      console.error('Direct buy error:', err);
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

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-secondary/80 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose} />

      {/* Modal - Premium Wide Landscape */}
      <div className="relative bg-white w-full max-w-5xl rounded-[2.0rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row h-full max-h-[100vh] animate-scale-up">

        {/* Close Button - Desktop (Floating) */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-11 h-11 bg-gray-50 rounded-full flex items-center justify-center text-secondary hover:bg-red-50 hover:text-red-500 transition-all z-50 shadow-sm border border-gray-100"
        >
          <X size={22} />
        </button>

        {/* Left: Gallery Section (Wider) */}
        <div className="lg:w-[42%] bg-gray-50/50 p-6 lg:p-12 flex flex-col justify-center relative border-r border-gray-100/50">
          <div className="relative aspect-square w-full max-w-[320px] mx-auto group">
            <img
              src={product.images[activeImgIndex]}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply drop-shadow-2xl transition-all duration-700 group-hover:scale-105"
            />
            {product.images.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setActiveImgIndex(prev => (prev > 0 ? prev - 1 : product.images.length - 1))} className="pointer-events-auto w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-lg hover:text-primary transition-all ml-4"><ChevronLeft size={20} /></button>
                <button onClick={() => setActiveImgIndex(prev => (prev < product.images.length - 1 ? prev + 1 : 0))} className="pointer-events-auto w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-lg hover:text-primary transition-all mr-4"><ChevronRight size={20} /></button>
              </div>
            )}
          </div>

          {/* Thumbnails - Smaller and Neater */}
          <div className="flex justify-center gap-3 mt-10">
            {product.images.map((img: string, i: number) => (
              <button
                key={i}
                onClick={() => setActiveImgIndex(i)}
                className={`w-14 h-14 rounded-xl border-2 overflow-hidden bg-white p-1.5 transition-all ${activeImgIndex === i ? 'border-primary ring-4 ring-primary/5 scale-110 shadow-md' : 'border-gray-100 opacity-60 hover:opacity-100'
                  }`}
              >
                <img src={img} alt="" className="w-full h-full object-contain" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Info Section - Clean & Proportional */}
        <div className="lg:w-[58%] p-8 lg:p-14 overflow-y-auto space-y-8 selection:bg-primary/20 bg-white">

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="bg-primary/10 text-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{product.type}</span>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star size={12} fill="currentColor" />
                  <span className="text-[10px] font-black text-secondary">4.9 (120+)</span>
                </div>
              </div>

              {/* Badge Hemat - Integrated */}
              <div className="bg-green-50 text-green-600 border border-green-100 px-3 py-1 rounded-full flex items-center gap-1.5 animate-pulse">
                <Zap size={10} fill="currentColor" />
                <span className="text-[9px] font-black uppercase tracking-wider">Hemat 15%</span>
              </div>
            </div>

            <h2 className="text-3xl lg:text-4xl font-black text-secondary font-outfit uppercase tracking-tighter leading-tight italic">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-primary font-outfit">
                {formatPrice(product.price)}
              </span>
              <span className="text-gray-400 text-sm line-through font-bold">
                {formatPrice(Math.round(product.price / 0.85))}
              </span>
            </div>
          </div>

          <div className="prose prose-sm prose-gray max-w-none">
            <p className="text-muted font-medium text-base leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Specs - Grid 3 Columns on Wide */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
            {product.specs.map((spec: string, i: number) => (
              <div key={i} className="flex items-center gap-2 bg-gray-50/50 p-3 rounded-xl border border-gray-100/50">
                <ShieldCheck className="text-primary shrink-0" size={14} />
                <span className="text-[10px] font-black text-secondary uppercase tracking-tight line-clamp-1">{spec}</span>
              </div>
            ))}
          </div>

          <div className="h-px bg-gray-100 flex-grow-0"></div>

          {/* Controls - Aligned Horizontal */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Quantity */}
              <div className="flex items-center gap-6 bg-gray-50/80 p-1.5 rounded-2xl border border-gray-100">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-secondary hover:text-primary transition-all active:scale-95 shadow-sm"
                >
                  <Minus size={16} strokeWidth={3} />
                </button>
                <span className="w-6 text-center font-black text-secondary text-lg font-outfit">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-secondary hover:text-primary transition-all active:scale-95 shadow-sm"
                >
                  <Plus size={16} strokeWidth={3} />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-1 gap-3 w-full">
                <button
                  onClick={() => { addItem(product, quantity); onClose(); }}
                  className="flex-1 border-2 border-primary text-primary font-black h-14 w-32 rounded-2xl uppercase tracking-widest text-[10px] hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} /> Tambah Keranjang
                </button>

                <button
                  onClick={handleBuyClick}
                  disabled={isLoading}
                  className="flex-[1.3] btn-buy h-14 rounded-2xl uppercase tracking-widest text-[10px] shadow-xl shadow-green-500/20"
                >
                  <CreditCard size={16} /> {isLoading ? 'Memproses...' : 'Beli Sekarang'}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 text-[9px] font-black text-muted/40 uppercase tracking-widest pt-2">
              <div className="flex items-center gap-2"><Truck size={12} /> <span>Pengiriman Kilat</span></div>
              <div className="flex items-center gap-2"><ShieldCheck size={12} /> <span>Garansi 1 Tahun</span></div>
            </div>
          </div>
        </div>
      </div>

      <ShippingModal
        isOpen={isShippingOpen}
        onClose={() => setIsShippingOpen(false)}
        onSubmit={processDirectPayment}
        isLoading={isLoading}
      />
    </div>
  );
};
