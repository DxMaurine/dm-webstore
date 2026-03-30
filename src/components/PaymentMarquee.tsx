import React from 'react';

export const PaymentMarquee = () => {
  // 4x4 grid positions for list-payment.png, excluding row 2 (indices 8-11)
  const logos = Array.from({ length: 16 })
    .map((_, i) => ({
      index: i,
      x: (i % 4) * 33.333,
      y: Math.floor(i / 4) * 33.333,
    }))
    .filter(logo => logo.index < 8 || logo.index > 11);

  // Triple the logos to ensure the marquee is long enough for smooth loop
  const displayLogos = [...logos, ...logos, ...logos];

  return (
    <div className="py-12 bg-white overflow-hidden border-y border-gray-50/50">
      <div className="container mx-auto px-6 mb-10">
        <p className="text-[10px] font-black text-muted/40 uppercase tracking-[0.4em] text-center">Metode Pembayaran & Keuangan Terintegrasi</p>
      </div>
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-4">
          {displayLogos.map((logo, i) => (
            <div 
              key={i} 
              className="w-32 h-16 shrink-0 logo-card bg-[url('/assets/images/hardware/list-payment.png')] bg-[length:400%_400%] mx-8"
              style={{
                backgroundPosition: `${logo.x}% ${logo.y}%`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
