# 圖片資產狀態（assets-status）

最後更新：圖片資產正式化階段

本文件追蹤 `public/images/` 內各圖片的**實際狀態**、使用位置，以及是否需替換為正式插畫／照片。

---

## 圖例

| 狀態 | 說明 |
|------|------|
| **正式** | 可長期使用的成品圖 |
| **紙張 fallback** | 柔和漸層 + 紙張顆粒，無幾何色塊；可上線但建議日後替換 |
| **SVG 色調卡** | 極簡漸層 SVG，作封面／照片牆過渡用 |
| **占位（勿用）** | seed 幾何色塊或 Astro 預設圖，**不應作正式視覺** |
| **待提供** | 需站長提供正式照片或插畫 |

---

## 一、網站背景（site/backgrounds）

由 `npm run generate:paper-fallbacks` 產生。**已取代**舊版 `seed-site-images` 幾何占位圖。

| 檔案 | 狀態 | 使用位置 | 替換優先 |
|------|------|----------|----------|
| `hero/tokyo-rain-window-tower.png` | 紙張 fallback | Hero 章節卡、`heroPrimary`、預設 OG 圖 | **P1** |
| `hero/waiting-luggage-window.png` | 紙張 fallback | `heroSecondary`（備用） | P3 |
| `windows/train-window-rain-coffee.png` | 紙張 fallback | Start Here「正在找工作」 | **P2** |
| `windows/cafe-window-morning-notes.png` | 紙張 fallback | About Preview 裝飾、Start Here「東京慢慢生活」、文章 cover fallback | **P2** |
| `windows/rainy-city-street-blur.png` | 紙張 fallback | 預留（分類過場） | P3 |
| `lifestyle/soft-supermarket-diary.png` | 紙張 fallback | 預留（省錢生活區塊） | P3 |
| `travel/travel-journal-desk-soft.png` | 紙張 fallback | Start Here「第一次來日本」 | **P2** |
| `australia/australia-coast-dreamy-morning.png` | 紙張 fallback | 未來澳洲篇章預留 | P4 |

設定檔：`src/data/siteBackgrounds.ts`

---

## 二、文章封面

| 檔案 | 狀態 | 文章 | 替換優先 |
|------|------|------|----------|
| `posts/shibuya-ward-office-rainy-day/cover.png` | SVG 色調卡衍生（`shibuya-rain.svg`） | 雨天去澀谷區役所的那一天 | **P1** |
| `covers/shibuya-rain.svg` | SVG 色調卡 | （來源檔） | — |
| `covers/harajuku.svg` | SVG 色調卡 | 原宿雨天散步 | P2 |
| `covers/interview.svg` | SVG 色調卡 | 打工面試練習 | P2 |
| `covers/expenses.svg` | SVG 色調卡 | 東京生活費 | P2 |
| `covers/checklist.svg` | SVG 色調卡 | 打工度假五件事 | P2 |

---

## 三、照片牆（photos/）

| 檔案 | 狀態 | 使用位置 | 替換優先 |
|------|------|----------|----------|
| `photos/harajuku-rain.svg` | SVG 色調卡 | Photo Wall 首張、首頁 Preview #1 | **P2** |
| `photos/umbrella-street.svg` | SVG 色調卡 | Photo Wall、首頁 Preview #2 | P2 |
| `photos/cafe-corner.svg` | SVG 色調卡 | Photo Wall、首頁 Preview #3 | P2 |
| `photos/supermarket.svg` | SVG 色調卡 | Photo Wall、首頁 Preview #4 | P2 |
| `photos/station-evening.svg` | SVG 色調卡 | Photo Wall、首頁 Preview #5 | P2 |
| `photos/morning-commute.svg` | SVG 色調卡 | Photo Wall、首頁 Preview #6 | P2 |

資料：`src/data/photos.ts` → `PHOTOS`、`PHOTO_PREVIEW_ITEMS`

---

## 四、不應使用的檔案

| 檔案 | 狀態 | 說明 |
|------|------|------|
| `blog-placeholder-1.jpg`～`5.jpg` | **占位（勿用）** | Astro starter 預設圖，與本站無關 |
| `blog-placeholder-about.jpg` | **占位（勿用）** | 同上 |
| 舊版 seed 幾何 PNG | **已覆蓋** | 請勿再執行舊版幾何 seed；改用 `generate:paper-fallbacks` |

建議：日後可從 repo 刪除 `blog-placeholder-*.jpg`，避免誤用。

---

## 五、Icon / Favicon

| 檔案 | 狀態 | 使用位置 |
|------|------|----------|
| `favicon.png` | 簡易品牌圖 | `BaseHead.astro` |
| `apple-touch-icon.png` | 簡易品牌圖 | `BaseHead.astro` |
| `site/icons/ren-life-journal-icon.png` | 簡易品牌圖 | `SITE_ICON`（預留） |

---

## 六、各區塊目前用圖一覽

| 區塊 | 目前圖片 |
|------|----------|
| **Hero 章節卡** | `site/backgrounds/hero/tokyo-rain-window-tower.png`（紙張 fallback） |
| **Start Here 卡 1** | `travel/travel-journal-desk-soft.png`（紙張 fallback） |
| **Start Here 卡 2** | `windows/train-window-rain-coffee.png`（紙張 fallback） |
| **Start Here 卡 3** | `windows/cafe-window-morning-notes.png`（紙張 fallback） |
| **Latest 精選（澀谷文）** | `posts/shibuya-ward-office-rainy-day/cover.png` |
| **Latest 其他文章** | 各 `covers/*.svg` |
| **Photo Wall Preview ×6** | `photos/*.svg` 色調卡 |
| **About Preview 裝飾** | `windows/cafe-window-morning-notes.png`（紙張 fallback，低透明度） |
| **預設 OG** | `hero/tokyo-rain-window-tower.png` |

---

## 七、維護指令

```bash
# 重新產生紙張 fallback（覆蓋 site/backgrounds PNG + 澀谷 cover）
npm run generate:paper-fallbacks

# 檢查所有引用路徑是否存在
npm run check:assets

# 建置確認
npm run build
```

正式插畫就緒時：**直接覆蓋同名檔案**，不需改程式碼（路徑已固定）。

---

## 八、替換優先順序建議

1. **P1** — Hero 章節卡、第一篇文章 `cover.png`、預設 OG 圖  
2. **P2** — Start Here 三張、Photo Wall 六張（改為真實照片或插畫）  
3. **P3** — 其餘背景 PNG、其他文章 SVG cover  
4. **P4** — 澳洲篇章、About 個人照、favicon 精緻版  

---

*相關：[`background-assets-guide.md`](./background-assets-guide.md) · [`CONTENT_GUIDE.md`](../CONTENT_GUIDE.md)*
