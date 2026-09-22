"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Search, Power, PowerOff, Store, Phone, MapPin, X } from "lucide-react";
import { useMarketStore } from "@/stores/useMarketStore";

export default function AdminSellersPage() {
  const sellers = useMarketStore((state) => state.sellers);
  const products = useMarketStore((state) => state.products);
  const addSeller = useMarketStore((state) => state.addSeller);
  const toggleSellerStatus = useMarketStore((state) => state.toggleSellerStatus);

  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [storeName, setStoreName] = useState("");
  const [name, setName] = useState("");
  const [waNumber, setWaNumber] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const filteredSellers = sellers.filter((s) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.store_name.toLowerCase().includes(q) || s.address.toLowerCase().includes(q);
  });

  const handleCreateSeller = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName.trim() || !name.trim() || !waNumber.trim() || !address.trim()) {
      alert("Mohon lengkapi semua kolom wajib!");
      return;
    }

    addSeller({
      store_name: storeName.trim(),
      name: name.trim(),
      wa_number: waNumber.trim(),
      address: address.trim(),
      description: description.trim(),
      photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
      cover_url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000",
      is_active: true,
    });

    // Reset
    setStoreName("");
    setName("");
    setWaNumber("");
    setAddress("");
    setDescription("");
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full p-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div>
          <h1 className="font-extrabold text-white text-base">
            Kelola Penjual ({sellers.length})
          </h1>
          <p className="text-[11px] text-slate-400">
            Daftar ibu-ibu dapur tetangga & kreasi rumahan
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Penjual</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative mb-4">
        <Search className="absolute left-3.5 top-3 text-slate-500 w-4 h-4" />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari nama penjual, toko, atau blok..."
          className="w-full h-10 pl-10 pr-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        />
      </div>

      {/* Sellers List */}
      <div className="flex flex-col gap-3">
        {filteredSellers.map((seller) => {
          const sellerProductCount = products.filter((p) => p.seller_id === seller.id).length;

          return (
            <div
              key={seller.id}
              className={`p-3.5 rounded-2xl border transition-all flex flex-col gap-2.5 ${
                seller.is_active
                  ? "bg-slate-800/90 border-slate-700"
                  : "bg-slate-900 border-slate-800 opacity-60"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-slate-700 flex-shrink-0">
                  <Image
                    src={seller.photo_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200"}
                    alt={seller.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="font-bold text-white text-sm truncate">
                      {seller.name}
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        seller.is_active
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-slate-700 text-slate-400"
                      }`}
                    >
                      {seller.is_active ? "Aktif" : "Nonaktif"}
                    </span>
                  </div>

                  <p className="text-xs text-emerald-400 font-semibold truncate">
                    {seller.store_name}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <span>{seller.address}</span>
                    <span>•</span>
                    <span>{sellerProductCount} Produk</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-700/60 text-xs">
                <Link
                  href={`/toko/${seller.id}`}
                  className="text-slate-300 hover:text-white font-medium flex items-center gap-1"
                >
                  <Store className="w-3.5 h-3.5" /> Lihat Etalase
                </Link>

                <button
                  onClick={() => toggleSellerStatus(seller.id)}
                  className={`px-3 py-1 rounded-lg font-bold text-xs flex items-center gap-1 transition-all ${
                    seller.is_active
                      ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
                  }`}
                >
                  {seller.is_active ? (
                    <>
                      <PowerOff className="w-3 h-3" /> Nonaktifkan
                    </>
                  ) : (
                    <>
                      <Power className="w-3 h-3" /> Aktifkan
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Tambah Penjual Baru */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h3 className="font-extrabold text-white text-base">
                Daftarkan Penjual Baru
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSeller} className="flex flex-col gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Nama Toko *
                </label>
                <input
                  type="text"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="Misal: Dapur Bu Endang"
                  className="w-full h-10 px-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Nama Pemilik (Ibu) *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Misal: Ibu Endang Suhartini"
                  className="w-full h-10 px-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Nomor WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={waNumber}
                  onChange={(e) => setWaNumber(e.target.value)}
                  placeholder="08123456789"
                  className="w-full h-10 px-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-0.5">
                  Alamat (Hanya Blok / No. Rumah) *
                </label>
                <p className="text-[10px] text-emerald-400/90 mb-1">
                  🔒 Cukup sebutkan blok (contoh: Blok C-12). Dilarang mencantumkan nama dinas/komplek.
                </p>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Blok D No. 14"
                  className="w-full h-10 px-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Deskripsi Jualan (Opsional)
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jual aneka pempek Palembang asli..."
                  className="w-full p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 mt-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all active:scale-95"
              >
                + Buatkan Akun Toko Sekarang
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
