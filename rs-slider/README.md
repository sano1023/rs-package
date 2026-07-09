> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm install @parelabo/rs-slider
```

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-slider-0.1.0.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSSlider } from '@parelabo/rs-slider';
import '@parelabo/rs-slider/rs-slider.css';   // スタイル（バンドラ経由）

createRSSlider(document.querySelector('#app'), { /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@parelabo/rs-slider@0.1.0/dist/rs-slider.css">
<script src="https://cdn.jsdelivr.net/npm/@parelabo/rs-slider@0.1.0/dist/rs-slider.min.js"></script>
<script>
  // 公開APIはグローバル RSSlider に載る
  RSSlider.createRSSlider(document.querySelector('#app'), { /* オプション */ });
</script>
```

### Vue 3

```js
import { RsSlider, RsGallery, RsMarquee, RsMasonry, RsCoverflow, RsStories } from '@parelabo/rs-slider/vue';
import '@parelabo/rs-slider/rs-slider.css';   // スタイル（バンドラ経由）
```

```vue
<template>
  <RsSlider />
</template>
```

### React 18 / 19

```jsx
import { RsSlider, RsGallery, RsMarquee, RsMasonry, RsCoverflow, RsStories } from '@parelabo/rs-slider/react';
import '@parelabo/rs-slider/rs-slider.css';   // スタイル（バンドラ経由）

export default function App() {
  return <RsSlider />;
}
```

> `vue` / `react` は peerDependency です（バンドルには含みません）。アプリ側のものが使われます。

---

# rs-slider

依存ゼロの**画像スライダーコレクション**。よく使う13種類のスライダーUIを、7つのファクトリ関数で提供します。ビルド不要・ESモジュール + CSSファイル1枚。

| # | タイプ | ファクトリ |
| --- | --- | --- |
| 1 | 基本画像スライダー（自動再生・矢印・ドット・ループ・スワイプ・レスポンシブ） | `createRSSlider` |
| 2 | フェード画像スライダー（クロスフェード・表示時間・テキスト・オーバーレイ・スマホ画像） | `createRSSlider (mode: 'fade')` |
| 3 | ヒーロー画像スライダー（キャッチコピー・CTA・グラデーション・テキストアニメーション） | `createRSSlider (variant: 'hero')` |
| 4 | サムネイル連動ギャラリー（左右/下部サムネイル・ハイライト・キーボード） | `createRSGallery` |
| 5 | 商品画像ギャラリー（拡大ズーム・バリエーション連動・動画サムネイル・遅延読み込み） | `createRSGallery` |
| 8 | フルスクリーン画像スライダー（ホイール・キーボード・スワイプ・カウンター） | `createRSFullscreen` |
| 9 | 無限ループ画像スライダー（シームレス・速度・逆方向・ホバー停止） | `createRSMarquee` |
| 10 | マルチ行画像スライダー（2〜3行・行ごとに方向/速度） | `createRSMarquee (rows)` |
| 11 | Masonry風ギャラリー（比率維持・フィルター・ライトボックス・横スクロール) | `createRSMasonry` |
| 12 | 3Dカバーフロー（中央拡大・奥行き・反射・ドラッグ追従） | `createRSCoverflow` |
| 13 | 画像カードスライダー（タイトル・説明・タグ・ボタン・レスポンシブ枚数） | `createRSSlider (variant: 'cards')` |
| 14 | ストーリーズ風スライダー（進行バー・タップ操作・長押し停止・画像/動画混在） | `createRSStories` |

- **依存ゼロ・ビルド不要**: ESモジュールを `import` するだけ
- **スマホ対応**: Pointer Events ベースのスワイプ/ドラッグ、`touch-action` 設計、`mobileImage` による画像切替
- **a11y**: `aria-roledescription="carousel"`・矢印/ドットのラベル・キーボード操作・`prefers-reduced-motion` 対応
- **複数設置**: 1ページに何個でも（インスタンス独立・グローバル汚染なし）
- テーマ: CSSカスタムプロパティ（`--rss-accent` / `--rss-radius` / `--rss-marquee-h` / `--rss-cf-h` など）

## デモ

```bash
# このリポジトリで
php -S localhost:8099
# → http://localhost:8099/rs-slider/demo/ を開く
```

デモの画像・動画はすべてブラウザ内で生成されるため、ネットワーク不要で動きます。

## インストール

npm 公開前のため、`src/` をプロジェクトにコピーして import してください。

```html
<link rel="stylesheet" href="rs-slider/rs-slider.css">
```

```js
import {
    createRSSlider, createRSGallery, createRSFullscreen,
    createRSMarquee, createRSMasonry, createRSCoverflow, createRSStories,
} from './rs-slider/index.js';
```

## クイックスタート

```js
// 1. 基本スライダー
createRSSlider('#slider', {
    slides: ['/img/a.jpg', '/img/b.jpg', '/img/c.jpg'],
    autoplay: 4000,
});

// 3. ヒーロー
createRSSlider('#hero', {
    mode: 'fade',
    variant: 'hero',
    overlay: 'gradient',
    contentAnimation: 'fade-up',
    aspectRatio: false, // 高さはCSSで指定（既定 clamp(380px, 68vh, 720px)）
    slides: [{
        image: '/img/hero.jpg',
        mobileImage: '/img/hero-sp.jpg',
        title: '想像を、かたちに。',
        text: '説明文テキスト',
        button: { label: '詳しく見る', href: '/feature' },
    }],
});

// 5. 商品ギャラリー
const gallery = createRSGallery('#gallery', {
    items: [
        { image: '/img/p1.jpg', large: '/img/p1@2x.jpg', thumb: '/img/p1-t.jpg' },
        { video: { src: '/movie/p.mp4', poster: '/img/p-poster.jpg' } },
    ],
    zoom: true,
});
gallery.setItems(redItems); // バリエーション連動
```

## API

すべてのファクトリは `(target, options)` を取り、`target` はセレクタ文字列か `HTMLElement`。戻り値はインスタンス（`destroy()` で解体、`on(type, cb)` でイベント購読）です。

### `createRSSlider(target, options)` — 基本 / フェード / ヒーロー / カード

| オプション | 既定値 | 説明 |
| --- | --- | --- |
| `slides` | — | `[{image, mobileImage, alt, title, text, tags, button, duration, align}]`。URL文字列の配列も可。省略時は既存の子要素をスライドとして使用 |
| `mode` | `'slide'` | `'fade'` でクロスフェード |
| `variant` | — | `'hero'` / `'cards'` |
| `perView` / `gap` | `1` / `0` | 表示枚数と間隔(px) |
| `responsive` | — | `{最小コンテナ幅: {perView, gap, ...}}` |
| `loop` / `autoplay` | `true` / `false` | `autoplay: 4000` or `{interval, pauseOnHover}` |
| `arrows` / `dots` / `swipe` / `keyboard` | `true/true/true/false` | UI・操作 |
| `speed` | `500` | 切替アニメの長さ(ms) |
| `aspectRatio` | `'16 / 9'` | ビューポートの縦横比。`false` でCSS任せ |
| `overlay` | `false` | `'gradient'` またはCSS背景値 |
| `contentAnimation` | `false` | `'fade-up'` でテキストが時間差表示 |
| `mobileBreakpoint` | `768` | `mobileImage` に切り替える幅 |
| `duration`（スライド側） | — | そのスライドだけ表示時間を上書き |

メソッド: `next()` `prev()` `goTo(i)` `play()` `pause()` `getIndex()` `getCount()` `on('change'|'play'|'pause')` `destroy()`

### `createRSGallery(target, options)` — サムネイル連動 / 商品ギャラリー

| オプション | 既定値 | 説明 |
| --- | --- | --- |
| `items` | — | `[{image, large, thumb, alt, caption, video: {src, poster}}]` |
| `thumbs` | `'bottom'` | `'bottom' / 'left' / 'right' / false` |
| `zoom` / `zoomScale` | `true` / `2.2` | ホバーで拡大（スマホはダブルタップ→ドラッグでパン） |
| `lazy` | `true` | サムネイル遅延読み込み + 隣接画像先読み |
| `keyboard` / `swipe` / `arrows` / `loop` | すべて `true` | 操作・UI |
| `aspectRatio` | `'4 / 3'` | メイン画像エリアの比率 |

メソッド: `next()` `prev()` `goTo(i)` **`setItems(items)`**（バリエーション連動） `on('change')` `destroy()`

### `createRSFullscreen(target, options)` — フルスクリーン

コンテナに高さ（例: `height: 100dvh`）を与えて使います。

| オプション | 既定値 | 説明 |
| --- | --- | --- |
| `slides` | — | `[{image, mobileImage, title, text, button, align}]` |
| `effect` | `'slide'` | `'fade'` |
| `wheel` / `keyboard` / `swipe` | `true` | `globalKeys: true` で document にキーをバインド |
| `dots` / `counter` / `hint` | `true` | 右ドット・カウンター・スクロールヒント |

メソッド: `next()` `prev()` `goTo(i)` `enterFullscreen()`（Fullscreen API） `destroy()`

### `createRSMarquee(target, options)` — 無限ループ / マルチ行

| オプション | 既定値 | 説明 |
| --- | --- | --- |
| `items` | — | 単一行: `[url | {image, alt, href, label}]` |
| `rows` | — | 複数行: `[{items, speed, reverse, gap}]` |
| `speed` | `60` | px/秒 |
| `reverse` / `pauseOnHover` / `gap` | `false` / `true` / `16` | |

メソッド: `play()` `pause()` `setSpeed(v, rowIndex?)` `setReverse(flag, rowIndex?)` `destroy()`。画像高さはCSS変数 `--rss-marquee-h`。

### `createRSMasonry(target, options)` — Masonry風

| オプション | 既定値 | 説明 |
| --- | --- | --- |
| `items` | — | `[{image, large, w, h, alt, category, caption}]`（`w/h` は比率計算用） |
| `layout` | `'masonry'` | `'horizontal'` で高さ固定の横スクロール |
| `columnWidth` / `maxColumns` / `gap` | `240` / `5` / `12` | 列は自動計算 |
| `rows` / `rowHeight` | `2` / `200` | horizontal 用 |
| `filterBar` / `lightbox` | `true` | カテゴリフィルター・クリック拡大 |

メソッド: `filter(category|null)` `openLightbox(i)` `relayout()` `on('filter')` `destroy()`

### `createRSCoverflow(target, options)` — 3Dカバーフロー

| オプション | 既定値 | 説明 |
| --- | --- | --- |
| `items` | — | `[{image, alt, title}]` |
| `visible` / `spacing` / `angle` / `depth` / `scale` | `2 / 0.55 / 45 / 160 / 0.82` | 3Dレイアウト調整 |
| `loop` / `arrows` / `dots` / `swipe` / `keyboard` | `true/true/false/true/true` | |
| `reflection` | `true` | 鏡面反射（`-webkit-box-reflect` 非対応環境は影のみ） |
| `autoplay` | `false` | `ms` or `{interval}` |

サイズはCSS変数 `--rss-cf-h`（ステージ高さ）/ `--rss-cf-w`（アイテム幅）。

### `createRSStories(target, options)` — ストーリーズ風

| オプション | 既定値 | 説明 |
| --- | --- | --- |
| `stories` | — | `[{type: 'image'|'video', src, poster, duration, heading}]`（拡張子から自動判定あり） |
| `duration` | `5000` | 画像の既定表示時間(ms)。動画は実尺と連動 |
| `loop` / `autoplay` / `muted` | `false` / `true` / `true` | 終了時は「もう一度見る」オーバーレイ |
| `holdToPause` | `true` | 長押しで一時停止（右2/3タップで次へ・左1/3で前へ） |
| `aspectRatio` | `'9 / 16'` | |

メソッド: `next()` `prev()` `goTo(i)` `play()` `pause()` `toggleMute()` `on('change'|'end')` `destroy()`

## テーマ変更

```css
.my-slider {
    --rss-accent: #16a34a;   /* ボタン・ドット・ハイライト色 */
    --rss-radius: 20px;      /* 角丸 */
}
```

## 対応ブラウザ

モダンブラウザ（Chrome / Edge / Safari / Firefox の最新）。Pointer Events・ResizeObserver・IntersectionObserver・aspect-ratio を使用しています。

## ライセンス

MIT
