import { Navigation } from '../../components/Navigation';
import { Footer } from '../../components/Footer';

export default function TermsOfService() {
  return (
    <div className="bg-white selection:bg-primary/20">
      <Navigation />
      
      <main className="pt-40 pb-24 lg:pt-56 lg:pb-40">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="space-y-6 mb-16">
            <h1 className="text-5xl lg:text-7xl font-black text-secondary leading-tight font-outfit">
              Terms of <span className="text-primary italic">Service.</span>
            </h1>
            <p className="text-xl text-muted font-medium">Terakhir diperbarui: 30 Maret 2026</p>
            <div className="w-20 h-1.5 bg-primary rounded-full"></div>
          </div>

          <div className="prose prose-lg prose-slate max-w-none space-y-12 text-muted leading-relaxed">
            <section className="space-y-6">
              <h2 className="text-3xl font-black text-secondary font-outfit">1. Penerimaan Ketentuan</h2>
              <p>
                Dengan mengakses dan menggunakan aplikasi DM POS, Anda secara otomatis setuju untuk terikat oleh Ketentuan Layanan ini. Jika Anda tidak setuju dengan ketentuan ini, mohon untuk tidak menggunakan layanan kami.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-black text-secondary font-outfit">2. Lisensi Penggunaan</h2>
              <p>
                DM POS memberikan lisensi terbatas, non-eksklusif, dan tidak dapat dipindahtangankan untuk menggunakan perangkat lunak kami sesuai dengan paket berlangganan yang dipilih. Pengguna dilarang melakukan reverse engineer, menyalin kode sumber, atau mendistribusikan ulang aplikasi ini tanpa izin tertulis dari Diamond Media Solution.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-black text-secondary font-outfit">3. Kewajiban Pengguna</h2>
              <p>
                Pengguna bertanggung jawab penuh atas:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>Keakuratan data transaksi yang dimasukkan ke dalam sistem.</li>
                <li>Keamanan akun dan akses fisik ke perangkat kasir.</li>
                <li>Kepatuhan terhadap hukum perpajakan dan perdagangan yang berlaku di wilayah masing-masing.</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-black text-secondary font-outfit">4. Biaya dan Pembayaran</h2>
              <p>
                Layanan DM POS ditawarkan dalam berbagai paket (demo, standar, pro). Biaya layanan harus dibayar di muka sesuai periode yang disepakati. Diamond Media Solution berhak menyesuaikan harga layanan dengan pemberitahuan sebelumnya.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-black text-secondary font-outfit">5. Batasan Tanggung Jawab</h2>
              <p>
                Diamond Media Solution tidak bertanggung jawab atas kerugian bisnis, kehilangan data, atau gangguan operasional yang disebabkan oleh penyalahgunaan aplikasi, kegagalan hardware pihak ketiga, atau gangguan koneksi internet pengguna.
              </p>
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-black text-secondary font-outfit">6. Perubahan Ketentuan</h2>
              <p>
                Kami berhak mengubah Ketentuan Layanan ini sewaktu-waktu. Perubahan akan diinformasikan melalui website resmi atau notifikasi di dalam aplikasi. Penggunaan berkelanjutan setelah perubahan dianggap sebagai persetujuan atas ketentuan baru.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
