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
  // 開場鏡頭（入口 → 全景）結束後再開始操作
  await page.waitForFunction(() => window.__hfIsland.cameraSettled, null, { timeout: 30000 });
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
    check('4c 重置後回到初始狀態', after === 15 && stored === null && introShown, `未探索站數=${after}`);
    await ctx.close();
  }

  // ───── 9. 返家照護站：走到站點 → 自動打開衛教卡 → 情境練習 → 答錯重試 → 答對完成 → 地圖顯示「已完成」 ─────
  {
    const { ctx, page } = await newPage();
    await startAs(page, 'patient');
    await page.locator('.map-label[data-station=home-care]').evaluate((el) => el.click());
    await page.waitForTimeout(250);
    const walking = await page.evaluate(() => window.__hfIsland.moving);
    await dialog(page).waitFor({ timeout: 60000 });
    const which = await dialog(page).getAttribute('data-station');
    const cardText = await dialog(page).innerText();
    check('9a 點返家照護站，角色走過去並自動打開衛教卡', walking && which === 'home-care' && cardText.includes('回家第一週：每天量體重'), `行走中=${walking}`);
    check('9b 衛教卡與題目標示「待照護團隊審閱」', cardText.includes('待照護團隊審閱'));
    await clickBtn(page, '開始情境練習');
    const quizText = await dialog(page).innerText();
    await page.getByRole('button', { name: /自己多吃一顆利尿劑/ }).click();
    const wrongHead = await dialog(page).locator('.step-heading').innerText();
    const reason = await dialog(page).locator('.feedback').innerText();
    check('9c 答錯顯示回饋與原因，可再試一次', quizText.includes('阿明伯') && quizText.includes('待照護團隊審閱') && wrongHead.includes('再想想') && reason.includes('原因'), reason.slice(0, 30));
    await clickBtn(page, '再試一次');
    const tried = await page.locator('.choice.tried').count();
    await page.getByRole('button', { name: /打電話給個案管理師/ }).click();
    const okText = await dialog(page).innerText();
    check('9d 重試答對後顯示本站已完成', tried === 1 && okText.includes('答對了') && okText.includes('本站已完成'));
    await clickBtn(page, '返回地圖');
    await page.waitForTimeout(300);
    const label = page.locator('.map-label[data-station=home-care]');
    const st = await label.getAttribute('data-state');
    const lt = await label.innerText();
    const focused = await page.evaluate(() => document.activeElement?.getAttribute('data-station'));
    check('9e 返回地圖後站點顯示「已完成」，焦點回到站點', st === 'practiced' && lt.includes('已完成') && focused === 'home-care', `${st} ${lt.replace(/\s+/g, ' ')}`);
    await page.locator('.map-label[data-station=home-care]').evaluate((el) => el.click());
    await dialog(page).waitFor({ timeout: 15000 });
    check('9f 再次點選可複習（直接開啟衛教卡）', (await dialog(page).innerText()).includes('本站已完成，可以再練習一次'));
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
    check(`5d [${width}px] 清單列出 15 站並直接開啟任務`, rows === 15 && (await dialog(page).getAttribute('data-station')) === 'weight');
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
    // 早晨／白天／夜晚與旋轉視角
    await page.click('#tod-btn');
    const tod1 = await page.evaluate(() => document.body.dataset.tod);
    await page.click('#tod-btn');
    const tod2 = await page.evaluate(() => document.body.dataset.tod);
    await page.click('#tod-btn');
    check('8h 時段可切換：夜晚 → 早晨 → 白天', tod1 === 'night' && tod2 === 'morning' && (await page.evaluate(() => document.body.dataset.tod)) === 'day', `${tod1} → ${tod2}`);
    await page.click('#rotate-right');
    await page.waitForFunction(() => window.__hfIsland.angle === 45, null, { timeout: 15000 }).catch(() => {});
    const ang = await page.evaluate(() => window.__hfIsland.angle);
    await page.click('#rotate-left');
    await page.waitForFunction(() => window.__hfIsland.angle === 0, null, { timeout: 15000 }).catch(() => {});
    check('8i 視角可左右旋轉', ang === 45 && (await page.evaluate(() => window.__hfIsland.angle)) === 0, `角度 ${ang}`);
    const roleImg = await page.evaluate(() => getComputedStyle(document.body).getPropertyValue('--x') === '' && document.body.dataset.role);
    check('8f 角色已切換為醫護人員', roleImg === 'staff');
    await ctx.close();
  }

  // ───── 10. 溫馨小島：進島引導、貓狗、海浪與海洋生物、減少動態效果、桌機版返家照護站流程 ─────
  for (const [w, hgt] of [[390, 844], [1280, 800]]) {
    const { ctx, page } = await newPage({ viewport: { width: w, height: hgt }, hasTouch: w < 500 });
    // 在頁面內每 50 毫秒記錄最大縮放，避免測試機忙碌時錯過開場的拉近畫面
    await page.evaluate(() => { window.__maxZoom = 0; setInterval(() => { window.__maxZoom = Math.max(window.__maxZoom, window.__hfIsland.zoom ?? 0); }, 50); });
    await page.click('#start-btn');
    await page.locator('.role-card[data-role=caregiver]').click();
    await page.waitForSelector('#intro[hidden]', { state: 'attached' });
    await page.waitForFunction(() => window.__hfIsland.cameraSettled, null, { timeout: 30000 });
    const zStart = await page.evaluate(() => window.__maxZoom);
    const zEnd = await page.evaluate(() => window.__hfIsland.zoom);
    check(`10z [${w}px] 進島開場：鏡頭先拉近入口，再拉遠到全景`, zStart > zEnd * 2, `縮放 ${zStart.toFixed(2)} → ${zEnd.toFixed(2)}`);
    await page.waitForTimeout(800);
    const wel = page.locator('#welcome');
    const welText = await wel.innerText();
    const overlap = await page.evaluate(() => {
      const r = document.getElementById('welcome').getBoundingClientRect();
      const hit = (b) => r.left < b.right && r.right > b.left && r.top < b.bottom && r.bottom > b.top;
      const labels = [...document.querySelectorAll('.map-label:not(.offscreen)')].filter((el) => el.offsetParent).map((el) => el.getBoundingClientRect());
      const buttons = [...document.querySelectorAll('.zoom .icon-btn, .toolbar .tool, .topbar button')].map((el) => el.getBoundingClientRect());
      const map = document.getElementById('map').getBoundingClientRect();
      return { labels: labels.filter(hit).length, buttons: buttons.filter(hit).length, inside: r.left >= map.left && r.right <= map.right && r.top >= map.top && r.bottom <= map.bottom };
    });
    check(`10a [${w}px] 第一次進島顯示引導，不遮住站點標籤與按鈕`, (await wel.isVisible()) && welText.includes('歡迎來到心衰照護島，點一個站點，開始你的照護旅程。') && overlap.labels === 0 && overlap.buttons === 0 && overlap.inside, JSON.stringify(overlap));
    const wl0 = await page.evaluate(() => window.__hfIsland.wildlife);
    check(`10b [${w}px] 入口的貓：玩家在旁邊時抬頭看；小狗在返家照護站外趴著休息`, wl0.catLooking === true && wl0.dogStanding === false, JSON.stringify(wl0));
    await page.waitForTimeout(2500);
    const wl1 = await page.evaluate(() => window.__hfIsland.wildlife);
    check(`10c [${w}px] 近岸浪花與魚群持續動畫（${wl0.coastEdges} 段海岸線、${wl0.fish} 條魚）`, wl1.time > wl0.time && wl0.coastEdges >= 20 && wl0.fish === 8, `${wl0.time} → ${wl1.time}`);
    if (w > 500) {
      await page.waitForFunction(() => window.__hfIsland.wildlife.turtleUp > 0.9, null, { timeout: 90000 }).then(() => check('10d 海龜會浮出水面', true), () => check('10d 海龜會浮出水面', false, '90 秒內沒有浮出'));
    }
    await page.click('#welcome-close');
    check(`10e [${w}px] 引導可以關閉，焦點回到 01 站`, !(await wel.isVisible()) && (await page.evaluate(() => document.activeElement?.getAttribute('data-station'))) === 'admission');
    await page.reload();
    await page.waitForSelector('body[data-ready=true]');
    await page.click('#start-btn');
    await page.waitForTimeout(500);
    check(`10f [${w}px] 關閉後重新整理不再出現`, !(await wel.isVisible()));
    // 走到返家照護站：小狗站起來；完成衛教卡 → 作答回饋 → 返回地圖
    await page.locator('.map-label[data-station=home-care]').evaluate((el) => el.click());
    await dialog(page).waitFor({ timeout: 90000 });
    const dogUp = await page.evaluate(() => window.__hfIsland.wildlife.dogStanding);
    const catAway = await page.evaluate(() => window.__hfIsland.wildlife.catLooking);
    check(`10g [${w}px] 玩家走到返家照護站時小狗站起來，貓恢復待機`, dogUp === true && catAway === false);
    if (w > 500) {
      const cardText = await dialog(page).innerText();
      await clickBtn(page, '開始情境練習');
      await page.getByRole('button', { name: /先不管，明天再量/ }).click();
      const wrong = await dialog(page).locator('.feedback').innerText();
      await clickBtn(page, '再試一次');
      await page.getByRole('button', { name: /打電話給個案管理師/ }).click();
      const okText = await dialog(page).innerText();
      await clickBtn(page, '返回地圖');
      await page.waitForTimeout(300);
      const closed = (await dialog(page).count()) === 0;
      const st = await page.locator('.map-label[data-station=home-care]').getAttribute('data-state');
      check('10h [1280px] 桌機：返家照護站 → 衛教卡 → 作答回饋（答錯有原因、答對完成）→ 返回地圖', cardText.includes('回家第一週') && wrong.includes('原因') && okText.includes('本站已完成') && closed && st === 'practiced');
      // 動物不擋站點點擊：點小狗所在位置，會開啟牠腳下的返家照護站
      for (let i = 0; i < 3; i++) await page.click('#zoom-in');
      await page.waitForTimeout(3000);
      const dp = await page.evaluate(() => window.__hfIsland.wildlifePoint('dog'));
      await page.mouse.click(dp.x, dp.y);
      await dialog(page).waitFor({ timeout: 30000 }).catch(() => {});
      check('10i 點到小狗的位置仍會開啟返家照護站（動物不擋點擊）', (await dialog(page).getAttribute('data-station').catch(() => null)) === 'home-care');
    }
    await ctx.close();
  }
  {
    // 減少動態效果：環境動畫停止，動物直接切換姿勢，站點仍可用鍵盤完成
    const { ctx, page } = await newPage({ reducedMotion: 'reduce', viewport: { width: 1024, height: 768 }, hasTouch: false });
    await startAs(page, 'patient');
    const a = await page.evaluate(() => window.__hfIsland.wildlife);
    await page.waitForTimeout(2500);
    const b = await page.evaluate(() => window.__hfIsland.wildlife);
    check('10j 減少動態效果：浪花、魚群、海龜停止', a.time === b.time, `${a.time} → ${b.time}`);
    await page.locator('.map-label[data-station=home-care]').focus();
    await page.keyboard.press('Enter');
    await dialog(page).waitFor({ timeout: 15000 });
    const dog = await page.evaluate(() => window.__hfIsland.wildlife.dogStanding);
    check('10k 減少動態效果：直接抵達返家照護站，小狗直接站起來，站點正常開啟', dog === true && (await dialog(page).getAttribute('data-station')) === 'home-care');
    await ctx.close();
  }

  // ───── 13. 05 出院碼頭：先選語言看照護影片，再繼續回覆示教 ─────
  for (const [w, hgt, touch] of [[390, 844, true], [1280, 800, false]]) {
    const VIDEOS = [
      ['中文', 'zh', 'https://youtu.be/CVxv18oN3IE', 'CVxv18oN3IE'],
      ['한국어', 'ko', 'https://youtu.be/-uMzUK6rr74', '-uMzUK6rr74'],
      ['Tiếng Việt', 'vi', 'https://youtu.be/egGDlRvgJEQ', 'egGDlRvgJEQ'],
      ['English', 'en', 'https://youtu.be/-LxkYPScxt0', '-LxkYPScxt0'],
      ['Bahasa Indonesia', 'id', 'https://youtu.be/vILaVEThvz0', 'vILaVEThvz0'],
    ];
    const ctx = await browser.newContext({ viewport: { width: w, height: hgt }, deviceScaleFactor: 2, hasTouch: touch });
    // 測試環境不連外：攔截 YouTube，播放器與新分頁都回傳替身頁，只驗證網址與流程
    const stub = (t) => (route) => route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: `<!doctype html><title>${t}</title><p>${t}</p>` });
    // 播放器替身：收到 listening 後，照 YouTube enablejsapi 的格式回報 onReady 或 onError；同時記錄送出的 Referer
    let playerError = 0;
    const embedReqs = [];
    const playerStub = async (route) => {
      const hd = await route.request().allHeaders();
      embedReqs.push({ url: route.request().url(), referer: hd.referer ?? '' });
      const code = playerError;
      await route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: `<!doctype html><title>YouTube 播放器（測試替身）</title><p>播放器替身</p><script>addEventListener('message',function(e){try{var d=JSON.parse(e.data);if(d.event==='listening')parent.postMessage(JSON.stringify(${code} ? {event:'onError',info:${code}} : {event:'onReady'}),'*');}catch(x){}});</script>` });
    };
    await ctx.route('https://www.youtube.com/embed/**', playerStub);
    await ctx.route('https://youtu.be/**', stub('YouTube（測試替身）'));
    const page = await ctx.newPage();
    page.on('pageerror', (e) => check('沒有頁面錯誤', false, e.message));
    await page.goto(BASE);
    await page.waitForSelector('body[data-ready=true]');
    await startAs(page, 'patient');
    const tap = (loc) => (touch ? loc.tap() : loc.click());
    await page.locator('.map-label[data-station=discharge]').evaluate((el) => el.click());
    await dialog(page).waitFor({ timeout: 90000 });
    const title = await dialog(page).locator('.step-heading').first().innerText();
    const labels = await dialog(page).locator('.lang-btn').allInnerTexts();
    const autoplayFree = (await dialog(page).locator('iframe').count()) === 0;
    check(`13a [${w}px] 進站第一個畫面：「出院前，請選擇您想觀看的影片語言」與五個語言按鈕（尚未載入影片）`, title === '出院前，請選擇您想觀看的影片語言' && JSON.stringify(labels) === JSON.stringify(VIDEOS.map((v) => v[0])) && autoplayFree, labels.join('／'));
    let allOk = true;
    let detail = '';
    for (const [label, id, url, vid] of VIDEOS) {
      await tap(dialog(page).locator(`.lang-btn[data-lang="${id}"]`));
      const frame = dialog(page).locator('iframe[data-video=player]');
      await frame.waitFor();
      const src = await frame.getAttribute('src');
      const yt = dialog(page).locator('a[data-video=youtube]');
      const href = await yt.getAttribute('href'), target = await yt.getAttribute('target'), rel = await yt.getAttribute('rel');
      const [pop] = await Promise.all([ctx.waitForEvent('page', { timeout: 20000 }), tap(yt)]);
      await pop.waitForLoadState('domcontentloaded').catch(() => {});
      const popUrl = pop.url();
      await pop.close();
      await page.bringToFront();
      const current = await dialog(page).locator('.video-current').innerText();
      await page.waitForFunction(() => document.querySelector('iframe[data-video=player]')?.dataset.state === 'ready', null, { timeout: 15000 }).catch(() => {});
      const pstate = await frame.getAttribute('data-state');
      const req = embedReqs.filter((r) => r.url.includes(`/embed/${vid}`)).pop();
      const origin = new URL(BASE).origin;
      const ok = src.startsWith(`https://www.youtube.com/embed/${vid}?`) && !/autoplay=1/.test(src) && new URL(src).searchParams.get('enablejsapi') === '1' && new URL(src).searchParams.get('origin') === origin
        && pstate === 'ready' && (req?.referer ?? '').startsWith(origin) && (await frame.getAttribute('referrerpolicy')) === 'strict-origin-when-cross-origin' && href === url && target === '_blank' && /noopener/.test(rel) && /noreferrer/.test(rel) && popUrl === url && current.includes(label);
      if (!ok) { allOk = false; detail += `${label}: ${src} state=${pstate} referer=${req?.referer} ${href} ${popUrl}；`; }
      await tap(dialog(page).locator('[data-video=switch]'));
      await dialog(page).locator('.lang-btn').first().waitFor();
      const back = (await dialog(page).locator('iframe').count()) === 0 && (await page.evaluate((x) => document.activeElement?.getAttribute('data-lang') === x, id));
      if (!back) { allOk = false; detail += `${label}: 切換語言失敗；`; }
    }
    check(`13b [${w}px] 五種語言：iframe 用 www.youtube.com/embed/影片ID、送出 Referer、播放器回報就緒、不自動播放；「在 YouTube 開啟」新分頁網址正確；「切換語言」回到語言選擇`, allOk, detail);
    const before = await page.evaluate(() => JSON.parse(localStorage.getItem('hf-care-island:v1') ?? '{}').stations?.discharge ?? null);
    check(`13c [${w}px] 選擇語言只切換影片，不寫入進度`, (before?.practiced ?? []).length === 0, JSON.stringify(before));
    // 播放器回報錯誤碼時，站內顯示原因，按鈕仍可用
    let errOk = true, errDetail = '';
    for (const [code, want] of [[150, '擁有者不允許'], [101, '擁有者不允許'], [153, '網站來源資訊']]) {
      playerError = code;
      await tap(dialog(page).locator('.lang-btn[data-lang="zh"]'));
      const st = dialog(page).locator('[data-video=status]');
      await st.waitFor({ state: 'visible', timeout: 15000 }).catch(() => {});
      const txt = (await st.isVisible()) ? await st.innerText() : '';
      if (!(txt.includes(want) && txt.includes(String(code)) && txt.includes('在 YouTube 開啟') && (await dialog(page).locator('a[data-video=youtube]').isVisible()))) { errOk = false; errDetail += `${code}: ${txt}；`; }
      await tap(dialog(page).locator('[data-video=switch]'));
    }
    playerError = 0;
    check(`13g [${w}px] 播放器回報錯誤 150／101／153 時，站內說明原因並保留「在 YouTube 開啟」`, errOk, errDetail);
    // 選韓文後繼續回覆示教 → 原本出院碼頭的任務流程
    await tap(dialog(page).locator('.lang-btn[data-lang="ko"]'));
    await tap(dialog(page).locator('[data-video=continue]'));
    const introText = await dialog(page).innerText();
    check(`13d [${w}px] 「繼續回覆示教」接回原本的出院碼頭任務`, introText.includes('本站照護重點') && introText.includes('找出回診日期') && (await dialog(page).locator('iframe').count()) === 0);
    await clickBtn(page, '開始任務');
    await clickBtn(page, '下一步：做選擇');
    await page.getByRole('button', { name: '回診安排', exact: true }).click();
    const fb = await dialog(page).locator('.step-heading').innerText();
    await clickBtn(page, '下一步：說一次或做一次');
    const teach = await dialog(page).locator('.teach').innerText();
    await clickBtn(page, '已練習');
    const after = await page.evaluate(() => JSON.parse(localStorage.getItem('hf-care-island:v1') ?? '{}').stations?.discharge ?? null);
    const state = await page.locator('.map-label[data-station=discharge]').getAttribute('data-state');
    check(`13e [${w}px] 回覆示教流程照原本規則：完成 1 題記為已練習 1／3，站點尚未完成`, fb.includes('答對了') && teach.includes('回診') && after?.practiced?.length === 1 && state === 'explored', `${JSON.stringify(after)} ${state}`);
    await page.keyboard.press('Escape');
    // 再次進站仍先顯示影片，並可從任務頁回看影片
    await page.locator('.map-label[data-station=discharge]').evaluate((el) => el.click());
    await dialog(page).waitFor({ timeout: 30000 });
    const again = await dialog(page).locator('.step-heading').first().innerText();
    await tap(dialog(page).locator('[data-video=continue]'));
    await tap(dialog(page).locator('[data-video=again]'));
    const again2 = await dialog(page).locator('.step-heading').first().innerText();
    check(`13f [${w}px] 再次進站先顯示影片；任務頁可「再看一次照護影片」`, again === '出院前，請選擇您想觀看的影片語言' && again2 === '出院前，請選擇您想觀看的影片語言');
    // 停在播放器畫面時關閉，再從地圖進站：回到語言選擇，不保留上次的播放器
    await tap(dialog(page).locator('.lang-btn[data-lang="vi"]'));
    await dialog(page).locator('iframe[data-video=player]').waitFor();
    const playerHead = await dialog(page).locator('.step-heading').first().innerText();
    await page.keyboard.press('Escape');
    await dialog(page).waitFor({ state: 'detached', timeout: 10000 }).catch(() => {});
    await page.locator('.map-label[data-station=discharge]').evaluate((el) => el.click());
    await dialog(page).waitFor({ timeout: 30000 });
    const reHead = await dialog(page).locator('.step-heading').first().innerText();
    const reFrames = await dialog(page).locator('iframe').count();
    const reLangs = await dialog(page).locator('.lang-btn').count();
    check(`13h [${w}px] 在播放器畫面關閉後重進：先回到語言選擇（五個按鈕、沒有播放器）`, playerHead === '出院照護影片' && reHead === '出院前，請選擇您想觀看的影片語言' && reFrames === 0 && reLangs === 5, `${playerHead} → ${reHead} frames=${reFrames} langs=${reLangs}`);
    await page.keyboard.press('Escape');
    await dialog(page).waitFor({ state: 'detached', timeout: 10000 }).catch(() => {});
    // 從清單搜尋直接開啟 05 的照護重點：也先選語言，「繼續回覆示教」再接回那個重點
    await page.click('#station-list-open');
    await page.fill('#search-input', '個管師');
    await page.locator('.search-results .station-row[data-station=discharge]').first().click();
    await dialog(page).waitFor({ timeout: 30000 });
    const sHead = await dialog(page).locator('.step-heading').first().innerText();
    await tap(dialog(page).locator('[data-video=continue]'));
    const sText = await dialog(page).innerText();
    check(`13i [${w}px] 從搜尋開啟 05 的照護重點也先選語言，繼續後接回「聯絡方式」`, sHead === '出院前，請選擇您想觀看的影片語言' && sText.includes('聯絡方式') && sText.includes('練習這一題'), sHead);
    await ctx.close();
  }

  // ───── 14. 03 跨團隊照護站：和照護團隊一起想辦法（說清楚 → 團隊分工 → 用自己的話說一次） ─────
  for (const [w, hgt, touch, roleName] of [[390, 844, true, 'patient'], [1280, 800, false, 'caregiver']]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: hgt }, deviceScaleFactor: 2, hasTouch: touch });
    const page = await ctx.newPage();
    page.on('pageerror', (e) => check('沒有頁面錯誤', false, e.message));
    await page.goto(BASE);
    await page.waitForSelector('body[data-ready=true]');
    await startAs(page, roleName);
    const tap = (loc) => (touch ? loc.tap() : loc.click());
    const d = dialog(page);
    const primaries = async () => d.locator('.mission-view .btn-primary:visible').count();
    // 從地圖點 03（點地標，角色走過去後開站）
    await page.locator('.map-label[data-station=team]').evaluate((el) => el.click());
    await d.waitFor({ timeout: 90000 });
    const intro = await d.innerText();
    const missions = await d.locator('.mission-pick-title').allInnerTexts();
    check(`14a [${w}px] 從地圖進入 03：保留原有四個團隊窗口與「這件事要問誰」，下方新增「和照護團隊一起想辦法」`,
      ['藥師窗口', '營養師窗口', '復健窗口', '社工窗口'].every((t) => intro.includes(t)) && JSON.stringify(missions) === JSON.stringify(['1. 這件事要問誰', '2. 和照護團隊一起想辦法']), missions.join('／'));
    // 第一步：把問題說清楚
    await tap(d.locator('.mission-pick').nth(1));
    await d.locator('[data-choice=vague]').waitFor();
    const s1 = await d.innerText();
    const s1ok = s1.includes('情境｜回家後，我怕把藥吃錯') && s1.includes('我白天一個人在家，藥袋又很多') && s1.includes('我下班後可以幫忙確認') && s1.includes('你會怎麼向照護團隊開口？')
      && (await d.locator('.steps li[aria-current=step]').innerText()) === '把問題說清楚' && (await primaries()) === 0;
    check(`14b [${w}px] 第一步：虛構情境、病人與家屬的話、三個說法（只有選項一個主要動作）`, s1ok);
    // 選「我有點擔心」→ 提示 → 重新選擇；再選「等回家遇到問題再說」→ 提示 → 重新選擇
    let retryOk = true, detail = '';
    for (const id of ['vague', 'later']) {
      await tap(d.locator(`[data-choice=${id}]`));
      const fb = await d.innerText();
      const n = await primaries();
      const parts = await d.locator('.explain-parts').count();
      if (!(fb.includes('再想想怎麼說') && fb.includes('提示：') && fb.includes('交代遇到什麼困難、什麼時候會發生、希望得到什麼協助') && parts === 0 && n === 1)) { retryOk = false; detail += `${id}: primaries=${n} parts=${parts}；`; }
      await tap(d.locator('[data-action=reselect]'));
      await d.locator(`[data-choice=${id}]`).waitFor();
      if (!(await d.locator(`[data-choice=${id}].tried`).count())) { retryOk = false; detail += `${id} 沒有標示已試過；`; }
    }
    check(`14c [${w}px] 選「我有點擔心」「等回家再說」：看到提示與說清楚的方法（不先揭露答案），可以重新選擇`, retryOk, detail);
    await tap(d.locator('[data-choice=clear]'));
    const okText = await d.innerText();
    const okPrim = await primaries();
    // 答對後也可以重新選擇
    await tap(d.locator('[data-action=reselect]'));
    const backToChoices = await d.locator('[data-choice=clear]').count();
    await tap(d.locator('[data-choice=clear]'));
    check(`14d [${w}px] 選清楚的說法：拆解困難、時間與希望的協助；可再重新選擇`, okText.includes('說得很清楚') && okText.includes('團隊就比較容易一起想辦法') && okText.includes('白天一個人在家的時候') && okText.includes('請團隊陪我一起確認') && okPrim === 1 && backToChoices === 1);
    // 第二步：看團隊怎麼一起幫忙
    await tap(d.locator('[data-action=team-next]'));
    await d.locator('.team-cards').waitFor();
    const cards = await d.locator('.team-cards h4').allInnerTexts();
    const helpText = await d.locator('.team-cards').innerText();
    check(`14e [${w}px] 第二步：藥師、個管師、家屬三張卡片（一個主要按鈕）`, JSON.stringify(cards) === JSON.stringify(['藥師', '個管師', '家屬']) && helpText.includes('核對藥袋') && helpText.includes('做得到的安排') && helpText.includes('能幫忙的時間') && (await primaries()) === 1, cards.join('／'));
    // 第三步：用自己的話說一次
    await tap(d.locator('[data-action=team-next]'));
    await d.locator('.next-step-card').waitFor();
    const t3 = await d.innerText();
    const inputs = await d.locator('input, textarea, select').count();
    check(`14f [${w}px] 第三步：兩個口頭問題、句型、「我的下一步」小卡，不需輸入任何資料`,
      t3.includes('回家後，你會怎麼確認要吃哪包藥？') && t3.includes('如果還是不確定，你會怎麼求助？') && t3.includes('我會先＿＿＿。如果還是不確定，我會找＿＿＿幫忙。')
      && t3.includes('我的下一步') && t3.includes('我會做什麼') && t3.includes('誰能協助') && t3.includes('何時再確認') && inputs === 0 && (await primaries()) === 1);
    const beforeP = await page.evaluate(() => JSON.parse(localStorage.getItem('hf-care-island:v1') ?? '{}').stations?.team?.practiced ?? []);
    await tap(d.getByRole('button', { name: '我練習好了', exact: true }));
    await d.locator('[data-action=back-to-station]').waitFor();
    const afterP = await page.evaluate(() => JSON.parse(localStorage.getItem('hf-care-island:v1') ?? '{}').stations?.team?.practiced ?? []);
    const doneText = await d.innerText();
    const state = await page.locator('.map-label[data-station=team]').getAttribute('data-state');
    check(`14g [${w}px] 按「我練習好了」：記為已練習 1／2，站點進度照原規則（另一題未練習，所以尚未完成）`,
      beforeP.length === 0 && JSON.stringify(afterP) === '["team-together"]' && doneText.includes('已練習 1／2') && state === 'explored', `${JSON.stringify(afterP)} ${state}`);
    // 返回站點
    await tap(d.locator('[data-action=back-to-station]'));
    const metas = await d.locator('.mission-pick-meta').allInnerTexts();
    check(`14h [${w}px] 返回站點：第二個任務顯示「已練習」，第一個任務維持原樣`, metas[1]?.includes('已練習') && !metas[0]?.includes('已練習'), metas.join('／'));
    // 原有任務 1 做完後接著進入新任務的第一步；兩題都練習後站點完成
    await tap(d.locator('.mission-pick').nth(0));
    await clickBtn(page, '下一步：做選擇');
    await page.getByRole('button', { name: '營養師', exact: true }).click();
    await clickBtn(page, '下一步：說一次或做一次');
    await clickBtn(page, '已練習');
    await d.locator('[data-choice=clear]').waitFor({ timeout: 10000 });
    const chain = (await d.locator('.steps li[aria-current=step]').innerText()) === '把問題說清楚';
    await page.keyboard.press('Escape');
    await d.waitFor({ state: 'detached', timeout: 10000 }).catch(() => {});
    const state2 = await page.locator('.map-label[data-station=team]').getAttribute('data-state');
    check(`14i [${w}px] 原有「這件事要問誰」流程不變，做完接到新任務；兩題都練習後 03 完成`, chain && state2 === 'practiced', `${chain} ${state2}`);
    // 05 出院碼頭仍先顯示影片語言選擇
    await page.locator('.map-label[data-station=discharge]').evaluate((el) => el.click());
    await d.waitFor({ timeout: 90000 });
    check(`14j [${w}px] 05 出院碼頭不受影響：仍先顯示影片語言選擇`, (await d.locator('.step-heading').first().innerText()) === '出院前，請選擇您想觀看的影片語言');
    await ctx.close();
  }

  // ───── 11. 醫護人員專區｜院內帳號登入（入口設在 01 入院評估花園；病友家屬免登入） ─────
  {
    // 11-1 預設建置：沒有設定入口網址
    const { ctx, page } = await newPage({ viewport: { width: 390, height: 844 } });
    await startAs(page, 'patient');
    check('11a 病友不需登入即可進島遊玩', await page.locator('.map-label[data-station=admission]').isVisible());
    await page.click('#station-list-open');
    await page.locator('.station-row[data-station=admission]').click();
    await dialog(page).waitFor();
    const btn = dialog(page).locator('[data-portal]');
    const label = (await btn.innerText()).replace(/\s+/g, '');
    const kind = await btn.getAttribute('data-portal');
    await btn.click();
    await page.waitForTimeout(300);
    const msg = await dialog(page).locator('.portal-msg').innerText();
    check('11b 01 站有「醫護人員專區｜院內帳號登入」；未設定入口時顯示「尚未開放」', label.includes('醫護人員專區｜院內帳號登入') && kind === 'not-open' && msg === '院內規範入口尚未開放，請洽心衰照護團隊', msg);
    const bodyLinks = await page.evaluate(() => [...document.querySelectorAll('a[href^="http"]')].map((a) => new URL(a.href).hostname));
    check('11c 公開網頁沒有任何院內或外部文件連結', bodyLinks.every((h) => h === 'localhost'), bodyLinks.join(','));
    await page.keyboard.press('Escape');
    await ctx.close();
  }
  {
    // 11-2 醫護人員角色：住院區規範卡也有同一個入口，不再出現公開的筆記本按鈕
    const { ctx, page } = await newPage({ viewport: { width: 1280, height: 800 }, hasTouch: false });
    await startAs(page, 'staff');
    await page.click('#station-list-open');
    await page.locator('.station-row[data-station=ward]').click();
    await dialog(page).waitFor();
    const staffTab = await page.locator('#tab-staff').getAttribute('aria-selected');
    const portal = await dialog(page).locator('[data-portal]').count();
    const nb = await dialog(page).getByText('開啟疾病認證筆記本').count();
    check('11d 醫護角色：住院區規範卡顯示院內入口，沒有公開的筆記本按鈕', staffTab === 'true' && portal === 1 && nb === 0);
    await ctx.close();
  }
  {
    // 11-3 設定入口網址後的建置（範例網域，不是真實院內網址）
    const PORTAL = 'https://intranet.example.org/hf/guidelines';
    execSync('npx vite build --outDir dist-portal-test --emptyOutDir', { env: { ...process.env, VITE_STAFF_PORTAL_URL: PORTAL }, stdio: 'ignore' });
    const okCheck = (() => { try { execSync('node scripts/check-bundle.mjs dist-portal-test', { env: { ...process.env, VITE_STAFF_PORTAL_URL: PORTAL }, stdio: 'ignore' }); return true; } catch { return false; } })();
    let blocked = false;
    try { execSync('npx vite build --outDir dist-bad-test --emptyOutDir', { env: { ...process.env, VITE_STAFF_PORTAL_URL: 'https://notebooklm.google.com/notebook/test' }, stdio: 'ignore' }); } catch { blocked = true; }
    check('11e 入口網址可設定；NotebookLM 等不安全網址在建置時就被擋下', okCheck && blocked && !existsSync('dist-bad-test/index.html'));
    const s3 = await startServer(8792, 'dist-portal-test');
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await page.goto('http://localhost:8792');
    await page.waitForSelector('body[data-ready=true]');
    await startAs(page, 'caregiver');
    await page.click('#station-list-open');
    await page.locator('.station-row[data-station=admission]').click();
    await dialog(page).waitFor();
    const a = dialog(page).locator('a[data-portal=open]');
    const href = await a.getAttribute('href'), target = await a.getAttribute('target'), rel = await a.getAttribute('rel');
    const notOpen = await dialog(page).getByText('院內規範入口尚未開放').count();
    check('11f 已設定入口：點擊另開視窗前往院內入口（由院內平台驗證帳號），不顯示「尚未開放」', href === PORTAL && target === '_blank' && /noopener/.test(rel) && /noreferrer/.test(rel) && notOpen === 0, `${href} ${target} ${rel}`);
    await ctx.close();
    s3.kill();
    execSync('rm -rf dist-portal-test dist-bad-test');
  }

  // ───── 12. 14 進階心衰醫療港：醫病共享決策（SDM）引導卡 ─────
  for (const [w, hgt, touch] of [[390, 844, true], [1280, 800, false]]) {
    const SDM = 'https://apps.chimei.org.tw/sdm/survey_doit.aspx?X=c6zuS';
    const ctx = await browser.newContext({ viewport: { width: w, height: hgt }, deviceScaleFactor: 2, hasTouch: touch });
    // 測試環境不連外：攔截奇美頁面，回傳一頁替代內容，只驗證「有在新分頁開啟正確網址」
    await ctx.route('https://apps.chimei.org.tw/**', (route) => route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: '<!doctype html><title>SDM（測試替身）</title><h1>奇美醫院 SDM（測試替身）</h1>' }));
    const page = await ctx.newPage();
    page.on('pageerror', (e) => check('沒有頁面錯誤', false, e.message));
    await page.goto(BASE);
    await page.waitForSelector('body[data-ready=true]');
    await startAs(page, 'caregiver');
    await page.click('#station-list-open');
    await page.locator('.station-row[data-station=advanced-hf]').click();
    await dialog(page).waitFor();
    const card = dialog(page).locator('[data-sdm=card]');
    const cardText = (await card.innerText()).replace(/\s+/g, '');
    const firstEl = await dialog(page).locator('.tabpanel > *').first().getAttribute('data-sdm');
    check(`12a [${w}px] 第 14 站最上方顯示 SDM 引導卡與指定文字`, firstEl === 'card' && cardText.includes('先和醫療團隊談談你的照護選擇') && cardText.includes('面對下一步的照護，你最在意什麼？可以和家人一起使用這個工具，把想問的問題記下來，下次與醫療團隊討論。') && cardText.includes('開始醫病共享決策（SDM）') && cardText.includes('先了解照護選項'));
    const before = await page.evaluate(() => JSON.parse(localStorage.getItem('hf-care-island:v1') ?? '{}').stations?.['advanced-hf'] ?? null);
    const link = dialog(page).locator('a[data-sdm=open]');
    const attrs = { href: await link.getAttribute('href'), target: await link.getAttribute('target'), rel: await link.getAttribute('rel') };
    const [popup] = await Promise.all([ctx.waitForEvent('page', { timeout: 20000 }), touch ? link.tap() : link.click()]);
    await popup.waitForLoadState('domcontentloaded').catch(() => {});
    const popupUrl = popup.url();
    const popupTitle = await popup.title().catch(() => '');
    check(`12b [${w}px] 「開始醫病共享決策（SDM）」在新分頁開啟奇美 SDM 頁面`, attrs.href === SDM && attrs.target === '_blank' && /noopener/.test(attrs.rel) && /noreferrer/.test(attrs.rel) && popupUrl === SDM && popupTitle.includes('SDM'), popupUrl);
    await popup.close();
    await page.bringToFront();
    const stillOpen = (await dialog(page).getAttribute('data-station')) === 'advanced-hf' && (await card.isVisible());
    const after = await page.evaluate(() => JSON.parse(localStorage.getItem('hf-care-island:v1') ?? '{}').stations?.['advanced-hf'] ?? null);
    const labelState = await page.locator('.map-label[data-station=advanced-hf]').getAttribute('data-state');
    check(`12c [${w}px] 返回後第 14 站仍開著；點開問卷不會記為已完成`, stillOpen && JSON.stringify(before) === JSON.stringify(after) && (after?.practiced ?? []).length === 0 && labelState !== 'practiced', `${JSON.stringify(after)} ${labelState}`);
    await (touch ? dialog(page).locator('[data-sdm=learn]').tap() : dialog(page).locator('[data-sdm=learn]').click());
    await page.waitForTimeout(800);
    const focused = await page.evaluate(() => document.activeElement?.id);
    const inView = await page.evaluate(() => { const el = document.getElementById('learn-advanced-hf'); const r = el.getBoundingClientRect(); const box = el.closest('.modal-body').getBoundingClientRect(); return r.top >= box.top - 2 && r.top < box.bottom; });
    check(`12d [${w}px] 「先了解照護選項」帶到本港原有的衛教內容`, focused === 'learn-advanced-hf' && inView, `焦點=${focused}`);
    await dialog(page).getByRole('button', { name: /進入：左心室輔助器/ }).click();
    const readOn = await dialog(page).locator('.step-heading').first().innerText();
    check(`12e [${w}px] 返回後可以繼續閱讀第 14 站（進入展館）`, (await dialog(page).innerText()).includes('左心室輔助器') && readOn.length > 0);
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
    await dialog(page).locator('[data-video=continue]').click(); // 出院碼頭先顯示照護影片
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
