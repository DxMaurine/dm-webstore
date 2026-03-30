'use client';
import Link from 'next/link';
import { MapPin, Phone, Mail, Smartphone, Globe, CheckCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="tentang" className="bg-gray-50 py-24 border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-4 gap-16">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <img src="/assets/images/logo.jpg" alt="DM POS" className="w-12 h-12 object-contain" />
              <span className="text-2xl font-black text-secondary tracking-tighter font-outfit"> DM POS</span>
            </div>
            <p className="text-muted leading-relaxed font-medium">Solusi kasir digital modern untuk memajukan UMKM Indonesia melalui teknologi otomasi yang akurat.</p>
            <div className="flex gap-4">
              {[Smartphone, Globe, Mail].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all shadow-sm">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-lg font-black text-secondary mb-8 font-outfit uppercase tracking-widest text-primary">Tautan Cepat</h4>
            <ul className="space-y-4">
              {[
                { name: 'Layanan', href: '/#layanan' },
                { name: 'Hardware', href: '/#hardware' },
                { name: 'Harga', href: '/#harga' },
                { name: 'Tentang Kami', href: '/#tentang' },
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-muted hover:text-primary font-bold transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-black text-secondary mb-8 font-outfit uppercase tracking-widest text-primary">Kontak Kami</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-muted">
                <MapPin className="text-primary shrink-0" />
                <span className="font-bold">Jl.Raya Penawangan-Sedadi Km 5, Area Persawahan Kluwan, Pengkol, Penawangan, Grobogan, Jawa Tengah 58161</span>
              </li>
              <li className="flex items-center gap-4 text-muted">
                <Phone className="text-primary shrink-0" />
                <span className="font-bold">+62 8511 704 2204</span>
              </li>
              <li className="flex items-center gap-4 text-muted">
                <Mail className="text-primary shrink-0" />
                <span className="font-bold">support@dmpos.id</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-black text-secondary mb-8 font-outfit uppercase tracking-widest text-primary">Jam Operasional</h4>
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-2">
              <p className="text-main font-black">Senin - Jumat</p>
              <p className="text-muted text-sm font-bold">08.00 - 17.00 WIB</p>
              <div className="h-px bg-gray-50 my-4"></div>
              <p className="text-main font-black">Sabtu</p>
              <p className="text-muted text-sm font-bold">09.00 - 15.00 WIB</p>
            </div>
          </div>
        </div>
        <div className="mt-24 pt-8 border-t border-gray-100 flex flex-col md:row items-center justify-between gap-6">
          <p className="text-muted font-bold">© 2026 Diamond Media Solution. All rights reserved.</p>
          <div className="flex gap-8 text-sm font-black text-muted uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-primary transition-colors text-main">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors text-main">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
