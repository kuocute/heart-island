// 醫護人員專區入口網址的檢查規則（建置時與執行時共用，沒有其他依賴）。
// 入口網址只能指向「院方核准、需要院內帳號登入」的平台（例如 SharePoint 網站或醫院內網）。
// 院內文件、規範全文、密碼、邀請碼，以及任何可匿名開啟的分享連結，都不能出現在公開程式或部署檔案。

export type PortalCheck = { ok: true; url: string } | { ok: false; reason: string };

/** 不能直接當作入口的服務：請放在已驗證權限的院內入口「裡面」 */
const BLOCKED_HOSTS: [RegExp, string][] = [
  [/(^|\.)notebooklm\.google\.com$/i, 'NotebookLM 連結請放在已驗證權限的院內入口裡，不要直接公開'],
  [/(^|\.)docs\.google\.com$/i, 'Google 文件連結請放在院內入口裡'],
  [/(^|\.)drive\.google\.com$/i, 'Google 雲端硬碟連結請放在院內入口裡'],
  [/(^|\.)1drv\.ms$/i, 'OneDrive 短網址通常是匿名分享連結'],
  [/(^|\.)onedrive\.live\.com$/i, '個人 OneDrive 分享連結不是院內入口'],
];

/** 看起來像匿名分享、或帶有帳密／邀請碼的網址 */
const RISKY_PATTERNS: [RegExp, string][] = [
  [/guestaccess\.aspx/i, 'SharePoint 匿名（訪客）分享連結'],
  [/[?&](authkey|resid|redeem)=/i, '匿名分享連結參數'],
  [/[?&](password|passwd|pwd|token|access_token|code|invite|invitecode|key|sig|signature)=/i, '網址帶有密碼、權杖或邀請碼'],
];

export function checkPortalUrl(raw: unknown): PortalCheck | null {
  if (typeof raw !== 'string' || !raw.trim()) return null; // 未設定：顯示「尚未開放」
  let u: URL;
  try {
    u = new URL(raw.trim());
  } catch {
    return { ok: false, reason: '不是有效的網址' };
  }
  if (u.protocol !== 'https:') return { ok: false, reason: '入口必須使用 https' };
  if (u.username || u.password) return { ok: false, reason: '網址不可包含帳號或密碼' };
  for (const [re, why] of BLOCKED_HOSTS) if (re.test(u.hostname)) return { ok: false, reason: why };
  for (const [re, why] of RISKY_PATTERNS) if (re.test(u.pathname + u.search)) return { ok: false, reason: why };
  return { ok: true, url: u.href };
}
