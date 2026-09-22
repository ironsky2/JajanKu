"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Search, Power, PowerOff, ShieldAlert, Sparkles, Check, Store } from "lucide-react";
import { useMarketStore } from "@/stores/useMarketStore";
import { formatRupiah } from "@/lib/utils";

export default function AdminProductsAssistPage() {
  const sellers = useMarketStore((state) => state.sellers);
  const categories = useMarketStore((state) => state.categories);
  const products = useMarketStore((state) => state.products);
  const addProduct = useMarketStore((state) => state.addProduct);
  const toggleProductStatus = useMarketStore((state) => state.toggleProductStatus);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSellerFilter, setSelectedSellerFilter] = useState("all");

  // Form State
  const [targetSellerId, setTargetSellerId] = useState(sellers[0]?.id || "");
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(10000);
  const [unit, setUnit] = useState("pcs");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [stock, setStock] = useState<number>(20);
  const [photoUrl, setPhotoUrl] = useState("https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600");
  const [description, setDescription] = useState("");

  const filteredProducts = products.filter((p) => {
    if (selectedSellerFilter !== "all" && p.seller_id !== selectedSellerFilter) return false;
    if (searchQuery.trim()) {
      return p.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || price <= 0) {
      alert("Nama dan harga produk wajib diisi!");
      return;
    }

    addProduct({
      seller_id: targetSellerId,
      category_id: categoryId || categories[0]?.id,
      name: name.trim(),
      price: Number(price),
      unit: unit.trim() || "pcs",
      stock: Number(stock) || 0,
      photo_url: photoUrl,
      description: description.trim(),
      is_active: true,
    });

    setIsModalOpen(false);
    setName("");
    setDescription("");
  };

  return (
    <div className="flex flex-col w-full p-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
        <div>
          <h1 className="font-extrabold text-white text-base">
            Bantuan Input & Moderasi Produk
          </h1>
          <p className="text-[11px] text-slate-400">
            Bantu input menu dagangan atas nama ibu-ibu tetangga via WA
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-1 shadow-md active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ Input Menu</span>
        </button>
      </div>

      {/* Filter by Seller */}
      <div className="flex gap-2 mb-3">
        <select
          value={selectedSellerFilter}
          onChange={(e) => setSelectedSellerFilter(e.target.value)}
          className="flex-1 h-10 px-3 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white focus:outline-none"
        >
          <option value="all">Semua Toko ({products.length} Produk)</option>
          {sellers.map((s) => (
            <option key={s.id} value={s.id}>
              {s.store_name} ({s.name})
            </option>
          ))}
        </select>
      </div>

      {/* Products List */}
      <div className="flex flex-col gap-3">
        {filteredProducts.map((p) => {
          const seller = sellers.find((s) => s.id === p.seller_id);

          return (
            <div
              key={p.id}
              className={`p-3 rounded-2xl border transition-all flex gap-3 items-center ${
                p.is_active ? "bg-slate-800/90 border-slate-700" : "bg-slate-900 border-slate-800 opacity-60"
              }`}
            >
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-700 flex-shrink-0">
                <Image src={p.photo_url} alt={p.name} fill className="object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-bold text-white text-xs truncate">
                    {p.name}
                  </h3>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      p.is_active ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {p.is_active ? "Aktif" : "Nonaktif"}
                  </span>
                </div>

                <div className="text-emerald-400 font-bold text-xs mt-0.5">
                  {formatRupiah(p.price)} /{p.unit}
                </div>

                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                  Toko: <span className="text-slate-300 font-semibold">{seller?.store_name || "Penjual"}</span> ({seller?.name})
                </div>

                <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-700/60">
                  <span className="text-[10px] text-slate-400">
                    Stok: {p.stock}
                  </span>
                  <button
                    onClick={() => toggleProductStatus(p.id)}
                    className="text-xs font-semibold text-amber-400 hover:underline"
                  >
                    {p.is_active ? "Nonaktifkan" : "Aktifkan"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Input Produk Atas Nama Penjual */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-3xl p-5 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            <h3 className="font-extrabold text-white text-base mb-1">
              Bantu Input Produk Penjual
            </h3>
            <p className="text-[11px] text-slate-400 mb-3">
              Masukkan menu jualan atas nama ibu pedagang yang meminta bantuan via WA.
            </p>

            <form onSubmit={handleCreateProduct} className="flex flex-col gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Pilih Penjual / Toko *
                </label>
                <select
                  value={targetSellerId}
                  onChange={(e) => setTargetSellerId(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                >
                  {sellers.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.store_name} — {s.name} ({s.address})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Nama Menu / Produk *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Misal: Lemper Ayam Bakar"
                  className="w-full h-10 px-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Harga (Rp) *
                  </label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Satuan
                  </label>
                  <select
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    className="w-full h-10 px-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  >
                    <option value="pcs">pcs</option>
                    <option value="toples">toples</option>
                    <option value="porsi">porsi</option>
                    <option value="botol">botol</option>
                    <option value="bungkus">bungkus</option>
                    <option value="kg">kg</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Kategori
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full h-10 px-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.icon} {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Jumlah Stok
                  </label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Deskripsi Singkat (Opsional)
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Keterangan rasa, isi, dll..."
                  className="w-full p-2 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 h-10 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 h-10 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold"
                >
                  Simpan Produk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
