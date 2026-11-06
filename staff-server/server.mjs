// 醫療人員工作頁「參考實作」：伺服器驗證登入與醫療人員授權後，才回傳 NotebookLM 連結與查核資料。
// ⚠ 這只是示範流程。正式上線請改接院內單一登入（SSO／AD／院內帳號系統），並由資訊室審核：
//   HTTPS、帳號鎖定、稽核紀錄、工作階段逾時與權限管理。
// 只用 Node 內建模組，無第三方依賴。
//
// 環境變數：
//   PORT                   預設 8787
//   STAFF_USERS            醫護人員名單檔，預設 staff-server/data/users.json（用 staff-server/users.mjs 管理）
//   STAFF_USER／STAFF_PASSWORD_HASH  （選用）單一帳號，名單檔之外再加一個
//   ACCESS_LOG             登入紀錄檔，預設 staff-server/data/access.log
//   STAFF_DATA             查核資料 JSON 路徑，預設 staff-server/data/cards.json（勿提交版本庫）
//   STATIC_DIR             同時提供病友端網頁（npm run build 的 dist），預設 ./dist
//   COOKIE_SECURE=1        經 HTTPS 提供時開啟
import { createServer } from 'node:http';
import { readFileSync, existsSync, statSync, createReadStream, appendFileSync } from 'node:fs';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { dirname, join, normalize, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT ?? 8787);
const USER = process.env.STAFF_USER ?? '';
const HASH = process.env.STAFF_PASSWORD_HASH ?? '';
const USERS_FILE = process.env.STAFF_USERS ?? join(here, 'data', 'users.json');
const ACCESS_LOG = process.env.ACCESS_LOG ?? join(here, 'data', 'access.log');
const DATA = process.env.STAFF_DATA ?? join(here, 'data', 'cards.json');
const STATIC = process.env.STATIC_DIR ?? join(here, '..', 'dist');
const SECURE = process.env.COOKIE_SECURE === '1';
const SESSION_MS = 30 * 60 * 1000;

const sessions = new Map(); // token -> expires
const failures = new Map(); // ip -> { n, until }

/** 名單：每次登入時重新讀取，新增或移除人員不必重啟伺服器 */
function loadUsers() {
  const list = [];
  if (existsSync(USERS_FILE)) {
    try { for (const u of JSON.parse(readFileSync(USERS_FILE, 'utf8'))) if (u.username && u.hash && u.active !== false) list.push(u); } catch { /* 名單格式錯誤時視為空 */ }
  }
  if (USER && HASH) list.push({ username: USER, hash: HASH, name: USER });
  return list;
}
function logAccess(user, ok, ip) {
  try { appendFileSync(ACCESS_LOG, `${new Date().toISOString()}\t${ok ? '登入成功' : '登入失敗'}\t${String(user).slice(0, 40)}\t${ip}\n`); } catch { /* 無法寫紀錄時不影響服務 */ }
}
function verifyPassword(pw, hash) {
  // 格式：scrypt$<salt hex>$<hash hex>
  const [alg, salt, hex] = String(hash).split('$');
  if (alg !== 'scrypt' || !salt || !hex) return false;
  const want = Buffer.from(hex, 'hex');
  const got = scryptSync(String(pw), Buffer.from(salt, 'hex'), want.length);
  return timingSafeEqual(want, got);
}
function safeEq(a, b) {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
}
function cookieToken(req) {
  const m = /(?:^|;\s*)staff_session=([a-f0-9]{64})/.exec(req.headers.cookie ?? '');
  if (!m) return null;
  const exp = sessions.get(m[1]);
  if (!exp || exp < Date.now()) { sessions.delete(m[1]); return null; }
  sessions.set(m[1], Date.now() + SESSION_MS);
  return m[1];
}
const SEC_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'X-Frame-Options': 'DENY',
};
function send(res, code, body, type = 'text/html; charset=utf-8', extra = {}) {
  res.writeHead(code, { 'Content-Type': type, 'Cache-Control': 'no-store', ...SEC_HEADERS, ...extra });
  res.end(body);
}
function readBody(req) {
  return new Promise((resolve, reject) => {
    let s = '';
    req.on('data', (c) => { s += c; if (s.length > 4096) { reject(new Error('too large')); req.destroy(); } });
    req.on('end', () => resolve(s));
  });
}
function loadData() {
  if (!existsSync(DATA)) return { notebookUrl: null, stations: {} };
  return JSON.parse(readFileSync(DATA, 'utf8'));
}
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const loginPage = (msg = '') => `<!doctype html><html lang="zh-Hant-TW"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>醫療人員登入｜心衰照護島</title><style>body{font-family:system-ui,sans-serif;max-width:420px;margin:40px auto;padding:0 16px}label{display:block;margin:12px 0 4px}input,button{font-size:1rem;min-height:44px;width:100%;box-sizing:border-box}button{margin-top:16px}</style>
<h1>醫療人員登入</h1><p>院內工作卡僅限醫療團隊。</p>${msg ? `<p role="alert">${esc(msg)}</p>` : ''}
<form method="post" action="/staff/login"><label for="u">帳號</label><input id="u" name="u" autocomplete="username" required>
<label for="p">密碼</label><input id="p" name="p" type="password" autocomplete="current-password" required><button>登入</button></form></html>`;

function staffPage(data) {
  const rows = Object.entries(data.stations ?? {}).map(([id, f]) =>
    `<h2>${esc(id)}</h2><dl>${Object.entries(f).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v || '待確認')}</dd>`).join('')}</dl>`).join('');
  const link = typeof data.notebookUrl === 'string' && data.notebookUrl.startsWith('https://')
    ? `<p><a href="${esc(data.notebookUrl)}" target="_blank" rel="noopener noreferrer">開啟疾病認證筆記本</a></p>` : '<p>尚未設定筆記本連結。</p>';
  return `<!doctype html><html lang="zh-Hant-TW"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>醫療人員工作頁</title><body style="font-family:system-ui,sans-serif;max-width:760px;margin:24px auto;padding:0 16px">
<h1>醫療人員工作頁</h1>${link}<p>正式認證內容以院內核定文件為準。</p>${rows}
<form method="post" action="/staff/logout"><button>登出</button></form><p><a href="/">回到心衰照護島</a></p></body></html>`;
}

const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.json': 'application/json', '.png': 'image/png' };

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const path = url.pathname;
  const ip = req.socket.remoteAddress ?? '';

  if (path === '/staff/login' && req.method === 'GET') return send(res, 200, loginPage());
  if (path === '/staff/login' && req.method === 'POST') {
    const f = failures.get(ip);
    if (f && f.until > Date.now()) return send(res, 429, loginPage('嘗試次數過多，請稍後再試。'));
    let form;
    try { form = new URLSearchParams(await readBody(req)); } catch { return send(res, 413, 'too large', 'text/plain'); }
    const name = form.get('u') ?? '';
    const user = loadUsers().find((u) => safeEq(name, u.username));
    const ok = !!user && verifyPassword(form.get('p') ?? '', user.hash);
    logAccess(name, ok, ip);
    if (!ok) {
      const n = (f?.n ?? 0) + 1;
      failures.set(ip, { n, until: n >= 5 ? Date.now() + 5 * 60 * 1000 : 0 });
      return send(res, 401, loginPage('帳號或密碼不正確。'));
    }
    failures.delete(ip);
    const token = randomBytes(32).toString('hex');
    sessions.set(token, Date.now() + SESSION_MS);
    return send(res, 303, '', 'text/plain', {
      Location: '/staff',
      'Set-Cookie': `staff_session=${token}; HttpOnly; SameSite=Strict; Path=/staff${SECURE ? '; Secure' : ''}; Max-Age=${SESSION_MS / 1000}`,
    });
  }
  if (path === '/staff/logout' && req.method === 'POST') {
    const t = cookieToken(req);
    if (t) sessions.delete(t);
    return send(res, 303, '', 'text/plain', { Location: '/staff/login', 'Set-Cookie': 'staff_session=; Path=/staff; Max-Age=0' });
  }
  if (path.startsWith('/staff')) {
    // 以下全部需要登入；未登入一律不回傳任何連結或內部資料
    if (!cookieToken(req)) {
      if (path.startsWith('/staff/api/')) return send(res, 401, JSON.stringify({ error: 'unauthorized' }), 'application/json');
      return send(res, 303, '', 'text/plain', { Location: '/staff/login' });
    }
    if (path === '/staff/api/cards' && req.method === 'GET') return send(res, 200, JSON.stringify(loadData()), 'application/json');
    if (path === '/staff' || path === '/staff/') return send(res, 200, staffPage(loadData()));
    return send(res, 404, 'not found', 'text/plain');
  }

  // 病友端靜態檔（公開，不含任何院內連結）
  if (req.method !== 'GET' && req.method !== 'HEAD') return send(res, 405, 'method not allowed', 'text/plain');
  let file = normalize(join(STATIC, decodeURIComponent(path)));
  if (!file.startsWith(normalize(STATIC))) return send(res, 403, 'forbidden', 'text/plain');
  if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
  if (!existsSync(file)) return send(res, 404, 'not found', 'text/plain');
  res.writeHead(200, { 'Content-Type': MIME[extname(file)] ?? 'application/octet-stream', ...SEC_HEADERS });
  createReadStream(file).pipe(res);
});

server.listen(PORT, () => {
  console.log(`醫療人員工作頁參考伺服器：http://localhost:${PORT}/staff/login`);
  if (!loadUsers().length) console.warn('醫護人員名單是空的：所有登入都會被拒絕。請用 node staff-server/users.mjs add 新增人員。');
});
