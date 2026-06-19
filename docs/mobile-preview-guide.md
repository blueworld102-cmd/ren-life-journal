# 手機預覽開發指南

在實機上預覽 Astro 開發站時，**不能**使用 `http://localhost:4321/`。本文件說明原因與正確做法。

---

## 為什麼手機不能用 localhost:4321？

`localhost` 永遠指向**目前這台裝置自己**。

- 在電腦瀏覽器輸入 `localhost` → 連到電腦上的 dev server ✅
- 在手機輸入 `localhost` → 連到手機自己（通常沒有 Astro 在跑）❌

因此手機必須透過**開發電腦的區網 IP** 連線。

---

## 正確手機預覽網址格式

```
http://192.168.x.x:4321
```

將 `192.168.x.x` 換成你電腦在 Wi-Fi 下的 IPv4 位址。

範例：

```
http://192.168.1.42:4321/
http://192.168.0.15:4321/articles/
```

> 使用 **http**，不是 https。Astro dev server 預設不提供 HTTPS。

---

## 步驟一：電腦與手機連同一個 Wi-Fi

兩台裝置必須在同一個區域網路（同一個家用路由器 / 同一個 SSID）。

---

## 步驟二：啟動區網可連線的 dev server

在本專案根目錄執行：

```bash
npm run dev:host
```

此指令等同：

```bash
astro dev --host 0.0.0.0
```

`0.0.0.0` 代表監聽所有網路介面，讓區網內其他裝置可以連進來。

若只用 `npm run dev`（未加 `--host`），dev server 可能只綁定 `127.0.0.1`，手機將無法連線。

**如何確認有成功開啟區網模式：**

終端機應顯示類似：

```
┃ Local    http://localhost:4321/
┃ Network  http://192.168.2.40:4321/
```

若只看到：

```
┃ Network  use --host to expose
```

代表你跑的是 `npm run dev`，請改執行 `npm run dev:host`。

**手機請優先使用 terminal 顯示的 Network URL**，不要自己猜 IP。

---

## 步驟三：在 Windows 查詢 IPv4 位址

開啟 PowerShell 或命令提示字元，執行：

```bash
ipconfig
```

找到目前連線中 Wi-Fi 介面的 **IPv4 Address**，例如：

```
無線區域網路介面卡 Wi-Fi:

   IPv4 位址 . . . . . . . . . . . . : 192.168.1.42
```

**請確認你用的是正確介面：**

- ✅ 使用 **Wi-Fi**（或你實際上網的那張網卡）的 IPv4
- ❌ 不要用 VPN、Docker、WSL、VirtualBox、Hyper-V 虛擬介面的 IP
- ❌ 不要用已 **Media disconnected** 的介面

若 terminal 的 Network URL 與 `ipconfig` Wi-Fi IPv4 一致，就以 Network URL 為準。

---

## 步驟四：在手機瀏覽器開啟

輸入：

```
http://你的IPv4:4321
```

例如 `http://192.168.1.42:4321`

可測試各頁面：

| 頁面 | 網址 |
|------|------|
| 首頁 | `http://192.168.x.x:4321/` |
| Journal | `http://192.168.x.x:4321/articles` |
| 單篇文章 | `http://192.168.x.x:4321/articles/shibuya-ward-office-rainy-day/` |
| Photos | `http://192.168.x.x:4321/photos` |
| About | `http://192.168.x.x:4321/about` |

---

## 常見錯誤與排除

### 手機和電腦不同 Wi-Fi

確認兩台都連到同一個路由器。手機用行動數據、電腦用 Wi-Fi 時無法互通。

### 沒有使用 `--host 0.0.0.0`

請改用 `npm run dev:host`，不要只用 `npm run dev` 做手機測試。

### Windows 防火牆阻擋

首次執行 Node.js / Astro 時，Windows 可能跳出防火牆提示。請允許**私人網路（Private networks）**連線。

**如果手機無法開啟 terminal 顯示的 Network URL**，請檢查 Windows 防火牆是否允許 Node.js 通過 Private networks。

若仍無法連線：

1. 開啟「Windows 安全性 → 防火牆與網路保護」
2. 點「允許應用程式通過防火牆」
3. 找到 **Node.js**（或 **JavaScript Runtime**），勾選 **私人**
4. 若清單中沒有 Node.js，可暫時關閉防火牆測試（測完記得恢復）
5. 確認目前 Wi-Fi 網路設定檔類型為「私人」而非「公用」

### 公司 / 公共 Wi-Fi / 宿舍 Wi-Fi 的 AP Isolation

部分咖啡廳、公司、學校宿舍 Wi-Fi 會開啟 **AP isolation**（裝置之間無法互連）。此時即使電腦與手機「連同一個 Wi-Fi」，也可能**不能**互相連線。

**替代方案（建議）：**

1. 手機開啟**個人熱點**
2. 電腦改連**手機熱點**（不要再用有 AP isolation 的公共 Wi-Fi）
3. 電腦執行 `npm run dev:host`
4. 查看 terminal 顯示的 **Network URL**（IP 可能會變，例如 `192.168.43.x`）
5. 手機用同一台裝置開瀏覽器，輸入該 Network URL

> 熱點模式下，手機與電腦一定在同一個小型區網，通常可避開 AP isolation。

### 輸入 https 但 dev server 是 http

網址請用 `http://`，不要用 `https://`。

### 埠號錯誤

本專案預設為 **4321**。若終端機顯示其他 port，請以終端機實際輸出為準。

---

## 若仍無法連線（進階，現階段非必須）

以下方式本專案**尚未導入**，僅供日後參考：

- **Vercel Preview**：push 分支後用預覽 URL 在手機開啟
- **ngrok / Cloudflare Tunnel**：將本機 port 暴露到公網

現階段優先使用 `npm run dev:host` + 區網 IP。

---

## 相關指令速查

```bash
# 僅本機預覽（電腦瀏覽器）
npm run dev

# 區網預覽（手機實機）
npm run dev:host

# 查 IPv4（Windows）
ipconfig
```

---

*最後更新：區網預覽排查階段*
