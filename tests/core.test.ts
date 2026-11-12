import { describe, expect, it } from 'vitest';
import { STATIONS } from '../src/content/stations';
import { STATION_IDS, validateLinks, validateStations } from '../src/content/validate';
import { CARE_LINKS, PHASES } from '../src/content/links';
import { searchStations } from '../src/content/search';
import { EDGES, NODES, START_NODE, TILES } from '../src/game/mapData';
import { Navigator, shortestPath, type NavEvent } from '../src/game/navigation';
import { ProgressStore, STORAGE_KEY, stationStatus } from '../src/state/progress';
import type { Station } from '../src/content/types';

const graph = { nodes: NODES, edges: EDGES };

describe('衛教內容驗證', () => {
  it('15 站內容、串聯線、照護階段通過驗證', () => {
    expect(validateStations(STATIONS, new Set(Object.keys(NODES)))).toEqual([]);
    expect(validateLinks(CARE_LINKS, PHASES, STATIONS)).toEqual([]);
    expect(STATIONS).toHaveLength(15);
    expect(STATIONS.filter((s) => s.zone === 'hospital').map((s) => s.id)).toEqual(['admission', 'ward', 'team', 'discharge-prep', 'discharge']);
    expect(STATIONS.map((s) => s.id).sort()).toEqual([...STATION_IDS].sort());
  });
  it('quiz 缺正確選項、sequence 順序不完整、reflection 有正解都會被擋下', () => {
    const bad = structuredClone(STATIONS) as Station[];
    const quiz = bad[0].missions[0] as unknown as Record<string, unknown>;
    quiz.correctChoiceId = 'nope';
    const seq = bad.find((s) => s.id === 'weight')!.missions[0] as unknown as Record<string, unknown>;
    seq.correctOrder = ['measure'];
    const refl = bad.find((s) => s.id === 'long-term-care')!.missions[0] as unknown as Record<string, unknown>;
    refl.correctChoiceId = 'daily';
    const errs = validateStations(bad).join('\n');
    expect(errs).toContain('correctChoiceId「nope」');
    expect(errs).toContain('correctOrder 必須剛好包含');
    expect(errs).toContain('反思題不可有正確答案');
  });
  it('返家照護站：衛教卡＋一題知識題，標示待照護團隊審閱', () => {
    const hc = STATIONS.find((s) => s.id === 'home-care')!;
    expect(hc.card?.points.length).toBeGreaterThan(0);
    expect(hc.review).toBe('pending');
    expect(hc.missions).toHaveLength(1);
    expect(hc.missions[0].interaction).toBe('quiz');
    // 有衛教卡的站多一題會被擋下
    const bad = structuredClone(STATIONS) as Station[];
    const b = bad.find((s) => s.id === 'home-care')!;
    b.missions.push({ ...b.missions[0], id: 'extra' });
    expect(validateStations(bad).join('\n')).toContain('只能有一個知識題');
  });
  it('進階醫療港有兩個展館任務並先選展館', () => {
    const adv = STATIONS.find((s) => s.id === 'advanced-hf')!;
    expect(adv.missions).toHaveLength(2);
    expect(adv.pickMission).toBeTruthy();
  });
  it('住院區每站都有醫護規範卡，查詢文字要求列出來源並標示待確認', () => {
    for (const s of STATIONS.filter((x) => x.zone === 'hospital')) expect(s.staff?.query).toMatch(/來源、版本與頁碼.*待確認/);
    for (const s of STATIONS) if (s.staff) expect(s.staff.query).toMatch(/待確認/);
  });
  it('搜尋可用俗稱找到照護重點', () => {
    const r = searchStations(STATIONS, '腳腫');
    expect(r.some((x) => x.station.id === 'warning' && x.item?.id === 'observe')).toBe(true);
    expect(searchStations(STATIONS, '藥盒').some((x) => x.station.id === 'medication')).toBe(true);
    expect(searchStations(STATIONS, '')).toEqual([]);
  });
  it('串聯線把住院區連到居家區', () => {
    const cross = CARE_LINKS.filter((l) => STATIONS.find((s) => s.id === l.from.station)!.zone !== STATIONS.find((s) => s.id === l.to.station)!.zone);
    expect(cross.length).toBeGreaterThanOrEqual(8);
  });
});

describe('03 跨團隊照護站：和照護團隊一起想辦法', () => {
  it('保留原有任務，新增團隊練習；三步內容完整，全程虛構', () => {
    const team = STATIONS.find((s) => s.id === 'team')!;
    expect(team.missions.map((m) => m.id)).toEqual(['team-who', 'team-together']);
    const m = team.missions[1];
    expect(m.interaction).toBe('team');
    if (m.interaction !== 'team') return;
    expect(m.title).toBe('和照護團隊一起想辦法');
    expect(m.question).toBe('你會怎麼向照護團隊開口？');
    expect(m.choices).toHaveLength(3);
    expect(m.choices.find((c) => c.id === m.bestChoiceId)?.label).toContain('能不能請你陪我確認');
    expect(m.explainParts.map((p) => p.label)).toEqual(['遇到什麼困難', '什麼時候會發生', '希望得到什麼協助']);
    expect(m.helpers.map((x) => x.role)).toEqual(['藥師', '個管師', '家屬']);
    expect(m.practiceQuestions).toEqual(['回家後，你會怎麼確認要吃哪包藥？', '如果還是不確定，你會怎麼求助？']);
    expect(m.sentenceFrame).toBe('我會先＿＿＿。如果還是不確定，我會找＿＿＿幫忙。');
    expect(m.nextStep.map((x) => x.label)).toEqual(['我會做什麼', '誰能協助', '何時再確認']);
  });
  it('團隊練習的 bestChoiceId 必須在選項中', () => {
    const bad = structuredClone(STATIONS);
    const m = bad.find((s) => s.id === 'team')!.missions[1] as { bestChoiceId: string };
    m.bestChoiceId = 'nope';
    expect(validateStations(bad).join('\n')).toContain('bestChoiceId');
  });
  it('05 出院碼頭仍負責出院資料、回診日期與聯絡方式', () => {
    const d = STATIONS.find((s) => s.id === 'discharge')!;
    expect(d.items.map((i) => i.id)).toEqual(['followup-date', 'contact', 'my-plan']);
  });
});

describe('05 出院碼頭照護影片', () => {
  it('五種語言、按鈕文字與 YouTube 網址正確', async () => {
    const { STATION_VIDEO, youtubeId, embedUrl } = await import('../src/content/videos');
    expect(STATION_VIDEO.station).toBe('discharge');
    expect(STATION_VIDEO.title).toBe('出院前，請選擇您想觀看的影片語言');
    expect(STATION_VIDEO.continueLabel).toBe('繼續回覆示教');
    expect(STATION_VIDEO.languages.map((l) => [l.label, l.url])).toEqual([
      ['中文', 'https://youtu.be/CVxv18oN3IE'],
      ['한국어', 'https://youtu.be/-uMzUK6rr74'],
      ['Tiếng Việt', 'https://youtu.be/egGDlRvgJEQ'],
      ['English', 'https://youtu.be/-LxkYPScxt0'],
      ['Bahasa Indonesia', 'https://youtu.be/vILaVEThvz0'],
    ]);
    expect(STATION_VIDEO.languages.map((l) => youtubeId(l.url))).toEqual(['CVxv18oN3IE', '-uMzUK6rr74', 'egGDlRvgJEQ', '-LxkYPScxt0', 'vILaVEThvz0']);
    expect(youtubeId('https://www.youtube.com/watch?v=CVxv18oN3IE')).toBe('CVxv18oN3IE');
    expect(youtubeId('https://example.com/x')).toBeNull();
    expect(embedUrl('CVxv18oN3IE')).not.toMatch(/autoplay=1/);
    expect(embedUrl('CVxv18oN3IE')).toMatch(/^https:\/\/www\.youtube\.com\/embed\/CVxv18oN3IE\?/);
    expect(new URL(embedUrl('CVxv18oN3IE', 'https://kuocute.github.io')).searchParams.get('origin')).toBe('https://kuocute.github.io');
    expect(new URL(embedUrl('CVxv18oN3IE', 'null')).searchParams.has('origin')).toBe(false);
  });
});

describe('YouTube 播放器錯誤說明', () => {
  it('153、101／150 都有對應的說明', async () => {
    const { playerErrorText } = await import('../src/content/videos');
    expect(playerErrorText(153)).toContain('網站來源');
    expect(playerErrorText(150)).toContain('擁有者不允許');
    expect(playerErrorText(101)).toContain('擁有者不允許');
  });
});

describe('步道路網', () => {
  it('每一站入口都能從起點走到', () => {
    for (const s of STATIONS) expect(shortestPath(graph, START_NODE, s.entryNodeId)).not.toBeNull();
    for (const id of STATION_IDS) expect(TILES.some((t) => t.id === id)).toBe(true);
  });
  it('心形島：從住院區到居家區要經過心尖的「返家照護站」', () => {
    const p = shortestPath(graph, 'discharge', 'weight')!;
    expect(p.some((n) => n.startsWith('home-care'))).toBe(true);
    expect(p.at(-1)).toBe('weight');
    expect(TILES).toHaveLength(21);
    // 住院區在左、居家區在右
    const hx = TILES.filter((t) => t.look === 'hospital').map((t) => t.x);
    const mx = TILES.filter((t) => t.look === 'home').map((t) => t.x);
    expect(Math.max(...hx)).toBeLessThan(Math.min(...mx));
  });
  it('走路途中連續點兩個不同站，只抵達最後選擇的站，且先走完目前這一段', () => {
    const events: NavEvent[] = [];
    const nav = new Navigator(graph, 'admission', 200, (e) => events.push(e));
    nav.goTo('discharge', 'discharge');
    nav.update(100); // 走在 admission→stairsTop 這段
    const seg = nav.segment;
    expect(seg?.from).toBe('admission');
    nav.goTo('warning', 'warning');
    nav.goTo('palliative', 'palliative');
    expect(nav.segment).toEqual(seg); // 目前這段不中斷
    for (let i = 0; i < 1200; i++) nav.update(50);
    const arrivals = events.filter((e) => e.type === 'arrive');
    expect(arrivals).toEqual([{ type: 'arrive', stationId: 'palliative' }]);
    expect(nav.node).toBe('palliative');
  });
  it('減少動態效果：直接抵達', () => {
    const events: NavEvent[] = [];
    const nav = new Navigator(graph, 'admission', 200, (e) => events.push(e));
    nav.goTo('weight', 'weight', { instant: true });
    expect(events.at(-1)).toEqual({ type: 'arrive', stationId: 'weight' });
    expect(nav.pos).toEqual(NODES.weight);
  });
});

describe('探索狀態', () => {
  const mem = () => {
    const m = new Map<string, string>();
    return { getItem: (k: string) => m.get(k) ?? null, setItem: (k: string, v: string) => void m.set(k, v), removeItem: (k: string) => void m.delete(k), m };
  };
  it('儲存、重新載入、重置', () => {
    const st = mem();
    const a = new ProgressStore(STATION_IDS, st);
    a.setRole('caregiver');
    a.markExplored('discharge');
    a.setPracticed('discharge', 'discharge-followup', true);
    const b = new ProgressStore(STATION_IDS, st);
    expect(b.role).toBe('caregiver');
    expect(b.station('discharge').practiced).toEqual(['discharge-followup']);
    b.reset();
    expect(st.m.has(STORAGE_KEY)).toBe(false);
    expect(new ProgressStore(STATION_IDS, st).role).toBeNull();
  });
  it('只存允許的欄位', () => {
    const st = mem();
    const a = new ProgressStore(STATION_IDS, st);
    a.setRole('patient');
    a.setPracticed('weight', 'weight-card', true);
    const saved = JSON.parse(st.m.get(STORAGE_KEY)!);
    expect(Object.keys(saved).sort()).toEqual(['lastStation', 'role', 'stations', 'version', 'welcomeSeen']);
    expect(Object.keys(saved.stations.weight).sort()).toEqual(['explored', 'practiced']);
  });
  it('進島提示看過一次就不再出現，重置後恢復', () => {
    const st = mem();
    const a = new ProgressStore(STATION_IDS, st);
    expect(a.welcomeSeen).toBe(false);
    a.setWelcomeSeen();
    expect(new ProgressStore(STATION_IDS, st).welcomeSeen).toBe(true);
    a.reset();
    expect(new ProgressStore(STATION_IDS, st).welcomeSeen).toBe(false);
  });
  it('儲存失敗仍可遊玩', () => {
    const broken = { getItem: () => { throw new Error('x'); }, setItem: () => { throw new Error('quota'); }, removeItem: () => {} };
    const a = new ProgressStore(STATION_IDS, broken);
    a.setRole('patient');
    expect(a.saveOk).toBe(false);
    expect(a.role).toBe('patient');
  });
  it('站點狀態', () => {
    expect(stationStatus({ explored: false, practiced: [] }, ['a'])).toBe('new');
    expect(stationStatus({ explored: true, practiced: [] }, ['a'])).toBe('explored');
    expect(stationStatus({ explored: true, practiced: ['a'] }, ['a'])).toBe('practiced');
  });
});

import { checkPortalUrl } from '../src/staff/portalUrl';

describe('醫護人員專區入口網址', () => {
  it('未設定時回傳 null（畫面顯示「尚未開放」）', () => {
    expect(checkPortalUrl(undefined)).toBeNull();
    expect(checkPortalUrl('  ')).toBeNull();
  });
  it('接受需院內帳號登入的 https 入口', () => {
    expect(checkPortalUrl('https://intranet.example.org/hf/guidelines')).toEqual({ ok: true, url: 'https://intranet.example.org/hf/guidelines' });
    expect(checkPortalUrl('https://contoso.sharepoint.com/sites/HF/SitePages/Home.aspx')?.ok).toBe(true);
  });
  it('拒絕 NotebookLM、Google 文件、匿名分享、非 https、帶帳密或邀請碼的網址', () => {
    for (const bad of [
      'https://notebooklm.google.com/notebook/abc',
      'https://docs.google.com/document/d/abc',
      'https://drive.google.com/file/d/abc',
      'https://1drv.ms/b/s!abc',
      'https://contoso.sharepoint.com/sites/HF/_layouts/15/guestaccess.aspx?share=abc',
      'https://onedrive.live.com/redir?resid=abc&authkey=xyz',
      'http://intranet.example.org/hf',
      'https://user:pass@intranet.example.org/hf',
      'https://intranet.example.org/hf?invite=1234',
      'https://intranet.example.org/hf?token=abc',
      'not a url',
    ]) expect(checkPortalUrl(bad)?.ok, bad).toBe(false);
  });
});

import { SDM_CARD } from '../src/content/sdm';
import sdmCardSrc from '../src/ui/sdmCard.ts?raw';

describe('醫病共享決策（SDM）引導卡', () => {
  it('放在 14 進階心衰醫療港，文字與網址正確', () => {
    expect(SDM_CARD.station).toBe('advanced-hf');
    expect(STATIONS.find((s) => s.id === SDM_CARD.station)?.no).toBe('14');
    expect(SDM_CARD.title).toBe('先和醫療團隊談談你的照護選擇');
    expect(SDM_CARD.text).toBe('面對下一步的照護，你最在意什麼？可以和家人一起使用這個工具，把想問的問題記下來，下次與醫療團隊討論。');
    expect(SDM_CARD.primaryLabel).toBe('開始醫病共享決策（SDM）');
    expect(SDM_CARD.secondaryLabel).toBe('先了解照護選項');
    const u = new URL(SDM_CARD.url);
    expect(u.protocol).toBe('https:');
    expect(u.hostname).toBe('apps.chimei.org.tw');
    expect(SDM_CARD.url).toBe('https://apps.chimei.org.tw/sdm/survey_doit.aspx?X=c6zuS');
  });
  it('引導卡只提供入口，不會寫入任何進度', () => {
    expect(sdmCardSrc).not.toMatch(/progress|setPracticed|markExplored|localStorage/);
  });
});
