// 14 站的情境、照護重點、選項、回饋與示教文字。
// ・修改文字：直接改下面的字串即可，存檔後重新整理頁面。
// ・新增選項：在 choices 加一筆，id 不可重複；知識題記得同步 correctChoiceId。
// ・照護重點 items 會變成島上的小建築，keywords 用於搜尋。
// ・啟動時 validateStations() 會檢查格式，寫錯會在畫面與主控台顯示原因。
// ・正式臨床上線前，衛教文案、警訊分流與院內認證內容須由照護團隊確認。

import type { Station } from './types';

const staffQuery = (topic: string) =>
  `請依筆記本中的院內核定文件，整理心衰竭${topic}的執行時點、負責人員、病歷紀錄位置及對應認證條文。請列出來源、版本與頁碼。文件未載明的項目請標示『待確認』。`;

const LOOK_AT_PLAN = '多少變化需要聯絡團隊，請依你的個別出院計畫。';

export const STATIONS: Station[] = [
  // ═══════════════════════ 住院區 ═══════════════════════
  // ───────────────────────── 01 ─────────────────────────
  {
    id: 'admission',
    no: '01',
    zone: 'hospital',
    title: '入院評估花園',
    shortName: '入院',
    subtitle: '入院評估與收案',
    phases: ['admit-day'],
    entryNodeId: 'admission',
    scene: '醫院入口前是一座花園，右側的小亭子是入院評估亭，旁邊有候診座椅。',
    roleTips: {
      patient: '團隊會問你身體的變化。說得越具體，團隊越能幫你。',
      caregiver: '你平常的觀察很重要。陪同時可以補充病友沒注意到的變化，但先讓病友自己說說看。',
      staff: '可先請病友完成「說出喘的情況」，再對照規範卡確認入院評估與收案的紀錄位置。',
    },
    items: [
      { id: 'symptom', title: '說出喘的情況', summary: '說出在做什麼時不舒服、什麼時候開始、和平常有什麼不同。', keywords: ['喘', '呼吸', '活動', '症狀', '爬樓梯'], missionId: 'admission-describe' },
      { id: 'meds-bring', title: '帶來平常的藥', summary: '把藥袋、保健食品帶來或拍照，讓團隊核對。', keywords: ['藥袋', '保健食品', '過敏', '用藥史'] },
      { id: 'first-thing', title: '想先讓團隊知道的事', summary: '睡覺情況、家裡誰照顧、最擔心的事，都可以先說。', keywords: ['擔心', '睡覺', '枕頭', '家人'], missionId: 'admission-first-thing' },
      { id: 'case-manager', title: '認識個案管理師', summary: '個案管理師會從住院一路陪到出院後，是你和家屬的固定聯絡窗口。', keywords: ['個管師', '收案', '窗口'] },
    ],
    missions: [
      {
        id: 'admission-describe',
        title: '說出喘的情況',
        interaction: 'quiz',
        scenario: '入院評估時，團隊問：「最近做什麼事時比較容易喘？」',
        question: '下面哪一種回答，最能讓團隊了解你的狀況？',
        choices: [
          { id: 'vague', label: '最近都還好，有時候會喘。', feedback: '這句話還沒說到「在做什麼」和「什麼時候開始」。試著加上活動、開始時間，以及跟平常有什麼不同。' },
          { id: 'specific', label: '這兩個禮拜開始，爬到二樓就要停下來喘，以前可以一口氣爬上去。', feedback: '說得很清楚！這句話包含了活動（爬到二樓）、開始時間（這兩個禮拜）和跟平常的差別（以前不用停）。' },
          { id: 'defer', label: '我不知道，你問我太太。', feedback: '家屬的觀察很重要，也可以請家屬補充；不過請先試著用自己的話說：做什麼時不舒服、什麼時候開始。' },
          { id: 'strong', label: '喘得很厲害。', feedback: '「很厲害」別人很難比較。請說說是在做什麼的時候喘，例如走多遠、爬幾層樓、洗澡或穿衣服時。' },
        ],
        correctChoiceId: 'specific',
        teachBack: {
          patient: '請用自己的話說一次：「我在做什麼時不舒服，什麼時候開始，和平常有什麼不同。」',
          caregiver: '請先聽病友說一次，再補充一件你觀察到的變化，例如「他最近洗完澡要坐下來休息比較久」。',
        },
      },
      {
        id: 'admission-first-thing',
        title: '想先讓團隊知道的事',
        interaction: 'reflection',
        scenario: '評估快結束時，團隊問：「還有什麼想先讓我們知道的嗎？」',
        question: '你最想先讓團隊知道哪一件事？（沒有標準答案，不計分）',
        choices: [
          { id: 'meds', label: '我平常吃的藥和保健食品', feedback: '可以把藥袋或照片給團隊看，讓團隊核對。' },
          { id: 'sleep', label: '晚上睡覺的情況', feedback: '例如要不要墊高枕頭、半夜會不會醒來。這些對團隊很有幫助。' },
          { id: 'home', label: '家裡誰照顧、白天有沒有人陪', feedback: '照顧安排會影響出院準備，早點說，團隊可以早點幫忙規劃。' },
          { id: 'worry', label: '我最擔心的一件事', feedback: '把擔心說出來，團隊才知道要先說明什麼。' },
        ],
        teachBack: {
          patient: '請對陪同的家屬或醫療人員說一次：「我想先讓你們知道的是……」',
          caregiver: '請問病友：「你最想先讓團隊知道什麼？」再用自己的話說一次你聽到的內容。',
        },
      },
    ],
    staff: {
      topics: ['入院評估：症狀、活動耐受度與功能分級紀錄', '個案管理收案與照護計畫建立', '入院用藥整合（藥物核對）'],
      query: staffQuery('入院評估與個案管理收案'),
    },
  },

  // ───────────────────────── 02 ─────────────────────────
  {
    id: 'ward',
    no: '02',
    zone: 'hospital',
    title: '住院病房',
    shortName: '病房',
    subtitle: '住院期間的照護',
    phases: ['inpatient'],
    entryNodeId: 'ward',
    scene: '病房大樓前有一條散步廊道，護理站的窗口掛著每日紀錄板。',
    roleTips: {
      patient: '住院期間團隊每天看的紀錄，回家後你也要學著自己看。',
      caregiver: '陪病時可以一起看團隊怎麼量、怎麼記，回家就比較容易接手。',
      staff: '可藉由住院期間的每日紀錄，提早帶病友與家屬練習居家自我照護。',
    },
    items: [
      { id: 'daily-weight', title: '住院每日體重', summary: '住院期間每天量體重，幫團隊了解身體水分的變化。', keywords: ['體重', '水分', '水腫', '每日'], missionId: 'ward-weight' },
      { id: 'intake-output', title: '進出量紀錄', summary: '團隊可能請你記錄喝了多少、排了多少，請依護理人員說明。', keywords: ['尿量', '喝水', '輸出入', '水分'] },
      { id: 'meds-learn', title: '認識調整中的藥', summary: '住院時藥物可能會調整，可以請團隊說明每顆藥的用途。', keywords: ['藥物', '調藥', '利尿劑', '心衰竭用藥'] },
      { id: 'rest-move', title: '休息與起身', summary: '依團隊說明逐步增加活動，起身時慢慢來。', keywords: ['下床', '活動', '頭暈', '跌倒'] },
    ],
    missions: [
      {
        id: 'ward-weight',
        title: '為什麼每天量體重',
        interaction: 'quiz',
        scenario: '住院第二天早上，護理師請阿明站上體重計。',
        question: '住院期間每天量體重，最主要是為了什麼？',
        choices: [
          { id: 'water', label: '了解身體水分的變化，協助團隊調整治療', feedback: '對！心衰竭時體重的變化常和身體的水分有關，所以每天量。' },
          { id: 'diet', label: '看看有沒有變胖，好決定要不要減肥', feedback: '這裡量體重的重點不是胖瘦，而是看身體水分的變化。再想一想。' },
          { id: 'rule', label: '醫院規定，沒有特別用途', feedback: '量體重有很重要的用途：幫團隊了解身體水分的變化。' },
        ],
        correctChoiceId: 'water',
        teachBack: {
          patient: '請說一次：「我每天量體重，是為了看身體水分的變化。」',
          caregiver: '請說一次量體重的目的，並說出回家後你可以怎麼提醒病友每天量。',
        },
      },
      {
        id: 'ward-ask-med',
        title: '問清楚調整的藥',
        interaction: 'reflection',
        scenario: '醫師說今天會調整藥物。',
        question: '你最想請團隊說明哪一件事？（不計分）',
        choices: [
          { id: 'why', label: '這顆藥是做什麼用的', feedback: '知道用途，回家比較不會自己停藥。' },
          { id: 'when', label: '什麼時間吃、怎麼吃', feedback: '可以請團隊寫在藥單上，出院時再核對一次。' },
          { id: 'side', label: '吃了可能會有什麼感覺', feedback: '可以請團隊說明哪些感覺要告訴他們。' },
          { id: 'home', label: '回家後要不要繼續吃', feedback: '出院時的藥單會寫清楚，看不懂再問。' },
        ],
        teachBack: {
          patient: '請對護理師說：「我想請你說明＿＿這顆藥的＿＿。」',
          caregiver: '請陪病友一起問一次，並把團隊的說明記在紙上。',
        },
      },
    ],
    staff: {
      topics: ['住院期間每日體重與進出量監測紀錄', '藥物治療調整（指引建議用藥）紀錄', '住院中衛教起始與紀錄'],
      query: staffQuery('住院期間監測、藥物治療調整與衛教起始'),
    },
  },

  // ───────────────────────── 03 ─────────────────────────
  {
    id: 'team',
    no: '03',
    zone: 'hospital',
    title: '跨團隊照護站',
    shortName: '團隊',
    subtitle: '藥師、營養師、復健與社工',
    phases: ['inpatient', 'pre-discharge'],
    entryNodeId: 'team',
    scene: '圓形的團隊會議室外，有藥師、營養師、復健師和社工的四個小窗口。',
    roleTips: {
      patient: '很多專業人員會來找你。記下他們是誰、可以問他們什麼。',
      caregiver: '家屬可以一起參加說明，尤其是飲食、用藥和回家後的照顧安排。',
      staff: '可用本站確認各專業評估是否啟動，以及團隊討論的紀錄方式。',
    },
    items: [
      { id: 'pharmacist', title: '藥師窗口', summary: '說明每顆藥的用途與吃法，協助整理藥單。', keywords: ['藥師', '藥單', '用藥衛教'] },
      { id: 'dietitian', title: '營養師窗口', summary: '依你的情況說明飲食與限鹽方式。', keywords: ['營養師', '飲食', '低鹽', '鹽'] },
      { id: 'rehab', title: '復健窗口', summary: '評估活動能力，建議回家後的活動方式。', keywords: ['復健', '運動', '心臟復健', '活動'] },
      { id: 'social', title: '社工窗口', summary: '了解家庭照顧安排與可用資源。', keywords: ['社工', '長照', '補助', '照顧'] },
    ],
    missions: [
      {
        id: 'team-who',
        title: '這件事要問誰',
        interaction: 'quiz',
        scenario: '女兒想知道回家後煮菜要注意什麼。',
        question: '這個問題最適合先問團隊裡的哪一位？',
        choices: [
          { id: 'dietitian', label: '營養師', feedback: '對！飲食與限鹽的問題可以先問營養師。' },
          { id: 'pharmacist', label: '藥師', feedback: '藥師專長是用藥。煮菜的問題，可以先問負責飲食的營養師。' },
          { id: 'social', label: '社工師', feedback: '社工師協助照顧資源。煮菜的問題，可以先問營養師。' },
        ],
        correctChoiceId: 'dietitian',
        teachBack: {
          patient: '請說出你住院期間見過的一位團隊成員，以及你想再問他的一個問題。',
          caregiver: '請把「飲食問營養師、用藥問藥師、照顧資源問社工」寫在紙上，回家貼在冰箱。',
        },
      },
    ],
    staff: {
      topics: ['跨團隊（醫、護、藥、營養、復健、社工）評估啟動與紀錄', '跨團隊討論會議與紀錄', '心臟復健評估與轉介'],
      query: staffQuery('跨團隊評估、團隊會議與心臟復健轉介'),
    },
  },

  // ───────────────────────── 04 ─────────────────────────
  {
    id: 'discharge-prep',
    no: '04',
    zone: 'hospital',
    title: '出院準備中心',
    shortName: '出院準備',
    subtitle: '回示教與出院計畫',
    phases: ['pre-discharge'],
    entryNodeId: 'discharge-prep',
    scene: '中心裡有一面清單牆，桌上放著體重計、藥盒和照護卡，是出院前練習的地方。',
    roleTips: {
      patient: '出院前把回家要做的事練習一次，不懂的地方現在就問。',
      caregiver: '出院後主要照顧的人，最好一起參加練習。',
      staff: '可對照規範卡確認出院衛教、回示教與出院計畫的紀錄方式。',
    },
    items: [
      { id: 'teachback', title: '回示教', summary: '用自己的話說一次、做一次，確認回家真的會做。', keywords: ['回示教', '衛教', '練習'], missionId: 'prep-teachback' },
      { id: 'plan', title: '個別出院計畫', summary: '寫給你的照護安排：體重、用藥、回診與何時聯絡團隊。', keywords: ['出院計畫', '照護計畫', '個別'] },
      { id: 'caregiver-ready', title: '主要照顧者', summary: '先決定回家後誰主要照顧，請他一起參加出院前的說明。', keywords: ['照顧者', '家屬', '分工'], missionId: 'prep-who' },
    ],
    missions: [
      {
        id: 'prep-teachback',
        title: '回示教的目的',
        interaction: 'quiz',
        scenario: '護理師說：「請你用自己的話，把回家要量體重的方法說一次給我聽。」',
        question: '護理師請你說一次，是為了什麼？',
        choices: [
          { id: 'test', label: '考考我記不記得，答錯會被扣分', feedback: '回示教不是考試，沒有扣分。它是幫團隊確認哪裡說明得還不夠清楚。' },
          { id: 'check', label: '確認我回家真的會做，哪裡不清楚可以馬上補充', feedback: '對！說一次、做一次，團隊就知道哪裡需要再說明。' },
          { id: 'time', label: '打發時間', feedback: '回示教是很重要的出院準備，用來確認回家真的會做。' },
        ],
        correctChoiceId: 'check',
        teachBack: {
          patient: '請挑一件回家要做的事，用自己的話說給護理師或家屬聽。',
          caregiver: '請挑一件回家要做的事，做一次給護理師看，請他告訴你哪裡可以更好。',
        },
      },
      {
        id: 'prep-who',
        title: '回家後誰主要照顧',
        interaction: 'reflection',
        scenario: '出院前，團隊想知道回家後的照顧安排。',
        question: '你們家目前的安排比較像哪一種？（不計分）',
        choices: [
          { id: 'one', label: '有一位家人主要照顧', feedback: '請這位家人一起參加出院前的說明與練習。' },
          { id: 'share', label: '幾位家人輪流', feedback: '可以約好每個人負責哪些事，一起參加說明。' },
          { id: 'self', label: '大部分自己照顧自己', feedback: '可以和團隊討論，哪些事需要有人幫忙或定期關心。' },
          { id: 'unsure', label: '還沒決定', feedback: '沒關係，可以請社工或個管師一起幫忙想。' },
        ],
        teachBack: {
          patient: '請說出：「回家後，＿＿會幫我＿＿。」',
          caregiver: '請說出你負責的照顧工作，以及需要團隊再教你的一件事。',
        },
      },
    ],
    staff: {
      topics: ['出院準備服務與出院計畫', '結構化出院衛教與回示教紀錄', '主要照顧者評估與衛教'],
      query: staffQuery('出院準備服務、出院衛教與回示教'),
    },
  },

  // ───────────────────────── 05 ─────────────────────────
  {
    id: 'discharge',
    no: '05',
    zone: 'hospital',
    title: '出院碼頭',
    shortName: '出院',
    subtitle: '看懂出院資料',
    phases: ['discharge-day'],
    entryNodeId: 'discharge',
    scene: '木頭碼頭旁有一間出院服務小屋，門口擺著行李，告示板上貼著出院文件，橋的另一頭就是居家區。',
    roleTips: {
      patient: '出院前，先知道回診日期、有問題找誰，以及你自己的照護計畫。',
      caregiver: '出院資料常由家屬保管。請陪病友一起找到回診日期和聯絡方式，放在家裡看得到的地方。',
      staff: '可用虛構出院單帶病友與家屬練習，再對照真實出院資料（不上傳網站）。',
    },
    notice: '本網站不需要、也請不要上傳或輸入真實的出院資料。',
    items: [
      { id: 'followup-date', title: '回診日期', summary: '在出院單上找到回診日期與科別，寫在月曆上。', keywords: ['回診', '門診', '日期', '預約'], missionId: 'discharge-followup' },
      { id: 'contact', title: '聯絡方式', summary: '有問題時依出院資料上的聯絡方式詢問團隊。', keywords: ['電話', '聯絡', '個管師', '求助'], missionId: 'discharge-contact' },
      { id: 'my-plan', title: '個別照護計畫', summary: '體重、用藥、何時聯絡團隊，都以這份計畫為準。', keywords: ['照護計畫', '出院計畫'], missionId: 'discharge-plan' },
    ],
    missions: [
      {
        id: 'discharge-followup',
        title: '找出回診日期',
        interaction: 'quiz',
        scenario: '護理師交給你一張出院單（下方是虛構範例）。',
        question: '回診日期寫在哪一欄？',
        prop: {
          kind: 'sheet',
          title: '模擬出院單',
          badge: '虛構範例',
          rows: [
            { key: 'name', label: '姓名', value: '林阿明（虛構）' },
            { key: 'date', label: '出院日期', value: '11 月 10 日' },
            { key: 'followup', label: '回診安排', value: '心臟內科門診　11 月 17 日（星期二）上午' },
            { key: 'contact', label: '有問題時聯絡', value: '心衰竭個案管理師　電話 00-0000-0000（示範號碼）' },
            { key: 'plan', label: '個別照護計畫', value: '每日體重紀錄、藥物清單、何時聯絡團隊——依醫師與個管師說明' },
          ],
        },
        choices: [
          { id: 'date', label: '出院日期', feedback: '這是離開醫院的日期，不是回診。再看看哪一欄寫著「門診」。' },
          { id: 'followup', label: '回診安排', feedback: '找到了！回診是 11 月 17 日上午的心臟內科門診。' },
          { id: 'contact', label: '有問題時聯絡', feedback: '這一欄是聯絡方式。回診日期寫在有「門診」字樣的那一欄。' },
          { id: 'plan', label: '個別照護計畫', feedback: '這一欄是照護安排。回診日期寫在有「門診」字樣的那一欄。' },
        ],
        correctChoiceId: 'followup',
        teachBack: {
          patient: '請指著出院單說一次：「我下次回診是＿月＿日，看＿＿科。」',
          caregiver: '請拿出真實的出院資料（不要上傳到網站），指出回診日期，並說說你打算怎麼提醒自己。',
        },
      },
      {
        id: 'discharge-contact',
        title: '找出聯絡方式',
        interaction: 'quiz',
        scenario: '回家第二天，你對其中一顆藥有疑問。',
        question: '出院單上哪一欄告訴你可以聯絡誰？',
        prop: {
          kind: 'sheet',
          title: '模擬出院單',
          badge: '虛構範例',
          rows: [
            { key: 'followup', label: '回診安排', value: '心臟內科門診　11 月 17 日（星期二）上午' },
            { key: 'contact', label: '有問題時聯絡', value: '心衰竭個案管理師　電話 00-0000-0000（示範號碼）' },
            { key: 'plan', label: '個別照護計畫', value: '每日體重紀錄、藥物清單、何時聯絡團隊——依醫師與個管師說明' },
          ],
        },
        choices: [
          { id: 'followup', label: '回診安排', feedback: '回診還要等幾天。有疑問時，找寫著「聯絡」的那一欄。' },
          { id: 'contact', label: '有問題時聯絡', feedback: '對！有問題時，依出院資料上寫的聯絡方式詢問團隊。' },
          { id: 'internet', label: '上網搜尋一個電話', feedback: '網路上的資訊不一定適合你。請用出院資料上「有問題時聯絡」那一欄的方式。' },
        ],
        correctChoiceId: 'contact',
        teachBack: {
          patient: '請說一次：「我有問題時，要聯絡＿＿，方式是＿＿。」',
          caregiver: '請在真實出院資料上找出聯絡方式，存進手機或貼在電話旁，再說一次你會怎麼聯絡。',
        },
      },
      {
        id: 'discharge-plan',
        title: '找出個別照護計畫',
        interaction: 'quiz',
        scenario: '每個人的照護計畫不一樣。出院單上有一欄是專門寫給你的。',
        question: '哪一欄寫的是你個人的照護安排？',
        choices: [
          { id: 'name', label: '姓名', feedback: '姓名只是確認身分。再找找寫著「計畫」的那一欄。' },
          { id: 'plan', label: '個別照護計畫', feedback: '沒錯！體重怎麼記、藥怎麼吃、什麼時候聯絡團隊，都以這份個別計畫為準。' },
          { id: 'date', label: '出院日期', feedback: '出院日期不是照護安排。再找找寫著「計畫」的那一欄。' },
        ],
        correctChoiceId: 'plan',
        teachBack: {
          patient: '請說出你的個別照護計畫裡，你最需要每天做的一件事。',
          caregiver: '請和病友一起讀一次真實的個別照護計畫，說出家裡誰負責提醒哪一件事。',
        },
      },
    ],
    staff: {
      topics: ['出院醫囑、出院病歷摘要與出院護理摘要', '出院帶藥核對與用藥衛教', '門診預約與出院計畫交付'],
      query: staffQuery('出院當日的出院摘要、藥物核對與回診安排'),
    },
  },

  // ═══════════════════════ 居家區 ═══════════════════════
  // ───────────────────────── 06 ─────────────────────────
  {
    id: 'weight',
    no: '06',
    zone: 'home',
    title: '體重小屋',
    shortName: '體重',
    subtitle: '每日體重紀錄',
    phases: ['first-week', 'long-term'],
    entryNodeId: 'weight',
    scene: '過了橋的第一間小屋就是家。門口放著體重計，牆上掛著照護卡。',
    roleTips: {
      patient: '量體重是每天幫自己看身體變化的方法。這裡的數字全是模擬練習。',
      caregiver: '你可以陪病友建立習慣：一起決定量的時間，把照護卡放在體重計旁邊。',
      staff: '可用模擬照護卡帶練習，再請病友用實體體重計回示教。',
    },
    notice: '本站只使用虛構數字，屬於「模擬練習」。請不要在網站輸入真實體重。',
    items: [
      { id: 'how', title: '量體重三步驟', summary: '量測 → 查看數字 → 寫下紀錄。', keywords: ['量體重', '步驟', '紀錄'], missionId: 'weight-sequence' },
      { id: 'same', title: '每天同一個條件', summary: '差不多同一時間、穿差不多的衣服、用同一台體重計。', keywords: ['時間', '早上', '同一台', '衣服'], missionId: 'weight-consistent' },
      { id: 'card', title: '看懂照護卡', summary: `看出哪一天的數字變化最大。${LOOK_AT_PLAN}`, keywords: ['照護卡', '變化', '增加'], missionId: 'weight-card' },
    ],
    missions: [
      {
        id: 'weight-sequence',
        title: '排出量體重的順序',
        interaction: 'sequence',
        scenario: '早上起床後，要在家量體重並記錄。',
        question: '請依序點選三個步驟。點錯可以按「重新排」。',
        choices: [
          { id: 'write', label: '寫下紀錄', feedback: '把數字寫到照護卡上。' },
          { id: 'measure', label: '站上體重計量測', feedback: '站穩，等數字停下來。' },
          { id: 'read', label: '查看數字', feedback: '看清楚螢幕上的數字。' },
        ],
        correctOrder: ['measure', 'read', 'write'],
        retryHint: '想一想：要先站上去量，數字出來後看清楚，最後才能寫下來。',
        teachBack: {
          patient: '請用實體體重計示範一次，再把數字寫到紙本照護卡上。',
          caregiver: '請陪病友示範一次，觀察他能不能自己看清楚數字、寫在正確的日期欄。',
        },
      },
      {
        id: 'weight-consistent',
        title: '讓每天的數字可以比較',
        interaction: 'quiz',
        scenario: '阿明想知道體重有沒有變化。',
        question: '下面哪一種做法，最能讓每天的數字互相比較？',
        choices: [
          { id: 'random', label: '想到的時候再量', feedback: '每天時間不同，數字會受吃飯、喝水影響。試著固定同一個時間。' },
          { id: 'same', label: '每天差不多同一時間、穿差不多的衣服、用同一台體重計', feedback: '對！條件一樣，數字才有比較的意義。' },
          { id: 'switch', label: '家裡兩台體重計輪流用', feedback: '不同體重計可能有差異。請固定用同一台。' },
        ],
        correctChoiceId: 'same',
        teachBack: {
          patient: '請說出你打算每天在什麼時間、用哪一台體重計量。',
          caregiver: '請和病友約好每天量的時間，並說出你會怎麼提醒他。',
        },
      },
      {
        id: 'weight-card',
        title: '看懂照護卡',
        interaction: 'quiz',
        scenario: '這是一張模擬照護卡，上面是虛構的三天紀錄。',
        question: '哪一天的數字和前幾天差最多？',
        prop: {
          kind: 'sheet',
          title: '模擬照護卡',
          badge: '模擬練習',
          rows: [
            { key: 'd1', label: '第 1 天', value: '62.0 公斤（虛構）' },
            { key: 'd2', label: '第 2 天', value: '62.1 公斤（虛構）' },
            { key: 'd3', label: '第 3 天', value: '63.4 公斤（虛構）' },
          ],
        },
        choices: [
          { id: 'd1', label: '第 1 天', feedback: '第 1 天是起點。比一比後面兩天，哪一天跳得最多？' },
          { id: 'd2', label: '第 2 天', feedback: '第 2 天和第 1 天很接近。再看看第 3 天。' },
          { id: 'd3', label: '第 3 天', feedback: '答對了，第 3 天的變化最大。遇到變化時怎麼處理，請依你的個別出院計畫。' },
        ],
        correctChoiceId: 'd3',
        teachBack: {
          patient: '請在你的紙本照護卡上指出：如果看到數字變化，你的出院計畫寫著要怎麼做。',
          caregiver: '請說出你看到照護卡數字變化時，會先做什麼、聯絡誰（依出院計畫）。',
        },
      },
    ],
  },

  // ───────────────────────── 07 ─────────────────────────
  {
    id: 'medication',
    no: '07',
    zone: 'home',
    title: '用藥小站',
    shortName: '用藥',
    subtitle: '按時吃藥、不自行停藥',
    phases: ['discharge-day', 'first-week', 'long-term'],
    entryNodeId: 'medication',
    scene: '小站的櫃檯上擺著一週分格藥盒、藥袋和一張貼在冰箱上的藥單。',
    roleTips: {
      patient: '心衰竭的藥常要長期吃。覺得好多了，也是藥在幫忙。',
      caregiver: '可以協助整理藥盒、提醒時間，但藥怎麼調整請交給團隊。',
      staff: '可搭配出院藥單，請病友說出每顆藥的用途與時間。',
    },
    items: [
      { id: 'no-stop', title: '不自行停藥', summary: '覺得好轉或有不舒服，都先問團隊，不要自己停藥或改劑量。', keywords: ['停藥', '減藥', '劑量', '副作用'], missionId: 'med-stop' },
      { id: 'pillbox', title: '整理藥盒', summary: '依藥單把藥分好，放在每天看得到的地方。', keywords: ['藥盒', '分藥', '提醒'] },
      { id: 'missed', title: '忘記吃藥時', summary: '依藥袋或藥師說明處理，不要自己把下一次加倍。', keywords: ['忘記', '漏吃', '補吃'], missionId: 'med-missed' },
      { id: 'otc', title: '其他藥與保健食品', summary: '想吃成藥、止痛藥或保健食品前，先問醫師或藥師。', keywords: ['成藥', '止痛藥', '保健食品', '中藥'] },
    ],
    missions: [
      {
        id: 'med-stop',
        title: '覺得好多了可以停藥嗎',
        interaction: 'quiz',
        scenario: '回家兩週，阿明覺得不太喘了，想把其中一顆藥停掉。',
        question: '比較好的做法是哪一個？',
        choices: [
          { id: 'stop', label: '既然不喘了，就自己停掉', feedback: '覺得好轉，常是藥物在發揮作用。請不要自己停藥。' },
          { id: 'ask', label: '繼續照藥單吃，回診或打電話時問團隊', feedback: '對！要不要調整藥物，請交給團隊判斷。' },
          { id: 'half', label: '自己改成吃一半', feedback: '自己改劑量也有風險。請照藥單吃，有疑問先問團隊。' },
        ],
        correctChoiceId: 'ask',
        teachBack: {
          patient: '請說一次：「我不會自己停藥或改劑量，有疑問會先問團隊。」',
          caregiver: '請說出你發現病友想停藥時，會怎麼回應、要聯絡誰。',
        },
      },
      {
        id: 'med-missed',
        title: '忘記吃藥怎麼辦',
        interaction: 'quiz',
        scenario: '晚上整理藥盒時，發現早上的藥忘了吃。',
        question: '比較好的做法是哪一個？',
        choices: [
          { id: 'double', label: '下一次吃兩倍補回來', feedback: '自己加倍可能有風險。請依藥袋或藥師的說明處理。' },
          { id: 'guide', label: '看藥袋說明或問藥師，照說明處理', feedback: '對！每種藥的處理方式不同，依藥袋或藥師說明最安全。' },
          { id: 'ignore', label: '反正一次沒關係，不用理它', feedback: '偶爾忘記也要知道怎麼處理。請看藥袋或問藥師。' },
        ],
        correctChoiceId: 'guide',
        teachBack: {
          patient: '請在你的藥袋上找到「忘記服藥」的說明，或寫下要問藥師的問題。',
          caregiver: '請說出你會用什麼方法提醒病友吃藥（例如藥盒、手機鬧鐘）。',
        },
      },
    ],
  },

  // ───────────────────────── 08 ─────────────────────────
  {
    id: 'diet',
    no: '08',
    zone: 'home',
    title: '低鹽餐桌',
    shortName: '飲食',
    subtitle: '飲食與限鹽',
    phases: ['first-week', 'long-term'],
    entryNodeId: 'diet',
    scene: '廚房小屋外擺著一張餐桌，桌上有新鮮蔬菜、香料，還有一罐被收起來的醬料。',
    roleTips: {
      patient: '從一個小改變開始，例如少沾一點醬料。',
      caregiver: '煮飯的人很關鍵。可以用蔥、薑、蒜、檸檬等增加味道，少用鹽和醬料。',
      staff: '飲食與水分的個別建議請依醫囑與營養師說明。',
    },
    notice: '每個人的限鹽與水分建議不同，請依醫囑與營養師說明。本站不提供個別數字。',
    items: [
      { id: 'hidden-salt', title: '看不見的鹽', summary: '醃漬物、加工食品、泡麵、醬料常含較多鹽。', keywords: ['鹽', '鈉', '醬油', '泡麵', '加工食品'], missionId: 'diet-salt' },
      { id: 'flavor', title: '用天然香料調味', summary: '蔥、薑、蒜、檸檬、香草可以增加風味，少用鹽。', keywords: ['調味', '香料', '煮菜'] },
      { id: 'eat-out', title: '外食小技巧', summary: '湯少喝、醬料另外放、少選醃漬或加工的菜。', keywords: ['外食', '便當', '湯'] },
      { id: 'fluid', title: '喝水量依醫囑', summary: '要不要限制水分、限多少，請依醫師與營養師說明。', keywords: ['喝水', '水分', '限水'] },
    ],
    missions: [
      {
        id: 'diet-salt',
        title: '哪一餐比較少鹽',
        interaction: 'quiz',
        scenario: '女兒在想今天晚餐要準備什麼。',
        question: '下面哪一個選擇通常比較少鹽？',
        choices: [
          { id: 'noodle', label: '泡麵加一包調味粉', feedback: '泡麵的調味粉通常含很多鹽。再想想新鮮食材自己煮的選項。' },
          { id: 'fresh', label: '新鮮魚肉和青菜，用蔥薑蒜調味', feedback: '對！新鮮食材、用天然香料調味，通常比較少鹽。' },
          { id: 'pickle', label: '白飯配醬菜和肉鬆', feedback: '醬菜和肉鬆屬於醃漬、加工食品，通常含較多鹽。' },
        ],
        correctChoiceId: 'fresh',
        teachBack: {
          patient: '請說出你家裡最常吃、可能比較鹹的一樣食物，以及可以怎麼替換。',
          caregiver: '請說出你下次煮飯時，可以少放鹽、改用哪一種天然香料。',
        },
      },
      {
        id: 'diet-first',
        title: '先改一個習慣',
        interaction: 'reflection',
        scenario: '一次改很多很難，先從一件事開始。',
        question: '你最想先改哪一個習慣？（不計分）',
        choices: [
          { id: 'sauce', label: '醬料另外放、少沾一點', feedback: '這是很容易開始的一步。' },
          { id: 'soup', label: '湯少喝一點', feedback: '湯裡常有不少鹽，少喝幾口就有幫助。' },
          { id: 'snack', label: '少吃洋芋片、餅乾等零食', feedback: '可以改成新鮮水果或無調味的點心（依醫囑）。' },
          { id: 'outside', label: '外食時選比較清淡的菜', feedback: '可以先從最常吃的那家店開始調整。' },
        ],
        teachBack: {
          patient: '請說出：「這一週，我要先試著＿＿。」',
          caregiver: '請說出你可以怎麼陪病友一起做到這件事。',
        },
      },
    ],
  },

  // ───────────────────────── 09 ─────────────────────────
  {
    id: 'activity',
    no: '09',
    zone: 'home',
    title: '活動步道',
    shortName: '活動',
    subtitle: '適度活動與休息',
    phases: ['first-week', 'long-term'],
    entryNodeId: 'activity',
    scene: '一條繞著小丘的步道，沿路有休息長椅和里程牌。',
    roleTips: {
      patient: '活動要循序漸進。覺得累了就休息，量力而為。',
      caregiver: '可以陪病友散步，留意他說話時喘不喘、要不要停下來休息。',
      staff: '活動量與心臟復健計畫請依個別評估。',
    },
    items: [
      { id: 'step', title: '循序漸進', summary: '依團隊建議，慢慢增加活動，不要一下子做太多。', keywords: ['運動', '散步', '心臟復健'] },
      { id: 'stop-signs', title: '什麼時候要停下來', summary: '比平常更喘、胸悶、頭暈時，先停下來休息。', keywords: ['停下', '胸悶', '頭暈', '休息'], missionId: 'activity-stop' },
      { id: 'enjoy', title: '想做的活動', summary: '找一件喜歡、做得到的活動，比較容易持續。', keywords: ['興趣', '持續'], missionId: 'activity-want' },
    ],
    missions: [
      {
        id: 'activity-stop',
        title: '散步時不舒服',
        interaction: 'quiz',
        scenario: '阿明和女兒散步，走到一半覺得比平常更喘，還有點胸悶。',
        question: '這時候比較好的做法是哪一個？',
        choices: [
          { id: 'push', label: '咬牙走完，才有運動效果', feedback: '不舒服時硬撐並不安全。請先停下來休息。' },
          { id: 'rest', label: '先停下來坐著休息；若沒有改善，依出院計畫聯絡團隊或求助', feedback: '對！先休息，並依出院計畫判斷要不要聯絡團隊。緊急狀況請撥打 119。' },
          { id: 'faster', label: '加快腳步趕快走回家', feedback: '加快腳步會更吃力。請先停下來休息。' },
        ],
        correctChoiceId: 'rest',
        teachBack: {
          patient: '請說出：「活動時我如果＿＿，就會先停下來休息。」',
          caregiver: '請說出陪散步時你會留意哪些表現，以及需要時要聯絡誰。',
        },
      },
      {
        id: 'activity-want',
        title: '想做的活動',
        interaction: 'reflection',
        scenario: '能持續的活動，通常是自己喜歡、做得到的。',
        question: '你最想慢慢恢復哪一種活動？（不計分）',
        choices: [
          { id: 'walk', label: '在家附近散步', feedback: '可以和團隊討論適合的距離與時間。' },
          { id: 'garden', label: '種花、做家事', feedback: '可以把工作分段，中間休息。' },
          { id: 'friends', label: '和朋友見面、參加活動', feedback: '社交也很重要，可以安排不趕時間的行程。' },
          { id: 'rehab', label: '參加心臟復健課程', feedback: '可以問團隊是否適合、怎麼轉介。' },
        ],
        teachBack: {
          patient: '請說出你想恢復的活動，以及下次想問團隊的一個問題。',
          caregiver: '請說出你可以怎麼陪伴或協助這項活動。',
        },
      },
    ],
  },

  // ───────────────────────── 10 ─────────────────────────
  {
    id: 'warning',
    no: '10',
    zone: 'home',
    title: '警訊燈塔',
    shortName: '警訊',
    subtitle: '描述變化與求助',
    phases: ['first-week', 'long-term'],
    entryNodeId: 'warning',
    scene: '海角上有一座橘白相間的燈塔，旁邊的看守小屋掛著電話標誌和模擬照護聯絡卡。',
    roleTips: {
      patient: '練習把身體的變化說清楚，並找到你出院計畫上寫的求助方式。',
      caregiver: '家屬常是最先發現變化的人。練習觀察、記下來，並陪病友一起打電話說明。',
      staff: '本站不含任何門檻數值；正式版的警訊門檻與分流請由院方核定後再填入。',
    },
    notice: '本站只練習「描述變化」與「找到求助方式」，不判斷真實病情的嚴重程度。正式版的警訊門檻、聯絡方式與緊急分流由院方核定。若有緊急狀況，請依出院計畫處理或撥打 119。',
    items: [
      { id: 'describe', title: '說清楚變化', summary: '說出什麼時候開始、和平常差在哪。', keywords: ['喘', '電話', '描述', '變化'], missionId: 'warning-describe' },
      { id: 'where-help', title: '找到求助方式', summary: '依個別出院計畫和照護聯絡卡上的方式求助。', keywords: ['求助', '聯絡卡', '119', '急診'], missionId: 'warning-contact' },
      { id: 'observe', title: '家屬觀察分工', summary: '喘、睡覺枕頭數、腳踝腫、體重紀錄，約好誰看哪一項。', keywords: ['腳腫', '水腫', '枕頭', '觀察'], missionId: 'warning-observe' },
    ],
    missions: [
      {
        id: 'warning-describe',
        title: '在電話中描述變化',
        interaction: 'quiz',
        scenario: '回家第五天，阿明比平常更喘。家屬也發現他的腳踝變腫了。',
        question: '打電話給團隊時，哪一種說法最清楚？',
        choices: [
          { id: 'clear', label: '從前天開始，他走到巷口就要停下來喘，以前可以走到公園；今天早上我看到兩邊腳踝比平常腫。', feedback: '很清楚！說到了何時開始（前天、今天早上）和跟平常差在哪（以前可以走到公園、腳踝比平常腫）。' },
          { id: 'vague', label: '他好像不太舒服。', feedback: '請補充：從什麼時候開始？做什麼時不舒服？和平常差在哪裡？' },
          { id: 'self-judge', label: '應該沒什麼，等下次回診再說。', feedback: '有變化時不要自己判斷，請依出院計畫上的方式聯絡團隊，並把變化說清楚。' },
          { id: 'only-swelling', label: '腳有點腫。', feedback: '有說到腳腫，很好。再加上「什麼時候開始」以及「喘的情況和平常差在哪」。' },
        ],
        correctChoiceId: 'clear',
        teachBack: {
          patient: '請和家屬角色扮演一次電話對話：你說出「什麼時候開始、和平常差在哪」。',
          caregiver: '請扮演打電話的人，說出你觀察到的變化：何時發生、和平常差在哪。再請病友補充。',
        },
      },
      {
        id: 'warning-contact',
        title: '找到求助方式',
        interaction: 'quiz',
        scenario: '燈塔小屋裡掛著一張模擬照護聯絡卡（虛構範例）。',
        question: '要找求助方式，應該依照哪一個？',
        prop: {
          kind: 'sheet',
          title: '模擬照護聯絡卡',
          badge: '虛構範例',
          rows: [
            { key: 'day', label: '平日白天', value: '依出院計畫上的聯絡方式（示範）' },
            { key: 'night', label: '夜間與假日', value: '依院方說明（正式版由院方填寫）' },
            { key: 'urgent', label: '緊急狀況', value: '依出院計畫指示，或撥打 119' },
          ],
        },
        choices: [
          { id: 'plan', label: '我的個別出院計畫和照護聯絡卡上寫的方式', feedback: '對！每個人的求助方式以自己的出院計畫為準。' },
          { id: 'web', label: '網路上找到的號碼', feedback: '網路上的號碼不一定是你的照護團隊。請找出院計畫或聯絡卡上寫的方式。' },
          { id: 'wait', label: '等下次回診再問', feedback: '有變化時不用等到回診。請依出院計畫或聯絡卡上的方式聯絡。' },
          { id: 'neighbor', label: '問鄰居的經驗', feedback: '別人的情況和你不同。請依你的出院計畫或聯絡卡。' },
        ],
        correctChoiceId: 'plan',
        teachBack: {
          patient: '請在你真實的出院計畫上指出求助方式（不要上傳到網站），並說一次你會怎麼做。',
          caregiver: '請在真實出院計畫上找到求助方式，說出白天、夜間各要怎麼聯絡，並把它放在家人都看得到的地方。',
        },
      },
      {
        id: 'warning-observe',
        title: '家裡的觀察分工',
        interaction: 'reflection',
        scenario: '每個家庭的作息不同，觀察的方式也不同。',
        question: '你最想先練習觀察哪一項？（不計分）',
        choices: [
          { id: 'breath', label: '走路或做事時的喘', feedback: '可以記下「走到哪裡會喘」，下次比較時更清楚。' },
          { id: 'sleep', label: '晚上睡覺的姿勢和枕頭數', feedback: '可以請家人早上問一句：「昨晚睡得好嗎？墊了幾個枕頭？」' },
          { id: 'ankle', label: '腳踝、小腿腫不腫', feedback: '可以留意襪口的痕跡或鞋子是否變緊。' },
          { id: 'card', label: '照護卡上的體重紀錄', feedback: '可以約好每天誰負責看紀錄。' },
        ],
        teachBack: {
          patient: '請告訴家人：「我希望你幫我注意的是……」',
          caregiver: '請說出你每天會在什麼時候、用什麼方式觀察這一項。',
        },
      },
    ],
  },

  // ───────────────────────── 11 ─────────────────────────
  {
    id: 'follow-up',
    no: '11',
    zone: 'home',
    title: '回診車站',
    shortName: '回診',
    subtitle: '回診與電話追蹤',
    phases: ['first-week', 'long-term'],
    entryNodeId: 'follow-up',
    scene: '小車站的月台上有一座大時鐘，候車亭貼著回診月曆，旁邊有一支公共電話。',
    roleTips: {
      patient: '回診時把這段時間的照護卡和想問的問題一起帶去。',
      caregiver: '陪同回診時，可以幫忙記下醫師的說明。',
      staff: '可對照規範卡確認出院後電話追蹤與回診追蹤的紀錄方式。',
    },
    items: [
      { id: 'bring', title: '回診要帶什麼', summary: '健保卡、照護卡、藥袋或藥單，以及寫下的問題。', keywords: ['回診', '健保卡', '藥袋', '問題'], missionId: 'followup-bring' },
      { id: 'phone', title: '出院後電話關懷', summary: '團隊可能會打電話關心，可以先準備照護卡和想問的事。', keywords: ['電話', '追蹤', '電訪', '關懷'], missionId: 'followup-phone' },
      { id: 'questions', title: '寫下想問的問題', summary: '平常想到就寫下來，回診時才不會忘記。', keywords: ['提問', '筆記'] },
    ],
    missions: [
      {
        id: 'followup-bring',
        title: '回診背包',
        interaction: 'quiz',
        scenario: '明天要回診，女兒正在幫阿明準備。',
        question: '哪一組最適合帶去回診？',
        choices: [
          { id: 'full', label: '健保卡、照護卡、藥袋或藥單、寫好的問題', feedback: '對！這些能幫醫師快速了解你回家後的情況。' },
          { id: 'card', label: '只帶健保卡就好', feedback: '健保卡要帶，也別忘了照護卡、藥袋和想問的問題。' },
          { id: 'memory', label: '不用帶，到時候用記的說', feedback: '用記的容易漏掉。請帶照護卡、藥袋和寫好的問題。' },
        ],
        correctChoiceId: 'full',
        teachBack: {
          patient: '請準備一張小紙條，寫下下次回診最想問的一個問題。',
          caregiver: '請說出回診前一天你會幫忙準備哪些東西。',
        },
      },
      {
        id: 'followup-phone',
        title: '接到關懷電話',
        interaction: 'reflection',
        scenario: '出院後幾天，個案管理師打電話來關心。',
        question: '你最想在電話裡先說哪一件事？（不計分）',
        choices: [
          { id: 'weight', label: '這幾天照護卡上的紀錄', feedback: '把照護卡放在電話旁，說起來比較清楚。' },
          { id: 'meds', label: '吃藥的情況或疑問', feedback: '可以把藥袋拿在手邊。' },
          { id: 'feeling', label: '身體的感覺和變化', feedback: '記得說「什麼時候開始、和平常差在哪」。' },
          { id: 'help', label: '照顧上的困難', feedback: '照顧的困難也可以說，團隊可以幫忙找資源。' },
        ],
        teachBack: {
          patient: '請模擬接電話，用三句話說出這幾天的情況。',
          caregiver: '請模擬接電話，說出你觀察到的情況與照顧上的困難。',
        },
      },
    ],
    staff: {
      topics: ['出院後電話訪視與門診追蹤', '出院計畫執行狀況追蹤', '品質指標監測（再住院、急診返診）'],
      query: staffQuery('出院後電話追蹤、門診追蹤與再住院監測'),
    },
  },

  // ───────────────────────── 12 ─────────────────────────
  {
    id: 'long-term-care',
    no: '12',
    zone: 'home',
    title: '長照支援村',
    shortName: '長照',
    subtitle: '回家後的照顧支援',
    phases: ['pre-discharge', 'long-term'],
    entryNodeId: 'long-term-care',
    scene: '村子裡有附坡道的無障礙住宅、交通接送站，還有一把陽傘下的照顧者休息長椅。',
    roleTips: {
      patient: '回家後需要幫忙是很正常的。先想想你最需要哪一項協助。',
      caregiver: '照顧者也需要被照顧。說出家裡的真實情況，團隊才能幫忙找到適合的資源。',
      staff: '實際資源與轉介方式由院方提供；可用本站整理家屬的需求優先順序。',
    },
    items: [
      { id: 'need', title: '最想先處理的需求', summary: '日常照顧、回診交通、照顧者替手或家中環境。', keywords: ['長照', '照顧', '交通', '喘息'], missionId: 'ltc-need' },
      { id: 'explain', title: '說明家裡的情況', summary: '誰在家、家裡環境、工作時間與困難。', keywords: ['家裡', '樓梯', '浴室', '上班'], missionId: 'ltc-explain' },
      { id: 'carer-rest', title: '照顧者也要休息', summary: '照顧者累了也可以說，替手與喘息服務可以詢問團隊。', keywords: ['照顧者', '喘息', '累'] },
    ],
    missions: [
      {
        id: 'ltc-need',
        title: '最想先處理的需求',
        interaction: 'reflection',
        scenario: '阿明回家後走動需要人扶，女兒白天要上班。',
        question: '你最想先處理哪一項？（沒有標準答案，不計分）',
        choices: [
          { id: 'daily', label: '日常照顧（洗澡、移動、吃飯）', feedback: '可以先說明哪些事需要人幫忙、一天大約幾次。' },
          { id: 'transport', label: '回診交通', feedback: '可以先說明回診要去哪裡、家裡有沒有人可以接送。' },
          { id: 'respite', label: '照顧者替手、喘口氣', feedback: '照顧者的休息很重要。可以說明你一週哪些時段最需要人替手。' },
          { id: 'home', label: '家中環境（扶手、浴室、樓梯）', feedback: '可以先拍下家裡的樓梯或浴室，跟團隊討論。' },
          { id: 'unsure', label: '還不確定', feedback: '沒關係。可以先告訴團隊家裡的作息，請他們一起幫忙想。' },
        ],
        teachBack: {
          patient: '請說出：「我們最需要的協助是＿＿，想先跟＿＿談。」',
          caregiver: '請說出：「我們家最需要＿＿，想先跟＿＿談。家裡的情況是……」',
        },
      },
      {
        id: 'ltc-explain',
        title: '怎麼說明家裡的情況',
        interaction: 'reflection',
        scenario: '下次和團隊討論時，想把家裡的情況說清楚。',
        question: '你想先說明哪一件事？（不計分）',
        choices: [
          { id: 'who', label: '白天、晚上分別誰在家', feedback: '照顧人力的時段，是安排協助時最重要的資訊之一。' },
          { id: 'stairs', label: '家裡的樓梯和浴室', feedback: '可以說明住幾樓、有沒有電梯、浴室有沒有門檻。' },
          { id: 'work', label: '照顧者的工作時間', feedback: '說出上班時段，團隊比較好討論替手的安排。' },
          { id: 'cost', label: '費用或請假的困難', feedback: '這些困難也可以說，團隊或社工可以幫忙想辦法。' },
        ],
        teachBack: {
          patient: '請用三句話說明家裡的情況：誰在家、家裡的環境、最需要的幫忙。',
          caregiver: '請用三句話說明家裡的情況，再問病友：「我這樣說對嗎？有沒有要補充？」',
        },
      },
    ],
  },

  // ───────────────────────── 13 ─────────────────────────
  {
    id: 'palliative',
    no: '13',
    zone: 'home',
    title: '安心照護花園',
    shortName: '安心',
    subtitle: '安寧緩和與照護目標',
    phases: ['inpatient', 'long-term'],
    entryNodeId: 'palliative',
    scene: '安靜的庭院裡有一座涼棚，下面擺著兩張面對面的椅子和一張小桌子，旁邊有一個小水盆。',
    roleTips: {
      patient: '這裡沒有對錯。說出你在意的事，讓家人和團隊更了解你。',
      caregiver: '這一站請多聽少說。聽完後，用自己的話說一次你聽到的，再請病友確認。',
      staff: '內容用於開啟照護目標對話；住院期間也可從這一站開始。',
    },
    items: [
      { id: 'care-goal', title: '我在意的事', summary: '減輕不舒服、和家人相處、希望誰參與討論。', keywords: ['安寧', '緩和', '照護目標', '預立醫療'], missionId: 'palliative-talk' },
      { id: 'anytime', title: '想法可以改變', summary: '可以分好幾次慢慢談，也可以先說「等我準備好」。', keywords: ['ACP', '預立', '討論'] },
    ],
    missions: [
      {
        id: 'palliative-talk',
        title: '最想談的一件事',
        interaction: 'reflection',
        scenario: '午後的庭院很安靜，家人陪你坐在涼棚下。',
        question: '你最想跟家人或團隊談的是哪一件事？（不計分）',
        choices: [
          { id: 'comfort', label: '減輕不舒服', feedback: '可以說說哪一種不舒服最困擾你，例如喘、睡不好或疲倦。' },
          { id: 'time', label: '保留和家人交談的時間', feedback: '可以說說你希望和誰、多常、在哪裡相處。' },
          { id: 'who', label: '希望誰參與討論', feedback: '可以說說你希望誰一起聽、一起決定。' },
          { id: 'future', label: '想了解接下來可能的變化', feedback: '可以請醫師用你聽得懂的方式說明。' },
          { id: 'not-yet', label: '現在還不想談', feedback: '沒關係。可以先告訴家人「等我準備好再說」。' },
        ],
        conversationCard: '我想和家人、醫師談的事',
        teachBack: {
          patient: '請說出你在意的一件事。接著請家屬用自己的話說一次，最後由你確認：「對，就是這樣。」',
          caregiver: '請先聽病友說。然後用自己的話回述：「你在意的是……，對嗎？」再請病友確認或修正。',
        },
      },
    ],
    staff: {
      topics: ['家庭會議與醫病共享決策（SDM）', '安寧共同照護評估與會診', '照護團隊角色分工與家屬支持'],
      query: staffQuery('照護目標討論、安寧緩和評估與轉介'),
    },
  },

  // ───────────────────────── 14 ─────────────────────────
  {
    id: 'advanced-hf',
    no: '14',
    zone: 'home',
    title: '進階心衰醫療港',
    shortName: '進階',
    subtitle: '人工心臟與心臟移植',
    phases: ['inpatient', 'long-term'],
    entryNodeId: 'advanced-hf',
    scene: '港邊有兩座展館：藍色的是左心室輔助器（LVAD）館，粉紅色的是心臟移植館，中間有連廊相通。',
    roleTips: {
      patient: '先認識，再提問。這裡不需要決定任何事。',
      caregiver: '進階治療需要家人一起準備。想想你可以分擔哪些照顧工作，以及想問團隊什麼。',
      staff: '可從住院期間進入；實際裝置操作由團隊用實機教學。',
    },
    pickMission: { prompt: '請先選擇要進入的展館：' },
    items: [
      { id: 'lvad', title: '左心室輔助器館', summary: '用示意圖認識控制器、電池與導線。', keywords: ['LVAD', '人工心臟', '左心室輔助器', '電池'], missionId: 'advanced-lvad' },
      { id: 'transplant', title: '心臟移植館', summary: '評估、等候、術後生活三個階段。', keywords: ['移植', '心臟移植', '等候'], missionId: 'advanced-transplant' },
    ],
    missions: [
      {
        id: 'advanced-lvad',
        title: '左心室輔助器（LVAD）館',
        interaction: 'reflection',
        scenario: '展館牆上有一張示意圖，說明左心室輔助器在身體外面的三個部分。',
        question: '你最想請團隊實際示範哪一項？（不計分）',
        prop: { kind: 'lvad' },
        choices: [
          { id: 'controller', label: '控制器：看懂顯示與提示聲', feedback: '可以請團隊用實機示範每一種提示代表的意思。' },
          { id: 'battery', label: '電池：充電與更換', feedback: '可以請團隊示範換電池的步驟，並讓家屬也練習一次。' },
          { id: 'driveline', label: '導線：出口處的照護', feedback: '可以請團隊示範如何保護導線、照顧出口處的皮膚。' },
          { id: 'daily', label: '洗澡、睡覺和外出時怎麼帶著裝置', feedback: '可以請團隊分享日常生活的安排方式。' },
        ],
        teachBack: {
          patient: '請說出：你目前對左心室輔助器的理解、家屬需要準備的一件事，以及下次最想問的問題。',
          caregiver: '請說出：你目前的理解、你可以分擔的一件事，以及下次最想問團隊的問題。',
        },
      },
      {
        id: 'advanced-transplant',
        title: '心臟移植館',
        interaction: 'reflection',
        scenario: '展館裡有三張情境卡，說明心臟移植常見的三個階段。',
        question: '讀完後，你下次最想做哪一件事？（不計分）',
        prop: {
          kind: 'stages',
          items: [
            { title: '評估', text: '團隊會做一系列檢查與會談，了解身體狀況、家庭支持與生活安排。' },
            { title: '等候', text: '等候期間持續回診、維持身體狀況，並和家人保持聯繫方式暢通。' },
            { title: '術後生活', text: '需要長期服藥、定期回診與追蹤，家人的陪伴與分工很重要。' },
          ],
        },
        choices: [
          { id: 'ask-eval', label: '問團隊：評估包含哪些檢查與會談？', feedback: '把問題寫下來，下次回診帶去。' },
          { id: 'ask-wait', label: '問團隊：等候期間要注意什麼？', feedback: '把問題寫下來，下次回診帶去。' },
          { id: 'ask-after', label: '問團隊：術後生活會有哪些改變？', feedback: '把問題寫下來，下次回診帶去。' },
          { id: 'family', label: '和家屬討論照顧分工', feedback: '可以先列出誰能陪回診、誰能協助用藥提醒。' },
        ],
        teachBack: {
          patient: '請說出：你目前對心臟移植的理解、家屬需要準備的一件事，以及下次最想問的問題。',
          caregiver: '請說出：你目前的理解、家裡可以怎麼分工，以及下次最想問團隊的問題。',
        },
      },
    ],
    staff: {
      topics: ['高危險群病人定義與照護規範', '左心室輔助器與心臟移植評估轉介', '個管師／移植協調師的辨識、衛教與追蹤'],
      query: staffQuery('進階心衰竭評估、左心室輔助器與心臟移植轉介及衛教'),
    },
  },
];
