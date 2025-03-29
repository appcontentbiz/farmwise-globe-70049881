
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/', // Ensures assets are loaded correctly in production
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // The component tagger is only used in development mode
    mode === 'development' && 
    (() => {
      try {
        return require('lovable-tagger').componentTagger();
      } catch (e) {
        console.warn('lovable-tagger not available, skipping...');
        return null;
      }
    })(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
