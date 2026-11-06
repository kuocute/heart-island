// 每一站的「醫療人員工作卡」：查核主題、查核欄位、開啟疾病認證筆記本、複製查詢文字。
// 未登入（或原型未接院內驗證）時只顯示版型與查詢文字，所有欄位標示「待確認」。
import type { Station } from '../content/types';
import { STAFF_FIELDS, loadStaffState, safeHttpsUrl, type StaffState } from '../staff/staffApi';
import { announce, h } from './modal';

const PENDING = '待確認';

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // 後備：選取文字讓使用者手動複製
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.append(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove();
    return ok;
  }
}

export function renderStaffCard(station: Station, live: HTMLElement): HTMLElement {
  const staff = station.staff ?? { topics: [], query: '' };
  const statusLine = h('p', { class: 'staff-status' }, '讀取中…');
  const linkSlot = h('div', { class: 'staff-actions' });
  const table = h('dl', { class: 'staff-fields' });
  const fill = (state: StaffState) => {
    const values = state.kind === 'ok' ? state.data.stations[station.id] ?? {} : {};
    table.replaceChildren(
      ...STAFF_FIELDS.flatMap((f) => {
        const v = values[f.key]?.trim();
        return [h('dt', {}, f.label), h('dd', { class: v ? '' : 'pending' }, v || PENDING)];
      }),
    );
    linkSlot.replaceChildren();
    const url = state.kind === 'ok' ? safeHttpsUrl(state.data.notebookUrl) : null;
    if (url) {
      linkSlot.append(h('a', { class: 'btn btn-secondary', href: url, target: '_blank', rel: 'noopener noreferrer' }, '開啟疾病認證筆記本', h('span', { class: 'sr-only' }, '（另開新視窗）')));
    } else {
      linkSlot.append(h('button', { type: 'button', class: 'btn btn-secondary', disabled: true, 'aria-describedby': `staff-why-${station.id}` }, '開啟疾病認證筆記本'));
    }
    linkSlot.append(
      h('button', {
        type: 'button',
        class: 'btn btn-secondary',
        onclick: async () => announce(live, (await copyText(staff.query)) ? '已複製認證查詢文字。' : '無法自動複製，請長按下方文字手動複製。'),
      }, '複製認證查詢文字'),
    );
    const why = h('p', { id: `staff-why-${station.id}`, class: 'small muted' });
    switch (state.kind) {
      case 'unconfigured':
        statusLine.textContent = '此原型尚未連結院內身分驗證，只展示版型與查詢文字。';
        why.textContent = '筆記本連結由院方在受保護的醫療人員環境設定，不放在病友端網頁。';
        break;
      case 'unauthorized':
        statusLine.replaceChildren('請先登入院內醫療人員工作頁，才能看到筆記本連結與查核資料。 ', h('a', { href: state.loginUrl }, '前往登入'));
        why.textContent = '登入並通過醫療人員授權後才會顯示。';
        break;
      case 'unavailable':
        statusLine.textContent = '目前無法連線到院內工作頁，以下僅顯示版型。';
        why.textContent = '連線恢復後重新開啟本卡即可。';
        break;
      case 'ok':
        statusLine.textContent = '已登入院內工作頁。正式認證內容以院內核定文件為準。';
        why.textContent = url ? '' : '院方尚未設定筆記本連結。';
        break;
    }
    linkSlot.append(why);
  };

  const card = h('section', { class: 'staff-card', 'aria-labelledby': `staff-h-${station.id}` },
    h('h3', { id: `staff-h-${station.id}` }, '醫護規範卡'),
    h('p', { class: 'small muted' }, '提供醫護人員在本站對照疾病認證規範使用。未查核的項目標示「待確認」。'),
    statusLine,
    h('h4', {}, '本站相關查核主題'),
    h('ul', { class: 'staff-topics' }, ...staff.topics.map((t) => h('li', {}, t))),
    h('p', { class: 'small muted' }, '以上為建議查核方向，須對照院內核定文件確認。'),
    h('h4', {}, '查核欄位'),
    table,
    h('h4', {}, '認證查詢文字（貼到疾病認證筆記本）'),
    h('blockquote', { class: 'staff-query' }, staff.query),
    linkSlot,
  );
  fill({ kind: 'unconfigured' });
  statusLine.textContent = '讀取中…';
  loadStaffState().then(fill);
  return card;
}
