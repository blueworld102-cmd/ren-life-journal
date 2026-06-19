# 網站背景圖素材指南

本文件說明 `public/images/site/backgrounds/` 內 8 張背景圖的用途與套用建議。  
設定檔：`src/data/siteBackgrounds.ts`

---

## 檔案結構

```
public/images/site/backgrounds/
├── hero/
│   ├── tokyo-rain-window-tower.png      ← heroPrimary / heroChapterCard
│   └── waiting-luggage-window.png       ← heroSecondary
├── windows/
│   ├── train-window-rain-coffee.png       ← windowTrain
│   ├── cafe-window-morning-notes.png      ← windowCafe
│   └── rainy-city-street-blur.png         ← windowStreet
├── lifestyle/
│   └── soft-supermarket-diary.png         ← lifestyleSupermarket
├── travel/
│   └── travel-journal-desk-soft.png       ← travelDesk
└── australia/
    └── australia-coast-dreamy-morning.png ← australiaCoast
```

---

## 1. 各圖建議使用區塊

| 檔名 | siteBackgrounds key | 最適合區塊 |
|------|---------------------|------------|
| `tokyo-rain-window-tower.png` | `heroPrimary` / `heroChapterCard` | **品牌意象圖** — 首頁 Hero 章節卡、精選文章、照片牆 |
| `waiting-luggage-window.png` | `heroSecondary` | **Hero 備用圖** — Journey / Working Holiday 主題 |
| `train-window-rain-coffee.png` | `windowTrain` | **通勤 / 打工日常** — 工作與異鄉生活區塊 |
| `cafe-window-morning-notes.png` | `windowCafe` | **文章 / 心情筆記 / About 預覽** |
| `rainy-city-street-blur.png` | `windowStreet` | **Photo Wall 上方 / 東京散步分類** — 過場背景 |
| `soft-supermarket-diary.png` | `lifestyleSupermarket` | **省錢生活 / 超市 / 一人生活** |
| `travel-journal-desk-soft.png` | `travelDesk` | **About / Start Here / 寫作品牌感** |
| `australia-coast-dreamy-morning.png` | `australiaCoast` | **未來澳洲篇章 / Australia 預留入口** |

---

## 2. 哪些適合加白色 overlay

這 8 張圖整體偏亮、低對比，但若要疊文字仍建議加淡色遮罩：

| 圖片 | 建議 overlay | 原因 |
|------|--------------|------|
| `heroPrimary` | ✅ 強烈建議 `rgba(255,255,255,0.45–0.65)` | 畫面細節多，需確保 Hero 標題可讀 |
| `heroSecondary` | ✅ 建議 `rgba(255,255,255,0.4–0.55)` | 右側有行李箱主體，文字區宜放左側並加遮罩 |
| `windowTrain` | ✅ 建議 `rgba(255,255,255,0.35–0.5)` | 適合 section 背景，文字需對比 |
| `windowCafe` | ⚠️ 可選 `rgba(255,255,255,0.25–0.4)` | 本身已很亮，輕 overlay 即可 |
| `windowStreet` | ✅ 建議 `rgba(255,255,255,0.4–0.55)` | 街道細節多，過場用需柔化 |
| `lifestyleSupermarket` | ⚠️ 可選 `rgba(255,255,255,0.3–0.45)` | 高 key 霧面，通常文字可直接疊 |
| `travelDesk` | ⚠️ 可選 `rgba(255,255,255,0.25–0.4)` | 品牌感強，適合低強度 overlay |
| `australiaCoast` | ✅ 建議 `rgba(255,255,255,0.35–0.5)` | 天空與海面漸層，加 overlay 更統一 |

**CSS 範例：**

```css
.section-with-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.5);
  pointer-events: none;
}
```

---

## 3. 哪些適合做 section background

適合整段區塊 `background-image` + `cover`：

- `heroPrimary`、`heroSecondary` — 全寬 Hero
- `windowTrain` — Latest Articles 或打工度假專區
- `windowCafe` — About Preview、心情筆記區
- `windowStreet` — Photo Wall Preview 上方
- `lifestyleSupermarket` — 省錢生活 / Start Here 某一卡片的區塊底
- `travelDesk` — Start Here 整段或 About 頁
- `australiaCoast` — Japan nav 旁的「Coming soon」或 Footer 上方過渡

不建議整頁重複使用同一張，每個主要 section 最多一張即可。

---

## 4. 哪些適合做 card / window frame 背景

「視窗感」圖片特別適合裁進卡片框架：

| 圖片 | card / frame 用法 |
|------|-------------------|
| `windowTrain` | 橫向 article featured 卡右側視窗框 |
| `windowCafe` | About Preview 左側圖框 |
| `windowStreet` | Photo Wall 單張大卡背景 |
| `travelDesk` | Start Here 其中一張卡的封面替換 |
| `heroSecondary` | Working Holiday 主題卡、Journey 入口卡 |

**實作提示：**

- 卡片內用 `border-radius` + `overflow: hidden` 裁切
- 可加 `border: 0.5px solid #E8DED2` 呼應全站細線風格
- 避免在小型 thumbnail 使用 hero 級大圖（載入過重）

---

## 5. 後續 WebP 優化建議

目前保留 **PNG 原檔**，不破壞畫質。上線前可考慮：

### 建議流程

1. **保留 PNG 原檔** 在 `public/images/site/backgrounds/`（或另存 `assets/source/` 備份）
2. **產生 WebP** 作為實際載入格式：

```bash
# 需安裝 sharp-cli 或使用 squoosh / cwebp
npx sharp-cli -i public/images/site/backgrounds/hero/tokyo-rain-window-tower.png \
  -o public/images/site/backgrounds/hero/tokyo-rain-window-tower.webp \
  --webp quality=85
```

3. **建議尺寸（背景用途）**

| 用途 | 最大寬度 | WebP quality |
|------|----------|--------------|
| Hero 全寬 | 1920px | 82–88 |
| Section 背景 | 1600px | 80–85 |
| Card 內框 | 800px | 78–82 |

4. **HTML 雙格式（可選）**

```html
<picture>
  <source srcset="/images/.../tokyo-rain-window-tower.webp" type="image/webp" />
  <img src="/images/.../tokyo-rain-window-tower.png" alt="..." />
</picture>
```

5. **Astro 注意事項**
   - `public/` 內檔案不經過 build 壓縮，需手動或 CI 腳本處理
   - 背景圖用 CSS `background-image` 時，可透過 `siteBackgrounds.ts` 統一管理路徑
   - 首屏 Hero 可考慮 `fetchpriority="high"` 或 preload（若改為 `<img>`）

### 不建議

- 不要用極低 quality（< 70）壓縮 — 會破壞霧面柔和感
- 不要在同一 section 同時載入 2 張以上全尺寸背景圖

---

## 在程式碼中使用

```typescript
import { siteBackgrounds, getBackgroundSrc } from '@/data/siteBackgrounds';

// 讀取完整 metadata
const hero = siteBackgrounds.heroPrimary;

// 只取路徑
const src = getBackgroundSrc('heroPrimary');
```

```astro
---
import { siteBackgrounds } from '@/data/siteBackgrounds';
const { src, alt } = siteBackgrounds.windowCafe;
---
<div class="section" style={`background-image: url(${src})`} role="img" aria-label={alt}></div>
```

---

---

## 如何替換首頁 Hero 章節卡背景

首頁 Hero 右側 **chapter card**（章節卡）使用的是**品牌意象圖**，由 `siteBackgrounds.heroChapterCard` 管理。  
這張圖**不是**文章 cover；單篇文章封面仍由 frontmatter 的 `cover` 欄位控制。

### 步驟

1. 將新圖片放到 `public/images/site/backgrounds/hero/`
2. 使用英文 kebab-case 命名，例如 `tokyo-window-note.png`
3. 更新 `src/data/siteBackgrounds.ts` 的 `heroChapterCard.src`（與可選的 `alt`）
4. 執行 `npm run dev` 或 `npm run dev:host` 預覽首頁
5. 確認無誤後 `npm run build`，再部署

### 範例

```typescript
heroChapterCard: {
  src: '/images/site/backgrounds/hero/tokyo-window-note.png',
  alt: "Soft journal chapter card background for Ren's Life Journal",
  usage: 'homepage hero chapter card',
  tone: 'soft, quiet, journal',
},
```

`HeroSection.astro` 會自動讀取此 key，無需改 component 內硬編碼路徑。

### 與文章 cover 的差異

| 用途 | 設定位置 |
|------|----------|
| 首頁 Hero 章節卡 | `siteBackgrounds.heroChapterCard` |
| 文章列表 / 文章頁封面 | 文章 frontmatter `cover:` |

---

*最後更新：Hero 章節卡素材管理階段*
