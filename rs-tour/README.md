> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm install @parelabo/rs-tour
```

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-tour-0.1.0.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSTour } from '@parelabo/rs-tour';

createRSTour({ /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<script src="https://cdn.jsdelivr.net/npm/@parelabo/rs-tour@0.1.0/dist/rs-tour.min.js"></script>
<script>
  // 公開APIはグローバル RSTour に載る
  RSTour.createRSTour({ /* オプション */ });
</script>
```

### Vue 3

```js
import { RsTour } from '@parelabo/rs-tour/vue';
```

```vue
<template>
  <RsTour />
</template>
```

### React 18 / 19

```jsx
import { RsTour } from '@parelabo/rs-tour/react';

export default function App() {
  return <RsTour />;
}
```

> `vue` / `react` は peerDependency です（バンドルには含みません）。アプリ側のものが使われます。

---

# rs-tour

依存ゼロ・フレームワーク非依存のスポットライト型ガイドツアーライブラリ。

説明したいUI要素だけをスポットライトで明るく切り抜き、まわりを暗転させて吹き出しで解説を表示します。「次へ」でスポットライトが次の要素へスムーズに移動し、オンボーディングやチュートリアルを数行のコードで実装できます。

- **依存ゼロ**: 外部ライブラリ・CSSファイル不要（スタイルはすべてインライン）
- **フレームワーク非依存**: 素のJS / Vue / React / jQuery、どこでも動く
- **軽量**: 1ファイル・約350行のESモジュール
- **ライセンス**: MIT（Intro.jsのようなAGPL制約なし）

## デモ

```bash
# このリポジトリで
php -S localhost:8099   # または任意の静的サーバー
# → http://localhost:8099/demo/ を開く
```

## インストール

npm公開前は、`src/index.js` を1ファイルコピーするだけで使えます。

```js
import { createRSTour } from './rs-tour/src/index.js';
// npm: import { createRSTour } from '@parelabo/rs-tour';
```

## クイックスタート

```html
<button id="save-btn">保存</button>
<div id="file-tree">…</div>
```

```js
import { createRSTour } from '@parelabo/rs-tour';

const tour = createRSTour({
    steps: [
        // target: null → 対象なし（画面中央のカード。導入・締めに使う）
        { target: null, title: 'ようこそ！', body: '30秒で画面の使い方を紹介します。' },
        { target: '#file-tree', title: 'ファイル一覧', body: 'ファイルはここに表示されます。' },
        { target: '#save-btn', title: '保存ボタン', body: '編集したら必ず保存しましょう。' },
        { target: null, title: '準備完了！', body: 'さっそく始めましょう。' },
    ],
    labels: {
        next: '次へ',
        previous: '戻る',
        skip: 'スキップ',
        finish: '完了',
        progress: '{current} / {total}',
    },
});

document.querySelector('#start-tour').addEventListener('click', () => tour.start());
```

## API

### `createRSTour(options): Tour`

| オプション | 型 / 既定値 | 説明 |
|---|---|---|
| `steps` | `Step[]`（必須） | ツアーのステップ定義（下記） |
| `labels` | object | ボタン文言。`next` / `previous` / `skip` / `finish` / `progress`（`{current}` `{total}` が置換される） |
| `padding` | `8` | スポットライトと対象要素の間の余白(px) |
| `zIndex` | `9000` | オーバーレイの z-index |
| `overlayColor` | `rgba(15,23,42,0.6)` | 暗転部分の色 |
| `accentColor` | `#0284c7` | 進捗ラベルと「次へ」ボタンの色 |
| `ringColor` | `#38bdf8` | スポットライトの枠線色 |
| `scrollWaitMs` | `350` | 対象へのスクロール完了を待つ時間(ms) |
| `onStep` | `(index, step) => void` | ステップ表示時のコールバック |
| `onFinish` | `() => void` | 最後まで完了したとき |
| `onClose` | `(reason) => void` | 終了時（`finish` / `skip` / `escape` / `backdrop` / `stop`） |

### `Step`

| フィールド | 説明 |
|---|---|
| `target` | CSSセレクタ文字列 or DOM要素。`null` なら画面中央のカード表示 |
| `title` | 吹き出しの見出し |
| `body` | 吹き出しの本文 |

対象要素が見つからない・非表示（例: 閉じているパネル）のステップは**自動でスキップ**されます。

### `Tour` インスタンス

| メソッド / プロパティ | 説明 |
|---|---|
| `start(index = 0)` | ツアーを開始する |
| `stop()` | ツアーを終了する |
| `next()` / `previous()` | ステップを進める / 戻る |
| `active` | 実行中かどうか（読み取り専用） |
| `currentIndex` | 現在のステップ番号（読み取り専用） |

### キーボード操作

`Esc` 終了 / `→` `Enter` 次へ / `←` 戻る

## フレームワークでの利用

### Vue 3

```vue
<script setup>
import { createRSTour } from '@parelabo/rs-tour';

const tour = createRSTour({ steps: [/* ... */] });
</script>

<template>
    <button @click="tour.start()">使い方ツアー</button>
</template>
```

### React

```jsx
import { useMemo } from 'react';
import { createRSTour } from '@parelabo/rs-tour';

function TourButton() {
    const tour = useMemo(() => createRSTour({ steps: [/* ... */] }), []);

    return <button onClick={() => tour.start()}>使い方ツアー</button>;
}
```

## 仕組み

スポットライトの正体は CSS の `box-shadow` トリックです。対象要素に重ねた透明な `<div>` に

```css
box-shadow: 0 0 0 9999px rgba(15, 23, 42, 0.6);
```

を指定すると、要素の周囲だけが切り抜かれたように見え、残りの画面全体が影で暗転します。位置に `transition` を付けているため、ステップ間でスポットライトが滑らかに移動します。吹き出しは対象の `getBoundingClientRect()` を基準に「下に空きがあれば下、なければ上」へ自動配置されます。

## 開発の背景

[Knoweble](https://knoweble.com) の学習ワークスペースのオンボーディングツアーとして開発したものを、汎用ライブラリとして切り出しました。
