import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://10.7.35.44:8081',
        changeOrigin: true,
      },
      '/auth': {
        target: 'http://10.7.35.44:8081',
        changeOrigin: true,
      },
      /* '/websocket': {
        target: 'ws://10.7.35.44:8081',
        ws: true,
        changeOrigin: true
      }, */
      // Ajout du proxy spécifique pour les notifications SSE
      '/api/notifications/sse': {
        target: 'http://10.7.35.44:8081',
        changeOrigin: true,
      }
    }
  },
  define: {
    global: 'window'
  }
})
