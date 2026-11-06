// 3D 島圖（Three.js）：21 座低多邊形六角島拼成一顆心、立體建築、海面、光影、
// 早晨／白天／夜晚、可旋轉視角、走動的小人、相機、點擊命中與場景動畫。
// 點擊、拖曳與雙指手勢由 main.ts 在 DOM 層處理，這裡提供相機控制、座標投影與命中測試。
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { CareLink, Role, StationId } from '../content/types';
import { Avatar, SheetSprite, loadSvgTexture } from './avatar';
import { BOAT_ROUTE, EDGES, HEX, ISLAND_BOUNDS, ITEM_SLOTS, NODES, NODE_H, SEA_LEVEL, START_NODE, TILES, labelAnchor, tileHeight, tileOf, type Look, type Tile } from './mapData';
import { STATION_MODELS, badge, boat, hut, mat, walker } from './models';
import { Navigator, facingOf, shortestPath, type NavEvent } from './navigation';

export type SceneHooks = {
  onNavEvent: (e: NavEvent) => void;
  onReady: () => void;
  onError?: (e: Error) => void;
  /** 每影格回報，讓 HTML 地標標籤跟著相機移動 */
  onCameraChange: () => void;
};
export type MapHit = { station: StationId; item?: string };
export type TimeOfDay = 'morning' | 'day' | 'night';

const ELEV = THREE.MathUtils.degToRad(52);
const FOV = 30;
const COLORS: Record<Look, { top: string; cliff: string; beach: string }> = {
  hospital: { top: '#b4e2c4', cliff: '#8fbfaa', beach: '#eef4f1' },
  plaza: { top: '#d7ecaa', cliff: '#c7b08a', beach: '#f6ecd0' },
  home: { top: '#bde58f', cliff: '#d6a676', beach: '#f6e6bb' },
};
const SKY: Record<TimeOfDay, { bg: string; hemiSky: string; hemiGround: string; hemi: number; amb: number; sun: string; sunI: number; sunPos: [number, number, number]; ocean: string; glow: number }> = {
  morning: { bg: '#ffd9b8', hemiSky: '#fff0dc', hemiGround: '#f0c9a8', hemi: 2.0, amb: 0.45, sun: '#ffd0a0', sunI: 2.1, sunPos: [-700, 520, 420], ocean: '#8fd0d8', glow: 0.1 },
  day: { bg: '#bfe8f2', hemiSky: '#fffaf0', hemiGround: '#9fd3df', hemi: 1.9, amb: 0.35, sun: '#fff4e0', sunI: 2.2, sunPos: [-260, 900, 520], ocean: '#6fcbe3', glow: 0 },
  night: { bg: '#1c2b4a', hemiSky: '#7d93d8', hemiGround: '#2a4566', hemi: 1.05, amb: 0.22, sun: '#9fb4ff', sunI: 0.55, sunPos: [500, 800, -400], ocean: '#30608e', glow: 1.0 },
};

/** 平頂六角形頂點（左右是尖角） */
function hexCorner(i: number, r: number): [number, number] {
  const a = (i * Math.PI) / 3;
  return [r * Math.cos(a), r * Math.sin(a)];
}

/** 低多邊形島頂：中心微隆起、內圈高低起伏，平面著色出現明暗面 */
function hexTop(R: number, seed: number) {
  let s = seed;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  const outer: [number, number][] = [];
  for (let k = 0; k < 12; k++) {
    if (k % 2 === 0) outer.push(hexCorner(k / 2, R));
    else {
      const [ax, az] = hexCorner((k - 1) / 2, R), [bx, bz] = hexCorner((k + 1) / 2, R);
      outer.push([(ax + bx) / 2, (az + bz) / 2]);
    }
  }
  const inner = outer.map(([x, z]) => [x * 0.55, 1.5 + rnd() * 2.5, z * 0.55] as const);
  const center = [0, 3, 0] as const;
  const pos: number[] = [];
  const tri = (a: readonly number[], b: readonly number[], c: readonly number[]) => pos.push(...a, ...b, ...c);
  for (let k = 0; k < 12; k++) {
    const n = (k + 1) % 12;
    const o1 = [outer[k][0], 0, outer[k][1]], o2 = [outer[n][0], 0, outer[n][1]];
    tri(center, inner[n], inner[k]);
    tri(inner[k], inner[n], o2);
    tri(inner[k], o2, o1);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.computeVertexNormals();
  return g;
}

function hexPrism(rTop: number, rBot: number, h: number) {
  const g = new THREE.CylinderGeometry(rTop, rBot, h, 6, 1, false, Math.PI / 2);
  g.translate(0, -h / 2, 0);
  return g;
}

const keepUp = (o: THREE.Object3D | null): boolean => { for (let p = o; p; p = p.parent) if (p.userData.keep || p.userData.item) return true; return false; };

/**
 * 效能：把群組內「純色、不透明、沒有貼圖」的網格合併成一個帶頂點色的網格，大幅減少繪製次數。
 * filter 決定要合併哪些；回傳合併後的網格。
 */
export function bake(group: THREE.Object3D, filter: (o: THREE.Object3D) => boolean, material?: THREE.MeshStandardMaterial) {
  group.updateMatrixWorld(true);
  const inv = group.matrixWorld.clone().invert();
  const geos: THREE.BufferGeometry[] = [];
  const remove: THREE.Mesh[] = [];
  group.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh || !filter(mesh)) return;
    const m = mesh.material as THREE.MeshStandardMaterial;
    if (Array.isArray(m) || !m.isMeshStandardMaterial || m.map || m.transparent || m.side === THREE.DoubleSide) return;
    let g = mesh.geometry.clone().applyMatrix4(inv.clone().multiply(mesh.matrixWorld));
    if (g.index) g = g.toNonIndexed();
    for (const k of Object.keys(g.attributes)) if (k !== 'position' && k !== 'normal') g.deleteAttribute(k);
    if (!g.attributes.normal) g.computeVertexNormals();
    const n = g.attributes.position.count;
    const col = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { col[i * 3] = m.color.r; col[i * 3 + 1] = m.color.g; col[i * 3 + 2] = m.color.b; }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    geos.push(g);
    remove.push(mesh);
  });
  if (!geos.length) return null;
  for (const r of remove) r.parent?.remove(r);
  const merged = new THREE.Mesh(mergeGeometries(geos), material ?? new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.85 }));
  merged.castShadow = merged.receiveShadow = true;
  group.add(merged);
  return merged;
}

type Walker = { obj: THREE.Group; from: string; to: string; t: number; seed: number };

export class IslandScene {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(FOV, 1, 10, 9000);
  private target = new THREE.Vector3(504, 0, 380);
  private dist = 2400;
  private az = 0;
  private anim: { t0: number; dur: number; fromT: THREE.Vector3; toT: THREE.Vector3; fromD: number; toD: number; fromA: number; toA: number } | null = null;
  private nav!: Navigator;
  private avatar!: Avatar;
  private following = false;
  private ocean!: THREE.Mesh;
  private oceanBase!: Float32Array;
  private tileGroups = new Map<string, THREE.Group>();
  private linkGroup = new THREE.Group();
  private boatObj?: THREE.Group;
  private lamp?: THREE.Mesh;
  private heart?: THREE.Mesh;
  private windmill?: THREE.Object3D;
  private glowMats: THREE.MeshStandardMaterial[] = [];
  private walkers: Walker[] = [];
  private hemi!: THREE.HemisphereLight;
  private amb!: THREE.AmbientLight;
  private sun!: THREE.DirectionalLight;
  private mascot?: { s: SheetSprite; route: string[]; i: number; t: number; pause: number; stops: Set<string> };
  private raycaster = new THREE.Raycaster();
  private last = performance.now();
  private elapsed = 0;
  private width = 1;
  private height = 1;
  private ready = false;
  private adj = new Map<string, string[]>();
  timeOfDay: TimeOfDay = 'day';
  reducedMotion = false;

  constructor(
    private container: HTMLElement,
    private opts: { hooks: SceneHooks; role: Role; reducedMotion: boolean; stationItems: Record<string, { id: string }[]> },
  ) {
    this.reducedMotion = opts.reducedMotion;
    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.append(this.renderer.domElement);
    this.renderer.domElement.setAttribute('aria-hidden', 'true');
    new ResizeObserver(() => this.resize()).observe(container);
    this.resize();
    for (const e of EDGES) {
      if (!this.adj.has(e.a)) this.adj.set(e.a, []);
      if (!this.adj.has(e.b)) this.adj.set(e.b, []);
      this.adj.get(e.a)!.push(e.b);
      this.adj.get(e.b)!.push(e.a);
    }
    this.init().catch((e) => opts.hooks.onError?.(e));
  }

  private async init() {
    const base = import.meta.env.BASE_URL;
    const [patient, caregiver, staff, mascotTex] = await Promise.all(
      ['avatar-patient', 'avatar-caregiver', 'avatar-staff', 'mascot'].map((k) => loadSvgTexture(`${base}assets/${k}.svg`)),
    );
    const s = this.scene;
    s.background = new THREE.Color(SKY.day.bg);
    s.fog = new THREE.Fog(SKY.day.bg, 2800, 6500);
    this.hemi = new THREE.HemisphereLight(SKY.day.hemiSky, SKY.day.hemiGround, SKY.day.hemi);
    this.amb = new THREE.AmbientLight('#ffffff', SKY.day.amb);
    this.sun = new THREE.DirectionalLight(SKY.day.sun, SKY.day.sunI);
    this.sun.target.position.set(504, 0, 380);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    const sc = this.sun.shadow.camera;
    sc.left = -800; sc.right = 800; sc.top = 800; sc.bottom = -800; sc.near = 100; sc.far = 2600;
    this.sun.shadow.bias = -0.0006;
    this.sun.shadow.normalBias = 1.5;
    s.add(this.hemi, this.amb, this.sun, this.sun.target);

    this.buildOcean();
    for (const t of TILES) this.buildTile(t);
    this.buildPaths();
    s.add(this.linkGroup);
    this.linkGroup.visible = false;

    this.nav = new Navigator({ nodes: NODES, edges: EDGES }, START_NODE, 200, (e) => this.opts.hooks.onNavEvent(e));
    this.avatar = new Avatar({ patient, caregiver, staff }, this.opts.role);
    s.add(this.avatar.group);
    this.syncAvatar(0);

    this.boatObj = boat();
    s.add(this.boatObj);
    this.buildMascot(mascotTex);
    this.buildWalkers();
    if (new URLSearchParams(location.search).has('debug')) this.buildDebug();

    this.setTimeOfDay('day');
    this.panorama(false);
    this.ready = true;
    this.renderer.setAnimationLoop(() => this.frame());
    this.opts.hooks.onReady();
  }

  // ───────────── 建構 ─────────────
  private buildOcean() {
    const g = new THREE.PlaneGeometry(5200, 5200, 70, 70);
    g.rotateX(-Math.PI / 2);
    this.oceanBase = Float32Array.from(g.attributes.position.array as Float32Array);
    this.ocean = new THREE.Mesh(g, mat(SKY.day.ocean, { roughness: 0.5, metalness: 0.02 }));
    this.ocean.position.set(504, SEA_LEVEL, 380);
    this.ocean.receiveShadow = true;
    this.scene.add(this.ocean);
  }

  private buildTile(t: Tile) {
    const h = tileHeight(t);
    const c = COLORS[t.look];
    const g = new THREE.Group();
    g.position.set(t.x, h, t.y);
    g.userData.station = t.id.startsWith('decor') ? undefined : t.id;
    const R = HEX.R;
    const depth = h - SEA_LEVEL + 6;
    // 淺海光環
    for (const [r, col, o] of [[R * 1.3, '#8fd3e2', 0.5], [R * 1.12, '#bfe9f1', 0.65]] as const) {
      const ring = new THREE.Mesh(hexPrism(r, r, 1), new THREE.MeshStandardMaterial({ color: col, transparent: true, opacity: o, depthWrite: false, flatShading: true }));
      ring.position.y = SEA_LEVEL - h + 1.4;
      ring.receiveShadow = true;
      g.add(ring);
    }
    const cliff = new THREE.Mesh(hexPrism(R, R * 0.9, depth), mat(c.cliff));
    const beach = new THREE.Mesh(hexPrism(R * 1.03, R * 1.08, 8), mat(c.beach));
    beach.position.y = SEA_LEVEL - h + 6;
    const top = new THREE.Mesh(hexTop(R, Math.round(t.x * 7 + t.y + 11)), mat(c.top));
    g.add(cliff, beach, top);

    const model = STATION_MODELS[t.id]?.();
    if (model) {
      g.add(model);
      const lamp = model.getObjectByName('lamp') as THREE.Mesh | undefined;
      if (lamp) this.lamp = lamp;
      const heart = model.getObjectByName('heart') as THREE.Mesh | undefined;
      if (heart) this.heart = heart;
      const wm = model.getObjectByName('windmill');
      if (wm) this.windmill = wm;
    }
    // 照護重點小屋
    const items = this.opts.stationItems[t.id] ?? [];
    items.slice(0, ITEM_SLOTS.length).forEach((it, i) => {
      const [dx, dz] = ITEM_SLOTS[i];
      const hu = hut(i);
      hu.position.set(dx, 0, dz);
      hu.userData.item = it.id;
      g.add(hu);
      bake(hu, () => true);
      const b = badge(i + 1);
      b.position.set(0, 32, 0);
      hu.add(b);
    });
    // 合併：會發光的窗與路燈一組，其他一組
    const glow = new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.6, emissive: '#ffd27a', emissiveIntensity: 0 });
    if (bake(g, (o) => !!o.userData.glow && !keepUp(o.parent) && !keepUp(o), glow)) this.glowMats.push(glow);
    bake(g, (o) => !o.userData.glow && o.name !== 'lamp' && !keepUp(o));
    g.traverse((o) => {
      const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
      if ((o as THREE.Mesh).isMesh) { o.castShadow = o.castShadow || !m?.transparent; o.receiveShadow = true; }
      if (m && 'color' in m && m.color) o.userData.base = m.color.clone();
    });
    this.tileGroups.set(t.id, g);
    this.scene.add(g);
  }

  private nodeH(id: string) { return NODE_H[id] ?? 0; }

  private buildPaths() {
    const paths = new THREE.Group();
    this.scene.add(paths);
    const sand = mat('#f3e6c4');
    const stone = mat('#e7dcc3');
    for (const e of EDGES) {
      const a = NODES[e.a], b = NODES[e.b];
      const ha = this.nodeH(e.a), hb = this.nodeH(e.b);
      const dx = b.x - a.x, dz = b.y - a.y, dy = hb - ha;
      const len = Math.hypot(dx, dz);
      const full = Math.hypot(len, dy);
      const p = new THREE.Mesh(new THREE.BoxGeometry(e.kind === 'link' ? 13 : 11, 1.4, full + 6), e.kind === 'link' ? stone : sand);
      p.position.set((a.x + b.x) / 2, (ha + hb) / 2 + 3.2, (a.y + b.y) / 2);
      p.rotation.set(-Math.atan2(dy, len), Math.atan2(dx, dz), 0, 'YXZ');
      p.receiveShadow = true;
      paths.add(p);
    }
    for (const [id, n] of Object.entries(NODES)) {
      if (id.startsWith('gate:')) continue;
      const pad = new THREE.Mesh(new THREE.CylinderGeometry(8, 8, 1.4, 8), sand);
      pad.position.set(n.x, this.nodeH(id) + 3.4, n.y);
      paths.add(pad);
    }
    bake(paths, () => true);
  }

  /** 巡島小人偶「心心」：依 01→05 → 返家照護站 → 06→14 的順序沿步道巡島，每到一站揮手 */
  private buildMascot(tex: THREE.Texture) {
    const order = TILES.filter((t) => !t.id.startsWith('decor')).sort((a, b) => order01(a.id) - order01(b.id)).map((t) => t.id as string);
    const g = { nodes: NODES, edges: EDGES };
    const route = [order[0]];
    for (let i = 1; i < order.length; i++) route.push(...shortestPath(g, order[i - 1], order[i])!.slice(1));
    route.push(...shortestPath(g, order[order.length - 1], order[0])!.slice(1));
    const s = new SheetSprite(tex, 2, 1, 26, 29);
    s.frame(0, 0);
    this.scene.add(s.sprite);
    this.mascot = { s, route, i: 0, t: 0, pause: 1.2, stops: new Set(order) };
    this.placeMascot();
  }
  private placeMascot() {
    const m = this.mascot!;
    const ia = m.route[m.i % m.route.length], ib = m.route[(m.i + 1) % m.route.length];
    const a = NODES[ia], b = NODES[ib];
    const k = m.pause > 0 ? 0 : m.t;
    m.s.sprite.position.set(a.x + (b.x - a.x) * k + 20, this.nodeH(ia) + (this.nodeH(ib) - this.nodeH(ia)) * k + 3.5, a.y + (b.y - a.y) * k);
  }

  /** 島上走動的小人，讓小島更熱鬧 */
  private buildWalkers() {
    const colors = ['#f2a07c', '#6ca3d6', '#82c29e', '#a184c8', '#ffd166', '#f4a7b9', '#7cc3d6', '#c98b5a', '#9aa5ad', '#ef8354'];
    const nodes = Object.keys(NODES).filter((n) => !n.startsWith('gate:'));
    colors.forEach((c, i) => {
      const from = nodes[(i * 37) % nodes.length];
      const obj = walker(c);
      this.scene.add(obj);
      const w: Walker = { obj, from, to: this.adj.get(from)![0], t: (i * 0.13) % 1, seed: i * 7 + 3 };
      this.walkers.push(w);
      this.placeWalker(w);
    });
  }
  private placeWalker(w: Walker) {
    const a = NODES[w.from], b = NODES[w.to];
    const x = a.x + (b.x - a.x) * w.t, z = a.y + (b.y - a.y) * w.t;
    w.obj.position.set(x + 6, this.nodeH(w.from) + (this.nodeH(w.to) - this.nodeH(w.from)) * w.t + 3.5, z + 4);
    w.obj.rotation.y = Math.atan2(b.x - a.x, b.y - a.y);
  }

  private buildDebug() {
    const pts: number[] = [];
    for (const e of EDGES) {
      const a = NODES[e.a], b = NODES[e.b];
      pts.push(a.x, this.nodeH(e.a) + 8, a.y, b.x, this.nodeH(e.b) + 8, b.y);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    this.scene.add(new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0xff00ff, depthTest: false })));
  }

  // ───────────── 每影格 ─────────────
  private frame() {
    const now = performance.now();
    const dt = Math.min((now - this.last) / 1000, 0.1);
    this.last = now;
    this.elapsed += dt;
    const t = this.elapsed;
    this.nav.update(dt * 1000);
    this.syncAvatar(t * 1000);
    if (this.following) {
      if (!this.nav.moving) this.following = false;
      else {
        const p = this.avatar.group.position;
        this.target.x += (p.x - this.target.x) * 0.06;
        this.target.z += (p.z - this.target.z) * 0.06;
      }
    }
    if (this.anim) {
      const k = Math.min(1, (now - this.anim.t0) / this.anim.dur);
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      this.target.lerpVectors(this.anim.fromT, this.anim.toT, e);
      this.dist = this.anim.fromD + (this.anim.toD - this.anim.fromD) * e;
      this.az = this.anim.fromA + (this.anim.toA - this.anim.fromA) * e;
      if (k >= 1) this.anim = null;
    }
    if (!this.reducedMotion) this.animateDecor(t, dt);
    this.updateCamera();
    this.renderer.render(this.scene, this.camera);
    this.opts.hooks.onCameraChange();
  }

  private animateDecor(t: number, dt: number) {
    // 海面波紋
    const pos = this.ocean.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      const x = this.oceanBase[i], z = this.oceanBase[i + 2];
      arr[i + 1] = Math.sin(x * 0.012 + t * 1.1) * 2.2 + Math.cos(z * 0.015 + t * 0.8) * 1.8;
    }
    pos.needsUpdate = true;
    this.ocean.geometry.computeVertexNormals();
    // 小船
    if (this.boatObj) {
      const total = BOAT_ROUTE.length;
      const u = (t * 0.03) % total;
      const i = Math.floor(u), f = u - i;
      const a = BOAT_ROUTE[i], b = BOAT_ROUTE[(i + 1) % total];
      this.boatObj.position.set(a[0] + (b[0] - a[0]) * f, SEA_LEVEL + Math.sin(t * 2) * 1.2, a[1] + (b[1] - a[1]) * f);
      this.boatObj.rotation.y = Math.atan2(b[0] - a[0], b[1] - a[1]) - Math.PI / 2;
    }
    if (this.lamp) ((this.lamp.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6 + Math.sin(t * 3) * 0.5 + SKY[this.timeOfDay].glow);
    if (this.heart) this.heart.rotation.y = Math.sin(t * 0.8) * 0.5;
    if (this.windmill) this.windmill.rotation.z += dt * 1.2;
    // 走動的小人
    for (const w of this.walkers) {
      const a = NODES[w.from], b = NODES[w.to];
      w.t += (dt * 26) / Math.max(1, Math.hypot(b.x - a.x, b.y - a.y));
      if (w.t >= 1) {
        const next = this.adj.get(w.to)!.filter((n) => n !== w.from);
        w.seed = (w.seed * 9301 + 49297) % 233280;
        w.from = w.to;
        w.to = next.length ? next[w.seed % next.length] : this.adj.get(w.to)![0];
        w.t = 0;
      }
      this.placeWalker(w);
    }
    // 心心巡島
    const m = this.mascot;
    if (m) {
      if (m.pause > 0) {
        m.pause -= dt;
        m.s.frame(1, 0);
      } else {
        const a = NODES[m.route[m.i % m.route.length]], b = NODES[m.route[(m.i + 1) % m.route.length]];
        m.t += (dt * 70) / Math.max(1, Math.hypot(b.x - a.x, b.y - a.y));
        m.s.frame(Math.floor(t * 6) % 2, 0);
        if (m.t >= 1) {
          m.t = 0;
          m.i++;
          if (m.stops.has(m.route[m.i % m.route.length])) m.pause = 1.4;
        }
      }
      this.placeMascot();
    }
  }

  private heightAtAvatar() {
    const seg = this.nav.segment;
    if (!seg) return this.nav.node ? this.nodeH(this.nav.node) : 0;
    const a = NODES[seg.from], b = NODES[seg.to];
    const len = Math.max(1, Math.hypot(b.x - a.x, b.y - a.y));
    const k = Math.hypot(this.nav.pos.x - a.x, this.nav.pos.y - a.y) / len;
    return this.nodeH(seg.from) + (this.nodeH(seg.to) - this.nodeH(seg.from)) * k;
  }

  /** 世界方向 → 畫面上的上下左右（視角旋轉後也正確） */
  private screenFacing() {
    const seg = this.nav.segment;
    if (!seg) return this.nav.facing;
    const a = NODES[seg.from], b = NODES[seg.to];
    const dx = b.x - a.x, dz = b.y - a.y;
    const c = Math.cos(this.az), s = Math.sin(this.az);
    return facingOf(dx * c - dz * s, dx * s + dz * c, this.nav.facing);
  }

  private syncAvatar(ms: number) {
    this.avatar.group.position.set(this.nav.pos.x, this.heightAtAvatar() + 3.6, this.nav.pos.y);
    this.avatar.update(this.nav.moving, this.screenFacing(), this.reducedMotion, ms);
  }

  private updateCamera() {
    const off = new THREE.Vector3(Math.sin(this.az) * Math.cos(ELEV), Math.sin(ELEV), Math.cos(this.az) * Math.cos(ELEV)).multiplyScalar(this.dist);
    this.camera.position.copy(this.target).add(off);
    this.camera.lookAt(this.target);
    this.camera.updateMatrixWorld();
  }

  private resize() {
    const w = Math.max(1, this.container.clientWidth), h = Math.max(1, this.container.clientHeight);
    this.width = w;
    this.height = h;
    this.renderer.setSize(w, h, false);
    this.renderer.domElement.style.width = `${w}px`;
    this.renderer.domElement.style.height = `${h}px`;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    if (this.ready) this.panorama(false);
  }

  // ───────────── 對外 API（main.ts 呼叫） ─────────────
  setRole(role: Role) { this.avatar?.setRole(role); }

  setReducedMotion(on: boolean) { this.reducedMotion = on; }

  /** 早晨／白天／夜晚 */
  setTimeOfDay(tod: TimeOfDay) {
    this.timeOfDay = tod;
    const k = SKY[tod];
    (this.scene.background as THREE.Color).set(k.bg);
    (this.scene.fog as THREE.Fog).color.set(k.bg);
    this.hemi.color.set(k.hemiSky);
    this.hemi.groundColor.set(k.hemiGround);
    this.hemi.intensity = k.hemi;
    this.amb.intensity = k.amb;
    this.sun.color.set(k.sun);
    this.sun.intensity = k.sunI;
    this.sun.position.set(504 + k.sunPos[0], k.sunPos[1], 380 + k.sunPos[2]);
    (this.ocean.material as THREE.MeshStandardMaterial).color.set(k.ocean);
    for (const m of this.glowMats) m.emissiveIntensity = k.glow;
    if (this.heart) (this.heart.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.15 + k.glow * 0.6;
    if (this.lamp) (this.lamp.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.8 + k.glow;
  }

  goToStation(id: StationId, nodeId: string) {
    if (this.reducedMotion) {
      this.nav.goTo(id, nodeId, { instant: true });
      this.syncAvatar(0);
      this.target.set(this.nav.pos.x, 0, this.nav.pos.y);
      return;
    }
    this.nav.goTo(id, nodeId);
    if (this.nav.moving) { this.following = true; this.anim = null; }
  }

  /** 從清單直接開啟任務時，角色直接出現在該站（不播放動畫、不觸發抵達事件） */
  placeAt(_id: StationId, nodeId: string) {
    this.stopFollow();
    this.nav.teleport(nodeId);
    this.syncAvatar(0);
  }

  resetAvatar() {
    this.placeAt('admission', START_NODE);
    this.az = 0;
    this.panorama(false);
  }

  stopFollow() { this.following = false; }

  get destination() { return this.nav?.destination ?? null; }
  get isMoving() { return this.nav?.moving ?? false; }

  /** 每單位世界距離在畫面上的像素數（相當於縮放比例） */
  get zoom() { return this.height / (2 * this.dist * Math.tan(THREE.MathUtils.degToRad(FOV / 2))); }
  /** 目前視角（度，0 為正面） */
  get angle() { return Math.round(THREE.MathUtils.radToDeg(this.az)); }

  private clampTarget(v: THREE.Vector3) {
    v.x = THREE.MathUtils.clamp(v.x, ISLAND_BOUNDS.x - 100, ISLAND_BOUNDS.x + ISLAND_BOUNDS.w + 100);
    v.z = THREE.MathUtils.clamp(v.z, ISLAND_BOUNDS.y - 100, ISLAND_BOUNDS.y + ISLAND_BOUNDS.h + 100);
    return v;
  }

  panBy(dx: number, dy: number) {
    this.stopFollow();
    this.anim = null;
    const ppu = this.zoom;
    const c = Math.cos(this.az), s = Math.sin(this.az);
    const right = dx / ppu, back = dy / ppu / Math.sin(ELEV);
    this.target.x -= right * c + back * s;
    this.target.z -= -right * s + back * c;
    this.clampTarget(this.target);
  }

  /** 依目前視角計算能放進整座島的鏡頭距離 */
  private panoramaDist(az = this.az) {
    const tan = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const aspect = this.width / this.height;
    const c = Math.cos(az), s = Math.sin(az);
    let minR = Infinity, maxR = -Infinity, minF = Infinity, maxF = -Infinity;
    for (const t of TILES) for (const [cx, cz] of [[-HEX.R, 0], [HEX.R, 0], [0, -HEX.R], [0, HEX.R]]) {
      const x = t.x + cx, z = t.y + cz;
      const r = x * c - z * s, f = x * s + z * c;
      minR = Math.min(minR, r); maxR = Math.max(maxR, r); minF = Math.min(minF, f); maxF = Math.max(maxF, f);
    }
    const needH = ((maxF - minF) * Math.sin(ELEV) + 140) / 2 / tan;
    const needW = (maxR - minR) / 2 / (tan * aspect);
    return Math.max(needH, needW) * (az % (Math.PI * 2) === 0 ? 1.05 : 1.14);
  }

  private moveTo(target: THREE.Vector3, dist: number, animate: boolean, az = this.anim?.toA ?? this.az) {
    this.clampTarget(target);
    if (!animate || this.reducedMotion) {
      this.anim = null;
      this.target.copy(target);
      this.dist = dist;
      this.az = az;
      return;
    }
    this.anim = { t0: performance.now(), dur: 500, fromT: this.target.clone(), toT: target.clone(), fromD: this.dist, toD: dist, fromA: this.az, toA: az };
  }

  private center() {
    return new THREE.Vector3(ISLAND_BOUNDS.x + ISLAND_BOUNDS.w / 2, 0, ISLAND_BOUNDS.y + ISLAND_BOUNDS.h / 2 + 20);
  }

  panorama(animate = !this.reducedMotion) {
    this.stopFollow();
    const az = this.anim?.toA ?? this.az;
    this.moveTo(this.center(), this.panoramaDist(az), animate, az);
  }

  zoomBy(factor: number) {
    const max = this.panoramaDist() * 1.25, min = 260;
    const d = THREE.MathUtils.clamp((this.anim?.toD ?? this.dist) / factor, min, max);
    this.moveTo((this.anim?.toT ?? this.target).clone(), d, true);
  }

  /** 雙指縮放：立即套用 */
  zoomImmediate(factor: number) {
    this.anim = null;
    this.dist = THREE.MathUtils.clamp(this.dist / factor, 260, this.panoramaDist() * 1.25);
  }

  /** 旋轉視角（度）；animate=false 用於雙指旋轉 */
  rotateBy(deg: number, animate = true) {
    const toA = (this.anim?.toA ?? this.az) + THREE.MathUtils.degToRad(deg);
    if (!animate) { this.anim = null; this.az = toA; return; }
    // 在全景距離附近時，轉完自動重新取景，讓整座島仍在畫面中
    const d = this.anim?.toD ?? this.dist;
    const nearPano = d >= this.panoramaDist() * 0.85;
    this.moveTo(nearPano ? this.center() : (this.anim?.toT ?? this.target).clone(), nearPano ? this.panoramaDist(toA) : d, true, toA);
  }

  /** 回到正面視角 */
  resetRotation() {
    const full = Math.PI * 2;
    const a = ((this.az % full) + full) % full;
    this.az = a > Math.PI ? a - full : a;
    this.moveTo(this.target.clone(), this.dist, true, 0);
  }

  focusAvatar() {
    const p = this.avatar.group.position;
    this.focusPoint(p.x, p.z);
  }

  /** 把鏡頭移到某一站（時間軸、串聯線使用） */
  focusStation(id: StationId) {
    const t = tileOf(id);
    this.focusPoint(t.x, t.y);
  }

  private focusPoint(x: number, z: number) {
    this.stopFollow();
    this.moveTo(new THREE.Vector3(x, 0, z + 10), Math.min(this.dist, this.panoramaDist() / 2.4), true);
  }

  /** 顯示／隱藏照護串聯線；highlight 指定時只畫和該站有關的線 */
  setLinks(links: CareLink[] | null, highlight?: StationId) {
    this.linkGroup.clear();
    this.linkGroup.visible = !!links;
    if (!links) return;
    const tube = new THREE.MeshBasicMaterial({ color: '#ff6a3d' });
    const glow = new THREE.MeshBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.55 });
    for (const l of links) {
      if (highlight && l.from.station !== highlight && l.to.station !== highlight) continue;
      const a = tileOf(l.from.station), b = tileOf(l.to.station);
      const pa = new THREE.Vector3(a.x, tileHeight(a) + 60, a.y - 10), pb = new THREE.Vector3(b.x, tileHeight(b) + 60, b.y - 10);
      const mid = pa.clone().add(pb).multiplyScalar(0.5);
      mid.y += 70 + pa.distanceTo(pb) * 0.2;
      const curve = new THREE.QuadraticBezierCurve3(pa, mid, pb);
      this.linkGroup.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 48, 5, 6), tube));
      this.linkGroup.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 48, 8, 6), glow));
      for (const p of [pa, pb]) {
        const s = new THREE.Mesh(new THREE.SphereGeometry(10, 10, 8), tube);
        s.position.copy(p);
        this.linkGroup.add(s);
      }
    }
  }

  /** 照護階段高亮：ids 以外的島變暗；傳 null 取消 */
  setHighlight(ids: StationId[] | null) {
    for (const [id, g] of this.tileGroups) {
      const dim = !!ids && !ids.includes(id as StationId);
      g.traverse((o) => {
        const m = (o as THREE.Mesh).material as THREE.MeshStandardMaterial | undefined;
        if (o.userData.base && m?.color) m.color.copy(o.userData.base).multiplyScalar(dim ? 0.42 : 1);
      });
    }
  }

  /** 螢幕座標（相對於畫布）→ 站點或照護重點；沒點到回傳 null */
  hitAt(sx: number, sy: number): MapHit | null {
    const ndc = new THREE.Vector2((sx / this.width) * 2 - 1, -(sy / this.height) * 2 + 1);
    this.raycaster.setFromCamera(ndc, this.camera);
    const hits = this.raycaster.intersectObjects([...this.tileGroups.values()], true);
    for (const h of hits) {
      let o: THREE.Object3D | null = h.object;
      let item: string | undefined;
      while (o) {
        if (o.userData.item) item = o.userData.item;
        if (o.parent === this.scene) break;
        o = o.parent;
      }
      const station = o?.userData.station as StationId | undefined;
      if (station) return { station, item };
      if (o) return null; // 點到裝飾島
    }
    return null;
  }

  avatarScreen() {
    const p = this.avatar.group.position;
    return this.project(p.x, p.y + 10, p.z);
  }

  /** 3D 座標 → 畫布上的 CSS 像素 */
  project(x: number, y: number, z: number) {
    const v = new THREE.Vector3(x, y, z).project(this.camera);
    return { x: ((v.x + 1) / 2) * this.width, y: ((1 - v.y) / 2) * this.height, zoom: this.zoom, behind: v.z > 1 };
  }

  /** 站點名稱標籤的畫面位置 */
  labelScreen(id: string) {
    const a = labelAnchor(tileOf(id));
    return this.project(a.x, a.h, a.y);
  }
  /** 地圖平面座標（x, y=南北, h=高度）→ 畫面 */
  toScreen(x: number, y: number, h = 0) { return this.project(x, h, y); }
}

const ORDER = ['admission', 'ward', 'team', 'discharge-prep', 'discharge', 'home-care', 'weight', 'medication', 'diet', 'activity', 'warning', 'follow-up', 'long-term-care', 'palliative', 'advanced-hf'];
function order01(id: string) { return ORDER.indexOf(id); }
