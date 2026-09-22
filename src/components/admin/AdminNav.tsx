"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Tags, ShoppingBag, Store } from "lucide-react";

export function AdminNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Ringkasan",
      href: "/admin",
      icon: LayoutDashboard,
      isActive: pathname === "/admin",
    },
    {
      label: "Penjual",
      href: "/admin/penjual",
      icon: Users,
      isActive: pathname === "/admin/penjual",
    },
    {
      label: "Kategori",
      href: "/admin/kategori",
      icon: Tags,
      isActive: pathname === "/admin/kategori",
    },
    {
      label: "Bantu Produk",
      href: "/admin/produk",
      icon: ShoppingBag,
      isActive: pathname === "/admin/produk",
    },
    {
      label: "Ke Pasar",
      href: "/",
      icon: Store,
      isActive: false,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900 text-white border-t border-slate-800 shadow-sticky pb-safe">
      <div className="max-w-[640px] mx-auto h-16 px-2 grid grid-cols-5 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
                active
                  ? "text-emerald-400 font-bold scale-105"
                  : "text-slate-400 hover:text-white font-medium"
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
              <span className="text-[10px] mt-1 leading-tight tracking-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
