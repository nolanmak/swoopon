import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        // Don't rewrite the API path since our backend routes include /api
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
