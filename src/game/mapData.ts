// 3D 島圖座標資料：21 座六角島緊密相連，拼成一顆心。
// 左半邊是住院區（入院到出院），心尖是「回家之門」，右半邊是居家區。
// 修改站點位置：改下方 CELLS 的 [欄, 列] 即可；步道會依相鄰關係自動產生。
// 座標：x 向東（右），y 為南北（數字越大越靠近畫面下方，3D 中即 z 軸）；單位為世界像素。
import type { StationId, Zone } from '../content/types';

/** 六角島：R 為半徑（平頂六角形，左右是尖角） */
export const HEX = { R: 112 };
export type Look = 'hospital' | 'plaza' | 'home';
/** 各區的島頂高度（左高、中間、右低，形成梯田般的高低差） */
export const LOOK_HEIGHT: Record<Look, number> = { hospital: 18, plaza: 9, home: 0 };
export const SEA_LEVEL = -26;

export type Tile = {
  /** 站點 id；裝飾島用 'decor-*' */
  id: StationId | `decor-${string}`;
  q: number;
  r: number;
  x: number;
  y: number;
  zone: Zone;
  look: Look;
};

const COL_W = HEX.R * 1.5;
const ROW_H = HEX.R * Math.sqrt(3);
const cellXY = (q: number, r: number) => ({ x: q * COL_W, y: r * ROW_H + (q % 2 ? ROW_H / 2 : 0) });

/** [欄 q, 列 r]：奇數欄往下錯開半格。 */
const CELLS: [Tile['id'], number, number, Look][] = [
  // 左半心：住院區（外圈走一圈：醫院大門 → 01 → 02 → 03 → 04 → 05）
  ['decor-hospital', 2, 0, 'hospital'],
  ['admission', 1, 0, 'hospital'],
  ['ward', 0, 1, 'hospital'],
  ['team', 0, 2, 'hospital'],
  ['discharge-prep', 1, 2, 'hospital'],
  ['discharge', 2, 3, 'hospital'],
  ['decor-garden', 1, 1, 'hospital'],
  ['decor-ambulance', 2, 1, 'hospital'],
  ['decor-park', 2, 2, 'hospital'],
  // 中線：心心廣場、小山丘、心尖的回家之門
  ['decor-heart', 3, 1, 'plaza'],
  ['decor-hill', 3, 2, 'plaza'],
  ['decor-gate', 3, 3, 'plaza'],
  // 右半心：居家區（從心尖往上：06 → 07 → 08 → 09 → 10 → 11，再到內圈 12 → 13 → 14）
  ['weight', 4, 3, 'home'],
  ['medication', 5, 2, 'home'],
  ['diet', 6, 2, 'home'],
  ['activity', 6, 1, 'home'],
  ['warning', 5, 0, 'home'],
  ['follow-up', 4, 0, 'home'],
  ['long-term-care', 4, 1, 'home'],
  ['palliative', 5, 1, 'home'],
  ['advanced-hf', 4, 2, 'home'],
];

export const TILES: Tile[] = CELLS.map(([id, q, r, look]) => ({ id, q, r, ...cellXY(q, r), look, zone: look === 'home' ? 'home' : 'hospital' }));

export const tileOf = (id: string) => {
  const t = TILES.find((x) => x.id === id);
  if (!t) throw new Error(`找不到島 ${id}`);
  return t;
};
export const tileHeight = (t: Tile) => LOOK_HEIGHT[t.look];

/** 照護重點小屋在島上的位置（相對島中心），依 items 順序使用；排在島的前緣。 */
export const ITEM_SLOTS: [number, number][] = [[-58, 70], [58, 70], [-24, 84], [24, 84]];

/** 兩格是否相鄰（平頂、奇數欄下移） */
function neighbors(a: Tile, b: Tile) {
  if (a.q === b.q) return Math.abs(a.r - b.r) === 1;
  if (Math.abs(a.q - b.q) !== 1) return false;
  const odd = a.q % 2 === 1;
  return odd ? b.r === a.r || b.r === a.r + 1 : b.r === a.r || b.r === a.r - 1;
}

/**
 * 步道路網（自動產生）：
 * 每座島內有一圈步道節點：入口（正前方，站點 id 本身）、左、右、左後、右後，繞過中央建築。
 * 相鄰兩島在共用邊的中點設「通道」節點，連到兩邊最近的步道節點。
 */
export const NODES: Record<string, { x: number; y: number }> = {};
export const NODE_H: Record<string, number> = {};
export const EDGES: { a: string; b: string; kind?: 'path' | 'link' }[] = [];
const RING: [string, number, number][] = [['', 0, 56], [':L', -80, 12], [':R', 80, 12], [':BL', -46, -72], [':BR', 46, -72]];
for (const t of TILES) {
  for (const [suf, dx, dy] of RING) {
    NODES[t.id + suf] = { x: t.x + dx, y: t.y + dy };
    NODE_H[t.id + suf] = tileHeight(t);
  }
  for (const [a, b] of [['', ':L'], ['', ':R'], [':L', ':BL'], [':R', ':BR'], [':BL', ':BR']]) EDGES.push({ a: t.id + a, b: t.id + b, kind: 'path' });
}
const nearestRing = (t: Tile, x: number, y: number) =>
  RING.map(([suf]) => t.id + suf).sort((p, q) => Math.hypot(NODES[p].x - x, NODES[p].y - y) - Math.hypot(NODES[q].x - x, NODES[q].y - y))[0];
for (let i = 0; i < TILES.length; i++) for (let j = i + 1; j < TILES.length; j++) {
  const A = TILES[i], B = TILES[j];
  if (!neighbors(A, B) && !neighbors(B, A)) continue;
  const gate = `gate:${A.id}|${B.id}`;
  const gx = (A.x + B.x) / 2, gy = (A.y + B.y) / 2;
  NODES[gate] = { x: gx, y: gy };
  NODE_H[gate] = (tileHeight(A) + tileHeight(B)) / 2;
  EDGES.push({ a: nearestRing(A, gx, gy), b: gate, kind: 'link' }, { a: gate, b: nearestRing(B, gx, gy), kind: 'link' });
}

/** 角色出發點：醫院主樓大門（旁邊就是 01 入院評估花園） */
export const START_NODE = 'decor-hospital';

/** 名稱標籤的 3D 位置（島的後上方） */
export const labelAnchor = (t: Tile) => ({ x: t.x, y: t.y - 30, h: tileHeight(t) + 70 });

/** 區域標示（放在心的左右兩側海上） */
export const ZONE_SIGNS: { zone: Zone; title: string; sub: string; x: number; y: number; h: number }[] = [
  { zone: 'hospital', title: '住院區', sub: '醫護人員可查看規範', x: 180, y: -190, h: 30 },
  { zone: 'home', title: '居家區', sub: '病友與家屬的照護練習', x: 840, y: -190, h: 20 },
];

/** 小船固定航線（繞著心形外海一圈） */
export const BOAT_ROUTE: [number, number][] = [[-260, 200], [-200, 600], [200, 860], [504, 980], [820, 860], [1220, 600], [1270, 200], [1000, -230], [504, -120], [0, -230]];

/** 全景時要放進畫面的範圍（所有島的外框） */
export const ISLAND_BOUNDS = (() => {
  const xs = TILES.map((t) => t.x), ys = TILES.map((t) => t.y);
  const x = Math.min(...xs) - HEX.R, y = Math.min(...ys) - HEX.R;
  return { x, y, w: Math.max(...xs) + HEX.R - x, h: Math.max(...ys) + HEX.R - y };
})();
