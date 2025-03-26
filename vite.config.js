import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: "dist",
    target: "esnext", // Merged from second config
  },
  preview: {
    port: 4173,
    open: true
  }
});
