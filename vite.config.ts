import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  preview: {
    port: parseInt(process.env.VITE_PORT || '3005', 10),
    strictPort: true,
  },
  server: {
    port: parseInt(process.env.VITE_PORT || '3005', 10),
    strictPort: true,
  },
});