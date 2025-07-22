import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
// DO NOT IMPORT imagemin
// import imagemin from 'vite-plugin-imagemin';

const isDocker = process.env.DOCKER === 'true';
const isWindows = process.platform === 'win32';

export default defineConfig({
  plugins: [
    react(),
    !isDocker &&
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    // ⚠️ REMOVE vite-plugin-imagemin from Docker builds
    ...(isWindows && !isDocker
      ? [
          // imagemin({
          //   gifsicle: { optimizationLevel: 7, interlaced: false },
          //   optipng: { optimizationLevel: 7 },
          //   mozjpeg: { quality: 80 },
          //   pngquant: { quality: [0.8, 0.9], speed: 4 },
          //   svgo: {
          //     plugins: [
          //       { name: 'removeViewBox' },
          //       { name: 'removeEmptyAttrs', active: false },
          //     ],
          //   },
          // }),
        ]
      : []),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': { target: 'http://10.7.35.44:8081', changeOrigin: true },
      '/auth': { target: 'http://10.7.35.44:8081', changeOrigin: true },
      '/api/notifications/sse': {
        target: 'http://10.7.35.44:8081',
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
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        statements: 70,
        branches: 70,
        functions: 70,
        lines: 70
      }
    },
  },
});
