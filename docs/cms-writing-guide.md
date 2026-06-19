# CMS 寫作指南

Ren's Life Journal 後台：**https://ren-life-journal.vercel.app/admin/**

登入後進入「生活文章」即可新增或編輯文章。儲存後會自動 commit 到 GitHub，Vercel 會接著部署網站。

---

## 如何新增文章

1. 開啟 https://ren-life-journal.vercel.app/admin/ 並登入（DecapBridge / GitHub）。
2. 左側選 **生活文章** → 右上角 **New 生活文章**。
3. 依序填寫欄位（建議順序）：
   - **標題**：文章名稱
   - **草稿**：新文章建議先勾選（見下方 draft 說明）
   - **發布日期**：用日曆選日期即可
   - **摘要**：一兩句話，會出現在文章列表
   - **分類**、**標籤**、**地點**、**天氣**、**心情**、**閱讀時間**：依需要填寫
   - **封面圖片**：上傳主視覺（見下方說明）
   - **正文**：用 Markdown 撰寫內文
4. 右上角 **Publish**（或 **Save**）儲存。
5. 檔案會出現在 repo：`src/content/articles/你的-slug.md`

**小提示：** 檔名（slug）通常由標題自動產生。英文或拼音 slug 較不易出現亂碼，但中文 slug 也可使用。

---

## 如何上傳封面

1. 在文章編輯頁找到 **封面圖片** 欄位。
2. 點 **Choose an image** → 選擇本機照片上傳。
3. 上傳後 CMS 會：
   - 把檔案存到 `public/images/uploads/`
   - 在 frontmatter 寫入路徑，例如：`/images/uploads/my-cover.jpg`
4. **封面位置** 可選置中 / 偏上 / 偏下，調整裁切焦點。

內文若要插圖，在 **正文** Markdown 編輯器用圖片按鈕上傳即可，同樣會進 `public/images/uploads/`。

---

## draft `true` / `false` 差別

| 設定 | 意思 | 網站上的效果 |
|------|------|----------------|
| `draft: true`（草稿打勾） | 還在寫、尚未公開 | **不會**出現在首頁、Journal 列表、RSS；直接網址也找不到 |
| `draft: false`（草稿取消） | 正式發布 | 出現在 Journal、相關推薦；可依發布日期排序 |

**建議流程：**

1. 新文章先保持 **草稿 = true**，邊寫邊存。
2. 內容、封面、摘要都確認後，取消草稿並 **Publish**。
3. 等 Vercel 部署完成（約 1～3 分鐘）再到網站驗收。

---

## 發布後去哪裡看 commit 與 deploy

### GitHub commit

1. 開啟 repo：https://github.com/blueworld102-cmd/ren-life-journal
2. 點 **Commits** 或首頁最新 commit 列表。
3. CMS 儲存後的訊息通常類似：
   - `Create articles "xxx" - 你的名字 via DecapBridge`
   - `Update articles "xxx" - 你的名字 via DecapBridge`
4. 點進 commit 可看到改了哪個 `.md` 檔與上傳了哪些圖片。

### Vercel 部署

1. 開啟 Vercel 專案 dashboard（連到 `ren-life-journal` 的那個專案）。
2. **Deployments** 分頁會出現每次 push 後的自動部署。
3. 狀態 **Ready** 表示已上線；點進去可看 build log。
4. 正式網址：https://ren-life-journal.vercel.app/

**驗收路徑：**

- 文章列表：https://ren-life-journal.vercel.app/articles/
- 單篇文章：`https://ren-life-journal.vercel.app/articles/你的-slug/`

若剛發布卻看不到，先確認 **草稿已關閉**，再等 Vercel 部署完成，必要時強制重新整理（Ctrl+F5）。

---

## 常見問題

**Q：改了文章但網站沒變？**  
A：到 GitHub 看 commit 是否成功；到 Vercel 看最新 deployment 是否 Ready。

**Q：封面破圖？**  
A：確認 frontmatter 的 `cover` 是 `/images/uploads/...` 開頭，且檔案有一起 commit 上去。

**Q：預覽面板不見了？**  
A：後台已關閉 CMS 內建 preview，請以正式網站為準驗收。

**Q：還需要改程式碼嗎？**  
A：日常寫作用 CMS 即可。首頁文案、全站設定等仍須在 repo 裡編輯（見 `docs/cms-setup-guide.md`）。
