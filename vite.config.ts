import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': { target: 'http://localhost:8081', changeOrigin: true },
      '/auth': { target: 'http://localhost:8081', changeOrigin: true },
      '/api/notifications/sse': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
    },
  },
  define: {
    global: 'window',
 },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    css: false,
  },
});
