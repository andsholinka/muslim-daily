import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muslim Daily - Sahabat Ibadah Harian Anda",
  description: "Aplikasi Muslim lengkap dengan jadwal sholat, Al-Quran digital, hadits, arah kiblat, doa harian, dan game edukatif",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-gradient-to-b from-emerald-50 to-teal-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
