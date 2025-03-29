
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Ensures assets are loaded correctly in production
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Force commonjs modules for Netlify compatibility
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    outDir: 'dist', // Specify output directory for build
  },
  // Ensure environment variables are properly loaded by defining explicit prefixes
  envPrefix: ['VITE_', 'REACT_APP_'],
  // Define environment variables to ensure they're available during build
  define: {
    'process.env.REACT_APP_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL || 'https://example.supabase.co'),
    'process.env.REACT_APP_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSJ9.LzKGEffr7J2qvk5wgSFO3jnQq4UvHQ06S3-9FMRXYes'),
  }
});
