'use client';
import React, { useState, useEffect } from 'react';
import { X, MapPin, User, Mail, MessageSquare, ArrowRight, Loader2, Navigation } from 'lucide-react';

interface ShippingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ShippingData) => void;
  isLoading: boolean;
}

export interface ShippingData {
  name: string;
  whatsapp: string;
  email: string;
  province: string;
  city: string;
  district: string;
  addressDetail: string;
}

export const ShippingModal = ({ isOpen, onClose, onSubmit, isLoading }: ShippingModalProps) => {
  const [formData, setFormData] = useState<ShippingData>({
    name: '',
    whatsapp: '',
    email: '',
    province: '',
    city: '',
    district: '',
    addressDetail: ''
  });

  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [isLocating, setIsLocating] = useState(false);

  // Fetch Provinces
  useEffect(() => {
    if (isOpen) {
      fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
        .then(res => res.json())
        .then(data => setProvinces(data))
        .catch(err => console.error('Failed to load provinces', err));
    }
  }, [isOpen]);

  // Fetch Cities when province changes
  const handleProvinceChange = (provinceName: string) => {
    const provinceId = provinces.find(p => p.name === provinceName)?.id;
    setFormData({ ...formData, province: provinceName, city: '', district: '' });
    if (provinceId) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`)
        .then(res => res.json())
        .then(data => setCities(data));
    }
  };

  // Fetch Districts when city changes
  const handleCityChange = (cityName: string) => {
    const cityId = cities.find(c => c.name === cityName)?.id;
    setFormData({ ...formData, city: cityName, district: '' });
    if (cityId) {
      fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${cityId}.json`)
        .then(res => res.json())
        .then(data => setDistricts(data));
    }
  };

  const handleDetectLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await res.json();
          if (data.display_name) {
            setFormData(prev => ({ ...prev, addressDetail: data.display_name }));
          }
        } catch (err) {
          console.error('Reverse geocode failed', err);
          alert('Gagal mendeteksi detail alamat. Silakan isi manual.');
        } finally {
          setIsLocating(false);
        }
      }, (err) => {
        console.error('Geolocation failed', err);
        setIsLocating(false);
        alert('Izin lokasi ditolak atau tidak tersedia.');
      });
    }
  };

  if (!isOpen) return null;

  const isFormValid = formData.name && formData.whatsapp && formData.province && formData.city && formData.district && formData.addressDetail;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-secondary/80 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-white w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-scale-up">
        {/* Header */}
        <div className="bg-gray-50 p-8 border-b border-gray-100 relative">
          <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 bg-white border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-primary transition-all shadow-sm">
            <X size={20} />
          </button>
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-secondary font-outfit uppercase tracking-tighter">Data <span className="text-primary italic">Pengiriman.</span></h2>
            <p className="text-xs font-medium text-muted">Lengkapi tujuan pengiriman hardware Anda.</p>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-8 max-h-[60vh] overflow-y-auto space-y-5 selection:bg-primary/20">
          
          {/* Section: Identitas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-secondary uppercase tracking-widest pl-1">Nama Lengkap</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-secondary focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" 
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-secondary uppercase tracking-widest pl-1">Nomor WhatsApp</label>
              <div className="relative group">
                <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="tel" 
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                  placeholder="Contoh: 08123456789"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-secondary focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" 
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-black text-secondary uppercase tracking-widest pl-1">Email <span className="text-muted/50 normal-case">(Opsional)</span></label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="budi@example.com"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-secondary focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" 
              />
            </div>
          </div>

          <div className="h-px bg-gray-100 my-8"></div>

          {/* Section: Wilayah */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-secondary uppercase tracking-widest pl-1">Provinsi</label>
              <select 
                value={formData.province}
                onChange={(e) => handleProvinceChange(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-4 font-bold text-secondary focus:bg-white focus:border-primary transition-all outline-none appearance-none cursor-pointer"
              >
                <option value="">Pilih Provinsi</option>
                {provinces.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-secondary uppercase tracking-widest pl-1">Kota / Kab</label>
              <select 
                disabled={!formData.province}
                value={formData.city}
                onChange={(e) => handleCityChange(e.target.value)}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-4 font-bold text-secondary focus:bg-white focus:border-primary disabled:opacity-50 transition-all outline-none appearance-none cursor-pointer"
              >
                <option value="">Pilih Kota</option>
                {cities.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-secondary uppercase tracking-widest pl-1">Kecamatan</label>
              <select 
                disabled={!formData.city}
                value={formData.district}
                onChange={(e) => setFormData({...formData, district: e.target.value})}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-4 font-bold text-secondary focus:bg-white focus:border-primary disabled:opacity-50 transition-all outline-none appearance-none cursor-pointer"
              >
                <option value="">Pilih Kecamatan</option>
                {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
              </select>
            </div>
          </div>

          {/* Alamat Detail */}
          <div className="space-y-2">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-black text-secondary uppercase tracking-widest pl-1">Alamat Lengkap & Detail</label>
              <button 
                onClick={handleDetectLocation}
                disabled={isLocating}
                className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1.5 hover:bg-primary/5 px-3 py-1.5 rounded-full transition-all border border-primary/20"
              >
                {isLocating ? <Loader2 size={12} className="animate-spin" /> : <Navigation size={12} />}
                {isLocating ? 'Mendeteksi...' : 'Deteksi GPS'}
              </button>
            </div>
            <div className="relative group">
              <MapPin className="absolute left-4 top-5 text-gray-300 group-focus-within:text-primary transition-colors" size={20} />
              <textarea 
                value={formData.addressDetail}
                onChange={(e) => setFormData({...formData, addressDetail: e.target.value})}
                rows={3}
                placeholder="Jl. Raya No, RT/RW, Patokan..."
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-secondary focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" 
              ></textarea>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-10 bg-gray-50 border-t border-gray-100 flex gap-4">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 py-4 text-sm font-black text-secondary border-2 border-gray-200 rounded-2xl hover:bg-white transition-all active:scale-95"
          >
            Batal
          </button>
          <button 
            disabled={!isFormValid || isLoading}
            onClick={() => onSubmit(formData)}
            className={`flex-[2] py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 ${
              !isFormValid || isLoading ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' : 'btn-buy shadow-primary/20'
            }`}
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>Lanjut ke Pembayaran <ArrowRight size={18} /></>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
