import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

if (supabaseUrl === 'https://placeholder.supabase.co') {
  console.error("CRITICAL ERROR: Supabase Environment Variables are MISSING. Ensure NEXT_PUBLIC_SUPABASE_URL is set in Vercel.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
