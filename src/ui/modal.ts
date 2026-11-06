// 共用對話框：焦點鎖定、Esc 關閉、背景 inert、關閉後焦點回到觸發的按鈕。

export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string | boolean | number | undefined | ((e: Event) => void)> = {},
  ...children: (Node | string | null | undefined | false)[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === false) continue;
    if (typeof v === 'function') el.addEventListener(k.replace(/^on/, '').toLowerCase(), v as EventListener);
    else if (k === 'class') el.className = String(v);
    else if (k === 'text') el.textContent = String(v);
    else if (v === true) el.setAttribute(k, '');
    else el.setAttribute(k, String(v));
  }
  for (const c of children) if (c !== null && c !== undefined && c !== false) el.append(c);
  return el;
}

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

let openCount = 0;
const listeners = new Set<(open: boolean) => void>();
export const onModalChange = (fn: (open: boolean) => void) => listeners.add(fn);
export const isModalOpen = () => openCount > 0;

export type ModalHandle = { el: HTMLElement; body: HTMLElement; close: () => void; setTitle: (t: string) => void };

export function openModal(opts: {
  title: string;
  /** 觸發的元素；關閉後焦點回到這裡 */
  opener?: HTMLElement | null;
  className?: string;
  onClose?: () => void;
  /** 關閉後焦點要回去的元素（若和 opener 不同，例如地標標籤） */
  returnFocus?: () => HTMLElement | null;
}): ModalHandle {
  const root = document.getElementById('modal-root')!;
  const titleId = `modal-title-${Math.random().toString(36).slice(2, 8)}`;
  const title = h('h2', { id: titleId, class: 'modal-title', tabindex: '-1' }, opts.title);
  const closeBtn = h('button', { type: 'button', class: 'icon-btn modal-close' }, h('span', { 'aria-hidden': 'true' }, '✕'), h('span', { class: 'sr-only' }, '關閉'));
  const body = h('div', { class: 'modal-body' });
  const panel = h('div', { class: `modal ${opts.className ?? ''}`, role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': titleId },
    h('div', { class: 'modal-head' }, title, closeBtn), body);
  const backdrop = h('div', { class: 'modal-backdrop' }, panel);
  root.append(backdrop);

  const bg = [document.getElementById('app'), document.getElementById('intro'), ...Array.from(root.children).filter((c) => c !== backdrop)] as HTMLElement[];
  const prevInert = bg.map((el) => el?.inert ?? false);
  bg.forEach((el) => el && (el.inert = true));
  openCount++;
  listeners.forEach((fn) => fn(true));

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') { e.preventDefault(); close(); return; }
    if (e.key !== 'Tab') return;
    const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((x) => x.offsetParent !== null);
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  panel.addEventListener('keydown', onKey);
  backdrop.addEventListener('pointerdown', (e) => { if (e.target === backdrop) close(); });

  let closed = false;
  function close() {
    if (closed) return;
    closed = true;
    backdrop.remove();
    bg.forEach((el, i) => el && (el.inert = prevInert[i]));
    openCount--;
    listeners.forEach((fn) => fn(openCount > 0));
    opts.onClose?.();
    const target = opts.returnFocus?.() ?? opts.opener;
    if (target && document.contains(target)) target.focus();
  }
  closeBtn.addEventListener('click', close);
  requestAnimationFrame(() => title.focus());
  return { el: panel, body, close, setTitle: (t) => (title.textContent = t) };
}

/** 讓螢幕閱讀器朗讀的提示 */
const clearTimers = new WeakMap<HTMLElement, number>();
export function announce(region: HTMLElement, text: string) {
  region.textContent = '';
  // 換一個 tick 再寫入，確保相同文字也會被重新朗讀
  setTimeout(() => (region.textContent = text), 30);
  // 地圖上的提示泡泡幾秒後自動收起，避免遮住島嶼
  if (region.id === 'status') {
    window.clearTimeout(clearTimers.get(region));
    clearTimers.set(region, window.setTimeout(() => (region.textContent = ''), 7000));
  }
}
