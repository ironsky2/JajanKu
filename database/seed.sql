-- ==========================================================
-- JajanKuy PWA - Seed Data (Perumahan Griya Indah Asri)
-- ==========================================================

-- Insert Categories
INSERT INTO public.categories (id, name, slug, icon, description, display_order) VALUES
('c1111111-1111-1111-1111-111111111111', 'Makanan & Minuman', 'makanan', '🍱', 'Kue basah, lauk pauk, frozen food, dan minuman segar', 1),
('c2222222-2222-2222-2222-222222222222', 'Kecantikan', 'kecantikan', '🧴', 'Perawatan kulit, lulur herbal, sabun alami buatan rumahan', 2),
('c3333333-3333-3333-3333-333333333333', 'Sembako', 'sembako', '🛒', 'Kebutuhan pokok dapur, beras, telur ayam segar, minyak', 3),
('c4444444-4444-4444-4444-444444444444', 'Kerajinan', 'kerajinan', '🧶', 'Rajutan handmade, tas jinjing unik, taplak meja', 4),
('c5555555-5555-5555-5555-555555555555', 'Lainnya', 'lainnya', '✨', 'Pernak-pernik kebutuhan rumah tangga dan tanaman hias', 5)
ON CONFLICT (id) DO NOTHING;

-- Insert Sellers (Ibu-Ibu Perumahan)
INSERT INTO public.sellers (id, store_name, name, wa_number, photo_url, cover_url, address, description, is_active) VALUES
(
    's1111111-1111-1111-1111-111111111111',
    'Toko Sari Jaya',
    'Ibu Sari Rahayu',
    '6281234567890',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000&auto=format&fit=crop&q=80',
    'Blok C No. 12',
    'Spesialis risoles mayo crispy lumer, aneka pastel, kue kering lebaran, dan frozen food homemade higienis tanpa pengawet.',
    true
),
(
    's2222222-2222-2222-2222-222222222222',
    'Dapur Bu Dewi',
    'Ibu Dewi Kartika',
    '6281987654321',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1000&auto=format&fit=crop&q=80',
    'Blok B No. 05',
    'Aneka sambal botol uleg asli pedas nampol, lauk siap saji, rendang daging empuk, dan ayam ungkep bumbu kuning.',
    true
),
(
    's3333333-3333-3333-3333-333333333333',
    'Kue Bunda Rina',
    'Ibu Rina Susanti',
    '6285211223344',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1000&auto=format&fit=crop&q=80',
    'Blok E No. 08',
    'Kue nastar wisman lumer di mulut, kastengel keju edam melimpah, dan putri salju lembut manis dingin.',
    true
),
(
    's4444444-4444-4444-4444-444444444444',
    'Warung Sembako Barokah',
    'Ibu Eni Maryani',
    '6287766554433',
    'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=400&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=1000&auto=format&fit=crop&q=80',
    'Blok A No. 01',
    'Beras pulen Pandan Wangi, telur ayam negri segar langsung dari peternak, minyak goreng, dan bumbu dapur lengkap.',
    true
)
ON CONFLICT (id) DO NOTHING;

-- Insert Products
INSERT INTO public.products (id, seller_id, category_id, name, slug, price, unit, stock, photo_url, description, is_active) VALUES
(
    'p1111111-1111-1111-1111-111111111111',
    's1111111-1111-1111-1111-111111111111',
    'c1111111-1111-1111-1111-111111111111',
    'Risoles Mayo Spesial',
    'risoles-mayo-spesial',
    2000,
    'pcs',
    50,
    'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600&auto=format&fit=crop&q=80',
    'Risoles isi mayones gurih creamy, irisan telur rebus segar, dan smoked beef berkualitas. Digoreng keemasan renyah atau bisa minta frozen siap goreng.',
    true
),
(
    'p2222222-2222-2222-2222-222222222222',
    's2222222-2222-2222-2222-222222222222',
    'c1111111-1111-1111-1111-111111111111',
    'Sambal Bawang Uleg Juara',
    'sambal-bawang-uleg-juara',
    15000,
    'botol',
    10,
    'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600&auto=format&fit=crop&q=80',
    'Sambal bawang uleg segar dengan minyak kelapa asli dan cabai rawit merah segar. Tanpa bahan pengawet, tahan 1 bulan di kulkas.',
    true
),
(
    'p3333333-3333-3333-3333-333333333333',
    's3333333-3333-3333-3333-333333333333',
    'c1111111-1111-1111-1111-111111111111',
    'Kue Nastar Keju Wisman',
    'kue-nastar-keju-wisman',
    65000,
    'toples',
    8,
    'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&auto=format&fit=crop&q=80',
    'Nastar mentega wisman wangi lumer, dengan selai nanas asli buatan sendiri bertekstur legit manis asam pas, taburan keju edam melimpah.',
    true
),
(
    'p4444444-4444-4444-4444-444444444444',
    's1111111-1111-1111-1111-111111111111',
    'c1111111-1111-1111-1111-111111111111',
    'Pastel Ayam Sayur Telur',
    'pastel-ayam-sayur-telur',
    2500,
    'pcs',
    35,
    'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600&auto=format&fit=crop&q=80',
    'Pastel gurih renyah dengan isian wortel, bihun, suwiran ayam gurih, dan potongan telur rebus. Cocok untuk sarapan atau snack sore.',
    true
),
(
    'p5555555-5555-5555-5555-555555555555',
    's2222222-2222-2222-2222-222222222222',
    'c1111111-1111-1111-1111-111111111111',
    'Ayam Ungkep Bumbu Kuning',
    'ayam-ungkep-bumbu-kuning',
    45000,
    'ekor',
    6,
    'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80',
    '1 ekor ayam potong 8, sudah diungkep bumbu rempah kuning lengkuas sampai empuk meresap. Tinggal digoreng atau dibakar.',
    true
),
(
    'p6666666-6666-6666-6666-666666666666',
    's4444444-4444-4444-4444-444444444444',
    'c3333333-3333-3333-3333-333333333333',
    'Telur Ayam Negeri Segar (1 Kg)',
    'telur-ayam-negeri-segar-1kg',
    28000,
    'kg',
    20,
    'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600&auto=format&fit=crop&q=80',
    'Telur ayam negri kualitas grade A, cangkang coklat tebal, kuning telur segar oranye. Isi sekitar 15-16 butir per kg.',
    true
),
(
    'p7777777-7777-7777-7777-777777777777',
    's3333333-3333-3333-3333-333333333333',
    'c4444444-4444-4444-4444-444444444444',
    'Tas Belanja Rajut Ramah Lingkungan',
    'tas-belanja-rajut-ramah-lingkungan',
    35000,
    'pcs',
    12,
    'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&auto=format&fit=crop&q=80',
    'Tote bag rajut benang katun tebal dan elastis kuat menahan beban belanjaan. Bisa dicuci berulang kali, pilihan warna pastel cantik.',
    true
),
(
    'p8888888-8888-8888-8888-888888888888',
    's1111111-1111-1111-1111-111111111111',
    'c1111111-1111-1111-1111-111111111111',
    'Puding Mangga Fla Susu Vanilla',
    'puding-mangga-fla-susu-vanilla',
    8000,
    'cup',
    2,
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    'Puding mangga manis segar dengan buah mangga asli dan disiram fla susu vanilla creamy dingin. Tinggal 2 cup tersisa!',
    true
)
ON CONFLICT (id) DO NOTHING;
