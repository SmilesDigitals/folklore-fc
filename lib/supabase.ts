
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fallback to avoid crash if env vars are missing (Logs warning instead of crashing app)
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase Environment Variables are missing! Check your Vercel Config.');
}

const url = supabaseUrl || 'https://placeholder.supabase.co';
const key = supabaseAnonKey || 'placeholder-key';

export const supabase = createClient(url, key);
