"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Store, 
  ArrowRight, 
  FileText, 
  AlertCircle 
} from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";
import { formatRupiah } from "@/lib/utils";

export default function CartPage() {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const seller = useCartStore((state) => state.seller);
  const notes = useCartStore((state) => state.notes);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const setNotes = useCartStore((state) => state.setNotes);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  if (items.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[65vh] text-center">
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-4xl mb-4 shadow-inner animate-bounce">
          🛒
        </div>
        <h2 className="text-xl font-extrabold text-slate-900 mb-2">
          Keranjang Masih Kosong
        </h2>
        <p className="text-xs text-slate-500 max-w-xs leading-relaxed mb-6">
          Yuk jelajahi aneka masakan lezat, kue basah, dan sembako segar dari tetangga perumahan kita!
        </p>
        <Link
          href="/produk"
          className="px-6 py-3 rounded-2xl bg-primary text-white font-bold text-sm shadow-md hover:bg-primary-dark active:scale-95 transition-all flex items-center gap-2"
        >
          <span>Mulai Jajan Sekarang</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-32">
      {/* Seller Header Banner */}
      {seller && (
        <div className="p-4 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
              <Store className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-primary text-white">
                  Toko
                </span>
                <h2 className="font-bold text-slate-900 text-sm truncate">
                  {seller.store_name}
                </h2>
              </div>
              <p className="text-xs text-slate-600 truncate mt-0.5">
                Penjual: {seller.name} · {seller.address}
              </p>
            </div>
          </div>

          <button
            onClick={clearCart}
            className="text-xs text-red-600 hover:text-red-800 font-semibold flex-shrink-0 underline ml-2"
          >
            Kosongkan
          </button>
        </div>
      )}

      {/* Cart Items List */}
      <div className="p-4 flex flex-col gap-3">
        {items.map((item) => {
          const subtotal = item.product.price * item.quantity;

          return (
            <div
              key={item.product.id}
              className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-card flex gap-3 items-center"
            >
              {/* Product Thumbnail */}
              <div className="relative w-18 h-18 w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                <Image
                  src={item.product.photo_url || "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=200"}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Info & Controls */}
              <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                <div className="flex items-start justify-between gap-1">
                  <h3 className="font-bold text-slate-900 text-sm line-clamp-1">
                    {item.product.name}
                  </h3>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-slate-400 hover:text-red-600 p-1 -mr-1"
                    aria-label="Hapus item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-xs text-slate-500 mt-0.5">
                  {formatRupiah(item.product.price)} / {item.product.unit || "pcs"}
                </div>

                <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-50">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-0.5">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-700 hover:bg-white active:scale-90"
                      aria-label="Kurangi"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-extrabold text-xs text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-700 hover:bg-white active:scale-90 disabled:opacity-30"
                      aria-label="Tambah"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <span className="font-extrabold text-sm text-primary">
                    {formatRupiah(subtotal)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Optional Note for Seller */}
      <div className="px-4 pb-4">
        <div className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-slate-400" />
            Catatan untuk Penjual (Opsional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Misal: Jangan terlalu pedas, tolong antar sebelum maghrib..."
            rows={2}
            className="w-full text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Info Single Seller Guarantee */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-100 text-slate-600 text-[11px]">
          <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <span>Pesanan ini dikhususkan untuk 1 penjual agar langsung masuk ke WA yang tepat.</span>
        </div>
      </div>

      {/* Sticky Bottom Summary & Checkout Button */}
      <div className="fixed bottom-16 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-sticky pb-safe">
        <div className="max-w-[640px] mx-auto p-4 flex items-center justify-between gap-4">
          <div>
            <div className="text-xs text-slate-500 font-medium">
              Total ({totalItems} item)
            </div>
            <div className="text-xl font-extrabold text-primary">
              {formatRupiah(totalPrice)}
            </div>
          </div>

          <Link
            href="/checkout"
            className="px-6 py-3 rounded-2xl bg-primary text-white font-bold text-sm shadow-md hover:bg-primary-dark active:scale-95 transition-all flex items-center gap-2"
          >
            <span>Lanjut Pesan</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
