import { defineConfig, loadEnv } from 'vite';
import { checkPortalUrl } from './src/staff/portalUrl';

// base 預設為根目錄；部署到子路徑時用環境變數 BASE_PATH，例如 BASE_PATH=/hf-island/ npm run build
export default defineConfig(({ mode }) => {
  // 醫護人員專區入口：網址不符合規定（例如 NotebookLM、匿名分享連結、帶密碼或邀請碼）時直接停止建置，
  // 避免把不該公開的連結寫進部署檔案。錯誤訊息只說明原因，不印出網址本身。
  const env = { ...loadEnv(mode, process.cwd(), 'VITE_'), ...process.env };
  const portal = checkPortalUrl(env.VITE_STAFF_PORTAL_URL);
  if (portal && !portal.ok) throw new Error(`VITE_STAFF_PORTAL_URL 不符合規定：${portal.reason}。請改用院方核准、需要院內帳號登入的入口網址。`);
  return {
    base: process.env.BASE_PATH ?? '/',
    build: { target: 'es2022', chunkSizeWarningLimit: 1600 },
    server: { host: true },
  };
});
