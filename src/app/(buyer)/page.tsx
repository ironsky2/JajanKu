"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, ChevronRight, Flame, Handshake, Store, Sparkles, ArrowRight } from "lucide-react";
import { useMarketStore } from "@/stores/useMarketStore";
import { ProductCard } from "@/components/buyer/ProductCard";
import { PWAInstallBanner } from "@/components/pwa/PWAInstallBanner";

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);

  const categories = useMarketStore((state) => state.categories);
  const sellers = useMarketStore((state) => state.sellers.filter((s) => s.is_active));
  const products = useMarketStore((state) => state.products.filter((p) => p.is_active));

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/produk?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const banners = [
    {
      badge: "Dapur Tetangga",
      title: "Jajan dari Tetangga! 🛍️",
      desc: "Segar, lezat, & higienis langsung dari kreasi dapur tetangga kita.",
      footer: "Bebas Ongkir Antar Blok",
      bgClass: "from-emerald-700 via-primary to-emerald-900",
    },
    {
      badge: "Kue Basah & Frozen Food",
      title: "Pesan Praktis via WA 📲",
      desc: "Tinggal klik, otomatis terhubung ke WhatsApp penjual dengan format rapi.",
      footer: "Tanpa Payment Gateway Ribet",
      bgClass: "from-emerald-800 via-emerald-600 to-amber-700",
    },
  ];

  // Attach seller info to products
  const populatedProducts = products.map((product) => ({
    ...product,
    seller: sellers.find((s) => s.id === product.seller_id),
    category: categories.find((c) => c.id === product.category_id),
  }));

  const recentProducts = populatedProducts.slice(0, 6);

  return (
    <div className="flex flex-col w-full">
      {/* PWA Ribbon Banner */}
      <PWAInstallBanner />

      {/* Search Bar Section */}
      <div className="px-4 pt-2 pb-3">
        <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
          <Search className="absolute left-3.5 text-slate-400 w-5 h-5 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari jajanan, masakan, atau toko tetangga..."
            className="w-full h-12 pl-11 pr-4 bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium rounded-2xl border border-slate-200/80 shadow-card focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </form>
      </div>

      {/* Hero Banner Carousel Section */}
      <div className="px-4 pb-4">
        <div
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${banners[activeSlide].bgClass} text-white p-5 shadow-md transition-all duration-500`}
        >
          <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col justify-between min-h-[140px]">
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold tracking-wide uppercase text-emerald-100 mb-2">
                <Sparkles className="w-3 h-3 text-amber-300" />
                {banners[activeSlide].badge}
              </span>
              <h2 className="text-2xl font-extrabold leading-tight drop-shadow-sm">
                {banners[activeSlide].title}
              </h2>
              <p className="text-xs text-white/90 mt-1.5 line-clamp-2 leading-relaxed max-w-[85%]">
                {banners[activeSlide].desc}
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/10">
              {/* Dot indicator */}
              <div className="flex items-center gap-1.5">
                {banners.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      activeSlide === idx ? "w-6 bg-white" : "w-2 bg-white/40"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-white/90 font-semibold">
                {banners[activeSlide].footer}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Kategori Belanja Grid 4/5 Kolom */}
      <div className="px-4 pb-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-bold text-slate-900">Kategori Belanja</span>
          </div>
          <Link
            href="/produk"
            className="text-xs text-primary font-bold hover:underline flex items-center gap-0.5"
          >
            Lihat Semua
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {categories.slice(0, 4).map((category) => (
            <Link
              key={category.id}
              href={`/produk?kategori=${category.slug}`}
              className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-all active:scale-95 text-center group"
            >
              <div className="w-13 h-13 w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <span className="font-bold text-xs text-slate-800 truncate w-full">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Gotong Royong RT Banner */}
      <div className="px-4 pb-5">
        <div className="bg-gradient-to-r from-emerald-50 to-amber-50/60 border border-emerald-200/70 rounded-2xl p-3.5 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/15 flex items-center justify-center text-emerald-700 flex-shrink-0">
            <Handshake className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-900 leading-tight">
              Gotong Royong Ekonomi Warga
            </h4>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
              Beli jajanan dari tetangga, pererat silaturahmi & dukung kreasi rumahan!
            </p>
          </div>
        </div>
      </div>

      {/* Penjual Aktif di Perumahan Carousel */}
      <div className="px-4 pb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Store className="w-4 h-4 text-primary" />
            <h3 className="font-bold text-slate-900 text-sm">Penjual Dapur Tetangga</h3>
          </div>
          <Link href="/toko" className="text-xs text-primary font-bold hover:underline">
            Semua Toko
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
          {sellers.map((seller) => (
            <Link
              key={seller.id}
              href={`/toko/${seller.id}`}
              className="flex-shrink-0 flex flex-col items-center p-3 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-emerald-300 w-28 text-center active:scale-95 transition-all"
            >
              <div className="relative w-14 h-14 rounded-full overflow-hidden mb-2 ring-2 ring-emerald-500/30">
                <Image
                  src={seller.photo_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200"}
                  alt={seller.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-bold text-xs text-slate-900 truncate w-full">
                {seller.name.split(" ")[0]} {seller.name.split(" ")[1] || ""}
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold truncate w-full mt-0.5">
                {seller.address}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Produk Terbaru & Unggulan */}
      <div className="px-4 pb-8">
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-1.5">
            <Flame className="w-5 h-5 text-amber-500" />
            <h3 className="font-bold text-slate-900 text-base">Produk Terbaru & Terlaris</h3>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            Fresh Tiap Hari
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {recentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="pt-5">
          <Link
            href="/produk"
            className="w-full h-12 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-primary-dark hover:bg-emerald-100 font-bold text-sm flex items-center justify-center gap-2 active:scale-98 transition-all shadow-sm"
          >
            Lihat Semua Produk ({products.length})
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Discrete Seller Entry & Community Footer */}
        <div className="mt-10 pt-6 border-t border-slate-200/60 flex flex-col items-center text-center">
          <p className="text-xs text-slate-500 mb-2">
            Punya usaha masakan atau kreasi rumahan?
          </p>
          <Link
            href="/seller/login"
            className="text-xs font-bold text-slate-700 hover:text-primary px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all inline-flex items-center gap-1.5"
          >
            <span>👩‍🍳 Masuk ke Area Penjual</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <span className="text-[10px] text-slate-400 mt-5">
            © 2026 JajanKuy · Jajan dari Tetangga, Mudah & Cepat
          </span>
        </div>
      </div>
    </div>
  );
}
