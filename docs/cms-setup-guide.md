# Decap CMS 設定指南

Ren's Life Journal 已預留 `/admin` 入口與 `config.yml`。完成 OAuth 後即可在瀏覽器新增／編輯文章、上傳封面。

---

## 已建立的檔案

| 檔案 | 用途 |
|------|------|
| `public/admin/index.html` | Decap CMS 入口 |
| `public/admin/config.yml` | 後台設定（articles collection） |
| `public/images/uploads/` | CMS 上傳圖片預設目錄 |

**第一版 CMS 範圍：僅管理文章與圖片。**  
`siteProfile.ts`、`siteCopy.ts`、`externalLinks.ts` 仍請在 Cursor 編輯（或日後再加 collection）。

---

## OAuth 方案比較（Vercel 部署）

| 方案 | 說明 | 適合度 |
|------|------|--------|
| **A. Netlify Identity + Git Gateway** | 同 repo 在 Netlify 開 Identity；Vercel 仍可作對外站 | 中 — 需多一個 Netlify site |
| **B. DecapBridge** | 託管 OAuth，設定最少 | **推薦** — 全 Vercel、個人站 |
| **C. 自架 GitHub OAuth** | Vercel serverless / Railway 跑 callback | 中 — 需維護 |
| **D. GitHub 網頁編輯** | 直接在 GitHub 改 `.md` | 過渡用，無 `/admin` UI |

### 建議：方案 B（DecapBridge）

理由：你已用 **GitHub + Vercel**，不想自架後端；DecapBridge 專為 Decap + GitHub + 靜態部署設計，設定比 Netlify 雙平台省事。

官網：https://decapbridge.com/

---

## 方案 B：DecapBridge 設定步驟（概要）

1. 至 DecapBridge 註冊並連接 GitHub repo `blueworld102-cmd/ren-life-journal`
2. 取得 `base_url` 與 OAuth 設定
3. 編輯 `public/admin/config.yml`：

```yaml
backend:
  name: github
  repo: blueworld102-cmd/ren-life-journal
  branch: main
  base_url: https://YOUR_DECAPBRIDGE_URL
  auth_endpoint: auth
```

4. Commit → push → 開啟 `https://ren-life-journal.vercel.app/admin`
5. 用 GitHub 登入授權

---

## 方案 A：Netlify Identity（替代）

1. Netlify 新建 site，連接同一 GitHub repo
2. 啟用 Identity（Invite only）+ Git Gateway
3. 改 `config.yml`：

```yaml
backend:
  name: git-gateway
  branch: main
```

4. `/admin` 在 Vercel 上需確保 `public/admin/` 有被部署

---

## 方案 D：暫時不用 CMS

在 GitHub 編輯：

- 文章：`src/content/articles/{slug}.md`
- 封面：`public/images/posts/{slug}/cover.png`
- Push 後 Vercel 自動部署

或使用 `npm run new:article` 在本機建立草稿。

---

## 文章欄位（與 content schema 對齊）

- title, description, pubDate, updatedDate, draft
- category, tags, location, weather, mood, readingTime
- cover, coverPosition, body (markdown)

**draft: true** 的文章不會出現在首頁、RSS、文章列表（已於 `getPublishedArticles` 過濾）。

---

## 圖片上傳路徑

| 用途 | 路徑 |
|------|------|
| CMS 預設上傳 | `public/images/uploads/` → `/images/uploads/...` |
| 建議文章封面 | 手動改為 `/images/posts/{slug}/cover.png` |
| 內文配圖 | `public/images/posts/{slug}/01.png` |

---

## 本地預覽 CMS（可選）

```bash
npx decap-server
```

並在 `config.yml` 暫時加入 `local_backend: true`（**勿 commit 到 production**）。

---

## 安全提醒

- `/admin` 已設 `noindex`，且不在 sitemap
- 僅邀請信任的 GitHub 帳號有 repo write 權限
- 不要將 OAuth secret commit 進 repo

---

*相關：[`cms-decision.md`](./cms-decision.md) · [`decap-cms-implementation-plan.md`](./decap-cms-implementation-plan.md)*
