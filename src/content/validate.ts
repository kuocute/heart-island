// 執行期資料驗證：確保 quiz 必有正確選項、sequence 必有正確順序、reflection 無正誤。
// TypeScript 的可辨識聯集會在編譯時擋掉大部分錯誤；這裡再檢查「選項 id 是否存在」等編譯器看不到的問題。
import type { CareLink, Phase, Station, StationId } from './types';

export const STATION_IDS: StationId[] = [
  'admission', 'ward', 'team', 'discharge-prep', 'discharge',
  'home-care',
  'weight', 'medication', 'diet', 'activity', 'warning', 'follow-up', 'long-term-care', 'palliative', 'advanced-hf',
];

export function validateStations(stations: Station[], nodeIds?: Set<string>): string[] {
  const errors: string[] = [];
  const seenStations = new Set<string>();
  const seenMissions = new Set<string>();

  for (const s of stations) {
    const where = `站點 ${s.id}`;
    if (!STATION_IDS.includes(s.id)) errors.push(`${where}：未知的站點 id`);
    if (seenStations.has(s.id)) errors.push(`${where}：站點 id 重複`);
    seenStations.add(s.id);
    if (!s.title.trim()) errors.push(`${where}：缺少標題`);
    if (nodeIds && !nodeIds.has(s.entryNodeId)) errors.push(`${where}：entryNodeId「${s.entryNodeId}」不在路網中`);
    if (s.missions.length === 0) errors.push(`${where}：至少需要一個任務`);
    if (s.zone === 'hospital' && !s.staff) errors.push(`${where}：住院區每站都要有醫護人員規範卡`);
    if (s.staff && !s.staff.query.trim()) errors.push(`${where}：缺少醫療人員查詢文字`);
    if (!s.roleTips.patient || !s.roleTips.caregiver || !s.roleTips.staff) errors.push(`${where}：三種角色都要有進站提示`);
    if (!s.shortName.trim() || s.shortName.length > 4) errors.push(`${where}：shortName 需為 1–4 字`);
    if (!s.phases.length) errors.push(`${where}：至少屬於一個照護階段`);
    const itemIds = s.items.map((i) => i.id);
    if (new Set(itemIds).size !== itemIds.length) errors.push(`${where}：照護重點 id 重複`);
    if (s.items.length < 1 || s.items.length > 4) errors.push(`${where}：照護重點建議 1–4 項（島上小建築的數量）`);
    if (s.card) {
      if (s.missions.length !== 1 || s.missions[0].interaction !== 'quiz') errors.push(`${where}：有衛教卡的站點只能有一個知識題`);
      if (!s.card.title.trim() || !s.card.summary.trim()) errors.push(`${where}：衛教卡缺少標題或導言`);
      if (s.card.points.length < 1 || s.card.points.length > 5) errors.push(`${where}：衛教卡重點需 1–5 項`);
    }
    for (const it of s.items) if (it.missionId && !s.missions.some((m) => m.id === it.missionId)) errors.push(`${where}：照護重點 ${it.id} 的 missionId「${it.missionId}」不在本站任務中`);

    for (const m of s.missions) {
      const mw = `${where} / 任務 ${m.id}`;
      if (seenMissions.has(m.id)) errors.push(`${mw}：任務 id 重複`);
      seenMissions.add(m.id);
      if (!m.teachBack.patient?.trim() || !m.teachBack.caregiver?.trim()) errors.push(`${mw}：兩種角色都要有示教文字`);
      const ids = m.choices.map((c) => c.id);
      if (new Set(ids).size !== ids.length) errors.push(`${mw}：選項 id 重複`);
      if (m.choices.length < 2) errors.push(`${mw}：至少需要兩個選項`);
      for (const c of m.choices) if (!c.label.trim() || !c.feedback.trim()) errors.push(`${mw}：選項 ${c.id} 缺少文字或回饋`);

      // 用 unknown 讀取，才能抓到「不該出現的欄位」
      const raw = m as unknown as Record<string, unknown>;
      switch (m.interaction) {
        case 'quiz':
          if (!m.correctChoiceId) errors.push(`${mw}：知識題必須有 correctChoiceId`);
          else if (!ids.includes(m.correctChoiceId)) errors.push(`${mw}：correctChoiceId「${m.correctChoiceId}」不在選項中`);
          if ('correctOrder' in raw) errors.push(`${mw}：知識題不應有 correctOrder`);
          break;
        case 'sequence':
          if (!Array.isArray(m.correctOrder) || m.correctOrder.length === 0) errors.push(`${mw}：排序題必須有 correctOrder`);
          else {
            if (m.correctOrder.length !== ids.length || m.correctOrder.some((id) => !ids.includes(id)))
              errors.push(`${mw}：correctOrder 必須剛好包含每個選項一次`);
          }
          if (!m.retryHint?.trim()) errors.push(`${mw}：排序題需要 retryHint`);
          if ('correctChoiceId' in raw) errors.push(`${mw}：排序題不應有 correctChoiceId`);
          break;
        case 'reflection':
          if ('correctChoiceId' in raw || 'correctOrder' in raw) errors.push(`${mw}：反思題不可有正確答案`);
          break;
        case 'team':
          if (!ids.includes(m.bestChoiceId)) errors.push(`${mw}：bestChoiceId「${m.bestChoiceId}」不在選項中`);
          if ('correctChoiceId' in raw || 'correctOrder' in raw) errors.push(`${mw}：團隊練習請用 bestChoiceId`);
          if (!m.voices.length || m.voices.some((v) => !v.who.trim() || !v.text.trim())) errors.push(`${mw}：團隊練習需要情境對話`);
          if (!m.explain.trim() || m.explainParts.length < 1) errors.push(`${mw}：團隊練習需要說明`);
          if (m.helpers.length < 2 || m.helpers.some((x) => !x.role.trim() || !x.text.trim())) errors.push(`${mw}：團隊練習至少需要兩個協助角色`);
          if (!m.practiceQuestions.length || !m.sentenceFrame.trim()) errors.push(`${mw}：團隊練習需要口頭練習問題與句型`);
          if (m.nextStep.length < 1) errors.push(`${mw}：團隊練習需要「我的下一步」提示`);
          if (s.card) errors.push(`${mw}：有衛教卡的站點不可放團隊練習`);
          break;
        default:
          errors.push(`${mw}：未知的 interaction`);
      }
    }
  }
  for (const id of STATION_IDS) if (!seenStations.has(id)) errors.push(`缺少站點 ${id}`);
  return errors;
}

export function validateLinks(links: CareLink[], phases: Phase[], stations: Station[]): string[] {
  const errors: string[] = [];
  const byId = new Map(stations.map((s) => [s.id, s]));
  links.forEach((l, i) => {
    for (const end of [l.from, l.to]) {
      const s = byId.get(end.station);
      if (!s) errors.push(`串聯線 ${i + 1}：未知站點 ${end.station}`);
      else if (!s.items.some((it) => it.id === end.item)) errors.push(`串聯線 ${i + 1}：${end.station} 沒有照護重點 ${end.item}`);
    }
    if (l.from.station === l.to.station) errors.push(`串聯線 ${i + 1}：兩端不可是同一站`);
  });
  const phaseIds = new Set(phases.map((p) => p.id));
  for (const s of stations) for (const p of s.phases) if (!phaseIds.has(p)) errors.push(`站點 ${s.id}：未知的照護階段 ${p}`);
  for (const p of phases) if (!stations.some((s) => s.phases.includes(p.id))) errors.push(`照護階段 ${p.id} 沒有任何站點`);
  return errors;
}
