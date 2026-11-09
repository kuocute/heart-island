// 醫病共享決策（SDM）引導卡：顯示在「14｜進階心衰醫療港」最上方。
// ・主要按鈕在新分頁開啟奇美醫院 SDM 頁面；問卷填寫與資料提交由奇美平台處理，照護島只提供入口。
// ・照護島不記錄是否開啟或填寫問卷，也不會把「點開問卷」記為「已完成 SDM」；站點進度照原本規則。
// ・修改文字或網址：直接改下方欄位。網址的網域需同時加入 scripts/check-bundle.mjs 的核准清單。
import type { StationId } from './types';

export const SDM_CARD: {
  station: StationId;
  title: string;
  text: string;
  primaryLabel: string;
  url: string;
  secondaryLabel: string;
  note: string;
} = {
  station: 'advanced-hf',
  title: '先和醫療團隊談談你的照護選擇',
  text: '面對下一步的照護，你最在意什麼？可以和家人一起使用這個工具，把想問的問題記下來，下次與醫療團隊討論。',
  primaryLabel: '開始醫病共享決策（SDM）',
  url: 'https://apps.chimei.org.tw/sdm/survey_doit.aspx?X=c6zuS',
  secondaryLabel: '先了解照護選項',
  note: '將在新分頁開啟奇美醫院 SDM 頁面，問卷由奇美醫院平台填寫與保存，照護島不會記錄你的回答。',
};
