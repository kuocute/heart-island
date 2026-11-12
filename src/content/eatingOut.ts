// 08 低鹽餐桌：「今天外食，怎麼點？」互動練習（展開原本的「外食小技巧」照護重點）。
// 四個外食情境，每個情境 1–2 個「我會怎麼做」選擇；作答後一句話說明差別，
// 再給一句可以直接對店家說的話，或一個實際操作的購買技巧。
// 超商情境使用兩張「示範用」虛構營養標示，數字不是真實商品，也不代表個人建議攝取量。

export type EatOutChoice = { id: string; label: string; feedback: string };

/** 示範用營養標示（虛構） */
export type DemoLabel = {
  id: string;
  name: string;
  /** 每一份的份量（公克） */
  servingGrams: number;
  /** 本包裝含幾份 */
  servings: number;
  /** 每一份的鈉（毫克） */
  sodiumPerServing: number;
};

export type EatOutQuestion = {
  id: string;
  /** 情境中的狀況（店家說了什麼、眼前有什麼） */
  situation: string;
  prompt: string;
  choices: EatOutChoice[];
  bestChoiceId: string;
  /** 作答後用一句話解釋差別 */
  why: string;
  /** 可以直接對店家說的話 */
  say?: string;
  /** 可以實際操作的購買技巧 */
  tip?: string;
  /** 超商情境：比較兩張示範用營養標示 */
  labels?: DemoLabel[];
};

export type EatOutScene = {
  id: 'bento' | 'noodle' | 'hotpot' | 'store';
  label: string;
  icon: string;
  intro: string;
  questions: EatOutQuestion[];
};

/** 吃完整包的鈉 = 每份鈉含量 × 包裝份數 */
export const packageSodium = (l: DemoLabel) => l.sodiumPerServing * l.servings;

export const EATING_OUT = {
  station: 'diet',
  itemId: 'eat-out',
  title: '今天外食，怎麼點？',
  intro: '選一個今天可能遇到的外食情境，想想「我會怎麼做」。',
  scenes: ([
    {
      id: 'bento',
      label: '便當／自助餐',
      icon: '🍱',
      intro: '中午到自助餐店買便當。',
      questions: [
        {
          id: 'bento-order',
          situation: '店家問：「飯要淋滷汁嗎？青菜要哪一樣？」',
          prompt: '我會怎麼做？',
          choices: [
            { id: 'plain', label: '「白飯不要淋滷汁，青菜請幫我少鹽、不要淋醬。」', feedback: '對！白飯不淋滷汁、青菜少鹽，是外食最容易做到的一步。' },
            { id: 'gravy', label: '「飯淋滷汁比較香，青菜夾酸菜和雪菜。」', feedback: '滷汁和醃漬的酸菜、雪菜都含不少鹽。再想一想。' },
            { id: 'default', label: '「都可以，照平常的就好。」', feedback: '照平常的，白飯常會被淋上滷汁。可以主動說出你的需要。' },
          ],
          bestChoiceId: 'plain',
          why: '滷汁和醬汁會把鹽加到白飯和青菜上，不淋、少鹽，就能少吃不少鹽。',
          say: '「白飯不要淋滷汁，青菜少鹽、不要淋醬，謝謝。」',
        },
        {
          id: 'bento-main',
          situation: '店家說：「主菜都已經調味好了，沒辦法少鹽。」',
          prompt: '我會怎麼做？',
          choices: [
            { id: 'ask', label: '「那有沒有調味比較少的主菜？」', feedback: '對！不能調整時，換一道調味比較少的主菜，例如清蒸、水煮或烤的。' },
            { id: 'accept', label: '「那算了，就照原本的吃。」', feedback: '還有其他選擇。可以再問一句，換一道比較清淡的主菜。' },
            { id: 'more-sauce', label: '「那我再加一點醬油膏比較下飯。」', feedback: '主菜已經有調味，再加醬油膏會吃進更多鹽。' },
          ],
          bestChoiceId: 'ask',
          why: '主菜沒辦法調整時，改選清蒸、水煮或烤的主菜，比吃重口味的主菜少鹽。',
          say: '「有沒有調味比較少的主菜？例如清蒸或烤的。」',
        },
      ],
    },
    {
      id: 'noodle',
      label: '麵店／小吃攤',
      icon: '🍜',
      intro: '在麵店點了一碗湯麵和一盤燙青菜。',
      questions: [
        {
          id: 'noodle-soup',
          situation: '老闆問：「燙青菜要加肉燥、醬油膏嗎？」',
          prompt: '我會怎麼做？',
          choices: [
            { id: 'less', label: '「燙青菜的肉燥和醬油膏少一點。麵湯我會少喝幾口。」', feedback: '對！醬料少加、麵湯少喝，就能少吃很多鹽。' },
            { id: 'finish', label: '「肉燥醬油膏照加，湯麵的湯整碗喝完才不浪費。」', feedback: '麵湯和肉燥、醬油膏都含不少鹽，整碗喝完會吃進很多鹽。' },
            { id: 'braise', label: '「青菜不要了，改切一盤滷味。」', feedback: '滷味是用滷汁煮的，通常含不少鹽。青菜留著，醬料少加就好。' },
          ],
          bestChoiceId: 'less',
          why: '麵湯和肉燥、醬油膏都含不少鹽，少喝湯、醬料少加，就能少吃很多鹽。',
          say: '「燙青菜的肉燥和醬油膏少一點，謝謝。」',
        },
        {
          id: 'noodle-dry',
          situation: '這次想吃乾麵，老闆問：「拌醬要多一點嗎？」',
          prompt: '我會怎麼做？',
          choices: [
            { id: 'less-sauce', label: '「拌醬少一點就好。」', feedback: '對！乾麵的鹽藏在拌醬裡，醬少一點就少吃一點鹽。' },
            { id: 'more', label: '「醬多一點，拌起來比較香。」', feedback: '拌醬（肉燥、醬油、麻醬）都含不少鹽，多加就吃進更多鹽。' },
            { id: 'no-soup', label: '「乾麵沒有湯，醬多加也沒關係。」', feedback: '乾麵雖然沒有湯，拌醬裡也有不少鹽，還是要留意用量。' },
          ],
          bestChoiceId: 'less-sauce',
          why: '乾麵雖然沒有湯，鹽都在拌醬裡，所以醬的用量一樣要留意。',
          say: '「乾麵的拌醬少一點，謝謝。」',
        },
      ],
    },
    {
      id: 'hotpot',
      label: '火鍋',
      icon: '🍲',
      intro: '和家人去吃火鍋，要從冰櫃挑食材。',
      questions: [
        {
          id: 'hotpot-pick',
          situation: '冰櫃裡有青菜、豆腐、新鮮肉片和海鮮，也有貢丸、餃類、蟹肉棒等火鍋料。',
          prompt: '我會怎麼做？',
          choices: [
            { id: 'fresh', label: '多挑青菜、豆腐、新鮮肉片或海鮮，加工火鍋料少拿。', feedback: '對！新鮮食材本身含鹽較少。' },
            { id: 'processed', label: '多拿貢丸、餃類、蟹肉棒，煮起來比較快。', feedback: '丸子、餃類、蟹肉棒等加工火鍋料，通常加了較多鹽。' },
            { id: 'noodle', label: '拿一包泡麵加火鍋料，方便又飽。', feedback: '泡麵和加工火鍋料都含不少鹽。可以多選新鮮食材。' },
          ],
          bestChoiceId: 'fresh',
          why: '新鮮食材本身含鹽較少，丸子、餃類等加工火鍋料通常加了較多鹽。',
          say: '「我們想要清湯鍋底，謝謝。」',
        },
        {
          id: 'hotpot-soup',
          situation: '火鍋煮好了，桌上有沙茶醬、醬油、蔥、蒜和辣椒。',
          prompt: '我會怎麼做？',
          choices: [
            { id: 'light', label: '湯少喝；沾醬多用蔥、蒜、辣椒，醬油和沙茶少沾。', feedback: '對！用蔥、蒜提味，沾醬少一點，湯也少喝。' },
            { id: 'drink', label: '最後把湯整碗喝完，精華都在湯裡。', feedback: '煮到最後，湯底和食材的鹽都溶在湯裡，越喝越鹹。' },
            { id: 'dip', label: '每一口都沾滿沙茶醬，比較好吃。', feedback: '沙茶醬和醬油都含不少鹽，沾滿會吃進很多鹽。' },
          ],
          bestChoiceId: 'light',
          why: '火鍋湯越煮越鹹，沾醬也含不少鹽，少喝湯、改用蔥蒜提味，就能少吃鹽。',
          tip: '沾醬用小碟子裝一點就好，多加蔥、蒜、辣椒提味。',
        },
      ],
    },
    {
      id: 'store',
      label: '超商',
      icon: '🏪',
      intro: '在超商想買一包點心，看看包裝背面的營養標示。',
      questions: [
        {
          id: 'store-label',
          situation: '下面兩張是示範用的營養標示（虛構商品，數字只供練習）。',
          prompt: '如果吃完整包，哪一包的鈉比較少？',
          labels: [
            { id: 'A', name: '示範用 海苔脆片', servingGrams: 20, servings: 3, sodiumPerServing: 150 },
            { id: 'B', name: '示範用 烤米餅', servingGrams: 25, servings: 2, sodiumPerServing: 180 },
          ],
          choices: [
            { id: 'A', label: 'A 海苔脆片：每份的鈉比較少，所以整包也比較少', feedback: '每份的鈉比較少，但這包有 3 份，吃完整包反而比較多。' },
            { id: 'B', label: 'B 烤米餅：要乘上份數再比較', feedback: '對！乘上包裝份數後，吃完整包時 B 的鈉比較少。' },
            { id: 'same', label: '兩包差不多，看熱量就好', feedback: '要比較鈉，請看「鈉」這一欄，並乘上包裝份數。' },
          ],
          bestChoiceId: 'B',
          why: '營養標示上的鈉常是「每一份」，吃完整包要乘上包裝份數，才知道實際吃進多少鈉。',
          tip: '拿起包裝先找「本包裝含＿份」，用「每份鈉含量 × 包裝份數」算出整包的鈉。',
        },
      ],
    },
  ] satisfies EatOutScene[]) as EatOutScene[],
  practice: {
    title: '用自己的話說一次',
    question: '如果明天要買便當，你會怎麼點？如果店家說沒辦法少鹽，你會怎麼換？',
    sentenceFrame: '我會請店家＿＿＿。如果不能調整，我會改選＿＿＿。',
    doneLabel: '我練習好了',
  },
} as const;
