import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DM POS - Satu Aplikasi POS untuk Semua Kebutuhan Bisnis",
  description: "Solusi kasir online profesional untuk kelola stok, laporan penjualan, hingga manajemen inventori secara real-time. Terpercaya oleh 100+ UMKM.",
  keywords: "POS, Point of Sale, Kasir Digital, Software Kasir, DM POS, Diamond Media Software, Grobogan, Aplikasi Kasir Terbaik",
  openGraph: {
    title: "DM POS - Solusi Digital No. 1 di Grobogan",
    description: "Transformasi digital bisnis Anda dengan DM POS. Cepat, akurat, dan handal.",
    type: "website",
    locale: "id_ID",
  }
};

import { CartProvider } from "../context/CartContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased text-secondary selection:bg-primary/20">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
