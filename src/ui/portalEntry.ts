// 「醫護人員專區｜院內帳號登入」入口卡片。
// 已設定入口：開新視窗前往院方核准的院內入口，由該平台驗證院內帳號與文件讀取權限。
// 未設定入口：點擊後顯示「院內規範入口尚未開放，請洽心衰照護團隊」。
import { PORTAL_LABEL, PORTAL_NOT_OPEN, STAFF_PORTAL_URL } from '../staff/portal';
import { h } from './modal';

let seq = 0;

export function renderPortalEntry(opts: { compact?: boolean } = {}): HTMLElement {
  const id = `portal-${++seq}`;
  const note = h('p', { id: `${id}-note`, class: 'small muted portal-note' },
    STAFF_PORTAL_URL
      ? '將另開視窗前往院方核准的院內入口，由院內平台驗證您的院內帳號與文件讀取權限。'
      : '院內規範與認證文件放在院方的入口平台，需以院內帳號登入。');
  const msg = h('p', { id: `${id}-msg`, class: 'portal-msg', role: 'status', 'aria-live': 'polite' });

  let action: HTMLElement;
  if (STAFF_PORTAL_URL) {
    action = h('a', {
      class: 'btn btn-primary portal-btn', href: STAFF_PORTAL_URL, target: '_blank', rel: 'noopener noreferrer',
      'aria-describedby': `${id}-note`, 'data-portal': 'open',
    }, h('span', { 'aria-hidden': 'true', class: 'portal-ico' }, '🔒'), PORTAL_LABEL, h('span', { class: 'sr-only' }, '（另開新視窗，需院內帳號）'));
  } else {
    action = h('button', {
      type: 'button', class: 'btn btn-secondary portal-btn', 'aria-describedby': `${id}-note`, 'data-portal': 'not-open',
      onclick: () => {
        msg.textContent = '';
        // 換一個 tick 再寫入，讓螢幕閱讀器每次都會朗讀
        setTimeout(() => (msg.textContent = PORTAL_NOT_OPEN), 30);
      },
    }, h('span', { 'aria-hidden': 'true', class: 'portal-ico' }, '🔒'), PORTAL_LABEL);
  }

  return h('section', { class: `portal-card ${opts.compact ? 'compact' : ''}`, 'aria-labelledby': `${id}-h` },
    h('h4', { id: `${id}-h` }, '醫護人員專區'),
    opts.compact ? '' : h('p', { class: 'small' }, '病友與家屬不需登入，可以直接開始練習。'),
    action, note, msg);
}
