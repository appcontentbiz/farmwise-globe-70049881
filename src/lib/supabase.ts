
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase connection not established.');
  console.log('================== IMPORTANT INSTRUCTIONS ==================');
  console.log('To connect your project to Supabase:');
  console.log('1. Click on the green "Supabase" button at the top right of your Lovable interface');
  console.log('2. Follow the prompts to connect your Supabase project');
  console.log('3. This will automatically configure the necessary connection details');
  console.log('==========================================================');
}

// Create Supabase client with fallback values that will result in a more user-friendly error
export const supabase = createClient(
  supabaseUrl || 'https://example.supabase.co',
  supabaseAnonKey || 'public-anon-key-placeholder'
);

// We need to modify the auth context to handle connection errors gracefully
export const isSupabaseConnected = () => {
  return !!supabaseUrl && !!supabaseAnonKey;
};
