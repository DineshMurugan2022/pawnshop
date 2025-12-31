import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Please click the "Connect to Supabase" button in the top right to set up your Supabase project.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database
export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
};

export type JewelryItem = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

export type PawnRequest = {
  id: string;
  user_id: string;
  item_description: string;
  requested_amount: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
};