"use client";

import { useState, useEffect } from "react";
import { Download, X, Sparkles } from "lucide-react";

export function PWAInstallBanner() {
  const [show, setShow] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Check if dismissed before
    const isDismissed = sessionStorage.getItem("pwa_banner_dismissed");
    if (isDismissed) {
      setShow(false);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setShow(false);
      }
      setDeferredPrompt(null);
    } else {
      alert("Untuk memasang aplikasi JajanKuy di Android/Chrome: Ketuk tombol Menu (titik tiga) lalu pilih 'Tambahkan ke Layar Utama' (Add to Home Screen).");
    }
  };

  const handleDismiss = () => {
    setShow(false);
    sessionStorage.setItem("pwa_banner_dismissed", "true");
  };

  if (!show) return null;

  return (
    <div className="px-4 pt-2 pb-1">
      <div className="bg-emerald-50 border border-emerald-200/80 text-slate-800 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center flex-shrink-0 text-primary">
            <Download className="w-5 h-5" />
          </div>
          <p className="text-xs leading-snug">
            <strong className="text-primary-dark font-bold">Pasang JajanKuy</strong> di HP Anda, buka cepat tanpa beban memori!
          </p>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <button
            onClick={handleInstall}
            className="px-3 py-1.5 bg-primary text-white rounded-xl text-xs font-bold shadow-sm hover:bg-primary-dark active:scale-95 transition-all"
          >
            Pasang
          </button>
          <button
            onClick={handleDismiss}
            aria-label="Tutup banner"
            className="text-slate-400 hover:text-slate-700 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
