import { create } from "zustand";
import { Product } from "@/types/product";
import { Seller } from "@/types/seller";
import { CartItem, CartState } from "@/types/cart";

const CART_STORAGE_KEY = "jajankuy_cart_v1";

export const useCartStore = create<CartState>((set, get) => ({
  seller: null,
  items: [],
  notes: "",

  addItem: (product: Product, quantity = 1) => {
    const currentSeller = get().seller;
    const currentItems = get().items;

    // Check single-seller rule
    if (currentSeller && product.seller_id !== currentSeller.id && currentItems.length > 0) {
      return {
        success: false,
        conflict: true,
        existingSellerName: currentSeller.store_name,
      };
    }

    // If new cart or empty, set seller
    let targetSeller = currentSeller;
    if (!targetSeller || currentItems.length === 0) {
      targetSeller = product.seller || {
        id: product.seller_id,
        store_name: "Toko Penjual",
        name: "Penjual",
        wa_number: "628123456789",
        address: "Blok Warga",
        is_active: true,
      };
    }

    const existingIndex = currentItems.findIndex((item) => item.product.id === product.id);

    let updatedItems: CartItem[];
    if (existingIndex > -1) {
      updatedItems = currentItems.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedItems = [...currentItems, { product, quantity }];
    }

    set({ seller: targetSeller, items: updatedItems });
    saveCartToStorage(targetSeller, updatedItems, get().notes);
    return { success: true };
  },

  removeItem: (productId: string) => {
    const updatedItems = get().items.filter((item) => item.product.id !== productId);
    const seller = updatedItems.length === 0 ? null : get().seller;
    set({ items: updatedItems, seller });
    saveCartToStorage(seller, updatedItems, get().notes);
  },

  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }

    const updatedItems = get().items.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    set({ items: updatedItems });
    saveCartToStorage(get().seller, updatedItems, get().notes);
  },

  clearCart: () => {
    set({ seller: null, items: [], notes: "" });
    if (typeof window !== "undefined") {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  },

  setNotes: (notes: string) => {
    set({ notes });
    saveCartToStorage(get().seller, get().items, notes);
  },

  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));

function saveCartToStorage(seller: Seller | null, items: CartItem[], notes: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify({ seller, items, notes })
    );
  } catch {
    // ignore
  }
}

// Hydrate cart from localStorage on client load
if (typeof window !== "undefined") {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      useCartStore.setState({
        seller: parsed.seller || null,
        items: parsed.items || [],
        notes: parsed.notes || "",
      });
    }
  } catch {
    // ignore
  }
}
