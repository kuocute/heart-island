// 任務視窗：本站照護重點 → 看情境 → 做選擇 → 看回饋 → 說一次或做一次。
// 有衛教卡的站（返家照護站）：讀衛教卡 → 情境練習 → 看回饋與原因（答錯可重試）→ 答對即完成。
// 一次只呈現目前一步；知識題正誤同時用文字表示；照護偏好題不計分、不儲存選項。
import { CARE_LINKS } from '../content/links';
import { EMBED_ORIGIN, STATION_VIDEO, embedUrl, playerErrorText, youtubeId } from '../content/videos';
import type { Item, LearnerRole, Mission, Prop, Role, Station, StationId } from '../content/types';
import { STATUS_TEXT, stationStatus, type ProgressStore } from '../state/progress';
import { announce, h, openModal, type ModalHandle } from './modal';
import { renderStaffCard } from './staffCard';
import { renderPortalEntry } from './portalEntry';
import { PORTAL_STATION } from '../staff/portal';

type Tab = 'practice' | 'staff';
type Step =
  | { kind: 'intro'; tab: Tab }
  | { kind: 'card' }
  | { kind: 'item'; itemId: string }
  | { kind: 'scenario'; i: number }
  | { kind: 'choose'; i: number; tried: string[]; order: string[] }
  | { kind: 'feedback'; i: number; tried: string[]; choiceId?: string; order?: string[]; correct: boolean | null }
  | { kind: 'teach'; i: number }
  | { kind: 'done' }
  /** 05 出院碼頭：先選語言看照護影片（lang 未選時顯示語言按鈕） */
  | { kind: 'video'; lang?: string };

const STEP_NAMES = ['看情境', '做選擇', '看回饋', '說一次或做一次'];
const CARD_STEP_NAMES = ['讀衛教卡', '情境練習', '看回饋', '完成'];
export const REVIEW_TEXT = '虛構內容・待照護團隊審閱';
export const ROLE_TEXT: Record<Role, string> = { patient: '病友', caregiver: '家屬', staff: '醫護人員' };

export type MissionDialogOptions = {
  station: Station;
  stations: Station[];
  role: Role;
  progress: ProgressStore;
  /** 直接打開某個照護重點（點島上小建築或搜尋結果） */
  itemId?: string;
  opener?: HTMLElement | null;
  returnFocus?: () => HTMLElement | null;
  onClose?: () => void;
  onGoStation?: (id: StationId, itemId?: string) => void;
  onOpenList?: () => void;
};

export function openMissionDialog(o: MissionDialogOptions): ModalHandle {
  const { station, role, progress } = o;
  const byId = new Map(o.stations.map((s) => [s.id, s]));
  progress.markExplored(station.id);
  const modal = openModal({
    title: `${station.no}｜${station.title}`,
    opener: o.opener,
    returnFocus: o.returnFocus,
    onClose: o.onClose,
    className: `mission-modal zone-${station.zone}`,
  });
  modal.el.dataset.station = station.id;
  const live = h('p', { class: 'sr-only', role: 'status', 'aria-live': 'polite' });
  const view = h('div', { class: 'mission-view' });
  modal.body.append(view, live);

  // 醫護人員進入住院區時，預設打開規範卡
  const defaultTab: Tab = role === 'staff' && station.staff && station.zone === 'hospital' ? 'staff' : 'practice';
  const card = station.card;
  let step: Step = o.itemId ? { kind: 'item', itemId: o.itemId } : station.id === STATION_VIDEO.station ? { kind: 'video' } : card ? { kind: 'card' } : { kind: 'intro', tab: defaultTab };
  const go = (s: Step) => { step = s; render(); };
  const missionIndex = (id?: string) => station.missions.findIndex((m) => m.id === id);
  const practiced = (m: Mission) => progress.station(station.id).practiced.includes(m.id);
  /** 開始練習：有衛教卡的站先看卡片 */
  const startMission = (i: number) => go(card ? { kind: 'card' } : { kind: 'scenario', i });
  const reviewTag = () => station.review === 'pending' ? h('p', { class: 'pill review' }, REVIEW_TEXT) : '';

  function stepper(active: number, m: Mission, i: number) {
    return h('div', { class: 'stepper' },
      h('p', { class: 'stepper-title' }, station.missions.length > 1 ? `任務 ${i + 1}／${station.missions.length}：${m.title}` : m.title),
      h('ol', { class: 'steps', 'aria-label': '任務步驟' },
        ...(card ? CARD_STEP_NAMES : STEP_NAMES).map((n, k) => h('li', { class: k === active ? 'on' : k < active ? 'past' : '', 'aria-current': k === active ? 'step' : undefined }, n))),
    );
  }
  const heading = (text: string, cls = '') => h('h3', { class: `step-heading ${cls}`, tabindex: '-1' }, text);
  const back = (label = '回到本站') => h('button', { type: 'button', class: 'btn btn-secondary', onclick: () => go({ kind: 'intro', tab: 'practice' }) }, label);

  function render() {
    view.replaceChildren();
    view.dataset.step = step.kind;
    switch (step.kind) {
      case 'intro': renderIntro(step); break;
      case 'card': renderCard(); break;
      case 'item': renderItem(step.itemId); break;
      case 'scenario': renderScenario(step.i); break;
      case 'choose': renderChoose(step); break;
      case 'feedback': renderFeedback(step); break;
      case 'teach': renderTeach(step.i); break;
      case 'done': renderDone(); break;
      case 'video': renderVideo(step); break;
    }
    const target = view.querySelector<HTMLElement>('.step-heading');
    if (target) requestAnimationFrame(() => target.focus());
  }

  /** 和本站有關的照護串聯線 */
  function linksFor(itemId?: string) {
    return CARE_LINKS.filter((l) => (l.from.station === station.id && (!itemId || l.from.item === itemId)) || (l.to.station === station.id && (!itemId || l.to.item === itemId)))
      .map((l) => {
        const other = l.from.station === station.id ? l.to : l.from;
        const s = byId.get(other.station)!;
        const it = s.items.find((x) => x.id === other.item);
        return { label: l.label, station: s, item: it };
      });
  }
  function linkList(itemId?: string) {
    const links = linksFor(itemId);
    if (!links.length) return '';
    return h('section', { class: 'care-links', 'aria-label': '照護串聯' },
      h('h4', {}, '照護串聯'),
      h('ul', {}, ...links.map((l) => h('li', {},
        h('button', { type: 'button', class: 'link-btn', onclick: () => { modal.close(); o.onGoStation?.(l.station.id, l.item?.id); } },
          h('span', { class: `zone-dot ${l.station.zone}`, 'aria-hidden': 'true' }),
          h('span', {}, h('strong', {}, `${l.station.no} ${l.station.title}`), l.item ? `・${l.item.title}` : ''),
          h('span', { class: 'small muted link-label' }, l.label))))));
  }

  // ───────── 進站 ─────────
  function renderIntro(s: Extract<Step, { kind: 'intro' }>) {
    const tabs: { id: Tab; label: string }[] = [{ id: 'practice', label: role === 'staff' ? '衛教與練習' : '照護與練習' }];
    if (station.staff) tabs.push({ id: 'staff', label: '醫護規範' });
    if (tabs.length > 1) {
      const tablist = h('div', { class: 'tabs', role: 'tablist', 'aria-label': '本站內容', style: `grid-template-columns: repeat(${tabs.length}, 1fr)` },
        ...tabs.map((t) => h('button', {
          type: 'button', role: 'tab', id: `tab-${t.id}`, 'aria-selected': String(t.id === s.tab), 'aria-controls': `panel-${t.id}`,
          tabindex: t.id === s.tab ? '0' : '-1', class: 'tab', onclick: () => go({ kind: 'intro', tab: t.id }),
        }, t.label)));
      tablist.addEventListener('keydown', (e) => {
        const ke = e as KeyboardEvent;
        if (ke.key !== 'ArrowRight' && ke.key !== 'ArrowLeft') return;
        const idx = tabs.findIndex((t) => t.id === s.tab);
        const next = tabs[(idx + (ke.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length];
        go({ kind: 'intro', tab: next.id });
        requestAnimationFrame(() => document.getElementById(`tab-${next.id}`)?.focus());
      });
      view.append(tablist);
    }
    const panel = h('div', { role: tabs.length > 1 ? 'tabpanel' : undefined, id: `panel-${s.tab}`, 'aria-labelledby': tabs.length > 1 ? `tab-${s.tab}` : undefined, class: 'tabpanel' });

    if (s.tab === 'staff' && station.staff) {
      panel.append(heading('醫護規範卡', 'sr-only-heading'), renderStaffCard(station, live));
      view.append(panel);
      return;
    }
    panel.append(
      h('p', { class: `zone-chip ${station.zone}` }, station.zone === 'hospital' ? '住院區' : '居家區', `・${station.subtitle}`),
      heading(station.subtitle, 'sr-only-heading'),
      h('p', { class: 'scene' }, station.scene),
      h('p', { class: 'role-tip' }, h('strong', {}, `${ROLE_TEXT[role]}提示：`), station.roleTips[role]),
      station.id === PORTAL_STATION ? renderPortalEntry() : '',
      station.notice ? h('p', { class: 'notice' }, station.notice) : '',
      h('h4', {}, '本站照護重點'),
      h('ul', { class: 'item-grid' }, ...station.items.map((it, i) => h('li', {},
        h('button', { type: 'button', class: 'item-card', 'data-item': it.id, onclick: () => go({ kind: 'item', itemId: it.id }) },
          h('span', { class: 'item-no', 'aria-hidden': 'true' }, String(i + 1)),
          h('span', { class: 'item-title' }, it.title),
          h('span', { class: 'item-meta' }, it.missionId ? (practiced(station.missions[missionIndex(it.missionId)]) ? '已練習' : '可練習') : '說明'))))),
    );
    if (station.pickMission) panel.append(h('p', { class: 'pick-prompt' }, station.pickMission.prompt));
    panel.append(h('h4', {}, station.pickMission ? '展館' : '練習任務'),
      h('ul', { class: 'mission-list' }, ...station.missions.map((m, i) =>
        h('li', {}, h('button', { type: 'button', class: 'mission-pick', onclick: () => startMission(i) },
          h('span', { class: 'mission-pick-title' }, station.pickMission ? `進入：${m.title}` : `${i + 1}. ${m.title}`),
          h('span', { class: 'mission-pick-meta' }, kindLabel(m), practiced(m) ? ' · 已練習' : ''))))));
    if (!station.pickMission) panel.append(h('button', { type: 'button', class: 'btn btn-primary btn-block', onclick: () => startMission(0) }, card ? '打開衛教卡' : '開始任務'));
    if (station.id === STATION_VIDEO.station) {
      panel.append(h('button', { type: 'button', class: 'btn btn-secondary btn-block', 'data-video': 'again', onclick: () => go({ kind: 'video' }) }, '▶ 再看一次照護影片'));
    }
    panel.append(linkList());
    view.append(panel);
  }

  // ───────── 05 出院碼頭：照護影片（選擇語言只切換影片，不寫入進度） ─────────
  let refocusLang: string | null = null;
  function renderVideo(s: Extract<Step, { kind: 'video' }>) {
    const V = STATION_VIDEO;
    const chosen = V.languages.find((l) => l.id === s.lang);
    view.append(heading(V.title, 'video-title'));
    if (!chosen) {
      view.append(
        h('p', { class: 'video-prompt' }, V.prompt),
        h('div', { class: 'lang-grid', role: 'group', 'aria-label': '選擇影片語言' }, ...V.languages.map((l) =>
          h('button', { type: 'button', class: 'lang-btn', lang: l.lang, 'data-lang': l.id, onclick: () => go({ kind: 'video', lang: l.id }) }, l.label))),
      );
      if (refocusLang) {
        const id = refocusLang;
        refocusLang = null;
        requestAnimationFrame(() => requestAnimationFrame(() => view.querySelector<HTMLElement>(`[data-lang="${id}"]`)?.focus()));
      }
    } else {
      const vid = youtubeId(chosen.url);
      view.append(h('p', { class: 'video-current' }, '影片語言：', h('strong', { lang: chosen.lang }, chosen.label)));
      const status = h('p', { class: 'video-status', role: 'status', 'data-video': 'status', hidden: true });
      if (vid) {
        const frame = h('iframe', {
          src: embedUrl(vid, location.origin), title: `出院照護影片（${chosen.label}）`,
          allow: 'accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen',
          allowfullscreen: true, referrerpolicy: 'strict-origin-when-cross-origin', 'data-video': 'player',
        });
        watchPlayer(frame, status);
        view.append(h('div', { class: 'video-frame' }, frame));
      }
      view.append(status);
      view.append(
        h('div', { class: 'video-actions' },
          h('button', { type: 'button', class: 'btn btn-secondary', 'data-video': 'switch', onclick: () => { refocusLang = chosen.id; go({ kind: 'video' }); } }, '切換語言'),
          h('a', { class: 'btn btn-secondary', href: chosen.url, target: '_blank', rel: 'noopener noreferrer', 'data-video': 'youtube' }, '在 YouTube 開啟', h('span', { class: 'sr-only' }, '（另開新分頁）'))),
        h('p', { class: 'small muted' }, '請按影片上的播放鍵開始觀看。影片無法播放時，請按「在 YouTube 開啟」。'),
      );
      announce(live, `已切換為${chosen.label}影片。`);
    }
    view.append(h('div', { class: 'actions' },
      h('button', { type: 'button', class: 'btn btn-primary btn-block', 'data-video': 'continue', onclick: () => go({ kind: 'intro', tab: defaultTab }) }, V.continueLabel)));
  }

  /**
   * 聽 YouTube 播放器回報（enablejsapi）。錯誤碼 153／101／150 等會顯示在播放器下方；
   * 若播放器一直沒有回應（例如被瀏覽器或網路阻擋），提示改用「在 YouTube 開啟」。
   */
  let stopWatching: (() => void) | null = null;
  function watchPlayer(frame: HTMLIFrameElement, status: HTMLElement) {
    stopWatching?.();
    let ready = false;
    const show = (text: string) => { status.textContent = text; status.hidden = false; frame.dataset.state = 'error'; };
    const onMsg = (e: MessageEvent) => {
      if (e.origin !== EMBED_ORIGIN || e.source !== frame.contentWindow) return;
      let d: { event?: string; info?: unknown };
      try { d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data; } catch { return; }
      if (!d || typeof d !== 'object') return;
      if (d.event === 'onError') show(playerErrorText(Number(d.info)));
      else if (d.event === 'onReady' || d.event === 'initialDelivery' || d.event === 'infoDelivery') {
        if (!ready) { ready = true; frame.dataset.state = frame.dataset.state === 'error' ? 'error' : 'ready'; }
      }
    };
    const hello = () => frame.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 'hf-discharge-video', channel: 'widget' }), EMBED_ORIGIN);
    frame.addEventListener('load', () => { hello(); setTimeout(hello, 400); });
    const timer = window.setTimeout(() => { if (!ready && frame.isConnected && frame.dataset.state !== 'error') show('播放器沒有回應，可能被網路或瀏覽器阻擋。請按「在 YouTube 開啟」觀看。'); }, 12000);
    window.addEventListener('message', onMsg);
    stopWatching = () => { window.removeEventListener('message', onMsg); clearTimeout(timer); };
    const mo = new MutationObserver(() => { if (!frame.isConnected) { stopWatching?.(); stopWatching = null; mo.disconnect(); } });
    mo.observe(document.body, { childList: true, subtree: true });
  }

  // ───────── 照護重點 ─────────
  function renderItem(itemId: string) {
    const it = station.items.find((x) => x.id === itemId) as Item | undefined;
    if (!it) { go({ kind: 'intro', tab: 'practice' }); return; }
    const mi = missionIndex(it.missionId);
    view.append(
      h('p', { class: `zone-chip ${station.zone}` }, `本站照護重點 ${station.items.indexOf(it) + 1}／${station.items.length}`),
      heading(it.title),
      h('p', { class: 'item-summary' }, it.summary),
      linkList(it.id),
      h('div', { class: 'actions' }, back('看本站全部重點'),
        mi >= 0 ? h('button', { type: 'button', class: 'btn btn-primary', onclick: () => startMission(mi) }, '練習這一題') : ''),
    );
  }

  // ───────── 衛教卡（抵達後直接打開） ─────────
  function renderCard() {
    if (!card) return;
    const m = station.missions[0];
    view.append(
      h('p', { class: `zone-chip ${station.zone}` }, station.zone === 'hospital' ? '住院區' : '居家區', `・${station.subtitle}`),
      reviewTag(),
      stepper(0, m, 0),
      h('section', { class: 'care-card', 'aria-labelledby': 'care-card-title' },
        h('h3', { class: 'step-heading', id: 'care-card-title', tabindex: '-1' }, card.title),
        h('p', { class: 'care-card-summary' }, card.summary),
        h('ul', { class: 'care-card-points' }, ...card.points.map((p) => h('li', {}, p))),
        card.note ? h('p', { class: 'notice' }, card.note) : ''),
      practiced(m) ? h('p', { class: 'pill ok' }, '本站已完成，可以再練習一次') : '',
      h('div', { class: 'actions' },
        h('button', { type: 'button', class: 'btn btn-secondary', onclick: () => go({ kind: 'intro', tab: 'practice' }) }, '看本站重點'),
        h('button', { type: 'button', class: 'btn btn-primary', onclick: () => go({ kind: 'choose', i: 0, tried: [], order: [] }) }, '開始情境練習')),
    );
  }

  // ───────── 看情境 ─────────
  function renderScenario(i: number) {
    const m = station.missions[i];
    view.append(stepper(0, m, i), heading('情境'), h('p', { class: 'scenario' }, m.scenario));
    if (m.prop) view.append(renderProp(m.prop));
    view.append(h('div', { class: 'actions' },
      h('button', { type: 'button', class: 'btn btn-primary', onclick: () => go({ kind: 'choose', i, tried: [], order: [] }) }, '下一步：做選擇')));
  }

  // ───────── 做選擇 ─────────
  function renderChoose(s: Extract<Step, { kind: 'choose' }>) {
    const m = station.missions[s.i];
    if (card) view.append(reviewTag(), stepper(1, m, s.i), h('h3', { class: 'step-heading', tabindex: '-1' }, '情境'), h('p', { class: 'scenario' }, m.scenario), h('p', { class: 'pick-prompt' }, m.question));
    else view.append(stepper(1, m, s.i), heading(m.question));
    if (m.prop && m.prop.kind === 'sheet') view.append(renderProp(m.prop, true));
    if (m.interaction === 'reflection') view.append(h('p', { class: 'pill' }, '照護偏好題・沒有對錯・不計分'));

    if (m.interaction === 'sequence') {
      const picked = s.order;
      const list = h('ol', { class: 'seq-picked', 'aria-label': '你排的順序' },
        ...picked.map((id) => h('li', {}, m.choices.find((c) => c.id === id)!.label)));
      if (!picked.length) list.append(h('li', { class: 'muted placeholder' }, '尚未選擇'));
      const opts = h('div', { class: 'choices' }, ...m.choices.map((c) => h('button', {
        type: 'button', class: 'choice', disabled: picked.includes(c.id),
        onclick: () => go({ ...s, order: [...picked, c.id] }),
      }, picked.includes(c.id) ? `${c.label}（第 ${picked.indexOf(c.id) + 1} 步）` : c.label)));
      view.append(h('p', { class: 'small muted' }, '依序點選步驟：'), opts, h('h4', {}, '你排的順序'), list,
        h('div', { class: 'actions' },
          h('button', { type: 'button', class: 'btn btn-secondary', disabled: !picked.length, onclick: () => go({ ...s, order: [] }) }, '重新排'),
          h('button', {
            type: 'button', class: 'btn btn-primary', disabled: picked.length !== m.choices.length,
            onclick: () => go({ kind: 'feedback', i: s.i, tried: s.tried, order: picked, correct: picked.join('|') === m.correctOrder.join('|') }),
          }, '確認順序')));
      return;
    }

    view.append(h('div', { class: 'choices', role: 'group', 'aria-label': '選項' }, ...m.choices.map((c) => {
      const tried = s.tried.includes(c.id);
      return h('button', {
        type: 'button', class: `choice ${tried ? 'tried' : ''}`,
        onclick: () => {
          const correct = m.interaction === 'quiz' ? c.id === m.correctChoiceId : null;
          go({ kind: 'feedback', i: s.i, tried: correct === false ? [...s.tried, c.id] : s.tried, choiceId: c.id, correct });
        },
      }, c.label, tried ? h('span', { class: 'sr-only' }, '（已試過）') : null);
    })));
  }

  // ───────── 看回饋 ─────────
  function renderFeedback(s: Extract<Step, { kind: 'feedback' }>) {
    const m = station.missions[s.i];
    view.append(stepper(2, m, s.i));
    const next = h('button', { type: 'button', class: 'btn btn-primary', onclick: () => go({ kind: 'teach', i: s.i }) }, '下一步：說一次或做一次');

    if (m.interaction === 'reflection') {
      const c = m.choices.find((x) => x.id === s.choiceId)!;
      view.append(heading('謝謝你的分享'), h('p', {}, '你選擇的是：', h('strong', {}, c.label)), h('p', { class: 'feedback neutral' }, c.feedback));
      if (m.conversationCard) {
        view.append(h('figure', { class: 'talk-card' },
          h('figcaption', {}, m.conversationCard),
          h('p', { class: 'talk-card-main' }, c.label),
          h('p', { class: 'small' }, '我希望一起參與的人：＿＿＿＿＿＿'),
          h('p', { class: 'small' }, '我想先問醫師的是：＿＿＿＿＿＿'),
          h('p', { class: 'small muted' }, '這張卡只顯示在畫面上，不會被儲存。可以抄在紙上帶去和家人、醫師談。')));
      }
      view.append(h('div', { class: 'actions' }, h('button', { type: 'button', class: 'btn btn-secondary', onclick: () => go({ kind: 'choose', i: s.i, tried: [], order: [] }) }, '換一個選項'), next));
      announce(live, `你選擇了：${c.label}。這題沒有對錯。`);
      return;
    }

    const ok = !!s.correct;
    let fb = '';
    if (m.interaction === 'quiz') fb = m.choices.find((x) => x.id === s.choiceId)!.feedback;
    else fb = ok ? `順序正確：${m.correctOrder.map((id) => m.choices.find((c) => c.id === id)!.label).join(' → ')}。` : m.retryHint;
    view.append(
      heading(ok ? '✓ 答對了' : '✗ 再想想', ok ? 'ok' : 'retry'),
      m.interaction === 'sequence' && s.order
        ? h('p', {}, '你排的順序：', s.order.map((id) => m.choices.find((c) => c.id === id)!.label).join(' → '))
        : h('p', {}, '你選擇的是：', h('strong', {}, m.choices.find((x) => x.id === s.choiceId)!.label)),
      h('p', { class: `feedback ${ok ? 'ok' : 'retry'}` }, h('strong', {}, ok ? '正確。' : card ? '原因：' : '提示：'), fb),
    );
    if (card) {
      if (ok) {
        progress.setPracticed(station.id, m.id, true);
        view.append(
          h('p', { class: 'pill ok' }, '✓ 本站已完成'),
          h('p', { class: 'small muted' }, '答對後自動標記為「已完成」，只記錄在這台裝置上，不代表醫療人員已確認示教能力。'),
          h('div', { class: 'actions' }, h('button', { type: 'button', class: 'btn btn-primary btn-lg', onclick: () => modal.close() }, '返回地圖')));
        announce(live, '答對了，本站已完成。');
      } else {
        view.append(h('div', { class: 'actions' },
          h('button', { type: 'button', class: 'btn btn-secondary', onclick: () => go({ kind: 'card' }) }, '再看一次衛教卡'),
          h('button', { type: 'button', class: 'btn btn-primary', onclick: () => go({ kind: 'choose', i: s.i, tried: s.tried, order: [] }) }, '再試一次')));
        announce(live, '答錯了，請看原因後再試一次。');
      }
      return;
    }
    view.append(h('div', { class: 'actions' }, ok ? next : h('button', {
      type: 'button', class: 'btn btn-primary', onclick: () => go({ kind: 'choose', i: s.i, tried: s.tried, order: [] }),
    }, '再試一次')));
    announce(live, ok ? '答對了。' : '答錯了，請看提示後再試一次。');
  }

  // ───────── 說一次或做一次 ─────────
  function renderTeach(i: number) {
    const m = station.missions[i];
    const done = practiced(m);
    const after = () => {
      const last = i === station.missions.length - 1 || station.pickMission;
      go(last ? { kind: 'done' } : { kind: 'scenario', i: i + 1 });
    };
    const learner = (r: LearnerRole) => h('p', { class: 'teach' }, m.teachBack[r]);
    view.append(stepper(3, m, i), heading(role === 'caregiver' ? '家屬練習：說一次或做一次' : role === 'staff' ? '請病友與家屬說一次或做一次' : '說一次或做一次'));
    if (role === 'staff') {
      view.append(h('h4', {}, '病友版'), learner('patient'), h('h4', {}, '家屬版'), learner('caregiver'));
    } else view.append(learner(role));
    view.append(
      h('p', { class: 'small muted' }, '「已練習」由使用者自己勾選，只記錄在這台裝置上，不代表醫療人員已確認示教能力。'),
      done ? h('p', { class: 'pill ok' }, '這個任務之前已標記為「已練習」') : '',
      h('div', { class: 'actions' },
        h('button', { type: 'button', class: 'btn btn-secondary', onclick: () => { progress.setPracticed(station.id, m.id, false); announce(live, '已標記為稍後再練。'); after(); } }, '稍後再練'),
        h('button', { type: 'button', class: 'btn btn-primary', onclick: () => { progress.setPracticed(station.id, m.id, true); announce(live, '已標記為已練習。'); after(); } }, '已練習')));
  }

  // ───────── 完成 ─────────
  function renderDone() {
    const p = progress.station(station.id);
    const ids = station.missions.map((m) => m.id);
    const st = stationStatus(p, ids);
    const n = ids.filter((id) => p.practiced.includes(id)).length;
    const idx = o.stations.findIndex((s) => s.id === station.id);
    const next = o.stations[idx + 1];
    view.append(heading('本站完成'),
      h('p', {}, `本站狀態：${STATUS_TEXT[st]}（已練習 ${n}／${ids.length}，使用者自填）`),
      station.pickMission && n < ids.length ? h('button', { type: 'button', class: 'btn btn-secondary btn-block', onclick: () => go({ kind: 'intro', tab: 'practice' }) }, '參觀另一個展館') : '',
      next ? h('button', { type: 'button', class: 'btn btn-secondary btn-block', onclick: () => { modal.close(); o.onGoStation?.(next.id); } }, `下一站：${next.no} ${next.title}`) : '',
      linkList(),
      h('div', { class: 'actions' },
        h('button', { type: 'button', class: 'btn btn-secondary', onclick: () => { modal.close(); o.onOpenList?.(); } }, '站點清單'),
        h('button', { type: 'button', class: 'btn btn-primary', onclick: () => modal.close() }, '回到島圖')));
  }

  render();
  return modal;
}

function kindLabel(m: Mission) {
  return m.interaction === 'quiz' ? '知識題' : m.interaction === 'sequence' ? '排序題' : '照護偏好・不計分';
}

function renderProp(p: Prop, compact = false): HTMLElement {
  if (p.kind === 'sheet') {
    return h('figure', { class: `prop-sheet ${compact ? 'compact' : ''}` },
      h('figcaption', {}, h('span', {}, p.title), h('span', { class: 'badge' }, p.badge)),
      h('table', {}, h('tbody', {}, ...p.rows.map((r) => h('tr', {}, h('th', { scope: 'row' }, r.label), h('td', {}, r.value))))));
  }
  if (p.kind === 'stages') {
    return h('ol', { class: 'stage-cards' }, ...p.items.map((it) => h('li', {}, h('h4', {}, it.title), h('p', {}, it.text))));
  }
  // LVAD 示意圖（原創簡化圖，不代表任何廠牌）
  const fig = h('figure', { class: 'prop-lvad' });
  fig.innerHTML = `<svg viewBox="0 0 320 170" role="img" aria-labelledby="lvad-t">
    <title id="lvad-t">左心室輔助器示意圖：身體內的幫浦經由導線連到體外的控制器，控制器接兩顆電池。</title>
    <path d="M60 20c14 0 22 10 22 22s-8 22-22 22-22-10-22-22 8-22 22-22zM28 70h64l10 90H18z" fill="#e7eef5" stroke="#8aa4bd" stroke-width="2"/>
    <path d="M62 92c8-6 16 0 12 8-3 6-12 10-12 10s-9-4-12-10c-4-8 4-14 12-8z" fill="#e27c7c"/>
    <circle cx="62" cy="116" r="7" fill="#4f86c6"/>
    <path d="M66 122 C 90 150, 130 150, 160 112" fill="none" stroke="#3b3a36" stroke-width="3"/>
    <rect x="160" y="92" width="56" height="40" rx="8" fill="#fff" stroke="#3d6fa8" stroke-width="3"/>
    <rect x="170" y="102" width="36" height="12" rx="3" fill="#bfe0f5"/>
    <path d="M216 104 h26 M216 120 h26" stroke="#3b3a36" stroke-width="3"/>
    <rect x="242" y="92" width="58" height="20" rx="5" fill="#fff" stroke="#6bbf74" stroke-width="3"/>
    <rect x="242" y="116" width="58" height="20" rx="5" fill="#fff" stroke="#6bbf74" stroke-width="3"/>
    <g font-size="14" font-weight="700" fill="#fff"><circle cx="188" cy="80" r="11" fill="#3d6fa8"/><text x="184" y="85">1</text>
    <circle cx="271" cy="78" r="11" fill="#4c9a57"/><text x="267" y="83">2</text>
    <circle cx="112" cy="156" r="11" fill="#3b3a36"/><text x="108" y="161">3</text></g>
  </svg>`;
  fig.append(h('ol', { class: 'lvad-legend' },
    h('li', {}, h('strong', {}, '控制器：'), '顯示裝置狀態，必要時發出提示聲。'),
    h('li', {}, h('strong', {}, '電池：'), '提供電力，需要充電與更換。'),
    h('li', {}, h('strong', {}, '導線：'), '從身體連到控制器，出口處需要照護。')),
    h('figcaption', { class: 'small muted' }, '簡化示意圖，不代表任何廠牌。實際操作由團隊用實機教學。'));
  return fig;
}
