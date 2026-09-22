"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Store, ShoppingBag, ShoppingCart, UserCheck } from "lucide-react";
import { useCartStore } from "@/stores/useCartStore";

export function BottomNav() {
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.getTotalItems());

  const navItems = [
    {
      label: "Beranda",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      label: "Produk",
      href: "/produk",
      icon: Store,
      isActive: pathname.startsWith("/produk"),
    },
    {
      label: "Keranjang",
      href: "/keranjang",
      icon: ShoppingBag,
      isActive: pathname === "/keranjang" || pathname === "/checkout",
      badge: totalItems > 0 ? totalItems : undefined,
    },
    {
      label: "Toko",
      href: "/toko",
      icon: Store,
      isActive: pathname.startsWith("/toko"),
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 shadow-sticky pb-safe">
      <div className="max-w-[640px] mx-auto h-16 px-4 grid grid-cols-4 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all relative ${
                active
                  ? "text-primary font-bold scale-105"
                  : "text-slate-500 hover:text-slate-900 font-medium"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${active ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
                {item.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-[17px] h-[17px] px-1 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none ring-2 ring-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 leading-tight tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
