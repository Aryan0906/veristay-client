import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
    throw new Error(
        'Invalid SUPABASE_URL. Please check your .env file and ensure "VITE_SUPABASE_URL" is set to a valid URL.'
    );
}

if (!supabaseAnonKey) {
    throw new Error(
        'Invalid SUPABASE_ANON_KEY. Please check your .env file and ensure "VITE_SUPABASE_ANON_KEY" is set.'
    );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
