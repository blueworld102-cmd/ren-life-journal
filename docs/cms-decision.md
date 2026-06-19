# CMS 方案決策（cms-decision）

最後更新：內容管理與互動功能 P0 階段

本文件評估 Ren's Life Journal 在「站長要在網頁上新增／編輯文章、上傳照片」需求下的 CMS 路線，並給出**現階段結論**。

---

## 背景與痛點

| 痛點 | 說明 |
|------|------|
| 無網頁後台 | 目前需 Cursor / 編輯器改 Markdown |
| 圖片需手動放資料夾 | `public/images/posts/{slug}/` |
| 非技術協作困難 | 未來若有人協助寫作，Git 門檻高 |
| 留言尚未實作 | 需另選方案（見 `comments-plan.md`） |

網站本質仍是 **Astro 靜態站**：Markdown → build → Vercel。任何 CMS 都應維持此流程。

---

## 方案 A：Decap CMS（推薦，現階段優先）

### 運作方式
- 瀏覽器開啟 `/admin`
- 表單編輯 Markdown frontmatter + 正文
- 圖片上傳 commit 到 GitHub `public/images/`
- Push 觸發 Vercel 自動部署

### 優點
| 項目 | 說明 |
|------|------|
| 與現有架構一致 | 文章仍在 `src/content/articles/` |
| SEO 不變 | 靜態 HTML，無 runtime API |
| 版本控制 | Git 歷史保留每次修改 |
| 圖片可控 | 圖片在 repo 內，非外部 URL |
| 適合個人站長 | 文章量 10～50 篇階段最省力 |

### 缺點
| 項目 | 說明 |
|------|------|
| 初次設定 | GitHub OAuth、Netlify Identity 或自建 backend |
| 欄位需對齊 | 必須與 `src/content.config.ts` schema 一致 |
| 照片牆 | `src/data/photos.ts` 需另設 collection 或暫時手動 |
| MDX 元件 | 複雜 MDX 不適合所見即所得 |

### 適合目前階段的原因
- 已有 GitHub + Vercel 部署鏈
- 文章格式已穩定（content collection）
- 不需要即時發布或會員系統
- 站長可在一個 `/admin` 入口完成寫作與上傳

---

## 方案 B：Notion API

### 運作方式
- 在 Notion 資料庫寫文章
- Build 時透過 API 拉取並轉成 Markdown

### 優點
- 寫作體驗好，適合草稿與構思
- 非技術使用者熟悉 Notion

### 缺點
| 項目 | 說明 |
|------|------|
| 圖片 URL | Notion 託管 URL 可能過期，需同步到 `public/` |
| Build 複雜度 | 每次 build 打 API，失敗風險、速度變慢 |
| Schema 同步 | category / tags 雙向維護 |
| 留言 | 無法取代留言系統 |
| 離線 build | 需網路與 token，CI 設定較脆弱 |

### 結論
**暫緩。** 可作為個人草稿庫，由站長手動或 script 同步到 repo，不作為主要 CMS。

---

## 方案 C：Supabase / Directus / Strapi

### 運作方式
- 自架或雲端資料庫 + Admin UI
- 前端 build 時 fetch 或 runtime API

### 優點
- 完整後台、留言、會員、訂閱、統計皆可擴展
- 權限與審核流程完整

### 缺點
| 項目 | 說明 |
|------|------|
| 複雜度 | 資料表、API、auth、spam 防護 |
| 成本 | 託管、維運時間 |
| 偏離靜態優勢 | 需處理快取、安全、備份 |
| 過早 | 目前 5 篇文章、單一作者 |

### 結論
**現階段過重。** 等留言、會員、訂閱等需求明確後再評估。

---

## 方案比較總表

| 維度 | Decap CMS | Notion API | Supabase / Headless |
|------|-----------|------------|---------------------|
| 設定難度 | 中 | 中高 | 高 |
| 與 Astro 靜態站 | 佳 | 中 | 需額外設計 |
| 圖片管理 | 佳（Git） | 差（需同步） | 佳 |
| 留言 | 需另接 giscus | 不適用 | 可自建 |
| 適合文章量 | 10～100 | 草稿為主 | 100+ / 多人 |
| 維運負擔 | 低 | 中 | 高 |

---

## 最終決策

> **目前優先做 Decap CMS，不先接 Notion，不自架大型後端。**

### 執行順序建議
1. 閱讀並確認 [`decap-cms-implementation-plan.md`](./decap-cms-implementation-plan.md)
2. 站長完成 GitHub OAuth / backend 設定
3. 小步實作 `/admin`（待確認後進行）
4. 留言區接 giscus（見 `comments-plan.md`）
5. 正式圖片逐步替換（見 `image-production-plan.md`）

### 暫緩項目
- Notion 即時同步
- Supabase / Directus / Strapi
- 站內搜尋後端化
- 會員登入

---

*相關：[`cms-roadmap.md`](./cms-roadmap.md) · [`decap-cms-implementation-plan.md`](./decap-cms-implementation-plan.md) · [`CONTENT_GUIDE.md`](../CONTENT_GUIDE.md)*
