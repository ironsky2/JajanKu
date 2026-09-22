-- ==========================================================
-- JajanKuy PWA - Database Schema (PostgreSQL / Supabase)
-- ==========================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: sellers (Penjual / Toko Ibu Perumahan)
CREATE TABLE IF NOT EXISTS public.sellers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    store_name TEXT NOT NULL,
    name TEXT NOT NULL,
    wa_number TEXT NOT NULL,
    photo_url TEXT,
    cover_url TEXT,
    address TEXT NOT NULL, -- Blok & No. Rumah di Perumahan
    description TEXT,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table: categories (Kategori Produk JajanKuy)
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    icon TEXT NOT NULL, -- Emoji atau icon identifier
    description TEXT,
    display_order INTEGER DEFAULT 0
);

-- 3. Table: products (Produk Jualan Warga)
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID NOT NULL REFERENCES public.sellers(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    price NUMERIC(12, 0) NOT NULL CHECK (price >= 0),
    unit TEXT DEFAULT 'pcs', -- pcs, toples, botol, porsi, bungkus, paket
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    photo_url TEXT,
    description TEXT,
    is_active BOOLEAN DEFAULT true NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_seller ON public.products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_sellers_is_active ON public.sellers(is_active);

-- Row Level Security (RLS)
ALTER TABLE public.sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Categories: Public read
CREATE POLICY "Public can view categories" 
ON public.categories FOR SELECT 
USING (true);

-- Sellers: Public can view active sellers
CREATE POLICY "Public can view active sellers" 
ON public.sellers FOR SELECT 
USING (is_active = true);

-- Products: Public can view active products from active sellers
CREATE POLICY "Public can view active products" 
ON public.products FOR SELECT 
USING (
    is_active = true AND 
    EXISTS (SELECT 1 FROM public.sellers WHERE id = products.seller_id AND is_active = true)
);

-- Seller full access to their own products
CREATE POLICY "Sellers can manage their own products" 
ON public.products FOR ALL 
TO authenticated 
USING (
    seller_id IN (SELECT id FROM public.sellers WHERE user_id = auth.uid())
);

-- Seller update their own store profile
CREATE POLICY "Sellers can update their own profile" 
ON public.sellers FOR UPDATE 
TO authenticated 
USING (user_id = auth.uid());
