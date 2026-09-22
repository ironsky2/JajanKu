"use client";

import Link from "next/link";
import { Users, Package, Tags, Plus, ShieldCheck, ArrowRight, Store } from "lucide-react";
import { useMarketStore } from "@/stores/useMarketStore";

export default function AdminDashboardPage() {
  const sellers = useMarketStore((state) => state.sellers);
  const products = useMarketStore((state) => state.products);
  const categories = useMarketStore((state) => state.categories);

  const activeSellers = sellers.filter((s) => s.is_active);
  const activeProducts = products.filter((p) => p.is_active);

  return (
    <div className="flex flex-col w-full p-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            🛡️
          </div>
          <div>
            <h1 className="font-extrabold text-white text-base leading-none">
              Admin JajanKuy
            </h1>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Pengurus RT 05 Perumahan Griya Indah Asri
            </span>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
          Admin Mode
        </span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-2.5 mb-6">
        <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60 flex flex-col justify-between">
          <Users className="w-5 h-5 text-emerald-400 mb-2" />
          <div>
            <span className="text-2xl font-extrabold text-white block leading-none">
              {activeSellers.length}
            </span>
            <span className="text-[10px] text-slate-400 font-medium mt-1 block">
              Penjual Aktif
            </span>
          </div>
        </div>

        <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60 flex flex-col justify-between">
          <Package className="w-5 h-5 text-amber-400 mb-2" />
          <div>
            <span className="text-2xl font-extrabold text-white block leading-none">
              {activeProducts.length}
            </span>
            <span className="text-[10px] text-slate-400 font-medium mt-1 block">
              Produk Siap Jual
            </span>
          </div>
        </div>

        <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60 flex flex-col justify-between">
          <Tags className="w-5 h-5 text-sky-400 mb-2" />
          <div>
            <span className="text-2xl font-extrabold text-white block leading-none">
              {categories.length}
            </span>
            <span className="text-[10px] text-slate-400 font-medium mt-1 block">
              Kategori
            </span>
          </div>
        </div>
      </div>

      {/* Primary Admin Actions */}
      <div className="flex flex-col gap-3 mb-6">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          Aksi Cepat Pengelola
        </h2>

        {/* Daftarkan Penjual */}
        <Link
          href="/admin/penjual"
          className="p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-between shadow-lg transition-all active:scale-98"
        >
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5" />
            <div className="text-left">
              <span className="block font-extrabold">Kelola & Daftarkan Penjual Baru</span>
              <span className="text-[11px] text-emerald-100 font-normal">Buatkan akun toko untuk ibu warga komplek</span>
            </div>
          </div>
          <ArrowRight className="w-5 h-5" />
        </Link>

        {/* Input Produk Bantu Ibu-Ibu (PRD 4.3 Feature) */}
        <Link
          href="/admin/produk"
          className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm flex items-center justify-between transition-all active:scale-98"
        >
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-amber-400" />
            <div className="text-left">
              <span className="block font-extrabold">Bantu Input Produk Penjual</span>
              <span className="text-[11px] text-slate-400 font-normal">Input foto & menu atas nama ibu-ibu yang minta bantuan</span>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400" />
        </Link>

        {/* Kelola Kategori */}
        <Link
          href="/admin/kategori"
          className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold text-sm flex items-center justify-between transition-all active:scale-98"
        >
          <div className="flex items-center gap-3">
            <Tags className="w-5 h-5 text-sky-400" />
            <div className="text-left">
              <span className="block font-extrabold">Kelola Kategori Produk</span>
              <span className="text-[11px] text-slate-400 font-normal">Tambah kategori kuliner atau kerajinan baru</span>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-slate-400" />
        </Link>
      </div>

      {/* Info Komunitas RT */}
      <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-4 text-xs text-slate-400 leading-relaxed">
        <h3 className="font-bold text-white text-xs mb-1">
          💡 Catatan Pengelola Platform
        </h3>
        Sesuai SOP JajanKuy, ibu-ibu warga yang tidak terbiasa menggunakan HP bisa mengirimkan foto dan harga dagangannya ke WhatsApp admin RT, lalu admin menginputkannya melalui menu <strong>Bantu Produk</strong>.
      </div>
    </div>
  );
}
