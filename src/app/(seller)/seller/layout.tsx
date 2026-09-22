"use client";

import { usePathname } from "next/navigation";
import { SellerNav } from "@/components/seller/SellerNav";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/seller/login";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center">
      <div className="w-full max-w-[640px] min-h-screen bg-surface flex flex-col relative shadow-xl shadow-slate-200/50">
        <main className={`flex-1 w-full ${isLoginPage ? "" : "pb-24"}`}>
          {children}
        </main>
        {!isLoginPage && <SellerNav />}
      </div>
    </div>
  );
}
