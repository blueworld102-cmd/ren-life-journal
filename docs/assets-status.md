# 圖片資產狀態（assets-status）

最後更新：內容管理與互動功能 MVP 階段

本文件列出各區塊**目前實際使用的檔案**、是否為正式圖、以及如何替換。  
**正式圖 = 直接覆蓋同名檔案即可**，不需改程式碼。`generate:paper-fallbacks` **不會覆蓋已存在檔案**。

---

## 圖例

| 標記 | 說明 |
|------|------|
| **是（插畫）** | 日系柔和插畫 PNG，可上線 |
| **否（SVG 色調卡）** | 純漸層 SVG，過渡用 |
| **否（漸層衍生）** | 由 SVG 轉出的 PNG，仍非真實照片 |
| **否（占位）** | 米白區塊或勿用 starter 圖 |
| **fallback** | 僅在檔案缺失時由腳本產生的紙張紋理 |

---

## 各區塊資產總表

| 區塊 | 目前檔案路徑 | 是否正式圖 | 建議尺寸 | 替換方式 | 優先度 |
|------|-------------|-----------|----------|----------|--------|
| **Hero 章節卡** | `/images/site/backgrounds/hero/tokyo-rain-window-tower.png` | 是（插畫）· 1024×682 · ~94KB | 1600×1200 PNG | 覆蓋同名檔案 | **P0** |
| **Start Here 卡 1** | `/images/site/backgrounds/travel/travel-journal-desk-soft.png` | 是（插畫）· ~103KB | 1600×1200 PNG | 覆蓋同名檔案 | **P1** |
| **Start Here 卡 2** | `/images/site/backgrounds/windows/train-window-rain-coffee.png` | 是（插畫）· ~96KB | 1600×1200 PNG | 覆蓋同名檔案 | **P1** |
| **Start Here 卡 3** | `/images/site/backgrounds/windows/cafe-window-morning-notes.png` | 是（插畫）· ~78KB | 1600×1200 PNG | 覆蓋同名檔案 | **P1** |
| **Latest 精選（澀谷）** | `/images/posts/shibuya-ward-office-rainy-day/cover.png` | 否（漸層衍生）· 1200×800 · ~32KB | 1200×800 PNG | 覆蓋同名檔案 | **P0** |
| **Latest 文章 2** | `/images/covers/interview.svg` | 否（SVG 色調卡） | 800×600 | 改文章 frontmatter `cover` 或覆蓋 SVG | **P1** |
| **Latest 文章 3** | `/images/covers/expenses.svg` | 否（SVG 色調卡） | 800×600 | 同上 | **P1** |
| **Photo Wall #1** | `/images/photos/harajuku-rain.svg` | 否（SVG 色調卡） | 600×450+ | 放入 `public/images/photos/` 真實照片後改 `photos.ts` | **P1** |
| **Photo Wall #2** | `/images/photos/umbrella-street.svg` | 否（SVG 色調卡） | 同上 | 同上 | **P1** |
| **Photo Wall #3** | `/images/photos/cafe-corner.svg` | 否（SVG 色調卡） | 同上 | 同上 | **P1** |
| **Photo Wall #4** | `/images/photos/supermarket.svg` | 否（SVG 色調卡） | 同上 | 同上 | **P1** |
| **Photo Wall #5** | `/images/photos/station-evening.svg` | 否（SVG 色調卡） | 同上 | 同上 | **P1** |
| **Photo Wall #6** | `/images/photos/morning-commute.svg` | 否（SVG 色調卡） | 同上 | 同上 | **P1** |
| **About Preview 裝飾** | `/images/site/backgrounds/windows/cafe-window-morning-notes.png` | 是（插畫，同 Start Here 卡 3） | — | 覆蓋背景 PNG 或改 `AboutPreview.astro` | **P2** |
| **About 個人照** | （無圖檔，`.portrait-placeholder` 米白區塊） | 否（占位） | 800×1000 直式 | 新增 `public/images/site/about/ren-portrait.jpg` 並改 about 頁 | **P2** |
| **預設 OG 圖** | `/images/site/backgrounds/hero/tokyo-rain-window-tower.png` | 是（插畫，同 Hero） | 1200×630 裁切友善 | 覆蓋 Hero PNG 即同步 | **P0** |

---

## 其他 site/backgrounds（已上線、備用）

| 檔案 | 狀態 | 用途 |
|------|------|------|
| `hero/waiting-luggage-window.png` | 是（插畫） | `heroSecondary` 備用 |
| `windows/rainy-city-street-blur.png` | 是（插畫） | 預留分類過場 |
| `lifestyle/soft-supermarket-diary.png` | 是（插畫） | 預留生活區塊 |
| `australia/australia-coast-dreamy-morning.png` | 是（插畫） | 未來澳洲篇章 |

設定：`src/data/siteBackgrounds.ts`

---

## 其餘文章封面

| 文章 | cover 路徑 | 是否正式圖 |
|------|-----------|-----------|
| 原宿雨天散步 | `/images/covers/harajuku.svg` | 否（SVG） |
| 打工面試練習 | `/images/covers/interview.svg` | 否（SVG） |
| 東京生活費 | `/images/covers/expenses.svg` | 否（SVG） |
| 打工度假五件事 | `/images/covers/checklist.svg` | 否（SVG） |

建議：每篇改為 `public/images/posts/{slug}/cover.png` 真實封面。

---

## 勿用檔案

- `public/images/blog-placeholder-*.jpg` — Astro starter，**勿引用**

---

## 維護指令

```bash
# 僅在檔案缺失時產生 paper fallback（不覆蓋既有檔案）
npm run generate:paper-fallbacks

npm run check:assets
npm run build
```

---

## 替換優先順序

1. **P0** — 澀谷文章 cover、Hero/OG（若需真實照片版）
2. **P1** — Photo Wall 六張真實照片、其餘文章 cover
3. **P2** — About 個人照、About 裝飾圖

---

*相關：[`image-production-plan.md`](./image-production-plan.md) · [`CONTENT_GUIDE.md`](../CONTENT_GUIDE.md)*
