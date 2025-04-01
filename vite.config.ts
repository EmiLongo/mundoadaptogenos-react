// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@img': path.resolve(__dirname, './src/assets/img'),
      // '@api': path.resolve(__dirname, './src/api'),
      '@components': path.resolve(__dirname, './src/components'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
})
