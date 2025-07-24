import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Profile {
  id: string
  full_name?: string
  phone?: string
  address?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  original_price?: number
  category: string
  image_url?: string
  is_new: boolean
  is_sale: boolean
  rating: number
  review_count: number
  stock_quantity: number
  created_at: string
  updated_at: string
}

export interface Favorite {
  id: string
  user_id: string
  product_id: string
  created_at: string
  product?: Product
}

export interface Order {
  id: string
  user_id: string
  total_amount: number
  delivery_fee: number
  delivery_address: string
  phone_number: string
  payment_method: string
  payment_status: string
  order_status: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price: number
  created_at: string
  product?: Product
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: string
  created_at: string
}