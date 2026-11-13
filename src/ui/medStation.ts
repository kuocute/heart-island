// 07 用藥小站：「認識我的心衰藥」藥卡與「藥師櫃台」情境遊戲（含口頭回覆示教）。
// 都在同一個站點視窗內切換畫面；不寫入進度、不收集任何輸入。
import { MED_STATION, type DeskScenario, type MedCard } from '../content/medStation';
import { announce, h } from './modal';

export type MedStationOptions = {
  container: HTMLElement;
  live: HTMLElement;
  itemId: string;
  /** 回到用藥小站 */
  onBack: (practiced: boolean) => void;
};

export const isMedStationItem = (stationId: string, itemId: string) =>
  stationId === MED_STATION.station && (itemId === MED_STATION.cardsItemId || itemId === MED_STATION.deskItemId);

const heading = (text: string, cls = '') => h('h3', { class: `step-heading ${cls}`, tabindex: '-1' }, text);
const chip = (text: string) => h('p', { class: 'zone-chip home' }, text);

function focusTop(container: HTMLElement) {
  const t = container.querySelector<HTMLElement>('.step-heading');
  if (t) requestAnimationFrame(() => { t.focus(); t.scrollIntoView({ block: 'nearest' }); });
}

export function renderMedStation(o: MedStationOptions) {
  if (o.itemId === MED_STATION.cardsItemId) renderCards(o);
  else renderDesk(o);
}

// ───── 認識我的心衰藥 ─────
function medCard(c: MedCard, extra = '') {
  return h('li', { class: `med-card ${extra}`, 'data-med': c.id },
    h('h4', {}, c.title),
    h('p', { class: 'med-examples small muted' }, c.examples),
    h('p', { class: 'med-label' }, '這類藥幫我什麼'),
    h('p', { class: 'med-text' }, c.helps),
    h('p', { class: 'med-label' }, '用藥期間要留意什麼'),
    h('ul', { class: 'med-watch' }, ...c.watch.map((w) => h('li', {}, w))));
}

function renderCards(o: MedStationOptions) {
  const c = MED_STATION.cards;
  o.container.replaceChildren(
    chip('用藥小站・藥卡'),
    heading(c.title),
    h('p', {}, c.intro),
    h('h4', { class: 'med-group' }, '四類核心用藥'),
    h('ul', { class: 'med-cards', 'data-med-group': 'core' }, ...c.core.map((x) => medCard(x))),
    h('h4', { class: 'med-group' }, '緩解症狀用'),
    h('ul', { class: 'med-cards', 'data-med-group': 'relief' }, medCard(c.diuretic, 'med-relief')),
    h('p', { class: 'notice', 'data-med': 'note' }, c.note),
    h('div', { class: 'actions' },
      h('button', { type: 'button', class: 'btn btn-primary', 'data-med-action': 'back', onclick: () => o.onBack(false) }, '回到用藥小站')),
  );
  o.container.dataset.med = 'cards';
  focusTop(o.container);
}

// ───── 藥師櫃台：遇到這件事怎麼辦？ ─────
type DeskView =
  | { kind: 'question'; i: number; tried: string[] }
  | { kind: 'answer'; i: number; tried: string[]; choiceId: string }
  | { kind: 'practice' };

function renderDesk(o: MedStationOptions) {
  const d = MED_STATION.desk;
  const list: DeskScenario[] = d.scenarios;
  let view: DeskView = { kind: 'question', i: 0, tried: [] };
  const go = (v: DeskView) => { view = v; draw(); };

  function draw() {
    o.container.replaceChildren();
    o.container.dataset.med = view.kind;
    if (view.kind === 'question') drawQuestion(view);
    else if (view.kind === 'answer') drawAnswer(view);
    else drawPractice();
    focusTop(o.container);
  }

  const header = (i: number) => chip(`${d.title}（${i + 1}／${list.length}）`);

  function demoBag(s: DeskScenario) {
    if (!s.demoBag) return '';
    return h('figure', { class: 'demo-bag', 'data-med': 'demo-bag' },
      h('figcaption', { class: 'demo-bag-badge' }, s.demoBag.label),
      h('dl', {}, ...s.demoBag.rows.flatMap(([k, v]) => [h('dt', {}, k), h('dd', {}, v)])));
  }

  function drawQuestion(v: Extract<DeskView, { kind: 'question' }>) {
    const s = list[v.i];
    o.container.append(
      header(v.i),
      h('h4', { class: 'desk-title' }, `情境｜${s.title}`),
      h('p', { class: 'scenario' }, s.situation),
      demoBag(s),
      heading(s.prompt),
      h('div', { class: 'choices', role: 'group', 'aria-label': '選項' }, ...s.choices.map((c) => {
        const tried = v.tried.includes(c.id);
        return h('button', {
          type: 'button', class: `choice ${tried ? 'tried' : ''}`, 'data-choice': c.id,
          onclick: () => go({ kind: 'answer', i: v.i, tried: c.id === s.bestChoiceId ? v.tried : [...v.tried, c.id], choiceId: c.id }),
        }, c.label, tried ? h('span', { class: 'sr-only' }, '（已試過）') : null);
      })),
      v.i === 0 ? h('p', { class: 'small muted' }, d.intro) : '',
    );
  }

  function drawAnswer(v: Extract<DeskView, { kind: 'answer' }>) {
    const s = list[v.i];
    const c = s.choices.find((x) => x.id === v.choiceId)!;
    const ok = c.id === s.bestChoiceId;
    const last = v.i === list.length - 1;
    const retry = () => go({ kind: 'question', i: v.i, tried: ok ? [] : v.tried });
    const next = () => go(last ? { kind: 'practice' } : { kind: 'question', i: v.i + 1, tried: [] });
    o.container.append(
      header(v.i),
      heading(ok ? '✓ 這樣做比較安全' : '再想一想', ok ? 'ok' : 'retry'),
      h('p', {}, '你選擇的是：', h('strong', {}, c.label)),
      h('p', { class: `feedback ${ok ? 'ok' : 'retry'}` }, h('strong', {}, ok ? '很好。' : '提示：'), c.feedback),
      h('p', { class: 'feedback neutral', 'data-med': 'why' }, h('strong', {}, '原因：'), s.why),
      h('figure', { class: 'talk-card', 'data-med': 'say' }, h('figcaption', {}, '可以這樣跟藥師或個管師說'), h('p', { class: 'talk-card-main' }, s.say)),
      h('div', { class: 'actions' },
        h('button', { type: 'button', class: `btn ${ok ? 'btn-secondary' : 'btn-primary'}`, 'data-med-action': 'retry', onclick: retry }, '再試一次'),
        h('button', { type: 'button', class: `btn ${ok ? 'btn-primary' : 'btn-secondary'}`, 'data-med-action': 'next', onclick: next }, last ? '下一題：說一次' : '下一題')),
    );
    announce(o.live, ok ? '答對了。' : '請看提示，可以再試一次。');
  }

  function drawPractice() {
    const p = MED_STATION.practice;
    o.container.append(
      chip(`${d.title}・最後一步`),
      heading(p.title),
      h('p', {}, '請病人或家屬說一次，可以說給彼此或醫護人員聽。'),
      h('p', { class: 'teach' }, p.question),
      h('p', { class: 'med-frame' }, h('span', { class: 'small muted' }, '可以這樣說：'), h('strong', {}, p.sentenceFrame)),
      h('p', { class: 'small muted' }, '用說的就好，不需要輸入任何資料；這裡不會記錄你的回答。'),
      h('div', { class: 'actions' },
        h('button', { type: 'button', class: 'btn btn-secondary', 'data-med-action': 'restart', onclick: () => go({ kind: 'question', i: 0, tried: [] }) }, '從第一題再玩'),
        h('button', { type: 'button', class: 'btn btn-primary', 'data-med-action': 'practiced', onclick: () => o.onBack(true) }, p.doneLabel)),
    );
  }

  draw();
}
