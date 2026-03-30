import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="bg-white selection:bg-primary/20">
      <Navigation />
      
      <main className="pt-40 pb-24 lg:pt-56 lg:pb-40">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-6 mb-16">
            <h1 className="text-5xl lg:text-7xl font-black text-secondary leading-tight font-outfit">
              Privacy <span className="text-primary italic">Policy.</span>
            </h1>
            <p className="text-xl text-muted font-medium">Terakhir diperbarui: 30 Maret 2026</p>
            <div className="w-20 h-1.5 bg-primary rounded-full"></div>
          </div>

          <div className="prose prose-lg prose-slate max-w-none space-y-12 text-muted leading-relaxed">
            <section className="space-y-6">
              <h2 className="text-3xl font-black text-secondary font-outfit">1. Informasi yang Kami Kumpulkan</h2>
              <p>
                DM POS mengumpulkan informasi untuk memudahkan operasional bisnis Anda. Informasi ini meliputi:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Informasi Bisnis:</strong> Nama outlet, alamat, nomor telepon, dan data pajak (jika ada).</li>
                <li><strong>Data Transaksi:</strong> Riwayat penjualan, inventaris, dan informasi pelanggan outlet Anda.</li>
                <li><strong>Data Pengguna:</strong> Nama staf, PIN akses, dan log aktivitas operasional.</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-black text-secondary font-outfit">2. Bagaimana Kami Menggunakan Informasi</h2>
              <p>
                Data yang dikumpulkan digunakan secara eksklusif untuk menjalankan fungsionalitas aplikasi DM POS, termasuk:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>Sinkronisasi data antar perangkat (cloud storage).</li>
                <li>Pembuatan laporan penjualan dan analisis stok secara real-time.</li>
                <li>Keperluan teknis untuk pemeliharaan dan pembaruan sistem.</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-black text-secondary font-outfit">3. Keamanan Data</h2>
              <p>
                Kami memprioritaskan keamanan data bisnis Anda dengan standar enkripsi tinggi. Database DM POS dilindungi secara ketat untuk mencegah akses yang tidak sah, kebocoran, atau kerusakan data. Namun, pengguna bertanggung jawab penuh atas keamanan kredensial (username/password) masing-masing.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-black text-secondary font-outfit">4. Berbagi Informasi</h2>
              <p>
                DM POS tidak akan pernah menjual atau menyewakan informasi bisnis Anda kepada pihak ketiga. Kami hanya berbagi informasi jika diwajibkan secara hukum oleh otoritas yang berwenang di Indonesia.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-black text-secondary font-outfit">5. Kontak Kami</h2>
              <p>
                Jika Anda memiliki pertanyaan tentang kebijakan privasi ini, silakan hubungi tim support kami melalui email support@dmpos.id atau WhatsApp Business kami.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
