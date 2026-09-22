export interface Seller {
  id: string;
  user_id?: string;
  store_name: string;
  name: string;
  wa_number: string;
  photo_url?: string;
  cover_url?: string;
  address: string;
  description?: string;
  is_active: boolean;
  created_at?: string;
}
