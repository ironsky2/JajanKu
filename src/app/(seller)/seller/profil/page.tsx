"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Camera, Check, LogOut, Store, Phone, MapPin, Sparkles } from "lucide-react";
import { useMarketStore } from "@/stores/useMarketStore";

export default function SellerProfilePage() {
  const router = useRouter();
  const currentSession = useMarketStore((state) => state.currentSession);
  const sellers = useMarketStore((state) => state.sellers);
  const updateSeller = useMarketStore((state) => state.updateSeller);
  const logout = useMarketStore((state) => state.logout);

  const currentSeller = sellers.find((s) => s.id === currentSession.sellerId) || sellers[0];

  const [storeName, setStoreName] = useState(currentSeller.store_name);
  const [name, setName] = useState(currentSeller.name);
  const [waNumber, setWaNumber] = useState(currentSeller.wa_number);
  const [address, setAddress] = useState(currentSeller.address);
  const [description, setDescription] = useState(currentSeller.description || "");
  const [photoUrl, setPhotoUrl] = useState(currentSeller.photo_url || "");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSeller(currentSeller.id, {
      store_name: storeName.trim(),
      name: name.trim(),
      wa_number: waNumber.trim(),
      address: address.trim(),
      description: description.trim(),
      photo_url: photoUrl,
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar dari akun toko ini?")) {
      logout();
      router.push("/seller/login");
    }
  };

  return (
    <div className="flex flex-col w-full p-4 pb-28">
      <div className="pb-3 border-b border-slate-100 mb-4">
        <h1 className="font-extrabold text-slate-900 text-lg">
          Profil Toko Saya
        </h1>
        <p className="text-xs text-slate-500">
          Kelola rincian informasi toko dan nomor WhatsApp tujuan pesanan.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3 mb-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Profil toko berhasil diperbarui!</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSave} className="flex flex-col gap-4">
        {/* Avatar Upload Preview */}
        <div className="flex flex-col items-center justify-center p-5 bg-white rounded-3xl border border-slate-100 shadow-card">
          <div className="relative w-24 h-24 rounded-3xl overflow-hidden ring-4 ring-emerald-500/20 shadow-md mb-3">
            <Image
              src={photoUrl || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400"}
              alt="Foto Profil"
              fill
              className="object-cover"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              const url = prompt("Masukkan link foto atau avatar baru:", photoUrl);
              if (url) setPhotoUrl(url);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5"
          >
            <Camera className="w-3.5 h-3.5" /> Ubah Foto
          </button>
        </div>

        {/* Inputs */}
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-card flex flex-col gap-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nama Toko <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nama Pemilik (Ibu) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nomor WhatsApp Toko <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={waNumber}
              onChange={(e) => setWaNumber(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              ℹ️ Pesanan pembeli akan masuk langsung ke nomor WhatsApp ini.
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Lokasi Rumah (Blok / No. Rumah) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Deskripsi Singkat Toko
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ceritakan aneka produk andalan yang dijual..."
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
            />
          </div>

          <button
            type="submit"
            className="w-full h-12 mt-2 rounded-xl bg-primary text-white font-extrabold text-sm shadow-md hover:bg-primary-dark active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-4 h-4" /> Simpan Perubahan Profil
          </button>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          className="w-full h-12 rounded-2xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center gap-2 border border-red-200 active:scale-95 transition-all"
        >
          <LogOut className="w-4 h-4" /> Keluar dari Akun Toko
        </button>
      </form>
    </div>
  );
}
