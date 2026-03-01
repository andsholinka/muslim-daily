# Deployment Guide - Muslim Daily

Panduan untuk deploy aplikasi Muslim Daily ke berbagai platform.

## 🚀 Vercel (Recommended)

Vercel adalah platform terbaik untuk Next.js apps.

### Deploy dengan Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login ke Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

### Deploy dengan GitHub

1. Push kode ke GitHub
2. Buka [vercel.com](https://vercel.com)
3. Import repository GitHub Anda
4. Vercel akan otomatis detect Next.js dan deploy

## 📱 Netlify

1. Build aplikasi:
```bash
npm run build
```

2. Deploy ke Netlify:
- Buka [netlify.com](https://netlify.com)
- Drag & drop folder `.next` atau connect dengan GitHub

## 🐳 Docker

1. Buat `Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

2. Build image:
```bash
docker build -t muslim-daily .
```

3. Run container:
```bash
docker run -p 3000:3000 muslim-daily
```

## 🌐 Static Export

Untuk hosting static (GitHub Pages, dll):

1. Update `next.config.js`:
```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

2. Build:
```bash
npm run build
```

3. Deploy folder `out/`

## ⚙️ Environment Variables

Tidak ada environment variables yang required untuk basic functionality.

Jika menambahkan API keys di masa depan, tambahkan di:
- Vercel: Project Settings → Environment Variables
- Netlify: Site Settings → Environment Variables

## 📝 Catatan

- Pastikan semua dependencies sudah terinstall
- Test build lokal sebelum deploy: `npm run build`
- Aplikasi sudah optimized untuk production
- Mobile-first dan responsive
- PWA ready

## 🔧 Troubleshooting

### Build Error
```bash
# Clear cache dan reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Port sudah digunakan
```bash
# Gunakan port lain
PORT=3001 npm run dev
```

## 📊 Performance

Aplikasi sudah dioptimasi untuk:
- Fast loading
- Minimal bundle size
- Lazy loading components
- Image optimization
- Code splitting

---

Selamat deploy! 🎉
