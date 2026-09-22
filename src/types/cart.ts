import { Product } from "./product";
import { Seller } from "./seller";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  seller: Seller | null;
  items: CartItem[];
  notes: string;
  addItem: (product: Product, quantity?: number) => { success: boolean; conflict?: boolean; existingSellerName?: string };
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setNotes: (notes: string) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}
