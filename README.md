# 🟢 JajanKuy — Marketplace Mini Perumahan

> **Tagline:** *Jajan dari Tetangga, Mudah & Cepat!*  
> **Platform:** Progressive Web App (PWA) Mobile-First  
> **Tema Desain:** Hijau Segar & Warm Community Market

---

## 📖 Ringkasan Proyek

**JajanKuy** adalah Progressive Web App (PWA) yang mempermudah warga di suatu perumahan untuk menemukan, memesan, dan menikmati produk kuliner, sembako, kerajinan, dan aneka produk rumahan karya tetangga (ibu-ibu rumah tangga dan warga lokal).

Pemesanan langsung terintegrasi dengan **WhatsApp URL API** tanpa kerumitan payment gateway, sehingga sangat ramah pengguna untuk semua kalangan usia.

---

## 📚 Dokumen Spesifikasi & Perancangan

- 📄 [PRD (Product Requirements Document)](./PRD_PWA_Pasar_Ibu_Perumahan.md) — Visi produk, persona pengguna, fitur utama, dan kriteria rilis MVP.
- 🏗️ [Tech Stack & Architecture](./TechStack_JajanKuy.md) — Arsitektur Next.js 14, TypeScript, Tailwind CSS, Supabase, dan PWA.
- 📐 [Wireframe & Blueprint UI](./Wireframe_JajanKuy.md) — Blueprint tata letak 14 layar (Beranda, Katalog, Detail, Keranjang, Checkout WA, Dashboard Seller, Wizard 4-Langkah, Admin).

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Fresh Emerald `#16a34a` & Amber `#f59e0b`)
- **State Management:** Zustand (Cart & Local Reactive Store)
- **Database / Backend:** Supabase (PostgreSQL, Storage, Auth)
- **Messaging:** WhatsApp URL API (`wa.me/62xxx?text=...`)
- **PWA:** Web App Manifest + Service Worker Offline Ready
