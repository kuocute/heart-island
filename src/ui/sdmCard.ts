// 「先和醫療團隊談談你的照護選擇」引導卡（醫病共享決策入口）。
// 只提供入口：不呼叫任何進度紀錄，點開問卷不代表完成 SDM。
import { SDM_CARD } from '../content/sdm';
import { h } from './modal';

export function renderSdmCard(onLearn: () => void): HTMLElement {
  const noteId = 'sdm-note';
  return h('section', { class: 'sdm-card', 'data-sdm': 'card', 'aria-labelledby': 'sdm-title' },
    h('h3', { id: 'sdm-title', class: 'step-heading sdm-title', tabindex: '-1' }, SDM_CARD.title),
    h('p', { class: 'sdm-text' }, SDM_CARD.text),
    h('div', { class: 'sdm-actions' },
      h('a', {
        class: 'btn btn-primary sdm-primary', href: SDM_CARD.url, target: '_blank', rel: 'noopener noreferrer',
        'data-sdm': 'open', 'aria-describedby': noteId,
      }, SDM_CARD.primaryLabel, h('span', { class: 'sr-only' }, '（在新分頁開啟奇美醫院網站）')),
      h('button', { type: 'button', class: 'btn btn-secondary sdm-secondary', 'data-sdm': 'learn', onclick: onLearn }, SDM_CARD.secondaryLabel)),
    h('p', { id: noteId, class: 'small muted sdm-note' }, SDM_CARD.note));
}
