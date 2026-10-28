import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from "path"
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
    dedupe: ['react', 'react-dom'],
  },
  optimizeDeps: {
    // Force Vite to pre-bundle these together
    include: ['react', 'react-dom', '@base-ui/react'],
  },
  server: {
    proxy: {
      '/api':  'http://localhost:3000',
    }
  }
})
