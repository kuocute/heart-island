// 檢查部署產物（dist/）沒有任何院內連結或內部資料。npm run build 之後執行：npm run check:bundle
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2] ?? 'dist';
const banned = [/notebooklm\.google\.com/i, /docs\.google\.com/i, /drive\.google\.com/i, /STAFF_PASSWORD/i, /scrypt\$/];
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : files.push(p); });
walk(dir);
let bad = 0;
for (const f of files) {
  const text = readFileSync(f, 'utf8');
  for (const re of banned) if (re.test(text)) { console.error(`✗ ${f} 含有不應公開的內容：${re}`); bad++; }
  // 除了 w3.org 命名空間與 https 驗證程式碼外，不應出現其他外部 https 網址
  for (const m of text.matchAll(/https:\/\/[a-z0-9.-]+/gi)) {
    if (!/w3\.org|phaser\.io|github\.com|localhost/.test(m[0])) { console.error(`✗ ${f} 含外部網址 ${m[0]}`); bad++; }
  }
}
if (bad) process.exit(1);
console.log(`✓ 已檢查 ${files.length} 個檔案：沒有 NotebookLM／院內連結或帳密。`);
