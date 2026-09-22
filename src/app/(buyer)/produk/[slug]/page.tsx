"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowLeft, 
  Store, 
  MessageCircle, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Check, 
  MapPin, 
  ShieldCheck, 
  Sparkles 
} from "lucide-react";
import { useMarketStore } from "@/stores/useMarketStore";
import { useCartStore } from "@/stores/useCartStore";
import { formatRupiah } from "@/lib/utils";
import { generateDirectProductWhatsAppUrl } from "@/lib/whatsapp";
import { CartConflictModal } from "@/components/buyer/CartConflictModal";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [conflictModalOpen, setConflictModalOpen] = useState(false);
  const [existingSellerName, setExistingSellerName] = useState("");

  const products = useMarketStore((state) => state.products);
  const sellers = useMarketStore((state) => state.sellers);
  const categories = useMarketStore((state) => state.categories);

  const addItem = useCartStore((state) => state.addItem);
  const clearCart = useCartStore((state) => state.clearCart);

  // Find product by slug or id
  const product = products.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl mb-3">
          🍽️
        </div>
        <h2 className="text-lg font-bold text-slate-900 mb-1">Produk Tidak Ditemukan</h2>
        <p className="text-xs text-slate-500 mb-5">
          Produk mungkin sudah dinonaktifkan atau dihapus oleh penjual.
        </p>
        <Link
          href="/produk"
          className="px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold shadow-sm"
        >
          Lihat Produk Lainnya
        </Link>
      </div>
    );
  }

  const seller = sellers.find((s) => s.id === product.seller_id);
  const category = categories.find((c) => c.id === product.category_id);

  const isOutOfStock = product.stock <= 0;
  const maxStock = product.stock;

  const handleIncrement = () => {
    if (quantity < maxStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    const populatedProduct = { ...product, seller, category };
    const result = addItem(populatedProduct, quantity);

    if (result.conflict) {
      setExistingSellerName(result.existingSellerName || "Penjual Lain");
      setConflictModalOpen(true);
    } else {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    }
  };

  const handleConfirmSwitch = () => {
    clearCart();
    const populatedProduct = { ...product, seller, category };
    addItem(populatedProduct, quantity);
    setConflictModalOpen(false);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const directWaUrl = generateDirectProductWhatsAppUrl(
    product,
    seller?.name || "Ibu Penjual",
    seller?.wa_number || "6281234567890",
    quantity
  );

  return (
    <div className="flex flex-col w-full pb-32">
      {/* Product Image Banner */}
      <div className="relative w-full aspect-square bg-slate-100 max-h-[380px]">
        <Image
          src={product.photo_url || "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=800"}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 640px) 100vw, 640px"
          className="object-cover"
        />

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          aria-label="Kembali"
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-slate-800 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Category & Stock Badge */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {category && (
            <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-800 text-xs font-bold shadow-md flex items-center gap-1.5">
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </span>
          )}
          {isOutOfStock ? (
            <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold shadow-md">
              Stok Habis ❌
            </span>
          ) : (
            <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-md">
              ✅ Stok Tersedia ({product.stock} {product.unit})
            </span>
          )}
        </div>
      </div>

      {/* Main Details */}
      <div className="p-4 bg-white border-b border-slate-100">
        <h1 className="text-2xl font-extrabold text-slate-900 leading-tight mb-2">
          {product.name}
        </h1>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-3xl font-extrabold text-primary">
            {formatRupiah(product.price)}
          </span>
          <span className="text-sm font-medium text-slate-500">
            /{product.unit || "pcs"}
          </span>
        </div>

        {/* Fresh / Guarantee Pill */}
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Produk buatan rumah tangga tetangga. Higienis & dibuat fresh!</span>
        </div>
      </div>

      {/* Description Section */}
      <div className="p-4 bg-white border-b border-slate-100 mt-2">
        <h3 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
          <span>📦</span> Tentang Produk
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
          {product.description || "Dibuat dengan bahan-bahan pilihan berkualitas, cocok untuk dinikmati bersama keluarga tercinta."}
        </p>
      </div>

      {/* Seller Information Card */}
      {seller && (
        <div className="p-4 bg-white border-b border-slate-100 mt-2">
          <h3 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-1.5">
            <Store className="w-4 h-4 text-primary" /> Penjual
          </h3>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-emerald-500/30">
              <Image
                src={seller.photo_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200"}
                alt={seller.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-slate-900 text-sm truncate">
                  {seller.name}
                </h4>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Aktif
                </span>
              </div>
              <p className="text-xs text-primary font-semibold truncate mt-0.5">
                {seller.store_name}
              </p>
              <p className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-slate-400" />
                {seller.address}
              </p>
            </div>
          </div>

          <div className="mt-3 flex gap-2">
            <Link
              href={`/toko/${seller.id}`}
              className="flex-1 py-2 text-center rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 active:scale-98 transition-all"
            >
              Lihat Semua Produk Toko
            </Link>
            <a
              href={`https://wa.me/${seller.wa_number}?text=Halo%20${encodeURIComponent(seller.name)},%20saya%20tertarik%20dengan%20produk%20di%20toko%20Anda.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-whatsapp text-white text-xs font-bold flex items-center gap-1 active:scale-98 transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Chat WA
            </a>
          </div>
        </div>
      )}

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-sticky pb-safe">
        <div className="max-w-[640px] mx-auto p-3 flex flex-col gap-2.5">
          {/* Quantity Stepper & Subtotal */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600">Jumlah:</span>
              <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-0.5">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 hover:bg-white active:scale-90 disabled:opacity-40"
                  aria-label="Kurangi"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center font-extrabold text-sm text-slate-900">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={quantity >= maxStock || isOutOfStock}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-700 hover:bg-white active:scale-90 disabled:opacity-40"
                  aria-label="Tambah"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-semibold block">Total</span>
              <span className="text-base font-extrabold text-primary">
                {formatRupiah(product.price * quantity)}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          {isOutOfStock ? (
            <div className="w-full h-12 rounded-xl bg-slate-200 text-slate-500 font-bold text-sm flex items-center justify-center">
              Stok Produk Habis
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className={`h-12 px-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-98 shadow-sm ${
                  justAdded
                    ? "bg-emerald-800 text-white"
                    : "bg-emerald-50 text-emerald-900 border border-emerald-300 hover:bg-emerald-100"
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" /> Berhasil Ditambah!
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 text-primary" /> + Keranjang
                  </>
                )}
              </button>

              <a
                href={directWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-12 px-3 rounded-xl bg-whatsapp text-white hover:bg-whatsapp-dark font-bold text-sm flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md"
              >
                <MessageCircle className="w-4 h-4" /> Pesan via WA
              </a>
            </div>
          )}
        </div>
      </div>

      <CartConflictModal
        isOpen={conflictModalOpen}
        existingSellerName={existingSellerName}
        newSellerName={seller?.store_name || "Toko Ini"}
        onConfirmSwitch={handleConfirmSwitch}
        onCancel={() => setConflictModalOpen(false)}
      />
    </div>
  );
}
