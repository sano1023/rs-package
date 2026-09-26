> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm login --scope=@sano1023 --auth-type=legacy --registry=https://npm.pkg.github.com
npm config set @sano1023:registry=https://npm.pkg.github.com --location=user
npm install @sano1023/rs-image
```

> GitHub Packages から配布しています。public パッケージもインストールには GitHub 認証が必要です。ログイン時の Password には read:packages 権限を持つ personal access token (classic) を使用します。認証不要の導入には、下記の GitHub tarball または CDN を利用できます。

認証・更新の詳細は [共通インストール手順](https://github.com/sano1023/rs-package/blob/main/INSTALLING.md) を参照してください。登録済みバージョンは [GitHub Packages 一覧](https://github.com/sano1023?tab=packages&repo_name=rs-package) で確認できます。以下のパッケージ名による import は Vite などのバンドラ向けです。

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-image-0.8.0.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSImageEditor } from '@sano1023/rs-image';
import '@sano1023/rs-image/rs-image.css';   // スタイル（バンドラ経由）

createRSImageEditor(document.querySelector('#app'), { /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sano1023/rs-package@main/rs-image/dist/rs-image.css">
<script src="https://cdn.jsdelivr.net/gh/sano1023/rs-package@main/rs-image/dist/rs-image.min.js"></script>
<script>
  // 公開APIはグローバル RSImage に載る
  RSImage.createRSImageEditor(document.querySelector('#app'), { /* オプション */ });
</script>
```

### Vue 3

```js
import { RsImageEditor } from '@sano1023/rs-image/vue';
import '@sano1023/rs-image/rs-image.css';   // スタイル（バンドラ経由）
```

```vue
<template>
  <RsImageEditor />
</template>
```

### React 18 / 19

```jsx
import { RsImageEditor } from '@sano1023/rs-image/react';
import '@sano1023/rs-image/rs-image.css';   // スタイル（バンドラ経由）

export default function App() {
  return <RsImageEditor />;
}
```

> `vue` / `react` は peerDependency です（バンドルには含みません）。アプリ側のものが使われます。

---

# rs-image

依存ゼロの画像処理＆合成エディタライブラリ。**多機能なインタラクティブ画像エディタ**（トリミング・**自動トリミング**・ペン切り抜き・マジックワンド・自動切り抜き（MLアダプタ注入）・消しゴム・回転/反転・色調整・**トーンカーブ/レベル補正・色域別HSL調整・コピースタンプ・覆い焼き/焼き込み/ぼかしブラシ**・フィルタ・文字・スタンプ・図形（**ブレンドモード・影/縁取り/グロー・グラデ塗り・破線**対応）・ペン・スポイト・モザイク・フレーム、すべてリアルタイム反映）と、リサイズ・圧縮・WebP変換の処理エンジンをブラウザ完結で提供します。表示する機能は tools オプションで自由に構成できます。ビルド不要・ESモジュール。

- **高品質縮小**: 段階縮小（半分ずつ）＋ `imageSmoothingQuality:'high'` で大縮小でもジャギらない
- **EXIF正立**: スマホ写真の Orientation を読み込み時に自動補正
- **形式・圧縮**: png / jpeg / webp、`quality` 指定、`targetBytes`（目標バイト数に品質二分探索で寄せる）
- **円形切り抜き**: 透過付き（png/webp）。プロフィール画像に
- **出力自由**: Blob / dataURL(base64) / HTMLCanvasElement を選べる。結果に width/height/bytes を含む

## デモ

```bash
# このリポジトリで
php -S localhost:8099
# → http://localhost:8099/rs-image/demo/ を開く
```

```js
import { processImage } from '@sano1023/rs-image';
import '@sano1023/rs-image/rs-image.css';
```

## クイックスタート

```js
// 選択画像を長辺1200pxにリサイズして WebP 圧縮、Blob で受け取る
const { blob, width, height, bytes } = await processImage(file, {
    resize: { width: 1200, height: 1200, fit: 'contain' },  // 比率維持で内接
    format: 'webp',
    quality: 0.8,
    output: 'blob',
});

// 目標バイト数に寄せる（品質を自動調整）
await processImage(file, { format: 'jpeg', targetBytes: 100 * 1024, output: 'blob' });

// 円形アイコン（透過PNG）
const dataURL = await processImage(file, {
    circle: true,
    resize: { width: 256, height: 256, fit: 'cover' },
    format: 'png',
    output: 'dataURL',
});
```


## インタラクティブエディタ — `createRSImageEditor(el, opts)`

画像は常にキャンバスに表示され、すべての操作がリアルタイムに反映されます（WYSIWYG）。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sano1023/rs-package@main/rs-image/dist/rs-image.css">
```

```js
import { createRSImageEditor } from '@sano1023/rs-image';

const editor = createRSImageEditor('#editor', {
    height: 460,
    // 表示する機能と順序を構成できる（省略時は全ツール）
    tools: ['select', 'crop', 'rotate', 'adjust', 'filter', 'text', 'stamp', 'shape', 'draw', 'mosaic', 'frame'],
    crop: { ratios: [['フリー', null], ['正方形', 1]], circle: true },
    adjust: { sliders: ['brightness', 'contrast', 'saturate'] },
    filter: { presets: ['mono', 'sepia', { key: 'night', label: 'ナイト', css: 'brightness(0.75) hue-rotate(30deg)' }] },
    shape: { kinds: ['rect', 'arrow'] },
    stamps: [
        { url: '/stamps/heart.png', category: 'きもち', name: 'ハート' },
        { url: '/stamps/sale.png',  category: 'ラベル', name: 'SALE' },
    ],
    fonts: [{ name: 'Kosugi Maru', url: '/fonts/KosugiMaru.woff2' }],
});
await editor.setImage(file);            // ベース画像（最背面・固定）
const { blob } = await editor.export({ format: 'webp', quality: 0.9 });
```

### ツール（ツールバー・すべてリアルタイム）

| ツール | 動作 |
| --- | --- |
| 選択 | レイヤークリックで選択。ドラッグ移動・四隅ハンドルで拡縮・上部ハンドルで回転・Delete削除。**Shift+クリックで複数選択**（整列・分布・一括移動/削除）、**Alt+ドラッグで複製**、**Shift+ドラッグで水平/垂直拘束**、**移動中はベース/他レイヤーの端・中央にスナップ**（ガイド線表示・Ctrlで無効）、矢印キー微調整（Shiftで10px）・Ctrl+Z/Y |
| トリミング | ドラッグ枠・8ハンドル・暗転＋三分割グリッド。比率プリセット（`crop.ratios` で構成可）・円形 |
| 自動トリミング | **対象をクリックするだけ**で、近い色で繋がっている範囲をひとかたまりとして選択。**許容度**で選択範囲をライブ調整し、選択範囲の輪郭と**トリミング予定エリア（外接矩形）を点線でリアルタイム表示**。**内側を残す / 内側を消す**を選んで実行。「余白を切り詰め」ONなら外接矩形まで切り詰めます（＝自動トリミング）。余白・境界ぼかし・「隣接のみ」OFF（画像全体から同系色を拾う）も指定可 |
| ペン切り抜き | ベジェのペンツール型。クリックでアンカーを置いて囲み、始点クリックで閉じて**内側を残す/消す**。なめらか補間（Catmull-Rom）・境界ぼかし・余白の切り詰め・アンカーのドラッグ調整 |
| マジックワンド | クリックした場所と**近い色で繋がっている範囲**を透過（許容度スライダ＋数値入力・ソフト境界・1クリック=1履歴） |
| 自動切り抜き | セグメンテーションアダプタ（ML）で被写体を自動検出して背景を透過。**反転**（被写体を消す）・境界ぼかし。アダプタは注入式でコアは依存ゼロのまま |
| 回転 | 90°左右・自由角度スライダ（劣化しない・数値入力可）・**左右/上下反転** |
| 調整 | **明るさ・コントラスト・彩度・色相・ぼかし・ビネット**のスライダ（非破壊・`adjust.sliders` で構成可） |
| トーン補正 | **レベル補正**（黒点/白点/ガンマ）＋**トーンカーブ**（ヒストグラム表示・RGB/R/G/Bチャンネル別・点をクリック追加/ドラッグ/ダブルクリック削除）＋**オートコントラスト・ホワイトバランス**＋**シャープ（アンシャープマスク）**。全部ライブプレビュー→適用で焼き込み |
| 色域調整 | **8色域別のHSL調整**（レッド〜マゼンタの色域を選んで色相±60/彩度/明度。「赤だけ彩度を下げる」等。無彩色は巻き込まない） |
| フィルタ | **モノクロ/セピア/フェード/ウォーム/クール/ビビッド/反転**のプリセット（`filter.presets` で絞り込み・独自CSS filterの追加可） |
| 文字追加 | 内容・色・サイズ・フォントをタイプした瞬間に反映 |
| スタンプ | `stamps` をカテゴリタブで分類表示・クリック挿入 |
| 画像追加 | ファイル選択でオーバーレイ画像レイヤーを追加 |
| 図形 | **四角（角丸スライダ）・円・台形・星（頂点数/尖りスライダ）・吹き出し（しっぽドラッグ）・多角形・線・矢印（両端対応）**（`shape.kinds` で構成可）。線色・太さ・**破線（実線/破線/点線/一点鎖線）**・塗り（**単色/線形グラデ/放射グラデ**）。四角・円・吹き出しは**辺ハンドルで幅・高さを個別変更**（縦横比が変えられる）、線・矢印は左右ハンドルで長さ変更。台形・星・多角形は**頂点をドラッグして自由に変形**＋**なめらか曲線化（Catmull-Rom）**。四角・円は「頂点編集できる図形に変換」でベジェ風の自由変形へ。多角形は**ペンで描く**（クリックで頂点を置き、始点クリックで図形化） |
| ペン | フリーハンド描画。**1ストローク=1レイヤー**なので後から移動・削除できる |
| スポイト | キャンバスの合成後の色を拾い、選択中の図形/文字/ペンの色（未選択ならペンの描画色）に反映 |
| コピースタンプ | Alt+クリック（または最初のクリック）でコピー元を採取→ドラッグで転写（サイズ・硬さ）。ゴミ消し・オブジェクト複製に |
| ブラシ補正 | なぞった部分だけ**明るく（覆い焼き）/暗く（焼き込み）/ぼかし**（サイズ・強さ、1ストローク=1履歴） |
| モザイク | ドラッグ範囲をピクセル化（粗さ設定可） |
| 消しゴム | なぞった部分を透明化（部分透過）。サイズ・硬さ調整、**「戻す」で消しすぎを復元**。ベース画像にも画像レイヤーにも使える |
| フレーム | なし/単色/ライン/二重の縁取り（色・太さリアルタイム） |

- スタンプ・画像レイヤーは選択後「この画像をトリミング」で**個別トリミング**（切り抜き後も位置がずれない）
- **スライダーは数値でも入力できる**: 許容度・太さ・サイズ・角度など**すべてのスライダー**に数値入力欄が並びます。打ち込んで Enter（またはフォーカスを外す）で確定し、範囲外の値は自動でクランプ。スライダーを動かせば数値欄も追従します
- **透明度スライダ**: どのレイヤーも 5〜100% でリアルタイムに半透明化
- **ブレンドモード**: どのレイヤーも乗算/スクリーン/オーバーレイ/覆い焼き/焼き込み/差の絶対値/色相/彩度/カラー/輝度など16種で合成できる
- **レイヤー効果**: 影（色/ぼかし/距離XY）・縁取り（文字/図形/ペン）・グロー を全レイヤーに（チェックひとつ・リアルタイム）
- **背景透過スライダ**: 画像の**外周から繋がっている背景**をflood-fillで透過（グラデーション背景対応・背景色に似た被写体内部は巻き込まない）。許容度を上げ下げしてもセッション元画像から再計算するので劣化しない
- レイヤー操作: 前面へ / 背面へ / 削除
- 円形トリミングや自由回転で透過が生じた場合は PNG/WebP で書き出し

### 自動トリミング

「ペン切り抜きを手で囲むのが面倒」「背景を落として被写体の大きさに切り詰めたい」ときの道具です。

1. ツールバーの**自動トリミング**を選ぶ
2. キャンバス上で**残したい（または消したい）対象をクリック** — 近い色で繋がっている範囲がひとかたまりとして選ばれます
3. **許容度**を動かすと選択範囲がその場で変わります（オレンジの輪郭＝選択範囲、点線の矩形＝トリミング予定エリア）。残らない側は暗転するので結果を見ながら詰められます
4. **内側を残す / 内側を消す**を選んで**実行**

| 設定 | 説明 |
| --- | --- |
| 許容度 | 0〜100。大きいほど広い色差を「同じ対象」とみなす（数値入力可・ライブ反映） |
| 余白 | トリミング予定エリアを外側に広げる px 数 |
| 境界ぼかし | カット境界をぼかす px 数。切り詰め枠もこの分だけ広がる |
| 隣接のみ | OFF にすると繋がっていなくても画像全体から同系色を拾う（背景が被写体で分断されているとき） |
| 余白を切り詰め | 「内側を残す」ときだけ有効。選択範囲の外接矩形までキャンバスを切り詰める |

- 適用先は**ベース画像**です（レイヤーを個別に抜くならマジックワンド／ペン切り抜きを使ってください）
- 実行は1段の履歴になるので「元に戻す」で取り消せます。切り詰めに合わせてレイヤー位置も追従します

```js
editor.setMode('objtrim');
editor.objTrimStyle.tol = 40;              // 許容度
editor.objTrimStyle.trim = true;           // 外接矩形まで切り詰める
editor.pickObjRegion({ x: 320, y: 240 });  // 対象をクリック（image座標）
editor.objTrimRect();                      // → トリミング予定エリア { x, y, width, height }
editor.applyObjTrim(true);                 // true=内側を残す / false=内側を消す
```

### ヒストリー（編集履歴パネル）

パネル下段に**操作の一覧**が常設され、1段ずつ戻る／進むだけでなく**任意の段をクリックして一気に飛べます**。

- 「元に戻す」「やり直す」は**1クリック＝1段**。ボタンのツールチップに残り段数が出ます
- ショートカット: **Ctrl+Z**（戻る）/ **Ctrl+Shift+Z**・**Ctrl+Y**（進む）/ **Ctrl+Alt+Z**（一段階戻る）。スライダーにフォーカスがあっても効きます
- 各段には操作名（「トリミング」「明るさ」「消しゴム」…）が付き、**現在位置が反転表示**、やり直しで進める先は淡色表示
- 戻ってから新しい操作をすると、その先の段は破棄されます（履歴の分岐）
- **戻っても道具は持ったまま**（消しゴムで戻しても消しゴムのまま。トリミング等のセッション型ツールだけ選択に戻ります）
- 連続入力（文字タイプ・スライダードラッグ）は打ち終わりで**1段にまとめて**積まれるので、履歴がスライダーの1目盛りで埋まりません
- 既定は30段。`history: { max: 60 }` で変更、`history: { open: false }` でパネルを閉じた状態で開始（ツールバーの「ヒストリー」ボタンで開閉）

```js
const editor = createRSImageEditor('#editor', { history: { max: 60, open: true } });
editor.on('history', (e) => console.log(e.index, e.label));  // 1段積まれるたび
editor.historyList();          // [{ index, label, ts, current }]
await editor.jumpHistory(3);   // 4段目まで一気に戻る/進む
editor.clearHistory();         // 現在の状態だけ残して捨てる
```

### エディタAPI

`setImage(src)` / `addText(text, opts)` / `addImageLayer(src, opts)` / `addShape(kind, opts)`（kind: `rect | ellipse | trapezoid | star | balloon | poly | line | arrow`。台形・星・多角形は `opts.pts` で初期頂点も指定可） / `finishShapePen()` / `convertToPoly(layer)` / `pickObjRegion(pt)` / `objTrimRect()` / `applyObjTrim(keep)` / `duplicateLayer(layer)` / `alignSelected(mode)` / `flip(axis)` / `export(ops)`（processImage の全オプションが使える） / `flatten()` / `undo()` / `redo()` / `jumpHistory(index)` / `historyList()` / `clearHistory()` / `toggleHistoryPanel(open?)` / `getState()` / `on('change', cb)` / `on('history', cb)` / `destroy()`

レイヤー共通プロパティ: `opacity`（透明度） / `blend`（ブレンドモード） / `fx`（`{ shadow: {color, blur, dx, dy}, outline: {color, width}, glow: {color, blur} }`）。図形はさらに `dash`（`solid|dash|dot|dashdot`）・`fillType`（`solid|linear|radial`）・`fill2`・`gradAngle`・`radius`（角丸）・`smooth`（なめらか曲線）など。

### 自動切り抜き（アダプタ注入）

rs-livecam と同じ契約 `{ name, segment(canvas) → mask | null }` のアダプタを注入します。mask は canvas か ImageData で、**アルファ値=被写体度**（全画素が不透明ならグレースケール輝度を被写体度として自動解釈。RMBG等のグレーマスク対応）。

```js
editor.setSegmentation({ name: 'my-seg', segment(canvas) { /* ... */ return maskCanvas; } });
await editor.autoCut({ invert: false, feather: 4 });   // true=適用成功。undoで取り消せる
```

MediaPipe Selfie Segmentation（人物・軽量）と RMBG-1.4（汎用・約44MB）の実装例は `demo/index.html` の「自動切り抜きアダプタ」ボタンを参照。

- マスクがほぼ空（反転時はほぼ全面）のときは**画像が丸ごと消える事故を防ぐため適用せず false** を返す。失敗理由は `editor.lastAutoCutError`（`'no-adapter' | 'error' | 'no-mask' | 'empty'`）で判別できる
- 人物用（MediaPipe）は**人物が写った写真専用・WebGL必須**。リモートデスクトップ等WebGLの無い環境では WASM で動く RMBG-1.4 を使う

### Vue / React ラッパー

配布ビルドには Vue 3 / React 18 のラッパーコンポーネントが同梱されています（vue / react は peerDependency）。

```js
// Vue 3
import { RsImageEditor } from '@sano1023/rs-image/vue';
// <RsImageEditor :src="fileOrUrl" :height="460" @change="..." ref="ed" />
// await ed.value.export({ format: 'webp' })

// React 18
import { RsImageEditor } from '@sano1023/rs-image/react';
// <RsImageEditor src={fileOrUrl} height={460} onChange={...} ref={ref} />
// await ref.current.export({ format: 'webp' })
```

- `src`（URL / dataURL / File / Blob）の変更を watch して `setImage` します
- ref 経由で `editor() / setImage / export / flatten / undo / redo / jumpHistory / historyList / clearHistory / toggleHistoryPanel / getState / setSegmentation` が使えます
- `history` プロパティでヒストリー設定（`{ max, open }`）を渡せます。1段積まれるたびに `@history` / `onHistory` が発火します
- アンマウントで自動 `destroy()`。デモ: `demo/vue.html` / `demo/react.html`

## 処理エンジンAPI

### `processImage(src, ops): Promise<Result>`

`src`: `File` / `Blob` / dataURL / URL文字列 / `HTMLImageElement` / `HTMLCanvasElement` / `ImageBitmap`。

| オプション | 説明 |
| --- | --- |
| `resize` | `{ width?, height?, fit? }`。片方だけ指定で比率維持。両方＋`fit: 'contain'`（内接）/ `'cover'`（枠を埋めて中央切り出し）/ `'fill'`（歪める） |
| `crop` | `{ x, y, width, height }` 矩形トリミング（回転適用後の座標） |
| `rotate` | `0` / `90` / `180` / `270`（度） |
| `circle` | `true` で円形切り抜き（透過が要るため png/webp 必須。jpeg指定はエラー） |
| `format` | `'png'` / `'jpeg'` / `'webp'`（既定 png） |
| `quality` | `0`〜`1`（jpeg/webp。既定 0.92） |
| `targetBytes` | 目標バイト数。品質を二分探索で寄せる（到達不能なら最小品質にフォールバック） |
| `output` | `'blob'`（既定） / `'dataURL'` / `'canvas'` |
| `background` | 非透過形式の下地色（既定 `'#ffffff'`。透過画像を jpeg 化する際の背景） |
| `maxSourceDimension` | 読み込み時の最大辺（既定 4096）。超える画像は事前縮小してメモリを抑える |
| `autoOrient` | EXIF 正立補正（既定 true） |

**戻り値** `Result`: `{ blob?, dataURL?, canvas?, width, height, bytes, format, quality }`（`bytes` はエンコード後のサイズ）

### ショートカット

```js
import { toBlob, toDataURL } from '@sano1023/rs-image';
const blob = await toBlob(file, { resize: { width: 800 }, format: 'webp' });
const url = await toDataURL(file, { circle: true, format: 'png' });
```

### 低レベルAPI

`loadImage(src, opts)`（EXIF正立込みの読み込み）、`encodeCanvas(canvas, opts)`、`canvasToBlob(canvas, mime, quality)`、`geometry`（fitSize / describeCover / clampCrop / downscaleSteps 等の純関数）も公開しています。

## 仕組み

パイプラインは `load → (rotate) → (crop) → resize → (circle) → encode → 出力`。

- **段階縮小**: `downscaleSteps` が「前段の最大1/2まで」の中間サイズ列を作り、各段を canvas に描いて縮める。1発 drawImage の大縮小で出るエイリアシングを防ぐ
- **EXIF**: `createImageBitmap` の `imageOrientation:'from-image'` を優先。非対応環境は APP1 セグメントを自前パースして回転行列を焼き込む
- **targetBytes**: quality を二分探索。非圧縮画像で目標に届かないときは最小サイズの結果を返す（元の高品質は返さない）
- Canvas 2D のみ使用。`OffscreenCanvas` があれば優先

## 既知の制限（v0.3 時点）

- フィルタ（明るさ等）・ブラシ描画・モザイクは v0.3（REQUIREMENTS.md 参照）
- 文字の縁取り・影、ガンマ/シャープネス調整は未実装
- サーバー送信は行わない（出力の送信は利用側の責務）
- RAW / CMYK / 動画は非対応

## 検証

Playwright（Chromium）による45項目（エンジン12 + エディタ19 + 高度な編集機能14）の自動テストで確認済み。エディタ側は実際のマウスドラッグで枠リサイズ・レイヤー移動・拡縮・回転・スタンプ挿入・undo/redo・平坦化エクスポートを検証。

## ライセンス

MIT
