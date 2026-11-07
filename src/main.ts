// 啟動遊戲、掛載介面。
import './styles.css';
import { CARE_LINKS, PHASES } from './content/links';
import { STATIONS } from './content/stations';
import type { PhaseId, Role, StationId } from './content/types';
import { STATION_IDS, validateLinks, validateStations } from './content/validate';
import { IslandScene, type TimeOfDay } from './game/IslandScene';
import { ITEM_SLOTS, NODES, TILES, ZONE_SIGNS, tileHeight, tileOf } from './game/mapData';
import type { NavEvent } from './game/navigation';
import { ProgressStore } from './state/progress';
import { ROLE_TEXT, openMissionDialog } from './ui/missionDialog';
import { announce, h, isModalOpen, onModalChange, openModal } from './ui/modal';
import { openStationList, statusOf } from './ui/stationList';
import { openTimeline } from './ui/timeline';

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const byId = new Map(STATIONS.map((s) => [s.id, s]));

// ───────── 內容驗證 ─────────
const errors = [...validateStations(STATIONS, new Set(Object.keys(NODES))), ...validateLinks(CARE_LINKS, PHASES, STATIONS)];
for (const s of STATIONS) if (!TILES.some((t) => t.id === s.id)) errors.push(`站點 ${s.id} 在 mapData.ts 沒有對應的島`);
if (errors.length) {
  const banner = $('error-banner');
  banner.hidden = false;
  banner.textContent = `衛教內容格式有誤，請修正 src/content/：${errors.join('；')}`;
  console.error(errors);
  throw new Error('content validation failed');
}

const progress = new ProgressStore(STATION_IDS);
const status = $('status');
let role: Role = progress.role ?? 'patient';

// ───────── 減少動態效果 ─────────
const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
let reducedOverride: boolean | null = null; // 只在本次開啟有效，不寫入儲存
const reducedMotion = () => reducedOverride ?? mq.matches;
const applyReduced = () => {
  document.documentElement.classList.toggle('reduce-motion', reducedMotion());
  scene?.setReducedMotion(reducedMotion());
};
mq.addEventListener?.('change', applyReduced);

// ───────── 地標標籤（HTML 按鈕，可用鍵盤與螢幕閱讀器操作） ─────────
const labelsEl = $('labels');
const labelBtns = new Map<StationId, HTMLButtonElement>();
for (const s of STATIONS) {
  const btn = h('button', { type: 'button', class: `map-label ${s.zone}`, 'data-station': s.id },
    h('span', { class: 'map-label-no', 'aria-hidden': 'true' }, s.no),
    h('span', { class: 'map-label-name full' }, s.title),
    h('span', { class: 'map-label-name short', 'aria-hidden': 'true' }, s.shortName),
    s.staff ? h('span', { class: 'map-label-staff', 'aria-hidden': 'true', title: '含醫護規範' }, '規') : '',
    h('span', { class: 'map-label-state', 'aria-hidden': 'true' })) as HTMLButtonElement;
  btn.addEventListener('click', (e) => {
    if (suppressClick) { e.preventDefault(); return; }
    walkTo(s.id);
  });
  btn.addEventListener('focus', () => { if (btn.classList.contains('offscreen')) scene?.focusStation(s.id); });
  labelBtns.set(s.id, btn);
  labelsEl.append(btn);
}
const zoneSigns = ZONE_SIGNS.map((z) => {
  const el = h('div', { class: `zone-sign ${z.zone}` }, h('strong', {}, z.title), h('span', {}, z.sub));
  $('zone-signs').append(el);
  return { el, z };
});

function refreshLabels() {
  for (const s of STATIONS) {
    const btn = labelBtns.get(s.id)!;
    const st = statusOf(s, progress);
    btn.dataset.state = st.st;
    btn.querySelector('.map-label-state')!.textContent = st.st === 'practiced' ? (s.card ? '✓ 已完成' : '✓') : st.st === 'explored' ? '•' : '';
    btn.setAttribute('aria-label', `${s.no} ${s.title}（${s.zone === 'hospital' ? '住院區' : '居家區'}・${s.subtitle}），${st.text}${s.staff ? '，含醫護規範' : ''}。走過去並開啟`);
  }
  const chip = $('role-chip');
  chip.hidden = !progress.role;
  chip.textContent = `角色：${ROLE_TEXT[role]}`;
  document.body.dataset.role = role;
}
progress.onChange(refreshLabels);

function layoutLabels() {
  if (!scene) return;
  const placed: DOMRect[] = [];
  const W = labelsEl.clientWidth, H = labelsEl.clientHeight;
  // 地圖工具按鈕的區域（相對於地圖），標籤不要被它蓋住
  const mapBox = labelsEl.getBoundingClientRect();
  const zb = document.querySelector('.zoom')!.getBoundingClientRect();
  const tools = new DOMRect(zb.left - mapBox.left - 4, zb.top - mapBox.top - 4, zb.width + 8, zb.height + 8);
  const zoom = scene.zoom;
  labelsEl.classList.toggle('compact', zoom < 0.8);
  labelsEl.classList.toggle('tiny', zoom < 0.42);
  const rows = STATIONS.map((s) => ({ s, p: scene!.labelScreen(s.id) })).sort((a, b) => a.p.y - b.p.y);
  for (const { s, p } of rows) {
    const btn = labelBtns.get(s.id)!;
    // 島在畫面外時隱藏標籤（鍵盤聚焦時會把鏡頭移過去，見下方 focus 事件）
    const off = p.x < -20 || p.x > W + 20 || p.y < -10 || p.y > H + 30;
    btn.classList.toggle('offscreen', off && document.activeElement !== btn);
    if (off && document.activeElement !== btn) continue;
    const w = btn.offsetWidth, hgt = btn.offsetHeight;
    let x = Math.min(Math.max(p.x - w / 2, 2), W - w - 2);
    let y = Math.min(Math.max(p.y - hgt / 2, 2), H - hgt - 2);
    for (let guard = 0; guard < 6; guard++) {
      const hit = placed.find((r) => x < r.right + 2 && x + w > r.left - 2 && y < r.bottom + 2 && y + hgt > r.top - 2);
      if (!hit) break;
      y = hit.bottom + 4;
    }
    if (x + w > tools.left && y < tools.bottom && y + hgt > tools.top) x = Math.max(2, tools.left - w);
    placed.push(new DOMRect(x, y, w, hgt));
    btn.style.transform = `translate(${Math.round(x)}px, ${Math.round(y)}px)`;
  }
  for (const { el, z } of zoneSigns) {
    const p = scene.toScreen(z.x, z.y, z.h);
    el.style.transform = `translate(${Math.round(p.x - el.offsetWidth / 2)}px, ${Math.round(p.y - el.offsetHeight / 2)}px)`;
  }
}

// ───────── 遊戲場景 ─────────
let scene: IslandScene | null = null;
let lastOpener: HTMLElement | null = null;
let pendingItem: { station: StationId; item: string } | null = null;

function onNavEvent(e: NavEvent) {
  const name = (id: string) => byId.get(id as StationId)?.title ?? id;
  if (e.type === 'depart') announce(status, `角色正在前往「${name(e.stationId)}」…`);
  if (e.type === 'retarget') announce(status, `已取消前往「${name(e.from)}」，改為前往「${name(e.to)}」。`);
  if (e.type === 'arrive') {
    const id = e.stationId as StationId;
    if (isModalOpen()) { announce(status, `已抵達「${name(id)}」。點地標即可開啟。`); return; }
    announce(status, `已抵達「${name(id)}」，開啟本站。`);
    const item = pendingItem?.station === id ? pendingItem.item : undefined;
    pendingItem = null;
    openStation(id, labelBtns.get(id)!, item);
  }
}

const sceneObj = new IslandScene($('game'), {
  role,
  reducedMotion: reducedMotion(),
  stationItems: Object.fromEntries(STATIONS.map((s) => [s.id, s.items])),
  hooks: {
    onNavEvent,
    onReady: () => {
      scene = sceneObj;
      applyReduced();
      refreshLabels();
      document.body.dataset.ready = 'true';
    },
    onError: (e) => {
      const banner = $('error-banner');
      banner.hidden = false;
      banner.textContent = `地圖載入失敗：${e.message}。仍可使用「清單」開啟所有站點。`;
      document.body.dataset.ready = 'true';
    },
    onCameraChange: layoutLabels,
  },
});

// ───────── 動作 ─────────
function walkTo(id: StationId, itemId?: string) {
  if (!scene || isModalOpen()) return;
  const s = byId.get(id)!;
  lastOpener = labelBtns.get(id)!;
  pendingItem = itemId ? { station: id, item: itemId } : null;
  scene.goToStation(id, s.entryNodeId);
}

function openStation(id: StationId, opener: HTMLElement, itemId?: string) {
  const s = byId.get(id)!;
  lastOpener = opener;
  if (linksOn) scene?.setLinks(CARE_LINKS, id);
  openMissionDialog({
    station: s,
    stations: STATIONS,
    role,
    progress,
    itemId,
    opener,
    returnFocus: () => lastOpener,
    onClose: () => { if (linksOn) scene?.setLinks(CARE_LINKS); },
    onGoStation: (to, item) => setTimeout(() => walkTo(to, item), 0),
    onOpenList: () => setTimeout(showList, 0),
  });
}

/** 不走路、直接開啟（清單、搜尋、時間軸） */
function openDirect(id: StationId, opener: HTMLElement, itemId?: string) {
  scene?.placeAt(id, byId.get(id)!.entryNodeId);
  scene?.focusStation(id);
  announce(status, `已開啟「${byId.get(id)!.title}」。`);
  setTimeout(() => openStation(id, opener, itemId), 0);
}

function showList() {
  const opener = $('station-list-open');
  openStationList({
    stations: STATIONS,
    progress,
    opener,
    onOpen: (id, item) => openDirect(id, opener, item),
    onWalk: (id) => setTimeout(() => walkTo(id), 0),
  });
}

let activePhase: PhaseId | null = null;
function setPhase(p: PhaseId | null) {
  activePhase = p;
  const chip = $('phase-chip');
  if (!p) {
    scene?.setHighlight(null);
    chip.hidden = true;
    announce(status, '已取消階段標示。');
    return;
  }
  const phase = PHASES.find((x) => x.id === p)!;
  const ids = STATIONS.filter((s) => s.phases.includes(p)).map((s) => s.id);
  scene?.setHighlight(ids);
  chip.hidden = false;
  chip.replaceChildren(h('span', {}, `🕒 ${phase.title}：${ids.length} 站`),
    h('button', { type: 'button', class: 'icon-btn', onclick: () => setPhase(null) }, h('span', { 'aria-hidden': 'true' }, '✕'), h('span', { class: 'sr-only' }, '取消階段標示')));
  announce(status, `已標示「${phase.title}」的 ${ids.length} 個站點：${ids.map((i) => byId.get(i)!.title).join('、')}。`);
}

let linksOn = false;
function toggleLinks() {
  linksOn = !linksOn;
  $('links-btn').setAttribute('aria-pressed', String(linksOn));
  scene?.setLinks(linksOn ? CARE_LINKS : null);
  announce(status, linksOn ? `已顯示 ${CARE_LINKS.length} 條照護串聯線：住院時學的事，連到回家後怎麼做。進入站點可看到串聯說明。` : '已隱藏照護串聯線。');
}

function pickRole(opener: HTMLElement | null, then?: () => void) {
  const m = openModal({ title: '選擇角色', opener, className: 'role-modal', onClose: then });
  const card = (r: Role, desc: string) =>
    h('button', {
      type: 'button', class: `role-card ${role === r && progress.role ? 'selected' : ''}`, 'data-role': r,
      onclick: () => {
        role = r;
        progress.setRole(r);
        scene?.setRole(r);
        refreshLabels();
        announce(status, `已選擇角色：${ROLE_TEXT[r]}。`);
        m.close();
      },
    }, h('span', { class: `role-avatar ${r}`, 'aria-hidden': 'true' }), h('span', { class: 'role-name' }, ROLE_TEXT[r]), h('span', { class: 'role-desc' }, desc));
  m.body.append(
    h('p', {}, '三個角色走同一座島，提示不同。之後可以從上方的角色按鈕更換。'),
    h('div', { class: 'role-grid' },
      card('patient', '練習說出自己的變化、照顧自己的方法。'),
      card('caregiver', '提示著重陪同、觀察與溝通。'),
      card('staff', '陪同衛教；住院區直接打開醫護規範卡。')),
  );
}

function openMore() {
  const opener = $('more-open');
  const m = openModal({ title: '更多', opener, className: 'more-modal' });
  const rm = h('input', { type: 'checkbox', id: 'rm-toggle' }) as HTMLInputElement;
  rm.checked = reducedMotion();
  rm.addEventListener('change', () => {
    reducedOverride = rm.checked;
    applyReduced();
    announce(status, rm.checked ? '已開啟減少動態效果：點地標會直接抵達。' : '已關閉減少動態效果。');
  });
  const resetArea = h('div', { class: 'reset-area' });
  const askReset = () => {
    resetArea.replaceChildren(
      h('p', { class: 'notice' }, '確定要清除這台裝置上的角色與探索狀態嗎？'),
      h('div', { class: 'actions' },
        h('button', { type: 'button', class: 'btn btn-secondary', onclick: () => resetArea.replaceChildren(resetBtn) }, '取消'),
        h('button', {
          type: 'button', class: 'btn btn-danger', id: 'reset-confirm', onclick: () => {
            progress.reset();
            role = 'patient';
            scene?.setRole(role);
            scene?.resetAvatar();
            setPhase(null);
            refreshLabels();
            m.close();
            announce(status, '已重置，回到初始狀態。');
            showIntro();
          },
        }, '確定重置')));
    resetArea.querySelector<HTMLElement>('#reset-confirm')?.focus();
  };
  const resetBtn = h('button', { type: 'button', class: 'btn btn-secondary btn-block', id: 'reset-open', onclick: askReset }, '重置探索狀態');
  resetArea.append(resetBtn);
  m.body.append(
    h('button', { type: 'button', class: 'btn btn-secondary btn-block', onclick: () => { m.close(); pickRole($('more-open')); } }, `更換角色（目前：${ROLE_TEXT[role]}）`),
    h('label', { class: 'switch', for: 'rm-toggle' }, rm, h('span', {}, '減少動態效果（直接抵達地標、停用裝飾動畫）')),
    h('p', { class: 'small muted' }, '預設依照系統的「減少動態效果」設定。'),
    resetArea,
    h('h3', {}, '關於這個原型'),
    h('ul', { class: 'small' },
      h('li', {}, '只在這台裝置儲存角色、站點與「已探索／已練習」狀態，不儲存姓名、病歷、真實體重或照護偏好。'),
      h('li', {}, '「已練習」為使用者自填，不代表醫療人員已確認示教能力。'),
      h('li', {}, '情境中的出院單、照護卡與數字皆為虛構。'),
      h('li', {}, '警訊門檻、聯絡方式與緊急分流以院方核定的個別出院計畫為準；緊急狀況請撥打 119。'),
      h('li', {}, '醫護規範卡提供認證查詢文字；筆記本連結只在院內受保護環境、登入後顯示。'),
      h('li', {}, '島上那顆紅色小心心會從 01 出發、經過心尖的返家照護站，一路巡到 14，跟著它走就是完整的照護旅程。')),
    progress.saveOk ? '' : h('p', { class: 'notice' }, '這台裝置目前無法儲存進度，仍可繼續遊玩。'),
  );
}

// ───────── 開場 ─────────
const intro = $('intro');
function showIntro() {
  intro.hidden = false;
  $('start-btn').textContent = progress.role ? '繼續探索' : '開始探索';
  $('start-btn').focus();
}
$('start-btn').addEventListener('click', () => {
  const finish = () => {
    intro.hidden = true;
    announce(status, `以「${ROLE_TEXT[role]}」角色從醫院大門出發，第一站是「01 入院評估花園」。點島嶼或使用清單前往。`);
    labelBtns.get('admission')?.focus();
  };
  if (!progress.role) pickRole($('start-btn'), () => { if (progress.role) finish(); });
  else finish();
});
showIntro();

// ───────── 工具列 ─────────
$('panorama-btn').addEventListener('click', () => { scene?.panorama(); announce(status, '已回到全景。'); });
$('avatar-btn').addEventListener('click', () => { scene?.focusAvatar(); announce(status, `已移到角色位置（${ROLE_TEXT[role]}）。`); });
$('station-list-open').addEventListener('click', showList);
$('timeline-btn').addEventListener('click', () => openTimeline({
  stations: STATIONS, opener: $('timeline-btn'), active: activePhase,
  onHighlight: (p) => { setPhase(p); if (p) scene?.panorama(); },
  onOpen: (id) => openDirect(id, $('timeline-btn')),
}));
$('links-btn').addEventListener('click', toggleLinks);
$('more-open').addEventListener('click', openMore);
$('role-chip').addEventListener('click', () => pickRole($('role-chip')));
$('zoom-in').addEventListener('click', () => scene?.zoomBy(1.25));
$('rotate-left').addEventListener('click', () => { scene?.rotateBy(-45); announce(status, '視角已向左旋轉。按「全景」可看整座島。'); });
$('rotate-right').addEventListener('click', () => { scene?.rotateBy(45); announce(status, '視角已向右旋轉。按「全景」可看整座島。'); });
const TOD: { id: TimeOfDay; ico: string; text: string }[] = [
  { id: 'morning', ico: '🌅', text: '早晨' }, { id: 'day', ico: '☀️', text: '白天' }, { id: 'night', ico: '🌙', text: '夜晚' },
];
let todIndex = 1;
$('tod-btn').addEventListener('click', () => {
  todIndex = (todIndex + 1) % TOD.length;
  const t = TOD[todIndex];
  scene?.setTimeOfDay(t.id);
  document.body.dataset.tod = t.id;
  $('tod-ico').textContent = t.ico;
  $('tod-label').textContent = `切換時段，目前：${t.text}`;
  announce(status, `現在是${t.text}。`);
});
$('zoom-out').addEventListener('click', () => scene?.zoomBy(0.8));

// ───────── 拖曳、點擊與雙指手勢（區分滑動與點選，避免滑動時誤開關卡） ─────────
const mapEl = $('map');
const DRAG_PX = 10;
let down: { id: number; x: number; y: number; lx: number; ly: number; dragging: boolean; onCanvas: boolean } | null = null;
let suppressClick = false;
const touches = new Map<number, { x: number; y: number }>();
let pinch: { d: number; a: number } | null = null;
const pinchInfo = () => {
  const [p, q] = [...touches.values()];
  return { d: Math.hypot(q.x - p.x, q.y - p.y), a: Math.atan2(q.y - p.y, q.x - p.x) };
};

mapEl.addEventListener('pointerdown', (e) => {
  if (isModalOpen() || (e.target as HTMLElement).closest('.zoom, .phase-chip')) return;
  touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (touches.size === 2) {
    // 第二根手指：改成縮放／旋轉，取消單指拖曳與點擊
    pinch = pinchInfo();
    if (down) down.dragging = true;
    mapEl.setPointerCapture(e.pointerId);
    return;
  }
  if (!e.isPrimary) return;
  const t = e.target as HTMLElement;
  down = { id: e.pointerId, x: e.clientX, y: e.clientY, lx: e.clientX, ly: e.clientY, dragging: false, onCanvas: t instanceof HTMLCanvasElement || t.id === 'labels' || !!t.closest('.zone-signs') };
  suppressClick = false;
});
mapEl.addEventListener('pointermove', (e) => {
  if (touches.has(e.pointerId)) touches.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (pinch && touches.size === 2) {
    const now = pinchInfo();
    if (pinch.d > 0) scene?.zoomImmediate(now.d / pinch.d);
    scene?.rotateBy(-THREE_DEG * (now.a - pinch.a), false);
    pinch = now;
    return;
  }
  if (!down || e.pointerId !== down.id) return;
  if (!down.dragging && Math.hypot(e.clientX - down.x, e.clientY - down.y) > DRAG_PX) {
    down.dragging = true;
    mapEl.setPointerCapture(e.pointerId);
    mapEl.classList.add('dragging');
  }
  if (down.dragging) {
    scene?.panBy(e.clientX - down.lx, e.clientY - down.ly);
    down.lx = e.clientX;
    down.ly = e.clientY;
  }
});
const THREE_DEG = 180 / Math.PI;
const endPointer = (e: PointerEvent) => {
  touches.delete(e.pointerId);
  if (touches.size < 2) pinch = null;
  if (!down || e.pointerId !== down.id) return;
  const wasDrag = down.dragging, onCanvas = down.onCanvas;
  down = null;
  mapEl.classList.remove('dragging');
  if (wasDrag) {
    suppressClick = true;
    setTimeout(() => (suppressClick = false), 50);
    return;
  }
  if (e.type === 'pointerup' && onCanvas && scene && !isModalOpen()) {
    const rect = $('game').getBoundingClientRect();
    const hit = scene.hitAt(e.clientX - rect.left, e.clientY - rect.top);
    if (hit) walkTo(hit.station, hit.item);
  }
};
mapEl.addEventListener('pointerup', endPointer);
mapEl.addEventListener('pointercancel', endPointer);
mapEl.addEventListener('wheel', (e) => { e.preventDefault(); if (!isModalOpen()) scene?.zoomBy(e.deltaY < 0 ? 1.1 : 0.9); }, { passive: false });

onModalChange((open) => document.body.classList.toggle('modal-open', open));
refreshLabels();

// 讓自動化測試可以讀取狀態（不含任何個資）
declare global { interface Window { __hfIsland?: unknown } }
window.__hfIsland = {
  get destination() { return scene?.destination ?? null; },
  get moving() { return scene?.isMoving ?? false; },
  get zoom() { return scene ? scene.zoom : null; },
  get angle() { return scene ? scene.angle : null; },
  /** 島（建築）中心在視窗中的座標（測試點擊島本體用） */
  buildingPoint(id: StationId) {
    if (!scene) return null;
    const t = tileOf(id), r = $('game').getBoundingClientRect();
    const p = scene.toScreen(t.x, t.y - 20, tileHeight(t) + 18);
    return { x: r.left + p.x, y: r.top + p.y };
  },
  /** 照護重點小屋在視窗中的座標 */
  itemPoint(id: StationId, index: number) {
    if (!scene) return null;
    const t = tileOf(id), r = $('game').getBoundingClientRect();
    const [dx, dz] = ITEM_SLOTS[index];
    const p = scene.toScreen(t.x + dx, t.y + dz, tileHeight(t) + 8);
    return { x: r.left + p.x, y: r.top + p.y };
  },
  avatarPoint() {
    if (!scene) return null;
    const r = $('game').getBoundingClientRect();
    const p = scene.avatarScreen();
    return { x: r.left + p.x, y: r.top + p.y };
  },
};
