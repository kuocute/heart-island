// 3D 島圖座標資料。修改站點位置、步道或島嶼時，只需改這個檔案。
// 每一站是一座低多邊形六角島，島與島之間用木橋相連。
// 座標：x 向東（右），y 為南北（數字越大越靠近畫面下方，3D 中即 z 軸）；單位為世界像素。
// 網址加 ?debug=1 會顯示步道節點與連線。
import type { StationId, Zone } from '../content/types';

/** 六角島：R 為半徑（平頂六角形，左右是尖角）；THICK 為島的厚度 */
export const HEX = { R: 112, THICK: 34 };
/** 各區的島頂高度（住院區略高，形成高低差） */
export const ZONE_HEIGHT: Record<Zone, number> = { hospital: 16, home: 0 };
export const SEA_LEVEL = -26;

export type Tile = {
  /** 站點 id；裝飾島用 'decor-*' */
  id: StationId | `decor-${string}`;
  x: number;
  y: number;
  zone: Zone;
};

/** 14 座站點島＋1 座裝飾島（醫院主樓）。 */
export const TILES: Tile[] = [
  // 住院區
  { id: 'admission', x: 230, y: 250, zone: 'hospital' },
  { id: 'ward', x: 520, y: 296, zone: 'hospital' },
  { id: 'team', x: 810, y: 250, zone: 'hospital' },
  { id: 'discharge-prep', x: 810, y: 500, zone: 'hospital' },
  { id: 'discharge', x: 520, y: 546, zone: 'hospital' },
  { id: 'decor-hospital', x: 230, y: 500, zone: 'hospital' },
  // 居家區（隔著一道海峽）
  { id: 'weight', x: 230, y: 880, zone: 'home' },
  { id: 'medication', x: 520, y: 926, zone: 'home' },
  { id: 'diet', x: 810, y: 880, zone: 'home' },
  { id: 'activity', x: 810, y: 1130, zone: 'home' },
  { id: 'warning', x: 520, y: 1176, zone: 'home' },
  { id: 'follow-up', x: 230, y: 1130, zone: 'home' },
  { id: 'long-term-care', x: 230, y: 1380, zone: 'home' },
  { id: 'palliative', x: 520, y: 1426, zone: 'home' },
  { id: 'advanced-hf', x: 810, y: 1380, zone: 'home' },
];

export const tileOf = (id: string) => {
  const t = TILES.find((x) => x.id === id);
  if (!t) throw new Error(`找不到島 ${id}`);
  return t;
};
export const tileHeight = (t: Tile) => ZONE_HEIGHT[t.zone];

/** 照護重點小屋在島上的位置（相對島中心），依 items 順序使用；排在島的前緣，避開步道。 */
export const ITEM_SLOTS: [number, number][] = [[-56, 72], [56, 72], [-22, 90], [22, 90]];

/** 相鄰的島（雙向）。long: 跨海峽的出院橋。 */
export const TILE_LINKS: { a: string; b: string; long?: boolean }[] = [
  { a: 'admission', b: 'ward' },
  { a: 'ward', b: 'team' },
  { a: 'team', b: 'discharge-prep' },
  { a: 'discharge-prep', b: 'discharge' },
  { a: 'decor-hospital', b: 'discharge' },
  { a: 'admission', b: 'decor-hospital' },
  { a: 'discharge', b: 'medication', long: true },
  { a: 'weight', b: 'medication' },
  { a: 'medication', b: 'diet' },
  { a: 'diet', b: 'activity' },
  { a: 'warning', b: 'activity' },
  { a: 'follow-up', b: 'warning' },
  { a: 'weight', b: 'follow-up' },
  { a: 'medication', b: 'warning' },
  { a: 'follow-up', b: 'long-term-care' },
  { a: 'warning', b: 'palliative' },
  { a: 'long-term-care', b: 'palliative' },
  { a: 'palliative', b: 'advanced-hf' },
  { a: 'activity', b: 'advanced-hf' },
];

/**
 * 步道路網（自動產生）：
 * 每座島有三個節點：入口（島的正前方，站點 id 本身）、左側「id:L」、右側「id:R」。
 * 左右相鄰的島用「右側→左側」的木橋連接；上下相鄰的島沿左側步道連接，避免穿過建築。
 */
export const NODES: Record<string, { x: number; y: number }> = {};
export const NODE_TILE: Record<string, string> = {};
export const EDGES: { a: string; b: string; kind?: 'bridge' | 'long' | 'path' }[] = [];
for (const t of TILES) {
  NODES[t.id] = { x: t.x, y: t.y + 56 };
  NODES[`${t.id}:L`] = { x: t.x - 90, y: t.y + 18 };
  NODES[`${t.id}:R`] = { x: t.x + 90, y: t.y + 18 };
  for (const k of [t.id, `${t.id}:L`, `${t.id}:R`]) NODE_TILE[k] = t.id;
  EDGES.push({ a: t.id, b: `${t.id}:L`, kind: 'path' }, { a: t.id, b: `${t.id}:R`, kind: 'path' });
}
for (const l of TILE_LINKS) {
  const A = tileOf(l.a), B = tileOf(l.b);
  const horizontal = Math.abs(B.x - A.x) > Math.abs(B.y - A.y);
  if (horizontal) {
    const [left, right] = A.x < B.x ? [A, B] : [B, A];
    EDGES.push({ a: `${left.id}:R`, b: `${right.id}:L`, kind: l.long ? 'long' : 'bridge' });
  } else {
    EDGES.push({ a: `${A.id}:L`, b: `${B.id}:L`, kind: l.long ? 'long' : 'bridge' });
  }
}

/** 角色出發點：醫院主樓大門（旁邊就是 01 入院評估花園） */
export const START_NODE = 'decor-hospital';

/** 名稱標籤的 3D 位置（島的後上方） */
export const labelAnchor = (t: Tile) => ({ x: t.x, y: t.y - 40, h: tileHeight(t) + 74 });

/** 區域標示 */
export const ZONE_SIGNS: { zone: Zone; title: string; sub: string; x: number; y: number; h: number }[] = [
  { zone: 'hospital', title: '住院區', sub: '醫護人員可查看規範', x: 520, y: 120, h: 40 },
  { zone: 'home', title: '居家區', sub: '病友與家屬的照護練習', x: 520, y: 740, h: 10 },
];

/** 小船固定航線（沿海峽來回） */
export const BOAT_ROUTE: [number, number][] = [[-60, 700], [330, 740], [700, 690], [1100, 730], [700, 760], [330, 690]];

/** 全景時要放進畫面的範圍 */
export const ISLAND_BOUNDS = { x: 100, y: 130, w: 840, h: 1410 };
