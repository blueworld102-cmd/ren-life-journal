# Decap CMS 最小可用版實作計畫

最後更新：內容管理與互動功能 P0 階段

**狀態：規劃文件 — 待站長確認後再實作。**

本文件描述如何以最小改動為 Ren's Life Journal 加入 Decap CMS（`/admin`），讓站長能在網頁上新增文章、上傳圖片、標記 draft。

---

## 1. 目標

- 在 `/admin` 用表單編輯 `src/content/articles/*.md`
- 上傳封面與內文圖片到 `public/images/`
- 儲存即 commit 到 GitHub `main`
- Vercel 自動 build 部署
- `draft: true` 的文章不出現在首頁、RSS、sitemap

---

## 2. 需要新增的檔案

| 檔案 | 用途 |
|------|------|
| `public/admin/index.html` | Decap CMS 入口（載入 `decap-cms` script） |
| `public/admin/config.yml` | Collection、欄位、backend、media 設定 |
| `public/images/uploads/.gitkeep` | 上傳資料夾占位（若採集中 uploads） |

### 可選後續檔案

| 檔案 | 用途 |
|------|------|
| `public/_redirects` 或 Vercel rewrite | 確保 `/admin` SPA 路由正常 |
| `netlify.toml` | 若使用 Netlify Identity + Git Gateway |
| `docs/decap-setup-checklist.md` | 站長逐步設定紀錄 |

### 不需改動的部分（初期）
- 首頁版面與元件
- `src/content.config.ts` schema（Decap 欄位對齊即可）
- Astro build 流程

---

## 3. GitHub OAuth / Decap Backend 設定

Decap 需要一個能「代表你 commit 到 GitHub」的 backend。常見兩種路線：

### 路線 A：Netlify Identity + Git Gateway（Decap 官方最常見）

適合：repo 同時部署在 Netlify，或願意用 Netlify 只做 auth gateway。

1. 在 [Netlify](https://www.netlify.com/) 建立 site，連接同一 GitHub repo
2. 啟用 **Identity** → **Registration preferences** 設為 Invite only
3. 啟用 **Git Gateway**
4. `config.yml` 使用：
   ```yaml
   backend:
     name: git-gateway
     branch: main
   ```
5. 在 Netlify 邀請站長 email 為使用者
6. Vercel 仍可作主要對外部署；Netlify 僅負責 `/admin` auth（或整站改 Netlify）

**注意：** Vercel 本身不提供 Git Gateway，若堅持 Vercel 部署，需走路線 B。

### 路線 B：GitHub OAuth + 自建 / 第三方 backend（適合 Vercel 部署）

1. 在 GitHub → Settings → Developer settings → OAuth Apps 建立 App
   - Homepage URL: `https://ren-life-journal.vercel.app`
   - Callback URL: `https://api.netlify.com/auth/done`（若用 netlify-cms-github-backend）或自架 callback
2. 使用社群方案之一：
   - [decapbridge](https://decapbridge.com/)（託管 backend）
   - 自架 [netlify-cms-github-oauth-provider](https://github.com/vencax/netlify-cms-github-oauth-provider) 於 Vercel serverless / Railway
3. `config.yml` 範例：
   ```yaml
   backend:
     name: github
     repo: blueworld102-cmd/ren-life-journal
     branch: main
     base_url: https://YOUR_OAUTH_HOST
     auth_endpoint: auth
   ```

### 建議
- **若希望最少折騰：** 評估 DecapBridge 或短期用 Netlify 作 auth host
- **若堅持全 Vercel：** 需額外一個 OAuth callback 服務（可之後再建）

---

## 4. `public/admin/index.html`（概念）

```html
<!DOCTYPE html>
<html lang="zh-Hant">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>Ren's Life Journal · Admin</title>
  </head>
  <body>
    <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
  </body>
</html>
```

---

## 5. 文章 Collection 欄位

必須與 `src/content.config.ts` 的 `articles` schema 對齊：

| 欄位 | widget | 說明 |
|------|--------|------|
| `title` | string | 文章標題 |
| `description` | text | 摘要 / SEO description |
| `pubDate` | datetime | 發布日期 |
| `updatedDate` | datetime | 選填，更新日期 |
| `draft` | boolean | `true` 時不發布 |
| `category` | select | 見下方 enum |
| `tags` | list | 字串陣列 |
| `location` | string | 例：東京・澀谷 |
| `weather` | string | 例：雨 |
| `mood` | string | 例：緊張但有一點安心 |
| `readingTime` | string | 例：閱讀 6 分鐘 |
| `cover` | image | 封面路徑 |
| `coverPosition` | string | 例：center |
| `body` | markdown | 正文 |

### category 選項（與 schema 一致）
- 日本生活
- 日本生活手續
- 打工度假
- 東京散步
- 旅遊紀錄
- 省錢生活
- 工作與職涯
- 心情筆記

### config.yml collection 概念片段

```yaml
collections:
  - name: articles
    label: 文章
    label_singular: 文章
    folder: src/content/articles
    create: true
    slug: '{{slug}}'
    extension: md
    format: frontmatter
    fields:
      - { label: 標題, name: title, widget: string }
      - { label: 摘要, name: description, widget: text }
      - { label: 發布日期, name: pubDate, widget: datetime }
      - { label: 更新日期, name: updatedDate, widget: datetime, required: false }
      - { label: 草稿, name: draft, widget: boolean, default: false }
      - label: 分類
        name: category
        widget: select
        options: [日本生活, 日本生活手續, 打工度假, 東京散步, 旅遊紀錄, 省錢生活, 工作與職涯, 心情筆記]
      - { label: 標籤, name: tags, widget: list }
      - { label: 地點, name: location, widget: string, required: false }
      - { label: 天氣, name: weather, widget: string, required: false }
      - { label: 心情, name: mood, widget: string, required: false }
      - { label: 閱讀時間, name: readingTime, widget: string, required: false }
      - { label: 封面, name: cover, widget: image, required: false }
      - { label: 封面位置, name: coverPosition, widget: string, default: center, required: false }
      - { label: 正文, name: body, widget: markdown }
```

---

## 6. 圖片上傳位置策略

### 選項 A：集中 uploads（較簡單）

```yaml
media_folder: public/images/uploads
public_folder: /images/uploads
```

- 優點：Decap 預設行為，設定最少
- 缺點：檔名雜湊，不利按文章整理

### 選項 B：依 slug 分資料夾（較整潔，進階）

需自訂 `media_folder` 或使用 editorial workflow + 手動搬移。

建議 **第一版用選項 A**；封面可手動改路徑為 `/images/posts/{slug}/cover.png`。

### 選項 C：文章內圖片慣例（與 CONTENT_GUIDE 一致）

站長上傳後，將檔案移至：
```
public/images/posts/{article-slug}/01.png
public/images/posts/{article-slug}/02.png
```

Markdown 內引用：
```md
![說明文字](/images/posts/{article-slug}/01.png)
```

---

## 7. Draft 不出現在首頁 / RSS / sitemap

### 目前已具備
- `getPublishedArticles()` 已過濾 `draft: true`
- 首頁 Latest、Journal、`/japan` 皆使用此函式

### 實作 CMS 後需確認
| 出口 | 檢查方式 |
|------|----------|
| 首頁 Latest | `index.astro` 使用 `getPublishedArticles` |
| RSS | `src/pages/rss.xml.ts` 需過濾 draft |
| Sitemap | Astro 預設含所有頁面；draft 文章若仍生成靜態頁，可考慮 build 時排除或加 `noindex` |

### 建議補強（實作 CMS 時一併做）
1. 確認 `rss.xml.ts` 過濾 draft
2. Draft 文章頁加 `noindex` meta（若仍生成路由）
3. 或在 `getStaticPaths` 排除 draft（需改 `[...slug].astro`）

---

## 8. CMS 完成後的操作流程

### 新增文章
1. 開啟 `https://ren-life-journal.vercel.app/admin`
2. GitHub 登入授權
3. 文章 → New 文章
4. 填寫欄位、上傳封面
5. `draft: true` 先儲存預覽
6. 確認無誤後改 `draft: false` → Publish
7. 等待 Vercel 部署（約 1～3 分鐘）

### 上傳照片
1. 在文章編輯器的 Cover 或 Markdown 圖片欄位上傳
2. 或本地放入 `public/images/posts/{slug}/` 後在 Markdown 引用
3. Photo Wall 仍須手動更新 `src/data/photos.ts`（第二階段可再加 collection）

### 編輯既有文章
1. `/admin` → 選擇文章
2. 修改 → Save
3. GitHub 產生 commit → Vercel 自動部署

---

## 9. 實作前檢查清單（站長確認）

- [ ] 決定 backend 路線（Netlify Git Gateway / DecapBridge / 自建 OAuth）
- [ ] 確認 GitHub repo 權限僅站長可寫入
- [ ] 確認 Vercel 連接 `main` branch 自動部署
- [ ] 同意 `/admin` 設 `noindex`（不進 sitemap）
- [ ] 確認 category enum 不需短期內變更
- [ ] 第一版是否只需「文章」collection（照片牆稍後）

---

## 10. 預估改動範圍（實作階段）

| 類型 | 檔案數 | 風險 |
|------|--------|------|
| 新增 admin 檔案 | 2～3 | 低 |
| RSS / draft 過濾 | 1 | 低 |
| sitemap / slug 排除 draft | 1 | 低 |
| 文件更新 | 2 | 低 |
| **首頁與設計** | 0 | — |

---

**請站長確認本計畫後，再進行 `/admin` 實作與 OAuth 設定。**

*相關：[`cms-decision.md`](./cms-decision.md) · [`CONTENT_GUIDE.md`](../CONTENT_GUIDE.md) · [`src/content.config.ts`](../src/content.config.ts)*
