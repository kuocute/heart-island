// 「05｜出院碼頭」進站後的第一個畫面：先選語言、看一段照護影片，再繼續回覆示教。
// ・選擇語言只切換影片，不會寫入任何進度；站點是否完成仍依原本的任務流程判定。
// ・新增或修改影片：在 languages 加一筆（label 為按鈕文字、lang 為語言代碼、url 為 YouTube 網址）。
import type { StationId } from './types';

export type VideoLanguage = { id: string; label: string; lang: string; url: string };

export const STATION_VIDEO: {
  station: StationId;
  title: string;
  playerTitle: string;
  prompt: string;
  continueLabel: string;
  languages: VideoLanguage[];
} = {
  station: 'discharge',
  title: '出院前，請選擇您想觀看的影片語言',
  playerTitle: '出院照護影片',
  prompt: '選好語言後，影片會出現在這個視窗，請按播放鍵開始觀看。看完或想先練習時，都可以按「繼續回覆示教」。',
  continueLabel: '繼續回覆示教',
  languages: [
    { id: 'zh', label: '中文', lang: 'zh-Hant', url: 'https://youtu.be/CVxv18oN3IE' },
    { id: 'ko', label: '한국어', lang: 'ko', url: 'https://youtu.be/-uMzUK6rr74' },
    { id: 'vi', label: 'Tiếng Việt', lang: 'vi', url: 'https://youtu.be/egGDlRvgJEQ' },
    { id: 'en', label: 'English', lang: 'en', url: 'https://youtu.be/-LxkYPScxt0' },
    { id: 'id', label: 'Bahasa Indonesia', lang: 'id', url: 'https://youtu.be/vILaVEThvz0' },
  ],
};

/** 從 youtu.be／youtube.com 網址取出影片 ID；格式不對時回傳 null */
export function youtubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') return /^[\w-]{11}$/.test(u.pathname.slice(1)) ? u.pathname.slice(1) : null;
    if (/(^|\.)youtube\.com$/.test(u.hostname)) {
      const v = u.searchParams.get('v');
      return v && /^[\w-]{11}$/.test(v) ? v : null;
    }
  } catch { /* 不是網址 */ }
  return null;
}

export const EMBED_ORIGIN = 'https://www.youtube.com';

/**
 * 站內嵌入用網址（YouTube 官方內嵌網址 www.youtube.com/embed/ID）。
 * 不自動播放；playsinline 讓手機在頁面內播放；enablejsapi + origin 讓播放器回報錯誤碼（153、101／150）。
 * 短網址 youtu.be 只給「在 YouTube 開啟」按鈕使用。
 */
export function embedUrl(id: string, origin?: string): string {
  const q = new URLSearchParams({ rel: '0', playsinline: '1', enablejsapi: '1' });
  if (origin && /^https?:\/\//.test(origin)) q.set('origin', origin);
  return `${EMBED_ORIGIN}/embed/${id}?${q}`;
}

/** YouTube 播放器錯誤碼 → 給使用者看的說明 */
export function playerErrorText(code: number): string {
  if (code === 101 || code === 150) return `這支影片的擁有者不允許在其他網站播放（錯誤 ${code}）。請按「在 YouTube 開啟」觀看。`;
  if (code === 153) return '播放器沒有收到網站來源資訊，無法在站內播放（錯誤 153）。請按「在 YouTube 開啟」觀看。';
  if (code === 100) return '找不到這支影片，可能已移除或設為私人（錯誤 100）。';
  if (code === 2 || code === 5) return `播放器無法載入這支影片（錯誤 ${code}）。請按「在 YouTube 開啟」觀看。`;
  return `影片暫時無法在站內播放（錯誤 ${code}）。請按「在 YouTube 開啟」觀看。`;
}
