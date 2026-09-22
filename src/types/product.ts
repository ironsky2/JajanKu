import { Seller } from "./seller";

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description?: string;
  display_order?: number;
}

export interface Product {
  id: string;
  seller_id: string;
  category_id: string;
  name: string;
  slug: string;
  price: number;
  unit: string;
  stock: number;
  photo_url: string;
  description?: string;
  is_active: boolean;
  created_at?: string;
  seller?: Seller;
  category?: Category;
}
