# 上線後 UX 稽核（post-launch-ux-audit）

最後更新：內容管理與互動功能 MVP 階段  
正式站：https://ren-life-journal.vercel.app/

---

## 已通過 ✅

| 項目 | 說明 |
|------|------|
| Header 主導覽 | Home / Journal / Photos / About（已移除 Japan） |
| Footer 連結 | Journal / Photos / About |
| Journal 路徑 | `/articles` 可搜尋、篩選 |
| Photos 路徑 | `/photos` |
| About 路徑 | `/about` |
| `/japan` | noindex、不在 sitemap、不在主導覽 |
| `/admin` | noindex（`index.html` meta）、不在 sitemap |
| `/admin-help` | noindex、不在 sitemap；footer 連結僅 DEV 顯示 |
| 404 頁 | 有回首頁、Journal 連結 |
| 文章頁返回 | ArticleTopNav「回到 Journal」+ ArticleReturnNav |
| RSS | `npm run build` 產生 `/rss.xml` |
| Sitemap | `sitemap-index.xml` 正常 |
| 圖片路徑檢查 | `npm run check:assets` 通過 |
| Build | `npm run build` 通過 |
| CMS scaffold | `/admin` + `config.yml` 已就緒 |
| 留言 scaffold | `GiscusComments` 未設定時安全隱藏 |

---

## 需要修 🔧

| 項目 | 現況 | 建議 |
|------|------|------|
| 背景懸浮粒子 | 正式站可能仍偏淡 | 本輪已提高 opacity + 內聯 animation；push 後驗收 |
| 桌機自訂游標 | 點擊玫瑰不夠明顯 | 本輪已調整 SiteCursor；push 後驗收 |
| Decap CMS 登入 | OAuth 未設定 | 依 `cms-setup-guide.md` 設定 DecapBridge |
| Giscus 留言 | env 未設定 | 依 `comments-setup-guide.md` 設定 |
| Photo Wall 圖片 | 仍為 SVG 色調卡 | 見 `assets-status.md` P1 |
| 文章 cover（多數） | SVG 色調卡 | 逐步改為 `posts/{slug}/cover.png` |
| About 個人照 | 米白占位 | 提供正式照片後替換 |
| OG 圖 | 使用 Hero 插畫 PNG | 可接受；日後可換專用 1200×630 圖 |

---

## 可延後 ⏳

| 項目 | 說明 |
|------|------|
| Vercel Analytics | 尚未啟用；可在 Vercel Dashboard → Analytics 開啟，非必須 |
| CMS 管理 siteProfile / Start Here | 第二階段再加 collection |
| `/japan` 專題頁 | 已保留 noindex，內容多了再掛回導覽 |
| 刪除 `blog-placeholder-*.jpg` | 清理 repo，不影響上線 |
| 自訂 domain | 見 `deployment-guide.md` |

---

## 不建議現在做 🚫

| 項目 | 原因 |
|------|------|
| Notion 同步 | 複雜度高，見 `cms-decision.md` |
| 自架留言後端（Supabase） | giscus 已足夠 MVP |
| 首頁大改 / 新大型功能 | 超出本階段範圍 |
| 會員 / 訂閱 / view count | 非目前需求 |

---

## 手機 UX 備註

| 項目 | 狀態 |
|------|------|
| Header 手機版 | 導覽橫向捲動 + 品牌列；可接受，持續觀察 |
| 搜尋框手機 | 非 Journal 頁顯示「搜尋」跳轉；Journal 頁有完整搜尋 |
| 首頁 CTA | Hero「瀏覽全部文章」+ Start Here 三卡連結清楚 |
| 觸控游標 | 自訂游標已關閉（`pointer: coarse`） |

---

*相關：[`assets-status.md`](./assets-status.md) · [`vercel-post-deploy-checklist.md`](./vercel-post-deploy-checklist.md)*
