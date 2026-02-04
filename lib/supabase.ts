
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fallback to avoid crash if env vars are missing
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase Environment Variables are missing! Check your Vercel Config.');
}

const url = supabaseUrl || 'https://placeholder.supabase.co';
const key = supabaseAnonKey || 'placeholder-key';

// Create a single supabase client for interacting with your database
export const supabase = createBrowserClient(url, key);
