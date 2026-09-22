"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Search, Edit3, Power, PowerOff, AlertTriangle } from "lucide-react";
import { useMarketStore } from "@/stores/useMarketStore";
import { formatRupiah } from "@/lib/utils";

export default function SellerProductsPage() {
  const currentSession = useMarketStore((state) => state.currentSession);
  const sellers = useMarketStore((state) => state.sellers);
  const products = useMarketStore((state) => state.products);
  const toggleProductStatus = useMarketStore((state) => state.toggleProductStatus);
  const updateProductStock = useMarketStore((state) => state.updateProductStock);

  const currentSeller = sellers.find((s) => s.id === currentSession.sellerId) || sellers[0];
  const sellerProducts = products.filter((p) => p.seller_id === currentSeller.id);

  const [activeTab, setActiveTab] = useState<"semua" | "aktif" | "nonaktif">("semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = sellerProducts.filter((p) => {
    if (activeTab === "aktif" && !p.is_active) return false;
    if (activeTab === "nonaktif" && p.is_active) return false;
    if (searchQuery.trim()) {
      return p.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const activeCount = sellerProducts.filter((p) => p.is_active).length;
  const inactiveCount = sellerProducts.filter((p) => !p.is_active).length;

  return (
    <div className="flex flex-col w-full p-4 pb-28">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div>
          <h1 className="font-extrabold text-slate-900 text-lg">
            Produk Saya
          </h1>
          <p className="text-xs text-slate-500">
            {currentSeller.store_name} ({currentSeller.name})
          </p>
        </div>

        <Link
          href="/seller/produk/tambah"
          className="px-3.5 py-2 rounded-xl bg-primary text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:bg-primary-dark active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah</span>
        </Link>
      </div>

      {/* Search Input */}
      <div className="relative mb-3">
        <Search className="absolute left-3.5 top-3 text-slate-400 w-4 h-4" />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari produk Anda..."
          className="w-full h-10 pl-10 pr-3 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("semua")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "semua"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          Semua ({sellerProducts.length})
        </button>
        <button
          onClick={() => setActiveTab("aktif")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "aktif"
              ? "bg-emerald-600 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          🟢 Aktif ({activeCount})
        </button>
        <button
          onClick={() => setActiveTab("nonaktif")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "nonaktif"
              ? "bg-slate-600 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          ⚫ Nonaktif ({inactiveCount})
        </button>
      </div>

      {/* Product List */}
      <div className="flex flex-col gap-3">
        {filteredProducts.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-dashed border-slate-300">
            <p className="text-xs text-slate-500 mb-3">
              Tidak ada produk pada kategori ini.
            </p>
            <Link
              href="/seller/produk/tambah"
              className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold inline-block"
            >
              + Tambah Produk Baru
            </Link>
          </div>
        ) : (
          filteredProducts.map((product) => {
            const isLowStock = product.stock <= 5 && product.stock > 0;
            const isZeroStock = product.stock === 0;

            return (
              <div
                key={product.id}
                className={`bg-white rounded-2xl p-3.5 border transition-all shadow-card flex gap-3 items-center ${
                  product.is_active ? "border-slate-100" : "border-slate-200 bg-slate-50/60 opacity-80"
                }`}
              >
                {/* Image */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <Image
                    src={product.photo_url || "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=200"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="font-bold text-slate-900 text-sm truncate">
                        {product.name}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          product.is_active
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {product.is_active ? "🟢 Aktif" : "⚫ Nonaktif"}
                      </span>
                    </div>

                    <div className="text-xs font-extrabold text-primary mt-0.5">
                      {formatRupiah(product.price)} <span className="text-[10px] font-normal text-slate-400">/{product.unit}</span>
                    </div>

                    <div className="flex items-center gap-1.5 mt-1 text-xs">
                      {isZeroStock ? (
                        <span className="text-red-600 font-bold flex items-center gap-1 text-[11px]">
                          ❌ Stok Habis (0)
                        </span>
                      ) : isLowStock ? (
                        <span className="text-amber-600 font-bold flex items-center gap-1 text-[11px]">
                          <AlertTriangle className="w-3 h-3" /> Sisa {product.stock} {product.unit}
                        </span>
                      ) : (
                        <span className="text-slate-600 text-[11px]">
                          Stok: <strong>{product.stock}</strong> {product.unit}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions (Toggle status & quick edit) */}
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => toggleProductStatus(product.id)}
                      className={`flex-1 py-1.5 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
                        product.is_active
                          ? "bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200"
                          : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
                      }`}
                    >
                      {product.is_active ? (
                        <>
                          <PowerOff className="w-3.5 h-3.5" /> Nonaktifkan
                        </>
                      ) : (
                        <>
                          <Power className="w-3.5 h-3.5" /> Aktifkan
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        const newStock = prompt(`Ubah jumlah stok untuk ${product.name}:`, product.stock.toString());
                        if (newStock !== null) {
                          const parsed = parseInt(newStock);
                          if (!isNaN(parsed) && parsed >= 0) {
                            updateProductStock(product.id, parsed);
                          }
                        }
                      }}
                      className="py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                    >
                      Stok
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
