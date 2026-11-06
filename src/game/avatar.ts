// 角色外觀、方向和走路動畫（3D 場景中以「紙片人」精靈呈現，永遠面向鏡頭）。
// 精靈表：public/assets/avatar-*.svg，4 列（下、左、右、上）× 3 欄（站立、走路1、走路2）。
import * as THREE from 'three';
import type { Role } from '../content/types';
import type { Facing } from './navigation';

const DIRS: Facing[] = ['down', 'left', 'right', 'up'];

/** 把 SVG 放大點陣化成貼圖，讓手機高解析螢幕也清楚 */
export function loadSvgTexture(url: string, scale = 4): Promise<THREE.CanvasTexture> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas');
      c.width = img.naturalWidth * scale;
      c.height = img.naturalHeight * scale;
      c.getContext('2d')!.drawImage(img, 0, 0, c.width, c.height);
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      t.magFilter = THREE.LinearFilter;
      t.minFilter = THREE.LinearMipmapLinearFilter;
      resolve(t);
    };
    img.onerror = () => reject(new Error(`無法載入素材 ${url}`));
    img.src = url;
  });
}

/** 精靈表中的一張影格 */
export class SheetSprite {
  readonly sprite: THREE.Sprite;
  private tex: THREE.Texture;
  constructor(sheet: THREE.Texture, private cols: number, private rows: number, width: number, height: number) {
    this.tex = sheet.clone();
    this.tex.needsUpdate = true;
    this.tex.repeat.set(1 / cols, 1 / rows);
    this.sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.tex, transparent: true, alphaTest: 0.1 }));
    this.sprite.center.set(0.5, 0);
    this.sprite.scale.set(width, height, 1);
  }
  setSheet(sheet: THREE.Texture) {
    const { x, y } = this.tex.offset;
    this.tex = sheet.clone();
    this.tex.needsUpdate = true;
    this.tex.repeat.set(1 / this.cols, 1 / this.rows);
    this.tex.offset.set(x, y);
    (this.sprite.material as THREE.SpriteMaterial).map = this.tex;
  }
  frame(col: number, row: number) {
    this.tex.offset.set(col / this.cols, 1 - (row + 1) / this.rows);
  }
}

export class Avatar {
  readonly group = new THREE.Group();
  private body: SheetSprite;
  private facing: Facing = 'down';
  private walking = false;

  constructor(private sheets: Record<Role, THREE.Texture>, private role: Role) {
    this.body = new SheetSprite(sheets[role], 3, 4, 32, 45);
    const shadow = new THREE.Mesh(new THREE.CircleGeometry(11, 16), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.22, depthWrite: false }));
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.6;
    const ring = new THREE.Mesh(new THREE.RingGeometry(15, 18, 24), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9, depthWrite: false }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.8;
    this.group.add(shadow, ring, this.body.sprite);
    this.body.frame(0, 0);
  }

  setRole(role: Role) {
    this.role = role;
    this.body.setSheet(this.sheets[role]);
  }

  /** 依行走方向換圖；reducedMotion 時不播放走路動畫 */
  update(walking: boolean, facing: Facing, reducedMotion: boolean, timeMs: number) {
    this.walking = walking;
    this.facing = facing;
    const row = DIRS.indexOf(this.facing);
    if (this.walking && !reducedMotion) {
      const cycle = [1, 0, 2, 0][Math.floor(timeMs / 125) % 4];
      this.body.frame(cycle, row);
    } else this.body.frame(0, row);
  }

  get role_() { return this.role; }
}
