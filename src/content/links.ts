// 照護串聯線與照護階段。
// ・串聯線：把不同站的照護重點連起來，地圖上按「串聯」可看到虛線。from/to 的 item 要對應 stations.ts 的 items[].id。
// ・照護階段：「時間」功能用的分段，每站在 stations.ts 的 phases 標示屬於哪些階段。
import type { CareLink, Phase } from './types';

export const CARE_LINKS: CareLink[] = [
  { from: { station: 'ward', item: 'daily-weight' }, to: { station: 'weight', item: 'how' }, label: '住院時每天量體重，回家繼續量' },
  { from: { station: 'admission', item: 'symptom' }, to: { station: 'warning', item: 'describe' }, label: '入院時練習說出變化，回家打電話也用得上' },
  { from: { station: 'ward', item: 'meds-learn' }, to: { station: 'medication', item: 'no-stop' }, label: '住院時認識的藥，回家照藥單吃' },
  { from: { station: 'team', item: 'pharmacist' }, to: { station: 'medication', item: 'pillbox' }, label: '藥師說明，回家整理藥盒' },
  { from: { station: 'team', item: 'dietitian' }, to: { station: 'diet', item: 'hidden-salt' }, label: '營養師說明，回家餐桌實作' },
  { from: { station: 'team', item: 'rehab' }, to: { station: 'activity', item: 'step' }, label: '復健評估，回家循序活動' },
  { from: { station: 'team', item: 'social' }, to: { station: 'long-term-care', item: 'need' }, label: '社工評估，銜接長照資源' },
  { from: { station: 'discharge-prep', item: 'caregiver-ready' }, to: { station: 'long-term-care', item: 'carer-rest' }, label: '決定主要照顧者，也照顧照顧者' },
  { from: { station: 'discharge', item: 'followup-date' }, to: { station: 'follow-up', item: 'bring' }, label: '出院單上的回診日期，回診時帶照護卡' },
  { from: { station: 'discharge', item: 'contact' }, to: { station: 'warning', item: 'where-help' }, label: '出院資料上的聯絡方式，就是求助方式' },
  { from: { station: 'weight', item: 'card' }, to: { station: 'follow-up', item: 'phone' }, label: '照護卡放電話旁，關懷電話時說清楚' },
  { from: { station: 'palliative', item: 'care-goal' }, to: { station: 'advanced-hf', item: 'transplant' }, label: '先談在意的事，再一起認識進階治療' },
];

export const PHASES: Phase[] = [
  { id: 'admit-day', title: '入院當天', description: '說出身體變化、帶來平常的藥、認識個案管理師。' },
  { id: 'inpatient', title: '住院期間', description: '每日紀錄、認識藥物、跨團隊說明；也可以開始談照護目標。' },
  { id: 'pre-discharge', title: '出院前', description: '回示教、出院計畫、決定主要照顧者與長照需求。' },
  { id: 'discharge-day', title: '出院當天', description: '看懂出院單、回診日期與聯絡方式，核對藥單。' },
  { id: 'first-week', title: '返家第一週', description: '量體重、按時吃藥、低鹽飲食、留意變化、接關懷電話。' },
  { id: 'long-term', title: '長期照護', description: '規律回診、持續活動、照顧支援與照護目標。' },
];
