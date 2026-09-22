"use client";

import Link from "next/link";
import { ShoppingBag, MapPin, Sparkles } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";

interface HeaderProps {
  showBack?: boolean;
  title?: string;
}

export function Header({ showBack = false, title }: HeaderProps) {
  const totalItems = useCartStore((state) => state.getTotalItems());

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-[640px] mx-auto h-16 px-4 flex items-center justify-between gap-3">
        {showBack ? (
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              onClick={() => window.history.back()}
              className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
              aria-label="Kembali"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-lg font-bold text-slate-900 truncate">
              {title || "JajanKuy"}
            </h1>
          </div>
        ) : (
          <Link href="/" className="flex items-center gap-2.5 min-w-0 flex-1 group">
            {/* Logo Badge */}
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform">
              <span className="text-xl font-extrabold tracking-tight">JK</span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl text-primary-dark tracking-tight leading-none">
                  Jajan<span className="text-primary">Kuy</span>
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 leading-none">
                  Tetangga
                </span>
              </div>
              <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5">
                <MapPin className="w-3 h-3 text-primary flex-shrink-0" />
                <span className="truncate">Dapur Tetangga & Sekitar</span>
              </div>
            </div>
          </Link>
        )}

        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href="/keranjang"
            aria-label="Keranjang Belanja"
            className="relative w-11 h-11 flex items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
          >
            <ShoppingBag className="w-6 h-6 text-slate-700" />
            {totalItems > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 bg-red-600 text-white text-[11px] font-bold rounded-full flex items-center justify-center leading-none ring-2 ring-white animate-pulse">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
