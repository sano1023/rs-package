> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール / 読み込み

```bash
# npm（GitHubのtarball指定）
npm install https://github.com/sano1023/ryusuke-packages-dist/raw/main/tarballs/rs-scanner-0.1.0.tgz
```

```html
<!-- CDN（jsDelivr・scriptタグ直読み） -->
<script src="https://cdn.jsdelivr.net/gh/sano1023/ryusuke-packages-dist@main/rs-scanner/dist/rs-scanner.min.js"></script>
```

```js
// ESM import（npmインストール後）
import { /* 公開API */ } from 'rs-scanner';
```

CSSが必要なパッケージは `dist/rs-scanner.css` を link してください。

---

# rs-scanner

QR/バーコード読み取りライブラリ（rs-qrcode と対）。カメラ・画像・任意の MediaStream から読み取れます。**コアは依存ゼロ**で、デコーダは3段構え。ビルド不要・ESモジュール。

1. **BarcodeDetector**（ブラウザ標準API）— 対応環境（Chrome/Edge の Android・macOS 等）では QR 含む全形式を OS デコーダで
2. **内蔵1Dデコーダ** — **CODE128 / EAN-13 はスキャンライン解析を自前実装**。依存ゼロで全ブラウザ動作（複数ライン投票・両方向・チェックサム検証）
3. **アダプタ注入** — QR を全ブラウザで読むなら jsQR 等を渡す（`jsQRAdapter` ヘルパ同梱。ランタイム依存にはしない）

- カメラUI一式: 照準枠・スキャンライン・成功フラッシュ・ステータス表示・ビープ
- 連続 / 単発モード・**重複抑止**（同一コードは dedupMs 内で1回）
- `start(mediaStream)` で **canvas.captureStream や画面共有も読める**
- `scanImage(file)` で画像1枚の一発読み取り（アップロード読み取り）
- `listCameras()` / `setTorch(on)`（対応端末のライト）

## デモ

```bash
php -S localhost:8099
# → http://localhost:8099/rs-scanner/demo/ を開く（カメラはスマホ+HTTPS推奨）
```

デモには「rs-qrcode で生成 → rs-scanner が読む」セルフテストボタンつき。

## クイックスタート

```html
<link rel="stylesheet" href="rs-scanner/rs-scanner.css">
```

```js
import { createRSScanner, jsQRAdapter } from './rs-scanner/index.js';

const scanner = createRSScanner('#viewport', {
    formats: ['qr_code', 'code_128', 'ean_13'],
    adapters: [jsQRAdapter(jsQR)],   // QRを全ブラウザで（jsQRを読み込済みの場合）
    onScan: ({ text, format, engine }) => console.log(text),
});
await scanner.start();               // カメラ起動（背面優先）
// scanner.stop();

// 画像から
const result = await scanner.scanImage(file);   // { text, format, engine } | null
```

## API

### `createRSScanner(target, options)`

| オプション | 既定値 | 説明 |
| --- | --- | --- |
| `formats` | 全部 | `['qr_code', 'code_128', 'ean_13']` から対象を絞る |
| `continuous` | `true` | `false` で1回読んだら自動停止 |
| `dedupMs` | `1500` | 同一コードの再通知間隔 |
| `interval` | `150` | フレーム解析間隔（ms） |
| `beep` | `true` | 読み取り音 |
| `facingMode` | `'environment'` | `'user'` でフロントカメラ |
| `adapters` | `[]` | 外部デコーダ（`{name, formats, detect(imageData)}`） |
| `onScan` / `onError` / `onStart` / `onStop` | — | イベント |

### メソッド

`start(stream?)` / `stop()` / `scanImage(src)` / `listCameras()` / `setTorch(on)` / `destroy()`

### 対応状況の目安

| 形式 | 依存ゼロで | 備考 |
| --- | --- | --- |
| CODE128 / EAN-13 | ✅ 全ブラウザ | 内蔵スキャンラインデコーダ |
| QR | △ BarcodeDetector対応環境 | 全ブラウザ対応には `jsQRAdapter(jsQR)` を注入 |

## 仕組み

- スキャンループ: video → 縮小canvas（最大800px）→ デコーダ3段を順に試行
- 内蔵1D: 中央付近の複数ラインを二値化（行ごとの min/max 中間しきい値）→ ラン長列 → 比率マッチ（量子化誤差スコア）→ チェックサム検証。180°回転はラン列の反転で対応
- カメラなしテスト: `start(canvas.captureStream())` で生成コードを流し込み検証

## 制限（v0.1）

- 内蔵1Dは正対したコード向け（傾き・強い歪みは BarcodeDetector / 外部アダプタ推奨）
- QRの自前CVデコーダは未実装（v0.2候補）。ITF / CODE39 も将来
- カメラは HTTPS（または localhost）必須（ブラウザ仕様）

## 検証

Playwright（Chromium）14項目・実カメラなし。**rs-qrcode で生成したコードを読む相互検証**で、EAN-13 / CODE128（B/C）/ 180°回転 / QR（jsQRアダプタ・日本語）/ captureStream 連続スキャン / 重複抑止 / 単発モード / formats絞り込み / stop・destroy を確認済み。

## ライセンス

MIT
