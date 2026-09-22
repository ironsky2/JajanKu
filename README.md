# 🟢 JajanKuy — Marketplace Mini Perumahan

> **Tagline:** *Jajan dari Tetangga, Mudah & Cepat!*  
> **Platform:** Progressive Web App (PWA) Mobile-First  
> **Tema Desain:** Hijau Segar & Warm Community Market

---

## 📖 Ringkasan Proyek

**JajanKuy** adalah Progressive Web App (PWA) yang mempermudah warga di suatu perumahan untuk menemukan, memesan, dan menikmati produk kuliner, sembako, kerajinan, dan aneka produk rumahan karya tetangga (ibu-ibu rumah tangga dan warga lokal).

Aplikasi dirancang **100% Privacy-Compliant** untuk lingkungan komplek perumahan dinas (tidak mengumbar nama komplek dinas, tidak diindeks Google, dan alamat privat per blok). Pemesanan langsung terintegrasi dengan **WhatsApp URL API** tanpa payment gateway rumit.

---

## 📚 Dokumen Spesifikasi & Perancangan (`docs/`)

Semua dokumen spesifikasi lengkap tersedia di folder [`docs/`](./docs/):

- 📄 **[Product Requirements Document (PRD)](./docs/prd.md)** — Visi produk, fitur pembeli, dashboard penjual ramah gaptek, dan kebijakan privasi.
- 🏗️ **[Tech Stack & Architecture](./docs/tech-stack.md)** — Next.js 14 App Router, TypeScript, Tailwind CSS, Supabase, Vercel, dan Service Worker.
- 📐 **[Wireframe & Blueprint UI](./docs/wireframe.md)** — Cetak biru tata letak 14 layar (Beranda, Katalog, Detail, Keranjang, Checkout WA, Dashboard Penjual, Admin).
- 📢 **[Panduan Sosialisasi WhatsApp](./docs/panduan-sosialisasi-wa.md)** — Strategi peluncuran grup WA dan draf pesan siap kirim ke ibu-ibu perumahan.

*(Salinan langsung juga tersedia di root: [`PRD_PWA_Pasar_Ibu_Perumahan.md`](./PRD_PWA_Pasar_Ibu_Perumahan.md), [`TechStack_JajanKuy.md`](./TechStack_JajanKuy.md), [`Wireframe_JajanKuy.md`](./Wireframe_JajanKuy.md), dan [`Panduan_Sosialisasi_WA_JajanKuy.md`](./Panduan_Sosialisasi_WA_JajanKuy.md)).*

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Fresh Green `#16a34a`)
- **State Management:** Zustand (Cart & LocalStorage Sync)
- **Database / Backend:** Supabase (PostgreSQL, Storage, Auth)
- **Messaging:** WhatsApp URL API (`wa.me/62xxx?text=...`)
- **PWA:** Web App Manifest + Service Worker Offline Ready

---

## 🚀 Menjalankan Proyek Secara Lokal

1. **Instalasi dependencies:**
   ```bash
   npm install
   ```

2. **Jalankan development server:**
   ```bash
   npm run dev
   ```

3. **Buka di browser:**
   Kunjungi [http://localhost:3000](http://localhost:3000) pada browser Anda.
