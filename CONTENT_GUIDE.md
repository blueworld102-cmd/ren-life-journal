# 內容管理指南

本網站使用 **Astro Content Collection** 管理文章，以 **Markdown / MDX** 撰寫。照片牆目前由 `src/data/photos.ts` 集中管理。網站基本資訊、首頁文案、外部連結則由 `src/data/` 下的資料檔維護。本文說明如何長期新增、修改與預覽內容。

---

## 專案內容結構一覽

| 類型 | 路徑 | 說明 |
|------|------|------|
| 網站基本資訊 | `src/data/siteProfile.ts` | 站名、簡介、About 文案、聯絡方式 |
| 首頁文案 | `src/data/siteCopy.ts` | Hero、Latest、Photo Wall、Start Here 標題 |
| Start Here 卡片 | `src/data/startHere.ts` | 首頁三張入門卡資料 |
| 外部連結 | `src/data/externalLinks.ts` | 社群、音樂等外部連結 |
| 文章 | `src/content/articles/` | 所有正式文章 `.md` / `.mdx` |
| 文章 schema | `src/content.config.ts` | 欄位驗證與 category enum |
| 文章模板 | `src/content/articles/_template.md` | 參考格式（`draft: true`，不會上線） |
| 文章封面與內文圖 | `public/images/posts/{slug}/` | 每篇文章專屬資料夾 |
| 照片牆圖 | `public/images/photos/` | 照片牆專用圖檔 |
| 照片資料 | `src/data/photos.ts` | 照片牆 metadata 與連結 |
| 文章工具 | `src/utils/articles.ts` | 排序、篩選、搜尋文字組裝 |
| 新增文章腳本 | `scripts/new-article.mjs` | `npm run new:article` |
| 站長操作指南 | `src/pages/admin-help.astro` | `/admin-help`（不在主選單，Footer 低調連結） |

**路由對照：**

- 文章列表：`/articles`
- 單篇文章：`/articles/{slug}/`（slug = 檔名不含副檔名）
- 照片牆：`/photos`

---

## 如何修改 About 資訊

編輯 **`src/data/siteProfile.ts`**：

- `shortBio`：首頁 About Preview 簡介
- `longBio`：About 頁 SEO 描述與摘要
- `aboutPage`：About 頁完整段落（自我介紹、Why This Blog、聯絡方式）
- `contactLabel`：Email 欄位顯示文字
- `siteTitle` / `siteSubtitle`：Header、Footer、SEO 預設標題

修改後執行 `npm run dev` 預覽 About 頁與首頁。

---

## 如何新增外部連結

編輯 **`src/data/externalLinks.ts`**：

1. 找到對應平台（如 Instagram）
2. 將 `href` 填入完整 URL（例如 `https://instagram.com/your_handle`）
3. 將 `isActive` 改為 `true`

規則：

- `href` 為空或 `isActive: false` 時，**不會**在 About 頁與 Footer 顯示
- 請勿填入假連結；未準備好前保持 `isActive: false`
- 連結會以文字形式顯示，並帶 `target="_blank"` 與 `rel="noopener noreferrer"`

---

## 一、如何新增一篇文章

### 推薦：使用腳本半自動建立

```bash
npm run new:article -- "文章標題"
```

腳本會自動：

1. 依標題產生 slug（純中文標題會產生 `draft-YYYY-MM-DD-HHMM` 格式，建議之後手動改檔名）
2. 建立 `src/content/articles/{slug}.md`
3. 建立 `public/images/posts/{slug}/` 資料夾
4. 填入 frontmatter 預設值（`draft: true`）

若檔案已存在，腳本會報錯且不覆蓋。

### 手動步驟（腳本建立後）

1. **編輯 frontmatter**（檔案最上方 `---` 區塊）  
   填入描述、分類、標籤等（見下方欄位說明）。

2. **撰寫正文**  
   在第二個 `---` 之後用 Markdown 寫內容。

3. **放入圖片**（見下方「如何替文章新增照片」）

4. **確認 draft**  
   準備發布時，將 `draft: false`。

5. **本地預覽**
   ```bash
   npm run dev
   ```
   開啟 `http://localhost:4321/articles/{slug}/`

6. **建置確認**
   ```bash
   npm run build
   ```

### 傳統方式：複製模板

若不想用腳本，仍可複製 `_template.md` 後改名，但建議優先使用 `npm run new:article`。

---

## 二、文章檔案應該放在哪個資料夾

```
src/content/articles/
├── _template.md          ← 模板，勿直接發布
├── shibuya-ward-office-rainy-day.md
├── job-interview-practice.md
└── ...
```

> 注意：本專案 collection 名稱是 `articles`，資料夾是 `src/content/articles/`，不是 `src/content/articles/`。

---

## 三、檔名 slug 命名規則

- 使用 **小寫英文 + 連字號**，例如：`tokyo-monthly-expenses.md`
- 避免中文、空格、大寫、特殊符號
- slug 即網址：`/articles/tokyo-monthly-expenses/`
- 檔名一旦上線，**不建議隨意更改**（會改變 URL）；若必須更改，需自行處理重新導向

**好的範例：**
- `harajuku-rainy-walk.md`
- `working-holiday-first-five-things.md`

**避免：**
- `雨天散步.md`
- `Post 01.md`
- `FINAL_v2.md`

---

## 四、frontmatter 必填欄位

以下欄位在 `src/content.config.ts` 中為必填或強烈建議填寫：

| 欄位 | 必填 | 說明 | 範例 |
|------|------|------|------|
| `title` | ✅ | 文章標題 | `'雨天去澀谷區役所的那一天'` |
| `description` | ✅ | 摘要，用於 SEO 與卡片 | `'帶著濕掉的文件走進區役所…'` |
| `pubDate` | ✅ | 發布日期 | `'2026-06-19'` |
| `category` | ✅ | 分類（見下方清單） | `'心情筆記'` |
| `tags` | ✅ | 標籤陣列 | `['東京生活', '區役所']` |
| `draft` | — | 預設 `false` | `true` = 草稿，不上線 |

**建議填寫（網站特色 metadata）：**

| 欄位 | 說明 |
|------|------|
| `location` | 地點，如 `'東京・澀谷'` |
| `weather` | 天氣，如 `'雨'`、`'晴'` |
| `mood` | 心情，如 `'緊張但有一點安心'` |
| `season` | 季節，如 `'初夏'` |
| `cover` | 封面圖路徑 |
| `coverPosition` | 封面裁切焦點，如 `center`、`top`、`60% 40%`（預設 `center`） |
| `readingTime` | 閱讀時間，如 `'6 分鐘'` |
| `updatedDate` | 最後更新日期 |

**選填進階欄位：**

| 欄位 | 說明 |
|------|------|
| `cost` | 數字，花費紀錄 |
| `difficulty` | `'低'` / `'中'` / `'高'` |
| `usefulFor` | 適合誰閱讀的字串陣列 |

---

## 五、category 可用清單

必須完全符合以下其中一項（定義於 `src/content.config.ts`）：

1. `日本生活`
2. `日本生活手續`
3. `打工度假`
4. `東京散步`
5. `旅遊紀錄`
6. `省錢生活`
7. `工作與職涯`
8. `心情筆記`

填錯會在 `npm run dev` / `npm run build` 時出現 schema 驗證錯誤。

---

## 六、tags 命名規則

- 使用 **繁體中文** 或 **中英混合**，與內容主題一致
- 每篇建議 **3–6 個** 標籤
- 優先重用既有標籤（可在 `/articles` 頁面下方 chip 查看現有標籤）
- 避免過於籠統：`生活`、`日本`；改用具體詞：`區役所`、`自炊`、`面試`
- 不要用 `#` 前綴，直接寫字串陣列

```yaml
tags: ['東京生活', '打工度假', '區役所', '雨天']
```

---

## 七、如何設定 draft

```yaml
draft: true   # 草稿：不會出現在首頁、列表、RSS、sitemap 路由
draft: false  # 正式發布（可省略，預設 false）
```

草稿文章：
- ❌ 不會出現在首頁 Latest Articles
- ❌ 不會出現在 `/articles` 列表
- ❌ 不會產生 `/articles/{slug}/` 靜態頁
- ❌ 不會進入 RSS

模板 `_template.md` 預設 `draft: true`，複製後記得改掉。

---

## 八、如何設定 cover image

1. 將封面圖放入 `public/images/posts/{slug}/cover.png`（`npm run new:article` 會自動建立資料夾）
2. frontmatter 設定：

```yaml
cover: '/images/posts/your-slug/cover.png'
coverPosition: 'center'   # 可選：top / center / bottom
```

3. 舊文章若仍使用 `public/images/covers/`，可維持原路徑；新文章建議統一用 `posts/{slug}/`

**建議尺寸：**
- 比例 **3:2** 或 **16:9**
- 寬度 **1200–1600px**
- 格式 WebP / JPG，檔案盡量 < 300KB

**裁切焦點（選填）：**

```yaml
coverPosition: 'center'      # 預設
coverPosition: 'top'
coverPosition: '60% 40%'     # 自訂 object-position
```

---

## 如何替文章新增照片

建議每篇文章使用**專屬資料夾**整理圖片，方便長期維護。

### 1. 文章圖片放置路徑

```
public/images/posts/{article-slug}/
```

`article-slug` = 文章檔名（不含 `.md`），例如 `shibuya-ward-office-rainy-day`。

### 2. 建議檔案命名

| 檔案 | 用途 |
|------|------|
| `cover.png` | 文章封面（也可放 `public/images/covers/`） |
| `01.png` | 正文第一張圖 |
| `02.png` | 正文第二張圖 |
| `03.png` | 依序遞增 |

### 3. frontmatter cover 寫法

```yaml
cover: '/images/posts/shibuya-ward-office-rainy-day/cover.png'
```

### 4. 文章內插圖 Markdown 寫法

```markdown
![澀谷區役所門口的雨景](/images/posts/shibuya-ward-office-rainy-day/01.png)
```

### 5. 圖片命名規則

- 英文小寫
- kebab-case（連字號分隔）
- 不使用空格
- 不使用中文檔名
- 不使用 `IMG_1234` 這種相機原始名稱

**好的範例：** `rainy-street.png`、`cafe-window-02.jpg`  
**避免：** `雨天街道.png`、`IMG_4521.JPG`、`photo final.jpg`

### 6. 建議尺寸

| 用途 | 建議 |
|------|------|
| cover | 1200×800 或 1600×1067，比例 **3:2** |
| 文章內圖 | 寬 **1200px** 以上，保持比例 |
| Photo Wall | 建議 **4:5** 或 **1:1** 直式 |

格式優先 **WebP** 或 **JPG**，單檔建議 < 500KB。

### 7. 每張圖都要有 alt 文字

- 封面：在 frontmatter 的 `title` 會作為 alt 備援，但正文圖請寫清楚描述
- Markdown：`![具體畫面描述](/images/posts/...)` 
- 照片牆：`src/data/photos.ts` 的 `alt` 欄位必填

alt 應描述**畫面內容**，不要只重複標題。

---

## 九、如何在文章內插入圖片

1. 將圖片放入 `public/images/posts/`
2. 在 Markdown 中使用相對路徑：

```markdown
![澀谷區役所門口](./shibuya-ward-office.jpg)
```

專案內建 remark plugin 會自動將相對路徑轉為 `/images/shibuya-ward-office.jpg`（見 `astro.config.mjs`）。

也可直接寫絕對路徑：

```markdown
![澀谷區役所門口](/images/posts/shibuya-ward-office.jpg)
```

**建議：**
- 正文圖放 `public/images/posts/`
- 封面放 `public/images/covers/`
- 每張圖都寫有意義的 alt 文字

---

## 十、如何連結到其他文章

使用 Markdown 連結，路徑格式為 `/articles/{slug}/`：

```markdown
之前寫過一篇 [原宿雨天散步](/articles/harajuku-rainy-walk/)，那天的心情很像。
```

slug 就是 `src/content/articles/` 裡的檔名（不含 `.md`）。

---

## 十一、如何預覽與確認文章

### 本地開發（電腦）

```bash
npm run dev
```

| 檢查項目 | 網址 |
|----------|------|
| 首頁 Latest Articles | `http://localhost:4321/` |
| 文章列表 + 搜尋 | `http://localhost:4321/articles` |
| 單篇文章 | `http://localhost:4321/articles/{slug}/` |
| 分類篩選 | `http://localhost:4321/articles?category=心情筆記` |
| 搜尋 | `http://localhost:4321/articles?search=區役所` |

### 手機實機預覽

手機**不能**使用 `localhost`，請改用區網 IP。詳見 [docs/mobile-preview-guide.md](docs/mobile-preview-guide.md)。

快速步驟：

1. 電腦與手機連同一個 Wi-Fi
2. 執行 `npm run dev:host`
3. Windows 執行 `ipconfig`，找到 IPv4 Address
4. 手機開啟 `http://電腦IPv4:4321`（例如 `http://192.168.1.42:4321`）
5. 若無法連線，檢查 Windows 防火牆是否允許 Node.js

### 建置前檢查清單

- [ ] `draft: false`
- [ ] `title`、`description`、`pubDate`、`category`、`tags` 已填
- [ ] `category` 符合 enum 清單
- [ ] 封面與內文圖片路徑正確、檔案存在
- [ ] `npm run build` 無錯誤
- [ ] 手機寬度下卡片與內文可讀

---

## 十二、如何修改既有文章

1. 開啟 `src/content/articles/{slug}.md`
2. 修改 frontmatter 或正文
3. 若有大幅更新，補上 `updatedDate: '2026-06-20'`
4. `npm run dev` 預覽 → `npm run build` 確認

**不要改 slug 檔名**，除非你知道會影響既有連結。

---

# 照片牆管理

照片目前不由 content collection 管理，而是集中在 `src/data/photos.ts`。

## 1. 如何新增照片牆照片

1. 將圖片放入 `public/images/photos/`（或文章相關圖放 `public/images/posts/` 後引用）
2. 開啟 `src/data/photos.ts`
3. 在 `PHOTOS` 陣列末尾新增一筆物件
4. 首頁預覽自動顯示 `PHOTOS` 的前 6 張（`PHOTO_PREVIEW_ITEMS`）
5. 完整照片牆頁 `/photos` 顯示全部 `PHOTOS`

```typescript
{
  title: '雨後的街道倒影',
  image: '/images/photos/umbrella-street.jpg',
  date: '2025-11-08',
  location: '東京・神樂坂',
  weather: '雨',
  mood: '鬆了一口氣',
  tags: ['雨天', '街道', '神樂坂'],
  alt: '雨後神樂坂石板路，水窪倒映路燈',
  relatedPost: '/articles/harajuku-rainy-walk',  // 選填
  imagePosition: 'center',  // 選填，裁切焦點
},
```

## 2. 照片檔案命名規則

- 小寫英文 + 連字號：`harajuku-rain.jpg`
- 依主題命名，避免 `IMG_1234.jpg`
- 同一主題系列可加前綴：`cafe-01.jpg`、`cafe-02.jpg`

## 3. 照片建議尺寸

| 用途 | 建議 |
|------|------|
| 照片牆格線 | 4:5 直式，寬 800–1200px |
| 首頁預覽 | 4:3，寬 800px 以上 |
| 文章內文 | 寬 1200px，保持比例 |

格式優先 **WebP** 或 **JPG**，單檔建議 < 500KB。

## 4. 如何讓照片連到文章

在照片物件加上 `relatedPost`：

```typescript
relatedPost: '/articles/shibuya-ward-office-rainy-day',
```

- 首頁 Photo Wall Preview：有 `relatedPost` 的卡片會變成可點擊連結
- `/photos` 完整頁：顯示「相關文章 →」文字連結

## 5. 如何替照片加 alt 文字

每筆照片必填 `alt` 欄位，描述畫面內容（不是標題重複）：

```typescript
alt: '澀谷清晨街道，行人撐傘走向車站',
```

這會寫入 `<img alt="...">`，有助於 accessibility 與 SEO。

---

# 搜尋功能說明

- **首頁 / 其他頁面**：右上角搜尋框輸入後按 Enter → 跳轉 `/articles?search=關鍵字`
- **文章列表頁 `/articles`**：即時前端篩選，不需後端

搜尋範圍（已實作於 `src/utils/articles.ts` → `buildSearchText`）：

- title、description、category、tags
- location、weather、mood、season

可搭配分類 / 標籤 chip 一起篩選。

---

# 未來若接 Notion（目前不做）

以下為日後整合參考，**現階段請維持 Markdown content collection**。

### 可能新增的檔案

| 檔案 | 用途 |
|------|------|
| `src/lib/notion/client.ts` | Notion API 客戶端 |
| `src/lib/notion/mapArticle.ts` | Notion properties → article schema 轉換 |
| `src/lib/notion/mapPhoto.ts` | Notion → photo 資料轉換 |
| `src/content/loaders/notion.ts` | 自訂 Astro content loader |
| `scripts/sync-notion.ts` | 建置前同步腳本（CI 用） |

### 環境變數

```
NOTION_API_KEY=secret_xxx
NOTION_ARTICLES_DATABASE_ID=xxx
NOTION_PHOTOS_DATABASE_ID=xxx   # 若照片也放 Notion
```

### Notion 資料庫建議欄位（對應現有 schema）

**Articles DB：** Title, Description, PubDate, UpdatedDate, Category (select), Tags (multi-select), Location, Weather, Mood, Season, Cover (files), ReadingTime, Draft (checkbox), Slug, Body (page content)

**Photos DB：** Title, Image (files), Date, Location, Weather, Mood, Tags, Alt, RelatedPost (relation or URL)

### 需注意的議題

- Notion 圖片 URL 有時效，需下載到 `public/images/` 或使用 CDN
- 建置時間會依 API 請求增加
- 本地開發需 `.env`，部署平台（Vercel / Netlify）也要設定相同變數
- Category enum 需與 Notion select 選項同步

---

# 常見問題

**Q: 新增文章後首頁沒出現？**  
A: 確認 `draft: false`，且 `pubDate` 是否夠新（首頁只顯示最新 5 篇）。

**Q: build 報 category 錯誤？**  
A: category 必須完全符合 enum，見「五、category 可用清單」。

**Q: 圖片顯示不出來？**  
A: 確認檔案在 `public/images/` 下，路徑以 `/images/` 開頭。

**Q: 模板會不會被當成正式文章？**  
A: `_template.md` 設為 `draft: true`，不會上線。建議用 `npm run new:article` 建立新檔，或複製模板後改名。

---

*最後更新：Content Admin Foundation 階段*
