// 10 警訊燈塔：紅燈／黃燈警訊、每天自我檢查、警訊練習與完整衛教圖卡。
// 參考「心臟衰竭病人出院衛教警訊辨識卡（居家照護版）」。
// 固定的體重門檻與聯絡電話待照護團隊核定後填入（見 TEAM_PENDING）；實際警訊標準依醫師指示及個人平常狀況調整。

export type Sign = { icon: string; text: string };

export type DailyCheck = {
  id: string;
  icon: string;
  title: string;
  /** 每天怎麼做 */
  how: string;
  /** 需要注意 */
  watch: string;
};

export type Triage = 'observe' | 'contact' | 'call119';

export type DrillQuestion = {
  id: string;
  title: string;
  situation: string;
  answer: Triage;
  /** 選完顯示的原因（依選項） */
  feedback: Record<Triage, string>;
};

/** 待團隊核定後才填入的內容；未核定時畫面顯示「待照護團隊核定」 */
export const TEAM_PENDING = {
  /** 例如「1 天增加 1 公斤或 3 天增加 2 公斤」；核定後填入 */
  weightThreshold: '',
  /** 心臟衰竭照護團隊聯絡電話；核定後填入 */
  teamPhone: '',
};

export const WARNING = {
  station: 'warning',

  red: {
    label: '紅燈',
    icon: '⛔',
    title: '立即撥打 119',
    signs: [
      { icon: '🫁', text: '嚴重呼吸困難' },
      { icon: '💬', text: '喘到說不完一句話' },
      { icon: '💢', text: '胸痛、冒冷汗或臉色蒼白' },
      { icon: '😵', text: '昏倒或意識不清' },
      { icon: '👄', text: '嘴唇發紫' },
      { icon: '🩸', text: '咳粉紅色泡沫痰' },
    ] satisfies Sign[],
    action: '立即撥打 119，依派遣員指示處理',
  },

  yellow: {
    label: '黃燈',
    icon: '⚠️',
    title: '今天聯絡照護團隊',
    signs: [
      { icon: '⚖️', text: '體重比平常明顯增加' },
      { icon: '🚶', text: '走路比平常喘' },
      { icon: '🛏️', text: '夜間喘醒，或需要墊更多枕頭' },
      { icon: '🦶', text: '腳腫或腹脹加劇' },
      { icon: '🚽', text: '尿量明顯減少' },
    ] satisfies Sign[],
    action: '請依個人出院照護計畫行動，用藥有疑問先聯絡團隊',
    pendingNote: '體重增加多少要聯絡、照護團隊的聯絡電話：待照護團隊核定後填入。',
  },

  daily: {
    title: '每天自我檢查',
    intro: '每天量、仔細看、異常早聯絡。點開每一張卡看怎麼做。',
    checks: [
      { id: 'weight', icon: '⚖️', title: '體重', how: '起床排尿後、早餐前，用同一台體重計，穿相近衣著測量，並記錄下來。', watch: '體重比平常明顯增加。' },
      { id: 'breath', icon: '🫁', title: '呼吸', how: '注意走路、睡覺時是否比平常更喘。', watch: '喘得比平常厲害、無法平躺。' },
      { id: 'edema', icon: '🦶', title: '水腫', how: '觀察腳踝、小腿及腹部。', watch: '鞋子變緊、水腫或腹脹加劇。' },
      { id: 'bp', icon: '💓', title: '血壓與心跳', how: '依醫囑測量並記錄。', watch: '數值明顯偏離平常，或伴隨不舒服。' },
      { id: 'urine', icon: '🚽', title: '尿量', how: '注意排尿次數與尿量。', watch: '尿量明顯減少。' },
      { id: 'meds', icon: '💊', title: '用藥', how: '按時服藥，不自行停藥。', watch: '漏藥、吃錯藥，或服藥後不舒服。' },
    ] satisfies DailyCheck[],
  },

  drill: {
    title: '警訊練習｜我現在該怎麼做？',
    intro: '以下是虛構情境，練習判斷該怎麼做。這裡的選項只會顯示說明，不會真的撥打電話。',
    options: [
      { id: 'observe', label: '繼續每天觀察' },
      { id: 'contact', label: '今天聯絡照護團隊' },
      { id: 'call119', label: '立即撥打 119' },
    ] satisfies { id: Triage; label: string }[],
    questions: [
      {
        id: 'same',
        title: '和平常差不多',
        situation: '阿明今天早上量體重，和這幾天差不多；走路、睡覺都和平常一樣，腳也沒有變腫。',
        answer: 'observe',
        feedback: {
          observe: '對！和平常差不多，就照每天自我檢查繼續觀察、記錄。',
          contact: '和平常差不多時，照每天自我檢查繼續觀察就好；有變化再聯絡團隊。',
          call119: '沒有紅燈警訊時不需要撥 119。和平常差不多，繼續每天觀察、記錄就好。',
        },
      },
      {
        id: 'swelling',
        title: '腳變腫、鞋子變緊',
        situation: '這幾天阿明的腳越來越腫，平常穿的鞋子變緊了，但呼吸和平常差不多。',
        answer: 'contact',
        feedback: {
          observe: '腳腫加劇、鞋子變緊是黃燈警訊，不要只是觀察，今天就聯絡照護團隊。',
          contact: '對！腳腫加劇、鞋子變緊是黃燈警訊，今天聯絡照護團隊，並依出院照護計畫行動。',
          call119: '沒有嚴重呼吸困難等紅燈警訊時，先今天聯絡照護團隊；若出現紅燈警訊再撥 119。',
        },
      },
      {
        id: 'breathless',
        title: '突然喘到說不完一句話',
        situation: '阿明突然非常喘，喘到說不完一句話。',
        answer: 'call119',
        feedback: {
          observe: '喘到說不完一句話是紅燈警訊，不能等，要立即撥打 119。',
          contact: '喘到說不完一句話是紅燈警訊，不要等團隊回電，要立即撥打 119，依派遣員指示處理。',
          call119: '對！喘到說不完一句話是紅燈警訊，立即撥打 119，依派遣員指示處理。（這是練習，不會真的撥打）',
        },
      },
    ] satisfies DrillQuestion[],
  },

  card: {
    title: '查看完整衛教圖卡',
    alt: '心臟衰竭病人出院衛教警訊辨識卡（居家照護版）：每天自我檢查體重、呼吸、水腫、血壓心跳、尿量與用藥；黃燈警訊今天聯絡醫療團隊；紅燈警訊立即就醫或撥打 119。',
    /** public/assets 底下的檔名；正式版換成核定後的圖卡 */
    file: 'warning-card.webp',
    /** draft：參考版，顯示「待團隊核定」；approved：核定版 */
    status: 'draft' as 'draft' | 'approved',
    draftNote: '參考版：正式版將換成照護團隊核定後的圖卡。實際警訊標準依醫師指示及個人平常狀況調整。',
  },
};
