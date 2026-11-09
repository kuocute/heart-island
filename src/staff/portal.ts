// 醫護人員專區｜院內帳號登入
// ・入口設在 01「入院評估花園」（住院區的照護花園），每個住院區站點的「醫護規範」分頁也有同一個入口。
// ・點擊後開啟院方核准的 SharePoint 或內網文件入口，由該平台驗證院內帳號與文件讀取權限。
// ・病友與家屬的衛教遊戲維持免登入。
// ・入口網址在建置時用環境變數 VITE_STAFF_PORTAL_URL 設定（GitHub Pages 使用儲存庫變數 STAFF_PORTAL_URL），
//   不寫在程式碼裡；網址不符合規則時建置會失敗（見 vite.config.ts 與 portalUrl.ts）。
import { checkPortalUrl } from './portalUrl';

export const PORTAL_LABEL = '醫護人員專區｜院內帳號登入';
export const PORTAL_NOT_OPEN = '院內規範入口尚未開放，請洽心衰照護團隊';
/** 入口所在的站點 */
export const PORTAL_STATION = 'admission';

const checked = checkPortalUrl(import.meta.env.VITE_STAFF_PORTAL_URL);
/** 已設定且通過檢查的入口網址；未設定時為 null */
export const STAFF_PORTAL_URL: string | null = checked && checked.ok ? checked.url : null;
