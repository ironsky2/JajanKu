"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, User, Store } from "lucide-react";

export function SellerNav() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Dashboard",
      href: "/seller/dashboard",
      icon: LayoutDashboard,
      isActive: pathname === "/seller/dashboard",
    },
    {
      label: "Produk",
      href: "/seller/produk",
      icon: Package,
      isActive: pathname.startsWith("/seller/produk"),
    },
    {
      label: "Profil",
      href: "/seller/profil",
      icon: User,
      isActive: pathname === "/seller/profil",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/80 shadow-sticky pb-safe">
      <div className="max-w-[640px] mx-auto h-16 px-6 grid grid-cols-3 items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = item.isActive;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
                active
                  ? "text-primary font-bold scale-105"
                  : "text-slate-500 hover:text-slate-900 font-medium"
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
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
