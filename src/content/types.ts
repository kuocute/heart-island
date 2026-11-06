// 衛教內容的資料型別。個管師修改文字時只需改 stations.ts／links.ts，不用動場景程式。

/** 病友與家屬：有各自的示教文字 */
export type LearnerRole = 'patient' | 'caregiver';
/** 醫護人員：陪同操作時同時看到病友版與家屬版示教，住院區預設開啟規範卡 */
export type Role = LearnerRole | 'staff';

export type StationId =
  // 住院區
  | 'admission'
  | 'ward'
  | 'team'
  | 'discharge-prep'
  | 'discharge'
  // 居家區
  | 'weight'
  | 'medication'
  | 'diet'
  | 'activity'
  | 'warning'
  | 'follow-up'
  | 'long-term-care'
  | 'palliative'
  | 'advanced-hf';

export type Zone = 'hospital' | 'home';

/** 「時間」功能的照護階段 */
export type PhaseId = 'admit-day' | 'inpatient' | 'pre-discharge' | 'discharge-day' | 'first-week' | 'long-term';

export type Choice = {
  id: string;
  label: string;
  /** 選了這個選項後顯示的回饋。知識題答錯時請寫「具體提示」，方便使用者重試。 */
  feedback: string;
};

/** 任務中可附帶的虛構道具（出院單、照護卡、示意圖等）。全部都是模擬資料。 */
export type Prop =
  | {
      kind: 'sheet';
      title: string;
      /** 顯示在道具右上角，例如「虛構範例」「模擬練習」 */
      badge: string;
      rows: { key: string; label: string; value: string }[];
    }
  | { kind: 'lvad' }
  | { kind: 'stages'; items: { title: string; text: string }[] };

type MissionBase = {
  id: string;
  /** 任務短標題，顯示在步驟上方 */
  title: string;
  /** 情境描述 */
  scenario: string;
  /** 題目（做選擇時的提問） */
  question: string;
  prop?: Prop;
  /** 說一次或做一次：依角色顯示 */
  teachBack: Record<LearnerRole, string>;
};

/** 知識題：一定要有正確選項，答錯可重試 */
export type QuizMission = MissionBase & {
  interaction: 'quiz';
  choices: Choice[];
  correctChoiceId: string;
};

/** 排序題：一定要有正確順序，答錯可重試 */
export type SequenceMission = MissionBase & {
  interaction: 'sequence';
  choices: Choice[];
  correctOrder: string[];
  /** 順序不對時的具體提示 */
  retryHint: string;
};

/** 照護偏好／反思題：沒有對錯、不計分、不儲存選了什麼 */
export type ReflectionMission = MissionBase & {
  interaction: 'reflection';
  choices: Choice[];
  /** 選完後顯示的對話卡標題（例如「我想和家人、醫師談的事」）。省略則不顯示對話卡。 */
  conversationCard?: string;
};

export type Mission = QuizMission | SequenceMission | ReflectionMission;

/** 島上的小建築：本站的照護重點細項。點開看說明，可連到練習任務。 */
export type Item = {
  id: string;
  title: string;
  /** 一兩句說明 */
  summary: string;
  /** 搜尋用關鍵字（同義詞、俗稱） */
  keywords: string[];
  /** 對應的練習任務 id（同一站） */
  missionId?: string;
};

export type StaffCard = {
  /** 本站相關的認證查核主題（建議方向，需對照院內核定文件） */
  topics: string[];
  /** 複製到 NotebookLM 的查詢文字 */
  query: string;
};

export type Station = {
  id: StationId;
  /** 站號，例如 '01' */
  no: string;
  zone: Zone;
  title: string;
  /** 地圖縮小時顯示的短名（2–4 字） */
  shortName: string;
  /** 副標，例如「入院評估亭」 */
  subtitle: string;
  /** 出現在「時間」功能的哪些階段 */
  phases: PhaseId[];
  /** 對應 src/game/mapData.ts 的路網節點 */
  entryNodeId: string;
  /** 進站時的畫面描述（給螢幕閱讀器與不看地圖的人） */
  scene: string;
  /** 依角色顯示的進站提示（家屬版著重陪同、觀察與溝通；醫護版著重陪同引導） */
  roleTips: Record<Role, string>;
  /** 本站照護重點（島上的小建築），建議 2–4 項 */
  items: Item[];
  /** 本站需提醒的事項（例如「本站不判斷嚴重程度」） */
  notice?: string;
  /** 多個任務時，是否先讓玩家選擇要進哪一個（例如兩個展館） */
  pickMission?: { prompt: string };
  missions: Mission[];
  /** 醫護人員規範卡。住院區每站都有；居家區視需要（例如回診與電話追蹤）。 */
  staff?: StaffCard;
};

/** 照護串聯線：把不同站的照護重點連起來 */
export type CareLink = {
  from: { station: StationId; item: string };
  to: { station: StationId; item: string };
  /** 線上的說明，例如「住院量的體重，回家繼續量」 */
  label: string;
};

export type Phase = { id: PhaseId; title: string; description: string };
