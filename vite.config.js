import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/oj-annual-report-2025',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '127.0.0.1',
    proxy: {
      '/onlinejudge3/api': {
        target: 'https://oj.sdutacm.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/onlinejudge3\/api/, '/onlinejudge3/api'),
      },
    }
  },
  experimental: {
    renderBuiltUrl(filename) {
      let cdnUrl = process.env.CDN_URL || '/oj-annual-report-2025';
      if (!cdnUrl.endsWith('/')) {
        cdnUrl += '/';
      }
      return `${cdnUrl}${filename}`;
    },
  },
});
