# 📐 Wireframe — JajanKuy PWA
**Wireframe Design Document**
**Versi:** 1.0
**Tanggal:** 22 September 2026
**Target Layar:** Mobile 375px · Portrait · Android

> Wireframe ini adalah representasi teks/ASCII dari tata letak visual setiap halaman.
> Warna utama: **Hijau Segar** 🟢 · Navigasi: **Bottom Navigation Bar**

---

## Legenda

```
┌─────────────────────┐   = batas layar / container
│ [    TOMBOL    ]    │   = tombol / button
│ ○ ○ ○               │   = indikator / bullet
│ ████████████        │   = gambar / image placeholder
│ ▓▓▓▓▓ (hijau)       │   = elemen warna utama (hijau)
│ ░░░░░░░░░░░░        │   = area abu-abu / disabled
│ ___________         │   = input field
│ ▼                   │   = dropdown
│ ☰                   │   = hamburger / menu
│ 🔍                  │   = ikon search
│ 🛒                  │   = ikon keranjang
│ ♡                   │   = ikon favorit
│ ✓                   │   = centang / checked
```

---

## 1. Beranda (Home)

```
┌─────────────────────────────┐
│  📱 STATUS BAR              │
├─────────────────────────────┤
│  🟢 JajanKuy        🛒 (2) │  ← Header + ikon keranjang
├─────────────────────────────┤
│ 🔍  Cari produk atau toko  │  ← Search bar
├─────────────────────────────┤
│                             │
│  ┌─────────────────────┐   │
│  │                     │   │
│  │   BANNER / HERO     │   │  ← Banner sambutan
│  │  "Jajan dari        │   │
│  │   Tetangga! 🛍️"     │   │
│  │                     │   │
│  └─────────────────────┘   │
│       ○ ● ○ ○              │  ← Dot indicator (carousel)
│                             │
├─────────────────────────────┤
│  📂 Kategori                │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐│
│  │ 🍱 │ │ 🧴 │ │ 🛒 │ │ 🧶 ││  ← Ikon kategori
│  │Mkn │ │Ktk │ │Smb │ │Krj ││
│  └────┘ └────┘ └────┘ └────┘│
│         [ Lihat Semua ]     │
├─────────────────────────────┤
│  🔥 Produk Terbaru          │
│                             │
│  ┌─────────────────────┐   │
│  │  ████████████████   │   │  ← Foto produk (lebar penuh)
│  ├─────────────────────┤   │
│  │ Risoles Mayo        │   │
│  │ Bu Sari · ⭐ Aktif  │   │
│  │ Rp 2.000/pcs        │   │
│  │ [+Keranjang] [WA]   │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │  ████████████████   │   │
│  ├─────────────────────┤   │
│  │ Sambal Bawang       │   │
│  │ Bu Dewi · ⭐ Aktif  │   │
│  │ Rp 15.000/botol     │   │
│  │ [+Keranjang] [WA]   │   │
│  └─────────────────────┘   │
│                             │
│      [ Lihat Semua Produk ] │
├─────────────────────────────┤
│  🏪 Penjual di Sini         │
│  ┌──────┐ ┌──────┐ ┌──────┐│
│  │  👩  │ │  👩  │ │  👩  ││  ← Foto avatar penjual
│  │Bu    │ │Bu    │ │Bu    ││
│  │Sari  │ │Dewi  │ │Rina  ││
│  └──────┘ └──────┘ └──────┘│
├─────────────────────────────┤
│  🏠    🛍️    🛒    🏪      │  ← Bottom Navigation
│Beranda Produk Kerj  Toko   │
└─────────────────────────────┘
```

---

## 2. Katalog Produk

```
┌─────────────────────────────┐
│  📱 STATUS BAR              │
├─────────────────────────────┤
│  ← Semua Produk     🛒 (2) │  ← Header + back button
├─────────────────────────────┤
│ 🔍  Cari produk...         │  ← Search bar
├─────────────────────────────┤
│ [Semua] [Makanan] [Kecantik]│  ← Filter chip (scroll horizontal)
│ [Sembako] [Kerajinan]       │
├─────────────────────────────┤
│  Sort: Terbaru ▼   12 item │
├─────────────────────────────┤
│                             │
│  ┌─────────────────────┐   │
│  │  ████████████████   │   │  ← Foto produk (full width)
│  ├─────────────────────┤   │
│  │ Risoles Mayo        │   │  ← Nama produk
│  │ 🏪 Bu Sari          │   │  ← Nama penjual
│  │ Rp 2.000 / pcs      │   │  ← Harga
│  │ Stok: 50  ✅ Tersedia│   │
│  │ [+ Keranjang] [📲 WA]│   │  ← CTA buttons
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │  ████████████████   │   │
│  ├─────────────────────┤   │
│  │ Sambal Bawang       │   │
│  │ 🏪 Bu Dewi          │   │
│  │ Rp 15.000 / botol   │   │
│  │ Stok: 10  ✅ Tersedia│   │
│  │ [+ Keranjang] [📲 WA]│   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │  ████████████████   │   │
│  ├─────────────────────┤   │
│  │ Kue Nastar          │   │
│  │ 🏪 Bu Rina          │   │
│  │ Rp 65.000 / toples  │   │
│  │ Stok: 0  ❌ Habis   │   │
│  │  [░░░░░░░░░░░░░░░]  │   │  ← Tombol disabled saat habis
│  └─────────────────────┘   │
│                             │
├─────────────────────────────┤
│  🏠    🛍️    🛒    🏪      │
│Beranda Produk Kerj  Toko   │
└─────────────────────────────┘
```

---

## 3. Detail Produk

```
┌─────────────────────────────┐
│  📱 STATUS BAR              │
├─────────────────────────────┤
│  ← Detail Produk    🛒 (2) │
├─────────────────────────────┤
│                             │
│  ┌─────────────────────┐   │
│  │                     │   │
│  │  ████████████████   │   │  ← Foto produk besar
│  │  ████████████████   │   │
│  │  ████████████████   │   │
│  │                     │   │
│  └─────────────────────┘   │
│       ○ ● ○                │  ← Multi foto (jika ada)
│                             │
│  Risoles Mayo               │  ← Nama produk (font besar)
│  Rp 2.000 / pcs            │  ← Harga (hijau, tebal)
│  ✅ Stok tersedia (50 pcs) │
│                             │
│  ─────────────────────────  │
│  📦 Tentang Produk          │
│  Risoles isi mayo dan telur │
│  puyuh, dibuat fresh setiap │
│  hari. Minimal order 5 pcs. │
│                             │
│  ─────────────────────────  │
│  🏪 Penjual                 │
│  ┌─────────────────────┐   │
│  │ 👩 Bu Sari          │   │  ← Info penjual
│  │    Toko Sari Jaya   │   │
│  │    📲 Hubungi       │   │
│  └─────────────────────┘   │
│                             │
│                             │
│  ─────────────────────────  │
│  ← Lihat semua produk toko  │
│                             │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  ← Spacer untuk sticky CTA
├─────────────────────────────┤
│  Qty: [ - ] 1 [ + ]        │  ← Quantity selector
│                             │
│  ┌──────────┐ ┌───────────┐ │
│  │+Keranjang│ │📲 Pesan WA│ │  ← STICKY CTA (selalu terlihat)
│  └──────────┘ └───────────┘ │
└─────────────────────────────┘
```

---

## 4. Halaman Toko Penjual

```
┌─────────────────────────────┐
│  📱 STATUS BAR              │
├─────────────────────────────┤
│  ← Toko Sari Jaya   🛒 (2) │
├─────────────────────────────┤
│                             │
│  ┌─────────────────────┐   │
│  │  ██ COVER TOKO ██   │   │  ← Banner / cover toko
│  │  ██████████████████ │   │
│  └─────────────────────┘   │
│         👩                  │  ← Foto avatar (di atas cover)
│  Toko Sari Jaya             │  ← Nama toko (tebal)
│  Bu Sari Rahayu             │  ← Nama penjual
│  📍 Blok C No. 12           │  ← Alamat blok (opsional)
│  ─────────────────────────  │
│  Risoles homemade, kue      │
│  kering, & aneka frozen food│  ← Deskripsi toko
│  ─────────────────────────  │
│                             │
│  [ 📲 Chat WA Penjual ]     │  ← Tombol WA langsung
│                             │
│  ─────────────────────────  │
│  🛍️ Produk (8)              │
│                             │
│  ┌─────────────────────┐   │
│  │  ████████████████   │   │
│  ├─────────────────────┤   │
│  │ Risoles Mayo        │   │
│  │ Rp 2.000 / pcs      │   │
│  │ ✅ Tersedia         │   │
│  │ [+ Keranjang] [WA]  │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │  ████████████████   │   │
│  ├─────────────────────┤   │
│  │ Nastar Keju         │   │
│  │ Rp 65.000 / toples  │   │
│  │ ✅ Tersedia         │   │
│  │ [+ Keranjang] [WA]  │   │
│  └─────────────────────┘   │
│                             │
├─────────────────────────────┤
│  🏠    🛍️    🛒    🏪      │
│Beranda Produk Kerj  Toko   │
└─────────────────────────────┘
```

---

## 5. Keranjang Belanja

```
┌─────────────────────────────┐
│  📱 STATUS BAR              │
├─────────────────────────────┤
│  Keranjang Saya             │
├─────────────────────────────┤
│  🏪 Toko Sari Jaya          │  ← Nama penjual
│  ─────────────────────────  │
│  ┌─────────────────────┐   │
│  │ ██ │ Risoles Mayo   │   │
│  │    │ Rp 2.000/pcs   │   │
│  │    │ [ - ] 5 [ + ]  │   │  ← Qty control
│  │    │ Subtotal 10.000│   │
│  │    │           🗑️   │   │  ← Tombol hapus
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ ██ │ Nastar Keju    │   │
│  │    │ Rp 65.000/topl │   │
│  │    │ [ - ] 1 [ + ]  │   │
│  │    │ Subtotal 65.000│   │
│  │    │           🗑️   │   │
│  └─────────────────────┘   │
│                             │
│  ─────────────────────────  │
│  📝 Catatan untuk penjual   │
│  ┌─────────────────────┐   │
│  │ Tulis catatan...    │   │  ← Optional note
│  └─────────────────────┘   │
│                             │
├─────────────────────────────┤
│  Total: Rp 75.000          │
│  (2 produk dari 1 toko)    │
│                             │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│  [   Lanjut Pesan →   ]    │  ← CTA Sticky hijau
└─────────────────────────────┘
```

---

## 6. Form Checkout (Pemesanan)

```
┌─────────────────────────────┐
│  📱 STATUS BAR              │
├─────────────────────────────┤
│  ← Isi Data Pesanan         │
├─────────────────────────────┤
│                             │
│  📋 Ringkasan Pesanan       │
│  ┌─────────────────────┐   │
│  │ Risoles Mayo  x5    │   │
│  │ Nastar Keju   x1    │   │
│  │ Total: Rp 75.000    │   │
│  └─────────────────────┘   │
│                             │
│  ─────────────────────────  │
│  👤 Data Pemesan            │
│                             │
│  Nama Lengkap *             │
│  ┌─────────────────────┐   │
│  │ Masukkan nama...    │   │
│  └─────────────────────┘   │
│                             │
│  Nomor WhatsApp *           │
│  ┌─────────────────────┐   │
│  │ 08xx-xxxx-xxxx      │   │
│  └─────────────────────┘   │
│                             │
│  Alamat (Blok/No. Rumah) *  │
│  ┌─────────────────────┐   │
│  │ Misal: Blok B No. 5 │   │
│  └─────────────────────┘   │
│                             │
│  Pilihan Pengiriman *       │
│  ┌──────────┐ ┌───────────┐ │
│  │ ✓ Pickup │ │  Delivery │ │  ← Toggle pilihan
│  │ Ambil    │ │  Antar ke │ │
│  │ Sendiri  │ │  Rumah    │ │
│  └──────────┘ └───────────┘ │
│                             │
│  Catatan (Opsional)         │
│  ┌─────────────────────┐   │
│  │ Misal: tolong       │   │
│  │ dikemas rapi...     │   │
│  └─────────────────────┘   │
│                             │
├─────────────────────────────┤
│  [ 📲 Kirim Pesanan via WA ]│  ← CTA sticky hijau besar
│  Pesanan dikirim ke WA      │
│  penjual secara otomatis    │
└─────────────────────────────┘
```

---

## 7. Login Penjual

```
┌─────────────────────────────┐
│  📱 STATUS BAR              │
├─────────────────────────────┤
│                             │
│                             │
│         🟢 JajanKuy         │  ← Logo
│   Jajan dari Tetangga,      │
│    Mudah & Cepat!           │  ← Tagline
│                             │
│  ─────────────────────────  │
│  Masuk sebagai Penjual      │
│                             │
│  Email                      │
│  ┌─────────────────────┐   │
│  │ email@contoh.com    │   │
│  └─────────────────────┘   │
│                             │
│  Kata Sandi                 │
│  ┌─────────────────────┐   │
│  │ ••••••••••      👁️  │   │  ← Show/hide password
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │      Masuk          │   │  ← Tombol hijau besar
│  └─────────────────────┘   │
│                             │
│  Lupa kata sandi?           │
│                             │
│  ─────────────────────────  │
│  Belum punya akun?          │
│  Hubungi admin untuk        │
│  mendaftarkan toko Anda.    │
│                             │
│  [ 📲 Hubungi Admin via WA ]│  ← Link WA admin
│                             │
└─────────────────────────────┘
```

---

## 8. Dashboard Penjual — Home

```
┌─────────────────────────────┐
│  📱 STATUS BAR              │
├─────────────────────────────┤
│  Dashboard Penjual    👤    │  ← Nama penjual / profil
├─────────────────────────────┤
│                             │
│  Halo, Bu Sari! 👋          │  ← Sapaan personal
│  Toko Sari Jaya             │
│                             │
│  ─────────────────────────  │
│  📊 Ringkasan Toko          │
│  ┌──────────┐ ┌───────────┐ │
│  │    8     │ │     2     │ │
│  │ Produk   │ │  Hampir   │ │
│  │ Aktif    │ │  Habis 🔴 │ │
│  └──────────┘ └───────────┘ │
│                             │
│  ─────────────────────────  │
│                             │
│  ┌─────────────────────┐   │
│  │  ▓▓ + Tambah Produk │   │  ← Tombol hijau BESAR
│  │       Baru          │   │
│  └─────────────────────┘   │
│                             │
│  ─────────────────────────  │
│  ⚠️ Stok Hampir Habis       │
│                             │
│  ┌─────────────────────┐   │
│  │ Risoles Mayo   Sisa:│   │
│  │ ████░░░░░░░░░  3    │   │  ← Progress bar stok
│  │           [Edit]    │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ Kue Nastar     Sisa:│   │
│  │ ██░░░░░░░░░░░  1    │   │
│  │           [Edit]    │   │
│  └─────────────────────┘   │
│                             │
├─────────────────────────────┤
│  🏠      🛍️      👤        │  ← Bottom nav dashboard
│Dashboard Produk  Profil    │
└─────────────────────────────┘
```

---

## 9. Dashboard Penjual — Tambah Produk (Wizard 4 Langkah)

### Langkah 1: Upload Foto
```
┌─────────────────────────────┐
│  📱 STATUS BAR              │
├─────────────────────────────┤
│  ← Tambah Produk            │
│  ● ○ ○ ○  Langkah 1 dari 4 │  ← Progress indicator
├─────────────────────────────┤
│                             │
│  📷 Foto Produk             │
│                             │
│  ┌─────────────────────┐   │
│  │                     │   │
│  │       📷            │   │
│  │                     │   │
│  │  Ketuk untuk tambah │   │  ← Area upload foto
│  │       foto          │   │
│  │                     │   │
│  └─────────────────────┘   │
│                             │
│  ┌──────────┐ ┌───────────┐ │
│  │ 📷 Kamera│ │ 🖼️ Galeri │ │  ← Pilihan sumber foto
│  └──────────┘ └───────────┘ │
│                             │
│  Tips: Gunakan foto yang    │
│  terang dan jelas agar      │
│  produk terlihat menarik 💡 │
│                             │
│                             │
│                             │
│                             │
├─────────────────────────────┤
│  [ Lanjut → ]               │  ← CTA Sticky
└─────────────────────────────┘
```

### Langkah 2: Nama & Harga
```
┌─────────────────────────────┐
│  📱 STATUS BAR              │
├─────────────────────────────┤
│  ← Tambah Produk            │
│  ✓ ● ○ ○  Langkah 2 dari 4 │
├─────────────────────────────┤
│                             │
│  ██ (thumbnail foto)        │  ← Preview foto kecil
│                             │
│  ✏️ Nama & Harga Produk     │
│                             │
│  Nama Produk *              │
│  ┌─────────────────────┐   │
│  │ Misal: Risoles Mayo │   │
│  └─────────────────────┘   │
│                             │
│  Harga *                    │
│  ┌─────────────────────┐   │
│  │ Rp  _______________  │   │
│  └─────────────────────┘   │
│                             │
│  Satuan (opsional)          │
│  ┌─────────────────────┐   │
│  │ Misal: per pcs, per │   │
│  │ toples, per botol...│   │
│  └─────────────────────┘   │
│                             │
│  Kategori                   │
│  ┌─────────────────────┐   │
│  │ Makanan & Minuman ▼ │   │  ← Dropdown kategori
│  └─────────────────────┘   │
│                             │
├─────────────────────────────┤
│  [ ← Kembali ] [ Lanjut → ]│
└─────────────────────────────┘
```

### Langkah 3: Stok
```
┌─────────────────────────────┐
│  📱 STATUS BAR              │
├─────────────────────────────┤
│  ← Tambah Produk            │
│  ✓ ✓ ● ○  Langkah 3 dari 4 │
├─────────────────────────────┤
│                             │
│  ██  Risoles Mayo           │  ← Preview nama + foto
│      Rp 2.000/pcs           │
│                             │
│  📦 Jumlah Stok             │
│                             │
│  ┌─────────────────────┐   │
│  │  [ − ]   50   [ + ] │   │  ← Stepper stok besar
│  └─────────────────────┘   │
│                             │
│  atau ketik langsung:       │
│  ┌─────────────────────┐   │
│  │  50                 │   │
│  └─────────────────────┘   │
│                             │
│  ℹ️ Stok akan otomatis      │
│  berkurang saat ada pesanan │
│  ─────────────────────────  │
│  Deskripsi (Opsional)       │
│  ┌─────────────────────┐   │
│  │ Ceritakan sedikit   │   │
│  │ tentang produk...   │   │
│  └─────────────────────┘   │
│                             │
├─────────────────────────────┤
│  [ ← Kembali ] [ Lanjut → ]│
└─────────────────────────────┘
```

### Langkah 4: Konfirmasi & Simpan
```
┌─────────────────────────────┐
│  📱 STATUS BAR              │
├─────────────────────────────┤
│  ← Tambah Produk            │
│  ✓ ✓ ✓ ●  Langkah 4 dari 4 │
├─────────────────────────────┤
│                             │
│  ✅ Cek Produk Anda         │
│                             │
│  ┌─────────────────────┐   │
│  │  ████████████████   │   │  ← Preview foto
│  ├─────────────────────┤   │
│  │ Nama    : Risoles   │   │
│  │           Mayo      │   │
│  │ Harga   : Rp 2.000  │   │
│  │ Satuan  : per pcs   │   │
│  │ Stok    : 50        │   │
│  │ Kategori: Makanan   │   │
│  └─────────────────────┘   │
│                             │
│  Sudah benar?               │
│  Tekan Simpan untuk         │
│  menampilkan ke pembeli.    │
│                             │
│                             │
│                             │
│                             │
├─────────────────────────────┤
│ [← Kembali] [✓ Simpan Produk│  ← CTA Simpan hijau
└─────────────────────────────┘
```

---

## 10. Dashboard Penjual — Daftar Produk

```
┌─────────────────────────────┐
│  📱 STATUS BAR              │
├─────────────────────────────┤
│  Produk Saya          🔍    │
├─────────────────────────────┤
│                             │
│  ┌─────────────────────┐   │
│  │  ▓▓ + Tambah Produk │   │  ← CTA tambah produk
│  └─────────────────────┘   │
│                             │
│  [Semua (8)] [Aktif (6)]    │  ← Filter tabs
│  [Nonaktif (2)]             │
│                             │
│  ─────────────────────────  │
│                             │
│  ┌─────────────────────┐   │
│  │ ██ │ Risoles Mayo   │   │
│  │    │ Rp 2.000 / pcs │   │
│  │    │ Stok: 50       │   │
│  │    │ 🟢 Aktif       │   │
│  │    │ [Edit] [Nonakt]│   │  ← Tombol aksi
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ ██ │ Nastar Keju    │   │
│  │    │ Rp 65.000/topl │   │
│  │    │ Stok: 1 ⚠️     │   │  ← Warning stok hampir habis
│  │    │ 🟢 Aktif       │   │
│  │    │ [Edit] [Nonakt]│   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ ██ │ Kue Putri Salju│   │
│  │    │ Rp 55.000/topl │   │
│  │    │ Stok: 0        │   │
│  │    │ ⚫ Nonaktif     │   │
│  │    │ [Edit] [Aktifk]│   │  ← Tombol aktifkan
│  └─────────────────────┘   │
│                             │
├─────────────────────────────┤
│  🏠      🛍️      👤        │
│Dashboard Produk  Profil    │
└─────────────────────────────┘
```

---

## 11. Dashboard Admin — Kelola Penjual

```
┌─────────────────────────────┐
│  📱 STATUS BAR              │
├─────────────────────────────┤
│  🟢 Admin JajanKuy    👤    │
├─────────────────────────────┤
│                             │
│  ┌──────────┐ ┌───────────┐ │
│  │   12     │ │    85     │ │
│  │ Penjual  │ │  Total    │ │  ← Ringkasan admin
│  │ Aktif    │ │  Produk   │ │
│  └──────────┘ └───────────┘ │
│                             │
│  ─────────────────────────  │
│  👥 Kelola Penjual          │
│                             │
│  ┌─────────────────────┐   │
│  │  + Tambah Penjual   │   │  ← Tombol tambah penjual
│  └─────────────────────┘   │
│                             │
│ 🔍 Cari penjual...          │
│                             │
│  ┌─────────────────────┐   │
│  │ 👩 Bu Sari Rahayu   │   │
│  │    sari@email.com   │   │
│  │    8 produk · 🟢    │   │  ← Status aktif
│  │    [Lihat] [Nonaktif│   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ 👩 Bu Dewi Kartika  │   │
│  │    dewi@email.com   │   │
│  │    5 produk · 🟢    │   │
│  │    [Lihat] [Nonaktif│   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ 👩 Bu Rina Susanti  │   │
│  │    rina@email.com   │   │
│  │    3 produk · ⚫     │   │  ← Status nonaktif
│  │    [Lihat] [Aktifkan│   │
│  └─────────────────────┘   │
│                             │
├─────────────────────────────┤
│  🏠     👥     🗂️    📦    │  ← Bottom nav admin
│ Home  Penjual Kateg  Produk│
└─────────────────────────────┘
```

---

## 12. Dashboard Penjual — Profil Toko

```
┌─────────────────────────────┐
│  📱 STATUS BAR              │
├─────────────────────────────┤
│  Profil Toko Saya           │
├─────────────────────────────┤
│                             │
│         ┌───────┐           │
│         │   👩   │           │
│         │ (Foto)│           │  ← Avatar toko
│         └───────┘           │
│      [ Ubah Foto ]          │  ← Kamera / Galeri
│                             │
│  Nama Toko *                │
│  ┌─────────────────────┐   │
│  │ Toko Sari Jaya      │   │
│  └─────────────────────┘   │
│                             │
│  Nama Pemilik (Ibu) *       │
│  ┌─────────────────────┐   │
│  │ Ibu Sari Rahayu     │   │
│  └─────────────────────┘   │
│                             │
│  Nomor WhatsApp *           │
│  ┌─────────────────────┐   │
│  │ 0812-3456-7890      │   │  ← Nomor tujuan order pembeli
│  └─────────────────────┘   │
│  ℹ️ Pesanan pembeli akan    │
│  masuk langsung ke nomor ini│
│                             │
│  Lokasi Rumah (Blok/No)     │
│  ┌─────────────────────┐   │
│  │ Blok C No. 12       │   │
│  └─────────────────────┘   │
│                             │
│  Deskripsi Singkat Toko     │
│  ┌─────────────────────┐   │
│  │ Jual aneka risoles  │   │
│  │ mayo & frozen food  │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │  [✓ Simpan Profil]  │   │  ← Tombol simpan hijau
│  └─────────────────────┘   │
│                             │
│  ─────────────────────────  │
│  [ 🚪 Keluar (Logout) ]    │  ← Tombol logout merah/outline
│                             │
├─────────────────────────────┤
│  🏠      🛍️      👤        │
│Dashboard Produk  Profil    │  ← Tab profil aktif
└─────────────────────────────┘
```

---

## 13. Dashboard Admin — Kelola Kategori

```
┌─────────────────────────────┐
│  📱 STATUS BAR              │
├─────────────────────────────┤
│  🟢 Admin — Kategori        │
├─────────────────────────────┤
│                             │
│  ➕ Tambah Kategori Baru     │
│  ┌─────────────────────┐   │
│  │ Ikon: [ 🍱 ▼ ]      │   │  ← Pilih emoji ikon
│  │ Nama: [___________] │   │  ← Input nama kategori
│  │ [ + Simpan Kategori]│   │  ← Tombol tambah
│  └─────────────────────┘   │
│                             │
│  ─────────────────────────  │
│  📂 Daftar Kategori (5)     │
│                             │
│  ┌─────────────────────┐   │
│  │ 🍱 Makanan & Minuman│   │
│  │    42 Produk        │   │
│  │    [Edit] [Hapus]   │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ 🛒 Sembako          │   │
│  │    18 Produk        │   │
│  │    [Edit] [Hapus]   │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ 🧴 Perawatan Diri   │   │
│  │    12 Produk        │   │
│  │    [Edit] [Hapus]   │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ 🧶 Kerajinan Tangan │   │
│  │    8 Produk         │   │
│  │    [Edit] [Hapus]   │   │
│  └─────────────────────┘   │
│                             │
├─────────────────────────────┤
│  🏠     👥     🗂️    📦    │  ← Bottom nav admin
│ Home  Penjual Kateg  Produk│  ← Tab Kategori aktif
└─────────────────────────────┘
```

---

## 14. Layar Khusus: Empty State & Dialog Konfirmasi

### A. Keranjang Kosong
```
┌─────────────────────────────┐
│  📱 STATUS BAR              │
├─────────────────────────────┤
│  Keranjang Belanja          │
├─────────────────────────────┤
│                             │
│                             │
│            🛒               │
│                             │
│    Keranjang Masih Kosong   │
│                             │
│   Yuk jelajahi produk lezat │
│   dan menarik dari tetangga │
│        perumahan kita!      │
│                             │
│    ┌───────────────────┐    │
│    │ [ Mulai Jajan 🛍️ ]│    │  ← Redirect ke katalog
│    └───────────────────┘    │
│                             │
│                             │
├─────────────────────────────┤
│  🏠    🛍️    🛒    🏪      │
│Beranda Produk Kerj  Toko   │
└─────────────────────────────┘
```

### B. Dialog Konfirmasi Checkout (Menuju WhatsApp)
```
┌─────────────────────────────┐
│                             │
│   ┌─────────────────────┐   │
│   │ 📲 Lanjut ke        │   │
│   │    WhatsApp?        │   │
│   │                     │   │
│   │ Pesanan Anda akan   │   │
│   │ otomatis dikirimkan │   │
│   │ ke WA Bu Sari.      │   │
│   │                     │   │
│   │ Cukup tekan tombol  │   │
│   │ "Kirim" di WhatsApp │   │
│   │ setelah ini ya!     │   │
│   │                     │   │
│   │ [  Buka WhatsApp  ] │   │  ← Hijau (wa.me)
│   │ [      Batal      ] │   │
│   └─────────────────────┘   │
│                             │
└─────────────────────────────┘
```

---

## Ringkasan Komponen UI Reusable

| Komponen | Digunakan Di |
|---|---|
| `ProductCard` | Beranda, Katalog, Halaman Toko |
| `BottomNav` (pembeli) | Semua halaman publik |
| `BottomNav` (penjual) | Semua halaman dashboard penjual |
| `StickyActionBar` | Detail Produk, Keranjang, Checkout |
| `StepIndicator` | Wizard tambah produk (4 langkah) |
| `SearchBar` | Beranda, Katalog, Admin |
| `StatusBadge` | Daftar produk (Aktif/Nonaktif/Habis) |
| `StockWarning` | Dashboard home, daftar produk |
| `CategoryChip` | Katalog (filter horizontal) |
| `SellerCard` | Beranda (penjual aktif), admin |

---

## Alur Navigasi Antar Halaman

```
PEMBELI:
Beranda ──→ Katalog ──→ Detail Produk ──→ Keranjang ──→ Checkout ──→ [WA Terbuka]
   │                         │
   └──→ Halaman Toko ────────┘

PENJUAL:
Login ──→ Dashboard Home ──→ Tambah Produk (4 langkah)
              │
              └──→ Daftar Produk ──→ Edit Produk
              │
              └──→ Profil Toko

ADMIN:
Dashboard ──→ Kelola Penjual ──→ Tambah Penjual / Nonaktifkan
    │
    └──→ Kelola Kategori
    │
    └──→ Pantau Produk
```

---

*Dokumen ini adalah panduan wireframe teks. Implementasi visual akhir dapat berbeda sesuai
keputusan desain yang berkembang saat proses development.*
