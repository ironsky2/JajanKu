export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      sellers: {
        Row: {
          id: string
          user_id: string | null
          store_name: string
          name: string
          wa_number: string
          photo_url: string | null
          cover_url: string | null
          address: string
          description: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          store_name: string
          name: string
          wa_number: string
          photo_url?: string | null
          cover_url?: string | null
          address: string
          description?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          store_name?: string
          name?: string
          wa_number?: string
          photo_url?: string | null
          cover_url?: string | null
          address?: string
          description?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          icon: string
          description: string | null
          display_order: number | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          icon: string
          description?: string | null
          display_order?: number | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          icon?: string
          description?: string | null
          display_order?: number | null
        }
      }
      products: {
        Row: {
          id: string
          seller_id: string
          category_id: string
          name: string
          slug: string
          price: number
          unit: string
          stock: number
          photo_url: string
          description: string | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          seller_id: string
          category_id: string
          name: string
          slug: string
          price: number
          unit?: string
          stock?: number
          photo_url: string
          description?: string | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          seller_id?: string
          category_id?: string
          name?: string
          slug?: string
          price?: number
          unit?: string
          stock?: number
          photo_url?: string
          description?: string | null
          is_active?: boolean
          created_at?: string
        }
      }
    }
  }
}
