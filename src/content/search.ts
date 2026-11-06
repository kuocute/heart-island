// 關鍵字搜尋：站名、短名、副標、照護重點（標題、說明、關鍵字）與任務標題。
import type { Item, Station } from './types';

export type SearchResult = { station: Station; item?: Item; why: string };

const norm = (s: string) => s.toLowerCase().replace(/[\s　、，。・（）()「」]/g, '');

export function searchStations(stations: Station[], query: string): SearchResult[] {
  const q = norm(query);
  if (!q) return [];
  const out: SearchResult[] = [];
  for (const s of stations) {
    const stationHit = [s.title, s.shortName, s.subtitle].some((t) => norm(t).includes(q));
    const itemHits = s.items.filter((it) => [it.title, it.summary, ...it.keywords].some((t) => norm(t).includes(q)));
    for (const it of itemHits) out.push({ station: s, item: it, why: it.title });
    if (!itemHits.length) {
      const m = s.missions.find((x) => norm(x.title).includes(q));
      if (stationHit) out.push({ station: s, why: s.subtitle });
      else if (m) out.push({ station: s, why: `練習：${m.title}` });
    }
  }
  return out;
}
