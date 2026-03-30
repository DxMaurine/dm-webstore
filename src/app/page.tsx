'use client';
import { useState, useEffect } from 'react';
import { 
  X, 
  ChevronRight, 
  ShoppingCart,
  LayoutDashboard,
  BarChart3,
  CheckCircle2,
  PackageSearch,
  Smartphone,
  Globe,
  MessageCircle,
  Package,
  ArrowRight,
  ShieldCheck,
  Star,
  MapPin,
  Phone,
  Mail,
  Zap,
  CheckCircle
} from 'lucide-react';

// Components
import { Navigation } from '../components/Navigation';
import { PaymentMarquee } from '../components/PaymentMarquee';
import { ProductModal } from '../components/ProductModal';
import { Footer } from '../components/Footer';

// Data
import { hardwareData, HardwareItem } from '../data/hardware';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<HardwareItem | null>(null);

  const handleAddToCart = () => {
    // This is now handled by the context inside ProductModal
  };

  return (
    <div className="bg-white selection:bg-primary/20">
      <Navigation />
      {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={handleAddToCart} />}

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-40 overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-l-[10rem] -z-10 blur-3xl"></div>
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-10 animate-in fade-in slide-in-from-left duration-1000">
              <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-xs font-black text-secondary tracking-widest uppercase">Versi 2.0.7 Kini Tersedia</span>
              </div>
              <h1 className="text-6xl lg:text-8xl font-black text-secondary leading-[1.05] tracking-tighter font-outfit">
                Satu Aplikasi <br />
                <span className="text-primary italic">Sejuta Kemudahan.</span>
              </h1>
              <p className="text-xl text-muted leading-relaxed max-w-xl font-medium">
                DM POS bukan sekadar kasir digital. Ini adalah asisten bisnis pintar yang membantu Anda mengelola stok, karyawan, hingga laporan keuangan dalam satu genggaman.
              </p>
              <div className="flex flex-wrap gap-5 pt-4">
                <a href="https://wa.me/6285117042204" target="_blank" className="btn-primary group !px-10 !py-5 text-lg">
                  Konsultasi Gratis <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </a>
                <a href="https://github.com/DxMaurine/dm-pos-pro-retail/releases/tag/v2.0.7" className="btn-outline !px-10 !py-5 text-lg">
                  Unduh Demo
                </a>
              </div>
              <div className="flex items-center gap-8 pt-6 border-t border-gray-100">
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-secondary font-outfit">100+</span>
                  <span className="text-[10px] font-bold text-muted uppercase tracking-widest">UMKM Terdaftar</span>
                </div>
                <div className="h-8 w-px bg-gray-200"></div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-secondary font-outfit">Cloud</span>
                  <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Berbasis Online</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative animate-in fade-in zoom-in duration-1000 delay-200">
              <div className="absolute -inset-4 bg-primary/20 rounded-[4rem] blur-3xl -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=2070&auto=format&fit=crop" 
                alt="DM POS Dashboard" 
                className="rounded-[3rem] shadow-2xl border-8 border-white object-cover aspect-video"
              />
              <div className="absolute -bottom-10 -left-10 glass p-8 rounded-[2.5rem] shadow-2xl animate-bounce duration-[3000ms]">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                    <CheckCircle size={32} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-muted uppercase tracking-widest">Status Sistem</p>
                    <p className="text-lg font-black text-secondary font-outfit">Aman & Akurat</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PaymentMarquee />

      {/* Services Section */}
      <section id="layanan" className="py-24 lg:py-40 bg-gray-50/50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
            <h2 className="text-4xl lg:text-5xl font-black text-secondary tracking-tight font-outfit">Kekuatan DM POS untuk Bisnis Anda</h2>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
            <p className="text-lg text-muted italic">"Membantu transformasi digital bisnis Anda dengan data transaksi yang akurat untuk strategi yang lebih tajam."</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: 'Point of Sale (Kasir)', icon: <Smartphone size={40} />, desc: 'Input barang secepat kilat, cetak struk profesional dengan logo brand Anda.' },
              { title: 'Intelligent Inventory', icon: <PackageSearch size={40} />, desc: 'Pantau stok barang di berbagai gudang/toko secara otomatis tanpa ribet cek manual.' },
              { title: 'Sales Analytics', icon: <BarChart3 size={40} />, desc: 'Visualisasi data keuntungan harian, bulanan, hingga tahunan yang cantik dan detail.' },
              { title: 'Employee Control', icon: <CheckCircle2 size={40} />, desc: 'Batasi wewenang setiap staf dan pantau absensi/kinerja mereka secara remote.' },
              { title: 'Purchase Order', icon: <LayoutDashboard size={40} />, desc: 'Visualisasi data pembelian barang dari supplier, pantau status pengiriman hingga tagihan.' },
              { title: 'Future-Ready Payment', icon: <Globe size={40} />, desc: 'Arsitektur yang siap dihubungkan dengan berbagai dompet digital & payment gateway.' },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-10 lg:p-12 rounded-[3.5rem] border border-gray-100 shadow-sm hover:shadow-[0_40px_80px_-15px_rgba(0,174,239,0.2)] hover:border-primary/40 hover:bg-gradient-to-br hover:from-white hover:to-blue-50/50 hover:-translate-y-4 transition-all duration-500 group cursor-default relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/0 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700"></div>
                <div className="w-20 h-20 bg-gray-50 text-primary border border-gray-100 rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:bg-primary group-hover:text-black group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-sm relative z-10">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black text-secondary mb-5 group-hover:text-primary transition-colors relative z-10">{feature.title}</h3>
                <p className="text-muted text-lg leading-relaxed font-medium relative z-10 group-hover:text-main transition-colors">{feature.desc}</p>
                <div className="absolute bottom-0 left-0 w-0 h-2 bg-primary group-hover:w-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hardware / Store Section */}
      <section id="hardware" className="py-24 lg:py-40 bg-[#161616] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-10">
            <div className="max-w-2xl">
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 tracking-tight italic font-outfit">Ekosistem Hardware DM POS</h2>
              <p className="text-muted text-lg leading-relaxed">
                Hardware berkualitas tinggi yang sudah kami kurasi untuk performa maksimal bersama aplikasi DM POS. <span className="text-primary font-bold font-outfit">Plug & Play.</span>
              </p>
            </div>
            <a href="https://wa.me/6285117042204" className="btn-primary !px-12 !py-6">
              Cek Katalog PDF
            </a>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {hardwareData.map((product, i) => (
              <div 
                key={i} 
                onClick={() => setSelectedProduct(product)}
                className="bg-[#1f1f1f] rounded-[2.5rem] p-10 border border-white/5 hover:border-primary/30 hover:bg-[#252525] transition-all duration-500 group flex flex-col items-center text-center shadow-2xl cursor-pointer"
              >
                <div className="h-56 w-full relative flex items-center justify-center mb-10">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  <img src={product.images[0]} alt={product.name} className="max-h-full max-w-full object-contain relative transition-all duration-500 group-hover:scale-110 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] rounded-2xl" />
                </div>
                <div className="space-y-3">
                  <p className="text-[10px] font-black text-yellow-500 uppercase tracking-[0.2em] font-outfit">{product.type}</p>
                  <h3 className="text-xl font-bold text-white font-outfit">{product.name}</h3>
                  <div className="text-primary font-outfit font-black text-lg pt-2">
                    Rp {product.price.toLocaleString('id-ID')}
                  </div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 group-hover:text-primary transition-colors pt-2">
                    Lihat Detail <ChevronRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing / CTA Section */}
      <section id="harga" className="py-24 lg:py-40 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="bg-secondary rounded-[4rem] p-10 lg:p-24 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 -skew-x-12 translate-x-1/2"></div>
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="lg:w-2/3 space-y-8">
                <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight font-outfit italic">
                  Siap Transformasi Bisnis Anda Menjadi Lebih <span className="text-primary">Modern?</span>
                </h2>
                <p className="text-xl text-white/70 max-w-2xl leading-relaxed">
                  Bergabunglah dengan ratusan pengusaha sukses yang telah memercayakan manajemen bisnisnya kepada DM POS. Dapatkan demo gratis sekarang!
                </p>
                <div className="flex flex-wrap gap-8 pt-4">
                  <div className="flex items-center gap-3 text-white">
                    <CheckCircle className="text-primary" /> <span>Tanpa Biaya Admin</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <CheckCircle className="text-primary" /> <span>Update Selamanya</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <CheckCircle className="text-primary" /> <span>Support 24/7</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3 w-full flex flex-col gap-4">
                <a href="https://wa.me/6285117042204" target="_blank" className="btn-primary !py-8 text-xl shadow-2xl shadow-primary/20 text-center">
                  Coba Gratis 30 Hari
                </a>
                <p className="text-center text-white/40 text-sm font-bold uppercase tracking-widest">Aman • Cepat • Terpercaya</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
