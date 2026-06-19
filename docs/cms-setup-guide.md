# Decap CMS 設定指南

Ren's Life Journal 已預留 `/admin` 靜態入口與 `config.yml`。**目前 scaffold 已完成，但尚未完成 OAuth，因此無法登入寫作。**

---

## 為什麼 `/admin` 還不能登入？

Decap CMS 需要一個 **GitHub OAuth backend** 才能代表你 commit 到 repo。

目前 `public/admin/config.yml` 的 backend 為：

```yaml
backend:
  name: github
  repo: blueworld102-cmd/ren-life-journal
  branch: main
  # base_url 與 auth_endpoint 尚未設定
```

沒有 `base_url` / `auth_endpoint`（或 Netlify Git Gateway）時，開啟 `/admin` 會出現登入失敗或無法授權。**這是預期行為，不是 Astro build 問題。**

---

## 已建立的檔案（scaffold 檢查清單）

| 項目 | 狀態 |
|------|------|
| `/admin` 可開（`public/admin/index.html`） | ✅ |
| `config.yml` articles collection | ✅ |
| 指向 `src/content/articles` | ✅ |
| `media_folder: public/images/uploads` | ✅ |
| `public_folder: /images/uploads` | ✅ |
| frontmatter 欄位（title, description, pubDate, …） | ✅ |
| body Markdown + 圖片上傳 widget | ✅ |
| OAuth 可登入寫作 | ❌ **待設定** |

**第一版 CMS 範圍：僅文章與圖片。**  
`siteProfile.ts`、`siteCopy.ts`、`externalLinks.ts`、首頁 Start Here 文案仍用 Cursor 編輯（日後可再加 collection）。

---

## 推薦方案：DecapBridge（GitHub + Vercel）

| 方案 | 適合度 |
|------|--------|
| **B. DecapBridge** | **推薦** — 全 Vercel，無需自架 |
| A. Netlify Identity + Git Gateway | 可行，但需多一個 Netlify site |
| C. 自架 GitHub OAuth function | 可行，維護成本高 |
| D. GitHub 網頁直接改 `.md` | 過渡用，無 `/admin` UI |

官網：https://decapbridge.com/

---

## DecapBridge 設定步驟

### 1. 註冊並連接 repo

1. 至 DecapBridge 建立專案
2. 連接 GitHub repo：`blueworld102-cmd/ren-life-journal`
3. 記下提供的 **OAuth base URL**（例如 `https://xxxxx.decapbridge.com`）

### 2. 更新 config.yml

編輯 `public/admin/config.yml`：

```yaml
backend:
  name: github
  repo: blueworld102-cmd/ren-life-journal
  branch: main
  base_url: https://YOUR_DECAPBRIDGE_URL
  auth_endpoint: auth
```

### 3. Commit → push → 測試

1. `git add public/admin/config.yml && git commit && git push`
2. 等 Vercel 部署完成
3. 開啟 https://ren-life-journal.vercel.app/admin
4. 點 **Login with GitHub** 並授權

---

## 設好後如何新增文章

1. 開啟 `/admin` → **文章** → **New 文章**
2. 填寫標題、摘要、分類、標籤等
3. `draft: true` 可先儲存預覽；發布前改為 `false`
4. 點 **Publish**（或 Save）→ Decap 會 commit 到 `main`
5. Vercel 偵測 push 後自動 build（約 1～3 分鐘）
6. 到正式站 `/articles/{slug}/` 確認

---

## 如何上傳圖片

| 方式 | 路徑 |
|------|------|
| CMS 媒體庫上傳 | `public/images/uploads/` → 引用 `/images/uploads/xxx.png` |
| 建議文章封面 | 上傳後將 `cover` 改為 `/images/posts/{slug}/cover.png`（可手動搬檔） |
| 內文配圖 | Markdown `![說明](/images/uploads/xxx.png)` 或 `posts/{slug}/01.png` |

---

## 新增文章後 Vercel 自動部署流程

```
/admin 儲存 → GitHub commit 到 main → Vercel Webhook → npm run build → 正式站更新
```

可在 Vercel Dashboard → Deployments 查看是否觸發。

---

## 常見錯誤排查

| 現象 | 可能原因 | 處理 |
|------|----------|------|
| Login with GitHub 失敗 | `base_url` / `auth_endpoint` 未設或錯誤 | 檢查 DecapBridge 設定與 config.yml |
| 403 / Not authorized | GitHub 帳號無 repo write 權限 | 確認你是 repo 協作者 |
| 儲存後 build 失敗 | frontmatter 欄位不符合 schema | 對照 `src/content.config.ts` category enum |
| 圖片 404 | `public_folder` 路徑錯誤 | 確認為 `/images/uploads` |
| `/admin` 白畫面 | `config.yml` YAML 語法錯誤 | 用 YAML linter 檢查 |
| 草稿出現在首頁 | `draft: false` 誤設 | 發布前保持 `draft: true` |

---

## 本地預覽 CMS（可選）

```bash
npx decap-server
```

並在 `config.yml` **暫時**加入 `local_backend: true`（勿 commit 到 production）。

---

## 安全提醒

- `/admin/index.html` 已設 `<meta name="robots" content="noindex">`
- sitemap 已排除 `/admin`
- 勿將 OAuth secret commit 進 repo

---

*相關：[`cms-decision.md`](./cms-decision.md) · [`decap-cms-implementation-plan.md`](./decap-cms-implementation-plan.md)*
