# Efe Sürücü Kursu - Website

Modern, responsive ve SEO uyumlu sürücü kursu web sitesi. Next.js 14 ile geliştirilmiştir.

## 🚀 Özellikler

- ✅ **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS
- ✅ **Tamamen Ücretsiz**: Database gerektirmez, dosya tabanlı içerik yönetimi
- ✅ **SEO Optimize**: Sitemap, robots.txt, structured data
- ✅ **Blog Sistemi**: MDX ile güçlendirilmiş blog
- ✅ **İletişim Formu**: Resend ile email gönderimi
- ✅ **Responsive**: Mobil, tablet ve desktop uyumlu
- ✅ **Hızlı**: Static generation ile yüksek performans

## 📁 Proje Yapısı

```
efe-surucu-kursu/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Ana sayfa
│   ├── kurslar/           # Kurslar sayfası
│   ├── hakkimizda/        # Hakkımızda sayfası
│   ├── iletisim/          # İletişim sayfası
│   ├── blog/              # Blog sayfaları
│   └── api/               # API routes
├── components/             # React components
│   ├── ui/                # UI components
│   ├── layout/            # Layout components
│   └── sections/          # Page sections
├── content/               # İçerik dosyaları (JSON + MDX)
│   ├── blog/             # Blog yazıları (MDX)
│   ├── courses.json      # Kurslar
│   ├── instructors.json  # Eğitmenler
│   └── settings.json     # Site ayarları
├── lib/                   # Utility functions
│   ├── mdx.ts            # MDX okuma fonksiyonları
│   ├── content.ts        # JSON okuma fonksiyonları
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Yardımcı fonksiyonlar
└── public/               # Static files
    └── images/           # Görseller
```

## 🛠️ Kurulum

### 1. Projeyi Klonlayın

```bash
git clone <repository-url>
cd efe-surucu-kursu
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Ortam Değişkenlerini Ayarlayın

`.env.example` dosyasını `.env.local` olarak kopyalayın:

```bash
cp .env.example .env.local
```

Ardından `.env.local` dosyasını düzenleyin:

```env
# Resend API Key (https://resend.com adresinden ücretsiz alınabilir)
RESEND_API_KEY=re_your_api_key_here

# İletişim formu email adresi
CONTACT_EMAIL=info@efesurucukursu.com
```

### 4. Development Server'ı Başlatın

```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açın.

## 📝 İçerik Yönetimi

### Kurs Ekleme/Düzenleme

`content/courses.json` dosyasını düzenleyin:

```json
{
  "id": "kurs-id",
  "title": "Kurs Adı",
  "description": "Kurs açıklaması",
  "price": 15000,
  "duration": "2 ay",
  "features": ["Özellik 1", "Özellik 2"],
  "image": "/images/courses/kurs.jpg",
  "popular": false,
  "vehicleType": "both"
}
```

### Blog Yazısı Ekleme

`content/blog/` klasörüne yeni `.mdx` dosyası ekleyin:

```mdx
---
title: "Yazı Başlığı"
date: "2024-02-08"
author: "Efe Sürücü Kursu"
category: "Kategori"
tags: ["tag1", "tag2"]
image: "/images/blog/image.jpg"
excerpt: "Kısa özet..."
published: true
---

# Yazı İçeriği

Buraya yazı içeriğinizi yazın...
```

### Site Ayarları

`content/settings.json` dosyasını düzenleyin.

## 🚀 Deploy

### Vercel'e Deploy (Önerilen - Ücretsiz)

1. GitHub'a projeyi yükleyin
2. [Vercel](https://vercel.com)'e gidin ve GitHub ile giriş yapın
3. Projeyi import edin
4. Environment variables ekleyin:
   - `RESEND_API_KEY`
   - `CONTACT_EMAIL`
5. Deploy butonuna tıklayın

Vercel otomatik olarak:
- Her commit'te yeniden deploy eder
- SSL sertifikası ekler
- CDN üzerinden serve eder
- Önizleme deployment'ları oluşturur

### Manual Build

```bash
npm run build
npm run start
```

## 🔧 Geliştirme Komutları

```bash
# Development server
npm run dev

# Production build
npm run build

# Production server
npm run start

# Linting
npm run lint
```

## 📦 Teknolojiler

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Content**: MDX + JSON
- **Forms**: React Hook Form + Zod
- **Email**: Resend
- **SEO**: Built-in Next.js features
- **Deployment**: Vercel

## 🎨 Magic MCP Kullanımı

Bu proje [21st.dev Magic MCP](https://21st.dev/magic) ile geliştirilmiştir. UI componentleri oluşturmak için:

1. Cursor IDE'de chat'i açın
2. `/ui` komutunu kullanın:
   ```
   /ui create a modern hero section with gradient background
   ```
3. Magic otomatik olarak component oluşturur

## 📧 İletişim Formu Kurulumu

Resend ücretsiz tier özellikleri:
- 3,000 email/ay
- 100 email/gün
- Kendi domain'inizi ekleyebilirsiniz

### Resend Kurulumu:

1. [resend.com](https://resend.com) adresinden hesap oluşturun
2. API key oluşturun
3. `.env.local` dosyasına ekleyin
4. (Opsiyonel) Kendi domain'inizi verify edin

## 🗺️ Google Maps

İletişim sayfasındaki harita Büyükçekmece lokasyonunu gösterir. Kendi lokasyonunuzu eklemek için:

1. [Google Maps](https://maps.google.com) adresinde lokasyonunuzu bulun
2. "Paylaş" > "Harita Ekle" > Embed kodunu kopyalayın
3. `app/iletisim/page.tsx` dosyasında iframe src'yi güncelleyin

## 📊 SEO

Site otomatik olarak şunları içerir:
- Sitemap (`/sitemap.xml`)
- Robots.txt (`/robots.txt`)
- Structured Data (JSON-LD)
- Open Graph tags
- Twitter Card tags

## 🔒 Güvenlik

- Environment variables ile hassas bilgiler korunur
- Form validation (client & server-side)
- Rate limiting (Vercel otomatik)
- CSRF protection (Next.js built-in)

## 📱 Responsive Design

- Mobile-first yaklaşım
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly navigation

## 🆘 Sorun Giderme

### Build Hatası

```bash
rm -rf .next node_modules
npm install
npm run build
```

### Type Errors

```bash
npm run lint
```

### Environment Variables Çalışmıyor

- `.env.local` dosyasının doğru konumda olduğundan emin olun
- Development server'ı restart edin

## 📄 Lisans

Bu proje Efe Sürücü Kursu için özel olarak geliştirilmiştir.

## 🤝 Katkıda Bulunma

Hata raporu veya önerileri için issue açabilirsiniz.

---

**Geliştirici Notu**: Bu proje database kullanmadan, tamamen dosya tabanlı bir sistem ile çalışır. Bu sayede hiçbir ek maliyet yoktur ve bakımı çok kolaydır.
