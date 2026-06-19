# Ren's Life Journal

記錄打工度假、異鄉生活與城市散步的個人部落格。目前篇章：日本生活筆記（Tokyo）。

**技術：** [Astro](https://astro.build/) 靜態網站 · Markdown content collection · Vercel 部署

---

## 本地開發

```bash
npm install
npm run dev
```

瀏覽器開啟 `http://localhost:4321`

### 手機實機預覽

```bash
npm run dev:host
```

終端機會顯示區域網路 IP，用手機連同一 Wi‑Fi 後開啟該網址。詳見 [`docs/mobile-preview-guide.md`](docs/mobile-preview-guide.md)。

---

## 常用指令

| 指令 | 說明 |
|------|------|
| `npm run dev` | 本地開發伺服器 |
| `npm run dev:host` | 開發伺服器（允許區域網路存取） |
| `npm run build` | 建置正式站至 `dist/` |
| `npm run preview` | 預覽 build 結果 |
| `npm run new:article -- "文章標題"` | 半自動建立新文章與圖片資料夾 |

---

## 內容資料位置

| 類型 | 路徑 |
|------|------|
| 文章 Markdown | `src/content/articles/` |
| 文章圖片 | `public/images/posts/{slug}/` |
| 網站基本資訊 / About | `src/data/siteProfile.ts` |
| 首頁文案 | `src/data/siteCopy.ts` |
| 外部 / 社群連結 | `src/data/externalLinks.ts` |
| Start Here 三張卡 | `src/data/startHere.ts` |
| 照片牆 | `src/data/photos.ts` + `public/images/photos/` |

內容管理詳見 [`CONTENT_GUIDE.md`](CONTENT_GUIDE.md)。

---

## 部署

本站部署至 **Vercel**，從 GitHub repo 自動 build。設定與驗收步驟見 [`docs/deployment-guide.md`](docs/deployment-guide.md)。

上線前檢查清單：[`docs/prelaunch-checklist.md`](docs/prelaunch-checklist.md)

---

## 相關文件

- [`CONTENT_GUIDE.md`](CONTENT_GUIDE.md) — 如何新增文章、照片、外部連結
- [`docs/deployment-guide.md`](docs/deployment-guide.md) — GitHub + Vercel 部署
- [`docs/vercel-post-deploy-checklist.md`](docs/vercel-post-deploy-checklist.md) — 部署後驗收 Checklist（A–L）
- [`docs/cms-roadmap.md`](docs/cms-roadmap.md) — 未來 CMS 路線（現階段不實作）
