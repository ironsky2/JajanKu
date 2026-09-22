"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Camera, 
  Image as ImageIcon, 
  Plus, 
  Minus, 
  Check, 
  Sparkles, 
  CheckCircle2 
} from "lucide-react";
import { useMarketStore } from "@/stores/useMarketStore";
import { formatRupiah } from "@/lib/utils";

const PRESET_PHOTOS = [
  { label: "Risoles", url: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600" },
  { label: "Kue Kering", url: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600" },
  { label: "Sambal", url: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=600" },
  { label: "Pastel", url: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600" },
  { label: "Lauk Masakan", url: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600" },
  { label: "Sembako", url: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=600" },
];

export default function AddProductWizardPage() {
  const router = useRouter();
  const currentSession = useMarketStore((state) => state.currentSession);
  const sellers = useMarketStore((state) => state.sellers);
  const categories = useMarketStore((state) => state.categories);
  const addProduct = useMarketStore((state) => state.addProduct);

  const currentSeller = sellers.find((s) => s.id === currentSession.sellerId) || sellers[0];

  // Wizard State
  const [currentStep, setCurrentStep] = useState(1);
  const [photoUrl, setPhotoUrl] = useState(PRESET_PHOTOS[0].url);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(5000);
  const [unit, setUnit] = useState("pcs");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [stock, setStock] = useState<number>(20);
  const [description, setDescription] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    addProduct({
      seller_id: currentSeller.id,
      category_id: categoryId || categories[0]?.id,
      name: name.trim() || "Produk Spesial",
      price: Number(price) || 0,
      unit: unit.trim() || "pcs",
      stock: Number(stock) || 0,
      photo_url: photoUrl,
      description: description.trim(),
      is_active: true,
    });

    setIsSuccess(true);
    setTimeout(() => {
      router.push("/seller/produk");
    }, 1200);
  };

  const selectedCategory = categories.find((c) => c.id === categoryId) || categories[0];

  return (
    <div className="flex flex-col w-full p-4 pb-28 min-h-screen">
      {/* Header with Step Indicator */}
      <div className="pb-3 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => {
              if (currentStep > 1) setCurrentStep((prev) => prev - 1);
              else router.back();
            }}
            aria-label="Kembali"
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-extrabold text-slate-900 text-sm">
              Tambah Produk Baru
            </h1>
            <span className="text-xs text-primary font-bold">
              Langkah {currentStep} dari 4
            </span>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-2 rounded-full transition-all ${
                currentStep >= step ? "bg-primary" : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Success Modal */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 shadow-2xl text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-primary flex items-center justify-center mb-3">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-extrabold text-lg text-slate-900 mb-1">
              Produk Berhasil Disimpan!
            </h3>
            <p className="text-xs text-slate-500">
              Produk Anda kini sudah tampil dan bisa langsung dipesan oleh warga.
            </p>
          </div>
        </div>
      )}

      {/* ================= STEP 1: UPLOAD FOTO ================= */}
      {currentStep === 1 && (
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <h2 className="text-lg font-extrabold text-slate-900">
              📷 Foto Produk
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pilih foto atau gunakan contoh foto yang tersedia.
            </p>
          </div>

          {/* Large Photo Preview */}
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-slate-100 border-2 border-dashed border-emerald-300 shadow-sm flex items-center justify-center">
            <Image
              src={photoUrl}
              alt="Preview Foto"
              fill
              className="object-cover"
            />
          </div>

          {/* Camera / Gallery Options */}
          <div className="grid grid-cols-2 gap-3">
            <label className="h-12 rounded-2xl bg-emerald-50 text-emerald-900 font-bold text-xs flex items-center justify-center gap-2 border border-emerald-200 cursor-pointer active:scale-95 transition-all">
              <Camera className="w-4 h-4 text-primary" />
              <span>Ambil Kamera</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <label className="h-12 rounded-2xl bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 border border-slate-200 cursor-pointer active:scale-95 transition-all">
              <ImageIcon className="w-4 h-4 text-slate-600" />
              <span>Pilih Galeri</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Quick Preset Photos */}
          <div>
            <span className="text-xs font-bold text-slate-700 block mb-2">
              Atau pilih foto siap pakai:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {PRESET_PHOTOS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPhotoUrl(preset.url)}
                  className={`p-1.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    photoUrl === preset.url
                      ? "border-primary bg-emerald-50 ring-2 ring-primary"
                      : "border-slate-200 bg-white"
                  }`}
                >
                  <div className="relative w-full h-14 rounded-lg overflow-hidden">
                    <Image
                      src={preset.url}
                      alt={preset.label}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-700 truncate w-full text-center">
                    {preset.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 pb-safe">
            <div className="max-w-[640px] mx-auto">
              <button
                onClick={() => setCurrentStep(2)}
                className="w-full h-12 rounded-xl bg-primary text-white font-extrabold text-sm shadow-md hover:bg-primary-dark active:scale-98 transition-all"
              >
                Lanjut ke Langkah 2 →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 2: NAMA & HARGA ================= */}
      {currentStep === 2 && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white border border-slate-200">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
              <Image src={photoUrl} alt="Thumbnail" fill className="object-cover" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium">Foto Terpilih</span>
              <h3 className="text-xs font-bold text-slate-800">Langkah 2: Nama & Harga</h3>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Nama Produk <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Misal: Risoles Mayo Spesial"
                className="w-full h-12 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Harga Jual (Rupiah) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-xs font-bold text-slate-400">
                  Rp
                </span>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  placeholder="2000"
                  className="w-full h-12 pl-11 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Satuan Produk
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full h-12 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="pcs">per pcs / buah</option>
                <option value="toples">per toples</option>
                <option value="botol">per botol</option>
                <option value="porsi">per porsi</option>
                <option value="bungkus">per bungkus</option>
                <option value="kg">per kg</option>
                <option value="paket">per paket</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Kategori Produk
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full h-12 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.icon} {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sticky Nav Buttons */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 pb-safe">
            <div className="max-w-[640px] mx-auto grid grid-cols-2 gap-3">
              <button
                onClick={() => setCurrentStep(1)}
                className="h-12 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                ← Kembali
              </button>
              <button
                disabled={!name.trim() || price <= 0}
                onClick={() => setCurrentStep(3)}
                className="h-12 rounded-xl bg-primary text-white font-extrabold text-xs disabled:opacity-40 shadow-sm"
              >
                Lanjut ke Langkah 3 →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 3: STOK & DESKRIPSI ================= */}
      {currentStep === 3 && (
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <h2 className="text-lg font-extrabold text-slate-900">
              📦 Jumlah Stok
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Berapa banyak porsi/produk yang siap dipesan hari ini?
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col items-center gap-4">
            {/* Big Stepper */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setStock(Math.max(0, stock - 5))}
                className="w-14 h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-2xl flex items-center justify-center active:scale-90"
              >
                <Minus className="w-6 h-6" />
              </button>
              <div className="text-center">
                <input
                  type="number"
                  min="0"
                  value={stock}
                  onChange={(e) => setStock(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-24 text-center font-extrabold text-4xl text-primary bg-transparent focus:outline-none"
                />
                <span className="text-xs font-bold text-slate-400 block mt-0.5">
                  {unit}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setStock(stock + 5)}
                className="w-14 h-14 rounded-2xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-extrabold text-2xl flex items-center justify-center active:scale-90"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>

            <div className="flex gap-2">
              {[10, 20, 50, 100].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setStock(preset)}
                  className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
                >
                  {preset} {unit}
                </button>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              ℹ️ Stok akan otomatis berkurang saat pembeli melakukan pemesanan.
            </p>
          </div>

          {/* Description */}
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm">
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Deskripsi Singkat (Opsional)
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ceritakan bahan utama, rasa, atau saran penyajian..."
              className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
            />
          </div>

          {/* Sticky Nav Buttons */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 pb-safe">
            <div className="max-w-[640px] mx-auto grid grid-cols-2 gap-3">
              <button
                onClick={() => setCurrentStep(2)}
                className="h-12 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                ← Kembali
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="h-12 rounded-xl bg-primary text-white font-extrabold text-xs shadow-sm"
              >
                Cek Konfirmasi →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= STEP 4: KONFIRMASI & SIMPAN ================= */}
      {currentStep === 4 && (
        <div className="flex flex-col gap-4">
          <div className="text-center">
            <h2 className="text-lg font-extrabold text-slate-900">
              ✅ Cek Produk Anda
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Pastikan rincian produk sudah sesuai sebelum ditampilkan.
            </p>
          </div>

          {/* Preview Card */}
          <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-card">
            <div className="relative w-full aspect-[16/10] bg-slate-100">
              <Image src={photoUrl} alt={name} fill className="object-cover" />
            </div>

            <div className="p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  {selectedCategory?.icon} {selectedCategory?.name}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  Stok: {stock} {unit}
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-slate-900">
                {name || "Nama Produk"}
              </h3>

              <div className="text-xl font-extrabold text-primary">
                {formatRupiah(price)} <span className="text-xs font-normal text-slate-500">/{unit}</span>
              </div>

              {description && (
                <p className="text-xs text-slate-600 border-t border-slate-100 pt-2 mt-1 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Sticky Nav Buttons */}
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 pb-safe">
            <div className="max-w-[640px] mx-auto grid grid-cols-2 gap-3">
              <button
                onClick={() => setCurrentStep(3)}
                className="h-12 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
              >
                ← Ubah Data
              </button>
              <button
                onClick={handleSave}
                className="h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg active:scale-98 transition-all flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" /> Simpan Produk
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
