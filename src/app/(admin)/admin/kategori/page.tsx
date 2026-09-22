"use client";

import { useState } from "react";
import { Plus, Trash2, Edit3, Tags } from "lucide-react";
import { useMarketStore } from "@/stores/useMarketStore";

const EMOJI_OPTIONS = ["🍱", "🧴", "🛒", "🧶", "🥐", "🥤", "🍰", "🥩", "🥬", "✨"];

export default function AdminCategoriesPage() {
  const categories = useMarketStore((state) => state.categories);
  const products = useMarketStore((state) => state.products);
  const addCategory = useMarketStore((state) => state.addCategory);
  const deleteCategory = useMarketStore((state) => state.deleteCategory);

  const [selectedEmoji, setSelectedEmoji] = useState(EMOJI_OPTIONS[0]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addCategory({
      name: name.trim(),
      icon: selectedEmoji,
      description: description.trim(),
    });

    setName("");
    setDescription("");
  };

  return (
    <div className="flex flex-col w-full p-4">
      {/* Header */}
      <div className="pb-3 border-b border-slate-800 mb-4">
        <h1 className="font-extrabold text-white text-base">
          Kelola Kategori Produk ({categories.length})
        </h1>
        <p className="text-[11px] text-slate-400">
          Atur pengelompokan produk jajanan dapur tetangga
        </p>
      </div>

      {/* Form Tambah Kategori */}
      <form
        onSubmit={handleAddCategory}
        className="bg-slate-800/90 border border-slate-700 rounded-3xl p-4 mb-5 flex flex-col gap-3 shadow-md"
      >
        <h2 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
          <Plus className="w-4 h-4" /> Tambah Kategori Baru
        </h2>

        {/* Emoji Selector */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Pilih Ikon Emoji
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {EMOJI_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setSelectedEmoji(emoji)}
                className={`w-10 h-10 rounded-xl text-lg flex items-center justify-center transition-all ${
                  selectedEmoji === emoji
                    ? "bg-emerald-600 text-white ring-2 ring-emerald-400 scale-110"
                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Nama Kategori *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Misal: Kue Tradisional"
            className="w-full h-10 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Keterangan Singkat
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Misal: Klepon, lemper, onde-onde hangat..."
            className="w-full h-10 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </div>

        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full h-11 mt-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs disabled:opacity-40 shadow-sm transition-all"
        >
          + Simpan Kategori
        </button>
      </form>

      {/* List Kategori */}
      <div className="flex flex-col gap-2.5">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
          Daftar Kategori Aktif
        </h2>

        {categories.map((category) => {
          const productCount = products.filter((p) => p.category_id === category.id).length;

          return (
            <div
              key={category.id}
              className="p-3 bg-slate-800 border border-slate-700/80 rounded-2xl flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-slate-700 flex items-center justify-center text-xl flex-shrink-0">
                  {category.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-white text-xs truncate">
                    {category.name}
                  </h3>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    {productCount} Produk
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => {
                    if (confirm(`Hapus kategori "${category.name}"?`)) {
                      deleteCategory(category.id);
                    }
                  }}
                  className="p-2 text-slate-400 hover:text-red-400 rounded-lg"
                  aria-label="Hapus kategori"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
