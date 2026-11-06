# 心衰照護島（原型）

從入院到出院、再回到家的心衰竭照護旅程。由 14 座 3D 低多邊形六角形小島組成（Three.js），可以手機直向操作，也可以由醫護人員在床邊、出院準備、門診或家屬會談時陪同使用。

**住院區（入院到出院，醫護人員可查看規範）**
01 入院評估花園 → 02 住院病房 → 03 跨團隊照護站 → 04 出院準備中心 → 05 出院碼頭

**居家區（出院後的居家衛教與照護，病友與家屬）**
06 體重小屋 → 07 用藥小站 → 08 低鹽餐桌 → 09 活動步道 → 10 警訊燈塔 → 11 回診車站 → 12 長照支援村 → 13 安心照護花園 → 14 進階心衰醫療港

- **小建築＝照護重點**：每座島上有 1–4 間編號小屋，點開看說明，可直接練習相關題目
- **照護串聯線（🔗）**：把住院時學的事連到回家後怎麼做，例如「住院量體重 → 回家繼續量」
- **清單與搜尋（🔍）**：輸入「腳腫」「藥盒」「低鹽」等俗稱，直接找到照護重點
- **時間（🕒）**：入院當天 → 住院期間 → 出院前 → 出院當天 → 返家第一週 → 長期照護，可在地圖上標示該階段的站點
- **三種角色**：病友、家屬（提示著重陪同、觀察與溝通）、醫護人員（住院區直接打開醫護規範卡，示教同時顯示病友版與家屬版）
- **巡島小人偶「心心」**：依 01→14 的順序巡島
- 每題流程：看情境 → 做選擇 → 看回饋 → 說一次或做一次 → 自填「已練習／稍後再練」

> 正式臨床上線前，衛教文案、警訊分流、院內認證內容與分享權限須由照護團隊確認。

## 安裝與啟動

需要 Node.js 20 以上。

```bash
npm ci            # 依 package-lock.json 安裝鎖定版本
npm run dev       # 開發模式，瀏覽器開 http://localhost:5173
npm run build     # 型別檢查＋建置到 dist/
npm run preview   # 預覽建置結果
```

手機測試：電腦和手機連同一個 Wi‑Fi，執行 `npm run dev` 後，用手機開終端機顯示的 Network 網址。

## 測試

```bash
npm test               # 單元測試：內容驗證、最短路徑、改目的地、進度儲存與重置
npm run build
npm run check:bundle   # 確認 dist/ 沒有 NotebookLM 或院內連結
npm run test:e2e       # 瀏覽器端到端驗證（需要電腦已安裝 Chrome，可用 CHROME_PATH 指定）
```

## 修改衛教文字

文字都放在 `src/content/`，不需要修改場景程式：

- `stations.ts`：14 站的情境、照護重點、題目、示教、醫護規範卡。每站一個區塊，可一站一站改。
- `links.ts`：照護串聯線（`CARE_LINKS`）與時間軸的照護階段（`PHASES`）。

在 `stations.ts` 裡：

- 修改情境、題目、選項、回饋、示教：直接改字串。
- `items`：島上的小建築（照護重點），每站 1–4 項。`keywords` 寫俗稱可以讓搜尋更好找；`missionId` 指向本站的練習題。
- `phases`：本站出現在時間軸的哪些階段。
- `roleTips`：病友、家屬、醫護人員三種進站提示。
- 知識題（`interaction: 'quiz'`）必須有 `correctChoiceId`，且要對得上某個選項的 `id`。
- 排序題（`'sequence'`）必須有 `correctOrder`（每個選項剛好出現一次）和 `retryHint`。
- 照護偏好題（`'reflection'`）不能有正確答案。不計分，也不儲存使用者選了什麼。
- `teachBack.patient` 和 `teachBack.caregiver` 分別是病友版和家屬版的示教文字。
- `staff.topics` 和 `staff.query` 是醫護規範卡的查核主題與 NotebookLM 查詢文字。住院區每站必填；居家區視需要（目前 11 回診車站、13、14 有）。
- 新增串聯線時，`from`／`to` 的 `item` 要對應某站 `items` 的 `id`。

存檔後重新整理頁面。格式寫錯時，畫面上方會顯示錯誤原因（`src/content/validate.ts`），`npm test` 也會失敗。

## 修改站點座標與步道

全部放在 `src/game/mapData.ts`：

- `TILES`：每座六角島的中心座標、區域、主建築素材與縮放。
- `TILE_LINKS`：哪兩座島之間有小橋。步道節點和連線會依此自動產生，不會穿過建築。
- `ITEM_SLOTS`：小建築在島上的位置。
- `HEX`：島的大小與厚度；`ZONE_HEIGHT`：住院區、居家區的島頂高度（形成高低差）。
- `ISLAND_BOUNDS`：按「全景」時要放進畫面的範圍。
- `START_NODE`：角色出發點（醫院主樓大門）。

網址加上 `?debug=1`（例如 `http://localhost:5173/?debug=1`）會顯示節點、連線和點選範圍，方便調整位置。

## 更換外觀與素材

- **建築與島上物件**：全部是程式產生的 3D 低多邊形模型，在 `src/game/models.ts`。每一站對應 `STATION_MODELS` 裡的一個函式，可以改顏色、大小、位置，或用 `house()`、`tree()`、`signPost()` 等積木增加物件。
- **招牌圖示**（愛心、病床、藥丸、時鐘、電話等）：在 `models.ts` 的 `iconTexture()` 用程式畫成，不需要圖檔。
- **角色與心心**：`public/assets/` 的 `avatar-patient.svg`、`avatar-caregiver.svg`、`avatar-staff.svg`、`mascot.svg`。角色精靈表每格 40×56，共 4 列（下、左、右、上）× 3 欄（站立、走路 1、走路 2）。可用同尺寸的圖檔替換，或修改 `scripts/gen-assets.mjs` 後執行 `npm run assets` 重新產生。
- **效能**：每座島的靜態物件會自動合併成一個網格，約 230 次繪製呼叫，手機也能流暢顯示。

## 隱私與儲存

- 只用 localStorage 儲存：角色、上次停留站點，以及每站「已探索」和已練習的任務 ID。
- 不儲存病歷、真實體重、姓名，也不儲存照護偏好題的選項或自由輸入內容（網站沒有自由輸入欄）。
- 裝置無法儲存時（例如隱私模式）仍可遊玩，只是重新整理後不保留。
- 「⋯ → 重置探索狀態」會清除這台裝置上的所有紀錄。
- 「已練習」是使用者自己勾選的，不代表醫療人員已確認示教能力。

## 醫護規範卡與 NotebookLM

住院區每一站（以及 11、13、14 站）的「醫護規範」分頁都有：

- 本站相關查核主題（建議方向，須對照院內核定文件）
- 查核欄位：評估時點、負責角色、病歷紀錄位置、對應認證條文、佐證位置、文件版本。未查核的項目一律顯示「待確認」
- 「開啟疾病認證筆記本」按鈕，以及「複製認證查詢文字」按鈕

**連結與內部資料不放在病友端。** 前端程式、公開設定與 `dist/` 只有占位值（`npm run check:bundle` 會檢查）。實際做法有兩種：

1. **建議做法：院內獨立工作頁。** 放在已有院內登入保護的系統裡，病友端維持預設設定。工作卡只顯示版型與查詢文字，按鈕標示「由院方在受保護環境設定」。
2. **同一網站的 /staff（參考實作 `staff-server/`）。** 由這座島的伺服器決定誰能看：
   ```bash
   cp staff-server/data/cards.example.json staff-server/data/cards.json   # 或使用已整理好的 cards.json（勿提交版本庫）
   node staff-server/users.mjs add nurse01 心衰個管師    # 新增人員，會印出一次性初始密碼
   node staff-server/users.mjs list                      # 查看名單
   node staff-server/users.mjs disable nurse01           # 離職或調動時停用
   VITE_STAFF_API_BASE=/staff/api npm run build
   COOKIE_SECURE=1 npm run staff-server
   ```
   - 名單存在 `staff-server/data/users.json`，只存密碼雜湊。新增或停用人員不用重啟伺服器。
   - 每次登入（成功或失敗）都記在 `staff-server/data/access.log`。
   - 未登入呼叫 `/staff/api/cards` 會回 401；開 `/staff` 會被導向登入頁；停用的帳號無法登入。
   - 這是示範用的帳號機制，**正式上線請改接院內 SSO**，並由資訊室審核 HTTPS、帳號與稽核紀錄。

   **注意：島上的名單只管「誰看得到連結」。** 筆記本本身能不能打開，仍由 NotebookLM 的分享設定決定。所以筆記本要維持「受限」，只邀請名單上的人（見下方）。

### NotebookLM 分享設定

- 個人 Google 帳號的筆記本，無法設成「只限院內網域」。請維持「受限」，在「分享」裡逐一輸入同仁的 Google 帳號 Email 邀請；同時用 `users.mjs` 把同一批人加進島上的名單。
- 不要選「知道連結的任何人都能存取」，否則連結被轉傳就會外流。
- 若醫院有 Google Workspace 帳號，可改用院內帳號建立筆記本，分享時就能限定院內網域。
- 院內文件放在個人雲端帳號前，請先確認符合院方資訊安全規範。

此版本只用「開啟連結」和「複製查詢文字」，不使用 NotebookLM API。正式認證內容以院內核定文件為準。

## 部署

`npm run build` 後，把 `dist/` 放到任何靜態網站主機。部署在子路徑時：`BASE_PATH=/hf-island/ npm run build`。

## 程式結構

```
src/
  main.ts                 啟動遊戲、掛載介面、拖曳／點擊區分、工具列
  game/IslandScene.ts     3D 場景：島、海面、光影、相機、點擊命中、串聯線、階段高亮、小船、巡島小人偶
  game/models.ts          3D 低多邊形建築與物件
  game/avatar.ts          角色外觀、四方向與走路動畫
  game/navigation.ts      步道路網、最短路徑、取消與抵達事件
  game/mapData.ts         座標資料
  content/types.ts        內容型別（可辨識聯集）
  content/stations.ts     14 站內容
  content/links.ts        照護串聯線與照護階段
  content/search.ts       關鍵字搜尋
  content/validate.ts     執行期資料驗證
  ui/missionDialog.ts     任務視窗、回饋與鍵盤操作
  ui/stationList.ts       清單、搜尋與探索狀態
  ui/timeline.ts          照護時間軸
  ui/staffCard.ts         醫護規範卡
  ui/modal.ts             共用對話框（焦點鎖定、Esc、焦點返回）
  staff/staffApi.ts       工作卡資料（僅在登入後由伺服器提供）
  state/progress.ts       裝置端探索狀態與重置
  styles.css
public/assets/            角色與心心的原創精靈圖（SVG）
staff-server/             醫療人員工作頁參考伺服器（需登入）
scripts/                  素材產生、bundle 檢查、端到端測試
tests/                    單元測試
```

## 尚未實測的項目

- 實體 iPhone／Android 手機與平板（目前用桌機 Chrome 模擬 320px 和 390px 寬的觸控螢幕）
- 螢幕閱讀器實際朗讀（VoiceOver、TalkBack、NVDA）。目前只檢查了 ARIA 結構、焦點移動與鍵盤操作
- 雙指縮放（目前用縮放按鈕和滑鼠滾輪）
- 3D 畫面在中低階手機上的流暢度（目前只在桌機 Chrome 以軟體繪圖測試）
- 新增站點（02、03、04、07、08、09、11）的衛教文案尚未經臨床審閱
- 真實的 NotebookLM 筆記本連結與院內 SSO
- 長者與家屬的可用性測試、衛教文案的臨床審閱
