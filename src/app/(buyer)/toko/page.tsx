"use client";

import Link from "next/link";
import Image from "next/image";
import { Store, MapPin, MessageCircle, ArrowRight } from "lucide-react";
import { useMarketStore } from "@/stores/useMarketStore";

export default function StoresDirectoryPage() {
  const sellers = useMarketStore((state) => state.sellers.filter((s) => s.is_active));
  const products = useMarketStore((state) => state.products.filter((p) => p.is_active));

  return (
    <div className="flex flex-col w-full p-4 pb-12">
      <div className="mb-4">
        <h1 className="text-xl font-extrabold text-slate-900">
          Daftar Toko & Penjual
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Jajan langsung dari kreasi dapur & produk rumahan ibu-ibu tetangga.
        </p>
      </div>

      <div className="flex flex-col gap-3.5">
        {sellers.map((seller) => {
          const sellerProducts = products.filter((p) => p.seller_id === seller.id);

          return (
            <div
              key={seller.id}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-card hover:border-emerald-300 transition-all flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-emerald-500/20 flex-shrink-0">
                  <Image
                    src={seller.photo_url || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200"}
                    alt={seller.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h2 className="font-bold text-slate-900 text-base truncate">
                      {seller.store_name}
                    </h2>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Aktif
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium truncate mt-0.5">
                    {seller.name}
                  </p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
                    {seller.address}
                  </p>
                </div>
              </div>

              {seller.description && (
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl">
                  {seller.description}
                </p>
              )}

              <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-500">
                  {sellerProducts.length} Produk Siap Pesan
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/${seller.wa_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-whatsapp/15 text-whatsapp-dark text-xs font-bold flex items-center gap-1 hover:bg-whatsapp/25 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" /> Chat
                  </a>
                  <Link
                    href={`/toko/${seller.id}`}
                    className="px-3 py-1.5 rounded-xl bg-primary text-white text-xs font-bold flex items-center gap-1 hover:bg-primary-dark active:scale-95 transition-all shadow-sm"
                  >
                    Kunjungi Toko <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
