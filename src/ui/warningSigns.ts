// 10 警訊燈塔：進站後依序顯示 ①紅燈｜立即撥打 119 ②黃燈｜今天聯絡照護團隊 ③每天自我檢查 ④警訊練習，
// 以及「查看完整衛教圖卡」（可放大）。紅黃燈都有文字與圖示，不只靠顏色。
// 練習中的「立即撥打 119」只顯示回饋，不會撥號；不寫入進度。
import { TEAM_PENDING, WARNING, type Sign, type Triage } from '../content/warningSigns';
import { announce, h, openModal } from './modal';

export const isWarningStation = (id: string) => id === WARNING.station;

const signList = (signs: Sign[], cls: string) =>
  h('ul', { class: `signal-list ${cls}` }, ...signs.map((s) => h('li', {}, h('span', { class: 'signal-icon', 'aria-hidden': 'true' }, s.icon), h('span', {}, s.text))));

export function renderWarningTop(o: { live: HTMLElement }): HTMLElement {
  const W = WARNING;
  const red = h('section', { class: 'signal signal-red', 'aria-labelledby': 'signal-red-title', 'data-signal': 'red' },
    // 進站時焦點落在紅燈標題（第一個 .step-heading），首屏就看到求救資訊
    h('h3', { id: 'signal-red-title', class: 'signal-title step-heading', tabindex: '-1' },
      h('span', { class: 'signal-badge', 'aria-hidden': 'true' }, W.red.icon),
      h('span', { class: 'signal-label' }, `${W.red.label}｜`), W.red.title),
    signList(W.red.signs, 'red'),
    h('p', { class: 'signal-action', 'data-signal': 'red-action' }, h('span', { 'aria-hidden': 'true' }, '📞 '), W.red.action));

  const weight = TEAM_PENDING.weightThreshold ? `（${TEAM_PENDING.weightThreshold}）` : '';
  const yellowSigns = W.yellow.signs.map((s, i) => (i === 0 && weight ? { ...s, text: s.text + weight } : s));
  const yellow = h('section', { class: 'signal signal-yellow', 'aria-labelledby': 'signal-yellow-title', 'data-signal': 'yellow' },
    h('h3', { id: 'signal-yellow-title', class: 'signal-title' },
      h('span', { class: 'signal-badge', 'aria-hidden': 'true' }, W.yellow.icon),
      h('span', { class: 'signal-label' }, `${W.yellow.label}｜`), W.yellow.title),
    signList(yellowSigns, 'yellow'),
    h('p', { class: 'signal-action' }, W.yellow.action),
    TEAM_PENDING.teamPhone ? h('p', { class: 'signal-pending', 'data-signal': 'phone' }, `心臟衰竭照護團隊：${TEAM_PENDING.teamPhone}`) : '',
    TEAM_PENDING.teamPhone && TEAM_PENDING.weightThreshold ? '' : h('p', { class: 'signal-pending small muted', 'data-signal': 'pending' }, W.yellow.pendingNote));

  const daily = h('section', { class: 'daily-check', 'aria-labelledby': 'daily-title', 'data-signal': 'daily' },
    h('h3', { id: 'daily-title', class: 'signal-title plain' }, h('span', { class: 'signal-badge', 'aria-hidden': 'true' }, '📋'), W.daily.title),
    h('p', { class: 'small muted' }, W.daily.intro),
    h('div', { class: 'check-cards' }, ...W.daily.checks.map((c) =>
      h('details', { class: 'check-card', 'data-check': c.id },
        h('summary', {}, h('span', { class: 'signal-icon', 'aria-hidden': 'true' }, c.icon), h('span', { class: 'check-title' }, c.title)),
        h('p', {}, h('strong', {}, '每天怎麼做：'), c.how),
        h('p', {}, h('strong', {}, '需要注意：'), c.watch)))),
    h('button', { type: 'button', class: 'btn btn-secondary btn-block', 'data-signal': 'open-card', onclick: (e: Event) => openCardViewer(e.currentTarget as HTMLElement) },
      h('span', { 'aria-hidden': 'true' }, '🖼️ '), W.card.title));

  const drill = h('section', { class: 'signal-drill', 'aria-labelledby': 'drill-title', 'data-signal': 'drill' });
  renderDrill(drill, o.live);

  return h('div', { class: 'warning-top' }, red, yellow, daily, drill);
}

// ───── 警訊練習｜我現在該怎麼做？ ─────
function renderDrill(root: HTMLElement, live: HTMLElement) {
  const D = WARNING.drill;
  let i = 0;
  let picked: Triage | null = null;
  const tried = new Set<Triage>();

  const draw = (focusSel?: string) => {
    const q = D.questions[i];
    const ok = picked === q.answer;
    root.replaceChildren(
      h('h3', { id: 'drill-title', class: 'signal-title plain' }, h('span', { class: 'signal-badge', 'aria-hidden': 'true' }, '🧭'), D.title),
      h('p', { class: 'small muted' }, D.intro),
      h('p', { class: 'drill-count small', 'data-drill': 'count' }, `第 ${i + 1}／${D.questions.length} 題・虛構情境｜${q.title}`),
      h('p', { class: 'scenario', 'data-drill': 'situation' }, q.situation),
      h('div', { class: 'choices drill-choices', role: 'group', 'aria-label': '我現在該怎麼做？' }, ...D.options.map((op) =>
        h('button', {
          type: 'button', class: `choice ${tried.has(op.id) && op.id !== q.answer ? 'tried' : ''} ${picked === op.id ? 'picked' : ''}`, 'data-triage': op.id,
          'aria-pressed': picked === op.id ? 'true' : 'false', disabled: picked !== null,
          onclick: () => { picked = op.id; tried.add(op.id); draw('[data-drill=feedback]'); announce(live, op.id === q.answer ? '答對了。' : '請看說明，可以再試一次。'); },
        }, op.label))),
      picked ? h('div', { class: `feedback ${ok ? 'ok' : 'retry'}`, 'data-drill': 'feedback', tabindex: '-1' },
        h('strong', {}, ok ? '✓ 答對了。' : '再想一想。'), D.questions[i].feedback[picked]) : '',
      picked ? h('div', { class: 'actions' },
        ok ? '' : h('button', { type: 'button', class: 'btn btn-primary', 'data-drill': 'retry', onclick: () => { picked = null; draw('[data-triage]'); } }, '再試一次'),
        ok && i < D.questions.length - 1 ? h('button', { type: 'button', class: 'btn btn-primary', 'data-drill': 'next', onclick: () => { i++; picked = null; tried.clear(); draw('[data-drill=situation]'); } }, '下一題') : '',
        ok && i === D.questions.length - 1 ? h('p', { class: 'pill ok', 'data-drill': 'done' }, '三題都練習完了！') : '',
        ok && i === D.questions.length - 1 ? h('button', { type: 'button', class: 'btn btn-secondary', 'data-drill': 'restart', onclick: () => { i = 0; picked = null; tried.clear(); draw('[data-drill=situation]'); } }, '從第一題再練') : '') : '',
    );
    if (focusSel) {
      const t = root.querySelector<HTMLElement>(focusSel);
      if (t) {
        if (!t.hasAttribute('tabindex') && !(t instanceof HTMLButtonElement)) t.tabIndex = -1;
        requestAnimationFrame(() => { t.focus({ preventScroll: true }); t.scrollIntoView({ block: 'nearest' }); });
      }
    }
  };
  draw();
}

// ───── 完整衛教圖卡（可放大） ─────
const ZOOMS = [1, 1.5, 2, 3];

export function openCardViewer(opener: HTMLElement | null) {
  const C = WARNING.card;
  const src = `${import.meta.env.BASE_URL}assets/${C.file}`;
  const m = openModal({ title: C.title, opener, className: 'card-viewer' });
  let z = 0;
  const img = h('img', { src, alt: C.alt, class: 'card-image', draggable: 'false', 'data-card': 'image' }) as HTMLImageElement;
  const stage = h('div', { class: 'card-stage', 'data-card': 'stage', tabindex: '0', 'aria-label': '圖卡（可捲動查看）' }, img);
  const level = h('span', { class: 'zoom-level', 'aria-live': 'polite', 'data-card': 'level' }, '100%');
  const setZoom = (next: number, cx = 0.5, cy = 0.5) => {
    const n = Math.max(0, Math.min(ZOOMS.length - 1, next));
    if (n === z) return;
    // 以 (cx, cy) 為中心放大，維持使用者正在看的位置
    const fx = (stage.scrollLeft + stage.clientWidth * cx) / stage.scrollWidth;
    const fy = (stage.scrollTop + stage.clientHeight * cy) / stage.scrollHeight;
    z = n;
    img.style.width = `${ZOOMS[z] * 100}%`;
    level.textContent = `${ZOOMS[z] * 100}%`;
    stage.dataset.zoom = String(ZOOMS[z]);
    stage.scrollLeft = fx * stage.scrollWidth - stage.clientWidth * cx;
    stage.scrollTop = fy * stage.scrollHeight - stage.clientHeight * cy;
    minus.disabled = z === 0;
    plus.disabled = z === ZOOMS.length - 1;
  };
  const minus = h('button', { type: 'button', class: 'btn btn-secondary zoom-btn', 'data-card': 'zoom-out', 'aria-label': '縮小', onclick: () => setZoom(z - 1) }, '－') as HTMLButtonElement;
  const plus = h('button', { type: 'button', class: 'btn btn-secondary zoom-btn', 'data-card': 'zoom-in', 'aria-label': '放大', onclick: () => setZoom(z + 1) }, '＋') as HTMLButtonElement;
  minus.disabled = true;

  // 雙指縮放、點兩下放大／還原；單指照常捲動
  const pts = new Map<number, { x: number; y: number }>();
  let pinchStart = 0, pinchZ = 0, lastTap = 0;
  stage.addEventListener('pointerdown', (e) => {
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 2) { const [a, b] = [...pts.values()]; pinchStart = Math.hypot(a.x - b.x, a.y - b.y); pinchZ = z; }
    if (e.pointerType === 'touch' && pts.size === 1) {
      const now = Date.now();
      if (now - lastTap < 300) { const r = stage.getBoundingClientRect(); setZoom(z === 0 ? 2 : 0, (e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height); lastTap = 0; } else lastTap = now;
    }
  });
  stage.addEventListener('pointermove', (e) => {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 2 && pinchStart > 0) {
      const [a, b] = [...pts.values()];
      const ratio = Math.hypot(a.x - b.x, a.y - b.y) / pinchStart;
      const target = ZOOMS[pinchZ] * ratio;
      let best = 0;
      ZOOMS.forEach((v, k) => { if (Math.abs(v - target) < Math.abs(ZOOMS[best] - target)) best = k; });
      const r = stage.getBoundingClientRect();
      setZoom(best, ((a.x + b.x) / 2 - r.left) / r.width, ((a.y + b.y) / 2 - r.top) / r.height);
    }
  });
  const end = (e: PointerEvent) => { pts.delete(e.pointerId); if (pts.size < 2) pinchStart = 0; };
  stage.addEventListener('pointerup', end);
  stage.addEventListener('pointercancel', end);
  stage.addEventListener('dblclick', (e) => { const r = stage.getBoundingClientRect(); setZoom(z === 0 ? 2 : 0, (e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height); });

  m.body.append(
    C.status === 'draft' ? h('p', { class: 'notice small', 'data-card': 'draft' }, C.draftNote) : '',
    h('div', { class: 'zoom-bar' }, minus, level, plus,
      h('a', { class: 'btn btn-secondary', href: src, target: '_blank', rel: 'noopener', 'data-card': 'original' }, '開新分頁看原圖', h('span', { class: 'sr-only' }, '（另開新分頁）'))),
    h('p', { class: 'small muted' }, '可以用「＋」放大、雙指縮放，或點兩下放大；放大後用手指拖曳查看。'),
    stage);
  return m;
}
