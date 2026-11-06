// 裝置端探索狀態。只儲存：站點 ID、角色、已探索／已練習的任務 ID、上次停留站點。
// 不儲存病歷、真實體重、姓名，也不儲存照護偏好題選了什麼。
// localStorage 無法使用時（隱私模式、權限）仍可遊玩，只是重新整理後不會保留。
import type { Role, StationId } from '../content/types';

export const STORAGE_KEY = 'hf-care-island:v1';

export type StationProgress = { explored: boolean; practiced: string[] };
export type Progress = {
  version: 1;
  role: Role | null;
  lastStation: StationId | null;
  stations: Partial<Record<StationId, StationProgress>>;
};

export const emptyProgress = (): Progress => ({ version: 1, role: null, lastStation: null, stations: {} });

type StorageLike = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

function defaultStorage(): StorageLike | null {
  try {
    return typeof localStorage === 'undefined' ? null : localStorage;
  } catch {
    return null;
  }
}

const isRole = (v: unknown): v is Role => v === 'patient' || v === 'caregiver' || v === 'staff';

export class ProgressStore {
  private data: Progress;
  /** 最近一次儲存是否成功（UI 可提示「本次進度不會保留」） */
  saveOk = true;
  private listeners = new Set<(p: Progress) => void>();

  constructor(private validIds: readonly StationId[], private storage: StorageLike | null = defaultStorage()) {
    this.data = this.load();
  }

  private load(): Progress {
    try {
      const raw = this.storage?.getItem(STORAGE_KEY);
      if (!raw) return emptyProgress();
      const p = JSON.parse(raw) as Partial<Progress>;
      const out = emptyProgress();
      if (isRole(p.role)) out.role = p.role;
      if (p.lastStation && this.validIds.includes(p.lastStation)) out.lastStation = p.lastStation;
      for (const id of this.validIds) {
        const s = p.stations?.[id];
        if (s && typeof s === 'object') {
          out.stations[id] = {
            explored: !!s.explored,
            practiced: Array.isArray(s.practiced) ? s.practiced.filter((x): x is string => typeof x === 'string').slice(0, 20) : [],
          };
        }
      }
      return out;
    } catch {
      return emptyProgress();
    }
  }

  private save() {
    try {
      if (!this.storage) throw new Error('no storage');
      this.storage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      this.saveOk = true;
    } catch {
      this.saveOk = false;
    }
    for (const fn of this.listeners) fn(this.get());
  }

  onChange(fn: (p: Progress) => void) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  get(): Progress {
    return structuredClone(this.data);
  }

  get role() { return this.data.role; }

  setRole(role: Role) {
    this.data.role = role;
    this.save();
  }

  station(id: StationId): StationProgress {
    return this.data.stations[id] ?? { explored: false, practiced: [] };
  }

  markExplored(id: StationId) {
    const s = this.station(id);
    this.data.stations[id] = { ...s, explored: true };
    this.data.lastStation = id;
    this.save();
  }

  /** 使用者自填「已練習」。不代表醫療人員已確認示教能力。 */
  setPracticed(id: StationId, missionId: string, practiced: boolean) {
    const s = this.station(id);
    const set = new Set(s.practiced);
    if (practiced) set.add(missionId);
    else set.delete(missionId);
    this.data.stations[id] = { explored: true, practiced: [...set] };
    this.save();
  }

  reset() {
    this.data = emptyProgress();
    try {
      this.storage?.removeItem(STORAGE_KEY);
      this.saveOk = true;
    } catch {
      this.saveOk = false;
    }
    for (const fn of this.listeners) fn(this.get());
  }
}

export type StationStatus = 'new' | 'explored' | 'practiced';

export function stationStatus(p: StationProgress, missionIds: string[]): StationStatus {
  if (missionIds.length > 0 && missionIds.every((m) => p.practiced.includes(m))) return 'practiced';
  if (p.explored || p.practiced.length > 0) return 'explored';
  return 'new';
}

export const STATUS_TEXT: Record<StationStatus, string> = {
  new: '尚未探索',
  explored: '已探索',
  practiced: '已練習',
};
