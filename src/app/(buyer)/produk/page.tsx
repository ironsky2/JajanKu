"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, ArrowDownUp } from "lucide-react";
import { useMarketStore } from "@/stores/useMarketStore";
import { ProductCard } from "@/components/buyer/ProductCard";

function CatalogContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("kategori") || "all";
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<"terbaru" | "termurah" | "termahal">("terbaru");
  const [stockOnly, setStockOnly] = useState(false);

  const categories = useMarketStore((state) => state.categories);
  const sellers = useMarketStore((state) => state.sellers);
  const products = useMarketStore((state) => state.products.filter((p) => p.is_active));

  const filteredProducts = useMemo(() => {
    let result = products.map((product) => ({
      ...product,
      seller: sellers.find((s) => s.id === product.seller_id),
      category: categories.find((c) => c.id === product.category_id),
    }));

    // Filter category
    if (selectedCategory !== "all") {
      result = result.filter(
        (p) => p.category?.slug === selectedCategory || p.category_id === selectedCategory
      );
    }

    // Filter search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.seller?.name.toLowerCase().includes(q) ||
          p.seller?.store_name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    // Filter stock available only
    if (stockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    // Sort
    if (sortBy === "termurah") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "termahal") {
      result.sort((a, b) => b.price - a.price);
    } else {
      // Default: newest
      result.sort((a, b) => (b.created_at || "").localeCompare(a.created_at || ""));
    }

    return result;
  }, [products, sellers, categories, selectedCategory, searchQuery, stockOnly, sortBy]);

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Search Bar */}
      <div className="px-4 pt-2 pb-3">
        <div className="relative flex items-center w-full">
          <Search className="absolute left-3.5 text-slate-400 w-5 h-5 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari jajanan, penjual, masakan..."
            className="w-full h-12 pl-11 pr-4 bg-white text-slate-900 placeholder:text-slate-400 text-sm font-medium rounded-2xl border border-slate-200/80 shadow-card focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>
      </div>

      {/* Category Filter Chips (Horizontal Scrollable) */}
      <div className="px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 active:scale-95 shadow-sm ${
              selectedCategory === "all"
                ? "bg-primary text-white shadow-emerald-500/20"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Semua Produk
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 active:scale-95 shadow-sm ${
                selectedCategory === cat.slug
                  ? "bg-primary text-white shadow-emerald-500/20"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sorting & Item Count Bar */}
      <div className="px-4 pb-3 flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 mb-4">
        <span className="font-bold text-slate-700">
          {filteredProducts.length} Produk Ditemukan
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setStockOnly(!stockOnly)}
            className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
              stockOnly
                ? "bg-emerald-100 text-emerald-800"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {stockOnly ? "✓ Hanya Tersedia" : "Semua Stok"}
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="terbaru">Terbaru</option>
            <option value="termurah">Harga Termurah</option>
            <option value="termahal">Harga Termahal</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="px-4">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-slate-300 my-6">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 text-2xl">
              🔍
            </div>
            <h4 className="font-bold text-slate-900 text-base mb-1">
              Produk Tidak Ditemukan
            </h4>
            <p className="text-xs text-slate-500 mb-4">
              Coba gunakan kata kunci pencarian lain atau pilih kategori Semua Produk.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setStockOnly(false);
              }}
              className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Memuat katalog...</div>}>
      <CatalogContent />
    </Suspense>
  );
}
