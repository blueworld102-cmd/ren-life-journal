# Giscus 留言區設定指南

文章頁已嵌入 `GiscusComments.astro`。**未設定環境變數時不顯示留言區、不造成 build error。**

標題顯示為：**留言與回應**

---

## 元件行為確認

| 項目 | 狀態 |
|------|------|
| 未設定 env 時不顯示 | ✅ |
| 不造成 build error | ✅ |
| 文章頁已嵌入 | ✅ |
| 位置：正文後 → 上一篇下一篇 → 留言 → 相關文章 | ✅ |
| repo-id / category-id 使用環境變數，非寫死 | ✅ |

---

## 設定步驟

### 1. GitHub repo 開啟 Discussions

1. https://github.com/blueworld102-cmd/ren-life-journal/settings
2. **General** → **Features** → 勾選 **Discussions**
3. 建立分類：**Article Comments**

### 2. 安裝 giscus App

1. https://github.com/apps/giscus
2. **Install** → 只選 `ren-life-journal`

### 3. 到 giscus.app 取得 ID

1. 開啟 https://giscus.app/zh-TW
2. Repository：`blueworld102-cmd/ren-life-journal`
3. Category：**Article Comments**
4. Mapping：**pathname**
5. 複製以下值（**不要寫進程式碼**）：
   - `data-repo` → `PUBLIC_GISCUS_REPO`
   - `data-repo-id` → `PUBLIC_GISCUS_REPO_ID`
   - `data-category` → `PUBLIC_GISCUS_CATEGORY`
   - `data-category-id` → `PUBLIC_GISCUS_CATEGORY_ID`

### 4. Vercel 環境變數

**Project → Settings → Environment Variables → Production**

| 變數 | 範例 |
|------|------|
| `PUBLIC_GISCUS_REPO` | `blueworld102-cmd/ren-life-journal` |
| `PUBLIC_GISCUS_REPO_ID` | （giscus.app 提供） |
| `PUBLIC_GISCUS_CATEGORY` | `Article Comments` |
| `PUBLIC_GISCUS_CATEGORY_ID` | （giscus.app 提供） |

本地 `.env`（勿 commit）：

```env
PUBLIC_GISCUS_REPO=blueworld102-cmd/ren-life-journal
PUBLIC_GISCUS_REPO_ID=你的repo_id
PUBLIC_GISCUS_CATEGORY=Article Comments
PUBLIC_GISCUS_CATEGORY_ID=你的category_id
```

### 5. 重新部署

Vercel → Deployments → **Redeploy**（或 push 任一 commit）

### 6. 測試第一篇文章留言區

1. 開啟 https://ren-life-journal.vercel.app/articles/shibuya-ward-office-rainy-day/
2. 捲到「留言與回應」區塊
3. 用 GitHub 帳號登入並發一則測試留言
4. 到 GitHub Discussions → Article Comments 確認出現

---

## 審核

在 GitHub → Discussions 管理留言、鎖帖、刪除。

---

*相關：[`comments-plan.md`](./comments-plan.md)*
