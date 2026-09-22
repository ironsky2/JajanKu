"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  MessageCircle, 
  Store, 
  MapPin, 
  Truck, 
  ShoppingBag, 
  Check, 
  AlertCircle, 
  Sparkles 
} from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { formatRupiah } from "@/lib/utils";
import { generateCartWhatsAppUrl } from "@/lib/whatsapp";

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const seller = useCartStore((state) => state.seller);
  const cartNotes = useCartStore((state) => state.notes);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const clearCart = useCartStore((state) => state.clearCart);

  const [name, setName] = useState("");
  const [waNumber, setWaNumber] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryOption, setDeliveryOption] = useState<"pickup" | "delivery">("delivery");
  const [notes, setNotes] = useState(cartNotes);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [generatedWaUrl, setGeneratedWaUrl] = useState("");

  const totalPrice = getTotalPrice();

  if (items.length === 0 || !seller) {
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-lg font-bold text-slate-900 mb-2">Keranjang Masih Kosong</h2>
        <p className="text-xs text-slate-500 mb-4">
          Silakan tambahkan produk terlebih dahulu sebelum mengisi formulir pemesanan.
        </p>
        <Link href="/produk" className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold">
          Pilih Produk
        </Link>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !waNumber.trim() || !address.trim()) {
      alert("Mohon lengkapi Nama, Nomor WhatsApp, dan Alamat Rumah Anda.");
      return;
    }

    const waUrl = generateCartWhatsAppUrl(
      seller.name,
      seller.wa_number,
      items,
      totalPrice,
      {
        name,
        waNumber,
        address,
        deliveryOption,
        notes,
      }
    );

    setGeneratedWaUrl(waUrl);
    setShowConfirmDialog(true);
  };

  const handleOpenWhatsApp = () => {
    // Open WA URL
    window.open(generatedWaUrl, "_blank");
    // Clear cart and go back to home
    clearCart();
    setShowConfirmDialog(false);
    router.push("/");
  };

  return (
    <div className="flex flex-col w-full pb-32">
      {/* Header */}
      <div className="p-4 bg-white border-b border-slate-100 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          aria-label="Kembali"
          className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 active:scale-95"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-base font-extrabold text-slate-900 leading-tight">
            Isi Data Pemesanan
          </h1>
          <p className="text-xs text-slate-500">
            Toko {seller.store_name} ({seller.name})
          </p>
        </div>
      </div>

      {/* Ringkasan Pesanan Box */}
      <div className="p-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col gap-3">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4 text-primary" /> Ringkasan Pesanan
          </h2>

          <div className="divide-y divide-slate-100">
            {items.map((item) => (
              <div key={item.product.id} className="py-2 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-slate-800">{item.product.name}</span>
                  <span className="text-slate-400 ml-1.5">x{item.quantity}</span>
                </div>
                <span className="font-semibold text-slate-700">
                  {formatRupiah(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
            <span className="font-bold text-sm text-slate-900">Total Pembayaran</span>
            <span className="font-extrabold text-lg text-primary">
              {formatRupiah(totalPrice)}
            </span>
          </div>
        </div>
      </div>

      {/* Form Data Pemesan */}
      <form onSubmit={handleSubmit} className="px-4 flex flex-col gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col gap-3.5">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <span>👤</span> Data Pemesan
          </h2>

          {/* Nama Lengkap */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Ibu Linda / Mas Dimas"
              className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
            />
          </div>

          {/* Nomor WhatsApp */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Nomor WhatsApp Anda <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={waNumber}
              onChange={(e) => setWaNumber(e.target.value)}
              placeholder="Contoh: 081234567890"
              className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
            />
          </div>

          {/* Alamat Rumah */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Alamat Rumah (Blok / No.) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Contoh: Blok B No. 07"
              className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:ring-1 focus:ring-primary focus:bg-white"
            />
          </div>

          {/* Pilihan Pengiriman Toggle */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Pilihan Pengiriman <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setDeliveryOption("pickup")}
                className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                  deliveryOption === "pickup"
                    ? "border-primary bg-emerald-50 text-emerald-900 ring-1 ring-primary"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">Pickup</span>
                  {deliveryOption === "pickup" && <Check className="w-4 h-4 text-primary" />}
                </div>
                <span className="text-[11px] text-slate-500">Ambil Sendiri ke Rumah Penjual</span>
              </button>

              <button
                type="button"
                onClick={() => setDeliveryOption("delivery")}
                className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                  deliveryOption === "delivery"
                    ? "border-primary bg-emerald-50 text-emerald-900 ring-1 ring-primary"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">Delivery</span>
                  {deliveryOption === "delivery" && <Check className="w-4 h-4 text-primary" />}
                </div>
                <span className="text-[11px] text-slate-500">Antar ke Rumah (Sesama Komplek)</span>
              </button>
            </div>
          </div>

          {/* Catatan Tambahan */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Catatan / Request Khusus (Opsional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Misal: Sambal dipisah ya Bu, atau titip di pagar..."
              className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Sticky CTA Submit Button */}
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-sticky pb-safe">
          <div className="max-w-[640px] mx-auto p-4">
            <button
              type="submit"
              className="w-full h-13 py-3.5 rounded-2xl bg-whatsapp hover:bg-whatsapp-dark text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Kirim Pesanan via WhatsApp</span>
            </button>
            <p className="text-[11px] text-slate-500 text-center mt-2 leading-tight">
              Pesanan akan otomatis membuka aplikasi WhatsApp dengan pesan terformat rapi.
            </p>
          </div>
        </div>
      </form>

      {/* Dialog Konfirmasi WhatsApp (Modal) */}
      {showConfirmDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-whatsapp/15 text-whatsapp-dark flex items-center justify-center mb-3">
              <MessageCircle className="w-8 h-8 text-whatsapp" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-1.5">
              Lanjut ke WhatsApp?
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed mb-6">
              Pesanan Anda akan otomatis dikirimkan ke WhatsApp <strong>{seller.name}</strong> ({seller.store_name}).<br />
              Cukup tekan tombol <strong>"Kirim"</strong> di WhatsApp setelah ini ya! 🙏
            </p>

            <div className="flex flex-col w-full gap-2.5">
              <button
                type="button"
                onClick={handleOpenWhatsApp}
                className="w-full h-12 rounded-xl bg-whatsapp text-white font-bold text-sm shadow-md hover:bg-whatsapp-dark active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Buka WhatsApp
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmDialog(false)}
                className="w-full h-11 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 active:scale-95 transition-all"
              >
                Batal / Periksa Lagi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
