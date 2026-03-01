# Muslim Daily - Sahabat Ibadah Harian Anda

Aplikasi Muslim lengkap dengan berbagai fitur untuk membantu ibadah sehari-hari. Dioptimalkan untuk tampilan mobile.

## ✨ Fitur Utama

### 🏠 Beranda
- Tampilan waktu real-time dengan greeting dinamis
- Quick access ke semua fitur
- Reminder ayat harian
- Dashboard yang informatif

### 🕌 Jadwal Sholat
- Waktu sholat 5 waktu berdasarkan lokasi GPS
- Indikator waktu sholat saat ini dan berikutnya
- Countdown ke waktu sholat berikutnya
- Integrasi dengan Aladhan API
- Metode perhitungan Kementerian Agama Indonesia

### 📖 Al-Quran Digital
- Baca Al-Quran lengkap 30 Juz
- Pilih berdasarkan Surah (114 surah) atau Juz (30 juz)
- Audio qari Mishary Rashid Alafasy untuk setiap ayat
- Teks Arab dengan font yang indah
- Navigasi yang mudah dan intuitif

### 📜 Kumpulan Hadits
- Hadits shahih dari 5 kitab terkenal:
  - Shahih Bukhari
  - Shahih Muslim
  - Sunan Abu Dawud
  - Sunan Tirmidzi
  - Sunan Nasai
- Teks Arab dengan terjemahan Indonesia
- Navigasi antar hadits yang mudah
- Fitur pencarian kitab

### 🧭 Arah Kiblat
- Kompas digital interaktif
- Menggunakan sensor kompas HP
- Perhitungan arah kiblat otomatis berdasarkan GPS
- Panduan penggunaan yang jelas
- Visual yang menarik

### 🤲 Doa Harian
- Kumpulan 10+ doa sehari-hari
- Teks Arab dengan font indah
- Transliterasi latin
- Terjemahan Indonesia
- Fitur pencarian doa
- Filter berdasarkan kategori (Makan, Tidur, Perjalanan, dll)
- Expandable cards untuk detail

### 🎮 Game Tebak Ayat
- Audio bacaan qari (Mishary Rashid Alafasy)
- 4 pilihan jawaban
- Sistem scoring dengan high score
- Streak counter untuk jawaban beruntun
- Feedback visual untuk jawaban
- Edukatif dan menyenangkan

## 🚀 Cara Menjalankan

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Buka browser dan akses `http://localhost:3000`

## 📱 Fitur Mobile

- Layout responsif khusus untuk mobile
- Bottom navigation yang mudah dijangkau
- Touch-friendly buttons
- Smooth animations
- Optimized untuk penggunaan di smartphone
- PWA ready (bisa diinstall di HP)

## 🎨 Teknologi

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **APIs**:
  - Aladhan API (Jadwal Sholat)
  - AlQuran Cloud API (Al-Quran & Audio)
  - Geolocation API (Lokasi)
  - Device Orientation API (Kompas)
  - Islamic Network API (Audio Quran)

## 🌟 Fitur Unggulan

- **Offline Support**: Beberapa fitur bisa digunakan offline
- **Real-time Updates**: Waktu dan countdown yang update otomatis
- **User-Friendly**: Interface yang intuitif dan mudah digunakan
- **Beautiful UI**: Design modern dengan gradien warna yang menarik
- **Responsive**: Sempurna untuk semua ukuran layar mobile
- **Fast Performance**: Optimized untuk loading cepat

## 📝 Catatan

- Audio Quran menggunakan API gratis dari Islamic Network
- Kompas memerlukan izin sensor device orientation (terutama di iOS)
- Jadwal sholat menggunakan Aladhan API dengan metode Kemenag RI
- Arah kiblat dihitung berdasarkan koordinat GPS pengguna
- Data hadits menggunakan sample lokal untuk performa optimal

## 🔮 Roadmap

Fitur yang akan ditambahkan:
- [ ] Notifikasi waktu sholat
- [ ] Kiblat dengan AR (Augmented Reality)
- [ ] Lebih banyak ayat untuk game
- [ ] Leaderboard untuk game
- [ ] Dzikir counter
- [ ] Kalender Hijriyah
- [ ] Asmaul Husna
- [ ] Tasbih digital
- [ ] Bookmark ayat & hadits favorit
- [ ] Mode gelap (Dark mode)
- [ ] Multi-language support

## 🤝 Kontribusi

Aplikasi ini dibuat untuk memudahkan ibadah sehari-hari umat Muslim. Silakan berkontribusi untuk menambah fitur atau memperbaiki bug!

## 📄 Lisensi

MIT License - Bebas digunakan untuk keperluan pribadi dan komersial.

---

**Muslim Daily** - Sahabat Ibadah Harian Anda 🕌
