"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageCircle, MapPin, Store, Sparkles } from "lucide-react";
import { useMarketStore } from "@/stores/useMarketStore";
import { ProductCard } from "@/components/buyer/ProductCard";

export default function StoreFrontPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const sellers = useMarketStore((state) => state.sellers);
  const products = useMarketStore((state) => state.products.filter((p) => p.is_active));
  const categories = useMarketStore((state) => state.categories);

  const seller = sellers.find((s) => s.id === id);

  if (!seller) {
    return (
      <div className="p-8 text-center flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-lg font-bold text-slate-900 mb-2">Toko Tidak Ditemukan</h2>
        <p className="text-xs text-slate-500 mb-4">
          Toko penjual mungkin sudah tidak aktif atau tautan salah.
        </p>
        <Link href="/toko" className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold">
          Lihat Daftar Toko
        </Link>
      </div>
    );
  }

  const sellerProducts = products
    .filter((p) => p.seller_id === seller.id)
    .map((p) => ({
      ...p,
      seller,
      category: categories.find((c) => c.id === p.category_id),
    }));

  return (
    <div className="flex flex-col w-full pb-16">
      {/* Store Cover Image */}
      <div className="relative w-full h-36 bg-emerald-800 overflow-hidden">
        <Image
          src={seller.cover_url || "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1000"}
          alt="Cover Toko"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          aria-label="Kembali"
          className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center text-slate-800 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Seller Profile Header */}
      <div className="px-4 -mt-10 relative z-10">
        <div className="flex items-end gap-3.5 mb-3">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-white shadow-md bg-white flex-shrink-0">
            <Image
              src={seller.photo_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400"}
              alt={seller.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="pb-1 min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-extrabold text-slate-900 leading-tight truncate">
                {seller.store_name}
              </h1>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 flex-shrink-0">
                Terverifikasi RT
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-600 truncate mt-0.5">
              {seller.name}
            </p>
          </div>
        </div>

        {/* Address & Description */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <span>Lokasi: <strong>{seller.address}</strong></span>
          </div>

          {seller.description && (
            <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5">
              {seller.description}
            </p>
          )}

          {/* WA Action Button */}
          <a
            href={`https://wa.me/${seller.wa_number}?text=Halo%20${encodeURIComponent(seller.name)},%20saya%20tetangga%20ingin%20tanya%20produk%20di%20${encodeURIComponent(seller.store_name)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-11 rounded-xl bg-whatsapp text-white hover:bg-whatsapp-dark font-bold text-xs flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md mt-1"
          >
            <MessageCircle className="w-4 h-4" /> Hubungi Penjual via WhatsApp
          </a>
        </div>
      </div>

      {/* Seller Products Section */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3.5">
          <h2 className="font-bold text-slate-900 text-base flex items-center gap-1.5">
            <Store className="w-4 h-4 text-primary" /> Daftar Produk ({sellerProducts.length})
          </h2>
        </div>

        {sellerProducts.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-slate-200">
            <p className="text-xs text-slate-500">
              Belum ada produk aktif dari toko ini saat ini.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {sellerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
