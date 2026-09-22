"use client";

import { AlertCircle } from "lucide-react";

interface CartConflictModalProps {
  isOpen: boolean;
  existingSellerName: string;
  newSellerName: string;
  onConfirmSwitch: () => void;
  onCancel: () => void;
}

export function CartConflictModal({
  isOpen,
  existingSellerName,
  newSellerName,
  onConfirmSwitch,
  onCancel,
}: CartConflictModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-sm bg-white rounded-2xl p-5 shadow-2xl border border-slate-100 flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
          <AlertCircle className="w-7 h-7" />
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-1.5">
          Ganti Penjual?
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-5">
          Keranjang belanja Anda saat ini berisi produk dari <strong className="text-slate-900">{existingSellerName}</strong>. 
          Karena pesanan akan langsung dikirimkan ke WhatsApp penjual, satu pesanan hanya bisa untuk 1 toko.
        </p>

        <div className="flex flex-col w-full gap-2.5">
          <button
            onClick={onConfirmSwitch}
            className="w-full h-12 rounded-xl bg-primary text-white font-bold text-sm shadow-md hover:bg-primary-dark active:scale-98 transition-all"
          >
            Kosongkan & Ganti ke {newSellerName}
          </button>
          <button
            onClick={onCancel}
            className="w-full h-11 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 active:scale-98 transition-all"
          >
            Pertahankan Keranjang Saat Ini
          </button>
        </div>
      </div>
    </div>
  );
}
