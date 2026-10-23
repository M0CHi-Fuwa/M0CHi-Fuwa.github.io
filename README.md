# 牛奶麻糬｜個人生活入口網站

## 檔案結構
- `index.html`：首頁
- `food.html`：美食分類
- `moto.html`：機車分類
- `gaming/games.html`：遊戲與完整電腦配備
- `gaming/keyboard.html`：G316 X 鍵盤與軸體手感
- `gaming/cooling.html`：Qube 340 機殼及 Hyper 212 3DHP 風扇配置
- `gaming/`：集中放置遊戲及電腦配備相關頁面；站內遊戲入口直接連到 `gaming/games.html`
- `game.html`：舊連結轉址至 `gaming/games.html`
- `assets/style.css`：共用樣式
- `assets/cyber-retro.css`：遊戲與電腦配備頁的 cyber-retro 佈景
- `assets/script.js`：Discord ID 複製提示
- `images/avatar.jpg`：目前暫放的示意頭像，請換成你自己的頭像
- `images/food.jpg`、`images/moto.jpg`、`images/game.jpg`：三個分類插畫

## 圖片與頭像
所有圖片素材集中放在 `images/` 資料夾。更換頭像時，把檔案命名為 `avatar.jpg` 並放在 `images/avatar.jpg`；HTML 頁面都使用這個路徑。
目前因執行環境無法連線下載你提供的頭像網址，所以這份包裡的 avatar.jpg 是概念圖中的暫用示意圖，不是你的原始照片。

## 分類圖片規格建議
- 檔名：`food.jpg`、`moto.jpg`、`game.jpg`
- 路徑：`images/`
- 建議比例：首頁卡片使用 4:4.3 的近方形構圖；但原始素材建議保留 16:9 或 4:3 的高解析度版本，裁切主體時留足上下左右空間。
- 建議尺寸：至少 1200 px 寬；建議 1600×1200 px（4:3）或 1920×1080 px（16:9）。
- 格式：JPG / WebP；單張建議控制在 300–500 KB 內。
- 構圖：主體置中偏中間，四周預留約 10–15% 安全範圍；避免把重要細節放在邊緣，方便桌機與手機裁切。
- 目前提供的三張 JPG 是從概念設計圖裁切的第一版素材，之後可以直接用同名檔案替換。

## 在 GitHub Pages 部署
1. 將解壓後的所有檔案與資料夾放進 GitHub repository 根目錄。
2. 在 Repository → Settings → Pages 設定部署來源（通常是 `Deploy from a branch`），選擇 `main` 與 `/ (root)`。
3. 等待部署完成後，打開 GitHub Pages 網址。
4. 若你使用的是專案型 Pages（網址包含 `/repository-name/`），目前的相對路徑寫法也能正常運作。

## 備註
- 所有頁面共用同一個側欄與 CSS。
- 沒有加入「近期紀錄」區塊。
- Threads 圖示為簡化線條 SVG，若你希望完全採用官方品牌圖示，後續可替換成官方提供的 SVG。
- Discord 目前只複製 `WEED_M0CHi`，沒有自行猜測邀請連結。
