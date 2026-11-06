import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey && !supabaseUrl.includes("your-project")
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface RsvpEntry {
  id?: string;
  name: string;
  status: "hadir" | "tidak_hadir" | "ragu";
  guest_count: number;
  message: string;
  created_at?: string;
}

export interface GuestEntry {
  id?: string;
  name: string;
  phone?: string;
  category?: string;
  is_sent?: boolean;
  slug?: string;
  created_at?: string;
}
