// 07 用藥小站：「認識我的心衰藥」藥卡與「藥師櫃台：遇到這件事怎麼辦？」情境遊戲。
// 內容只做病人看得懂的一般說明；用藥組合、劑量和追蹤時間依個人處方及團隊指示。
// 情境中的藥袋都是示範用的虛構資料，畫面只練習「怎麼問」，不提供個人用藥建議。

export type MedCard = {
  id: string;
  /** 藥物類別 */
  title: string;
  /** 常見成分名（學名），方便對照藥袋 */
  examples: string;
  /** 這類藥幫我什麼 */
  helps: string;
  /** 用藥期間要留意什麼 */
  watch: string[];
};

export type DeskChoice = { id: string; label: string; feedback: string };

export type DeskScenario = {
  id: string;
  title: string;
  situation: string;
  /** 示範用的虛構藥袋（只用來練習詢問） */
  demoBag?: { label: string; rows: [string, string][] };
  prompt: string;
  choices: DeskChoice[];
  bestChoiceId: string;
  /** 選完後的一句原因 */
  why: string;
  /** 可以向藥師或個管師開口的一句話 */
  say: string;
};

export const MED_STATION = {
  station: 'medication',
  cardsItemId: 'hf-meds',
  deskItemId: 'pharmacy-desk',

  cards: {
    title: '認識我的心衰藥',
    intro: '心臟收縮功能變弱的心衰竭（HFrEF），常用四類核心藥物，一起保護心臟、減少住院。不是每個人四類都會用，請對照自己的藥單。',
    core: [
      {
        id: 'arni',
        title: 'ARNI／ACEi／ARB',
        examples: '例如 sacubitril/valsartan、enalapril、valsartan（這三種通常只會用其中一種）',
        helps: '放鬆血管、減輕心臟的負擔，幫助心臟不要越來越大、越來越弱，減少因心衰住院。',
        watch: [
          '剛開始或調整劑量時可能頭暈，起身時動作慢一點。',
          '團隊會抽血追蹤腎功能和鉀離子。',
          '若嘴唇、臉或舌頭腫起來、呼吸困難，請立即就醫。',
        ],
      },
      {
        id: 'beta',
        title: '乙型阻斷劑',
        examples: '例如 bisoprolol、carvedilol、metoprolol',
        helps: '讓心跳慢下來、穩一點，減少心臟的負擔，長期吃可以幫助心臟功能變好。',
        watch: [
          '剛開始或加量時可能覺得累、頭暈，通常會慢慢適應。',
          '心跳很慢、頭暈到快站不穩時，請告訴團隊。',
          '不要自己突然停藥。',
        ],
      },
      {
        id: 'mra',
        title: 'MRA',
        examples: '例如 spironolactone、eplerenone',
        helps: '幫助身體排掉多餘的鹽和水，保護心臟，減少心臟繼續受傷。',
        watch: [
          '團隊會抽血追蹤鉀離子和腎功能。',
          '不要自己使用低鈉鹽（含鉀）或鉀補充品，先問團隊。',
          '胸部脹痛或其他不舒服，請告訴醫師。',
        ],
      },
      {
        id: 'sglt2',
        title: 'SGLT2 抑制劑',
        examples: '例如 dapagliflozin、empagliflozin',
        helps: '原本是糖尿病用藥，對有沒有糖尿病的心衰竭病人都能減少住院，也保護腎臟。',
        watch: [
          '小便次數可能變多。私密處保持清潔，紅、癢、痛時告訴醫師。',
          '吃不下、嘔吐、腹瀉，或要手術、做檢查前，先問團隊要不要暫停。',
        ],
      },
    ] satisfies MedCard[],
    diuretic: {
      id: 'diuretic',
      title: '排水藥（利尿劑）',
      examples: '例如 furosemide',
      helps: '幫助身體排出多餘的水分，用於緩解水分堆積造成的腳腫、喘。',
      watch: [
        '吃完會比較常想上廁所，依團隊建議的時間吃。',
        '每天量體重。頭暈、口很乾、抽筋或尿量突然變少，請告訴團隊。',
        '劑量可能依體重和症狀調整，請依團隊指示，不要自己增減。',
      ],
    } satisfies MedCard,
    note: '用藥組合、劑量和追蹤時間依個人處方及團隊指示。對藥物有疑問，請問醫師、藥師或個管師。',
  },

  desk: {
    title: '藥師櫃台：遇到這件事怎麼辦？',
    intro: '每次一個生活情境，選「我會怎麼做」。情境與藥袋都是示範用的虛構內容。',
    scenarios: [
      {
        id: 'bags',
        title: '新舊藥袋都在桌上',
        situation: '出院回家後，桌上有住院前的舊藥袋，也有出院帶回來的新藥袋，有幾包藥名看起來很像。',
        prompt: '我會怎麼做？',
        choices: [
          { id: 'check', label: '把新舊兩份藥袋都帶去給藥師核對，問清楚哪一包停用、新藥什麼時候開始吃。', feedback: '對！把兩份藥袋一起交給藥師核對最清楚。' },
          { id: 'finish-old', label: '舊藥還沒吃完，先把舊的吃完再換新的。', feedback: '舊藥可能已經停用或換了劑量，自己繼續吃可能吃錯。' },
          { id: 'both', label: '新舊藥一起吃，比較保險。', feedback: '新舊藥一起吃，可能重複吃到同一類藥。' },
        ],
        bestChoiceId: 'check',
        why: '出院時藥物常有調整，新舊藥袋一起核對，才不會重複吃或吃到已停用的藥。',
        say: '「這是我的新舊藥袋，請幫我核對：哪一包停用？新藥什麼時候開始吃？」',
      },
      {
        id: 'painkiller',
        title: '在藥局想買止痛藥',
        situation: '膝蓋痠痛好幾天，走進藥局想買一盒止痛藥。',
        prompt: '我會怎麼做？',
        choices: [
          { id: 'show-list', label: '先拿出藥單，告訴藥師「我有心衰竭」，請藥師幫我確認可以吃哪一種。', feedback: '對！先讓藥師知道你的病和正在吃的藥。' },
          { id: 'ad', label: '直接買廣告上常看到的止痛藥。', feedback: '有些止痛藥不適合心衰竭，買之前先讓藥師確認。' },
          { id: 'borrow', label: '跟家人借他平常吃的消炎止痛藥。', feedback: '別人適合的藥不一定適合你，有些止痛藥會讓心衰變差。' },
        ],
        bestChoiceId: 'show-list',
        why: '像 ibuprofen 這類非類固醇消炎止痛藥（NSAIDs）可能讓身體留住水分，使心衰症狀變差。',
        say: '「我有心衰竭，這是我的藥單，請幫我確認可以吃哪一種止痛藥。」',
      },
      {
        id: 'surgery',
        title: '下週要手術，正在吃 SGLT2 抑制劑',
        situation: '下週要做一個預定的手術，你正在吃 SGLT2 抑制劑。',
        demoBag: {
          label: '示範用藥袋・虛構',
          rows: [['姓名', '示範病人'], ['藥品', 'SGLT2 抑制劑（示範）'], ['用法', '依處方'], ['備註', '手術前請詢問醫療團隊']],
        },
        prompt: '我會怎麼做？',
        choices: [
          { id: 'tell-early', label: '提前告訴手術團隊和開藥的醫師我在吃這個藥，確認什麼時候暫停、什麼時候恢復。', feedback: '對！提前說，團隊才來得及安排。' },
          { id: 'day-of', label: '手術當天早上再跟護理師說就好。', feedback: '這類藥有時要在手術前幾天先暫停，當天才說可能來不及。' },
          { id: 'self-stop', label: '自己決定前一天停掉，術後覺得可以了再吃回來。', feedback: '什麼時候暫停、什麼時候恢復，要由團隊依你的狀況決定。' },
        ],
        bestChoiceId: 'tell-early',
        why: 'SGLT2 抑制劑有時需要在手術前先暫停，提前告知，團隊才能安排何時暫停、何時恢復。',
        say: '「我正在吃 SGLT2 抑制劑，下週要手術，請問什麼時候要先停？術後什麼時候恢復？」',
      },
    ] satisfies DeskScenario[],
  },

  practice: {
    title: '用自己的話說一次',
    question: '如果出院後發現新舊藥袋都還在，你會帶什麼去找誰？你會問哪一句？',
    sentenceFrame: '我會帶＿＿＿去找＿＿＿，請他幫我確認＿＿＿。',
    doneLabel: '我練習好了',
  },
};
