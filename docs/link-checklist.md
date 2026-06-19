# 關鍵連結 QA 清單

本文件列出 Ren's Life Journal 所有關鍵互動連結，供部署前與改版後逐項驗收。

**驗收方式：** 本地 `npm run dev` 或正式站，桌面 + 手機（375px）各點一次。  
**最後程式碼檢查：** 2026-06-19

---

## 圖例

| 狀態 | 說明 |
|------|------|
| ✅ | 已確認 href 有效、路由存在 |
| ⚠️ | 可用但有已知限制 |
| — | 條件顯示（例如尚無 active 外部連結） |

---

## Header（Navbar）

| 連結 | href | 狀態 | 備註 |
|------|------|------|------|
| Logo / 站名 | `/` | ✅ | `Navbar.astro` → brand |
| Home | `/` | ✅ | |
| Journal | `/articles` | ✅ | |
| Japan | `/articles?topic=japan` | ✅ | 篩選日本主題文章 |
| Photos | `/photos` | ✅ | |
| About | `/about` | ✅ | |
| Search（桌面） | — | ⚠️ | 非連結；Enter 導向 `/articles?search=關鍵字` |
| Search（手機，非 Journal 頁） | `/articles` | ⚠️ | 顯示「搜尋」按鈕，跳轉列表頁；**不帶關鍵字** |
| Search（手機，Journal 頁） | — | ✅ | 顯示搜尋框，即時篩選 |

**Hover / Focus：** `.nav-link:hover`、`.nav-link.active` 有底線；`.nav-search-input:focus` 有 border 變色。  
**手機可點：** nav 可橫向捲動；搜尋跳轉按鈕 min-height 足夠。

---

## Homepage

| 連結 | href | 狀態 | 備註 |
|------|------|------|------|
| Hero「瀏覽全部文章」 | `/articles` | ✅ | `HeroSection.astro` |
| INDEX 分類列（5 項） | `/articles?category=…` | ✅ | `FeaturedCategories.astro` |
| Start Here 卡 1「第一次來日本」 | `/articles?category=日本生活手續` | ✅ | 整卡可點 |
| Start Here 卡 2「正在找工作」 | `/articles?category=打工度假` | ✅ | |
| Start Here 卡 3「在東京慢慢生活」 | `/articles?category=東京散步` | ✅ | |
| Latest 精選卡 | `/articles/{slug}/` | ✅ | 動態，目前最新 3 篇 |
| Latest 次要卡 ×2 | `/articles/{slug}/` | ✅ | |
| 「查看全部文章」 | `/articles` | ✅ | `index.astro` |
| Photo Wall 卡（有 relatedPost） | `/articles/{slug}` | ✅ | 部分卡片連文章 |
| 「查看全部照片」 | `/photos` | ✅ | |
| About Preview「關於這個網站」 | `/about` | ✅ | |

**Hover：** Start Here 卡、ArticleCard、btn-text 皆有 hover 樣式。

---

## Article Page（以 `/articles/shibuya-ward-office-rainy-day/` 為例）

| 連結 | href | 狀態 | 備註 |
|------|------|------|------|
| Top Nav「回到 Journal」 | `/articles` | ✅ | `ArticleTopNav.astro` |
| Top Nav「Home」 | `/` | ✅ | |
| Breadcrumb Home | `/` | ✅ | |
| Breadcrumb Journal | `/articles` | ✅ | |
| Breadcrumb Category | `/articles?category={category}` | ✅ | URL encode 正確 |
| 文章 Tags | `/articles?search={tag}` | ✅ | 以搜尋參數篩選 |
| Return「回到 Journal」 | `/articles` | ✅ | `ArticleReturnNav.astro` |
| Return「回到 Japan Life Journal」 | `/articles?topic=japan` | ✅ | |
| 上一篇 / 下一篇 | `/articles/{slug}/` | ✅ | 依發布順序動態 |
| Related Posts | `/articles/{slug}/` | ✅ | 最多 3 篇 |
| 封面 / 內文圖 | `/images/…` | ⚠️ | 部分 cover 路徑檔案尚未放入 `public/` |

**注意：** 麵包屑最後一項為純文字（當前頁），非連結 — 正確。

---

## Footer

| 連結 | href | 狀態 | 備註 |
|------|------|------|------|
| Journal | `/articles` | ✅ | |
| Japan | `/articles?topic=japan` | ✅ | |
| Photos | `/photos` | ✅ | |
| About | `/about` | ✅ | |
| Active external links | 外部 URL | — | 目前全為 `isActive: false`，**不顯示** |
| 站長指南 | `/admin-help` | ✅ | 低調文字連結，不在主選單 |

**外部連結規範：** `ExternalLinks.astro` 使用 `target="_blank"`、`rel="noopener noreferrer"`、`aria-label`。

---

## 404 頁

| 連結 | href | 狀態 |
|------|------|------|
| 回到首頁 | `/` | ✅ |
| 閱讀 Journal | `/articles` | ✅ |

---

## 舊路徑 Redirect

| 舊路徑 | 新路徑 | 狀態 |
|--------|--------|------|
| `/blog` | `/articles` | ✅ | `astro.config.mjs` redirects |
| `/blog/{slug}` | `/articles/{slug}` | ✅ | |

---

## 手動驗收步驟（建議）

1. 桌面：從首頁依序點 Header 五個 nav + Hero CTA
2. 首頁：點 Start Here 三卡、Latest 三卡、Photo Wall 一卡、「查看全部」
3. 開一篇文章：點 breadcrumb、top nav、tags、上一篇/下一篇、related
4. 手機：重複以上；確認 Navbar 搜尋行為（非 Journal 頁為跳轉按鈕）
5. Footer 四連結 + 站長指南
6. 造訪 `/this-does-not-exist` 確認 404

---

## 已知待改善（非 404）

| 項目 | 說明 |
|------|------|
| 手機首頁搜尋 | 見下方「手機搜尋流程」 |
| `?tag=` URL | 目前用 `?search=` 或 chip 篩選，無獨立 tag 參數 |
| 背景圖品質 | `seed:images` 產生的是占位圖，可日後替換同名 PNG |

---

## 手機搜尋流程（已知限制，暫可接受）

**目前行為：**

1. **首頁手機版**：Navbar 不顯示搜尋輸入框，只顯示「搜尋」按鈕 → 點擊進入 `/articles`（**不帶關鍵字**）
2. **Journal 頁（`/articles`）**：顯示搜尋框，可輸入關鍵字並即時篩選；也支援 URL `?search=關鍵字`

**桌面：** 非 Journal 頁搜尋框 Enter 後導向 `/articles?search=關鍵字`。

**未來優化（非本階段）：**

- 手機首頁搜尋 icon 可展開 input
- 或跳轉 `/articles?search=` 後 autofocus 搜尋框

---

*相關：[`deployment-guide.md`](./deployment-guide.md) · [`prelaunch-checklist.md`](./prelaunch-checklist.md)*
