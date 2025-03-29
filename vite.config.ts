
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
    'process.env.REACT_APP_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL || 'https://phdxahmpqvobbrqqjbut.supabase.co'),
    'process.env.REACT_APP_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZHhhaG1wcXZvYmJycXFqYnV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3MzAyODgsImV4cCI6MjA1MjMwNjI4OH0.lVWfcAaigt8z5yskV8XLH_EhYJJiNQ9mz_5PTQKMBng'),
  }
});
