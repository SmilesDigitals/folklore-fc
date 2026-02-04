
import { createBrowserClient } from '@supabase/ssr';

// Define the Supabase URL and Anon Key from environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Ensure keys are present (for debugging purposes)
if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
    console.error('❌ Supabase Keys Missing! Check .env.local');
}

// Create a single supabase client for interacting with your database
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
