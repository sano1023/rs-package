> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm install @parelabo/rs-lightbox
```

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-lightbox-0.1.0.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSLightbox } from '@parelabo/rs-lightbox';
import '@parelabo/rs-lightbox/rs-lightbox.css';   // スタイル（バンドラ経由）

createRSLightbox([{ src: '/large/01.jpg', alt: '海辺' }], { /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@parelabo/rs-lightbox@0.1.0/dist/rs-lightbox.css">
<script src="https://cdn.jsdelivr.net/npm/@parelabo/rs-lightbox@0.1.0/dist/rs-lightbox.min.js"></script>
<script>
  // 公開APIはグローバル RSLightbox に載る
  RSLightbox.createRSLightbox([{ src: '/large/01.jpg', alt: '海辺' }], { /* オプション */ });
</script>
```

### Vue 3

```js
import { RsLightbox } from '@parelabo/rs-lightbox/vue';
import '@parelabo/rs-lightbox/rs-lightbox.css';   // スタイル（バンドラ経由）
```

```vue
<template>
  <RsLightbox />
</template>
```

### React 18 / 19

```jsx
import { RsLightbox } from '@parelabo/rs-lightbox/react';
import '@parelabo/rs-lightbox/rs-lightbox.css';   // スタイル（バンドラ経由）

export default function App() {
  return <RsLightbox />;
}
```

> `vue` / `react` は peerDependency です（バンドルには含みません）。アプリ側のものが使われます。

---

# rs-lightbox

依存ゼロ・フレームワーク非依存の**画像ライトボックス**（PhotoSwipe / GLightbox / Fancybox の代替）。サムネイルをクリックすると全画面のビューアで画像を気持ちよく閲覧できます。ビルド不要・ESモジュール + CSSファイル1枚。

- **依存ゼロ・ビルド不要**: ESモジュールを `import` するだけ。SSR で `import` しても落ちない（DOM アクセスは生成時まで遅延）
- **2つの入力**: DOM 宣言モード（`data-rslb-item` をイベント委譲・動的追加も再収集）と、items 配列モード
- **ズーム・パン・ジェスチャー**: ホイール（Ctrl/Meta or `wheelZoom`）・ダブルタップ・ピンチでズーム、ズーム中はドラッグ/1本指でパン、境界 clamp。横スワイプで前後移動、縦スワイプで閉じる
- **アクセシビリティ**: `role="dialog"` / `aria-modal` モーダル、フォーカストラップ、背景 `inert`、起点要素へフォーカス復帰、キーボード操作一式、`aria-live` でスライド通知
- **堅牢なライフサイクル**: 参照カウント式スクロールロック（位置・inline style を完全復元）、画像ロードの競合を token で無効化、`destroy()` で DOM/リスナー/rAF/ロックを完全に片付け
- **軽量**: コア JS **9KB gzip** / CSS **2.4KB gzip**（目標 15KB / 3KB 以内）
- テーマ: CSS カスタムプロパティ（`--rslb-backdrop` / `--rslb-accent` / `--rslb-btn-bg` / `--rslb-z` など）
- Vue 3 / React 18+ の薄いラッパー同梱

## デモ

```bash
# このリポジトリで
php -S localhost:8099
# → http://localhost:8099/rs-lightbox/demo/ を開く
```

デモの画像はすべてブラウザ内（canvas）で生成されるため、ネットワーク不要で動きます。

## インストール

npm 公開前のため、`src/` をプロジェクトにコピーして import してください。

```html
<link rel="stylesheet" href="rs-lightbox/rs-lightbox.css">
```

```js
import { createRSLightbox } from './rs-lightbox/index.js';
```

## クイックスタート

### DOM 宣言モード（イベント委譲）

```html
<div class="gallery">
  <a href="/large/01.jpg" data-rslb-item data-caption="鎌倉の海">
    <img src="/thumb/01.jpg" alt="海辺">
  </a>
  <a href="/large/02.jpg" data-rslb-item data-caption="夕焼け">
    <img src="/thumb/02.jpg" alt="夕焼け">
  </a>
</div>
```

```js
createRSLightbox('.gallery', { selector: '[data-rslb-item]', loop: true });
```

- 対象内の `data-rslb-item` をクリックすると、その画像から開きます
- 動的に追加した要素も、`open` 時に一覧を再収集するので委譲で開けます
- 修飾キーなしの通常クリックでのみ `<a>` の既定遷移を抑止します（Ctrl/⌘+クリックは新規タブのまま）

DOM からの読み取り規則:

| 項目 | 読み取り順 |
| --- | --- |
| `src`（大画像） | `data-src` → `href` |
| `thumb` | 子 `img.currentSrc` → `img.src` |
| `alt` | `data-alt` → 子 `img.alt`（**キャプションとは別物**） |
| `caption` | `data-caption`（**テキストとして**表示。HTML は実行しません） |
| `width` / `height` | `data-width` / `data-height`（既知なら読み込み前に比率を確保） |

### 配列モード（ギャラリー DOM なしで開く）

```js
const lb = createRSLightbox([
  { src: '/large/01.jpg', thumb: '/thumb/01.jpg', alt: '海辺', caption: '鎌倉の海' },
  { src: '/large/02.jpg', width: 1600, height: 1067, alt: '夕焼け' },
]);

document.querySelector('#open').addEventListener('click', () => lb.open(0));
```

## 操作

| 操作 | キーボード | マウス | タッチ |
| --- | --- | --- | --- |
| 前へ / 次へ | `←` / `→` | 矢印ボタン | 横スワイプ |
| 最初 / 最後 | `Home` / `End` | — | — |
| 閉じる | `Esc` | 背景クリック・×ボタン | 縦スワイプ |
| ズーム | `+` / `-` / `0`（リセット） | ダブルクリック・Ctrl+ホイール | ダブルタップ・ピンチ |
| パン（ズーム中） | — | ドラッグ | 1本指ドラッグ |

## API

```js
const lb = createRSLightbox(targetOrItems, options);

await lb.open(indexOrElement = startIndex);
await lb.close();
lb.next();
lb.prev();
lb.goTo(index);
lb.zoomTo(scale, { x, y, animate });   // x/y はステージ中心基準の焦点(px)
lb.zoomIn();
lb.zoomOut();
lb.resetZoom();
lb.retry();                             // 現在画像の読み込みを再試行
lb.update(partialOptions);
lb.setItems(items);                     // 配列モード。open 中は index を安全補正
lb.getIndex();
lb.getItem();
lb.isOpen();
lb.on(event, callback);                 // unsubscribe 関数を返す
lb.destroy();
```

### イベント

| イベント | payload | 備考 |
| --- | --- | --- |
| `beforeOpen` | `{ index, item, preventDefault() }` | `preventDefault()` で開くのを止められる |
| `open` | `{ index, item }` | |
| `beforeClose` | `{ index, item, preventDefault() }` | `preventDefault()` で閉じるのを止められる |
| `close` | `{ index, item }` | |
| `beforeChange` | `{ from, to, item }` | |
| `change` | `{ index, item, from }` | |
| `load` | `{ index, item }` | 中央画像のロード完了 |
| `error` | `{ index, item }` | 中央画像のロード失敗 |
| `zoom` | `{ scale, x, y }` | 高頻度のため rAF 単位で通知 |
| `destroy` | `{}` | |

利用者コールバック内で例外が出ても、内部の cleanup は止まりません（例外は隔離されます）。

### オプション（既定値）

```js
{
  selector: '[data-rslb-item]',
  startIndex: 0,
  loop: false,
  preload: 1,                // v0.1 は 0 | 1 のみ（3スロット構造のため）。0 で隣接を先読みしない

  closeOnBackdrop: true,
  closeOnEsc: true,
  swipeToClose: true,
  wheelZoom: false,          // true でホイール単体でもズーム（既定は Ctrl/Meta 併用時のみ）
  doubleTapZoom: 2,          // ダブルタップ/ダブルクリック時の倍率
  maxScale: 4,
  initialFocus: 'close',     // 'close' | 'dialog'
  restoreFocus: true,
  lockScroll: true,
  animation: 'zoom',         // 'zoom' | 'fade' | 'none'（reduced motion 時は自動で 'none' 相当）
  caption: true,
  counter: true,
  labels: {
    dialog: '画像ビューア',
    close: '閉じる', prev: '前の画像', next: '次の画像',
    zoomIn: '拡大', zoomOut: '縮小',
    loading: '読み込み中', error: '画像を読み込めませんでした', retry: '再試行',
  },
}
```

入力不備は静かに壊さず、開けない index / src には説明的な `TypeError` / `RangeError` を投げます。

## テーマ（CSS カスタムプロパティ）

`.rslb` に対して CSS 変数を上書きします。

```css
.rslb {
  --rslb-backdrop: rgba(15, 23, 42, 0.92);
  --rslb-accent: #38bdf8;       /* フォーカスリング・スピナー */
  --rslb-btn-bg: rgba(15, 23, 42, 0.55);
  --rslb-radius: 10px;
  --rslb-z: 2147483000;
  --rslb-anim-ms: 240ms;
}
```

CSS を読み込まなくても機能例外にはなりません（見た目が素になるだけです）。

## Vue 3

```js
import { RsLightbox } from './rs-lightbox/vue.js';
```

```vue
<template>
  <button @click="$refs.lb.open(0)">開く</button>
  <RsLightbox ref="lb" :items="items" :options="{ loop: true }"
              @open="onOpen" @change="onChange" @close="onClose" />
</template>
```

コンポーネント自体は通常表示を持たず（オーバーレイはコアが `body` 直下に生成）、命令 API を `ref` から呼びます（`open` / `close` / `next` / `prev` / `goTo` / `zoomTo` / `setItems` / `update` / `getInstance`）。`items` / `options` の変更を反映し、アンマウント時に `destroy()` します。

## React 18 / 19

```jsx
import { useRef } from 'react';
import { RsLightbox } from './rs-lightbox/react.js';

function Gallery({ items }) {
  const lb = useRef(null);
  return (
    <>
      <button onClick={() => lb.current.open(0)}>開く</button>
      <RsLightbox ref={lb} items={items} options={{ loop: true }}
                  onOpen={...} onChange={...} onClose={...} />
    </>
  );
}
```

`vue` / `react` は peerDependency です（バンドルには含みません）。StrictMode の mount→cleanup→mount でもリスナーや DOM は二重化しません。

## 設計メモ

- スライドは「左・中央・右」の固定 3 枚ウィンドウ。大量ギャラリーでも overlay 内に全画像 DOM を作りません（現在 ±preload のみ）
- ジェスチャーは明示的な状態機械 `idle | swipe | pan | pinch | closing`。移動閾値でクリック/スワイプ/ピンチの同時発火を防ぎます
- transform は `translate3d(...) scale(...)` に統一し、scale と位置を状態として保持。pointermove ごとの DOM 再構築はせず、更新は rAF でまとめます
- 画像ロードは token/sequence で競合無効化し、古い画像の load が新しい slide を上書きしません
- 背景 DOM を `inert` にしつつ、`inert` だけに依存せずフォーカストラップも実装しています
- `<dialog>` / top layer は使わず（互換性と複数インスタンス制御を優先）、`z-index` を CSS 変数化しています

## v0.1 の非対応（ロードマップ）

v0.1 は画像専用の堅牢なコアに集中しています。以下は今回対象外です。

- 動画 / YouTube 等 iframe / 任意 HTML の表示（**v0.2**: `item.type` と custom renderer API）
- サムネイルストリップ・スライドショー・全画面・ダウンロード（**v0.2**）
- URL/hash deep link（戻るボタンで閉じる）・仮想サムネイル・`rs-baslider`/`rs-image`/`rs-slider` 連携・srcset/picture（**v0.3**）
- 画像加工・EXIF 解析・キャプションの HTML 解釈・jQuery 互換（対象外）

詳しい設計とロードマップは [REQUIREMENTS.md](./REQUIREMENTS.md) を参照してください。

## テスト

```bash
node --test rs-lightbox/test/lightbox.test.mjs   # 純関数 + jsdom ライフサイクル/a11y
node wrapper-mount-test.mjs                       # Vue/React ラッパーの mount/unmount 契約
```

純関数（zoom / items / events / scroll-lock）と、open/close・ナビ・aria・XSS 回帰・setItems・destroy の契約を Node + jsdom で検証しています。ジェスチャー・実描画・60fps・iOS/Android 実機は Playwright / 手動確認（desktop Chrome/Safari/Firefox、iOS Safari、Android Chrome 相当）で担保します。
