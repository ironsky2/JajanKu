"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Plus, Store, Check, AlertCircle } from "lucide-react";
import { Product } from "@/types/product";
import { formatRupiah } from "@/lib/utils";
import { useCartStore } from "@/stores/useCartStore";
import { generateDirectProductWhatsAppUrl } from "@/lib/whatsapp";
import { CartConflictModal } from "./CartConflictModal";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const [justAdded, setJustAdded] = useState(false);
  const [conflictModalOpen, setConflictModalOpen] = useState(false);
  const [existingSellerName, setExistingSellerName] = useState("");

  const addItem = useCartStore((state) => state.addItem);
  const clearCart = useCartStore((state) => state.clearCart);

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const sellerName = product.seller?.name || "Penjual";
  const sellerStore = product.seller?.store_name || "Dapur Tetangga";
  const sellerPhone = product.seller?.wa_number || "6281234567890";
  const sellerAddress = product.seller?.address || "Blok Tetangga";

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    const result = addItem(product, 1);
    if (result.conflict) {
      setExistingSellerName(result.existingSellerName || "Penjual Lain");
      setConflictModalOpen(true);
    } else {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1200);
    }
  };

  const handleConfirmSwitch = () => {
    clearCart();
    addItem(product, 1);
    setConflictModalOpen(false);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  const directWaUrl = generateDirectProductWhatsAppUrl(
    product,
    sellerName,
    sellerPhone,
    1
  );

  return (
    <>
      <div
        className={`bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-card transition-all duration-200 hover:shadow-md flex flex-col ${
          isOutOfStock ? "opacity-75" : ""
        }`}
      >
        {/* Product Image & Badges */}
        <Link
          href={`/produk/${product.slug}`}
          className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden block group"
        >
          <Image
            src={product.photo_url || "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 400px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Stock Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
            {isOutOfStock ? (
              <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[11px] font-bold shadow-sm">
                Habis ❌
              </span>
            ) : isLowStock ? (
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[11px] font-bold shadow-sm flex items-center gap-1">
                Sisa {product.stock} {product.unit}!
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-bold shadow-sm">
                Tersedia ({product.stock})
              </span>
            )}
          </div>
        </Link>

        {/* Card Content */}
        <div className="p-3.5 flex flex-col flex-1 justify-between gap-2">
          <div>
            {/* Seller Micro Info */}
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <Link
                href={`/toko/${product.seller?.id || product.seller_id}`}
                className="flex items-center gap-1 hover:text-primary font-medium truncate max-w-[70%]"
              >
                <Store className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span className="truncate">{sellerStore}</span>
              </Link>
              <span className="text-[11px] font-semibold text-slate-400 truncate">
                {sellerAddress}
              </span>
            </div>

            {/* Product Title */}
            <Link href={`/produk/${product.slug}`}>
              <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2 hover:text-primary transition-colors">
                {product.name}
              </h3>
            </Link>

            {/* Price */}
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-extrabold text-primary">
                {formatRupiah(product.price)}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                /{product.unit || "pcs"}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1 mt-auto">
            {isOutOfStock ? (
              <div className="col-span-2 py-2.5 text-center bg-slate-100 text-slate-400 font-bold text-xs rounded-xl">
                Stok Habis
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`h-10 px-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1 transition-all active:scale-95 shadow-sm ${
                    justAdded
                      ? "bg-emerald-700 text-white"
                      : "bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
                  }`}
                  aria-label="Tambah ke keranjang"
                >
                  {justAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Ditambah
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5 text-primary" /> +Keranjang
                    </>
                  )}
                </button>

                <a
                  href={directWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 px-2 rounded-xl bg-whatsapp text-white hover:bg-whatsapp-dark font-bold text-xs flex items-center justify-center gap-1 active:scale-95 transition-all shadow-sm"
                  aria-label="Pesan via WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WA
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      <CartConflictModal
        isOpen={conflictModalOpen}
        existingSellerName={existingSellerName}
        newSellerName={sellerStore}
        onConfirmSwitch={handleConfirmSwitch}
        onCancel={() => setConflictModalOpen(false)}
      />
    </>
  );
}
