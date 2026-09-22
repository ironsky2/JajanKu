# 🏗️ Tech Stack & Architecture — JajanKuy PWA
**Technology Design Document**
**Versi:** 1.0
**Tanggal:** 22 September 2026
**Status:** Final

> Dokumen ini adalah lampiran teknis dari [PRD JajanKuy](./PRD_JajanKuy.md).

---

## 1. Ringkasan Stack

| Layer | Teknologi | Versi | Keterangan |
|---|---|---|---|
| **Frontend Framework** | Next.js | 14+ (App Router) | SSR/SSG, PWA, SEO-friendly |
| **Bahasa** | TypeScript | 5+ | Type-safe, mengurangi bug |
| **UI / Styling** | Tailwind CSS | 3+ | Utility-first, mobile-first by default |
| **Database** | Supabase (PostgreSQL) | — | Relasional, gratis, auth built-in |
| **Auth** | Supabase Auth | — | Email & password untuk penjual & admin |
| **Image Storage** | Supabase Storage | — | Gratis 1GB, bundled dengan Supabase |
| **PWA** | next-pwa | — | Service worker & manifest otomatis |
| **WA Integration** | WhatsApp URL API | — | `wa.me/62xxx?text=...` — gratis, tanpa API key |
| **Deployment** | Vercel | — | Gratis, auto-deploy dari GitHub |
| **Source Control** | GitHub | — | Integrasi langsung dengan Vercel |

---

## 2. Arsitektur Sistem

```
┌─────────────────────────────────────────────┐
│                  PENGGUNA                   │
│  Pembeli (browser/PWA)  │  Penjual (HP)     │
└────────────┬────────────┴────────┬──────────┘
             │                    │
             ▼                    ▼
┌────────────────────────────────────────────┐
│           NEXT.JS APP (Vercel)             │
│  ┌─────────────┐    ┌──────────────────┐   │
│  │ Public Pages│    │ Dashboard Seller │   │
│  │ /beranda    │    │ /seller/...      │   │
│  │ /produk     │    ├──────────────────┤   │
│  │ /toko       │    │ Dashboard Admin  │   │
│  │ /keranjang  │    │ /admin/...       │   │
│  │ /checkout   │    └──────────────────┘   │
│  └─────────────┘                           │
│  ┌─────────────────────────────────────┐   │
│  │        Next.js API Routes           │   │
│  │     (server-side logic)             │   │
│  └──────────────┬──────────────────────┘   │
└─────────────────┼──────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│              SUPABASE                        │
│  ┌──────────┐ ┌──────────┐ ┌─────────────┐ │
│  │PostgreSQL│ │  Auth    │ │   Storage   │ │
│  │(database)│ │(penjual/ │ │(foto produk)│ │
│  │          │ │ admin)   │ │             │ │
│  └──────────┘ └──────────┘ └─────────────┘ │
└─────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────┐
│          WHATSAPP (wa.me URL)                │
│  Pesanan dikirim sebagai pesan WA terformat  │
│  langsung ke nomor WA penjual               │
└─────────────────────────────────────────────┘
```

---

## 3. Struktur Database (Supabase / PostgreSQL)

### Tabel Utama

#### `sellers`
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid | Primary key |
| `user_id` | uuid | FK → Supabase Auth users |
| `store_name` | text | Nama toko |
| `name` | text | Nama penjual |
| `wa_number` | text | Nomor WA (format: 628xxx) |
| `photo_url` | text | URL foto profil toko |
| `description` | text | Deskripsi singkat toko |
| `is_active` | boolean | Status aktif/nonaktif |
| `created_at` | timestamp | Tanggal daftar |

#### `categories`
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid | Primary key |
| `name` | text | Nama kategori (misal: Makanan) |
| `slug` | text | URL-friendly (misal: makanan) |
| `icon` | text | Emoji atau nama icon |

#### `products`
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid | Primary key |
| `seller_id` | uuid | FK → sellers |
| `category_id` | uuid | FK → categories |
| `name` | text | Nama produk |
| `slug` | text | URL-friendly |
| `price` | numeric | Harga (dalam Rupiah) |
| `stock` | integer | Jumlah stok |
| `photo_url` | text | URL foto produk |
| `description` | text | Deskripsi singkat (opsional) |
| `is_active` | boolean | Aktif / nonaktif |
| `created_at` | timestamp | Tanggal ditambahkan |

#### `users` *(dikelola Supabase Auth)*
| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid | Primary key |
| `email` | text | Email login |
| `role` | text | `seller` atau `admin` |

### Relasi Antar Tabel

```
users (Supabase Auth)
  └── sellers (1:1, via user_id)
        └── products (1:N, via seller_id)
              └── categories (N:1, via category_id)
```

---

## 4. CI/CD Pipeline

```
Developer push ke GitHub
        ↓
Vercel mendeteksi perubahan (webhook otomatis)
        ↓
Build Next.js di Vercel
        ↓
Deploy otomatis ke Vercel CDN
        ↓
Live di https://jajankuy.vercel.app
   (atau domain custom jika tersedia)
```

> [!TIP]
> Setiap **pull request** di GitHub juga otomatis mendapat **preview URL** dari Vercel,
> sehingga bisa review perubahan sebelum merge ke production.

---

## 5. PWA Configuration

### manifest.json (ringkasan)
```json
{
  "name": "JajanKuy",
  "short_name": "JajanKuy",
  "description": "Jajan dari Tetangga, Mudah & Cepat!",
  "theme_color": "#16a34a",
  "background_color": "#ffffff",
  "display": "standalone",
  "start_url": "/",
  "icons": [...]
}
```

### Service Worker Strategy
| Halaman / Asset | Strategi Cache |
|---|---|
| Halaman beranda & produk | `StaleWhileRevalidate` — load cepat, update di background |
| Foto produk | `CacheFirst` — hemat bandwidth |
| API requests (Supabase) | `NetworkFirst` — data selalu fresh |
| Dashboard penjual | `NetworkOnly` — harus online |

---

## 6. WhatsApp Integration

Pemesanan dikirim via **WhatsApp URL API** tanpa perlu API key atau biaya:

```
https://wa.me/[nomor_wa_penjual]?text=[pesan_terformat]
```

Contoh URL yang digenerate saat checkout:
```
https://wa.me/628123456789?text=Halo+Bu+Sari%2C+saya+ingin+memesan...
```

> [!NOTE]
> URL ini hanya membuka aplikasi WA di HP pembeli dengan pesan sudah terisi.
> Pembeli tetap perlu menekan tombol "Kirim" di WA secara manual.

---

## 7. Free Tier & Batas Kapasitas

| Layanan | Free Tier | Estimasi Cukup Untuk |
|---|---|---|
| **Vercel** | 100GB bandwidth/bulan | ✅ Perumahan skala kecil-menengah |
| **Supabase DB** | 500MB PostgreSQL | ✅ Ribuan produk & penjual |
| **Supabase Storage** | 1GB foto | ✅ ~500–1.000 foto produk |
| **Supabase Auth** | 50.000 MAU | ✅ Puluhan penjual |
| **GitHub** | Unlimited repo | ✅ |

> [!TIP]
> Stack ini **100% gratis** untuk skala perumahan kecil hingga menengah.
> Jika berkembang pesat, upgrade **Supabase Pro** hanya ~\$25/bulan.

---

## 8. Struktur Folder Proyek (Next.js 14 + TypeScript)

Sesuai kesepakatan rancangan, struktur kode diorganisasi menggunakan folder `src/` dengan pemisahan **Route Groups**, **Server Actions**, **Feature-based Components**, dan **Zustand Store**:

```
jajankuy/
├── docs/                              # 📚 Dokumen Spesifikasi & Perancangan Proyek
│   ├── prd.md                         # Product Requirements Document (PRD)
│   ├── tech-stack.md                  # Arsitektur sistem, database, & tech stack
│   └── wireframe.md                   # Blueprint UI wireframe 14 layar
│
├── database/                          # Skrip Database & SQL Manual
│   ├── schema.sql                     # DDL: Tabel, relasi, index, RLS policy
│   └── seed.sql                       # Data awal: Kategori & contoh penjual
│
├── public/                            # Asset Statis & PWA
│   ├── icons/                         # Ikon PWA (192x192, 512x512, maskable)
│   ├── images/                        # Placeholder gambar & banner
│   └── manifest.json                  # Konfigurasi PWA Web App Manifest
│
├── src/
│   ├── actions/                       # Next.js 14 Server Actions (Mutasi Data)
│   │   ├── auth.ts                    # Login/logout penjual & admin
│   │   ├── categories.ts              # CRUD kategori
│   │   ├── products.ts                # CRUD produk penjual (upload, status)
│   │   └── sellers.ts                 # CRUD profil & manajemen akun penjual
│   │
│   ├── app/                           # App Router (Pages & Layouts)
│   │   ├── (buyer)/                   # 🛒 ROUTE GROUP: Halaman Pembeli
│   │   │   ├── layout.tsx             # Layout pembeli (Shell + BottomNav)
│   │   │   ├── page.tsx               # Beranda (/)
│   │   │   ├── produk/
│   │   │   │   ├── page.tsx           # Katalog Semua Produk (/produk)
│   │   │   │   └── [slug]/page.tsx    # Detail Produk (/produk/[slug])
│   │   │   ├── toko/[slug]/page.tsx   # Halaman Toko Penjual (/toko/[slug])
│   │   │   ├── keranjang/page.tsx     # Keranjang Belanja (/keranjang)
│   │   │   └── checkout/page.tsx      # Form Pemesanan (/checkout)
│   │   │
│   │   ├── (seller)/                  # 🏪 ROUTE GROUP: Area Penjual
│   │   │   ├── seller/
│   │   │   │   ├── login/page.tsx     # Login Penjual (/seller/login)
│   │   │   │   ├── layout.tsx         # Layout Dashboard Penjual + Nav
│   │   │   │   ├── dashboard/page.tsx # Ringkasan Stok & Home (/seller/dashboard)
│   │   │   │   ├── produk/
│   │   │   │   │   ├── page.tsx       # Daftar Produk Penjual (/seller/produk)
│   │   │   │   │   └── tambah/page.tsx# Wizard 4-Langkah Tambah Produk
│   │   │   │   └── profil/page.tsx    # Edit Profil Toko (/seller/profil)
│   │   │
│   │   ├── (admin)/                   # 🛡️ ROUTE GROUP: Area Admin
│   │   │   └── admin/
│   │   │       ├── layout.tsx         # Layout Admin Dashboard
│   │   │       ├── page.tsx           # Ringkasan Admin (/admin)
│   │   │       ├── penjual/page.tsx   # Kelola Penjual (/admin/penjual)
│   │   │       └── kategori/page.tsx  # Kelola Kategori (/admin/kategori)
│   │   │
│   │   ├── globals.css                # Tailwind base, components, utilities
│   │   └── layout.tsx                 # Root Layout (Fonts, Metadata, PWA meta)
│   │
│   ├── components/                    # Komponen React (Feature-based)
│   │   ├── ui/                        # Komponen UI dasar (Button, Input, Modal, Badge)
│   │   ├── buyer/                     # Komponen khusus pembeli
│   │   │   ├── BottomNav.tsx          # Navigasi bawah pembeli
│   │   │   ├── ProductCard.tsx        # Kartu produk katalog/beranda
│   │   │   ├── CategoryChip.tsx       # Filter chip kategori
│   │   │   └── StickyCartBar.tsx      # Tombol sticky bawah detail produk
│   │   ├── seller/                    # Komponen khusus penjual
│   │   │   ├── SellerNav.tsx          # Navigasi dashboard penjual
│   │   │   ├── ProductWizardStep.tsx  # Form stepper 4 langkah tambah produk
│   │   │   ├── CameraCapture.tsx      # Komponen foto langsung / upload galeri
│   │   │   └── OnboardingTour.tsx     # Panduan pertama kali login
│   │   └── admin/                     # Komponen khusus admin
│   │       ├── AdminNav.tsx           # Navigasi admin
│   │       └── SellerModal.tsx        # Modal buat akun penjual baru
│   │
│   ├── lib/                           # Utility & Konfigurasi Eksternal
│   │   ├── supabase/
│   │   │   ├── client.ts              # Supabase browser client
│   │   │   ├── server.ts              # Supabase server client (cookies)
│   │   │   └── middleware.ts          # Helper refresh session Supabase
│   │   ├── whatsapp.ts                # Generator link pesan wa.me/...
│   │   └── utils.ts                   # Helper format Rupiah, cn(), slugify
│   │
│   ├── stores/                        # Client-side State Management
│   │   └── cart.ts                    # Zustand Cart Store (LocalStorage sync)
│   │
│   ├── types/                         # TypeScript Definitions
│   │   ├── database.types.ts          # Schema types auto-generate dari Supabase
│   │   ├── product.ts                 # Type Produk & Kategori
│   │   └── cart.ts                    # Type Item Keranjang
│   │
│   └── middleware.ts                  # Route Guard (Proteksi /seller & /admin)
│
├── .env.example                       # Template variabel lingkungan Supabase
├── .gitignore
├── next.config.mjs                    # Next.js + PWA Configuration
├── package.json
├── postcss.config.mjs
├── README.md                          # 📖 Panduan proyek & daftar tautan dokumen
├── tailwind.config.ts                 # Tema warna hijau JajanKuy
└── tsconfig.json
```

---

*Dokumen ini diperbarui seiring keputusan teknis yang berkembang.*
