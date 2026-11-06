// 清單：關鍵字搜尋＋依住院區／居家區列出所有站點與探索狀態。從清單可直接開啟任務，不必等待角色走路動畫。
import { searchStations } from '../content/search';
import type { Station, StationId } from '../content/types';
import { STATUS_TEXT, stationStatus, type ProgressStore } from '../state/progress';
import { h, openModal, type ModalHandle } from './modal';

export function statusOf(station: Station, progress: ProgressStore) {
  const p = progress.station(station.id);
  const ids = station.missions.map((m) => m.id);
  const st = stationStatus(p, ids);
  const n = ids.filter((id) => p.practiced.includes(id)).length;
  // 有衛教卡的站：答對情境題即「已完成」
  if (station.card) return { st, n, total: ids.length, text: st === 'practiced' ? '已完成' : STATUS_TEXT[st] };
  return { st, n, total: ids.length, text: `${STATUS_TEXT[st]}${n ? `・已練習 ${n}／${ids.length}` : ''}` };
}

export function openStationList(o: {
  stations: Station[];
  progress: ProgressStore;
  opener: HTMLElement | null;
  initialQuery?: string;
  onOpen: (id: StationId, itemId?: string) => void;
  onWalk: (id: StationId) => void;
}): ModalHandle {
  const modal = openModal({ title: '清單與搜尋', opener: o.opener, className: 'list-modal' });
  const input = h('input', { type: 'search', id: 'search-input', class: 'search-input', placeholder: '搜尋：例如 體重、喘、藥、低鹽、回診', autocomplete: 'off', enterkeyhint: 'search' }) as HTMLInputElement;
  const results = h('div', { class: 'search-results', 'aria-live': 'polite' });
  const body = h('div', {});

  const row = (s: Station) => {
    const status = statusOf(s, o.progress);
    const openBtn = h('button', { type: 'button', class: 'station-row', 'data-station': s.id },
      h('span', { class: `dot ${status.st} ${s.zone}`, 'aria-hidden': 'true' }, status.st === 'practiced' ? '✓' : s.no),
      h('span', { class: 'station-row-text' },
        h('span', { class: 'station-row-title' }, `${s.no} ${s.title}`),
        h('span', { class: 'station-row-sub' }, `${s.subtitle}・${status.text}${s.staff ? '・含醫護規範' : ''}`)),
    );
    openBtn.setAttribute('aria-label', `${s.no} ${s.title}，${s.subtitle}，${status.text}${s.staff ? '，含醫護規範' : ''}。開啟`);
    openBtn.addEventListener('click', () => { modal.close(); o.onOpen(s.id); });
    const walkBtn = h('button', { type: 'button', class: 'icon-btn walk-btn', onclick: () => { modal.close(); o.onWalk(s.id); } },
      h('span', { 'aria-hidden': 'true' }, '🚶'), h('span', { class: 'sr-only' }, `在地圖上走到${s.title}`));
    return h('li', {}, openBtn, walkBtn);
  };
  const zone = (z: 'hospital' | 'home', title: string, sub: string) =>
    h('section', { class: `zone-group ${z}` }, h('h3', {}, title, h('span', { class: 'small muted' }, `　${sub}`)),
      h('ul', { class: 'station-list' }, ...o.stations.filter((s) => s.zone === z).map(row)));
  body.append(
    h('p', { class: 'small muted' }, '所有站點都已開放。點站名直接開啟；點 🚶 讓角色在地圖上走過去。'),
    zone('hospital', '住院區', '入院到出院・醫護人員可查看規範'),
    zone('home', '居家區', '出院後的居家衛教與照護'),
    o.progress.saveOk ? '' : h('p', { class: 'notice' }, '這台裝置目前無法儲存進度，仍可繼續遊玩，但重新整理後不會保留。'),
  );

  const update = () => {
    const q = input.value.trim();
    body.hidden = !!q;
    results.replaceChildren();
    if (!q) return;
    const r = searchStations(o.stations, q);
    results.append(h('p', { class: 'small muted' }, r.length ? `找到 ${r.length} 筆` : '找不到符合的內容，換個說法試試看（例如「腳腫」「藥盒」）。'));
    results.append(h('ul', { class: 'station-list' }, ...r.map((x) => h('li', {},
      h('button', { type: 'button', class: 'station-row', 'data-station': x.station.id, onclick: () => { modal.close(); o.onOpen(x.station.id, x.item?.id); } },
        h('span', { class: `dot ${x.station.zone}`, 'aria-hidden': 'true' }, x.station.no),
        h('span', { class: 'station-row-text' }, h('span', { class: 'station-row-title' }, x.why), h('span', { class: 'station-row-sub' }, `${x.station.no} ${x.station.title}`)))))));
  };
  input.addEventListener('input', update);
  modal.body.append(h('label', { class: 'sr-only', for: 'search-input' }, '搜尋照護主題'), input, results, body);
  if (o.initialQuery) { input.value = o.initialQuery; update(); }
  return modal;
}
