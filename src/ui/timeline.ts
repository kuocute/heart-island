// 「時間」：依照護階段（入院當天 → 長期照護）看要去哪些站，並可在地圖上標示。
import { PHASES } from '../content/links';
import type { PhaseId, Station, StationId } from '../content/types';
import { h, openModal } from './modal';

export function openTimeline(o: {
  stations: Station[];
  opener: HTMLElement | null;
  active: PhaseId | null;
  onHighlight: (phase: PhaseId | null) => void;
  onOpen: (id: StationId) => void;
}) {
  const modal = openModal({ title: '照護時間軸', opener: o.opener, className: 'timeline-modal' });
  const list = h('ol', { class: 'timeline' });
  PHASES.forEach((p, i) => {
    const ss = o.stations.filter((s) => s.phases.includes(p.id));
    list.append(h('li', { class: `phase ${o.active === p.id ? 'active' : ''}`, 'data-phase': p.id },
      h('div', { class: 'phase-head' },
        h('span', { class: 'phase-no', 'aria-hidden': 'true' }, String(i + 1)),
        h('h3', {}, p.title),
        h('button', { type: 'button', class: 'btn btn-secondary btn-small', 'aria-pressed': String(o.active === p.id), onclick: () => { modal.close(); o.onHighlight(o.active === p.id ? null : p.id); } },
          o.active === p.id ? '取消標示' : '在地圖標示')),
      h('p', { class: 'small' }, p.description),
      h('div', { class: 'phase-stations' }, ...ss.map((s) => h('button', { type: 'button', class: `chip ${s.zone}`, onclick: () => { modal.close(); o.onOpen(s.id); } }, `${s.no} ${s.title}`)))));
  });
  modal.body.append(h('p', { class: 'small muted' }, '從入院到回家，每個階段可以先練習的站點。站點在不同階段都可以自由前往。'), list);
  return modal;
}
