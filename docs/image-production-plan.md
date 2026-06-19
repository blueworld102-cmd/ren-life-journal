# 圖片正式化製作計畫（image-production-plan）

最後更新：內容管理與互動功能 P0 階段

本文件說明**哪些位置需要正式照片或插畫**、目前 fallback 策略，以及站長準備素材時的規格建議。

---

## 現況判定（2026-06-19）

| 項目 | 狀態 |
|------|------|
| Git `main` 與 GitHub | 已同步（`7197605`） |
| Vercel production | 應來自同一 commit |
| `site/backgrounds/*.png` | **紙張紋理 fallback**（非正式插畫） |
| `photos/*.svg` | **SVG 色調卡**（非真實照片） |
| `posts/.../cover.png` | **漸層衍生**（非正式封面照） |
| About 個人照 | **純色占位區塊**（無圖片檔） |

**結論：** 正式站看起來像 placeholder，主因是**缺正式圖片資產**，不是 build bug 或未 push。

在沒有正式圖前，網站使用：
- 紙張紋理 PNG（`npm run generate:paper-fallbacks`）
- 純漸層 SVG 色調卡
- About 頁米白 portrait 區塊（不顯示假圖）

**禁止**再使用幾何色塊 seed 圖作為正式視覺。

---

## 一、Hero 章節卡

| 項目 | 說明 |
|------|------|
| **檔案** | `public/images/site/backgrounds/hero/tokyo-rain-window-tower.png` |
| **尺寸建議** | 1600×1200 px（或 3:2），PNG 或 WebP |
| **視覺方向** | 雨天窗邊、東京鐵塔遠景、咖啡杯、柔和粉米色调、略帶霧面 |
| **使用位置** | 首頁 Hero 右側章節卡、預設 OG 圖 |
| **優先級** | **P1** |
| **暫時 fallback** | 紙張紋理 PNG（已上線） |

### 製作備註
- 構圖留右側或中央空間給疊加文字
- 避免高對比、避免鮮豔霓虹
- 可為 AI 插畫或自行拍攝後柔化調色

---

## 二、Start Here 三張卡

| 卡片 | 檔案 | 視覺方向 | 優先級 |
|------|------|----------|--------|
| 第一次來日本 | `travel/travel-journal-desk-soft.png` | 書桌、筆記本、地圖、小飛機、暖光 | **P2** |
| 正在找工作 | `windows/train-window-rain-coffee.png` | 電車窗、雨天、咖啡杯、通勤感 | **P2** |
| 在東京慢慢生活 | `windows/cafe-window-morning-notes.png` | 咖啡廳窗邊、早晨、筆記、小花 | **P2** |

**尺寸：** 1600×1200 px，與 Hero 同系列色調。

**暫時 fallback：** 各色系紙張紋理 PNG（已上線）。

**替代策略（若短期無圖）：** 可改為純米白卡片 + 細邊框，隱藏 `background-image`；目前保留紙張紋理以維持層次感。

---

## 三、第一篇文章 cover

| 項目 | 說明 |
|------|------|
| **文章** | 雨天去澀谷區役所的那一天 |
| **檔案** | `public/images/posts/shibuya-ward-office-rainy-day/cover.png` |
| **尺寸建議** | 1200×800 px（3:2），PNG |
| **視覺方向** | 雨天澀谷街景、濕路面、傘、或區役所外觀（不必清晰辨識） |
| **優先級** | **P1** |
| **暫時 fallback** | `covers/shibuya-rain.svg` 轉出的柔和漸層 PNG |

### 內文配圖（可選）
- `public/images/posts/shibuya-ward-office-rainy-day/01.png` 等
- 見 `CONTENT_GUIDE.md` 文章配圖慣例

---

## 四、Photo Wall 至少 6 張正式圖

首頁 Preview 與 `/photos` 頁面目前使用 SVG 色調卡。建議逐步替換為真實照片：

| # | 目前 SVG | 建議正式圖主題 | 建議檔名 |
|---|----------|----------------|----------|
| 1 | `harajuku-rain.svg` | 雨天窗邊 / 澀谷 | `photos/shibuya-rain-window.jpg` |
| 2 | `umbrella-street.svg` | 雨後街道倒影 | `photos/rainy-street-reflection.jpg` |
| 3 | `cafe-corner.svg` | 咖啡廳窗邊早晨 | `photos/cafe-morning.jpg` |
| 4 | `supermarket.svg` | 超市補貨日常 | `photos/supermarket-haul.jpg` |
| 5 | `station-evening.svg` | 黃昏電車月台 | `photos/station-evening.jpg` |
| 6 | `morning-commute.svg` | 週末早晨街景 | `photos/weekend-morning.jpg` |

**尺寸：** 長邊 1200–1600 px，JPG 或 WebP，檔案 < 400 KB 為佳。

**更新方式：**
1. 放入 `public/images/photos/`
2. 修改 `src/data/photos.ts` 的 `image` 路徑
3. `npm run check:assets` → commit → push

**優先級：** **P2**

---

## 五、About 頁個人照或意象圖

| 項目 | 說明 |
|------|------|
| **目前** | `about.astro` 使用 `.portrait-placeholder` 米白區塊 |
| **建議檔案** | `public/images/site/about/ren-portrait-soft.jpg`（路徑可自訂，需改 about 頁） |
| **視覺方向** | 柔和個人照、側臉、窗邊、或筆記本意象（不一定要正臉大頭照） |
| **尺寸** | 800×1000 px 直式，或 1:1 方形 |
| **優先級** | **P3** |

在正式照就緒前，**維持米白占位**比放假圖或幾何圖更好。

---

## 六、其他建議補強（非 P0）

| 項目 | 檔案 | 說明 |
|------|------|------|
| 預設 OG | 同 Hero 章節卡 | 社群分享用 |
| Favicon | `favicon.png` | 可日後精緻化 |
| 其他文章 cover | `covers/*.svg` → 各文章 `posts/{slug}/cover.png` | 隨文章增加逐步替換 |
| 澳洲篇章預留 | `australia/australia-coast-dreamy-morning.png` | 未來篇章再製作 |

---

## 七、素材交付檢查清單

站長提供圖片時，請確認：

- [ ] 檔名與上表一致（或告知新路徑以便更新程式）
- [ ] 長邊至少 1200 px
- [ ] 已壓縮（TinyPNG / Squoosh）
- [ ] 色調偏柔和、米白、粉灰（與網站 tokens 一致）
- [ ] 無浮水印、無過度 HDR
- [ ] 覆蓋後執行 `npm run check:assets` 與 `npm run build`

---

## 八、維護指令

```bash
# 重新產生紙張 fallback（僅在無正式圖時使用）
npm run generate:paper-fallbacks

# 檢查所有引用路徑
npm run check:assets

# 建置確認
npm run build
```

---

## 九、替換優先順序總表

1. **P1** — Hero 章節卡、澀谷文章 cover、預設 OG
2. **P2** — Start Here 三張、Photo Wall 六張
3. **P3** — About 個人照、其餘文章 cover
4. **P4** — 澳洲篇章、favicon 精緻版

---

*相關：[`assets-status.md`](./assets-status.md) · [`background-assets-guide.md`](./background-assets-guide.md)*
