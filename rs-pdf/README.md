> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール / 読み込み

```bash
# npm（GitHubのtarball指定）
npm install https://github.com/sano1023/ryusuke-packages-dist/raw/main/tarballs/rs-pdf-0.4.0.tgz
```

```html
<!-- CDN（jsDelivr・scriptタグ直読み） -->
<script src="https://cdn.jsdelivr.net/gh/sano1023/ryusuke-packages-dist@main/rs-pdf/dist/rs-pdf.min.js"></script>
```

```js
// ESM import（npmインストール後）
import { /* 公開API */ } from 'rs-pdf';
```

CSSが必要なパッケージは `dist/rs-pdf.css` を link してください。

---

# rs-pdf

有料PDF SDK（PSPDFKit / Apryse / Adobe PDF Embed API）の機能網羅を目指す、依存ゼロのPDFビューア＆注釈ライブラリです（現在 v0.1 = ビューア）。

- **依存ゼロコア**: ランタイム依存なし。ビルド不要で `src/` から直接 import できる ESモジュール
- **レンダラアダプタ注入**: PDFのラスタライズはアダプタ契約に切り出し、コアは永久にこの契約だけに依存する（rs-scanner のデコーダ注入と同じ流儀）。**pdf.js マッパー `pdfjsAdapter(pdfjsLib)` を同梱**（コアからは import しない。利用側が pdf.js を読み込んで渡す）
- **ページ仮想化**: 全ページ分の軽量プレースホルダを並べ、**可視±2枚だけ canvas render**。範囲外は canvasプール（上限8枚）へ返却。100ページのPDFでも同時に存在する canvas は可視±2枚分のみ
- **レティナ対応**: 実効 render scale = zoom × devicePixelRatio（CSSサイズと描画解像度を分離）
- **ズーム**: ＋/−ボタン・Ctrl+ホイール・ピンチ・フィット幅/フィットページ・%表示。変更時は旧canvasをCSS拡縮で即時表示→**150msデバウンス後に高解像度で再render**
- **ページナビ**: サムネイルサイドバー（低解像度render・遅延生成・クリックでジャンプ）・ページ番号入力・前/次・キーボード（PageUp/Down・↑↓・Home/End）
- **回転**: 90°単位・全ページ（アダプタは常に回転0度で render し、core 側で焼き直す）
- **テキスト選択＆コピー**: `getTextContent()` の文字矩形から透明テキストレイヤーを構築
- **テキスト検索**: 全ページ横断・ヒットハイライト・次/前・件数表示（Ctrl+F）
- **印刷**: 全ページをラスタライズしてブラウザ印刷へ
- **アダプタ未注入でも落ちない**: 日本語の明確なエラーメッセージを表示し `error` イベントを発火
- **ダークモード対応**（UIのみ。ページは白のまま）・日本語UI既定・ツールバーに role/aria
- **ライセンス**: MIT

対応ブラウザ: 最新の Chrome / Edge / Safari / Firefox（IE・旧ブラウザは非対応）

## デモ

```bash
# このリポジトリで
php -S localhost:8099   # または任意の静的サーバー
# → http://localhost:8099/rs-pdf/demo/ を開く
```

デモは pdf.js を CDN（jsdelivr の pdfjs-dist）から注入し、同梱の `demo/sample.pdf`（日本語入り6ページ・`demo/make-sample-pdf.mjs` で自前生成）を表示します。ローカルPDFのファイル選択・destroy・アダプタ未注入エラーの再現も試せます。

## インストール

npm公開前は、`src/` ディレクトリをコピーするだけで使えます。

```html
<link rel="stylesheet" href="./rs-pdf/src/rs-pdf.css">
```

```js
import { createRSPDF, pdfjsAdapter } from './rs-pdf/src/index.js';
// npm公開後: import { createRSPDF, pdfjsAdapter } from 'rs-pdf';
```

## クイックスタート

```html
<div id="viewer" style="height: 80vh"></div>
```

```js
import { createRSPDF, pdfjsAdapter } from 'rs-pdf';
import * as pdfjsLib from 'pdfjs-dist';           // または CDN の pdf.min.mjs
pdfjsLib.GlobalWorkerOptions.workerSrc = '...pdf.worker.min.mjs';

const pdf = createRSPDF('#viewer', {
    src: '/docs/contract.pdf',                     // URL | ArrayBuffer | Uint8Array | File
    renderer: pdfjsAdapter(pdfjsLib),              // アダプタ注入（必須）
    zoom: 'fit-width',                             // 'fit-width' | 'fit-page' | 数値(1=100%)
});

pdf.goToPage(5);
pdf.setZoom(1.5);
await pdf.search('請負契約');                      // ヒットハイライト + 次/前
pdf.on('pageChange', ({ page }) => console.log(page));
pdf.destroy();
```

## フォーム入力（v0.3後半）

AcroForm付きPDFを開くと、テキスト / チェック / ラジオ / コンボがページ上のHTML入力として重なり、そのまま入力できる。

- `pdf.form.toJSON() / fromJSON()` で入力値の入出力、`setValue/getValue/listFields`、`formLoad / formChange` イベント
- flatten 出力には入力値が焼き込まれる（テキスト・チェック✓・ラジオ●）
- レンダラ非依存: アダプタ契約の `getFormFields()`（pdf.jsマッパー実装済み）

## 保存の3形態（v0.4）

| 方式 | API | 特徴 |
| --- | --- | --- |
| 注釈JSON | `annotations.toJSON()` | アプリDB保存用・完全ラウンドトリップ |
| XFDF | `pdf.exportXFDF() / importXFDF()` | Adobe/有料SDKとの相互運用（highlight/square/ink/line/freetext等にマップ・座標は左下原点PDF空間へ変換） |
| **PDF追記（増分更新）** | `pdf.saveAnnotated()` | **元PDFのバイト列を一切変えず、末尾に本物のPDF注釈オブジェクト＋新xrefを追記**。Acrobat等でそのまま開けて注釈も編集できる |

増分更新の対応範囲: 従来型xrefテーブル / xrefストリーム（PNG predictor・ObjStm内オブジェクト解決込み）。追記xrefは元PDFと同形式を自動選択。暗号化PDFは明確なエラー。FreeText/スタンプ/日付印の見た目は /AP 画像（JPEG+SMask透過）で埋め込み、日本語もフォント埋め込みなしで確実に表示される（検索可能テキストにはならない割り切り。/Contents にはUTF-16BEで原文が入る）。

ほかに `pdf.flatten()`（注釈・フォーム値を焼き込んだ画像PDF生成・依存ゼロのミニPDFライター）も引き続き利用可能。

## 電子印鑑・日付印（v0.3）

- **日付印**: ツールバーの日付印でクリック押印。「承認 / '26.07.08 / 氏名」の朱色円形印を**依存ゼロで描画**（氏名は `options.author`、ラベルは `options.dateStampLabel`）
- **rs-sign連携**: `annotations.setStampImage(pngDataURL, { widthPt })` にrs-signの印影PNG（認印・角印・データー印）を渡すと、スタンプツールのクリックで押印できる（`demo/index.html` に実装例）
- 印影はJSON保存にも flatten出力にも内包される（flattenしたPDFの押印位置に朱色が焼き込まれることをピクセル検証済み）

## 注釈（v0.2）

ページ上に**SVGオーバーレイ**で注釈を描く。座標はページ寸法比0〜1の正規化で保存され、ズーム・回転・DPRに依存しない。

- **ツール**: 選択 / ハイライト・下線・取り消し線（**テキストをドラッグ選択すると自動で注釈化**）/ ペン（フリーハンド）/ 四角・楕円・直線・矢印 / フリーテキスト（クリック→入力、Ctrl+Enter確定）/ 付箋 / 画像スタンプ（クリック→ファイル選択）
- **編集**: クリック選択・ドラッグ移動・8ハンドルリサイズ（線/矢印は端点ドラッグ）・Delete削除・色/太さ変更・undo/redo（Ctrl+Z/Y）
- **保存**: `pdf.annotations.toJSON() / fromJSON()`（バージョン付きスキーマ・未知typeは保持して再出力）
- **flatten**: `await pdf.flatten({ pages?, scale?, quality?, download? })` — ページ＋注釈を焼き込んだ**画像PDFを依存ゼロの自前ミニPDFライターで生成**（Blob返却。Acrobat/pdf.jsで開ける）
- **拡張**: `defineAnnotationType({ name, draw(ctx), mode, resizable })` で独自注釈タイプを追加（組み込み11種も同じAPIで実装）
- イベント: `annotationAdd / annotationChange / annotationRemove / annotationSelect / toolChange / flatten`
- 作成者は `options.author`、ツール構成は `options.tools`、無効化は `options.annotations: false`

## API

### `createRSPDF(target, options): Viewer`

| オプション | 型 / 既定値 | 説明 |
|---|---|---|
| `src` | string \| ArrayBuffer \| Uint8Array \| File | 開くPDF。省略時は後から `open(src)` |
| `renderer` | アダプタ | **必須**。`pdfjsAdapter(pdfjsLib)` など。未注入だと日本語エラー表示 + `error` イベント（落ちない） |
| `zoom` | `'fit-width'` | `'fit-width'` \| `'fit-page'` \| 数値（1 = 100% = PDF 1ポイント/px） |
| `rotation` | `0` | 初期回転（90°単位） |

### Viewer メソッド

| メソッド | 説明 |
|---|---|
| `open(src)` | PDFを開き直す |
| `goToPage(n)` / `getCurrentPage()` / `getPageCount()` | ページ移動・取得（1始まり） |
| `setZoom(v)` / `getZoom()` / `zoomIn()` / `zoomOut()` | ズーム。`v` は `'fit-width'` \| `'fit-page'` \| 数値 |
| `rotate(deg = 90)` / `setRotation(deg)` / `getRotation()` | 90°単位の回転（全ページ） |
| `search(query)` / `searchNext()` / `searchPrev()` / `clearSearch()` | 全ページ横断検索。`search` は `Promise<{count, matches}>` |
| `toggleSidebar(force?)` / `toggleSearchBar(force?)` | サムネイル / 検索バーの表示切替 |
| `print()` | 全ページをラスタライズしてブラウザ印刷 |
| `focus()` | スクロール領域にフォーカス（キーボード操作用） |
| `destroy()` | canvas・アダプタ・リスナーをすべて解放 |
| `on(event, cb)` / `off(event, cb)` | `load` `error` `pageChange` `zoomChange` `rotate` `search` `print` `destroy` |

キーボード: `PageUp/PageDown`（ページ送り）、`↑↓`（スクロール）、`Home/End`（先頭/末尾ページ）、`Ctrl + +/−/0`（ズーム）、`Ctrl+F`（検索）、`Ctrl+ホイール` / ピンチ（ズーム）。

## レンダラアダプタ契約

コアが依存するのはこの契約だけです。契約を満たせば pdf.js 以外のレンダラにも差し替えられます。

```js
{
    name: 'pdfjs',
    async open(src) {          // src: URL | ArrayBuffer | Uint8Array | File
        return {
            numPages,          // 総ページ数
            async getPage(n) { // n: 1始まり
                return {
                    size,                        // { width, height } PDFポイント（回転0度時）
                    async render(canvas, scale), // canvas にラスタライズ（scale=1 で 72dpi 相当）
                    async getTextContent(),      // [{ str, x, y, w, h }] PDFポイント・左上原点の文字矩形
                    async getFormFields(),       // [{ name, type, rect, value, options? }]（v0.3まで空配列可）
                };
            },
            destroy(),         // リソース解放
        };
    },
}
```

`validateAdapter / validateDocument / validatePage`（いずれも export）で契約適合を検査できます。

### 同梱の pdf.js マッパー

```js
import { pdfjsAdapter } from 'rs-pdf';

const renderer = pdfjsAdapter(pdfjsLib, {
    // getDocument へそのまま渡される（CJKフォントを含むPDFには cMap 類を推奨）
    cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/cmaps/',
    cMapPacked: true,
    standardFontDataUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/standard_fonts/',
});
```

## 仕組み

```
┌───────────────────────────────────────────────────┐
│ 公開API  createRSPDF(el, options)                  │  src/index.js
├───────────────────────────────────────────────────┤
│ Viewer（仮想化・ズーム・回転・検索・印刷・UI統合）   │  src/viewer.js, src/ui.js
├──────────────────┬────────────────────────────────┤
│ TextLayer        │ 純粋関数層（DOM非依存・要テスト）│  src/textlayer.js
│（選択・コピー）   │ virtualizer / zoom / search     │  src/virtualizer.js ほか
├──────────────────┴────────────────────────────────┤
│ RendererAdapter インターフェース                    │  src/adapter.js
├───────────────────────────────────────────────────┤
│ pdfjsAdapter（同梱マッパー）│ 将来: 他レンダラ      │  src/adapters/pdfjs.js
└───────────────────────────────────────────────────┘
```

- **仮想化**: `layoutPages()` が全ページの配置（プレースホルダ）を計算し、`pagesToRender()` が可視±2枚を決める。範囲外の canvas は `CanvasPool`（上限8枚）へ返却
- **回転**: アダプタには回転を渡さず、canvas はcore側で回転焼き直し、テキストレイヤー/ハイライトはCSS transform で回転する（アダプタ契約を最小に保つため）
- **検索**: `getTextContent()` の文字矩形からページ全文を組み立て（行境界に改行を挿入）、部分一致の矩形は文字数比で配分。ヒット矩形はPDFポイントで持ち、ズーム・回転・DPRに非依存
- **ズーム**: 変更直後は既存canvasのCSS拡縮 + テキスト層の `scale()` でつなぎ、150msデバウンス後に `zoom × devicePixelRatio` で再render

## 既知の制限（v0.1 時点）

- 注釈・フォーム・XFDF・flatten は未実装（v0.2〜v0.4 のロードマップ。既存PDFへのインクリメンタル更新書き込みはスコープ外・将来 v1.x で検討）
- 表示モードは連続スクロールのみ（単ページモードは v0.2 予定）
- 開いた時点で全ページのハンドル（寸法）を取得するため、数千ページ級のPDFでは初期表示が遅くなる可能性がある
- テキストレイヤーの文字位置は近似（ベースライン基準・フォント実測幅を scaleX で補正）。検索ハイライトの部分一致矩形は文字数比の配分
- ページ固有の /Rotate が混在するPDFでのテキストレイヤー座標は pdf.js の viewport 変換に依存
- 印刷は全ページを約150dpi でラスタライズする方式（ベクター印刷ではない）

## 検証

- node 単体テスト（`node --test test/`・41件）: 仮想化の可視範囲計算 / ズーム計算 / 検索マッチロジック / アダプタ契約検証・pdfjsAdapter マッパー（モックレンダラ）
- ヘッドレスChromium による受け入れテスト（REQUIREMENTS §6 の12項目）: 表示・遅延レンダのcanvas数・ズーム解像度・フィット・検索・選択コピー・サムネイルジャンプ・ページ送り・回転・未注入エラー・destroy・コンソールエラーなし

## ライセンス

MIT © ryusuke.sano
