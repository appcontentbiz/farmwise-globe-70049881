
import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are defined
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase environment variables are missing.');
  console.log('================== IMPORTANT INSTRUCTIONS ==================');
  console.log('To fix this error:');
  console.log('1. Go to your Supabase project at https://app.supabase.com');
  console.log('2. Navigate to Project Settings > API');
  console.log('3. Copy your project URL and anon/public key');
  console.log('4. In your Lovable project, find a way to add environment variables:');
  console.log('   - Look for Settings, Environment Variables, or Project Settings in your Lovable interface');
  console.log('   - If you cannot find these options, consider connecting your project to GitHub');
  console.log('     and adding environment variables through your preferred development environment');
  console.log('5. Add these two environment variables:');
  console.log('   VITE_SUPABASE_URL=your_project_url');
  console.log('   VITE_SUPABASE_ANON_KEY=your_anon_key');
  console.log('==========================================================');
}

// Create Supabase client with fallback to empty strings to prevent immediate crashes
// This will still produce an error, but in a more controlled way with better instructions
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',  // Fallback URL
  supabaseAnonKey || 'placeholder-key'                   // Fallback key
);
