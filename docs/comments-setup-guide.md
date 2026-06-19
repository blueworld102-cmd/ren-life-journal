# Giscus 留言區設定指南

文章頁已預留 `GiscusComments.astro`。**未設定環境變數時，前台不顯示留言區、不會報錯。**

---

## 你需要完成的 GitHub 設定

### 1. 開啟 Discussions

1. 前往 https://github.com/blueworld102-cmd/ren-life-journal/settings
2. **General** → **Features** → 勾選 **Discussions**
3. 建立分類，建議命名：**Article Comments**

### 2. 安裝 giscus App

1. https://github.com/apps/giscus
2. **Install** → 只選 `ren-life-journal`

### 3. 取得 repo-id 與 category-id

1. 開啟 https://giscus.app/zh-TW
2. Repository：`blueworld102-cmd/ren-life-journal`
3. Category：選 **Article Comments**
4. Page ↔ Discussions mapping：**pathname**
5. 複製畫面上的：
   - `data-repo-id`
   - `data-category-id`

---

## 環境變數（Vercel + 本地）

在 Vercel → Project → Settings → Environment Variables 新增：

| 變數 | 範例值 |
|------|--------|
| `PUBLIC_GISCUS_REPO` | `blueworld102-cmd/ren-life-journal` |
| `PUBLIC_GISCUS_REPO_ID` | （從 giscus.app 複製） |
| `PUBLIC_GISCUS_CATEGORY` | `Article Comments` |
| `PUBLIC_GISCUS_CATEGORY_ID` | （從 giscus.app 複製） |

本地開發可建 `.env`（勿 commit）：

```env
PUBLIC_GISCUS_REPO=blueworld102-cmd/ren-life-journal
PUBLIC_GISCUS_REPO_ID=你的repo_id
PUBLIC_GISCUS_CATEGORY=Article Comments
PUBLIC_GISCUS_CATEGORY_ID=你的category_id
```

設定完成後重新 deploy，文章頁底部會出現留言區。

---

## 元件位置

`src/pages/articles/[...slug].astro`：

- 上一篇／下一篇（`ArticlePostNav`）下方
- 相關文章（`ArticleRelated`）上方

---

## 審核

在 GitHub → Discussions → **Article Comments** 管理留言、鎖帖、刪除。

---

*相關：[`comments-plan.md`](./comments-plan.md)*
