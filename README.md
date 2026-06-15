# Stopwatch Socket MVP

5.00秒ぴったりを狙うイベント用MVPです。

- `/controller`: タブレット操作用ページ
- `/display`: 結果表示用ディスプレイページ
- Socket.IOでリアルタイム同期
- 計測中のディスプレイ表示は高速ランダム表示
- 内部ではサーバー側の時刻で正確に計測
- 成功／失敗判定画面はなし

## Setup

```bash
npm install
npm run dev
```

## URLs

```text
http://localhost:3003/controller
http://localhost:3003/display
```

## Structure

```text
stopwatch-socket-mvp/
├─ src/
│  ├─ server.js
│  └─ gameState.js
├─ public/
│  ├─ controller/
│  │  ├─ index.html
│  │  ├─ style.css
│  │  └─ controller.js
│  ├─ display/
│  │  ├─ index.html
│  │  ├─ style.css
│  │  └─ display.js
│  └─ shared/
│     └─ base.css
├─ package.json
└─ README.md
```

## Notes

- STARTを押すとサーバー側で `startedAt` を保持します。
- STOPを押すとサーバー側で現在時刻との差分を計算します。
- ディスプレイ側のランダム数字は演出用で、判定・記録には使っていません。
- ディスプレイを再読み込みしても最新状態を復元します。
