// 醫護人員名單管理（決定誰登入後可以看到規範卡與筆記本連結）
//   新增：node staff-server/users.mjs add <帳號> <姓名或職稱>   → 印出一次性初始密碼，請私下交給本人
//   停用：node staff-server/users.mjs disable <帳號>
//   啟用：node staff-server/users.mjs enable <帳號>
//   重設密碼：node staff-server/users.mjs reset <帳號>
//   刪除：node staff-server/users.mjs remove <帳號>
//   列出：node staff-server/users.mjs list
// 名單存在 staff-server/data/users.json（只存密碼雜湊，不存明碼）。勿提交版本庫。
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { randomBytes, scryptSync } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const FILE = process.env.STAFF_USERS ?? join(dirname(fileURLToPath(import.meta.url)), 'data', 'users.json');
const load = () => (existsSync(FILE) ? JSON.parse(readFileSync(FILE, 'utf8')) : []);
const save = (list) => { mkdirSync(dirname(FILE), { recursive: true }); writeFileSync(FILE, JSON.stringify(list, null, 2) + '\n'); };
const hash = (pw) => { const salt = randomBytes(16); return `scrypt$${salt.toString('hex')}$${scryptSync(pw, salt, 32).toString('hex')}`; };
const newPw = () => randomBytes(9).toString('base64url');

const [cmd, username, ...rest] = process.argv.slice(2);
const list = load();
const find = () => list.find((u) => u.username === username);
const need = () => { if (!username) { console.error('請提供帳號'); process.exit(1); } };

switch (cmd) {
  case 'add': {
    need();
    if (find()) { console.error(`帳號 ${username} 已存在`); process.exit(1); }
    const pw = newPw();
    list.push({ username, name: rest.join(' ') || username, hash: hash(pw), active: true, added: new Date().toISOString().slice(0, 10) });
    save(list);
    console.log(`已新增 ${username}。初始密碼：${pw}\n請私下交給本人，不要寄到群組。`);
    break;
  }
  case 'reset': {
    need(); const u = find(); if (!u) { console.error('找不到帳號'); process.exit(1); }
    const pw = newPw(); u.hash = hash(pw); save(list);
    console.log(`已重設 ${username}。新密碼：${pw}`);
    break;
  }
  case 'disable': case 'enable': {
    need(); const u = find(); if (!u) { console.error('找不到帳號'); process.exit(1); }
    u.active = cmd === 'enable'; save(list);
    console.log(`${username} 已${cmd === 'enable' ? '啟用' : '停用'}`);
    break;
  }
  case 'remove': {
    need(); const n = list.length; const kept = list.filter((u) => u.username !== username);
    save(kept); console.log(n === kept.length ? '找不到帳號' : `已刪除 ${username}`);
    break;
  }
  case 'list':
    if (!list.length) console.log('（名單是空的）');
    for (const u of list) console.log(`${u.active === false ? '停用' : '啟用'}\t${u.username}\t${u.name}\t新增於 ${u.added ?? '-'}`);
    break;
  default:
    console.log('用法：add <帳號> <姓名> | reset <帳號> | disable <帳號> | enable <帳號> | remove <帳號> | list');
}
