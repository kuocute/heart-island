// 低多邊形 3D 模型：島上建築、小屋、樹木、小船等，全部用程式產生（原創，無外部模型檔）。
// 單位與 mapData.ts 相同（世界像素）；y 向上，z 向南（畫面下方）。
// 修改某一站的外觀：找到下方 STATION_MODELS 裡對應的函式即可。
import * as THREE from 'three';

// ───────── 基本工具 ─────────
export function mat(color: THREE.ColorRepresentation, extra: THREE.MeshStandardMaterialParameters = {}) {
  return new THREE.MeshStandardMaterial({ color, flatShading: true, roughness: 0.85, metalness: 0, ...extra });
}

type Pos = { x?: number; y?: number; z?: number; ry?: number };
function place<T extends THREE.Object3D>(o: T, p: Pos = {}): T {
  o.position.set(p.x ?? 0, p.y ?? 0, p.z ?? 0);
  if (p.ry) o.rotation.y = p.ry;
  return o;
}
function m(geo: THREE.BufferGeometry, color: THREE.ColorRepresentation, p: Pos = {}, shadow = true) {
  const mesh = place(new THREE.Mesh(geo, mat(color)), p);
  mesh.castShadow = shadow;
  mesh.receiveShadow = true;
  return mesh;
}
/** 長方體，y 為底部高度 */
export function box(w: number, h: number, d: number, color: THREE.ColorRepresentation, p: Pos = {}) {
  const g = new THREE.BoxGeometry(w, h, d);
  g.translate(0, h / 2, 0);
  return m(g, color, p);
}
export function cyl(rt: number, rb: number, h: number, seg: number, color: THREE.ColorRepresentation, p: Pos = {}) {
  const g = new THREE.CylinderGeometry(rt, rb, h, seg);
  g.translate(0, h / 2, 0);
  return m(g, color, p);
}
/** 斜屋頂（三角柱），屋脊沿 x 方向 */
export function gable(w: number, d: number, rise: number, color: THREE.ColorRepresentation, p: Pos = {}) {
  const s = new THREE.Shape();
  s.moveTo(-d / 2 - 3, 0); s.lineTo(d / 2 + 3, 0); s.lineTo(0, rise); s.lineTo(-d / 2 - 3, 0);
  const g = new THREE.ExtrudeGeometry(s, { depth: w + 6, bevelEnabled: false });
  g.translate(0, 0, -(w + 6) / 2);
  g.rotateY(Math.PI / 2);
  return m(g, color, p);
}
/** 四角錐屋頂 */
export function pyramid(size: number, rise: number, color: THREE.ColorRepresentation, p: Pos = {}) {
  const g = new THREE.ConeGeometry(size * 0.75, rise, 4);
  g.rotateY(Math.PI / 4);
  g.translate(0, rise / 2, 0);
  return m(g, color, p);
}
/** 牆面窗戶：face 為 'front'（+z）或 'right'（+x） */
export function windows(w: number, d: number, rows: number[], cols: number, color: THREE.ColorRepresentation, face: 'front' | 'right', o: Pos = {}, size = 8) {
  const g = new THREE.Group();
  const span = face === 'front' ? w : d;
  for (const y of rows) for (let i = 0; i < cols; i++) {
    const t = -span / 2 + ((i + 0.5) * span) / cols;
    const win = box(face === 'front' ? size : 1.2, size, face === 'front' ? 1.2 : size, color, face === 'front' ? { x: t, y, z: d / 2 + 0.4 } : { x: w / 2 + 0.4, y, z: t });
    win.castShadow = false;
    win.userData.glow = true; // 夜晚會亮
    g.add(win);
  }
  return place(g, o);
}
/** 簡單房子：牆＋斜屋頂＋門窗 */
export function house(w: number, h: number, d: number, wall: THREE.ColorRepresentation, roof: THREE.ColorRepresentation, p: Pos = {}, door: THREE.ColorRepresentation = '#a46f45') {
  const g = new THREE.Group();
  g.add(box(w, h, d, wall));
  g.add(gable(w, d, Math.min(w, d) * 0.45, roof, { y: h }));
  g.add(box(w * 0.18, h * 0.6, 1.4, door, { x: -w * 0.2, z: d / 2 + 0.3 }));
  g.add(windows(w, d, [h * 0.45], 1, '#ffe7a6', 'front', { x: w * 0.22 }, Math.min(9, h * 0.3)));
  g.add(windows(w, d, [h * 0.45], 1, '#cfe8f3', 'right', {}, Math.min(9, h * 0.3)));
  return place(g, p);
}
export function tree(kind: 'round' | 'pine', p: Pos = {}, s = 1, tone: THREE.ColorRepresentation = kind === 'pine' ? '#4f8f5b' : '#5f9e4f') {
  const g = new THREE.Group();
  g.add(cyl(2.2 * s, 2.8 * s, 12 * s, 5, '#8a5a3b'));
  if (kind === 'pine') {
    g.add(m(new THREE.ConeGeometry(13 * s, 22 * s, 6).translate(0, 22 * s, 0), tone));
    g.add(m(new THREE.ConeGeometry(10 * s, 18 * s, 6).translate(0, 32 * s, 0), tone));
  } else {
    g.add(m(new THREE.IcosahedronGeometry(13 * s, 0).translate(0, 23 * s, 0), tone));
  }
  return place(g, p);
}
export function bush(p: Pos = {}, tone: THREE.ColorRepresentation = '#78b35e') {
  return m(new THREE.IcosahedronGeometry(6, 0).scale(1.2, 0.7, 1).translate(0, 3, 0), tone, p);
}
export function flowers(p: Pos = {}) {
  const g = new THREE.Group();
  ['#f4a7b9', '#ffd166', '#c3a6ff', '#ffffff', '#f28f8f'].forEach((c, i) =>
    g.add(m(new THREE.IcosahedronGeometry(2, 0).translate(-8 + i * 4, 1.5, (i % 2) * 3), c, {}, false)));
  return place(g, p);
}
export function bench(p: Pos = {}) {
  const g = new THREE.Group();
  g.add(box(18, 2, 6, '#c98b5a', { y: 5 }));
  g.add(box(18, 5, 1.5, '#b97b4c', { y: 7, z: -2.5 }));
  g.add(box(2, 5, 5, '#6b5b4c', { x: -7 }), box(2, 5, 5, '#6b5b4c', { x: 7 }));
  return place(g, p);
}
export function personFig(color: THREE.ColorRepresentation, p: Pos = {}) {
  const g = new THREE.Group();
  g.add(cyl(3.6, 4.4, 11, 7, color));
  g.add(m(new THREE.IcosahedronGeometry(4, 1).translate(0, 15, 0), '#f5d0b5'));
  return place(g, p);
}

/** 路燈（夜晚會亮） */
export function lampPost(p: Pos = {}) {
  const g = new THREE.Group();
  g.add(cyl(0.9, 1.1, 22, 5, '#4b5563'));
  const bulb = m(new THREE.IcosahedronGeometry(3, 0).translate(0, 24, 0), '#fff1b8', {}, false);
  bulb.userData.glow = true;
  g.add(bulb);
  return place(g, p);
}
/** 會在步道上走動的小人（顏色隨機） */
export function walker(color: THREE.ColorRepresentation) {
  return G(cyl(2.6, 3.2, 8, 6, color), m(new THREE.IcosahedronGeometry(3, 0).translate(0, 11, 0), '#f5d0b5'));
}
function textTexture(text: string, bg = '#ffffff', fg = '#2f7f78') {
  const c = document.createElement('canvas');
  c.width = 512; c.height = 128;
  const x = c.getContext('2d')!;
  x.fillStyle = bg; x.beginPath(); x.roundRect(4, 4, 504, 120, 40); x.fill();
  x.strokeStyle = fg; x.lineWidth = 8; x.stroke();
  x.fillStyle = fg; x.font = 'bold 64px system-ui, "PingFang TC", "Noto Sans TC", sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText(text, 256, 68);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
function heartShape(s: number) {
  const h = new THREE.Shape();
  h.moveTo(0, -10 * s);
  h.bezierCurveTo(-16 * s, 2 * s, -10 * s, 14 * s, 0, 7 * s);
  h.bezierCurveTo(10 * s, 14 * s, 16 * s, 2 * s, 0, -10 * s);
  return h;
}

// ───────── 招牌圖示（畫在 canvas 上，原創向量） ─────────
export type IconKind = 'heart' | 'bed' | 'pill' | 'clock' | 'phone' | 'check' | 'H' | 'battery' | 'leaf' | 'scale' | 'card';
const iconCache = new Map<string, THREE.CanvasTexture>();
export function iconTexture(kind: IconKind, color = '#3e8c86') {
  const key = `${kind}|${color}`;
  if (iconCache.has(key)) return iconCache.get(key)!;
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const x = c.getContext('2d')!;
  x.fillStyle = '#ffffff';
  x.strokeStyle = color;
  x.lineWidth = 8;
  x.beginPath(); x.roundRect(8, 8, 112, 112, 26); x.fill(); x.stroke();
  x.fillStyle = color; x.strokeStyle = color; x.lineCap = 'round'; x.lineJoin = 'round';
  const heart = (cx: number, cy: number, s: number) => {
    x.beginPath(); x.moveTo(cx, cy + 22 * s);
    x.bezierCurveTo(cx - 40 * s, cy - 4 * s, cx - 22 * s, cy - 34 * s, cx, cy - 14 * s);
    x.bezierCurveTo(cx + 22 * s, cy - 34 * s, cx + 40 * s, cy - 4 * s, cx, cy + 22 * s); x.fill();
  };
  switch (kind) {
    case 'heart': heart(64, 66, 1.1); break;
    case 'leaf': heart(64, 66, 1.1); break;
    case 'bed': x.fillRect(28, 64, 72, 14); x.fillRect(28, 50, 22, 14); x.fillRect(26, 44, 7, 48); x.fillRect(95, 66, 7, 26); break;
    case 'pill': x.save(); x.translate(64, 64); x.rotate(-0.7); x.lineWidth = 7; x.beginPath(); x.roundRect(-34, -14, 68, 28, 14); x.stroke(); x.beginPath(); x.roundRect(0, -14, 34, 28, [0, 14, 14, 0]); x.fill(); x.restore(); break;
    case 'clock': x.lineWidth = 7; x.beginPath(); x.arc(64, 64, 34, 0, Math.PI * 2); x.stroke(); x.beginPath(); x.moveTo(64, 64); x.lineTo(64, 40); x.moveTo(64, 64); x.lineTo(82, 72); x.stroke(); break;
    case 'phone': x.beginPath(); x.moveTo(42, 34); x.quadraticCurveTo(50, 28, 56, 40); x.lineTo(50, 50); x.quadraticCurveTo(58, 68, 76, 78); x.lineTo(86, 72); x.quadraticCurveTo(98, 78, 92, 88); x.quadraticCurveTo(62, 100, 40, 66); x.quadraticCurveTo(30, 46, 42, 34); x.fill(); break;
    case 'check': x.lineWidth = 7; for (const y of [40, 64, 88]) { x.beginPath(); x.moveTo(30, y); x.lineTo(38, y + 7); x.lineTo(50, y - 7); x.stroke(); x.fillRect(58, y - 3, 40, 6); } break;
    case 'H': x.font = 'bold 76px system-ui, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('H', 64, 68); break;
    case 'battery': x.lineWidth = 7; x.strokeRect(26, 42, 70, 44); x.fillRect(96, 54, 8, 20); x.fillStyle = '#6bbf74'; x.fillRect(34, 50, 24, 28); x.fillRect(62, 50, 24, 28); break;
    case 'scale': x.lineWidth = 7; x.beginPath(); x.roundRect(28, 36, 72, 56, 10); x.stroke(); x.beginPath(); x.arc(64, 58, 12, Math.PI, 0); x.stroke(); break;
    case 'card': x.lineWidth = 6; x.strokeRect(30, 32, 68, 64); for (const y of [50, 64, 78]) x.fillRect(40, y, 48, 5); break;
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  iconCache.set(key, t);
  return t;
}
/** 立牌：一根柱子＋圖示面板（面向鏡頭方向 +z） */
export function signPost(kind: IconKind, color: string, p: Pos = {}, h = 26, size = 18) {
  const g = new THREE.Group();
  g.add(cyl(1.2, 1.2, h, 5, '#6b4529'));
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshStandardMaterial({ map: iconTexture(kind, color), roughness: 0.9 }));
  panel.position.set(0, h + size / 2 - 2, 1.4);
  panel.rotation.x = -0.2;
  g.add(panel);
  return place(g, p);
}
/** 貼在屋頂上的圖示 */
export function roofIcon(kind: IconKind, color: string, p: Pos = {}, size = 18) {
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshStandardMaterial({ map: iconTexture(kind, color), roughness: 0.9 }));
  panel.rotation.x = -0.55;
  return place(panel, p);
}
export function flag(color: string, p: Pos = {}) {
  const g = new THREE.Group();
  g.add(cyl(0.9, 0.9, 40, 5, '#6b5b4c'));
  const s = new THREE.Shape(); s.moveTo(0, 0); s.lineTo(16, -5); s.lineTo(0, -10);
  const f = new THREE.Mesh(new THREE.ShapeGeometry(s), new THREE.MeshStandardMaterial({ color, side: THREE.DoubleSide, flatShading: true }));
  f.position.set(1, 40, 0);
  g.add(f);
  return place(g, p);
}

// ───────── 各站模型（原點＝島中心頂面） ─────────
type Builder = () => THREE.Group;
const G = (...o: THREE.Object3D[]) => { const g = new THREE.Group(); g.add(...o); return g; };

export const STATION_MODELS: Record<string, Builder> = {
  admission: () => G(
    box(84, 44, 50, '#fbf7ef', { x: -12, z: -26 }),
    box(88, 6, 54, '#4fa7a0', { x: -12, y: 44, z: -26 }),
    windows(84, 50, [12, 28], 5, '#cfe8f3', 'front', { x: -12, z: -26 }),
    windows(84, 50, [12, 28], 3, '#cfe8f3', 'right', { x: -12, z: -26 }),
    roofIcon('heart', '#4fa7a0', { x: -12, y: 64, z: -14 }, 22),
    box(30, 3, 14, '#f4c95d', { x: -22, y: 22, z: 6 }),
    cyl(1.2, 1.2, 22, 5, '#999', { x: -34, z: 11 }), cyl(1.2, 1.2, 22, 5, '#999', { x: -10, z: 11 }),
    house(24, 20, 20, '#fff8ec', '#e98a63', { x: 46, z: 12 }),
    bench({ x: 22, z: 30 }), flowers({ x: -50, z: 34 }), flowers({ x: -24, z: 40 }),
  ),
  ward: () => G(
    box(100, 38, 42, '#f7fbfd', { x: -6, z: -30 }),
    box(104, 5, 46, '#7cc3d6', { x: -6, y: 38, z: -30 }),
    windows(100, 42, [10, 25], 6, '#ffe9b8', 'front', { x: -6, z: -30 }),
    windows(100, 42, [10, 25], 2, '#cfe8f3', 'right', { x: -6, z: -30 }),
    roofIcon('bed', '#5ea6ba', { x: -6, y: 56, z: -18 }, 22),
    box(56, 2.5, 12, '#f4c95d', { x: 24, y: 20, z: 6 }),
    ...[0, 26, 52].map((d) => cyl(1.2, 1.2, 20, 5, '#999', { x: -2 + d, z: 10 })),
    bush({ x: -46, z: 10 }), flowers({ x: -30, z: 30 }),
  ),
  team: () => G(
    box(56, 30, 56, '#fffaf0', { z: -18 }),
    pyramid(56, 30, '#e88c66', { y: 30, z: -18 }),
    box(10, 18, 1.4, '#6ca3d6', { x: -14, z: 10.3 }), box(10, 18, 1.4, '#82c29e', { x: 14, z: 10.3 }),
    box(1.4, 18, 10, '#f2a07c', { x: 28.3, z: -26 }), box(1.4, 18, 10, '#a184c8', { x: 28.3, z: -8 }),
    personFig('#6ca3d6', { x: -40, z: 18 }), personFig('#82c29e', { x: -26, z: 32 }),
    personFig('#f2a07c', { x: 30, z: 30 }), personFig('#a184c8', { x: 44, z: 16 }),
  ),
  'discharge-prep': () => G(
    house(76, 34, 48, '#f8fcf5', '#6fae8b', { x: -8, z: -24 }),
    signPost('check', '#5a9374', { x: 46, z: 4 }, 22, 20),
    flowers({ x: -40, z: 26 }), bush({ x: 30, z: 30 }),
  ),
  discharge: () => {
    const g = G(house(52, 28, 40, '#f6fbff', '#5a8fc2', { x: 26, z: -22 }));
    // 碼頭木棧板往左下延伸到海上
    const dock = new THREE.Group();
    dock.add(box(90, 4, 24, '#c98f5a', { y: -2 }));
    for (let i = 0; i < 9; i++) dock.add(box(1, 0.6, 24, '#8d5f39', { x: -44 + i * 11, y: 2 }));
    for (const x of [-42, 0, 42]) dock.add(cyl(2.4, 2.4, 22, 6, '#7d5434', { x, y: -20, z: 13 }));
    dock.position.set(-74, 0, 22);
    dock.rotation.y = 0.5;
    g.add(dock);
    g.add(box(12, 16, 8, '#f28f8f', { x: -6, z: 14 }), box(10, 10, 8, '#ffd166', { x: 8, z: 18 }));
    g.add(signPost('card', '#46769f', { x: 58, z: 6 }, 18, 16));
    return g;
  },
  weight: () => G(
    house(60, 30, 46, '#fff4e2', '#d9734e', { z: -22 }),
    box(7, 14, 7, '#b08c74', { x: 14, y: 34, z: -30 }),
    box(14, 2.5, 12, '#e6eef3', { x: -38, z: 14 }),
    signPost('card', '#e88c66', { x: 40, z: 8 }, 16, 16),
    bush({ x: -46, z: -6 }), flowers({ x: 26, z: 28 }),
  ),
  medication: () => {
    const g = G(house(58, 28, 44, '#fffaf5', '#f2a07c', { z: -22 }));
    g.add(box(60, 2, 14, '#f28f8f', { y: 22, z: 6 }));
    g.add(signPost('pill', '#c86c49', { x: 44, z: 8 }, 22, 18));
    ['#f28f8f', '#ffd166', '#82c29e', '#6ca3d6', '#a184c8', '#f2a07c', '#7cc3d6'].forEach((c, i) => g.add(box(4, 3, 5, c, { x: -40 + i * 5, z: 18 })));
    return g;
  },
  diet: () => G(
    house(54, 28, 42, '#fffdf2', '#ffd166', { x: 18, z: -26 }),
    box(36, 2, 22, '#ffffff', { x: -26, y: 12, z: 10 }),
    ...[-38, -14].map((x) => cyl(1.2, 1.2, 12, 5, '#bbb', { x, z: 10 })),
    m(new THREE.IcosahedronGeometry(3.5, 0).translate(-32, 16, 8), '#82c29e'),
    m(new THREE.IcosahedronGeometry(3, 0).translate(-24, 16, 12), '#f28f8f'),
    m(new THREE.IcosahedronGeometry(2.6, 0).translate(-18, 16, 6), '#ffd166'),
    box(6, 8, 6, '#c98b5a', { x: -48, z: 12 }), box(6, 8, 6, '#c98b5a', { x: -4, z: 12 }),
    ...[0, 1, 2, 3].map((i) => m(new THREE.IcosahedronGeometry(4, 0).translate(44 + (i % 2) * 8, 4, 8 + i * 6), '#5f9e4f')),
  ),
  activity: () => {
    const hill = m(new THREE.ConeGeometry(58, 34, 7).translate(0, 17, 0), '#8cc06a', { x: -6, z: -20 });
    const pav = G(...[[-8, -8], [8, -8], [-8, 8], [8, 8]].map(([x, z]) => cyl(1, 1, 16, 5, '#a98467', { x, z })), pyramid(22, 12, '#e88c66', { y: 16 }));
    pav.position.set(-6, 30, -20);
    return G(hill, pav, signPost('check', '#a86d42', { x: 46, z: 6 }, 18, 14), bench({ x: -40, z: 22 }), tree('round', { x: 40, z: -30 }, 0.8), flowers({ x: 10, z: 30 }));
  },
  warning: () => {
    const g = new THREE.Group();
    const bands = 6, h = 16;
    for (let i = 0; i < bands; i++) {
      const r0 = 15 - i * 1.4, r1 = 15 - (i + 1) * 1.4;
      g.add(cyl(r1, r0, h, 10, i % 2 ? '#ffffff' : '#ef8354', { y: i * h, z: -16 }));
    }
    g.add(cyl(10, 10, 4, 10, '#3b3a36', { y: bands * h, z: -16 }));
    const lamp = cyl(7, 7, 12, 10, '#fff3b0', { y: bands * h + 4, z: -16 });
    (lamp.material as THREE.MeshStandardMaterial).emissive = new THREE.Color('#ffe58a');
    (lamp.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.8;
    lamp.name = 'lamp';
    g.add(lamp, m(new THREE.ConeGeometry(10, 10, 10).translate(0, bands * h + 21, -16), '#ef8354'));
    g.add(house(30, 20, 26, '#fbf7ef', '#4f86c6', { x: 38, z: -4 }));
    g.add(signPost('phone', '#3d6fa8', { x: -36, z: 10 }, 22, 18));
    return g;
  },
  'follow-up': () => G(
    box(110, 5, 26, '#e6dfcf', { x: 0, z: 16 }),
    house(48, 28, 34, '#f6fbff', '#4f86c6', { x: 18, y: 5, z: -24 }),
    box(14, 64, 14, '#fffaf0', { x: -36, z: -22 }),
    pyramid(14, 12, '#4f86c6', { x: -36, y: 64, z: -22 }),
    roofIcon('clock', '#3b3a36', { x: -36, y: 52, z: -14.6 }, 13),
    box(40, 16, 14, '#ffd166', { x: -10, y: 5, z: 18 }),
    windows(40, 14, [12], 4, '#e6f4ff', 'front', { x: -10, y: 5, z: 18 }, 6),
  ),
  'long-term-care': () => G(
    house(44, 24, 36, '#f6f1ff', '#8c6bb1', { x: -24, z: -24 }),
    box(14, 3, 24, '#d8d2c4', { x: -48, z: 4 }),
    house(38, 22, 30, '#fff8ec', '#6fae8b', { x: 24, z: -32 }),
    box(32, 2, 12, '#f4c95d', { x: 40, y: 20, z: 10 }),
    cyl(1, 1, 20, 5, '#888', { x: 28, z: 14 }), cyl(1, 1, 20, 5, '#888', { x: 52, z: 14 }),
    box(30, 14, 16, '#ffffff', { x: 6, z: 18 }),
    windows(30, 16, [8], 2, '#7fb7d8', 'front', { x: 6, z: 18 }, 5),
    cyl(0.9, 0.9, 24, 5, '#6b5b4c', { x: -50, z: 24 }),
    m(new THREE.ConeGeometry(16, 8, 8).translate(-50, 26, 24), '#ef8354'),
    bench({ x: -36, z: 34 }),
  ),
  palliative: () => G(
    box(90, 6, 4, '#e9dcc6', { x: 0, z: 40 }), box(4, 6, 70, '#dccbb0', { x: 45, z: 5 }),
    ...[[-20, -24], [20, -24], [-20, 4], [20, 4]].map(([x, z]) => cyl(1.4, 1.4, 34, 5, '#a98467', { x, z })),
    ...[0, 1, 2, 3, 4, 5, 6].map((i) => box(2, 2, 34, '#a98467', { x: -20 + i * 6.66, y: 34, z: -10 })),
    m(new THREE.IcosahedronGeometry(8, 0).scale(1.6, 0.5, 1).translate(-12, 38, -18), '#8fc27a'),
    box(10, 10, 10, '#f6e7cf', { z: -10 }),
    box(9, 7, 9, '#9fc9e8', { x: -16, z: -10 }), box(9, 7, 9, '#f4a7b9', { x: 16, z: -10 }),
    cyl(14, 14, 1.5, 12, '#bfe3ef', { x: -40, z: 16 }),
    flowers({ x: 10, z: 26 }), flowers({ x: -30, z: -36 }),
  ),
  'advanced-hf': () => G(
    box(46, 36, 40, '#eef7ff', { x: -34, z: -20 }), box(48, 6, 42, '#4f86c6', { x: -34, y: 36, z: -20 }),
    roofIcon('battery', '#3d6fa8', { x: -34, y: 54, z: -10 }, 20),
    box(12, 22, 1.4, '#4f86c6', { x: -34, z: 0.4 }),
    box(44, 32, 38, '#fff4f4', { x: 32, z: -26 }), box(46, 6, 40, '#e27c7c', { x: 32, y: 32, z: -26 }),
    roofIcon('heart', '#c86464', { x: 32, y: 50, z: -16 }, 20),
    box(12, 20, 1.4, '#d26d6d', { x: 32, z: -6.6 }),
    box(22, 16, 14, '#fbf7ef', { x: 0, z: -20 }),
    flag('#4f86c6', { x: -62, z: 16 }), flag('#e27c7c', { x: 62, z: 14 }),
  ),
  'decor-garden': () => G(
    cyl(16, 18, 4, 10, '#d9d2c4'), cyl(13, 13, 1, 10, '#9fd8ea', { y: 4 }), cyl(3, 4, 12, 8, '#d9d2c4', { y: 4 }), cyl(6, 6, 2, 8, '#bfe6f2', { y: 14 }),
    bench({ x: -36, z: 20, ry: 0.4 }), bench({ x: 36, z: 20, ry: -0.4 }),
    flowers({ x: -30, z: -30 }), flowers({ x: 30, z: -34 }), flowers({ x: 0, z: 44 }),
    tree('round', { x: -62, z: -20 }, 0.9), tree('round', { x: 62, z: -16 }, 0.85, '#6aa956'), tree('pine', { x: 0, z: -66 }, 0.9),
    lampPost({ x: -22, z: 34 }), lampPost({ x: 22, z: 34 }),
    personFig('#f2a07c', { x: -14, z: 26 }), personFig('#7cc3d6', { x: 48, z: 40 }),
  ),
  'decor-ambulance': () => G(
    box(56, 26, 36, '#f3f6f8', { x: -20, z: -36 }), box(58, 4, 38, '#7cc3d6', { x: -20, y: 26, z: -36 }),
    box(30, 18, 1.2, '#cfd8dc', { x: -20, z: -17.6 }),
    box(34, 16, 16, '#ffffff', { x: 30, z: 6 }), box(34, 3, 16.4, '#ef8354', { x: 30, y: 7 }), box(10, 12, 15, '#cfe8f3', { x: 44, y: 2, z: 0.2 }),
    m(new THREE.IcosahedronGeometry(2.4, 0).translate(24, 18, 6), '#7cc3ff'),
    ...[-30, -10, 10].map((x) => box(1.5, 0.4, 26, '#ffffff', { x, z: 30 })),
    cyl(24, 24, 0.8, 16, '#9aa5ad', { x: -30, z: 40 }),
    roofIcon('H', '#4b5563', { x: -30, y: 1.2, z: 40 }, 26),
    lampPost({ x: 58, z: 40 }),
  ),
  'decor-park': () => G(
    cyl(30, 30, 1.2, 9, '#8fd3e2', { x: -10, z: 6 }),
    tree('round', { x: -60, z: -30 }, 1), tree('pine', { x: -30, z: -60 }, 0.95), tree('round', { x: 30, z: -50 }, 0.9, '#6aa956'),
    tree('pine', { x: 60, z: -10 }, 0.9), tree('round', { x: 50, z: 40 }, 0.75),
    bench({ x: -10, z: 46 }), lampPost({ x: 26, z: 30 }), bush({ x: -50, z: 30 }), flowers({ x: 10, z: -24 }),
    personFig('#a184c8', { x: 24, z: 16 }),
  ),
  'decor-heart': () => {
    const heart = new THREE.Mesh(new THREE.ExtrudeGeometry(heartShape(2.2), { depth: 8, bevelEnabled: true, bevelSize: 2, bevelThickness: 2, bevelSegments: 1 }), mat('#ef5f67', { emissive: '#ef5f67', emissiveIntensity: 0.15 }));
    heart.position.set(0, 46, -10);
    heart.castShadow = true;
    heart.name = 'heart';
    heart.userData.keep = true;
    return G(
      cyl(26, 30, 6, 12, '#efe6d6'), cyl(14, 16, 22, 8, '#fbf7ef', { y: 6 }), heart,
      ...[0, 1, 2, 3, 4, 5].map((i) => flowers({ x: Math.cos(i) * 44, z: Math.sin(i) * 34 + 8 })),
      bench({ x: -50, z: 30, ry: 0.6 }), bench({ x: 50, z: 30, ry: -0.6 }),
      lampPost({ x: -34, z: -40 }), lampPost({ x: 34, z: -40 }),
      personFig('#82c29e', { x: -26, z: 44 }), personFig('#f4a7b9', { x: 32, z: 52 }),
    );
  },
  'decor-hill': () => {
    const hill = m(new THREE.ConeGeometry(70, 46, 8).translate(0, 23, 0), '#9fcf73', { z: -14 });
    const mill = new THREE.Group();
    mill.add(cyl(5, 8, 34, 6, '#fffaf0'), pyramid(12, 8, '#c86c49', { y: 34 }));
    const blades = new THREE.Group();
    blades.name = 'windmill';
    blades.userData.keep = true;
    for (let i = 0; i < 4; i++) {
      const b = new THREE.Mesh(new THREE.BoxGeometry(3, 26, 0.8).translate(0, 13, 0), mat('#ffffff'));
      b.rotation.z = (i * Math.PI) / 2;
      b.userData.keep = true;
      blades.add(b);
    }
    blades.position.set(0, 30, 7);
    mill.add(blades);
    mill.position.set(0, 44, -14);
    return G(hill, mill, tree('pine', { x: -58, z: 20 }, 0.85), tree('pine', { x: 60, z: 16 }, 0.9), tree('round', { x: -30, z: 46 }, 0.7), bush({ x: 34, z: 50 }));
  },
  'decor-gate': () => {
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(56, 14), new THREE.MeshStandardMaterial({ map: textTexture('回家的路'), roughness: 0.9 }));
    sign.position.set(0, 44, 0.8);
    return G(
      box(8, 40, 8, '#c98f5a', { x: -32 }), box(8, 40, 8, '#c98f5a', { x: 32 }), box(76, 7, 10, '#a86d42', { y: 37 }), sign,
      ...[0, 1, 2, 3].map((i) => box(26, 1.2, 12, '#f3e6c4', { y: 0.2, z: 20 + i * 14 })),
      flowers({ x: -50, z: 10 }), flowers({ x: 50, z: 10 }), lampPost({ x: -44, z: 40 }), lampPost({ x: 44, z: 40 }),
      tree('round', { x: -66, z: -30 }, 0.8), tree('round', { x: 66, z: -30 }, 0.8, '#6aa956'),
    );
  },
  'decor-hospital': () => G(
    box(52, 110, 46, '#fbfbf7', { x: 0, z: -14 }),
    box(54, 5, 48, '#4fa7a0', { x: 0, y: 110, z: -14 }),
    windows(52, 46, [14, 30, 46, 62, 78, 94], 4, '#cfe8f3', 'front', { z: -14 }, 7),
    windows(52, 46, [14, 30, 46, 62, 78, 94], 3, '#cfe8f3', 'right', { z: -14 }, 7),
    roofIcon('H', '#3e8c86', { y: 118, z: -6 }, 24),
    box(18, 22, 2, '#7fb7d8', { z: 9.5 }),
    tree('round', { x: -44, z: 10 }, 0.9), tree('round', { x: 44, z: 6 }, 0.8, '#6aa956'), flowers({ x: -20, z: 34 }),
  ),
};

/** 照護重點小屋 */
const HUT_ROOFS = ['#f2a07c', '#6ca3d6', '#82c29e', '#a184c8'];
export function hut(i: number) {
  return G(box(18, 13, 16, '#fffdf8'), gable(18, 16, 8, HUT_ROOFS[i % 4], { y: 13 }), box(5, 8, 1, '#a46f45', { x: -3, z: 8.2 }));
}

const badgeCache = new Map<number, THREE.SpriteMaterial>();
/** 小屋上方的編號（永遠面向鏡頭） */
export function badge(n: number) {
  if (!badgeCache.has(n)) {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const x = c.getContext('2d')!;
    x.fillStyle = '#ffffff'; x.strokeStyle = '#2f7f78'; x.lineWidth = 6;
    x.beginPath(); x.arc(32, 32, 26, 0, Math.PI * 2); x.fill(); x.stroke();
    x.fillStyle = '#2f7f78'; x.font = 'bold 34px system-ui, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(String(n), 32, 34);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    badgeCache.set(n, new THREE.SpriteMaterial({ map: t, depthTest: false }));
  }
  const s = new THREE.Sprite(badgeCache.get(n)!);
  s.scale.set(11, 11, 1);
  s.renderOrder = 10;
  return s;
}

export function boat() {
  const s = new THREE.Shape();
  s.moveTo(-22, 0); s.lineTo(22, 0); s.lineTo(14, -9); s.lineTo(-16, -9); s.lineTo(-22, 0);
  const hull = new THREE.Mesh(new THREE.ExtrudeGeometry(s, { depth: 14, bevelEnabled: false }).translate(0, 9, -7), mat('#ffffff'));
  hull.castShadow = true;
  const sail = new THREE.Shape(); sail.moveTo(0, 0); sail.lineTo(16, 0); sail.lineTo(0, 26);
  const sm = new THREE.Mesh(new THREE.ShapeGeometry(sail), new THREE.MeshStandardMaterial({ color: '#fff3d6', side: THREE.DoubleSide, flatShading: true }));
  sm.position.set(1, 12, 0);
  const sail2 = sm.clone(); sail2.material = new THREE.MeshStandardMaterial({ color: '#ef8354', side: THREE.DoubleSide }); sail2.scale.set(-0.8, 0.8, 1);
  return G(hull, box(44, 2, 14, '#4f86c6', { y: 8 }), cyl(0.8, 0.8, 38, 5, '#6b5b4c', { y: 9 }), sm, sail2);
}
