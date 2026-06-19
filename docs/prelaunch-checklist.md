# Ren's Life Journal — 上線前檢查清單

部署前請逐項確認。正式 domain 確定後，需同步更新三處 URL：

1. `astro.config.mjs` → `site`
2. `src/consts.ts` → `SITE_URL`
3. `public/robots.txt` → `Sitemap` 行

目前暫用：`https://ren-life-journal.vercel.app`

> 若 Vercel 實際部署 URL 不同，請先改上述三處再驗收 OG / RSS / sitemap。

---

## 1. Site URL 與 Domain

- [ ] `astro.config.mjs` 的 `site` 已改為正式 domain（非 example.com）
- [ ] `src/consts.ts` 的 `SITE_URL` 與 `site` 一致
- [ ] `public/robots.txt` 的 Sitemap URL 與正式 domain 一致
- [ ] Vercel / 部署平台自訂 domain 已綁定並啟用 HTTPS

## 2. example.com 殘留

- [ ] `npm run build` 後搜尋 `dist/` 無 `example.com`
- [ ] OG / canonical / RSS 絕對網址皆指向正式 domain
- [ ] 站內聯絡信箱等 placeholder 已替換（若有）

## 3. Favicon 與 Icon

- [ ] `public/favicon.png` 存在
- [ ] `public/apple-touch-icon.png` 存在
- [ ] `public/images/site/icons/ren-life-journal-icon.png` 存在
- [ ] 瀏覽器分頁顯示 Ren icon（若仍為舊圖：硬重新整理 Ctrl+Shift+R，或清除快取）

## 4. 404 頁面

- [ ] `src/pages/404.astro` 存在
- [ ] build 後有 `404.html`（或平台支援的 404 路由）
- [ ] 造訪不存在路徑時顯示「迷路了，也沒關係。」
- [ ] 「回到首頁」「閱讀 Journal」按鈕可點

## 5. robots.txt

- [ ] `public/robots.txt` 存在
- [ ] `Allow: /`（正式上線、允許索引）
- [ ] `Sitemap` 指向正確 `sitemap-index.xml` 絕對 URL

## 6. Sitemap

- [ ] `@astrojs/sitemap` 已安裝並在 `astro.config.mjs` 啟用
- [ ] build 後產生 `dist/sitemap-index.xml` 與 `dist/sitemap-0.xml`
- [ ] sitemap 內 URL 使用正式 domain
- [ ] `draft: true` 文章**沒有**獨立路由，因此不會出現在 sitemap

## 7. RSS

- [ ] `/rss.xml` 可存取
- [ ] title = `Ren's Life Journal`
- [ ] description 含異鄉生活筆記文案
- [ ] item 不含 draft
- [ ] item link 為絕對 URL（`https://{domain}/articles/{slug}/`）

## 8. Draft 文章

- [ ] `_template.md` 等 `draft: true` 不出現在首頁、列表、RSS、sitemap 路由
- [ ] 正式發布前將 `draft: false`

## 9. 首頁 OG / SEO

- [ ] `og:type` = `website`
- [ ] `og:title` / `og:description` 正確
- [ ] `og:image` 為絕對 URL（預設 hero 圖）
- [ ] `canonical` 指向首頁正式 URL
- [ ] `twitter:card` = `summary_large_image`

## 10. 單篇文章 OG

- [ ] `og:type` = `article`
- [ ] `og:image` 使用文章 PNG/JPG cover，或 fallback hero 圖
- [ ] `article:published_time` 存在
- [ ] `article:modified_time` 存在（若有 `updatedDate`）
- [ ] `article:tag` 存在（若有 tags）

## 11. 手機版 RWD

- [ ] 首頁各區塊手機可讀（Hero、Start Here、Latest、Photo Wall）
- [ ] 文章頁標題、metadata、正文在手機不溢出
- [ ] Navbar 可橫向捲動或正常顯示

## 12. 文章頁閱讀體驗

- [ ] metadata 行（日期｜地點｜天氣｜閱讀時間）清楚
- [ ] 心情行、tags 可讀
- [ ] 正文 max-width 約 720px，不過寬
- [ ] 上一篇 / 下一篇、Related Posts 正常

## 13. 圖片 alt

- [ ] 文章 cover 有 `alt`（通常為 title）
- [ ] Photo Wall / Start Here 背景圖有 `aria-label` 或 `alt`
- [ ] fallback cover 使用 `windowCafe` alt 文字

## 14. 內部連結

- [ ] `/articles` 列表可開啟
- [ ] 各文章 `/articles/{slug}/` 可開啟
- [ ] 舊 `/blog` 連結 redirect 至 `/articles`
- [ ] 首頁、Footer、Nav 連結無 404

## 15. 部署平台設定

- [ ] Vercel（或選定平台）專案已連接 repo
- [ ] Build command：`npm run build`
- [ ] Output：Astro static `dist/`
- [ ] 環境變數（若未來有）已設定
- [ ] 自訂 domain DNS 已生效
- [ ] 部署後用 [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) 或類似工具驗證 OG

---

## 圖片資產檢查（部署前必做）

```bash
npm run check:assets
```

若失敗，可執行 `npm run seed:images` 產生占位背景（日後請以正式插畫替換）。

### 必檢項目

- [ ] 每篇已發布文章的 `cover` 路徑在 `public/` 存在
- [ ] `src/data/siteBackgrounds.ts` 所有 `src` 對應檔案存在
- [ ] `public/favicon.png` 存在
- [ ] `public/apple-touch-icon.png` 存在
- [ ] `public/images/site/icons/ren-life-journal-icon.png` 存在
- [ ] 預設 OG 圖（`heroPrimary`）PNG 存在
- [ ] 第一篇正式文章：`public/images/posts/shibuya-ward-office-rainy-day/cover.png` 存在
- [ ] build 後瀏覽器 Network 無大量圖片 404

### 檢查腳本涵蓋範圍

`scripts/check-assets.mjs` 會掃描：

- `src/content/articles/*.md` 的 `cover`
- `src/data/siteBackgrounds.ts` 的 `src` 與 `SITE_ICON`
- `DEFAULT_OG_IMAGE`（heroPrimary）
- `favicon.png`、`apple-touch-icon.png`

---

## 快速驗證指令

```bash
npm run check:assets
npm run build

# 檢查 example.com 殘留（應無結果）
rg "example.com" dist/

# 檢查 sitemap
cat dist/sitemap-index.xml

# 檢查 RSS 絕對連結
rg "ren-life-journal" dist/rss.xml
```

---

## Vercel 部署後驗收

部署完成後，以正式 URL 逐頁檢查（預設 `https://ren-life-journal.vercel.app`）。

### 必查路徑

| # | 路徑 | 檢查項目 |
|---|------|----------|
| 1 | `/` | 能開啟；Hero、Start Here、Latest、Photo Wall、About Preview 正常 |
| 2 | `/articles` | 列表可開；篩選 / 搜尋可用 |
| 3 | `/articles/shibuya-ward-office-rainy-day/` | 文章頁可開；cover 載入；metadata 正確 |
| 4 | `/photos` | 照片牆可開；圖片載入 |
| 5 | `/about` | About 文案正確；**無空外部連結** |
| 6 | `/404` 或不存在路徑 | 顯示 404 頁；回首頁按鈕可用 |
| 7 | `/robots.txt` | `Allow: /`；Sitemap 為正式 domain |
| 8 | `/rss.xml` | 可讀；item 為絕對 URL；無 draft |
| 9 | `/sitemap-index.xml` | 可讀；URL 皆為正式 domain |

### 每頁共通檢查

- [ ] 能開啟，無 500 / 意外 404
- [ ] 手機版（375px 寬）版面可讀、Navbar 正常
- [ ] 圖片有載入（無大量破圖）
- [ ] 文章 cover 顯示正常（列表卡 + 文章頁頂部）
- [ ] Footer / About **沒有**空的 Instagram 等假連結
- [ ] Footer 站名、subtitle、目前在寫章節正確

### SEO / 分享（抽樣）

- [ ] 首頁 `og:image` 為絕對 URL 且圖片可開
- [ ] 文章頁 `og:type=article`、`article:published_time` 存在
- [ ] 用 [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) 重新抓取首頁與第一篇文章

詳見 [`deployment-guide.md`](./deployment-guide.md)。

---

*最後更新：GitHub + Vercel 部署前驗收階段*
