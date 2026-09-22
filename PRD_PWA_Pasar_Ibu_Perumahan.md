# 📄 PRD — JajanKuy PWA
**Product Requirements Document**
**Versi:** 1.1
**Tanggal:** 22 September 2026
**Status:** Draft

---

## 1. Ringkasan Produk

**Nama Produk:** **JajanKuy** — Marketplace Mini Perumahan

**Tagline:** *Jajan dari Tetangga, Mudah & Cepat!*

**Branding:**
- **Penulisan resmi:** JajanKuy (J dan K kapital)
- **Warna utama:** Hijau segar 🟢 (mencerminkan segar, alami, cocok untuk produk makanan & rumahan)

**Deskripsi Singkat:**
JajanKuy adalah Progressive Web App (PWA) yang memungkinkan ibu-ibu rumah tangga di suatu perumahan untuk berjualan produk mereka (makanan, kebutuhan rumah tangga, kecantikan, kerajinan, dll.) secara online. Pembeli dapat browse produk dari berbagai penjual, menambahkan ke keranjang, lalu menyelesaikan pemesanan yang secara otomatis akan dikirim sebagai pesan WhatsApp langsung ke penjual.

**Target Pengguna:**
- **Pembeli:** Warga perumahan yang ingin membeli produk dari tetangga secara mudah
- **Penjual:** Ibu-ibu rumah tangga di perumahan yang ingin berjualan online secara simpel
- **Admin:** Pengelola platform (bisa ketua RT/RW atau koordinator perumahan)

---

## 2. Latar Belakang & Masalah yang Diselesaikan

| Masalah | Solusi PWA |
|---|---|
| Pembeli kesulitan mengetahui siapa yang jual apa di perumahan | Katalog produk terpusat dari semua penjual |
| Pemesanan masih via chat manual tanpa format baku | Form pemesanan terstruktur, dikirim otomatis ke WA penjual |
| Penjual kesulitan promosi & kelola stok | Dashboard penjual untuk kelola produk & stok |
| Tidak ada tampilan profesional untuk jualan | Storefront digital untuk setiap penjual |

---

## 3. Tujuan Produk (Goals)

1. Mempermudah warga perumahan untuk menemukan & memesan produk dari tetangga
2. Membantu ibu-ibu penjual mendapatkan lebih banyak pembeli tanpa keahlian teknis
3. Mengintegrasikan proses pemesanan langsung dengan WhatsApp (tanpa payment gateway)
4. Mendukung model multi-seller (marketplace mini) yang bisa berkembang

---

## 4. Fitur Utama

### 4.1 Halaman Publik (Pembeli)

#### 🏠 Beranda
- Banner/hero sambutan
- Daftar kategori produk (Makanan & Minuman, Sembako, Kecantikan, Kerajinan, Lainnya)
- Produk unggulan / terbaru
- Daftar penjual aktif di perumahan

#### 🔍 Katalog & Pencarian
- Browse semua produk
- Filter berdasarkan: kategori, penjual, harga
- Pencarian produk (nama atau penjual)
- Tampilan grid / list

#### 📦 Halaman Produk
Setiap produk menampilkan:
- Foto produk
- Nama produk
- Harga
- Deskripsi singkat
- Status stok (Tersedia / Habis)
- Nama & profil singkat penjual
- Tombol **"Tambah ke Keranjang"**
- Tombol **"Pesan via WA"** (langsung ke WA penjual, 1 produk)

#### 🏪 Halaman Toko Penjual
- Foto & nama penjual
- Deskripsi singkat toko
- Daftar produk dari penjual tersebut
- Tombol WA langsung ke penjual

#### 🛒 Keranjang Belanja
- Daftar produk yang dipilih (dari 1 penjual)
- Ubah jumlah / hapus produk
- Total harga
- Tombol "Lanjut Pesan"

> [!NOTE]
> Keranjang hanya bisa berisi produk dari **1 penjual** dalam satu sesi order.
> Jika pembeli ingin beli dari penjual lain, mereka perlu memesan secara terpisah.

#### 📋 Form Pemesanan (Checkout)
Data yang diisi pembeli:
- **Nama lengkap** *(wajib)*
- **Nomor WhatsApp** *(wajib)*
- **Alamat** (blok / nomor rumah di perumahan) *(wajib)*
- **Pilihan pengiriman:** Pickup (ambil sendiri) / Delivery (antar ke rumah) *(wajib)*
- **Catatan tambahan / request khusus** *(opsional)*

Setelah submit → otomatis buka WA penjual dengan pesan terformat:

```
Halo [Nama Penjual], saya ingin memesan:

🛒 *Detail Pesanan:*
- [Nama Produk] x[Qty] — Rp[Harga]
- [Nama Produk] x[Qty] — Rp[Harga]

💰 *Total:* Rp[Total]

👤 *Data Pemesan:*
- Nama: [Nama Pembeli]
- No. WA: [Nomor WA]
- Alamat: [Alamat]
- Pengiriman: [Pickup / Delivery]
- Catatan: [Catatan]

Mohon konfirmasi pesanan saya. Terima kasih! 🙏
```

---

### 4.2 Dashboard Penjual

> [!NOTE]
> Dashboard penjual dirancang **ramah pemula** — font besar, tombol besar, langkah sesedikit mungkin.
> Ibu-ibu yang tidak bisa mengoperasikan sistem dapat **minta bantuan admin** untuk menginput produk via WA.

#### 🔐 Autentikasi Penjual
- Login dengan email & password
- Tidak perlu daftar sendiri — **admin yang buatkan akun** untuk setiap penjual

#### 🎓 Onboarding Pertama Kali (First-Time Tour)
- Saat pertama login, muncul **panduan singkat step-by-step** (onboarding tour)
- Menjelaskan: cara tambah produk, cara aktifkan/nonaktifkan, cara edit profil

#### 📊 Ringkasan (Home Dashboard)
- Jumlah produk aktif
- Produk yang stoknya hampir habis / kosong
- Tombol besar: **"+ Tambah Produk Baru"**

#### 🛍️ Tambah Produk — Alur 4 Langkah Simpel

```
Langkah 1: 📷 Upload Foto
            (Ambil foto langsung dari kamera ATAU pilih dari galeri)
    ↓
Langkah 2: ✏️ Nama Produk & Harga
    ↓
Langkah 3: 📦 Jumlah Stok
    ↓
Langkah 4: ✅ Simpan
```

- Kategori diisi otomatis oleh admin, atau bisa dipilih dari dropdown
- Deskripsi bersifat **opsional** (tidak wajib diisi)
- Tombol besar, label jelas, satu langkah per layar

#### 🔄 Kelola Status Produk
- **Tombol besar "Nonaktifkan" / "Aktifkan"** di setiap produk
- Produk nonaktif tidak tampil ke pembeli, tapi data tetap tersimpan
- Tidak ada fitur hapus permanen (mencegah salah tekan)

#### ✏️ Edit Produk
- Bisa ubah foto, nama, harga, atau stok kapan saja

#### 👤 Profil Toko
- Edit nama toko, foto profil, deskripsi singkat, nomor WA

#### ❓ Halaman Bantuan / FAQ
- Panduan bergambar (screenshot step-by-step) cara pakai fitur utama
- Ditulis dalam bahasa Indonesia yang sederhana

---

### 4.3 Dashboard Admin

#### 👥 Manajemen Penjual
- Tambah penjual baru (buat akun email & password)
- Nonaktifkan / aktifkan penjual
- Lihat daftar semua penjual

#### 📦 Input Produk untuk Penjual (Bantuan Admin)
- Admin bisa **tambah / edit produk atas nama penjual mana pun**
- Cocok untuk penjual yang tidak bisa input sendiri
- Alur: penjual kirim foto & info via WA → admin input ke sistem

#### 🗂️ Manajemen Kategori
- Tambah / edit / hapus kategori produk

#### 📋 Pantau Semua Produk
- Lihat semua produk dari semua penjual
- Nonaktifkan produk yang tidak sesuai aturan

---

## 5. Alur Pengguna (User Flow)

### Alur Pembeli
```
Buka PWA → Browse Produk → Pilih Produk
   ↓
Pilih: Pesan Langsung WA  →  Buka WA Penjual (1 produk)
   ↓
Atau: Tambah ke Keranjang → Checkout → Isi Form → Submit → Buka WA Penjual (banyak produk)
```

### Alur Penjual
```
Login Dashboard → Kelola Produk (tambah/edit/hapus/stok)
   ↓
Terima pesan WA dari pembeli → Konfirmasi via WA → Proses pesanan
```

### Alur Admin
```
Login Dashboard Admin → Daftarkan Penjual → Kelola Kategori → Pantau Produk
```

---

## 6. Non-Fungsional Requirements

| Aspek | Ketentuan |
|---|---|
| **PWA** | Installable, manifest.json, service worker, offline-ready (halaman produk bisa di-cache) |
| **Mobile-first** | Dioptimalkan untuk layar HP (320px–430px), touch-friendly |
| **Performa** | Target Lighthouse score > 80 |
| **Bahasa** | Bahasa Indonesia |
| **Pembayaran** | Tidak ada payment gateway — COD / transfer manual diatur langsung via WA |
| **Keamanan** | Autentikasi hanya untuk penjual & admin; pembeli guest checkout |

---

## 7. Halaman / Rute Aplikasi

| Route | Deskripsi | Akses |
|---|---|---|
| `/` | Beranda | Publik |
| `/produk` | Semua produk | Publik |
| `/produk/[slug]` | Detail produk | Publik |
| `/toko/[slug]` | Halaman toko penjual | Publik |
| `/keranjang` | Keranjang belanja | Publik |
| `/checkout` | Form pemesanan | Publik |
| `/seller/login` | Login penjual | Publik |
| `/seller/dashboard` | Dashboard penjual | Penjual |
| `/seller/produk` | Kelola produk | Penjual |
| `/seller/profil` | Profil toko | Penjual |
| `/admin` | Dashboard admin | Admin |
| `/admin/penjual` | Kelola penjual | Admin |
| `/admin/kategori` | Kelola kategori | Admin |

---

## 8. Stack Teknologi (Rekomendasi)

| Layer | Teknologi | Alasan |
|---|---|---|
| **Frontend** | Next.js 14 (App Router) | Modern, SEO-friendly, PWA support |
| **UI** | Tailwind CSS + shadcn/ui | Cepat, konsisten, mobile-first |
| **Backend / DB** | Supabase | Gratis, PostgreSQL, auth built-in, storage foto |
| **Deployment** | Vercel | Gratis, auto-deploy, optimal untuk Next.js |
| **WA Integration** | WhatsApp API URL (`wa.me/...`) | Gratis, tanpa perlu API key |
| **PWA** | next-pwa | Service worker & manifest otomatis |

> [!TIP]
> Stack ini **100% gratis** untuk skala perumahan kecil hingga menengah.
> Supabase free tier: 500MB database, 1GB storage foto produk.

---

## 9. Prioritas Pengembangan (MVP vs Future)

### ✅ MVP (Versi 1 — Harus Ada)
- [x] Beranda & katalog produk
- [x] Halaman detail produk
- [x] Halaman toko penjual
- [x] Form checkout + integrasi WA
- [x] Pesan langsung WA per produk
- [x] Keranjang belanja (1 penjual)
- [x] Dashboard penjual (CRUD produk, profil)
- [x] Dashboard admin (kelola penjual & kategori)
- [x] PWA installable (manifest + service worker)

### 🔮 Future (Versi Berikutnya)
- [ ] Notifikasi push saat produk baru tersedia
- [ ] Rating & ulasan produk
- [ ] Fitur promo / diskon
- [ ] Riwayat pesanan (dengan simpan no. WA pembeli)
- [ ] Laporan penjualan untuk penjual
- [ ] Multi-bahasa (Jawa/Sunda)
- [ ] Keranjang lintas penjual

---

## 10. Pertanyaan Terbuka

> [!IMPORTANT]
> Keputusan berikut masih perlu dikonfirmasi sebelum development dimulai:

1. ~~**Nama Aplikasi**~~ ✅ **JajanKuy** — *sudah disepakati*
2. ~~**Logo & Warna**~~ ✅ **Hijau segar** sebagai warna utama — *sudah disepakati*
3. **Nama Perumahan** — Apakah nama perumahan akan ditampilkan di dalam aplikasi (misal di footer)?
4. **Batas Wilayah** — Apakah hanya warga perumahan tertentu yang bisa daftar sebagai penjual, atau terbuka umum?
5. **Siapa Admin?** — Siapa yang akan berperan sebagai admin platform?
6. **Domain** — Apakah ada nama domain khusus, atau pakai subdomain Vercel gratis (misal: `jajankuy.vercel.app`)?

---

## 11. Kriteria Sukses (Definition of Done - MVP)

- [ ] Pembeli dapat browse & memesan produk tanpa perlu login
- [ ] Pesanan terkirim otomatis ke WA penjual dengan format yang jelas
- [ ] Penjual dapat login dan mengelola produk mereka secara mandiri
- [ ] Admin dapat mendaftarkan penjual baru
- [ ] PWA dapat diinstal di HP Android pembeli
- [ ] Semua halaman utama responsif di layar mobile

---

*Dokumen ini akan diperbarui seiring perkembangan diskusi dan development.*
