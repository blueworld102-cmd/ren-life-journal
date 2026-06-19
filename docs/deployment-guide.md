# GitHub + Vercel 部署指南

本文件說明如何將 Ren's Life Journal 推到 GitHub，並在 Vercel 上正式部署。

---

## 1. 推到 GitHub

### 前置確認

- [ ] `npm run build` 本地通過
- [ ] 無 `.env` 被 commit（已在 `.gitignore`）
- [ ] `node_modules/`、`dist/`、`.astro/` 不會進 repo
- [ ] `package-lock.json` 有保留（npm 專案建議 commit）

### 步驟

```bash
# 若尚未初始化 git
git init

git add .
git commit -m "Prepare Ren's Life Journal for deployment"

# 在 GitHub 建立新 repository（不要勾選 README，避免衝突）
git remote add origin https://github.com/YOUR_USERNAME/ren-life-journal.git
git branch -M main
git push -u origin main
```

> 若 repo 已存在，確認 `main` 分支 push 成功即可。

---

## 2. 在 Vercel Import Repository

1. 登入 [vercel.com](https://vercel.com)
2. **Add New → Project**
3. 選擇剛 push 的 GitHub repository
4. Framework 通常會自動偵測為 **Astro**

### Vercel 建議設定

| 項目 | 值 |
|------|-----|
| **Framework Preset** | Astro |
| **Install Command** | `npm install` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Node.js Version** | **22.x**（`package.json` → `engines.node`: `>=22.12.0`） |

5. 點 **Deploy**，等待 build 完成

### 若 Vercel 給的 URL 不是預期網址

預設專案網址目前設定為：

`https://ren-life-journal.vercel.app`

若 Vercel 實際給的是其他 subdomain（例如 `japan-wh-blog.vercel.app`），請同步更新以下三處，再重新 deploy：

1. `astro.config.mjs` → `site`
2. `src/consts.ts` → `SITE_URL`
3. `public/robots.txt` → `Sitemap` 行

或在 Vercel Project Settings → Domains 將自訂 subdomain 設為 `ren-life-journal.vercel.app`（若可用）。

---

## 3. 部署後要檢查的網址

以 `https://ren-life-journal.vercel.app` 為例（請替換成你的實際 domain）：

| 路徑 | 檢查重點 |
|------|----------|
| `/` | 首頁正常、Hero / Latest / About Preview |
| `/articles` | 文章列表、搜尋 |
| `/articles/shibuya-ward-office-rainy-day/` | 單篇文章、cover、OG |
| `/photos` | 照片牆 |
| `/about` | About 文案、無空外部連結 |
| `/404` 或任意不存在路徑 | 404 頁 |
| `/robots.txt` | Sitemap URL 正確 |
| `/rss.xml` | RSS 可讀、絕對 URL |
| `/sitemap-index.xml` | sitemap 可讀 |

完整驗收清單見 [`prelaunch-checklist.md`](./prelaunch-checklist.md) 的「Vercel 部署後驗收」章節。

---

## 4. 綁定正式 Domain 時要改的地方

假設正式 domain 為 `https://www.ren-life-journal.com`：

| 檔案 | 欄位 |
|------|------|
| `astro.config.mjs` | `site: 'https://www.ren-life-journal.com'` |
| `src/consts.ts` | `SITE_URL` |
| `public/robots.txt` | `Sitemap: https://www.ren-life-journal.com/sitemap-index.xml` |

然後：

1. 在 Vercel → **Settings → Domains** 新增 domain
2. 依 Vercel 指示設定 DNS（A / CNAME）
3. 等待 HTTPS 憑證生效
4. `git commit` → push → 自動 redeploy
5. 用下方 OG 工具重新抓取快取

---

## 5. OG 分享預覽測試

部署完成後，建議測試社群分享預覽是否正確。

### 測試對象

1. **首頁** — `https://ren-life-journal.vercel.app/`
2. **第一篇文章** — `https://ren-life-journal.vercel.app/articles/shibuya-ward-office-rainy-day/`

### 要檢查的 meta 標籤

在瀏覽器開發者工具 → Elements → `<head>`，或 View Source：

**首頁（`og:type` = website）**

- `og:title`
- `og:description`
- `og:image`（應為絕對 URL，例如 `https://ren-life-journal.vercel.app/images/...`）
- `og:url`（canonical 首頁 URL）
- `twitter:card`（應為 `summary_large_image`）

**文章頁（`og:type` = article）**

- 以上 OG 欄位
- `article:published_time`
- `article:tag`（若有 tags）
- `article:modified_time`（若有 `updatedDate`）

### 線上 Debugger（建議）

社群平台會快取 OG 圖，更新後若沒變，請用 debugger **重新抓取**：

| 平台 | 工具 |
|------|------|
| Facebook / Messenger | [Sharing Debugger](https://developers.facebook.com/tools/debug/) |
| X (Twitter) | [Card Validator](https://cards-dev.twitter.com/validator)（或平台現行工具） |
| LinkedIn | [Post Inspector](https://www.linkedin.com/post-inspector/) |

輸入完整 URL → **Scrape Again / Refresh** → 確認預覽圖與標題正確。

> **注意：** 若 `og:image` 指向的圖片檔案在 `public/` 不存在，debugger 會顯示破圖。請確認 cover 與預設 OG 圖路徑有實際檔案。

---

## 6. 環境變數

目前專案**不需要** `.env` 即可 build 與部署。

若未來接 CMS 或 API，再在 Vercel → **Settings → Environment Variables** 新增，且勿 commit `.env` 到 GitHub。

---

## 7. 相關文件

| 文件 | 用途 |
|------|------|
| [`vercel-post-deploy-checklist.md`](./vercel-post-deploy-checklist.md) | **部署後逐頁驗收**（可勾選 A–L 全流程） |
| [`prelaunch-checklist.md`](./prelaunch-checklist.md) | 上線前 SEO / 圖片資產檢查 |
| [`CONTENT_GUIDE.md`](../CONTENT_GUIDE.md) | 內容維護 |
| [`mobile-preview-guide.md`](./mobile-preview-guide.md) | 手機實機預覽 |

---

*最後更新：GitHub + Vercel 部署前驗收階段*
