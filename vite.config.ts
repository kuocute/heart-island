import { defineConfig } from 'vite';

// base 預設為根目錄；部署到子路徑時用環境變數 BASE_PATH，例如 BASE_PATH=/hf-island/ npm run build
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  build: { target: 'es2022', chunkSizeWarningLimit: 1600 },
  server: { host: true },
});
