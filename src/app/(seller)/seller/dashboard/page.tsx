"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Plus, 
  Package, 
  AlertTriangle, 
  CheckCircle2, 
  Store, 
  ChevronRight, 
  Edit3, 
  HelpCircle,
  Sparkles
} from "lucide-react";
import { useMarketStore } from "@/stores/useMarketStore";

export default function SellerDashboardPage() {
  const currentSession = useMarketStore((state) => state.currentSession);
  const sellers = useMarketStore((state) => state.sellers);
  const products = useMarketStore((state) => state.products);
  const updateProductStock = useMarketStore((state) => state.updateProductStock);

  // Active seller (default to Bu Sari if not set)
  const currentSeller = sellers.find((s) => s.id === currentSession.sellerId) || sellers[0];
  const sellerProducts = products.filter((p) => p.seller_id === currentSeller.id);

  const activeProducts = sellerProducts.filter((p) => p.is_active);
  const lowStockProducts = sellerProducts.filter((p) => p.is_active && p.stock <= 5);

  const [showTour, setShowTour] = useState(false);
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [tempStockValue, setTempStockValue] = useState<number>(0);

  const handleSaveStock = (id: string) => {
    updateProductStock(id, tempStockValue);
    setEditingStockId(null);
  };

  return (
    <div className="flex flex-col w-full p-4 pb-28">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary/30 flex-shrink-0">
            <Image
              src={currentSeller.photo_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200"}
              alt={currentSeller.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 block uppercase">
              Dashboard Penjual
            </span>
            <h1 className="font-extrabold text-slate-900 text-sm truncate">
              {currentSeller.store_name}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <Link
            href="/"
            className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition-colors"
          >
            <Store className="w-3.5 h-3.5 text-primary" />
            <span>Pasar</span>
          </Link>
          <button
            onClick={() => setShowTour(true)}
            className="px-2.5 py-1.5 rounded-xl bg-emerald-50 text-primary-dark font-bold text-xs flex items-center gap-1 hover:bg-emerald-100 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" /> Panduan
          </button>
        </div>
      </div>

      {/* Sapaan Personal */}
      <div className="bg-gradient-to-br from-emerald-700 via-primary to-emerald-900 text-white p-5 rounded-3xl shadow-md mb-5 relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-xs text-emerald-100 font-semibold block mb-1">
            Selamat Berjualan! 👋
          </span>
          <h2 className="text-xl font-extrabold leading-tight">
            Halo, {currentSeller.name}!
          </h2>
          <p className="text-xs text-white/80 mt-1">
            {currentSeller.address} · Warga Perumahan Griya Indah Asri
          </p>
        </div>
      </div>

      {/* Ringkasan Toko Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-card flex flex-col justify-between">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900">
              {activeProducts.length}
            </span>
            <span className="text-xs text-slate-500 font-semibold block mt-0.5">
              Produk Aktif
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-card flex flex-col justify-between">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-2">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-amber-600">
              {lowStockProducts.length}
            </span>
            <span className="text-xs text-slate-500 font-semibold block mt-0.5">
              Stok Kritis (≤ 5)
            </span>
          </div>
        </div>
      </div>

      {/* Big Add Product CTA (Ramah Pemula Ibu-Ibu) */}
      <div className="mb-6">
        <Link
          href="/seller/produk/tambah"
          className="w-full h-15 py-4 rounded-2xl bg-primary text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 hover:bg-primary-dark active:scale-98 transition-all"
        >
          <Plus className="w-6 h-6 stroke-[3]" />
          <span>+ Tambah Produk Baru</span>
        </Link>
        <p className="text-[11px] text-slate-400 text-center mt-1.5 font-medium">
          Hanya 4 langkah mudah: Foto → Nama & Harga → Stok → Selesai!
        </p>
      </div>

      {/* Stok Hampir Habis Section */}
      <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-card mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span>Peringatan Stok Rendah</span>
          </h3>
          <Link href="/seller/produk" className="text-xs text-primary font-bold hover:underline">
            Semua Produk →
          </Link>
        </div>

        {lowStockProducts.length === 0 ? (
          <div className="text-center py-6 text-slate-400 text-xs">
            🎉 Semua produk Anda memiliki stok yang aman!
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {lowStockProducts.map((p) => {
              const percentage = Math.min(100, Math.round((p.stock / 20) * 100));

              return (
                <div key={p.id} className="p-3 bg-slate-50 rounded-2xl flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-xs truncate max-w-[65%]">
                      {p.name}
                    </span>
                    <span className={`text-xs font-extrabold ${p.stock === 0 ? "text-red-600" : "text-amber-600"}`}>
                      {p.stock === 0 ? "Habis (0)" : `Sisa ${p.stock} ${p.unit}`}
                    </span>
                  </div>

                  {/* Stock Progress Bar */}
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${p.stock === 0 ? "bg-red-500" : "bg-amber-500"}`}
                      style={{ width: `${Math.max(5, percentage)}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-1">
                    {editingStockId === p.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min="0"
                          value={tempStockValue}
                          onChange={(e) => setTempStockValue(parseInt(e.target.value) || 0)}
                          className="w-16 h-7 px-1.5 bg-white border border-primary rounded-lg text-xs font-bold text-center"
                        />
                        <button
                          onClick={() => handleSaveStock(p.id)}
                          className="px-2 py-1 bg-primary text-white rounded-lg text-[11px] font-bold"
                        >
                          Simpan
                        </button>
                        <button
                          onClick={() => setEditingStockId(null)}
                          className="px-2 py-1 bg-slate-200 text-slate-600 rounded-lg text-[11px]"
                        >
                          Batal
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingStockId(p.id);
                          setTempStockValue(p.stock);
                        }}
                        className="text-xs text-primary font-bold flex items-center gap-1 hover:underline"
                      >
                        <Edit3 className="w-3 h-3" /> Tambah Stok
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Onboarding Tour Modal */}
      {showTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl text-center">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-slate-900 text-base mb-1">
              Panduan Mudah Jualan di JajanKuy
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Ibu tidak perlu pusing dengan urusan teknologi rumit!
            </p>

            <div className="text-left flex flex-col gap-2.5 text-xs text-slate-700 bg-emerald-50/50 p-3.5 rounded-2xl mb-5">
              <div className="flex gap-2">
                <span className="font-bold text-primary">1.</span>
                <span>Tekan tombol <strong>+ Tambah Produk</strong> lalu ikuti 4 langkahnya.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-primary">2.</span>
                <span>Gunakan tombol <strong>Nonaktifkan</strong> jika makanan hari ini sudah habis.</span>
              </div>
              <div className="flex gap-2">
                <span className="font-bold text-primary">3.</span>
                <span>Pesanan tetangga akan masuk <strong>langsung ke WhatsApp Ibu</strong>!</span>
              </div>
            </div>

            <button
              onClick={() => setShowTour(false)}
              className="w-full h-11 rounded-xl bg-primary text-white font-bold text-xs shadow-sm hover:bg-primary-dark"
            >
              Saya Mengerti, Terima Kasih!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
