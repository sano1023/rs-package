> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm install @parelabo/rs-qrcode
```

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-qrcode-0.1.2.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSQR } from '@parelabo/rs-qrcode';

createRSQR('https://example.com', { /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<script src="https://cdn.jsdelivr.net/npm/@parelabo/rs-qrcode@0.1.2/dist/rs-qrcode.min.js"></script>
<script>
  // 公開APIはグローバル RSQrcode に載る
  RSQrcode.createRSQR('https://example.com', { /* オプション */ });
</script>
```

### Vue 3

```js
import { RsQrCode, RsBarcode } from '@parelabo/rs-qrcode/vue';
```

```vue
<template>
  <RsQrCode />
</template>
```

### React 18 / 19

```jsx
import { RsQrCode, RsBarcode } from '@parelabo/rs-qrcode/react';

export default function App() {
  return <RsQrCode />;
}
```

> `vue` / `react` は peerDependency です（バンドルには含みません）。アプリ側のものが使われます。

---

# rs-qrcode

QRコード/バーコード生成ライブラリ。エンコーダは仕様（ISO 18004 / GS1）どおりのフルスクラッチで、依存ゼロ・ビルド不要・ESモジュール。ラベル印刷までこれ1つで完結します。

- **QR生成**: バイトモード（UTF-8・日本語OK）・バージョン1〜10自動選択・誤り訂正 L/M/Q/H・8マスクのペナルティ評価。GF(256) Reed-Solomon・BCH形式/バージョン情報まで自前実装
- **バーコード生成**: CODE128（数字はサブセットCへ自動切替・チェックサム自動）/ EAN-13（チェックデジット自動計算・13桁入力なら検証）
- **SVG出力 / PNG出力**: PNGは **dpi指定で pHYs チャンクを埋め込み**（`{dpi: 300}` で印刷ソフトが300dpiとして扱える）
- **ロゴ埋め込み**（中央・角丸白フチ付き。**指定すると誤り訂正を自動でHに昇格**するので実機カメラでも読める。任意の画像URL/File/canvasを渡せる）/ **ラベル**（コード下のテキスト）/ **余白**・**色**（背景 transparent 可）
- **連番生成**・**CSV一括生成**（ラベルシート印刷のデモつき）
- 検証: 生成したQRを **jsQR（テスト専用）で実デコード**して入力と一致することを確認済み

## デモ

```bash
# このリポジトリで
php -S localhost:8099
# → http://localhost:8099/rs-qrcode/demo/ を開く
```

## インストール

npm 公開前のため、`src/` をプロジェクトにコピーして import してください。

## クイックスタート

```js
import { createRSQR, createRSBarcode } from './rs-qrcode/index.js';

// QR
const qr = createRSQR('https://example.com/products/12345', {
    ecLevel: 'M',          // L / M / Q / H（ロゴ入りは H 推奨）
    margin: 4,             // 余白（モジュール単位）
    dark: '#000000',
    light: '#ffffff',      // 'transparent' 可
    label: '商品12345',     // コード下のテキスト
});
document.body.innerHTML += qr.toSVG({ size: 240 });
const canvas = await qr.toCanvas({ scale: 8 });
const blob = await qr.toPNG({ dpi: 300, scale: 12 });   // 印刷用300dpi PNG

// ロゴ入り（ECは自動でHに昇格・画像はURL/File/canvas何でも）
createRSQR('https://example.com', { logo: '/logo.png', logoScale: 0.2 });

// バーコード
const bc = createRSBarcode('RS-2026-0001', { type: 'code128', barHeight: 60 });
const ean = createRSBarcode('490123456789', { type: 'ean13' });  // チェックデジット自動
```

## 一括生成

```js
import { makeSequence, batchFromCSV } from './rs-qrcode/index.js';

// 連番: ['RS-0001', 'RS-0002', ...]
const codes = makeSequence({ prefix: 'RS-', start: 1, count: 50, digits: 4 });

// CSV（1列目=データ・2列目=ラベル。引用符・カンマ対応）
const items = batchFromCSV('A-1001,りんご\nA-1002,みかん', { ecLevel: 'M' });
for (const { data, label, item } of items) {
    sheet.innerHTML += item.toSVG({ size: 120 });   // ラベルシートに並べて window.print()
}
// バーコードで一括: batchFromCSV(csv, { type: 'code128' })
```

## API

### `createRSQR(data, options)` → `{ toSVG, toCanvas, toPNG, toDataURL, matrix, version, size, ecLevel, mask }`

| オプション | 既定値 | 説明 |
| --- | --- | --- |
| `ecLevel` | `'M'` | 誤り訂正 `'L'`(7%) / `'M'`(15%) / `'Q'`(25%) / `'H'`(30%)。**logo指定時はHに自動昇格**（`forceEcLevel` で上書き可・非推奨） |
| `margin` | `4` | 余白（モジュール単位。仕様推奨は4） |
| `dark` / `light` | 黒 / 白 | 色。`light: 'transparent'` で背景透過 |
| `size` / `scale` | — | 出力サイズ（px目安）/ モジュールあたりのpx |
| `logo` / `logoScale` | — / `0.2` | 中央ロゴ（URL・HTMLImage・canvas）と比率（QR本体基準・上限0.3にクランプ） |
| `label` | — | コード下のテキスト |
| `version` | 自動 | バージョン強制（1〜10） |

`toPNG({ dpi })`: dpi 指定で pHYs チャンク（物理解像度）を埋め込んだ PNG Blob を返す。

### `createRSBarcode(data, options)`

`type: 'code128'`（既定・ASCII 32〜126、数字のみ偶数桁はサブセットC）/ `'ean13'`（12桁数字→チェックデジット付与）。`barHeight` / `quiet`（クワイエットゾーン・既定10）/ `showText: false` / `label` / 色 / `scale`。

### バッチ

`makeSequence({prefix, suffix, start, count, digits})` / `batchFromCSV(csvText, options)` / `parseCSV(text)`

## 制限（v0.1）

- QRはバイトモードのみ（数字/英数字モードの容量最適化は未対応）・バージョン10まで（約270バイト・URL/シリアル用途は十分）
- バーコードは CODE128 / EAN-13（ITF・CODE39 は将来）
- ロゴの `logoScale` は 0.25 以下推奨（0.3で強制クランプ・ECは自動でH）

## 検証

Playwright（Chromium）21項目。**生成したQRは jsQR で実デコード**し、ASCII・URL・日本語UTF-8・長文（v5+）・全ECレベル・ロゴ入り・CSV一括分まで入力と一致することを確認。CODE128 はパターン表の全行幅合計・チェックサム・既知値列、EAN-13 は95モジュール・ガード・チェックデジット、PNG は pHYs チャンクのバイト検査で確認済み。

## ライセンス

MIT
