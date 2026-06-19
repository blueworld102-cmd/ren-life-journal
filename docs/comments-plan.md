# 留言區方案評估（comments-plan）

最後更新：內容管理與互動功能 P0 階段

**狀態：規劃文件 — 正式實作前需站長完成 GitHub 設定。**

本文件評估文章頁留言區方案，並說明 giscus 實作前站長需手動完成的步驟。

---

## 需求

- 文章頁底部有留言區
- 不自建大型後端
- 與 Astro 靜態站相容
- 可 Moderation（審核、刪除不當留言）

---

## 方案 A：giscus（推薦）

### 運作方式
- 使用 [GitHub Discussions](https://docs.github.com/en/discussions) 作為留言儲存
- [giscus](https://giscus.app/) 將 Discussion 嵌入文章頁
- 每篇文章對應一個 Discussion 或依 `pathname` 對應

### 優點
| 項目 | 說明 |
|------|------|
| 零資料庫 | 不需 Supabase / 自架 API |
| 靜態站友善 | 僅嵌入 `<script>`，build 不變 |
| Moderation | 在 GitHub Discussions 管理、鎖帖、刪除 |
| 免費 | 個人 repo 即可 |
| 與 Git 生態一致 | 站長已在用 GitHub |

### 缺點
| 項目 | 說明 |
|------|------|
| 需 GitHub 帳號 | 訪客留言須登入 GitHub（可設定允許匿名？— giscus 不支援完全匿名） |
| 設定步驟 | 需開 Discussions、安裝 giscus App |
| 樣式 | 需 CSS 微調以貼合日系淡色主題 |
| 非即時社群 | 不像 IG 留言區直覺 |

### 適合目前階段的原因
- 文章量小、讀者以認識站長的人為主
- 不需 spam 過濾資料表
- 與 Decap CMS（同用 GitHub）路線一致

---

## 方案 B：自架留言（Supabase）

### 運作方式
- Supabase 資料表儲存留言
- Astro 頁面用 client JS 或 API route 讀寫

### 優點
- 訪客不需 GitHub 帳號（可做成 email / 暱稱）
- 完全自訂 UI 與欄位

### 缺點
| 項目 | 說明 |
|------|------|
| 資料表設計 | comments 表、article_id、parent_id |
| API | 需 serverless function 或 Supabase RLS |
| Spam | 需 rate limit、CAPTCHA、審核佇列 |
| 維運 | 備份、濫用、GDPR 等 |
| 偏離靜態 | 增加 runtime 依賴 |

### 結論
**現階段過重。** 等留言量大、需要匿名留言或進階審核時再評估。

---

## 方案比較

| 維度 | giscus | Supabase 自架 |
|------|--------|---------------|
| 設定時間 | 約 30 分鐘 | 數天 |
| 月費 | 免費 | 免費額度後可能收費 |
| 訪客門檻 | 需 GitHub | 可較低 |
| Moderation | GitHub UI | 需自建 |
| 與靜態站 | 佳 | 中 |

---

## 最終建議

> **目前優先 giscus，在文章頁底部加入留言區。**

實作時機：站長完成下方 GitHub 設定後，再新增 `Comments.astro` 元件嵌入文章模板。

---

## 正式實作前：站長需在 GitHub 完成的設定

### 1. 開啟 GitHub Discussions
1. 前往 https://github.com/blueworld102-cmd/ren-life-journal
2. **Settings** → **General**
3. 捲到 **Features** → 勾選 **Discussions**
4. 建立一個 Category，建議命名：
   - **Announcements**（giscus 預設需要，可保留）
   - **Article Comments**（給文章留言用，或直接用 General）

### 2. 安裝 giscus GitHub App
1. 前往 https://github.com/apps/giscus
2. 點 **Install**
3. 選擇 **Only select repositories** → `ren-life-journal`
4. 授權完成

### 3. 在 giscus.app 產生設定
1. 前往 https://giscus.app/zh-TW
2. 填入：
   - Repository: `blueworld102-cmd/ren-life-journal`
   - Discussion category: 選 **Article Comments**（或你建立的類別）
   - Page ↔ Discussions mapping: **pathname**（每個 URL 一則討論）
   - Theme: 選 `noborder_light` 或 `preferred_color_scheme`，之後可自訂
3. 複製產生的 `<script>` 區塊中的：
   - `data-repo`
   - `data-repo-id`
   - `data-category`
   - `data-category-id`
   - `data-mapping`
   - `data-lang`（建議 `zh-TW`）

### 4. 將設定交給開發（或存入環境變數）

建議之後用環境變數（Vercel）：
```
PUBLIC_GISCUS_REPO=blueworld102-cmd/ren-life-journal
PUBLIC_GISCUS_REPO_ID=（從 giscus.app 取得）
PUBLIC_GISCUS_CATEGORY=Article Comments
PUBLIC_GISCUS_CATEGORY_ID=（從 giscus.app 取得）
```

本地 `.env` 不 commit；Vercel Dashboard 設定 Production 環境變數。

### 5. Moderation 建議
- 在 Discussions 設定中啟用 moderation（若可用）
- 定期檢查 **Article Comments** category
- 可將 repo 設為私人討論僅限登入者（giscus 仍會顯示）

---

## 實作階段預覽（待確認後執行）

### 新增檔案
- `src/components/Comments.astro` — 嵌入 giscus script
- 可選 `src/data/giscus.ts` — 集中設定

### 修改檔案
- `src/pages/articles/[...slug].astro` — 文章底部引入 `<Comments />`
- `astro.config.mjs` sitemap filter — 無需改（留言非獨立頁）

### 樣式
- 外層加 `.comments-section`，上边框與 `--color-border` 一致
- 標題：「留言」或「討論」
- `prefers-color-scheme` 與網站米色主題協調

### 不需改動
- 首頁
- CMS 流程

---

## 常見問題

**Q: 訪客沒有 GitHub 怎麼辦？**  
A: giscus 目前需 GitHub 登入。若這是主要痛點，未來再評估 Cusdis、Utterances 或 Supabase。

**Q: 留言會影響 build 速度嗎？**  
A: 不會。giscus 在瀏覽器端載入。

**Q: 草稿文章會有留言嗎？**  
A: 實作時可對 `draft` 文章隱藏 Comments 元件。

---

**請站長完成「GitHub 設定」章節後告知，再進行 `Comments.astro` 實作。**

*相關：[`cms-decision.md`](./cms-decision.md)*
