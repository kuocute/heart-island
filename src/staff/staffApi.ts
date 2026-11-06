// 醫療人員工作卡資料來源。
// ・前端程式、公開設定與部署產物「只放占位值」，不含任何 NotebookLM 連結或院內資料。
// ・若設定 VITE_STAFF_API_BASE（例如 /staff/api），會向「同網站、需登入」的伺服器請求資料；
//   伺服器驗證登入與醫療人員授權後才回傳連結與查核欄位（參考 staff-server/）。
// ・資料只放在記憶體，不寫入 localStorage。
import type { StationId } from '../content/types';

export const STAFF_FIELDS = [
  { key: 'timing', label: '評估時點' },
  { key: 'owner', label: '負責角色' },
  { key: 'chartLocation', label: '病歷紀錄位置' },
  { key: 'clause', label: '對應認證條文' },
  { key: 'evidence', label: '佐證位置' },
  { key: 'docVersion', label: '文件版本' },
] as const;
export type StaffFieldKey = (typeof STAFF_FIELDS)[number]['key'];

export type StaffData = {
  notebookUrl: string | null;
  stations: Partial<Record<StationId, Partial<Record<StaffFieldKey, string>>>>;
};

export type StaffState =
  | { kind: 'unconfigured' }
  | { kind: 'unauthorized'; loginUrl: string }
  | { kind: 'unavailable' }
  | { kind: 'ok'; data: StaffData };

const BASE = (import.meta.env.VITE_STAFF_API_BASE as string | undefined)?.replace(/\/$/, '') ?? '';
let cache: Promise<StaffState> | null = null;

/** 只接受 https 連結，避免 javascript: 等危險網址 */
export function safeHttpsUrl(u: unknown): string | null {
  if (typeof u !== 'string') return null;
  try {
    const url = new URL(u);
    return url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
}

export function loadStaffState(force = false): Promise<StaffState> {
  if (!BASE) return Promise.resolve({ kind: 'unconfigured' });
  if (cache && !force) return cache;
  cache = (async (): Promise<StaffState> => {
    try {
      const res = await fetch(`${BASE}/cards`, { credentials: 'same-origin', headers: { Accept: 'application/json' }, cache: 'no-store' });
      if (res.status === 401 || res.status === 403) return { kind: 'unauthorized', loginUrl: `${BASE.replace(/\/api$/, '')}/login` };
      if (!res.ok) return { kind: 'unavailable' };
      const json = (await res.json()) as Partial<StaffData>;
      return { kind: 'ok', data: { notebookUrl: safeHttpsUrl(json.notebookUrl), stations: json.stations ?? {} } };
    } catch {
      return { kind: 'unavailable' };
    }
  })();
  return cache;
}
