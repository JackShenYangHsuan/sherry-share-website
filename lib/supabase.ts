import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Public client (uses anon key, respects RLS)
export const supabase: SupabaseClient = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as unknown as SupabaseClient;

// Admin client (uses service role key, bypasses RLS - server-side only!)
export const supabaseAdmin: SupabaseClient = (supabaseUrl && supabaseServiceRoleKey)
  ? createClient(supabaseUrl, supabaseServiceRoleKey)
  : null as unknown as SupabaseClient;
