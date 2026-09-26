> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm login --scope=@sano1023 --auth-type=legacy --registry=https://npm.pkg.github.com
npm config set @sano1023:registry=https://npm.pkg.github.com --location=user
npm install @sano1023/rs-splitter
```

> GitHub Packages から配布しています。public パッケージもインストールには GitHub 認証が必要です。ログイン時の Password には read:packages 権限を持つ personal access token (classic) を使用します。認証不要の導入には、下記の GitHub tarball または CDN を利用できます。

認証・更新の詳細は [共通インストール手順](https://github.com/sano1023/rs-package/blob/main/INSTALLING.md) を参照してください。登録済みバージョンは [GitHub Packages 一覧](https://github.com/sano1023?tab=packages&repo_name=rs-package) で確認できます。以下のパッケージ名による import は Vite などのバンドラ向けです。

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-splitter-0.1.0.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSSplitter } from '@sano1023/rs-splitter';
import '@sano1023/rs-splitter/rs-splitter.css';   // スタイル（バンドラ経由）

createRSSplitter(document.querySelector('#app'), { sizes: [30, 70], /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sano1023/rs-package@main/rs-splitter/dist/rs-splitter.css">
<script src="https://cdn.jsdelivr.net/gh/sano1023/rs-package@main/rs-splitter/dist/rs-splitter.min.js"></script>
<script>
  // 公開APIはグローバル RSSplitter に載る
  RSSplitter.createRSSplitter(document.querySelector('#app'), { sizes: [30, 70], /* オプション */ });
</script>
```

---

# rs-splitter

依存ゼロ・フレームワーク非依存の**分割ペイン**（v0.1・Split.js / Allotment 代替）。

- 既存の子要素の**間にセパレータを差し込むだけ**（DOM 構造を最小限しか変えない・destroy で完全復元）
- 水平/垂直・**ネスト可**（子ペインの中でもう一度呼ぶだけ）・ダブルクリックで均等化
- 最小サイズ（px・ペインごと指定可）・**スナップ折りたたみ**（押し込むと 0 に吸着）・`collapse(i)` API
- **キーボード対応**: セパレータは `role="separator"` + Tab フォーカス。←→↑↓で1%・Shiftで5%・Home/End・Enterで均等化
- **レイアウト保存**: `storageKey` で localStorage に保存・次回復元
- ドラッグ中は iframe へのイベント吸い込みと文字選択を防止・`onResize` 購読・MIT

```js
import { createRSSplitter } from '@sano1023/rs-splitter';
import '@sano1023/rs-splitter/rs-splitter.css';
```

## 使い方

```html
<div id="layout">
    <div>サイドバー</div>
    <div>メイン</div>
    <div>プロパティ</div>
</div>
```

```js
import { createRSSplitter } from '@sano1023/rs-splitter';
// CSS: <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sano1023/rs-package@main/rs-splitter/dist/rs-splitter.css">

const split = createRSSplitter('#layout', {
    direction: 'horizontal',      // horizontal | vertical
    sizes: [20, 55, 25],          // %（合計100に正規化）
    minSizes: [120, 200, 140],    // px（数値なら全ペイン共通）
    storageKey: 'app-layout',     // ドラッグ結果を保存・復元
    onResize: (sizes) => console.log(sizes),
});

split.getSizes();                 // [20, 55, 25]
split.setSizes([30, 40, 30]);
split.collapse(0);                // 折りたたみ / collapse(0, false) で復帰
split.reset();                    // 均等化
split.destroy();                  // セパレータ除去・元のDOMへ

// ネスト
createRSSplitter('#layout > div:nth-child(2)', { direction: 'vertical' });
```

## テスト

```
node --test test/
```

## ライセンス

MIT
