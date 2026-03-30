'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, X, Menu } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Layanan', href: '/#layanan' },
    { name: 'Hardware', href: '/#hardware' },
    { name: 'Harga', href: '/#harga' },
    { name: 'Tentang Kami', href: '/#tentang' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-4 shadow-lg shadow-black/5' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/assets/images/logo.jpg" alt="DM POS Logo" className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300" />
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-black text-secondary tracking-tighter font-outfit"> DM POS</span>
            <span className="text-[10px] font-bold text-muted/70 uppercase tracking-widest leading-none">Diamond Media Solution</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-bold text-main hover:text-primary transition-colors uppercase tracking-widest transition-all">
              {link.name}
            </a>
          ))}
          <div className="h-8 w-px bg-gray-200 mx-2"></div>
          <Link href="/cart" className="relative text-secondary hover:text-primary transition-colors">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce">{cartCount}</span>
            )}
          </Link>
          <a href="https://wa.me/6285117042204" target="_blank" className="btn-primary shadow-blue-500/10">
            Coba Gratis
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-secondary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-2xl md:hidden flex flex-col p-8 gap-6 animate-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xl font-bold border-b border-gray-50 pb-4 text-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a href="https://wa.me/6285117042204" target="_blank" className="btn-primary justify-center w-full py-4">
            Coba Gratis Sekarang
          </a>
        </div>
      )}
    </nav>
  );
};
