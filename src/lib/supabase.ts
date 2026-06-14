import { createClient } from '@supabase/supabase-js';

// Read Supabase URL and anon public key from Vite environment variables.
// In a .env file (or .env.local) you should define:
// VITE_SUPABASE_URL=https://<your-project>.supabase.co
// VITE_SUPABASE_ANON_KEY=public-anon-key

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
