// 檢查部署產物（dist/）沒有任何院內連結或內部資料。npm run build 之後執行：npm run check:bundle
// ・不允許：NotebookLM、Google 文件／雲端硬碟、匿名分享連結、密碼雜湊、院內資料檔。
// ・唯一允許的外部網址：建置時設定的「醫護人員專區」入口（VITE_STAFF_PORTAL_URL，需院內帳號登入）。
// ・發現問題時只列出檔案與規則，不印出內容。
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, basename } from 'node:path';

const dir = process.argv[2] ?? 'dist';
const banned = [
  [/notebooklm\.google\.com/i, 'NotebookLM 連結'],
  [/docs\.google\.com/i, 'Google 文件連結'],
  [/drive\.google\.com/i, 'Google 雲端硬碟連結'],
  [/1drv\.ms|onedrive\.live\.com/i, 'OneDrive 分享連結'],
  [/guestaccess\.aspx|[?&](authkey|redeem)=/i, '匿名分享連結'],
  [/STAFF_PASSWORD/i, '密碼設定'],
  [/scrypt\$/, '密碼雜湊'],
];
const bannedFiles = /^(cards\.json|users\.json|access\.log)$/;
// 院方核准、公開給病友使用的外部平台（由該平台處理填寫與資料，不含院內文件）
const APPROVED_PUBLIC = [
  'https://apps.chimei.org.tw', // 奇美醫院醫病共享決策（SDM）問卷，見 src/content/sdm.ts
];
let portalOrigin = null;
if (process.env.VITE_STAFF_PORTAL_URL) {
  try { portalOrigin = new URL(process.env.VITE_STAFF_PORTAL_URL).origin.toLowerCase(); } catch { /* 交給建置檢查 */ }
}
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : files.push(p); });
walk(dir);
let bad = 0;
for (const f of files) {
  if (bannedFiles.test(basename(f))) { console.error(`✗ ${f}：院內資料檔不應出現在部署檔案`); bad++; continue; }
  const text = readFileSync(f, 'utf8');
  for (const [re, what] of banned) if (re.test(text)) { console.error(`✗ ${f} 含有不應公開的內容：${what}`); bad++; }
  // 除了 w3.org 命名空間、程式庫網址與設定的醫護入口外，不應出現其他外部 https 網址
  for (const m of text.matchAll(/https:\/\/[a-z0-9.-]+/gi)) {
    if (/w3\.org|phaser\.io|github\.com|localhost/.test(m[0])) continue;
    if (APPROVED_PUBLIC.includes(m[0].toLowerCase())) continue;
    if (portalOrigin && m[0].toLowerCase() === portalOrigin) continue;
    console.error(`✗ ${f} 含未核准的外部網址（網域：${m[0].replace('https://', '')}）`);
    bad++;
  }
}
if (bad) process.exit(1);
console.log(`✓ 已檢查 ${files.length} 個檔案：沒有 NotebookLM／院內連結、匿名分享連結或帳密${portalOrigin ? '（醫護入口網域已核准）' : ''}。`);
