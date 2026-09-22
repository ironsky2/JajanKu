"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, MessageCircle, LogIn, Store, Shield, ArrowLeft } from "lucide-react";
import { useMarketStore } from "@/stores/useMarketStore";
import { generateAdminContactWhatsAppUrl } from "@/lib/whatsapp";

export default function SellerLoginPage() {
  const router = useRouter();
  const sellers = useMarketStore((state) => state.sellers);
  const loginAsSeller = useMarketStore((state) => state.loginAsSeller);
  const loginAsAdmin = useMarketStore((state) => state.loginAsAdmin);
  const loginWithCredentials = useMarketStore((state) => state.loginWithCredentials);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleQuickLogin = (sellerId: string) => {
    loginAsSeller(sellerId);
    router.push("/seller/dashboard");
  };

  const handleAdminLogin = () => {
    loginAsAdmin();
    router.push("/admin");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setErrorMsg("Masukkan email Anda");
      return;
    }

    if (email.toLowerCase().includes("admin")) {
      handleAdminLogin();
      return;
    }

    const success = loginWithCredentials(email, "seller");
    if (success) {
      router.push("/seller/dashboard");
    } else {
      setErrorMsg("Email atau akun penjual tidak ditemukan.");
    }
  };

  const adminWaUrl = generateAdminContactWhatsAppUrl("6281234567890", "pendaftaran akun penjual baru di JajanKuy");

  return (
    <div className="min-h-screen p-6 flex flex-col justify-center max-w-sm mx-auto">
      {/* Back to Buyer link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-semibold mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Kembali ke Halaman Pembeli
      </Link>

      {/* Logo & Branding */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-2xl bg-primary text-white flex items-center justify-center font-extrabold text-2xl mx-auto mb-3 shadow-lg shadow-emerald-600/20">
          JK
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          Jajan<span className="text-primary">Kuy</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Jajan dari Tetangga, Mudah & Cepat!
        </p>
      </div>

      {/* Quick Demo Login Picker (Very helpful for evaluation & testing) */}
      <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3.5 mb-5">
        <p className="text-[11px] font-bold text-emerald-900 mb-2 uppercase tracking-wide">
          ⚡ Masuk Cepat Akun Demo:
        </p>
        <div className="flex flex-col gap-1.5">
          {sellers.slice(0, 3).map((seller) => (
            <button
              key={seller.id}
              type="button"
              onClick={() => handleQuickLogin(seller.id)}
              className="w-full text-left px-3 py-2 bg-white rounded-xl text-xs font-semibold text-slate-800 hover:bg-emerald-100 hover:text-emerald-900 border border-emerald-100 transition-all flex items-center justify-between"
            >
              <span>👩 {seller.name} ({seller.store_name})</span>
              <span className="text-[10px] text-emerald-700 font-bold">Masuk →</span>
            </button>
          ))}
          <button
            type="button"
            onClick={handleAdminLogin}
            className="w-full text-left px-3 py-2 bg-white rounded-xl text-xs font-semibold text-slate-800 hover:bg-slate-100 border border-slate-200 transition-all flex items-center justify-between mt-0.5"
          >
            <span>🛡️ Akun Admin RT (Pengelola)</span>
            <span className="text-[10px] text-slate-600 font-bold">Masuk →</span>
          </button>
        </div>
      </div>

      {/* Login Form */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-card">
        <h2 className="text-sm font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
          Masuk dengan Email Penjual
        </h2>

        {errorMsg && (
          <div className="p-2.5 rounded-xl bg-red-50 text-red-700 text-xs font-semibold mb-3">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sari@email.com"
              required
              className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 pl-3 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 font-medium focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 mt-2 rounded-xl bg-primary text-white font-extrabold text-sm shadow-md hover:bg-primary-dark active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" /> Masuk ke Toko Saya
          </button>
        </form>
      </div>

      {/* Admin Help Footer */}
      <div className="mt-6 text-center">
        <p className="text-xs text-slate-600 mb-2">
          Belum punya akun penjual? Hubungi admin RT untuk mendaftarkan toko Anda secara gratis.
        </p>
        <a
          href={adminWaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-whatsapp-dark hover:underline"
        >
          <MessageCircle className="w-4 h-4 text-whatsapp" /> Hubungi Admin via WhatsApp
        </a>
      </div>
    </div>
  );
}
