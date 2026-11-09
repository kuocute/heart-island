// 「05｜出院碼頭」進站後的第一個畫面：先選語言、看一段照護影片，再繼續回覆示教。
// ・選擇語言只切換影片，不會寫入任何進度；站點是否完成仍依原本的任務流程判定。
// ・新增或修改影片：在 languages 加一筆（label 為按鈕文字、lang 為語言代碼、url 為 YouTube 網址）。
import type { StationId } from './types';

export type VideoLanguage = { id: string; label: string; lang: string; url: string };

export const STATION_VIDEO: {
  station: StationId;
  title: string;
  prompt: string;
  continueLabel: string;
  languages: VideoLanguage[];
} = {
  station: 'discharge',
  title: '出院前，先看一段照護影片',
  prompt: '請選擇影片語言，按下播放鍵開始觀看。看完或想先練習時，都可以按「繼續回覆示教」。',
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

/** 站內嵌入用網址：隱私加強模式、不自動播放、手機在頁面內播放 */
export const embedUrl = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?rel=0&playsinline=1&modestbranding=1`;
