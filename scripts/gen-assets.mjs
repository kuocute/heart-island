// 產生「心衰照護島」所有原創 SVG 素材到 public/assets/
// 執行：npm run assets
// 素材皆為本專案原創向量圖，可直接替換成同名同尺寸的 SVG / PNG（見 README）。
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'assets');
mkdirSync(out, { recursive: true });

const C = 0.866;
/** 斜俯視投影：x 往右下、y 往左下、z 往上。前角 (w,d) 對到 (cx,cy)。 */
function iso(cx, cy, w, d) {
  return (x, y, z = 0) => [cx + (x - y - (w - d)) * C, cy + (x + y - w - d) * 0.5 - z];
}
const pts = (arr) => arr.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
const poly = (arr, fill, extra = '') =>
  `<polygon points="${pts(arr)}" fill="${fill}" stroke="#3b3a36" stroke-opacity=".35" stroke-width="1.2" stroke-linejoin="round" ${extra}/>`;

/** 長方體，回傳 svg 字串 */
function box(P, w, d, h, z0, col) {
  const [top, left, right] = col;
  return [
    poly([P(0, d, z0), P(w, d, z0), P(w, d, z0 + h), P(0, d, z0 + h)], left),
    poly([P(w, 0, z0), P(w, d, z0), P(w, d, z0 + h), P(w, 0, z0 + h)], right),
    poly([P(0, 0, z0 + h), P(w, 0, z0 + h), P(w, d, z0 + h), P(0, d, z0 + h)], top),
  ].join('');
}
/** 沿 x 方向屋脊的斜屋頂 */
function gable(P, w, d, z, rh, col, over = 4) {
  const [front, back, end] = col;
  const a = -over, b = w + over, f = d + over, k = -over;
  return [
    poly([P(a, k, z), P(b, k, z), P(b, d / 2, z + rh), P(a, d / 2, z + rh)], back),
    poly([P(w, 0, z), P(w, d, z), P(w, d / 2, z + rh)], end),
    poly([P(a, f, z), P(b, f, z), P(b, d / 2, z + rh), P(a, d / 2, z + rh)], front),
  ].join('');
}
/** 在 y=d 那面（左前面）畫窗或門 */
function winL(P, d, x, z, ww, wh, fill = '#cfe8f3') {
  return poly([P(x, d, z), P(x + ww, d, z), P(x + ww, d, z + wh), P(x, d, z + wh)], fill);
}
/** 在 x=w 那面（右前面）畫窗或門 */
function winR(P, w, y, z, ww, wh, fill = '#cfe8f3') {
  return poly([P(w, y, z), P(w, y + ww, z), P(w, y + ww, z + wh), P(w, y, z + wh)], fill);
}
function ellipse(cx, cy, rx, ry, fill, extra = '') {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" ${extra}/>`;
}
function tree(x, y, s = 1, tone = '#5f9e4f') {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-3" y="-16" width="6" height="18" rx="2" fill="#8a5a3b"/>
    ${ellipse(0, -30, 17, 16, tone)}${ellipse(-6, -36, 9, 8, '#ffffff', 'opacity=".18"')}
  </g>`;
}
function bush(x, y, tone = '#78b35e') {
  return ellipse(x, y, 10, 6, tone) + ellipse(x - 3, y - 2, 4, 2.5, '#ffffff', 'opacity=".2"');
}
function flowers(x, y) {
  const c = ['#f4a7b9', '#ffd166', '#c3a6ff', '#ffffff'];
  return c.map((f, i) => ellipse(x + i * 6 - 9, y + (i % 2) * 3, 2.6, 2.2, f)).join('');
}
function bench(P, x, y, z = 0) {
  return box(P, 22, 6, 4, z + 6, ['#c98b5a', '#a86d42', '#b97b4c']) +
    box(P, 3, 6, 6, z, ['#6b5b4c', '#5a4b3d', '#4f4236']).replace(/NaN/g, '0');
}
const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>\n`;

const manifest = {};
function save(name, w, h, ax, ay, body) {
  writeFileSync(join(out, `${name}.svg`), svg(w, h, body));
  manifest[name] = { file: `assets/${name}.svg`, width: w, height: h, originX: +(ax / w).toFixed(4), originY: +(ay / h).toFixed(4) };
}

const WALL = ['#fbf7ef', '#efe6d6', '#e2d6c1'];
const TEAL = ['#4fa7a0', '#3e8c86', '#5bb8b0'];

// ---------- 01 入院照護花園 ----------
{
  const W = 300, H = 230, cx = 150, cy = 200;
  const P = iso(cx, cy - 20, 120, 70);
  let b = ellipse(cx, cy - 4, 128, 30, '#000', 'opacity=".08"');
  b += box(P, 120, 70, 70, 0, WALL);
  for (let i = 0; i < 4; i++) for (let r = 0; r < 2; r++) b += winL(P, 70, 10 + i * 27, 14 + r * 26, 14, 14);
  for (let i = 0; i < 2; i++) for (let r = 0; r < 2; r++) b += winR(P, 120, 10 + i * 30, 14 + r * 26, 14, 14);
  b += box(P, 120, 70, 8, 70, TEAL);
  // 屋頂上的綠葉心形標誌
  const [hx, hy] = P(60, 35, 92);
  b += `<g transform="translate(${hx} ${hy - 14})"><rect x="-17" y="-14" width="34" height="30" rx="8" fill="#ffffff" stroke="#3e8c86" stroke-width="2"/>
    <path d="M0 10 C-14 0 -10 -10 -3 -8 C-1 -7 0 -5 0 -4 C0 -5 1 -7 3 -8 C10 -10 14 0 0 10Z" fill="#6bbf74"/></g>`;
  // 入口雨遮
  const Q = iso(cx - 10, cy + 6, 40, 18);
  b += box(Q, 40, 18, 4, 30, ['#f4c95d', '#e0b24a', '#ecbd52']);
  b += box(Q, 3, 3, 30, 0, ['#999', '#888', '#777']);
  // 入院評估亭（小亭子）
  const K = iso(cx + 88, cy + 10, 28, 24);
  b += box(K, 28, 24, 30, 0, ['#fff8ec', '#f6dfbf', '#efd2a9']);
  b += winL(K, 24, 6, 10, 16, 12, '#ffe7a6');
  b += gable(K, 28, 24, 30, 14, ['#e98a63', '#c86c49', '#f2a07c']);
  b += flowers(cx - 90, cy + 4) + flowers(cx - 60, cy + 14) + bush(cx - 112, cy - 10) + bush(cx + 125, cy - 6, '#6aa956');
  b += tree(cx - 120, cy - 22, 0.9) + tree(cx + 128, cy - 34, 0.8, '#6aa956');
  save('station-admission', W, H, cx, cy, b);
}

// ---------- 02 出院碼頭 ----------
{
  const W = 300, H = 200, cx = 150, cy = 170;
  let b = ellipse(cx, cy, 120, 26, '#000', 'opacity=".07"');
  // 棧板延伸入海（往左上）
  const D = iso(cx - 40, cy + 10, 130, 34);
  b += box(D, 130, 34, 6, 0, ['#d4a373', '#a9774b', '#bb8657']);
  for (let i = 0; i < 9; i++) {
    const [x1, y1] = D(i * 14 + 7, 0, 6), [x2, y2] = D(i * 14 + 7, 34, 6);
    b += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#8d5f39" stroke-opacity=".5"/>`;
  }
  for (const x of [4, 64, 124]) b += box(D, 5, 5, 12, -10, ['#7d5434', '#6b4529', '#5d3c24']);
  // 碼頭小屋（出院服務台）
  const Hh = iso(cx + 60, cy - 6, 50, 40);
  b += box(Hh, 50, 40, 36, 0, ['#f6fbff', '#dbe9f3', '#c8dcea']);
  b += winL(Hh, 40, 8, 10, 14, 16, '#ffffff') + winR(Hh, 50, 12, 0, 14, 24, '#7fb7d8');
  b += gable(Hh, 50, 40, 36, 16, ['#5a8fc2', '#46769f', '#6ca3d6']);
  // 出院文件告示板
  const [bx, by] = Hh(50, 0, 0);
  b += `<g transform="translate(${bx + 6} ${by - 40})"><rect x="0" y="0" width="26" height="30" rx="3" fill="#fff" stroke="#46769f" stroke-width="2"/>
    <line x1="5" y1="8" x2="21" y2="8" stroke="#9db6cc" stroke-width="2"/><line x1="5" y1="14" x2="21" y2="14" stroke="#9db6cc" stroke-width="2"/>
    <line x1="5" y1="20" x2="16" y2="20" stroke="#9db6cc" stroke-width="2"/><rect x="11" y="30" width="3" height="12" fill="#6b4529"/></g>`;
  // 行李
  const L = iso(cx - 2, cy + 2, 16, 10);
  b += box(L, 16, 10, 18, 6, ['#f28f8f', '#d26d6d', '#e27c7c']);
  const L2 = iso(cx + 16, cy + 8, 14, 10);
  b += box(L2, 14, 10, 12, 6, ['#ffd166', '#e0b24a', '#ecbd52']);
  save('station-discharge', W, H, cx, cy, b);
}

// ---------- 03 體重小屋 ----------
{
  const W = 200, H = 180, cx = 100, cy = 158;
  const P = iso(cx, cy - 6, 70, 56);
  let b = ellipse(cx, cy - 4, 82, 22, '#000', 'opacity=".08"');
  b += box(P, 70, 56, 40, 0, ['#fff4e2', '#f3dcc0', '#e8cba7']);
  b += winL(P, 56, 10, 0, 16, 28, '#a46f45') + winL(P, 56, 38, 14, 20, 14, '#ffe7a6');
  b += winR(P, 70, 14, 14, 18, 14, '#ffe7a6');
  b += gable(P, 70, 56, 40, 22, ['#d9734e', '#b85c3c', '#e88c66']);
  // 煙囪
  b += box(iso(cx + 12, cy - 74, 8, 8), 8, 8, 16, 0, ['#b08c74', '#8f6e58', '#9d7c64']);
  // 門前體重計與照護卡
  const S = iso(cx - 46, cy + 8, 16, 14);
  b += box(S, 16, 14, 3, 0, ['#e6eef3', '#b9c8d2', '#c9d6de']);
  const [sx, sy] = S(8, 7, 3);
  b += ellipse(sx, sy, 4, 2.2, '#58a6c7');
  b += `<g transform="translate(${cx + 44} ${cy - 38}) rotate(-8)"><rect width="22" height="16" rx="2" fill="#ffffff" stroke="#e88c66" stroke-width="2"/>
    <line x1="4" y1="6" x2="18" y2="6" stroke="#f3c3ad" stroke-width="2"/><line x1="4" y1="11" x2="14" y2="11" stroke="#f3c3ad" stroke-width="2"/></g>`;
  b += bush(cx - 74, cy - 12) + flowers(cx + 60, cy - 2) + tree(cx + 78, cy - 22, 0.75);
  save('station-weight', W, H, cx, cy, b);
}

// ---------- 04 警訊燈塔 ----------
{
  const W = 180, H = 280, cx = 92, cy = 258;
  let b = ellipse(cx, cy - 4, 70, 18, '#000', 'opacity=".08"');
  // 燈塔塔身（錐形）
  const base = cy - 22, top = 70;
  const wb = 24, wt = 15;
  const tower = (y1, y2, fill) => {
    const t1 = (y1 - top) / (base - top), t2 = (y2 - top) / (base - top);
    const w1 = wt + (wb - wt) * t1, w2 = wt + (wb - wt) * t2;
    return `<polygon points="${cx - w1},${y1} ${cx + w1},${y1} ${cx + w2},${y2} ${cx - w2},${y2}" fill="${fill}"/>`;
  };
  const bands = 6, step = (base - top) / bands;
  for (let i = 0; i < bands; i++) b += tower(top + i * step, top + (i + 1) * step, i % 2 ? '#ffffff' : '#ef8354');
  b += `<polygon points="${cx},${top} ${cx + wt},${top} ${cx + wb},${base} ${cx},${base}" fill="#000" opacity=".08"/>`;
  // 燈室
  b += `<rect x="${cx - 18}" y="${top - 8}" width="36" height="8" rx="2" fill="#3b3a36"/>
    <rect class="lamp" x="${cx - 12}" y="${top - 30}" width="24" height="22" rx="4" fill="#fff3b0" stroke="#3b3a36" stroke-width="2"/>
    <path d="M${cx - 16} ${top - 30} L${cx} ${top - 46} L${cx + 16} ${top - 30}Z" fill="#ef8354" stroke="#3b3a36" stroke-width="2"/>`;
  b += `<rect x="${cx - 6}" y="${base - 26}" width="12" height="22" rx="6" fill="#6b4529"/>`;
  // 看守小屋與電話牌
  const Hh = iso(cx + 52, cy - 2, 32, 28);
  b += box(Hh, 32, 28, 24, 0, WALL);
  b += gable(Hh, 32, 28, 24, 12, ['#4f86c6', '#3d6fa8', '#629ad8']);
  b += `<g transform="translate(${cx - 64} ${cy - 66})"><rect x="0" y="0" width="30" height="30" rx="8" fill="#ffffff" stroke="#3d6fa8" stroke-width="2"/>
    <path d="M9 8c2-2 4 0 5 2l-2 2c1 2 3 4 5 5l2-2c2 1 4 3 2 5-3 3-8 1-12-3S6 11 9 8z" fill="#3d6fa8"/>
    <rect x="13" y="30" width="4" height="34" fill="#6b4529"/></g>`;
  save('station-warning', W, H, cx, cy, b);
}

// ---------- 05 長照支援村 ----------
{
  const W = 300, H = 210, cx = 150, cy = 186;
  let b = ellipse(cx, cy - 6, 140, 28, '#000', 'opacity=".07"');
  // 無障礙住宅 A（含坡道）
  const A = iso(cx - 50, cy - 24, 56, 44);
  b += box(A, 56, 44, 30, 0, ['#f6f1ff', '#e2d9f5', '#d3c7ee']);
  b += winL(A, 44, 8, 0, 16, 22, '#8c6bb1') + winL(A, 44, 32, 10, 14, 12);
  b += gable(A, 56, 44, 30, 16, ['#8c6bb1', '#735596', '#a184c8']);
  const R = iso(cx - 54, cy - 8, 14, 26);
  b += poly([R(0, 26, 0), R(14, 26, 0), R(14, 0, 8), R(0, 0, 8)], '#d8d2c4');
  // 住宅 B
  const B2 = iso(cx + 6, cy - 50, 46, 38);
  b += box(B2, 46, 38, 28, 0, ['#fff8ec', '#f3e6cc', '#e6d4b2']);
  b += winL(B2, 38, 10, 10, 14, 12) + winR(B2, 46, 10, 10, 12, 12);
  b += gable(B2, 46, 38, 28, 14, ['#6fae8b', '#5a9374', '#82c29e']);
  // 交通接送站（候車亭＋小車）
  const S = iso(cx + 86, cy - 6, 40, 16);
  b += box(S, 40, 16, 3, 26, ['#f4c95d', '#e0b24a', '#ecbd52']);
  b += box(S, 3, 3, 26, 0, ['#888', '#777', '#666']) + box(iso(cx + 120, cy - 22, 3, 3), 3, 3, 26, 0, ['#888', '#777', '#666']);
  const V = iso(cx + 60, cy + 14, 40, 20);
  b += box(V, 40, 20, 18, 3, ['#ffffff', '#e2eef6', '#cfe1ee']);
  b += winL(V, 20, 4, 9, 14, 7, '#7fb7d8') + winL(V, 20, 22, 9, 14, 7, '#7fb7d8');
  b += `<circle cx="${V(8, 20, 0)[0]}" cy="${V(8, 20, 0)[1]}" r="4" fill="#3b3a36"/><circle cx="${V(32, 20, 0)[0]}" cy="${V(32, 20, 0)[1]}" r="4" fill="#3b3a36"/>`;
  // 照顧者休息區：陽傘＋長椅
  const [ux, uy] = [cx - 112, cy - 14];
  b += `<rect x="${ux - 1.5}" y="${uy - 40}" width="3" height="40" fill="#6b5b4c"/><path d="M${ux - 26} ${uy - 34} Q${ux} ${uy - 60} ${ux + 26} ${uy - 34}Z" fill="#ef8354"/>`;
  b += bench(iso(ux + 12, uy + 6, 22, 6), 0, 0);
  b += tree(cx + 132, cy - 40, 0.8, '#6aa956') + bush(cx - 136, cy - 4) + flowers(cx - 30, cy + 8);
  save('station-long-term-care', W, H, cx, cy, b);
}

// ---------- 06 安心照護花園 ----------
{
  const W = 240, H = 190, cx = 120, cy = 170;
  let b = ellipse(cx, cy - 10, 108, 30, '#000', 'opacity=".06"');
  // 低矮矮牆
  const P = iso(cx, cy - 6, 120, 70);
  b += poly([P(0, 70, 0), P(120, 70, 0), P(120, 70, 8), P(0, 70, 8)], '#e9dcc6');
  b += poly([P(120, 0, 0), P(120, 70, 0), P(120, 70, 8), P(120, 0, 8)], '#dccbb0');
  // 涼棚
  const G = iso(cx + 6, cy - 28, 60, 40);
  for (const [x, y] of [[0, 0], [60, 0], [0, 40], [60, 40]]) {
    const [px, py] = G(x, y, 0);
    b += `<rect x="${px - 2}" y="${py - 46}" width="4" height="46" fill="#a98467"/>`;
  }
  for (let i = 0; i <= 6; i++) {
    const [x1, y1] = G(i * 10, 0, 46), [x2, y2] = G(i * 10, 40, 46);
    b += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#a98467" stroke-width="3"/>`;
  }
  b += ellipse(...G(10, 2, 50), 14, 6, '#8fc27a', 'opacity=".9"') + ellipse(...G(50, 30, 50), 16, 6, '#8fc27a', 'opacity=".9"');
  // 兩張面對面的椅子與小桌
  const T = iso(cx + 2, cy - 30, 12, 12);
  b += box(T, 12, 12, 12, 0, ['#f6e7cf', '#dcc5a3', '#e7d3b4']);
  b += box(iso(cx - 22, cy - 30, 10, 10), 10, 10, 8, 0, ['#9fc9e8', '#7fb0d6', '#8dbcdf']);
  b += box(iso(cx + 28, cy - 32, 10, 10), 10, 10, 8, 0, ['#f4a7b9', '#d98ba0', '#e898ac']);
  b += tree(cx - 86, cy - 30, 1, '#6aa956') + tree(cx + 92, cy - 40, 0.85);
  b += flowers(cx - 50, cy + 2) + flowers(cx + 54, cy - 4) + bush(cx - 100, cy - 6, '#8fc27a');
  // 小水盆
  b += ellipse(cx - 50, cy - 50, 16, 8, '#bfe3ef', 'stroke="#9bc6d6" stroke-width="2"');
  save('station-palliative', W, H, cx, cy, b);
}

// ---------- 07 進階心衰醫療港（兩展館） ----------
{
  const W = 330, H = 230, cx = 165, cy = 206;
  let b = ellipse(cx, cy - 6, 146, 28, '#000', 'opacity=".07"');
  // 左：LVAD 館
  const A = iso(cx - 58, cy - 20, 64, 50);
  b += box(A, 64, 50, 44, 0, ['#eef7ff', '#d4e6f5', '#c2d9ee']);
  b += winL(A, 50, 22, 0, 18, 28, '#4f86c6') + winR(A, 64, 12, 14, 24, 16, '#bfe0f5');
  b += box(A, 64, 50, 10, 44, ['#4f86c6', '#3d6fa8', '#629ad8']);
  const [ax, ay] = A(32, 25, 62);
  // 電池圖示
  b += `<g transform="translate(${ax} ${ay - 10})"><rect x="-16" y="-10" width="32" height="20" rx="4" fill="#fff" stroke="#3d6fa8" stroke-width="2.5"/>
    <rect x="16" y="-4" width="4" height="8" rx="1" fill="#3d6fa8"/><rect x="-12" y="-6" width="9" height="12" fill="#6bbf74"/><rect x="-1" y="-6" width="9" height="12" fill="#6bbf74"/></g>`;
  // 右：心臟移植館
  const Bp = iso(cx + 58, cy - 34, 60, 48);
  b += box(Bp, 60, 48, 40, 0, ['#fff4f4', '#f6dcdc', '#eecaca']);
  b += winL(Bp, 48, 20, 0, 18, 26, '#d26d6d') + winR(Bp, 60, 12, 14, 22, 14, '#ffe0e0');
  b += box(Bp, 60, 48, 10, 40, ['#e27c7c', '#c86464', '#ee9090']);
  const [bx, by] = Bp(30, 24, 56);
  b += `<g transform="translate(${bx} ${by - 10})"><circle r="15" fill="#fff" stroke="#c86464" stroke-width="2.5"/>
    <path d="M0 8 C-12 0 -9 -9 -3 -7 C-1 -6 0 -4 0 -3 C0 -4 1 -6 3 -7 C9 -9 12 0 0 8Z" fill="#e27c7c"/></g>`;
  // 中間連廊與港邊旗幟
  const M = iso(cx + 2, cy - 14, 30, 16);
  b += box(M, 30, 16, 20, 0, ['#fbf7ef', '#efe6d6', '#e2d6c1']);
  for (const [fx, col] of [[cx - 128, '#4f86c6'], [cx + 132, '#e27c7c']]) {
    b += `<rect x="${fx}" y="${cy - 70}" width="3" height="56" fill="#6b5b4c"/><path d="M${fx + 3} ${cy - 70} l22 7 -22 7z" fill="${col}"/>`;
  }
  save('station-advanced-hf', W, H, cx, cy, b);
}


/** 四角錐屋頂 */
function pyramid(P, w, d, z, rh, col) {
  const apex = P(w / 2, d / 2, z + rh);
  return poly([P(0, 0, z), P(w, 0, z), apex], col[1]) + poly([P(0, d, z), P(w, d, z), apex], col[0]) + poly([P(w, 0, z), P(w, d, z), apex], col[2]);
}
function sign(x, y, inner, stroke = '#3e8c86') {
  return `<g transform="translate(${x} ${y})"><rect x="-15" y="-15" width="30" height="30" rx="8" fill="#fff" stroke="${stroke}" stroke-width="2.5"/>${inner}</g>`;
}

// ---------- 醫院主樓（裝飾島） ----------
{
  const W = 240, H = 260, cx = 120, cy = 236;
  const P = iso(cx, cy - 10, 70, 60);
  let b = ellipse(cx, cy - 6, 100, 22, '#000', 'opacity=".08"');
  b += box(P, 70, 60, 120, 0, ['#fbfbf7', '#e7ecef', '#d6dee4']);
  for (let r = 0; r < 5; r++) { for (let i = 0; i < 3; i++) b += winL(P, 60, 6 + i * 21, 12 + r * 21, 12, 12); for (let i = 0; i < 3; i++) b += winR(P, 70, 6 + i * 18, 12 + r * 21, 11, 12); }
  b += box(P, 70, 60, 6, 120, TEAL);
  const [hx, hy] = P(35, 30, 126);
  b += ellipse(hx, hy, 26, 14, '#ffffff', 'stroke="#3e8c86" stroke-width="2"');
  b += `<text x="${hx}" y="${hy + 5}" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="15" fill="#3e8c86" transform="scale(1 1)">H</text>`;
  b += tree(cx - 98, cy - 10, 0.8) + tree(cx + 100, cy - 18, 0.75, '#6aa956') + flowers(cx - 50, cy + 6);
  save('decor-hospital', W, H, cx, cy, b);
}

// ---------- 02 住院病房 ----------
{
  const W = 280, H = 210, cx = 140, cy = 186;
  const P = iso(cx, cy - 10, 120, 54);
  let b = ellipse(cx, cy - 6, 124, 24, '#000', 'opacity=".08"');
  b += box(P, 120, 54, 52, 0, ['#f7fbfd', '#e2edf3', '#d0dfe8']);
  for (let i = 0; i < 6; i++) for (let r = 0; r < 2; r++) b += winL(P, 54, 6 + i * 19, 8 + r * 22, 11, 12, i % 2 ? '#cfe8f3' : '#ffe9b8');
  for (let i = 0; i < 2; i++) b += winR(P, 120, 8 + i * 22, 20, 12, 14);
  b += box(P, 120, 54, 6, 52, ['#7cc3d6', '#5ea6ba', '#8bd0e2']);
  // 病床標誌
  const [sx, sy] = P(60, 27, 70);
  b += sign(sx, sy - 18, `<rect x="-10" y="-1" width="20" height="6" rx="2" fill="#5ea6ba"/><rect x="-10" y="-7" width="7" height="6" rx="3" fill="#5ea6ba"/><rect x="-11" y="-7" width="2" height="15" fill="#5ea6ba"/><rect x="9" y="1" width="2" height="7" fill="#5ea6ba"/>`, '#5ea6ba');
  // 散步廊道
  const C = iso(cx + 30, cy + 12, 70, 12);
  b += box(C, 70, 12, 3, 26, ['#f4c95d', '#e0b24a', '#ecbd52']);
  for (const x of [0, 33, 66]) b += box(iso(cx + 30 - (70 - x - 2) * 0.866 + 0, cy + 12 - (70 - x - 2) * 0.5, 3, 3), 3, 3, 26, 0, ['#999', '#888', '#777']);
  b += tree(cx - 124, cy - 20, 0.8) + bush(cx + 120, cy - 6);
  save('station-ward', W, H, cx, cy, b);
}

// ---------- 03 跨團隊照護站 ----------
{
  const W = 260, H = 210, cx = 130, cy = 186;
  const P = iso(cx, cy - 12, 70, 70);
  let b = ellipse(cx, cy - 8, 112, 26, '#000', 'opacity=".08"');
  b += box(P, 70, 70, 40, 0, ['#fffaf0', '#f1e6cf', '#e5d5b6']);
  const doors = ['#6ca3d6', '#82c29e', '#f2a07c', '#a184c8'];
  doors.slice(0, 2).forEach((c, i) => (b += winL(P, 70, 10 + i * 32, 0, 18, 26, c)));
  doors.slice(2).forEach((c, i) => (b += winR(P, 70, 10 + i * 32, 0, 18, 26, c)));
  b += pyramid(P, 70, 70, 40, 34, ['#e88c66', '#c86c49', '#f2a07c']);
  // 四個小人代表四個專業
  const ppl = [[-96, 0, '#6ca3d6'], [-70, 14, '#82c29e'], [72, 14, '#f2a07c'], [98, 0, '#a184c8']];
  for (const [dx, dy, c] of ppl) b += `<g transform="translate(${cx + dx} ${cy + dy - 8})"><rect x="-6" y="-14" width="12" height="16" rx="5" fill="${c}"/><circle cy="-20" r="6" fill="#f5d0b5"/></g>`;
  save('station-team', W, H, cx, cy, b);
}

// ---------- 04 出院準備中心 ----------
{
  const W = 260, H = 210, cx = 130, cy = 186;
  const P = iso(cx, cy - 10, 90, 60);
  let b = ellipse(cx, cy - 6, 110, 24, '#000', 'opacity=".08"');
  b += box(P, 90, 60, 46, 0, ['#f8fcf5', '#e2efdb', '#d2e4c9']);
  b += winL(P, 60, 10, 0, 18, 28, '#6fae8b') + winL(P, 60, 40, 12, 36, 18, '#e6f4ff');
  b += winR(P, 90, 12, 12, 30, 18, '#e6f4ff');
  b += gable(P, 90, 60, 46, 22, ['#6fae8b', '#5a9374', '#82c29e']);
  // 清單牆
  b += `<g transform="translate(${cx + 70} ${cy - 92})"><rect width="34" height="42" rx="4" fill="#fff" stroke="#5a9374" stroke-width="2.5"/>
    ${[10, 20, 30].map((y) => `<path d="M6 ${y} l3 3 5-6" stroke="#4c9a57" stroke-width="2.5" fill="none"/><line x1="17" y1="${y}" x2="29" y2="${y}" stroke="#bcd9c3" stroke-width="2.5"/>`).join('')}
    <rect x="15" y="42" width="4" height="16" fill="#6b4529"/></g>`;
  b += flowers(cx - 90, cy - 2) + tree(cx - 110, cy - 26, 0.75);
  save('station-discharge-prep', W, H, cx, cy, b);
}

// ---------- 07 用藥小站 ----------
{
  const W = 230, H = 200, cx = 115, cy = 178;
  const P = iso(cx, cy - 8, 70, 54);
  let b = ellipse(cx, cy - 6, 96, 22, '#000', 'opacity=".08"');
  b += box(P, 70, 54, 38, 0, ['#fffaf5', '#f5e3d6', '#ead1bf']);
  b += winL(P, 54, 8, 0, 16, 26, '#c86c49') + winL(P, 54, 32, 12, 30, 16, '#fff3d6');
  b += winR(P, 70, 12, 12, 26, 16, '#fff3d6');
  // 條紋遮陽棚
  const A = iso(cx - 6, cy - 4, 70, 14);
  b += poly([A(0, 14, 34), A(70, 14, 34), A(70, 0, 42), A(0, 0, 42)], '#f28f8f');
  b += gable(P, 70, 54, 38, 18, ['#f2a07c', '#c86c49', '#f6b294']);
  // 膠囊招牌
  b += sign(cx + 74, cy - 92, `<g transform="rotate(-35)"><rect x="-11" y="-5" width="22" height="10" rx="5" fill="#fff" stroke="#c86c49" stroke-width="2"/><path d="M0 -5 h6 a5 5 0 0 1 0 10 h-6z" fill="#f28f8f"/></g>`, '#c86c49');
  b += `<rect x="${cx + 72}" y="${cy - 77}" width="4" height="44" fill="#6b4529"/>`;
  // 一週藥盒
  b += `<g transform="translate(${cx - 92} ${cy - 22})"><rect width="44" height="12" rx="3" fill="#fff" stroke="#a184c8" stroke-width="2"/>${[0, 1, 2, 3, 4, 5, 6].map((i) => `<rect x="${3 + i * 5.7}" y="3" width="4" height="6" rx="1" fill="${['#f28f8f', '#ffd166', '#82c29e', '#6ca3d6', '#a184c8', '#f2a07c', '#7cc3d6'][i]}"/>`).join('')}</g>`;
  save('station-medication', W, H, cx, cy, b);
}

// ---------- 08 低鹽餐桌 ----------
{
  const W = 240, H = 190, cx = 120, cy = 170;
  const P = iso(cx + 20, cy - 24, 60, 46);
  let b = ellipse(cx, cy - 8, 104, 24, '#000', 'opacity=".08"');
  b += box(P, 60, 46, 34, 0, ['#fffdf2', '#f2ead0', '#e6dbb8']);
  b += winL(P, 46, 8, 0, 14, 24, '#a46f45') + winL(P, 46, 30, 12, 20, 12, '#ffe7a6');
  b += gable(P, 60, 46, 34, 16, ['#ffd166', '#e0b24a', '#ffdd85']);
  // 戶外餐桌
  const T = iso(cx - 40, cy + 8, 50, 30);
  b += box(T, 50, 30, 4, 14, ['#fff', '#e6e6e6', '#f2f2f2']);
  b += poly([T(0, 30, 18), T(50, 30, 18), T(50, 0, 18), T(0, 0, 18)], '#f6f6f6');
  for (const [x, y] of [[2, 2], [46, 2], [2, 26], [46, 26]]) b += box(iso(0, 0, 1, 1), 1, 1, 1, 0, ['#fff', '#fff', '#fff']).replace(/.*/, '') + '';
  const [tx, ty] = T(25, 15, 18);
  b += ellipse(tx - 12, ty, 7, 3.5, '#82c29e') + ellipse(tx + 4, ty + 2, 6, 3, '#f28f8f') + ellipse(tx + 14, ty - 3, 5, 2.5, '#ffd166');
  b += `<rect x="${tx - 4}" y="${ty - 14}" width="6" height="10" rx="2" fill="#7cc3d6"/>`;
  b += box(iso(cx - 76, cy + 14, 8, 8), 8, 8, 10, 0, ['#c98b5a', '#a86d42', '#b97b4c']) + box(iso(cx + 2, cy + 30, 8, 8), 8, 8, 10, 0, ['#c98b5a', '#a86d42', '#b97b4c']);
  // 菜園
  for (let i = 0; i < 5; i++) b += ellipse(cx + 70 + (i % 2) * 10, cy - 10 + i * 5, 6, 3.5, '#5f9e4f');
  save('station-diet', W, H, cx, cy, b);
}

// ---------- 09 活動步道 ----------
{
  const W = 240, H = 190, cx = 120, cy = 170;
  let b = ellipse(cx, cy - 10, 106, 26, '#000', 'opacity=".06"');
  // 小丘
  b += `<path d="M${cx - 90} ${cy - 6} Q${cx - 20} ${cy - 90} ${cx + 70} ${cy - 10}Z" fill="#8cc06a"/>`;
  b += `<path d="M${cx - 70} ${cy - 8} Q${cx - 30} ${cy - 40} ${cx - 2} ${cy - 54} Q${cx + 30} ${cy - 40} ${cx + 50} ${cy - 12}" stroke="#f3e6c4" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  // 涼亭
  const G = iso(cx - 2, cy - 54, 24, 24);
  for (const [x, y] of [[0, 0], [24, 0], [0, 24], [24, 24]]) { const [px, py] = G(x, y, 0); b += `<rect x="${px - 1.5}" y="${py - 22}" width="3" height="22" fill="#a98467"/>`; }
  b += pyramid(G, 24, 24, 22, 14, ['#e88c66', '#c86c49', '#f2a07c']);
  // 里程牌與長椅
  b += `<g transform="translate(${cx + 78} ${cy - 40})"><rect x="-2" y="0" width="4" height="34" fill="#6b4529"/><path d="M-2 4 h26 l6 6 -6 6 h-26z" fill="#ffd166" stroke="#a86d42"/><path d="M4 8 l4 4 -4 4" stroke="#a86d42" stroke-width="2" fill="none"/></g>`;
  b += bench(iso(cx - 84, cy + 6, 22, 6), 0, 0);
  b += tree(cx + 96, cy - 14, 0.7, '#6aa956') + tree(cx - 100, cy - 30, 0.65) + flowers(cx + 30, cy + 4);
  save('station-activity', W, H, cx, cy, b);
}

// ---------- 11 回診車站 ----------
{
  const W = 260, H = 220, cx = 130, cy = 196;
  let b = ellipse(cx, cy - 6, 116, 22, '#000', 'opacity=".08"');
  // 月台
  const Pl = iso(cx + 10, cy + 6, 140, 26);
  b += box(Pl, 140, 26, 6, 0, ['#e6dfcf', '#cfc6b3', '#d9d0bd']);
  // 站房
  const P = iso(cx + 30, cy - 18, 60, 40);
  b += box(P, 60, 40, 36, 6, ['#f6fbff', '#dbe9f3', '#c8dcea']);
  b += winL(P, 40, 8, 6, 14, 26, '#4f86c6') + winL(P, 40, 30, 18, 20, 12);
  b += gable(P, 60, 40, 42, 16, ['#4f86c6', '#3d6fa8', '#629ad8']);
  // 鐘塔
  const T = iso(cx - 52, cy - 14, 16, 16);
  b += box(T, 16, 16, 70, 6, ['#fffaf0', '#f1e6cf', '#e5d5b6']);
  const [kx, ky] = T(8, 16, 62);
  b += `<circle cx="${kx - 6}" cy="${ky}" r="9" fill="#fff" stroke="#3b3a36" stroke-width="2"/><path d="M${kx - 6} ${ky} v-6 M${kx - 6} ${ky} h4" stroke="#3b3a36" stroke-width="2"/>`;
  b += pyramid(T, 16, 16, 76, 14, ['#4f86c6', '#3d6fa8', '#629ad8']);
  // 小車廂
  const V = iso(cx - 10, cy + 30, 48, 18);
  b += box(V, 48, 18, 20, 6, ['#ffd166', '#e0b24a', '#ecbd52']);
  b += winL(V, 18, 5, 14, 12, 8, '#e6f4ff') + winL(V, 18, 20, 14, 12, 8, '#e6f4ff') + winL(V, 18, 34, 14, 10, 8, '#e6f4ff');
  save('station-follow-up', W, H, cx, cy, b);
}

// ---------- 小建築（照護重點） ----------
const HUTS = [
  ['#f2a07c', '#c86c49', '#f6b294'], ['#6ca3d6', '#46769f', '#82b5e2'], ['#82c29e', '#5a9374', '#9ad2b1'], ['#a184c8', '#735596', '#b59ad6'],
];
HUTS.forEach((roof, i) => {
  const W = 56, H = 58, cx = 28, cy = 52;
  const P = iso(cx, cy - 2, 22, 18);
  let b = ellipse(cx, cy - 2, 24, 6, '#000', 'opacity=".1"');
  b += box(P, 22, 18, 16, 0, ['#fffdf8', '#efe6d6', '#e2d6c1']);
  b += winL(P, 18, 7, 0, 7, 11, roof[1]);
  b += gable(P, 22, 18, 16, 10, roof, 2);
  save(`hut-${i}`, W, H, cx, cy, b);
});

// ---------- 巡島小人偶「心心」 ----------
{
  const FW = 40, FH = 44;
  const frame = (f) => {
    const lift = f === 1 ? -2 : 0;
    return `<g transform="translate(${f * FW} 0)">
      <ellipse cx="20" cy="41" rx="10" ry="3" fill="#000" opacity=".15"/>
      <rect x="${13 + (f ? 1 : 0)}" y="${31 + lift}" width="4" height="9" rx="2" fill="#8b3a3a"/>
      <rect x="${23 - (f ? 1 : 0)}" y="${31 - lift}" width="4" height="9" rx="2" fill="#8b3a3a"/>
      <path d="M20 36 C2 24 4 6 13 6 C17 6 19 9 20 12 C21 9 23 6 27 6 C36 6 38 24 20 36Z" fill="#ef5f67" stroke="#b83f47" stroke-width="1.5"/>
      <ellipse cx="13.5" cy="12" rx="3" ry="2" fill="#fff" opacity=".6"/>
      <circle cx="16" cy="19" r="1.8" fill="#3b2a2a"/><circle cx="24" cy="19" r="1.8" fill="#3b2a2a"/>
      <path d="M17 23 Q20 26 23 23" stroke="#3b2a2a" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <circle cx="12.5" cy="22" r="2" fill="#ffb3b8"/><circle cx="27.5" cy="22" r="2" fill="#ffb3b8"/>
      <path d="M${f ? 6 : 7} ${f ? 15 : 20} L3 ${f ? 9 : 16}" stroke="#b83f47" stroke-width="2.4" stroke-linecap="round"/>
    </g>`;
  };
  writeFileSync(join(out, 'mascot.svg'), svg(FW * 2, FH, frame(0) + frame(1)));
  manifest.mascot = { file: 'assets/mascot.svg', frameWidth: FW, frameHeight: FH };
}

// ---------- 裝飾 ----------
save('tree-round', 50, 64, 25, 60, tree(25, 60, 1.1));
save('tree-pine', 44, 72, 22, 68, `<rect x="19" y="52" width="6" height="16" fill="#8a5a3b"/>
  <polygon points="22,6 40,40 4,40" fill="#4f8f5b"/><polygon points="22,22 42,58 2,58" fill="#468553"/>`);
save('boat', 90, 60, 45, 50, `<ellipse cx="45" cy="52" rx="36" ry="6" fill="#000" opacity=".1"/>
  <path d="M10 38 L80 38 L68 52 L22 52Z" fill="#ffffff" stroke="#3b3a36" stroke-opacity=".4"/>
  <rect x="10" y="38" width="70" height="4" fill="#4f86c6"/>
  <rect x="44" y="6" width="3" height="32" fill="#6b5b4c"/><path d="M47 8 L72 34 L47 34Z" fill="#fff3d6" stroke="#3b3a36" stroke-opacity=".3"/>
  <path d="M44 12 L24 34 L44 34Z" fill="#ef8354" opacity=".9"/>`);
save('wave', 40, 12, 20, 6, `<path d="M2 8 Q10 0 20 6 T38 6" fill="none" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" opacity=".7"/>`);

// ---------- 角色精靈表（4 方向 × 3 影格） ----------
const FW = 40, FH = 56;
function person(dir, frame, o) {
  // dir: down / left / right / up；frame: 0 站立，1/2 走路
  const step = frame === 0 ? 0 : frame === 1 ? 1 : -1;
  const bob = frame === 0 ? 0 : -1;
  let g = '';
  const leg = (x, dy, fill) => `<rect x="${x}" y="${41 + dy + bob}" width="6" height="${11 - Math.abs(dy)}" rx="2.5" fill="${fill}"/>`;
  if (dir === 'down' || dir === 'up') {
    g += leg(13, step > 0 ? -2 : 0, o.pants) + leg(21, step < 0 ? -2 : 0, o.pants);
    g += `<rect x="12" y="${51 + bob - (step > 0 ? 2 : 0)}" width="8" height="4" rx="2" fill="${o.shoes}"/>`;
    g += `<rect x="20" y="${51 + bob - (step < 0 ? 2 : 0)}" width="8" height="4" rx="2" fill="${o.shoes}"/>`;
    // 身體
    g += `<rect x="10" y="${25 + bob}" width="20" height="19" rx="7" fill="${o.top}"/>`;
    g += o.pattern ? o.pattern(10, 25 + bob, 20, 19) : '';
    // 手臂擺動
    g += `<rect x="6" y="${27 + bob + step}" width="5" height="13" rx="2.5" fill="${o.top}"/>`;
    g += `<rect x="29" y="${27 + bob - step}" width="5" height="13" rx="2.5" fill="${o.top}"/>`;
    g += `<circle cx="8.5" cy="${41 + bob + step}" r="2.6" fill="${o.skin}"/><circle cx="31.5" cy="${41 + bob - step}" r="2.6" fill="${o.skin}"/>`;
    if (o.accessory && dir === 'down') g += o.accessory(bob);
    // 頭
    g += `<circle cx="20" cy="${15 + bob}" r="11" fill="${o.skin}"/>`;
    if (dir === 'down') {
      g += `<path d="M9 ${14 + bob} Q10 ${2 + bob} 20 ${3 + bob} Q30 ${2 + bob} 31 ${14 + bob} Q26 ${8 + bob} 20 ${9 + bob} Q13 ${8 + bob} 9 ${14 + bob}Z" fill="${o.hair}"/>`;
      g += `<circle cx="16" cy="${16 + bob}" r="1.6" fill="#3b3a36"/><circle cx="24" cy="${16 + bob}" r="1.6" fill="#3b3a36"/>`;
      g += `<path d="M17 ${20 + bob} Q20 ${22.5 + bob} 23 ${20 + bob}" stroke="#3b3a36" stroke-width="1.3" fill="none" stroke-linecap="round"/>`;
      g += `<circle cx="13" cy="${19 + bob}" r="2" fill="#f4a7b9" opacity=".6"/><circle cx="27" cy="${19 + bob}" r="2" fill="#f4a7b9" opacity=".6"/>`;
    } else {
      g += `<circle cx="20" cy="${14 + bob}" r="11.4" fill="${o.hair}"/>`;
      if (o.accessory) g += o.backAccessory ? o.backAccessory(bob) : '';
    }
  } else {
    // 側面（朝右畫，朝左用鏡像）
    g += leg(16 + step * 3, 0, o.pants) + leg(18 - step * 3, 0, o.pants);
    g += `<rect x="${15 + step * 3}" y="${51 + bob}" width="9" height="4" rx="2" fill="${o.shoes}"/>`;
    g += `<rect x="${17 - step * 3}" y="${51 + bob}" width="9" height="4" rx="2" fill="${o.shoes}"/>`;
    g += `<rect x="12" y="${25 + bob}" width="16" height="19" rx="7" fill="${o.top}"/>`;
    g += o.pattern ? o.pattern(12, 25 + bob, 16, 19) : '';
    if (o.sideAccessory) g += o.sideAccessory(bob);
    g += `<rect x="${17 + step * 3}" y="${27 + bob}" width="5" height="13" rx="2.5" fill="${o.top}" stroke="#000" stroke-opacity=".1"/>`;
    g += `<circle cx="${19.5 + step * 3}" cy="${41 + bob}" r="2.6" fill="${o.skin}"/>`;
    g += `<circle cx="20" cy="${15 + bob}" r="11" fill="${o.skin}"/>`;
    g += `<path d="M9 ${16 + bob} Q9 ${3 + bob} 20 ${3.5 + bob} Q29 ${4 + bob} 30 ${10 + bob} Q22 ${9 + bob} 18 ${12 + bob} Q15 ${18 + bob} 9 ${16 + bob}Z" fill="${o.hair}"/>`;
    g += `<circle cx="25" cy="${16 + bob}" r="1.6" fill="#3b3a36"/>`;
    g += `<path d="M24 ${20.5 + bob} Q26 ${21.5 + bob} 28 ${20 + bob}" stroke="#3b3a36" stroke-width="1.2" fill="none" stroke-linecap="round"/>`;
    g += `<circle cx="25" cy="${19.5 + bob}" r="2" fill="#f4a7b9" opacity=".6"/>`;
  }
  return g;
}
function sheet(name, o) {
  const dirs = ['down', 'left', 'right', 'up'];
  let body = '';
  dirs.forEach((d, r) => {
    for (let f = 0; f < 3; f++) {
      const inner = person(d === 'left' ? 'right' : d, f, o);
      const tx = f * FW, ty = r * FH;
      body += d === 'left'
        ? `<g transform="translate(${tx + FW} ${ty}) scale(-1 1)">${inner}</g>`
        : `<g transform="translate(${tx} ${ty})">${inner}</g>`;
    }
  });
  writeFileSync(join(out, `${name}.svg`), svg(FW * 3, FH * 4, body));
  manifest[name] = { file: `assets/${name}.svg`, frameWidth: FW, frameHeight: FH, rows: dirs, frames: ['stand', 'walk1', 'walk2'] };
}
sheet('avatar-patient', {
  skin: '#f5d0b5', hair: '#8d8d93', top: '#9fc9e8', pants: '#5f86b4', shoes: '#e6e6e6',
  pattern: (x, y, w, h) => [4, 9, 14].map((d) => `<rect x="${x + 2}" y="${y + d}" width="${w - 4}" height="1.6" fill="#ffffff" opacity=".7"/>`).join(''),
  accessory: (bob) => `<rect x="5.5" y="${36 + bob}" width="6" height="2.4" rx="1" fill="#ffffff"/>`, // 手圈
});
sheet('avatar-caregiver', {
  skin: '#f1c7a5', hair: '#3f2f28', top: '#f08a5d', pants: '#3f5a7a', shoes: '#5b4636',
  pattern: (x, y, w) => `<rect x="${x + w / 2 - 1}" y="${y + 2}" width="2" height="15" fill="#d96f45"/>`,
  accessory: (bob) => `<path d="M12 ${26 + bob} L26 ${42 + bob}" stroke="#6b4b3a" stroke-width="2.5"/><rect x="24" y="${38 + bob}" width="9" height="9" rx="2" fill="#ffd166"/>`,
  backAccessory: (bob) => `<path d="M28 ${26 + bob} L14 ${42 + bob}" stroke="#6b4b3a" stroke-width="2.5"/>`,
  sideAccessory: (bob) => `<rect x="9" y="${32 + bob}" width="9" height="11" rx="2" fill="#ffd166"/>`,
});
sheet('avatar-staff', {
  skin: '#f3cfb3', hair: '#2b2b2b', top: '#ffffff', pants: '#4fa7a0', shoes: '#e6e6e6',
  pattern: (x, y, w, h) => `<rect x="${x + w / 2 - 3}" y="${y + 1}" width="6" height="${h - 4}" fill="#4fa7a0"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="none" stroke="#c9d6de" stroke-width="1.2"/>`,
  accessory: (bob) => `<path d="M14 ${26 + bob} Q14 ${36 + bob} 20 ${37 + bob} Q26 ${36 + bob} 26 ${26 + bob}" stroke="#3b3a36" stroke-width="1.6" fill="none"/><circle cx="20" cy="${38 + bob}" r="2.2" fill="#9aa5ad"/>`,
  sideAccessory: (bob) => `<rect x="14" y="${30 + bob}" width="5" height="7" rx="1" fill="#6ca3d6"/>`,
});

writeFileSync(join(out, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
// 程式端也讀同一份清單（決定素材原點、角色影格大小）
writeFileSync(join(root, 'src', 'game', 'assetManifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log('已產生素材：', Object.keys(manifest).join(', '));
