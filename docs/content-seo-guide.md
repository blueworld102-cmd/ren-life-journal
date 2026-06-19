# 內容與 SEO 策略指南

本文件說明 tag / category 使用方式、影音策略、瀏覽數與留言區決策。供長期寫作與 SEO 規劃參考。

---

## Category 與 Tag 頁面（現況）

目前**沒有**獨立的 `/tags/{slug}` 或 `/categories/{slug}` 靜態頁。

站內使用 query 參數篩選：

- 分類：`/articles?category=心情筆記`
- 標籤：透過 `/articles?search=區役所`（搜尋文字包含 tag）
- 主題：`/articles?topic=japan`

這對目前文章量（約 5 篇）已足夠。未來文章變多後，可考慮建立：

- `/categories/{slug}`
- `/tags/{slug}`

並在 sitemap 納入這些列表頁。

---

## Tag 使用原則

### 1. 主要用途

Tag 用於**站內分類、內部連結與搜尋**，不是堆關鍵字的地方。讀者點 tag 應能找到真正相關的文章群。

### 2. 不要濫用

- 每篇 **3～6 個** tag 即可
- 避免與 `category` 完全重複（category 已表達主軸）
- 避免一篇塞 10+ 個 tag

### 3. 要具體

好的 tag 範例：

- 區役所、健保、年金、住民稅
- 原宿、澀谷、面試、履歷
- 生活費、超市、自炊、雨天

### 4. 避免太泛

盡量不要每篇都放：

- 日本、東京、生活、日常、打工度假（若 category 已是「打工度假」）

這些詞太寬，對讀者篩選幫助不大，也稀釋 tag 頁的價值（未來若做 tag 頁會更明顯）。

### 5. 與搜尋的關係

`src/utils/articles.ts` 的 `buildSearchText` 會把 tags 併入搜尋文字。具體 tag 同時改善 Journal 頁即時搜尋體驗。

---

## Category 使用原則

Category 為**單選 enum**（見 `src/content.config.ts`），目前可用：

- 日本生活、日本生活手續、打工度假、東京散步、旅遊紀錄、省錢生活、工作與職涯、心情筆記

每篇文章選**一個**最貼近的主分類。Start Here 三條路線也是依 category 導流。

---

## 影音策略

### 現階段（不做 /videos 頁）

- **不要**現在建立空的 `/videos` 專區
- YouTube 已在 `src/data/externalLinks.ts` 預留，啟用方式：
  - `href` 填入頻道或播放清單 URL
  - `isActive: true`
- 啟用後顯示於 **About 頁**與 **Footer**（文字連結，非 icon 牆）

### 文章內嵌影片

可在 Markdown 正文嵌入 YouTube（iframe 或連結），適合：

- 散步 vlog 補充
- 口語日文練習
- 生活紀錄短片

### 未來何時做 /videos

建議累積 **3～5 支**有系列感的影片後，再規劃：

- `/videos` 列表頁
- 每支影片對應一篇說明文章或固定 embed 規則

---

## 瀏覽數策略

### 初期建議：不公開顯示

- 新站公開「12 次瀏覽」反而降低信任感
- 靜態站沒有內建瀏覽計數，要公開需額外服務

### 私下追蹤（擇一）

| 工具 | 特點 |
|------|------|
| [Vercel Analytics](https://vercel.com/docs/analytics) | 與部署同平台，設定簡單 |
| Google Analytics | 功能完整，需注意 cookie / 隱私政策 |
| [Plausible](https://plausible.io/) | 輕量、隱私友善 |
| [Umami](https://umami.is/) | 可自架 |

### 若未來要公開瀏覽數

需要後端、第三方 API，或 build 時寫入統計 — 建議等流量穩定再評估。

---

## 留言區策略

### 初期建議：不加入

原因：

- 垃圾留言與審核成本
- 第三方留言 widget 影響載入速度
- 隱私與 GDPR 告知義務
- 個人生活誌更需要「安靜閱讀」氛圍

### 互動替代方案

- **Threads / Instagram** — 在 `externalLinks.ts` 啟用，作為主要互動入口
- 文章文末可寫：「如果想交流，歡迎到 IG 留言」

### 未來若需要留言

可評估 GitHub 系、免後端方案：

- [Giscus](https://giscus.app/)（GitHub Discussions）
- [Utterances](https://utterances.client.js.org/)（GitHub Issues）

需接受：讀者要有 GitHub 帳號，或改用其他託管方案。

---

## SEO 寫作提醒（簡表）

| 項目 | 建議 |
|------|------|
| `title` | 具體、可獨立理解，含地點或情境 |
| `description` | 40～80 字，一句話摘要 |
| `cover` | 使用真實 PNG/JPG，路徑存在於 `public/` |
| 內鏈 | 相關文章互相連結 |
| 發布 | `draft: false` 後才會進 RSS / sitemap |

---

## 相關文件

| 文件 | 用途 |
|------|------|
| [`editorial-plan.md`](./editorial-plan.md) | 第一批文章選題 |
| [`link-checklist.md`](./link-checklist.md) | 連結 QA |
| [`CONTENT_GUIDE.md`](../CONTENT_GUIDE.md) | 技術操作 |
| [`deployment-guide.md`](./deployment-guide.md) | 部署與 OG 測試 |

---

*最後更新：站長操作入口與內容策略階段*
