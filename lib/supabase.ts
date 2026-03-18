import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Only create the client if both env vars are present
export const supabase: SupabaseClient = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as unknown as SupabaseClient;

// SQL to create the articles table (run this in Supabase SQL editor):
/*
CREATE TABLE articles (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT DEFAULT '',
  categories TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  image TEXT DEFAULT '',
  date DATE DEFAULT CURRENT_DATE,
  author TEXT DEFAULT 'Sherry',
  status TEXT DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  content TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS but allow all operations (simple setup)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all" ON articles FOR ALL USING (true) WITH CHECK (true);
*/
