// 瀏覽器端到端驗證（驗收第 3 點的七項流程）。
// 需要先 npm run build。預設使用系統的 Chrome（可用 CHROME_PATH 指定）。
// 執行：npm run test:e2e
import { spawn, execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright-core';

const CHROME = process.env.CHROME_PATH ?? ['/usr/bin/google-chrome', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].find(existsSync);
if (!CHROME) { console.error('找不到 Chrome，請設定 CHROME_PATH'); process.exit(1); }

const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok, detail }); console.log(`${ok ? '✓' : '✗'} ${name}${detail ? `：${detail}` : ''}`); };

function startServer(port, staticDir, extraEnv = {}) {
  const p = spawn(process.execPath, ['staff-server/server.mjs'], { env: { ...process.env, PORT: String(port), STATIC_DIR: staticDir, ...extraEnv }, stdio: 'pipe' });
  return new Promise((res) => { p.stdout.on('data', () => res(p)); setTimeout(() => res(p), 1500); });
}

const browser = await chromium.launch({ executablePath: CHROME, args: ['--no-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader'] });
const BASE = 'http://localhost:8790';
const server = await startServer(8790, 'dist');

async function newPage(opts = {}) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, hasTouch: true, ...opts });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => check('沒有頁面錯誤', false, e.message));
  await page.goto(BASE);
  await page.waitForSelector('body[data-ready=true]', { timeout: 20000 });
  return { ctx, page };
}
const dialog = (page) => page.locator('.mission-modal');
const clickBtn = (page, name) => page.getByRole('button', { name, exact: true }).click();

async function startAs(page, roleName) {
  await page.click('#start-btn');
  await page.locator(`.role-card[data-role=${roleName}]`).click();
  await page.waitForSelector('#intro[hidden]', { state: 'attached' });
}

try {
  // ───── 1. 點入院評估亭，角色走到門口，接著完成任務 ─────
  {
    const { ctx, page } = await newPage();
    await startAs(page, 'patient');
    const before = await page.evaluate(() => window.__hfIsland.avatarPoint());
    const pt = await page.evaluate(() => window.__hfIsland.buildingPoint('admission'));
    await page.mouse.click(pt.x, pt.y); // 點建築本體（畫布）
    await page.waitForTimeout(250);
    const walking = await page.evaluate(() => window.__hfIsland.moving);
    await dialog(page).waitFor({ timeout: 15000 });
    const station = await dialog(page).getAttribute('data-station');
    check('1a 點入院評估亭後角色沿步道走過去', walking, `行走中=${walking}`);
    check('1b 抵達後開啟入院評估亭任務', station === 'admission');
    await clickBtn(page, '開始任務');
    await clickBtn(page, '下一步：做選擇');
    await page.getByRole('button', { name: '喘得很厲害。' }).click();
    const wrong = await dialog(page).locator('.step-heading').innerText();
    const hint = await dialog(page).locator('.feedback').innerText();
    check('3a 知識題答錯以文字顯示並給具體提示', wrong.includes('再想想') && hint.includes('提示'), wrong);
    await clickBtn(page, '再試一次');
    await page.getByRole('button', { name: /這兩個禮拜開始/ }).click();
    check('3b 重試後答對', (await dialog(page).locator('.step-heading').innerText()).includes('答對了'));
    await clickBtn(page, '下一步：說一次或做一次');
    check('1c 示教步驟依角色顯示', (await dialog(page).locator('.teach').innerText()).includes('用自己的話說一次'));
    await clickBtn(page, '已練習');
    await clickBtn(page, '下一步：做選擇');
    await page.getByRole('button', { name: '晚上睡覺的情況' }).click();
    const reflHeading = await dialog(page).locator('.step-heading').innerText();
    const reflText = await dialog(page).innerText();
    check('3c 照護偏好題不顯示對錯', !/答對|再想想|✓|✗/.test(reflText) && reflHeading.includes('謝謝'), reflHeading);
    await clickBtn(page, '下一步：說一次或做一次');
    await clickBtn(page, '已練習');
    check('1d 完成整站任務', (await dialog(page).innerText()).includes('已練習 2／2'));
    await clickBtn(page, '回到島圖');
    const focused = await page.evaluate(() => document.activeElement?.getAttribute('data-station'));
    check('5a 關閉後焦點回到原本的地標', focused === 'admission', `焦點=${focused}`);
    const leaked = await page.evaluate(() => localStorage.getItem('hf-care-island:v1'));
    check('4a 儲存內容不含照護偏好選項', !leaked.includes('sleep') && !leaked.includes('晚上'), leaked);

    // ───── 2. 走路途中連續點兩個不同站，只開最後選擇的站 ─────
    // 用按鈕的 click()（等同點擊或螢幕閱讀器啟動），避免畫面外標籤被隱藏時點到底下的島
    const tap = (id) => page.locator(`.map-label[data-station=${id}]`).evaluate((el) => el.click());
    await tap('discharge');
    await page.waitForTimeout(400);
    await tap('warning');
    await page.waitForTimeout(150);
    await tap('palliative');
    await dialog(page).waitFor({ timeout: 60000 });
    await page.waitForTimeout(1500);
    const count = await dialog(page).count();
    const which = await dialog(page).getAttribute('data-station');
    check('2 走路途中連點兩站，只開最後選擇的站', count === 1 && which === 'palliative', `開啟=${which}，視窗數=${count}`);
    await page.keyboard.press('Escape');

    // ───── 4. 重新整理後仍有探索狀態，重置後回到初始 ─────
    await page.reload();
    await page.waitForSelector('body[data-ready=true]');
    const st = await page.locator('.map-label[data-station=admission]').getAttribute('data-state');
    const st2 = await page.locator('.map-label[data-station=palliative]').getAttribute('data-state');
    check('4b 重新整理後仍看得到探索狀態', st === 'practiced' && st2 === 'explored', `入院=${st}，安心=${st2}`);
    await page.click('#start-btn');
    await page.click('#more-open');
    await page.click('#reset-open');
    await page.click('#reset-confirm');
    const after = await page.locator('.map-label[data-state=new]').count();
    const stored = await page.evaluate(() => localStorage.getItem('hf-care-island:v1'));
    const introShown = await page.locator('#intro').isVisible();
    check('4c 重置後回到初始狀態', after === 14 && stored === null && introShown, `未探索站數=${after}`);
    await ctx.close();
  }

  // ───── 5. 手機窄螢幕：拖圖、回全景、開清單、完成任務、無橫向捲動 ─────
  for (const width of [390, 320]) {
    const { ctx, page } = await newPage({ viewport: { width, height: 700 } });
    await startAs(page, 'caregiver');
    const z0 = await page.evaluate(() => window.__hfIsland.zoom);
    const a0 = await page.evaluate(() => window.__hfIsland.avatarPoint());
    const pt = await page.evaluate(() => window.__hfIsland.buildingPoint('discharge'));
    // 從建築上開始拖曳：不應開啟關卡
    await page.mouse.move(pt.x, pt.y);
    await page.mouse.down();
    for (let i = 1; i <= 8; i++) await page.mouse.move(pt.x + i * 15, pt.y + i * 8);
    await page.mouse.up();
    await page.waitForTimeout(400);
    const a1 = await page.evaluate(() => window.__hfIsland.avatarPoint());
    const moved = Math.hypot(a1.x - a0.x, a1.y - a0.y) > 50;
    const opened = await dialog(page).count();
    const dest = await page.evaluate(() => window.__hfIsland.destination);
    check(`5b [${width}px] 拖曳地圖會移動畫面，不會誤開關卡`, moved && opened === 0 && dest === null, `畫面位移=${moved}`);
    await page.click('#zoom-in');
    await page.waitForTimeout(400);
    await page.click('#panorama-btn');
    // 無頭瀏覽器以軟體繪圖，動畫較慢：等縮放動畫結束
    await page.waitForFunction((z) => Math.abs(window.__hfIsland.zoom - z) < 0.002, z0, { timeout: 8000 }).catch(() => {});
    const z1 = await page.evaluate(() => window.__hfIsland.zoom);
    check(`5c [${width}px] 一鍵回全景`, Math.abs(z1 - z0) < 0.002, `zoom ${z0.toFixed(3)} → ${z1.toFixed(3)}`);
    await page.click('#station-list-open');
    const rows = await page.locator('.station-row').count();
    await page.locator('.station-row[data-station=weight]').click();
    await dialog(page).waitFor();
    check(`5d [${width}px] 清單列出 14 站並直接開啟任務`, rows === 14 && (await dialog(page).getAttribute('data-station')) === 'weight');
    await clickBtn(page, '開始任務');
    await clickBtn(page, '下一步：做選擇');
    for (const label of ['寫下紀錄', '站上體重計量測', '查看數字']) await page.getByRole('button', { name: label, exact: true }).click();
    await clickBtn(page, '確認順序');
    const seqWrong = (await dialog(page).locator('.step-heading').innerText()).includes('再想想');
    await clickBtn(page, '再試一次');
    for (const label of ['站上體重計量測', '查看數字', '寫下紀錄']) await page.getByRole('button', { name: label, exact: true }).click();
    await clickBtn(page, '確認順序');
    const seqOk = (await dialog(page).locator('.step-heading').innerText()).includes('答對了');
    check(`5e [${width}px] 排序題答錯可重試、答對過關`, seqWrong && seqOk);
    const caregiverText = await (async () => { await clickBtn(page, '下一步：說一次或做一次'); return dialog(page).locator('.teach').innerText(); })();
    check(`5f [${width}px] 家屬角色顯示陪同版示教`, caregiverText.includes('陪病友'));
    const sw = await page.evaluate(() => ({ s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth, m: document.querySelector('.modal-body').scrollWidth, mc: document.querySelector('.modal-body').clientWidth }));
    check(`5g [${width}px] 不需橫向捲動`, sw.s <= sw.c && sw.m <= sw.mc, JSON.stringify(sw));
    const small = await page.evaluate(() => [...document.querySelectorAll('button:not([disabled]), a.btn')].filter((b) => b.offsetParent && !b.closest('[inert]')).map((b) => { const r = b.getBoundingClientRect(); return { t: b.textContent.trim().slice(0, 12), w: r.width, h: r.height }; }).filter((r) => r.w < 44 || r.h < 44));
    check(`5h [${width}px] 按鈕點擊區至少 44×44`, small.length === 0, JSON.stringify(small));
    await ctx.close();
  }

  // ───── 6. 鍵盤操作＋減少動態效果模式走完任務 ─────
  {
    const { ctx, page } = await newPage({ reducedMotion: 'reduce', hasTouch: false, viewport: { width: 1024, height: 768 } });
    await page.locator('#start-btn').focus();
    await page.keyboard.press('Enter');
    await page.locator('.role-card[data-role=patient]').focus();
    await page.keyboard.press('Enter');
    await page.locator('.map-label[data-station=warning]').focus();
    await page.keyboard.press('Enter');
    // 無頭瀏覽器用軟體繪圖較慢，等待時間放寬；判斷依據是「沒有走路過程」
    const opened = await dialog(page).waitFor({ timeout: 15000 }).then(() => true, () => false);
    const statusText = await page.locator('#status').innerText();
    check('6a 減少動態效果：直接抵達地標並開啟任務（沒有走路過程）', opened && !statusText.includes('正在前往'), statusText);
    const boatStill = await page.evaluate(() => document.documentElement.classList.contains('reduce-motion'));
    check('6b 減少動態效果：已套用（停用裝飾動畫）', boatStill);
    // 只用鍵盤：Tab 到按鈕再按 Enter
    const press = async (name) => {
      for (let i = 0; i < 30; i++) {
        await page.keyboard.press('Tab');
        const t = await page.evaluate(() => document.activeElement?.textContent?.trim());
        if (t === name || (name instanceof RegExp && name.test(t))) { await page.keyboard.press('Enter'); return true; }
      }
      throw new Error(`鍵盤找不到按鈕：${name}`);
    };
    await press('開始任務');
    await press('下一步：做選擇');
    await press(/^從前天開始/);
    await press('下一步：說一次或做一次');
    await press('已練習');
    await press('下一步：做選擇');
    await press('我的個別出院計畫和照護聯絡卡上寫的方式');
    await press('下一步：說一次或做一次');
    await press('稍後再練');
    await press('下一步：做選擇');
    await press('腳踝、小腿腫不腫');
    await press('下一步：說一次或做一次');
    await press('已練習');
    const doneText = await dialog(page).innerText();
    check('6c 只用鍵盤走完警訊燈塔三個任務', doneText.includes('本站完成') && doneText.includes('已練習 2／3'));
    await page.keyboard.press('Escape');
    const f = await page.evaluate(() => document.activeElement?.getAttribute('data-station'));
    check('6d Esc 關閉後焦點回到觸發的地標', f === 'warning', `焦點=${f}`);
    // 鍵盤可切換到醫護規範分頁（住院區）
    await page.locator('.map-label[data-station=admission]').focus();
    await page.keyboard.press('Enter');
    await dialog(page).waitFor();
    await page.locator('#tab-practice').focus();
    await page.keyboard.press('ArrowLeft');
    const staffText = await dialog(page).innerText();
    check('6e 住院區有醫護規範卡（鍵盤可切換）', staffText.includes('醫護規範卡') && staffText.includes('待確認') && staffText.includes('只展示版型'));
    const linkCount = await dialog(page).locator('a[href*="notebooklm"]').count();
    check('7a 原型（未接驗證）不顯示筆記本連結', linkCount === 0);
    await ctx.close();
  }

  // ───── 8. 新功能：醫護角色、搜尋、時間軸、串聯線 ─────
  {
    const { ctx, page } = await newPage({ viewport: { width: 390, height: 844 } });
    await startAs(page, 'staff');
    await page.click('#station-list-open');
    await page.locator('.station-row[data-station=ward]').click();
    await dialog(page).waitFor();
    const sel = await page.locator('#tab-staff').getAttribute('aria-selected');
    check('8a 醫護人員進入住院區預設打開規範卡', sel === 'true');
    await page.locator('#tab-practice').click();
    await page.getByRole('button', { name: '開始任務' }).click();
    await clickBtn(page, '下一步：做選擇');
    await page.getByRole('button', { name: /了解身體水分的變化/ }).click();
    await clickBtn(page, '下一步：說一次或做一次');
    const t = await dialog(page).innerText();
    check('8b 醫護角色同時看到病友版與家屬版示教', t.includes('病友版') && t.includes('家屬版'));
    await page.keyboard.press('Escape');
    await page.click('#station-list-open');
    await page.fill('#search-input', '腳腫');
    const hits = await page.locator('.search-results .station-row').count();
    await page.locator('.search-results .station-row[data-station=warning]').first().click();
    await dialog(page).waitFor();
    const itemText = await dialog(page).innerText();
    check('8c 搜尋「腳腫」找到警訊燈塔的照護重點並直接開啟', hits >= 1 && itemText.includes('家屬觀察分工'));
    await clickBtn(page, '看本站全部重點');
    const linkBtns = await dialog(page).locator('.care-links .link-btn').count();
    await page.keyboard.press('Escape');
    await page.click('#links-btn');
    const pressed = await page.locator('#links-btn').getAttribute('aria-pressed');
    check('8d 串聯線可開關，站內列出串聯照護', pressed === 'true' && linkBtns >= 1, `本站串聯 ${linkBtns} 條`);
    await page.click('#timeline-btn');
    const phases = await page.locator('.phase').count();
    await page.locator('.phase[data-phase=first-week] button', { hasText: '在地圖標示' }).click();
    const chip = await page.locator('#phase-chip').innerText();
    check('8e 時間軸 6 個階段，可在地圖標示', phases === 6 && chip.includes('返家第一週'), chip);
    // 點 3D 地圖上的小屋：放大後點「警訊燈塔」第 2 間小屋，應直接開啟該照護重點
    await page.click('#phase-chip .icon-btn');
    await page.click('#station-list-open');
    await page.locator('.station-row[data-station=warning]').click();
    await dialog(page).waitFor();
    await page.keyboard.press('Escape');
    for (let i = 0; i < 4; i++) await page.click('#zoom-in');
    await page.waitForTimeout(5000);
    const hp = await page.evaluate(() => window.__hfIsland.itemPoint('warning', 1));
    await page.mouse.click(hp.x, hp.y);
    await dialog(page).waitFor({ timeout: 30000 });
    const hutText = await dialog(page).innerText();
    check('8g 點 3D 地圖上的小屋，直接開啟該照護重點', hutText.includes('找到求助方式'), hutText.slice(0, 40));
    await page.keyboard.press('Escape');
    const roleImg = await page.evaluate(() => getComputedStyle(document.body).getPropertyValue('--x') === '' && document.body.dataset.role);
    check('8f 角色已切換為醫護人員', roleImg === 'staff');
    await ctx.close();
  }

  // ───── 7. 未登入者無法取得院內工作卡連結或內部資料 ─────
  {
    execSync('npx vite build --outDir dist-staff-test --emptyOutDir', { env: { ...process.env, VITE_STAFF_API_BASE: '/staff/api' }, stdio: 'ignore' });
    const hash = execSync('node staff-server/hash-password.mjs test-only-pw').toString().trim();
    const s2 = await startServer(8791, 'dist-staff-test', {
      STAFF_USER: 'nurse', STAFF_PASSWORD_HASH: hash, STAFF_DATA: 'staff-server/data/cards.example.json',
    });
    const B2 = 'http://localhost:8791';
    const r1 = await fetch(`${B2}/staff/api/cards`);
    const body1 = await r1.text();
    check('7b 未登入呼叫 /staff/api/cards 回傳 401 且無連結', r1.status === 401 && !body1.includes('notebooklm'), `${r1.status} ${body1}`);
    const r2 = await fetch(`${B2}/staff`, { redirect: 'manual' });
    check('7c 未登入開 /staff 被導向登入頁', r2.status === 303 && r2.headers.get('location') === '/staff/login');
    const r3 = await fetch(`${B2}/staff/login`, { method: 'POST', body: 'u=nurse&p=wrong', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, redirect: 'manual' });
    check('7d 密碼錯誤無法登入', r3.status === 401 && !r3.headers.get('set-cookie'));
    const dist = execSync('grep -rl notebooklm dist-staff-test || true').toString().trim();
    check('7e 部署產物不含 NotebookLM 連結', dist === '', dist);

    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.goto(B2);
    await page.waitForSelector('body[data-ready=true]');
    await startAs(page, 'patient');
    await page.locator('.map-label[data-station=admission]').click();
    await dialog(page).waitFor({ timeout: 15000 });
    await page.locator('#tab-staff').click();
    await page.waitForFunction(() => !document.querySelector('.staff-status')?.textContent.includes('讀取中'));
    const t1 = await dialog(page).innerText();
    const l1 = await dialog(page).locator('a[href*="notebooklm"]').count();
    check('7f 病友端未登入：工作卡提示登入、不顯示連結', t1.includes('請先登入') && l1 === 0);
    // 醫療人員登入後才看得到
    await page.goto(`${B2}/staff/login`);
    await page.fill('#u', 'nurse');
    await page.fill('#p', 'test-only-pw');
    await page.click('button');
    await page.waitForURL(`${B2}/staff`);
    const staffLink = await page.locator('a[href*="notebooklm"]').count();
    await page.goto(B2);
    await page.waitForSelector('body[data-ready=true]');
    await page.click('#start-btn');
    await page.locator('.map-label[data-station=discharge]').click();
    await dialog(page).waitFor({ timeout: 15000 });
    await page.locator('#tab-staff').click();
    await page.waitForFunction(() => !document.querySelector('.staff-status')?.textContent.includes('讀取中'));
    const l2 = await dialog(page).locator('a[href*="notebooklm"]').count();
    check('7g 登入後才在工作卡顯示筆記本連結', staffLink === 1 && l2 === 1);
    await ctx.close();
    s2.kill();
    execSync('rm -rf dist-staff-test');
  }
} catch (e) {
  check('執行中斷', false, e.message);
} finally {
  await browser.close();
  server.kill();
}

const failed = results.filter((r) => !r.ok);
console.log(`\n共 ${results.length} 項，通過 ${results.length - failed.length} 項，失敗 ${failed.length} 項。`);
process.exit(failed.length ? 1 : 0);
