// 08 低鹽餐桌：「今天外食，怎麼點？」
// 情境選單（四個按鈕）→ 情境題（我會怎麼做）→ 回饋（一句話說明差別＋可以對店家說的話／購買技巧）→
// 口頭回覆示教（句型）→「我練習好了」回到餐桌。
// 不寫入進度、不收集任何輸入；限鹽與水分提醒沿用本站原有文案。
import { EATING_OUT, packageSodium, type DemoLabel, type EatOutQuestion, type EatOutScene } from '../content/eatingOut';
import { announce, h } from './modal';

type View =
  | { kind: 'menu' }
  | { kind: 'question'; scene: EatOutScene['id']; q: number; tried: string[] }
  | { kind: 'answer'; scene: EatOutScene['id']; q: number; tried: string[]; choiceId: string }
  | { kind: 'practice' };

export type EatingOutOptions = {
  container: HTMLElement;
  live: HTMLElement;
  /** 本站原有的限鹽與水分提醒 */
  notice?: string;
  /** 「我練習好了」或「回到餐桌」 */
  onBackToTable: (practiced: boolean) => void;
};

const scenes = EATING_OUT.scenes;

export function renderEatingOut(o: EatingOutOptions) {
  /** 這次開啟時已完成的情境（只存在記憶體，不寫入進度） */
  const done = new Set<EatOutScene['id']>();
  let view: View = { kind: 'menu' };

  const heading = (text: string, cls = '') => h('h3', { class: `step-heading ${cls}`, tabindex: '-1' }, text);
  const notice = () => (o.notice ? h('p', { class: 'notice', 'data-eatout': 'notice' }, o.notice) : '');
  const go = (v: View) => { view = v; draw(); };

  function draw() {
    o.container.replaceChildren();
    o.container.dataset.eatout = view.kind;
    switch (view.kind) {
      case 'menu': drawMenu(); break;
      case 'question': drawQuestion(view); break;
      case 'answer': drawAnswer(view); break;
      case 'practice': drawPractice(); break;
    }
    const target = o.container.querySelector<HTMLElement>('.step-heading');
    if (target) requestAnimationFrame(() => { target.focus(); target.scrollIntoView({ block: 'nearest' }); });
  }

  function sceneHeader(s: EatOutScene, q: number) {
    return h('p', { class: 'zone-chip home' }, `${EATING_OUT.title}・${s.label}`, s.questions.length > 1 ? `（${q + 1}／${s.questions.length}）` : '');
  }

  // ───── 四個情境按鈕 ─────
  function drawMenu() {
    const all = done.size === scenes.length;
    o.container.append(
      h('p', { class: 'zone-chip home' }, '低鹽餐桌・外食練習'),
      heading(EATING_OUT.title),
      h('p', {}, EATING_OUT.intro),
      h('div', { class: 'eatout-grid', role: 'group', 'aria-label': '外食情境' }, ...scenes.map((s) =>
        h('button', { type: 'button', class: `eatout-btn ${done.has(s.id) ? 'done' : ''}`, 'data-scene': s.id, onclick: () => go({ kind: 'question', scene: s.id, q: 0, tried: [] }) },
          h('span', { class: 'eatout-icon', 'aria-hidden': 'true' }, s.icon),
          h('span', {}, s.label),
          done.has(s.id) ? h('span', { class: 'eatout-done' }, '✓ 練習過') : ''))),
      h('p', { class: 'small muted' }, all ? '四個情境都練習過了，最後用自己的話說一次。' : `已練習 ${done.size}／${scenes.length} 個情境。可以照自己常去的店家挑著練習。`),
      notice(),
      h('div', { class: 'actions' },
        h('button', { type: 'button', class: 'btn btn-secondary', 'data-eatout-action': 'back', onclick: () => o.onBackToTable(false) }, '回到餐桌'),
        h('button', { type: 'button', class: `btn ${all ? 'btn-primary' : 'btn-secondary'}`, 'data-eatout-action': 'practice', onclick: () => go({ kind: 'practice' }) }, '最後一步：說一次')),
    );
  }

  // ───── 我會怎麼做 ─────
  function drawQuestion(v: Extract<View, { kind: 'question' }>) {
    const s = scenes.find((x) => x.id === v.scene)!;
    const q = s.questions[v.q];
    o.container.append(
      sceneHeader(s, v.q),
      h('p', { class: 'scenario' }, v.q === 0 ? `${s.intro}${q.situation}` : q.situation),
      q.labels ? labelCompare(q.labels, false) : '',
      heading(q.prompt),
      h('div', { class: 'choices', role: 'group', 'aria-label': '選項' }, ...q.choices.map((c) => {
        const tried = v.tried.includes(c.id);
        return h('button', {
          type: 'button', class: `choice ${tried ? 'tried' : ''}`, 'data-choice': c.id,
          onclick: () => go({ kind: 'answer', scene: v.scene, q: v.q, tried: c.id === q.bestChoiceId ? v.tried : [...v.tried, c.id], choiceId: c.id }),
        }, c.label, tried ? h('span', { class: 'sr-only' }, '（已試過）') : null);
      })),
      h('div', { class: 'actions' },
        h('button', { type: 'button', class: 'btn btn-secondary', 'data-eatout-action': 'menu', onclick: () => go({ kind: 'menu' }) }, '回到四個情境')),
    );
  }

  // ───── 回饋：一句話說明差別＋對店家說的話／購買技巧 ─────
  function drawAnswer(v: Extract<View, { kind: 'answer' }>) {
    const s = scenes.find((x) => x.id === v.scene)!;
    const q: EatOutQuestion = s.questions[v.q];
    const c = q.choices.find((x) => x.id === v.choiceId)!;
    const ok = c.id === q.bestChoiceId;
    const last = v.q === s.questions.length - 1;
    if (ok && last) done.add(s.id);
    const next = () => (last ? go({ kind: 'menu' }) : go({ kind: 'question', scene: v.scene, q: v.q + 1, tried: [] }));
    o.container.append(
      sceneHeader(s, v.q),
      heading(ok ? '✓ 這樣選比較少鹽' : '再想一想', ok ? 'ok' : 'retry'),
      h('p', {}, '你選擇的是：', h('strong', {}, c.label)),
      h('p', { class: `feedback ${ok ? 'ok' : 'retry'}` }, h('strong', {}, ok ? '很好。' : '提示：'), c.feedback),
      h('p', { class: 'feedback neutral', 'data-eatout': 'why' }, h('strong', {}, '差別在哪裡：'), q.why),
      q.labels ? labelCompare(q.labels, true) : '',
      q.say ? h('figure', { class: 'talk-card eatout-say', 'data-eatout': 'say' }, h('figcaption', {}, '可以直接對店家說'), h('p', { class: 'talk-card-main' }, q.say)) : '',
      q.tip ? h('figure', { class: 'talk-card eatout-tip', 'data-eatout': 'tip' }, h('figcaption', {}, '試試這個技巧'), h('p', { class: 'talk-card-main' }, q.tip)) : '',
      h('div', { class: 'actions' },
        ok
          ? h('button', { type: 'button', class: 'btn btn-secondary', 'data-eatout-action': 'reselect', onclick: () => go({ kind: 'question', scene: v.scene, q: v.q, tried: [] }) }, '重新選擇')
          : h('button', { type: 'button', class: 'btn btn-secondary', 'data-eatout-action': 'menu', onclick: () => go({ kind: 'menu' }) }, '回到四個情境'),
        ok
          ? h('button', { type: 'button', class: 'btn btn-primary', 'data-eatout-action': 'next', onclick: next }, last ? '回到四個情境' : '下一個狀況')
          : h('button', { type: 'button', class: 'btn btn-primary', 'data-eatout-action': 'reselect', onclick: () => go({ kind: 'question', scene: v.scene, q: v.q, tried: v.tried }) }, '再選一次')),
    );
    announce(o.live, ok ? '答對了。' : '請看提示後再選一次。');
  }

  // ───── 示範用營養標示（虛構） ─────
  function labelCompare(labels: DemoLabel[], showCalc: boolean) {
    return h('div', { class: 'demo-labels', 'data-eatout': showCalc ? 'calc' : 'labels' }, ...labels.map((l) =>
      h('section', { class: 'demo-label', 'aria-label': `${l.id} ${l.name} 營養標示（示範用）` },
        h('p', { class: 'demo-badge' }, '示範用・虛構'),
        h('h4', {}, `${l.id}　${l.name}`),
        h('table', {},
          h('caption', { class: 'sr-only' }, `${l.name} 營養標示（示範用）`),
          h('tbody', {},
            h('tr', {}, h('th', { scope: 'row' }, '每一份量'), h('td', {}, `${l.servingGrams} 公克`)),
            h('tr', {}, h('th', { scope: 'row' }, '本包裝含'), h('td', {}, `${l.servings} 份`)),
            h('tr', { class: 'sodium-row' }, h('th', { scope: 'row' }, '鈉（每份）'), h('td', {}, `${l.sodiumPerServing} 毫克`)))),
        showCalc ? h('p', { class: 'demo-calc', 'data-calc': l.id }, '整包：', h('strong', {}, `${l.sodiumPerServing} 毫克 × ${l.servings} 份 = ${packageSodium(l)} 毫克`)) : '')),
      h('p', { class: 'small muted demo-note' }, '示範用的虛構數字，只用來練習看標示，不是真實商品，也不代表建議攝取量。'));
  }

  // ───── 口頭回覆示教 ─────
  function drawPractice() {
    const p = EATING_OUT.practice;
    o.container.append(
      h('p', { class: 'zone-chip home' }, `${EATING_OUT.title}・最後一步`),
      heading(p.title),
      h('p', {}, '請病人或家屬說一次，可以說給彼此或醫護人員聽。'),
      h('p', { class: 'teach eatout-question' }, p.question),
      h('p', { class: 'eatout-frame' }, h('span', { class: 'small muted' }, '可以這樣說：'), h('strong', {}, p.sentenceFrame)),
      h('p', { class: 'small muted' }, '用說的就好，不需要輸入任何資料；這裡不會記錄你的回答。'),
      notice(),
      h('div', { class: 'actions' },
        h('button', { type: 'button', class: 'btn btn-secondary', 'data-eatout-action': 'menu', onclick: () => go({ kind: 'menu' }) }, '回到四個情境'),
        h('button', { type: 'button', class: 'btn btn-primary', 'data-eatout-action': 'practiced', onclick: () => o.onBackToTable(true) }, p.doneLabel)),
    );
  }

  draw();
}
