// 產生 STAFF_PASSWORD_HASH：node staff-server/hash-password.mjs '你的密碼'
import { randomBytes, scryptSync } from 'node:crypto';
const pw = process.argv[2];
if (!pw) { console.error('用法：node staff-server/hash-password.mjs <密碼>'); process.exit(1); }
const salt = randomBytes(16);
console.log(`scrypt$${salt.toString('hex')}$${scryptSync(pw, salt, 32).toString('hex')}`);
