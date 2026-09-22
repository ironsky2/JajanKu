import { create } from "zustand";
import { Category, Product } from "@/types/product";
import { Seller } from "@/types/seller";
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_SELLERS } from "@/lib/mockData";
import { slugify } from "@/lib/utils";

interface UserSession {
  role: "guest" | "seller" | "admin";
  sellerId?: string;
  email?: string;
}

interface MarketState {
  categories: Category[];
  sellers: Seller[];
  products: Product[];
  currentSession: UserSession;
  isInitialized: boolean;

  // Initialization & Hydration
  initializeStore: () => void;

  // Auth / Session actions
  loginAsSeller: (sellerId: string) => void;
  loginAsAdmin: () => void;
  loginWithCredentials: (email: string, role?: "seller" | "admin") => boolean;
  logout: () => void;

  // Product actions (Seller & Admin)
  addProduct: (productData: Omit<Product, "id" | "slug" | "created_at">) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  toggleProductStatus: (id: string) => void;
  updateProductStock: (id: string, newStock: number) => void;

  // Seller actions (Seller & Admin)
  addSeller: (sellerData: Omit<Seller, "id">) => Seller;
  updateSeller: (id: string, updates: Partial<Seller>) => void;
  toggleSellerStatus: (id: string) => void;

  // Category actions (Admin)
  addCategory: (categoryData: Omit<Category, "id" | "slug">) => Category;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
}

const LOCAL_STORAGE_KEY = "jajankuy_market_state_v1";

export const useMarketStore = create<MarketState>((set, get) => ({
  categories: INITIAL_CATEGORIES,
  sellers: INITIAL_SELLERS,
  products: INITIAL_PRODUCTS,
  currentSession: { role: "guest" },
  isInitialized: false,

  initializeStore: () => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge initial sellers so edits in mockData (e.g. WA number) reflect automatically
        const mergedSellers = (parsed.sellers || INITIAL_SELLERS).map((s: any) => {
          const init = INITIAL_SELLERS.find((item) => item.id === s.id);
          if (init && (s.wa_number === "081234567890" || !s.wa_number)) {
            return { ...s, wa_number: init.wa_number };
          }
          return s;
        });

        set({
          categories: parsed.categories || INITIAL_CATEGORIES,
          sellers: mergedSellers,
          products: parsed.products || INITIAL_PRODUCTS,
          currentSession: parsed.currentSession || { role: "guest" },
          isInitialized: true,
        });
        return;
      }
    } catch {
      // ignore
    }
    set({
      categories: INITIAL_CATEGORIES,
      sellers: INITIAL_SELLERS,
      products: INITIAL_PRODUCTS,
      isInitialized: true,
    });
  },

  loginAsSeller: (sellerId: string) => {
    const seller = get().sellers.find((s) => s.id === sellerId);
    const session: UserSession = {
      role: "seller",
      sellerId,
      email: seller ? `${slugify(seller.name)}@jajankuy.local` : "seller@jajankuy.local",
    };
    set({ currentSession: session });
    saveToStorage(get());
  },

  loginAsAdmin: () => {
    const session: UserSession = {
      role: "admin",
      email: "admin.rt05@jajankuy.local",
    };
    set({ currentSession: session });
    saveToStorage(get());
  },

  loginWithCredentials: (email: string, role: "seller" | "admin" = "seller") => {
    if (role === "admin" || email.toLowerCase().includes("admin")) {
      get().loginAsAdmin();
      return true;
    }
    // Match seller by email or fallback to first seller
    const match = get().sellers.find(
      (s) => s.store_name.toLowerCase().includes(email.split("@")[0].toLowerCase()) ||
             s.name.toLowerCase().includes(email.split("@")[0].toLowerCase())
    ) || get().sellers[0];

    get().loginAsSeller(match.id);
    return true;
  },

  logout: () => {
    set({ currentSession: { role: "guest" } });
    saveToStorage(get());
  },

  addProduct: (productData) => {
    const id = `p_${Date.now()}`;
    const baseSlug = slugify(productData.name);
    const uniqueSlug = `${baseSlug}-${Math.random().toString(36).substring(2, 6)}`;

    const newProduct: Product = {
      ...productData,
      id,
      slug: uniqueSlug,
      created_at: new Date().toISOString(),
    };

    set((state) => ({
      products: [newProduct, ...state.products],
    }));
    saveToStorage(get());
    return newProduct;
  },

  updateProduct: (id, updates) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id
          ? {
              ...p,
              ...updates,
              slug: updates.name ? slugify(updates.name) : p.slug,
            }
          : p
      ),
    }));
    saveToStorage(get());
  },

  toggleProductStatus: (id) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, is_active: !p.is_active } : p
      ),
    }));
    saveToStorage(get());
  },

  updateProductStock: (id, newStock) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, stock: Math.max(0, newStock) } : p
      ),
    }));
    saveToStorage(get());
  },

  addSeller: (sellerData) => {
    const id = `s_${Date.now()}`;
    const newSeller: Seller = {
      ...sellerData,
      id,
      created_at: new Date().toISOString(),
    };
    set((state) => ({
      sellers: [...state.sellers, newSeller],
    }));
    saveToStorage(get());
    return newSeller;
  },

  updateSeller: (id, updates) => {
    set((state) => ({
      sellers: state.sellers.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    }));
    saveToStorage(get());
  },

  toggleSellerStatus: (id) => {
    set((state) => ({
      sellers: state.sellers.map((s) =>
        s.id === id ? { ...s, is_active: !s.is_active } : s
      ),
    }));
    saveToStorage(get());
  },

  addCategory: (categoryData) => {
    const id = `c_${Date.now()}`;
    const slug = slugify(categoryData.name);
    const newCategory: Category = {
      ...categoryData,
      id,
      slug,
      display_order: get().categories.length + 1,
    };
    set((state) => ({
      categories: [...state.categories, newCategory],
    }));
    saveToStorage(get());
    return newCategory;
  },

  updateCategory: (id, updates) => {
    set((state) => ({
      categories: state.categories.map((c) =>
        c.id === id
          ? {
              ...c,
              ...updates,
              slug: updates.name ? slugify(updates.name) : c.slug,
            }
          : c
      ),
    }));
    saveToStorage(get());
  },

  deleteCategory: (id) => {
    set((state) => ({
      categories: state.categories.filter((c) => c.id !== id),
    }));
    saveToStorage(get());
  },
}));

function saveToStorage(state: MarketState) {
  if (typeof window === "undefined") return;
  try {
    const dataToSave = {
      categories: state.categories,
      sellers: state.sellers,
      products: state.products,
      currentSession: state.currentSession,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToSave));
  } catch {
    // ignore
  }
}
