> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm install @parelabo/rs-baslider
```

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-baslider-0.1.0.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSBASlider } from '@parelabo/rs-baslider';
import '@parelabo/rs-baslider/rs-baslider.css';   // スタイル（バンドラ経由）

createRSBASlider(document.querySelector('#app'), { /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@parelabo/rs-baslider@0.1.0/dist/rs-baslider.css">
<script src="https://cdn.jsdelivr.net/npm/@parelabo/rs-baslider@0.1.0/dist/rs-baslider.min.js"></script>
<script>
  // 公開APIはグローバル RSBaslider に載る
  RSBaslider.createRSBASlider(document.querySelector('#app'), { /* オプション */ });
</script>
```

### Vue 3

```js
import { RsBaSlider } from '@parelabo/rs-baslider/vue';
import '@parelabo/rs-baslider/rs-baslider.css';   // スタイル（バンドラ経由）
```

```vue
<template>
  <RsBaSlider />
</template>
```

### React 18 / 19

```jsx
import { RsBaSlider } from '@parelabo/rs-baslider/react';
import '@parelabo/rs-baslider/rs-baslider.css';   // スタイル（バンドラ経由）

export default function App() {
  return <RsBaSlider />;
}
```

> `vue` / `react` は peerDependency です（バンドルには含みません）。アプリ側のものが使われます。

---

# rs-baslider

Before/After 比較スライダー。2枚の画像（または canvas 等の任意要素）を重ね、ハンドルのドラッグで見比べられます。依存ゼロ・ビルド不要・ESモジュール。

- **左右比較**（既定）と**上下比較**（`direction: 'vertical'`）
- **スマホ対応**: Pointer Events。横スライダーは縦スクロールを邪魔しない `touch-action` 設計
- **ラベル**: 文字変更・非表示可。ハンドルが端に寄ると自動フェード
- **初期位置指定**・**複数設置**（1ページに何個でも）
- クリックジャンプ / **ホバー追従モード** / キーボード操作（矢印・Home/End）+ aria
- `setPosition(p, {animate:true})` の滑らか移動、CSSカスタムプロパティでテーマ変更

## デモ

```bash
# このリポジトリで
php -S localhost:8099
# → http://localhost:8099/rs-baslider/demo/ を開く
```

## インストール

npm 公開前のため、`src/` をプロジェクトにコピーして import してください。

```html
<link rel="stylesheet" href="rs-baslider/rs-baslider.css">
```

## クイックスタート

```js
import { createRSBASlider } from './rs-baslider/index.js';

createRSBASlider('#compare', {
    before: '/img/before.jpg',
    after: '/img/after.jpg',
    labels: { before: '加工前', after: '加工後' },
    position: 35,
});
```

## API

### `createRSBASlider(target, options): BASlider`

| オプション | 既定値 | 説明 |
| --- | --- | --- |
| `before` / `after` | — | URL文字列 / `{src, alt}` / **HTMLElement**（canvas・div などもOK） |
| `direction` | `'horizontal'` | `'vertical'` で上下比較 |
| `position` | `50` | 初期位置（%） |
| `labels` | `{before:'Before', after:'After'}` | 文字変更。`false` で非表示 |
| `hover` | `false` | `true` でマウス追従（ドラッグ不要） |
| `clickToMove` | `true` | トラッククリックでジャンプ。`false` でハンドルのみ |
| `ariaLabel` | `'Before/After比較'` | スライダーの aria-label |
| `onChange` | — | `(position) => {}`（`on('change', cb)` でも可） |

### メソッド

| メソッド | 説明 |
| --- | --- |
| `getPosition()` | 現在位置（0〜100） |
| `setPosition(p, {animate})` | 位置設定。`animate: true` で350msのイージング移動 |
| `update(partial)` | `labels` / `position` / `hover` / `clickToMove` の差分更新 |
| `on(event, cb)` / `off(event, cb)` | `change` |
| `destroy()` | DOM・リスナーを破棄 |

### 操作

- **ドラッグ / スワイプ**: トラック上のどこからでも。掴んだ瞬間に追従
- **クリック**: その位置へジャンプ
- **キーボード**: ハンドルにフォーカス → `←→`（縦は `↑↓`）で2%、`Shift+矢印` で10%、`Home/End` で端へ

### テーマ（CSSカスタムプロパティ）

```css
.rsba {
    --rsba-handle-color: #f28e2b;   /* ライン・グリップの色 */
    --rsba-handle-size: 32px;       /* グリップ径 */
    --rsba-line-width: 3px;
    --rsba-label-bg: rgba(0,0,0,.6);
    --rsba-radius: 16px;
}
```

## 仕組み

after層が通常フローでサイズを決め、before層は絶対配置＋`clip-path: inset()` でクリップ。ドラッグ中は rAF バッチで clip-path とハンドルの style だけ更新するので、大きな画像でも滑らかに動きます。

## 検証

Playwright（Chromium）による13項目の自動テストで、生成・横/縦ドラッグ・クリックジャンプ・ラベル自動フェード・キーボード・ホバー追従・複数設置・canvas直接比較・アニメーション・update/destroy・**モバイルエミュレーションのタッチスワイプ**・コンソールエラーなしを確認済み。

## ライセンス

MIT
