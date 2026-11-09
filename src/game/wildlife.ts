// 島上的動物與海岸生命：入口的橘白貓、返家照護站的小狗、近岸浪花、淺水魚群、外海海龜。
// ・全部是程式產生的低多邊形模型，沿用島上的比例、平面著色與光線。
// ・動物不加入點擊命中範圍，玩家可以自由經過，點到動物時會點到牠腳下的島。
// ・減少動態效果時：浪花、魚群、海龜與待機動作全部停止；動物對玩家的反應改為直接切換姿勢。
// ・修改擺放位置：調整下方 WILDLIFE_SPOTS。
import * as THREE from 'three';
import { HEX, SEA_LEVEL, TILES, tileHeight, tileOf, type Tile } from './mapData';
import { mat } from './models';

export type TimeOfDay = 'morning' | 'day' | 'night';

/** 動物與海洋生物的位置（相對於所在島中心，避開步道節點與小屋） */
export const WILDLIFE_SPOTS = {
  /** 入口：醫院主樓大門右側，玩家一進島就在旁邊 */
  cat: { tile: 'decor-hospital', dx: 34, dz: 18, yaw: -0.45, near: 90, scale: 2 },
  /** 返家照護站：回家之門左側柱子旁、步道外側 */
  dog: { tile: 'home-care', dx: -20, dz: 20, yaw: 0.3, near: 100, scale: 1.95 },
  /** 淺水魚群：出院碼頭與心尖之間的海灣 */
  fish: { x: 392, y: 736, rx: 20, ry: 11, count: 8 },
  /** 海龜：右下外海 */
  turtle: { x: 900, y: 830, rx: 120, ry: 55 },
};

const FOAM: Record<TimeOfDay, { color: string; opacity: number }> = {
  morning: { color: '#fff8f0', opacity: 1 },
  day: { color: '#ffffff', opacity: 1 },
  night: { color: '#c9daff', opacity: 0.7 },
};
const FISH: Record<TimeOfDay, { color: string; opacity: number }> = {
  morning: { color: '#2f5f6b', opacity: 0.6 },
  day: { color: '#164f62', opacity: 0.62 },
  night: { color: '#0b2236', opacity: 0.7 },
};

const ico = (r: number, color: string, sx = 1, sy = 1, sz = 1) => {
  const m = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 1).scale(sx, sy, sz), mat(color));
  m.castShadow = true;
  return m;
};
const at = <T extends THREE.Object3D>(o: T, x: number, y: number, z: number) => { o.position.set(x, y, z); return o; };
const damp = (cur: number, target: number, rate: number, dt: number) => cur + (target - cur) * (1 - Math.exp(-rate * dt));

// ───────────────────────── 橘白貓 ─────────────────────────
class Cat {
  readonly group = new THREE.Group();
  private head = new THREE.Group();
  private tail = new THREE.Group();
  private eyes: THREE.Mesh[] = [];
  private nextBlink = 2;
  private blinkT = 0;
  private yaw0: number;
  looking = false;

  constructor(x: number, y: number, z: number, yaw: number, private near: number) {
    const ORANGE = '#f0a254', WHITE = '#fff6ea', DARK = '#3b2a2a';
    this.yaw0 = yaw;
    this.group.position.set(x, y, z);
    this.group.rotation.y = yaw;
    // 坐姿身體
    this.group.add(at(ico(1, ORANGE, 5.4, 6.6, 6.4), 0, 6.2, -0.5));
    this.group.add(at(ico(1, WHITE, 3.4, 4.6, 2), 0, 6.8, 4.3)); // 白色胸口
    this.group.add(at(ico(1, ORANGE, 2.6, 0.9, 2), -3.2, 6.8, -0.5)); // 橘色條紋
    this.group.add(at(ico(1, WHITE, 1.4, 1, 1.8), -1.8, 0.9, 4.6), at(ico(1, WHITE, 1.4, 1, 1.8), 1.8, 0.9, 4.6)); // 白腳掌
    // 頭
    this.head.position.set(0, 14.2, 1.6);
    this.head.add(ico(4.6, ORANGE, 1.08, 0.94, 1));
    this.head.add(at(ico(1, WHITE, 2.6, 1.7, 1.5), 0, -1.4, 3.6)); // 白色口鼻
    this.head.add(at(ico(0.6, '#f4a7b9'), 0, -0.6, 4.9));
    for (const sx of [-1, 1]) {
      const ear = new THREE.Mesh(new THREE.ConeGeometry(1.9, 3.6, 4), mat(ORANGE));
      ear.position.set(sx * 2.7, 4.2, 0);
      ear.rotation.z = -sx * 0.25;
      this.head.add(ear);
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.4, 0.5), mat(DARK));
      eye.position.set(sx * 1.8, 0.7, 4.3);
      this.eyes.push(eye);
      this.head.add(eye);
    }
    this.group.add(this.head);
    // 尾巴：三節，慢慢擺動
    this.tail.position.set(0, 2.2, -6);
    let seg: THREE.Object3D = this.tail;
    for (let i = 0; i < 3; i++) {
      const s = new THREE.Group();
      const piece = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.1, 4.2, 6).translate(0, 2, 0), mat(i === 2 ? WHITE : ORANGE));
      piece.castShadow = true;
      s.add(piece);
      s.position.y = i === 0 ? 0 : 4;
      s.rotation.x = i === 0 ? -1.2 : -0.35;
      seg.add(s);
      seg = s;
    }
    this.group.add(this.tail);
  }

  update(dt: number, t: number, player: THREE.Vector3, reduced: boolean) {
    const d = Math.hypot(player.x - this.group.position.x, player.z - this.group.position.z);
    this.looking = d < this.near;
    // 抬頭看向玩家
    let yaw = 0, pitch = 0;
    if (this.looking) {
      const world = Math.atan2(player.x - this.group.position.x, player.z - this.group.position.z);
      yaw = THREE.MathUtils.clamp(Math.atan2(Math.sin(world - this.yaw0), Math.cos(world - this.yaw0)), -1.1, 1.1);
      pitch = -0.32;
    }
    if (reduced) {
      this.head.rotation.set(pitch, yaw, 0);
      for (const e of this.eyes) e.scale.y = 1;
      this.tail.rotation.y = 0;
      return;
    }
    this.head.rotation.y = damp(this.head.rotation.y, yaw, 4, dt);
    this.head.rotation.x = damp(this.head.rotation.x, pitch + Math.sin(t * 0.7) * 0.04, 4, dt);
    this.tail.rotation.y = Math.sin(t * (this.looking ? 1.8 : 1.1)) * 0.45;
    // 眨眼
    this.nextBlink -= dt;
    if (this.nextBlink <= 0) { this.blinkT = 0.14; this.nextBlink = 2.5 + ((t * 7.3) % 3); }
    if (this.blinkT > 0) this.blinkT -= dt;
    for (const e of this.eyes) e.scale.y = this.blinkT > 0 ? 0.12 : 1;
  }
}

// ───────────────────────── 小狗 ─────────────────────────
class Dog {
  readonly group = new THREE.Group();
  private torso = new THREE.Group();
  private head = new THREE.Group();
  private tail = new THREE.Group();
  private legs: THREE.Mesh[] = [];
  private s = 0; // 0 趴著休息、1 站起來
  private yaw0: number;
  standing = false;

  constructor(x: number, y: number, z: number, yaw: number, private near: number) {
    const TAN = '#d79a5c', CREAM = '#fbecd6', BROWN = '#8b5a2b', DARK = '#2f2622';
    this.yaw0 = yaw;
    this.group.position.set(x, y, z);
    this.group.rotation.y = yaw;
    this.torso.add(ico(1, TAN, 4.6, 4, 8.4));
    this.torso.add(at(ico(1, CREAM, 3, 2.6, 3), 0, -0.6, 5.2));
    this.group.add(this.torso);
    for (const [lx, lz] of [[-2.6, 4.6], [2.6, 4.6], [-2.6, -4.6], [2.6, -4.6]]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.1, 6, 6).translate(0, 3, 0), mat(lz > 0 ? CREAM : TAN));
      leg.position.set(lx, 0, lz);
      leg.castShadow = true;
      this.legs.push(leg);
      this.group.add(leg);
    }
    this.head.add(ico(3.8, TAN));
    this.head.add(at(ico(1, CREAM, 2, 1.6, 2.4), 0, -1, 3.2)); // 口鼻
    this.head.add(at(ico(0.8, DARK), 0, -0.4, 5.4)); // 鼻子
    for (const sx of [-1, 1]) {
      const ear = new THREE.Mesh(new THREE.BoxGeometry(1.4, 4.4, 2.6).translate(0, -2, 0), mat(BROWN));
      ear.position.set(sx * 3.4, 2.2, -0.4);
      ear.rotation.z = sx * 0.35;
      this.head.add(ear);
      const eye = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1, 0.5), mat(DARK));
      eye.position.set(sx * 1.6, 0.9, 3.2);
      this.head.add(eye);
    }
    this.group.add(this.head);
    const tailPiece = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 1, 5.5, 6).translate(0, 2.7, 0), mat(TAN));
    tailPiece.castShadow = true;
    this.tail.add(tailPiece);
    this.group.add(this.tail);
    this.pose(0, 0, 0);
  }

  /** s：0 趴著、1 站著；wag：搖尾巴角度；look：頭轉向 */
  private pose(s: number, wag: number, look: number) {
    this.torso.position.set(0, 3.6 + s * 4.6, 0);
    this.torso.rotation.x = -0.06 * s;
    for (const l of this.legs) { l.scale.y = 0.18 + 0.82 * s; l.position.y = 0; }
    this.head.position.set(0, 4.4 + s * 7.6, 8.2 + s * 1.4);
    this.head.rotation.set(0.28 - s * 0.45, look, 0);
    this.tail.position.set(0, 4.2 + s * 4.6, -7.6);
    this.tail.rotation.set(-1.45 + s * 0.85, wag, 0);
  }

  update(dt: number, t: number, player: THREE.Vector3, reduced: boolean) {
    const d = Math.hypot(player.x - this.group.position.x, player.z - this.group.position.z);
    this.standing = d < this.near;
    let look = 0;
    if (this.standing) {
      const world = Math.atan2(player.x - this.group.position.x, player.z - this.group.position.z);
      look = THREE.MathUtils.clamp(Math.atan2(Math.sin(world - this.yaw0), Math.cos(world - this.yaw0)), -0.9, 0.9);
    }
    if (reduced) {
      this.s = this.standing ? 1 : 0;
      this.pose(this.s, 0, look);
      return;
    }
    this.s = damp(this.s, this.standing ? 1 : 0, 5, dt);
    const wag = this.standing ? Math.sin(t * 15) * 0.7 * this.s : Math.sin(t * 1.3) * 0.15;
    const breathe = (1 - this.s) * Math.sin(t * 2.2) * 0.25;
    this.pose(this.s, wag, look * this.s);
    this.torso.position.y += breathe;
  }
}

// ───────────────────────── 近岸浪花（一次繪製） ─────────────────────────
const FOAM_VERT = /* glsl */ `
  attribute vec2 aNormal;
  attribute float aPhase;
  attribute float aU;
  attribute float aSide;
  uniform float uTime;
  varying float vAlpha;
  varying float vSide;
  void main() {
    float p = fract(uTime * 0.11 + aPhase);
    float dist = mix(46.0, 3.0, p);            // 從外海慢慢推向岸邊
    vec3 pos = position + vec3(aNormal.x, 0.0, aNormal.y) * (dist + aSide * mix(14.0, 6.0, p));
    vAlpha = smoothstep(0.0, 0.3, p) * (1.0 - smoothstep(0.72, 1.0, p)) * sin(3.14159 * aU);
    vSide = aSide;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }`;
const FOAM_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlpha;
  varying float vSide;
  void main() {
    float edge = 1.0 - abs(vSide - 0.5) * 2.0;
    gl_FragColor = vec4(uColor, min(1.0, uOpacity * vAlpha * (0.6 + 0.6 * edge)));
  }`;

/** 找出心形島的外圍海岸線，每段海岸放兩道前後錯開的浪花 */
function buildFoam() {
  const R = HEX.R * 1.07;
  const centers = TILES.map((t) => [t.x, t.y]);
  const pos: number[] = [], nrm: number[] = [], phase: number[] = [], us: number[] = [], side: number[] = [];
  const idx: number[] = [];
  let edges = 0;
  for (const t of TILES) {
    for (let k = 0; k < 6; k++) {
      const a = ((k + 0.5) * Math.PI) / 3; // 邊的法線方向（平頂六角形）
      const nx = Math.cos(a), nz = Math.sin(a);
      const ox = t.x + nx * HEX.R * Math.sqrt(3), oz = t.y + nz * HEX.R * Math.sqrt(3);
      if (centers.some(([cx, cz]) => Math.hypot(cx - ox, cz - oz) < 20)) continue; // 有鄰島，不是海岸
      edges++;
      const a0 = (k * Math.PI) / 3, a1 = ((k + 1) * Math.PI) / 3;
      const p0 = [t.x + Math.cos(a0) * R, t.y + Math.sin(a0) * R], p1 = [t.x + Math.cos(a1) * R, t.y + Math.sin(a1) * R];
      for (const ph of [((t.x * 0.013 + k * 0.37) % 1 + 1) % 1, ((t.x * 0.013 + k * 0.37 + 0.5) % 1 + 1) % 1]) {
        const SEG = 6;
        const base = pos.length / 3;
        for (let i = 0; i <= SEG; i++) {
          const u = i / SEG;
          // 兩端稍微往外延伸，讓轉角處的浪花接起來
          const ux = -0.08 + u * 1.16;
          const x = p0[0] + (p1[0] - p0[0]) * ux, z = p0[1] + (p1[1] - p0[1]) * ux;
          for (const sd of [0, 1]) {
            pos.push(x, SEA_LEVEL + 2.4, z);
            nrm.push(nx, nz);
            phase.push(ph);
            us.push(u);
            side.push(sd);
          }
        }
        for (let i = 0; i < SEG; i++) {
          const a = base + i * 2, b = a + 1, c = a + 2, d = a + 3;
          idx.push(a, c, b, b, c, d);
        }
      }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('aNormal', new THREE.Float32BufferAttribute(nrm, 2));
  g.setAttribute('aPhase', new THREE.Float32BufferAttribute(phase, 1));
  g.setAttribute('aU', new THREE.Float32BufferAttribute(us, 1));
  g.setAttribute('aSide', new THREE.Float32BufferAttribute(side, 1));
  g.setIndex(idx);
  const m = new THREE.ShaderMaterial({
    vertexShader: FOAM_VERT,
    fragmentShader: FOAM_FRAG,
    uniforms: { uTime: { value: 3.3 }, uColor: { value: new THREE.Color('#ffffff') }, uOpacity: { value: 0.85 } },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const mesh = new THREE.Mesh(g, m);
  mesh.frustumCulled = false;
  mesh.renderOrder = 2;
  return { mesh, mat: m, edges };
}

// ───────────────────────── 魚群（一次繪製） ─────────────────────────
function fishGeometry() {
  const body = new THREE.ConeGeometry(1.7, 7, 5).rotateX(Math.PI / 2); // 尖端朝 +z
  const s = new THREE.Shape();
  s.moveTo(0, 0); s.lineTo(-2.4, -3.2); s.lineTo(2.4, -3.2); s.lineTo(0, 0);
  const tail = new THREE.ShapeGeometry(s).rotateX(-Math.PI / 2).translate(0, 0, -3.2);
  body.deleteAttribute('uv'); tail.deleteAttribute('uv');
  const merged = new THREE.BufferGeometry();
  const b = body.toNonIndexed(), t = tail.toNonIndexed();
  const pos = new Float32Array([...(b.attributes.position.array as Float32Array), ...(t.attributes.position.array as Float32Array)]);
  merged.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  merged.scale(1, 0.35, 1);
  return merged;
}

// ───────────────────────── 海龜 ─────────────────────────
function turtleModel() {
  const g = new THREE.Group();
  const shell = ico(1, '#5f8b4c', 9, 3.6, 11);
  shell.position.y = 1.6;
  const rim = ico(1, '#c9b07a', 9.6, 1.4, 11.6);
  rim.position.y = 0.4;
  const head = ico(2.6, '#a9c983', 1, 0.8, 1.3);
  head.position.set(0, 1.2, 12.6);
  head.name = 'head';
  g.add(shell, rim, head);
  const flippers: THREE.Mesh[] = [];
  for (const [fx, fz, len] of [[-8, 5, 7], [8, 5, 7], [-6.5, -7, 4.5], [6.5, -7, 4.5]] as const) {
    const f = ico(1, '#a9c983', len, 0.6, 2.2);
    f.position.set(fx, 0.4, fz);
    f.rotation.y = fx < 0 ? 0.5 : -0.5;
    flippers.push(f);
    g.add(f);
  }
  g.userData.flippers = flippers;
  return g;
}

export class Wildlife {
  readonly group = new THREE.Group();
  private cat: Cat;
  private dog: Dog;
  private foam: ReturnType<typeof buildFoam>;
  private fish: THREE.InstancedMesh;
  private fishMat: THREE.MeshBasicMaterial;
  private turtle: THREE.Group;
  private turtleShadow: THREE.Mesh;
  private ripple: THREE.Mesh;
  private dummy = new THREE.Object3D();
  private time = 3.3;
  turtleUp = 0;

  constructor() {
    const place = (spot: { tile: string; dx: number; dz: number }) => {
      const t = tileOf(spot.tile) as Tile;
      return [t.x + spot.dx, tileHeight(t) + 3.2, t.y + spot.dz] as const;
    };
    const c = WILDLIFE_SPOTS.cat, d = WILDLIFE_SPOTS.dog;
    this.cat = new Cat(...place(c), c.yaw, c.near);
    this.cat.group.scale.setScalar(c.scale);
    this.dog = new Dog(...place(d), d.yaw, d.near);
    this.dog.group.scale.setScalar(d.scale);
    this.foam = buildFoam();
    this.fishMat = new THREE.MeshBasicMaterial({ color: FISH.day.color, transparent: true, opacity: FISH.day.opacity, depthWrite: false, side: THREE.DoubleSide });
    this.fish = new THREE.InstancedMesh(fishGeometry(), this.fishMat, WILDLIFE_SPOTS.fish.count);
    this.fish.frustumCulled = false;
    this.fish.renderOrder = 3;
    this.turtle = turtleModel();
    this.turtleShadow = new THREE.Mesh(new THREE.CircleGeometry(1, 10).scale(10, 12, 1).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: '#1f5f73', transparent: true, opacity: 0.35, depthWrite: false }));
    this.turtleShadow.renderOrder = 3;
    this.ripple = new THREE.Mesh(new THREE.RingGeometry(0.85, 1, 32).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0, depthWrite: false }));
    this.ripple.renderOrder = 3;
    this.group.add(this.cat.group, this.dog.group, this.foam.mesh, this.fish, this.turtle, this.turtleShadow, this.ripple);
    this.step(0, true);
  }

  get coastEdges() { return this.foam.edges; }

  setTimeOfDay(tod: TimeOfDay) {
    this.foam.mat.uniforms.uColor.value.set(FOAM[tod].color);
    this.foam.mat.uniforms.uOpacity.value = FOAM[tod].opacity;
    this.fishMat.color.set(FISH[tod].color);
    this.fishMat.opacity = FISH[tod].opacity;
    (this.turtleShadow.material as THREE.MeshBasicMaterial).color.set(FISH[tod].color);
  }

  /** 每影格呼叫；reduced 為 true 時環境動畫停止 */
  update(dt: number, player: THREE.Vector3, reduced: boolean) {
    if (!reduced) this.time += dt;
    this.cat.update(dt, this.time, player, reduced);
    this.dog.update(dt, this.time, player, reduced);
    if (!reduced) this.step(this.time, false);
  }

  private step(t: number, initial: boolean) {
    this.foam.mat.uniforms.uTime.value = t;
    // 魚群：沿著小橢圓慢慢游，每條魚有自己的擺動
    const F = WILDLIFE_SPOTS.fish;
    for (let i = 0; i < F.count; i++) {
      const a = t * 0.22 + (i / F.count) * Math.PI * 2 * 0.35;
      const wob = Math.sin(t * 1.7 + i * 1.3) * 3;
      const x = F.x + Math.cos(a) * (F.rx + (i % 3) * 4) + wob * 0.4;
      const z = F.y + Math.sin(a) * (F.ry + (i % 2) * 3) + (i % 3) * 2;
      this.dummy.position.set(x, SEA_LEVEL + 1.9, z);
      // 沿切線方向前進
      this.dummy.rotation.set(0, Math.atan2(-Math.sin(a) * F.rx, Math.cos(a) * F.ry) + Math.sin(t * 6 + i) * 0.12, 0);
      this.dummy.scale.setScalar(1.25 + (i % 3) * 0.15);
      this.dummy.updateMatrix();
      this.fish.setMatrixAt(i, this.dummy.matrix);
    }
    this.fish.instanceMatrix.needsUpdate = true;
    // 海龜：繞外海慢慢游，每 18 秒浮出水面一次
    const T = WILDLIFE_SPOTS.turtle;
    const a = t * 0.05;
    const x = T.x + Math.cos(a) * T.rx, z = T.y + Math.sin(a) * T.ry;
    const cyc = (t % 18) / 18;
    const up = initial ? 0 : cyc < 0.55 ? 0 : cyc < 0.66 ? (cyc - 0.55) / 0.11 : cyc < 0.85 ? 1 : 1 - (cyc - 0.85) / 0.15;
    this.turtleUp = up;
    this.turtle.position.set(x, SEA_LEVEL - 12 + up * 12.5 + Math.sin(t * 1.4) * 0.4 * up, z);
    this.turtle.rotation.set(0, Math.atan2(-Math.sin(a) * T.rx, Math.cos(a) * T.ry), Math.sin(t * 0.9) * 0.06);
    const head = this.turtle.getObjectByName('head')!;
    head.position.y = 1.2 + up * 1.4;
    (this.turtle.userData.flippers as THREE.Mesh[]).forEach((f, i) => (f.rotation.z = Math.sin(t * 2 + (i % 2) * Math.PI) * 0.35));
    this.turtle.visible = up > 0.02;
    this.turtleShadow.position.set(x, SEA_LEVEL + 1.8, z);
    this.turtleShadow.rotation.y = this.turtle.rotation.y;
    (this.turtleShadow.material as THREE.MeshBasicMaterial).opacity = 0.35 * (1 - up);
    // 浮出時的水紋
    const rm = this.ripple.material as THREE.MeshBasicMaterial;
    const rp = cyc >= 0.6 && cyc < 0.95 ? (cyc - 0.6) / 0.35 : -1;
    this.ripple.position.set(x, SEA_LEVEL + 2.2, z);
    this.ripple.scale.setScalar(rp < 0 ? 1 : 10 + rp * 26);
    rm.opacity = rp < 0 ? 0 : 0.6 * (1 - rp);
  }

  /** 測試與除錯用的狀態（不含任何個資） */
  state() {
    return { catLooking: this.cat.looking, dogStanding: this.dog.standing, fish: WILDLIFE_SPOTS.fish.count, coastEdges: this.foam.edges, time: Math.round(this.time * 10) / 10, turtleUp: Math.round(this.turtleUp * 100) / 100 };
  }
}
