# CMS / 後台編輯路線說明

本文件說明 Ren's Life Journal 目前內容管理方式，以及未來若要「像後台一樣」編輯文章與上傳照片時的推薦路線。

**現階段不實作 CMS**，僅作為決策參考。

---

## 1. 目前網站架構

本網站是 **Astro 靜態網站**：

- 文章來源：`src/content/articles/` 的 **Markdown / MDX**
- 欄位驗證：`src/content.config.ts`（content collection schema）
- 照片牆：`src/data/photos.ts` + `public/images/photos/`
- 建置輸出：靜態 HTML（`npm run build` → `dist/`）

沒有 Node 後端、沒有資料庫、沒有即時 API。

---

## 2. GitHub 的角色

GitHub 在本專案中是：

- **版本控制**（追蹤文章與圖片變更）
- **部署觸發**（push 到 main → Vercel / Netlify 自動 build）

GitHub **不是**後台 CMS。你不能在 GitHub 網頁上像 WordPress 一樣所見即所得編輯整站。

實際寫作仍建議在 **Cursor** 或本地編輯器完成。

---

## 3. 現階段建議流程（推薦維持）

```
1. 在 Cursor 中新增 / 修改 Markdown
      src/content/articles/your-slug.md

2. 圖片放到
      public/images/posts/{slug}/
      public/images/covers/（封面）
      public/images/photos/（照片牆）

3. 本地預覽
      npm run dev
      npm run dev:host（手機實機）

4. git commit → push 到 GitHub

5. Vercel / Netlify 自動部署
```

詳見專案根目錄 [`CONTENT_GUIDE.md`](../CONTENT_GUIDE.md)。

---

## 4. 未來若要後台編輯：推薦 Decap CMS 或 Keystatic

若希望有網頁後台、可上傳圖片、仍輸出 Markdown，可考慮以下兩種方案。**現階段不實作**。

### Decap CMS（前身 Netlify CMS）

適合：

- Markdown 為主要內容格式
- GitHub 作為儲存後端
- Netlify / Git Gateway 處理 OAuth
- 需要 `/admin` 傳統後台介面

詳見下方第 5–7 節。

### Keystatic

適合：

- Git-based CMS，與 Astro 專案整合良好
- 可在本地編輯器或 Keystatic Cloud 編輯
- 欄位定義以 TypeScript / config 描述，對齊 content collection schema
- 不一定需要 Netlify Git Gateway，設定路徑可能較 Decap 直覺

兩者皆維持 Markdown 檔在 repo 內，build 與 SEO 流程不變。選擇時可評估：是否需要瀏覽器 `/admin`（偏 Decap）、是否已在 Astro 生態且偏好型別安全設定（偏 Keystatic）。

---

## 5. Decap CMS 需要什麼

### 基礎條件

| 項目 | 說明 |
|------|------|
| GitHub repo | 文章與圖片 commit 回同一 repo |
| 部署平台 | Vercel / Netlify，需支援 OAuth 或 Git Gateway |
| Admin 入口 | `public/admin/index.html` |
| 設定檔 | `public/admin/config.yml` |

### 建議 config 片段（概念）

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: public/images/uploads
public_folder: /images/uploads

collections:
  - name: articles
    label: Articles
    folder: src/content/articles
    create: true
    slug: '{{slug}}'
    fields:
      - { label: Title, name: title, widget: string }
      - { label: Description, name: description, widget: text }
      - { label: Publish Date, name: pubDate, widget: datetime }
      - { label: Category, name: category, widget: select, options: [...] }
      - { label: Tags, name: tags, widget: list }
      - { label: Cover, name: cover, widget: image }
      - { label: Draft, name: draft, widget: boolean, default: false }
      - { label: Body, name: body, widget: markdown }
```

`collections` 欄位需與 `src/content.config.ts` 的 schema **完全一致**。

### 圖片路徑策略

Decap 預設上傳到 `public/images/uploads/`。若要保持現有慣例（`public/images/posts/{slug}/`），需在 workflow 或命名規則上另行約定，或接受 uploads 集中資料夾。

---

## 6. Decap CMS 優點

- 可在 `/admin` 用表單編輯文章
- 支援圖片上傳與 Markdown 正文
- 仍使用 Markdown 檔，SEO / build 流程不變
- 適合 Astro content collection
- 多人協作時有 Git 版本紀錄

---

## 7. Decap CMS 缺點

- **初期設定較麻煩**：OAuth、Git Gateway、Vercel/Netlify 權限
- 需要 **登入與 GitHub 權限** 管理
- 圖片路徑、category enum、欄位規則需先穩定，否則後台容易填錯
- 不適合極複雜的 MDX 元件編輯
- 照片牆（`photos.ts`）需另外設 collection 或維持手動編輯

---

## 8. 為什麼現在不建議接 Notion

| 議題 | 說明 |
|------|------|
| API 複雜度 | Notion block → Markdown 轉換需維護 |
| 圖片時效 | Notion 圖片 URL 可能過期，需同步到 `public/images/` |
| Build 時間 | 每次 build 打 API，失敗風險與速度問題 |
| Schema 對齊 | category / tags 需與 Notion DB 雙向同步 |
| 過早優化 | 目前文章量與流程用 Markdown + Cursor 已足夠 |

若未來真的要用 Notion，建議作為「草稿來源」而非即時 CMS，並在 CI 用 script 同步到 `src/content/articles/`。

---

## 9. 建議導入 CMS 的時機

滿足以下條件再考慮 Decap CMS、Keystatic 或其他 Git-based CMS：

- [ ] 文章超過 **10～20 篇**，手動維護開始吃力
- [ ] 圖片命名、路徑、frontmatter 規則已固定（見 CONTENT_GUIDE）
- [ ] 網站已完成 **Vercel / Netlify 部署**且穩定運作
- [ ] 真的需要 **不用 Cursor 也能更新**（非技術協作者、手機上快速改字）
- [ ] `src/data/siteProfile.ts`、`siteCopy.ts`、`externalLinks.ts` 等資料層已穩定

在此之前，**Cursor + Markdown + `npm run new:article` + Git + Vercel** 是最省事的組合。

---

## 10. 相關文件

| 文件 | 用途 |
|------|------|
| [`CONTENT_GUIDE.md`](../CONTENT_GUIDE.md) | 現階段內容管理 |
| [`docs/mobile-preview-guide.md`](./mobile-preview-guide.md) | 手機實機預覽 |
| [`src/content.config.ts`](../src/content.config.ts) | 文章 schema（Decap 需對齊） |

---

*最後更新：Content Admin Foundation 階段 — 尚未實作 CMS*
