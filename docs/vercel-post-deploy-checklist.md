# Ren's Life Journal｜Vercel 部署後驗收 Checklist

## A. 本機部署前確認

* [ ] 已安裝 Git for Windows
* [ ] 在專案資料夾執行成功：

```bash
npm run check:assets
npm run build
```

* [ ] `npm run check:assets` 通過
* [ ] `npm run build` 通過
* [ ] 確認 `.gitignore` 有排除：

  * [ ] `node_modules/`
  * [ ] `dist/`
  * [ ] `.astro/`
  * [ ] `.env`

---

## B. Git 初始化與 Commit

在專案資料夾執行：

```bash
cd c:\Users\bluew\Downloads\japan-wh-blog
git init
git add .
git commit -m "Initial release of Ren's Life Journal"
```

檢查：

* [ ] `git init` 成功
* [ ] `git add .` 成功
* [ ] `git commit` 成功
* [ ] commit 內沒有 `node_modules`
* [ ] commit 內沒有 `dist`
* [ ] commit 內沒有 `.env`

---

## C. GitHub Repository

到 GitHub 建立新 repo：

Repository name:

```txt
ren-life-journal
```

設定：

* [ ] Public 或 Private 皆可
* [ ] 不勾選 Add README
* [ ] 不勾選 Add .gitignore
* [ ] 不勾選 License

建立後，在本機執行：

```bash
git remote add origin https://github.com/你的帳號/ren-life-journal.git
git branch -M main
git push -u origin main
```

檢查：

* [ ] GitHub repo 有成功看到檔案
* [ ] `src/` 存在
* [ ] `public/` 存在
* [ ] `docs/` 存在
* [ ] `package.json` 存在
* [ ] `node_modules/` 沒有被推上去
* [ ] `dist/` 沒有被推上去

---

## D. Vercel Import 設定

在 Vercel Import GitHub repo。

設定：

```txt
Framework Preset: Astro
Install Command: npm install
Build Command: npm run build
Output Directory: dist
Node Version: 22.x
```

檢查：

* [ ] Vercel 成功連到 GitHub repo
* [ ] Framework 顯示 Astro
* [ ] Build Command 是 `npm run build`
* [ ] Output Directory 是 `dist`
* [ ] Node 版本使用 22.x
* [ ] Deploy 成功

---

## E. 正式 URL 檢查

預期正式 URL：

```txt
https://ren-life-journal.vercel.app
```

檢查：

* [ ] Vercel 實際 URL 是否為 `https://ren-life-journal.vercel.app`
* [ ] 若不是，需同步修改：

  * [ ] `astro.config.mjs`
  * [ ] `src/consts.ts`
  * [ ] `public/robots.txt`
* [ ] 修改後重新 commit / push / deploy

---

## F. 部署後逐頁驗收

請逐一打開：

* [ ] `/`
* [ ] `/articles`
* [ ] `/articles/shibuya-ward-office-rainy-day/`
* [ ] `/photos`
* [ ] `/about`
* [ ] `/404`
* [ ] `/robots.txt`
* [ ] `/rss.xml`
* [ ] `/sitemap-index.xml`
* [ ] `/admin-help`

每頁確認：

* [ ] 頁面能正常開啟
* [ ] 沒有 404
* [ ] 圖片正常顯示
* [ ] favicon 正常顯示
* [ ] 版面沒有破掉
* [ ] 手機版可正常瀏覽
* [ ] 沒有空外部連結
* [ ] 沒有 `example.com`
* [ ] 沒有 `Lorem ipsum`
* [ ] 沒有 `Markdown Style Guide`

---

## G. Admin Help 檢查

`/admin-help` 可以存在，但需確認：

* [ ] 頁面可開啟
* [ ] 有 `noindex, nofollow`
* [ ] 不出現在 sitemap
* [ ] 不出現在正式站 Footer
* [ ] 不出現在主選單

---

## H. 文章與圖片檢查

第一篇文章：

```txt
/articles/shibuya-ward-office-rainy-day/
```

檢查：

* [ ] 標題正確
* [ ] description 正確
* [ ] 日期正確
* [ ] 地點 / 天氣 / 心情 metadata 正確
* [ ] cover 圖正常顯示
* [ ] tags 正常顯示
* [ ] 上一篇 / 下一篇正常
* [ ] 回到 Journal 按鈕正常
* [ ] 回到首頁按鈕正常

---

## I. OG 分享測試

測試網址：

```txt
https://ren-life-journal.vercel.app/
https://ren-life-journal.vercel.app/articles/shibuya-ward-office-rainy-day/
```

檢查：

* [ ] `og:title`
* [ ] `og:description`
* [ ] `og:image`
* [ ] `og:url`
* [ ] `twitter:card`
* [ ] `article:published_time`

如果分享圖沒有更新：

* [ ] 使用 [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
* [ ] 點 Scrape Again
* [ ] 等待平台快取更新

---

## J. 手機版最後確認

請用手機打開正式網址：

```txt
https://ren-life-journal.vercel.app
```

檢查：

* [ ] Header 沒有被遮擋
* [ ] Home / Journal / Japan / Photos / About 可點
* [ ] 首頁 Hero 正常
* [ ] Start Here 卡片不擠
* [ ] Journal 頁搜尋可用
* [ ] 文章頁好閱讀
* [ ] 圖片沒有超出螢幕
* [ ] Footer 正常
* [ ] Safari 底部工具列不遮重要按鈕

---

## K. 正式公開前提醒

目前可以部署測試，但正式公開宣傳前建議替換：

* [ ] 第一篇文章 cover.png
* [ ] Hero chapter card 背景
* [ ] Start Here 三張卡圖片
* [ ] Photo Wall 圖片
* [ ] About 頁個人照片或意象圖
* [ ] Instagram / Threads / YouTube 連結

---

## L. 上線後下一步

部署完成後可以進行：

* [ ] 發布第一篇正式文章
* [ ] 設定 Vercel Analytics
* [ ] 提交 sitemap 到 Google Search Console
* [ ] 測試 Threads / LINE / Facebook 分享卡片
* [ ] 替換正式 cover 圖
* [ ] 新增第二篇文章草稿

---

## 相關文件

| 文件 | 用途 |
|------|------|
| [`deployment-guide.md`](./deployment-guide.md) | GitHub + Vercel 步驟與 OG 測試說明 |
| [`prelaunch-checklist.md`](./prelaunch-checklist.md) | 上線前 SEO / 圖片資產檢查 |
| [`link-checklist.md`](./link-checklist.md) | 關鍵連結 QA |

*最後更新：Vercel 部署後驗收階段*
