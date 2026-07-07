> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール / 読み込み

```bash
# npm（GitHubのtarball指定）
npm install https://github.com/sano1023/ryusuke-packages-dist/raw/main/tarballs/rs-sheet-0.1.0.tgz
```

```html
<!-- CDN（jsDelivr・scriptタグ直読み） -->
<script src="https://cdn.jsdelivr.net/gh/sano1023/ryusuke-packages-dist@main/rs-sheet/dist/rs-sheet.min.js"></script>
```

```js
// ESM import（npmインストール後）
import { /* 公開API */ } from 'rs-sheet';
```

CSSが必要なパッケージは `dist/rs-sheet.css` を link してください。

---

# rs-sheet

有料スプレッドシート製品（Handsontable + HyperFormula / SpreadJS / Ignite UI Spreadsheet 等）の機能網羅を目指す、**本格数式エンジン内蔵・依存ゼロ**のセル指向スプレッドシートライブラリです（現在 v0.1）。

- **本格数式エンジン込みで MIT**: 字句解析 → 再帰下降パーサ → AST評価の自前エンジンを内蔵。HyperFormula が商用ライセンスで提供する領域を依存ゼロ・ライセンスキー不要でカバー
- **依存ゼロ・ビルド不要**: ランタイム依存なし。`src/` から直接 import できる ESモジュール
- **必須関数40個**: SUM / IF / VLOOKUP / SUMIF / IFERROR など（下記一覧）。`defineFunction()` でカスタム関数を数行で追加でき、組み込み関数もすべて同じ API で実装（dogfooding）
- **依存グラフによる差分再計算**: セル変更時は影響セルだけをトポロジカル順に再評価。循環参照は関与セルを `#CYCLE!` に
- **Excel互換の編集体験**: 仮想スクロール（可変行高・列幅）・フィルハンドル・TSVコピペ（Excelと相互）・行列挿入削除で全数式の参照を自動シフト・undo/redo
- **日本の業務書式が標準**: `¥#,##0` 通貨 / 桁区切り / % / 日付 / **和暦（`ggge年m月d日` → 令和8年7月7日）**。`'1,234'` `'¥500'` `'50%'` `'2026/7/7'` や全角数字の入力を自動で型判定
- **rs-grid との棲み分け**: rs-grid は行指向の業務データグリッド、rs-sheet は任意のセルに値・数式・書式を置ける Excel 代替。データモデルも API も別物
- **ライセンス**: MIT

対応ブラウザ: 最新の Chrome / Edge / Safari / Firefox（IE・旧ブラウザは非対応）

## デモ

```bash
# このリポジトリで
php -S localhost:8099   # または任意の静的サーバー
# → http://localhost:8099/rs-sheet/demo/ を開く
```

見積書（単価×数量→小計→消費税→合計が数式で連動・VLOOKUP・和暦の発行日）と売上集計（SUM/AVERAGE/COUNTIF/SUMIF・達成率%・IF判定）の2シナリオを試せます。

## インストール

npm公開前は、`src/` ディレクトリと `src/rs-sheet.css` をコピーするだけで使えます。

```html
<link rel="stylesheet" href="./rs-sheet/src/rs-sheet.css">
```

```js
import { createRSSheet } from './rs-sheet/src/index.js';
// npm公開後: import { createRSSheet } from 'rs-sheet';
```

## クイックスタート

```html
<div id="container"></div>
```

```js
import { createRSSheet } from 'rs-sheet';

const sheet = createRSSheet('#container', {
    data: [                              // 2次元配列（先頭シートに展開）
        ['商品', '単価', '数量', '小計'],
        ['りんご', 120, 10, '=B2*C2'],
        ['みかん', 80, 24, '=B3*C3'],
        ['合計', '', '', '=SUM(D2:D3)'],
    ],
    rows: 100, cols: 26,                 // シートの器のサイズ
    columnWidths: { A: 120 },
    formats: { 'B2:B3': '¥#,##0', 'D2:D4': '¥#,##0' },
    onChange: (changes) => {},           // [{ sheet, ref, oldRaw, newRaw, value }]
});

sheet.setCell('B2', '=SUM(A1:A10)');     // raw を設定 → 依存セルが自動再計算
sheet.getCell('B2').value;               // 評価済みの実値（数値）
sheet.getCell('B2').text;                // フォーマット済み表示値（'¥44,927'）
sheet.getCell('B2').raw;                 // '=SUM(A1:A10)'
sheet.setFormat('D2:D4', '¥#,##0');
sheet.toJSON();                          // fromJSON とラウンドトリップ保証
sheet.destroy();
```

## API

### `createRSSheet(target, options): RSSheet`

| オプション | 型 / 既定値 | 説明 |
|---|---|---|
| `data` | `any[][]` | 2次元配列。先頭シートの A1 から展開（数式は `'=...'` 文字列） |
| `cells` | object | 疎なセルマップ `{ B2: { raw, format?, style? } }`（raw 文字列だけでも可） |
| `rows` / `cols` | `100` / `26` | シートの器のサイズ（データが大きければ自動拡張） |
| `height` | `480` | 表示高さ(px) |
| `columnWidths` | `{}` | `{ A: 120 }` または `{ 0: 120 }` |
| `rowHeights` | `{}` | `{ 0: 36 }`（行インデックスは0始まり） |
| `formats` | `{}` | `{ 'B2:B100': '¥#,##0' }` 範囲→フォーマット |
| `defaultColWidth` / `defaultRowHeight` | `88` / `26` | 既定の列幅・行高(px) |
| `onChange` | `(changes) => {}` | セル変更時。`[{ sheet, ref, oldRaw, newRaw, value }]` |
| `onSelectionChange` | `(sel) => {}` | 選択変更時。`{ r0, c0, r1, c1, ref }` |

### RSSheet メソッド

| メソッド | 説明 |
|---|---|
| `getCell(ref)` | `{ raw, value, text, format, style }`。value=評価済み実値、text=フォーマット済み表示値 |
| `setCell(ref, raw)` | raw を設定（数式は自動再計算・undo履歴に積む） |
| `setFormat(range, fmt)` / `setStyle(range, style)` | 範囲にフォーマット / スタイル（`{bold, italic, underline, color, bg, align}`） |
| `insertRows(i, n)` / `deleteRows(i, n)` / `insertCols(i, n)` / `deleteCols(i, n)` | 行列の挿入・削除（全数式の参照を自動シフト。i は0始まり） |
| `setColWidth(col, px)` / `setRowHeight(row, px)` | 列幅・行高の変更 |
| `select(range)` / `getSelection()` | 選択の取得・設定 |
| `undo()` / `redo()` | undo / redo（Ctrl+Z / Ctrl+Y） |
| `toJSON()` / `fromJSON(json)` | 直列化。value は保存せず raw から再計算で復元（ラウンドトリップ保証） |
| `on(event, cb)` / `off(event, cb)` | `change` / `selectionChange` |
| `destroy()` | 破棄 |

### キーボード・マウス操作

- **編集**: ダブルクリック / F2 / 文字キー直接入力（置換）。Esc取消、Enter=下へ / Tab=右へ
- **編集開始時は raw** が見える（`¥1,234,567` と表示されるセルも `1234567` を編集）
- **数式入力モード**: `=` で始まる入力中は参照セルをクリック（ドラッグで範囲）すると挿入される
- **移動**: 矢印 / Tab / Enter / PageUp/Down / Home / Ctrl+Home / Ctrl+End
- **選択**: ドラッグ / Shift+矢印 / Shift+クリック / Ctrl+A / 行列ヘッダークリック
- **フィルハンドル**: 選択右下の■を下/右へドラッグ。数値2個以上は連続データ、数式は相対参照シフト
- **クリップボード**: Ctrl+C/X/V。Excel と TSV で相互コピペ（数式は raw でコピー・相対シフトして貼り付け）
- **右クリック**: 行列の挿入/削除（ヘッダー上）、コピー/切り取り/クリア/フォーマット設定（セル上）
- **列幅・行高**: ヘッダー境界をドラッグ
- **タッチ**: タップ選択・ダブルタップ編集・慣性スクロール

## 数式エンジン

- **参照**: `A1` / 絶対参照 `$A$1` `$A1` `A$1` / 範囲 `A1:B10`。シート間参照 `Sheet2!A1` は構文解釈のみ（評価は v0.3）
- **演算子**: `+ - * / ^ %`（後置）`&`（文字列結合）`= <> < <= > >=`。優先順位は Excel 準拠（単項マイナスは `^` より強く `-2^2=4`）
- **全角入力**: `＝ＳＵＭ（Ａ１、Ｂ２）` のような全角の数式・数値も半角に正規化して受け付ける
- **エラー型**: `#DIV/0!` `#REF!` `#VALUE!` `#NAME?` `#CYCLE!`（循環参照）`#N/A` `#NUM!`。エラーは第一級の値として伝播し、`IFERROR` / `ISERROR` / `COUNT` 系だけが捕捉できる
- **差分再計算**: セルごとに参照先/参照元の双方向依存グラフを保持し、変更の影響セルだけをトポロジカル順に再評価（範囲参照は「範囲購読」として持つため `SUM(A1:A10000)` でも軽量）
- **参照シフト**: フィル/コピーの相対シフトも行列挿入削除の再配置も AST 変形で行う（文字列置換はしない）。削除範囲を指す参照は `#REF!` に落ちる

### 組み込み関数（v0.1 の40個）

| 分類 | 関数 |
|---|---|
| 集計 | SUM / AVERAGE / COUNT / COUNTA / MAX / MIN / SUMIF / COUNTIF |
| 論理 | IF / AND / OR / NOT / IFERROR / ISERROR / ISBLANK / ISNUMBER |
| 数値 | ROUND / ROUNDUP / ROUNDDOWN / ABS / INT / MOD |
| 文字列 | CONCATENATE / LEFT / RIGHT / MID / LEN / TRIM / UPPER / LOWER |
| 日付 | TODAY / NOW / DATE / YEAR / MONTH / DAY |
| 検索 | VLOOKUP / HLOOKUP / INDEX / MATCH |

`IF` / `AND` / `OR` / `IFERROR` / `ISERROR` は短絡評価（lazy）。`SUMIF` / `COUNTIF` の条件は `">100"` `"<>x"` `"A*"`（ワイルドカード `*` `?`）に対応。

### カスタム関数 — `defineFunction(name, fn, opts)`

```js
import { defineFunction } from 'rs-sheet';

defineFunction('TAXINC', (v) => Math.floor(v * 1.10), { minArgs: 1, maxArgs: 1 });
// → セルに =TAXINC(B2) と書ける
```

`opts`: `{ minArgs, maxArgs, lazy }`。`lazy: true` なら `fn(argNodes, ctx)` で未評価ASTを受け取り `ctx.eval(node)` で評価する（短絡評価・エラー捕捉が可能）。

## フォーマット

`'#,##0'`（桁区切り）/ `'#,##0.00'` / `'¥#,##0'`（円通貨）/ `'0%'` `'0.0%'` / `'yyyy/mm/dd'` / `'yyyy年m月d日'` / **和暦 `'ggge年m月d日'`（令和8年7月7日）** / `'m/d'` / `'h:mm'`。

日付は Excel 互換のシリアル値（1899-12-30 起点）で持ちます。`'1,234'` `'¥500'` `'50%'` `'2026/7/7'` などの入力は自動で型判定され、フォーマット付き数値/日付になります（全角数字も可）。

## toJSON スキーマ

```js
{
  version: 1,
  activeSheet: 0,
  sheets: [{
    name: 'Sheet1',
    rows: 100, cols: 26,
    cells: { 'B2': { raw: '=B1*2', format: '¥#,##0', style: { bold: true } } },
    colMeta: { '0': { width: 120 } },   // 疎。value は保存しない（raw から再計算で復元）
    rowMeta: { '2': { height: 48 } },
  }],
  namedRanges: {},                       // v0.3
}
```

## 仕組み

```
┌───────────────────────────────────────────────────┐
│ 公開API  createRSSheet(el, options)                │  src/index.js
├───────────────────────────────────────────────────┤
│ SheetModel（疎セルマップ・列/行メタ・行列挿入削除） │  src/model.js
├─────────────────────────┬─────────────────────────┤
│ FormulaEngine            │ History（undo/redo）     │  src/engine.js, history.js
│  Lexer → Parser → AST    │                          │  src/lexer.js, parser.js
│  DependencyGraph（差分） │                          │  src/depgraph.js
│  Functions（40関数）     │                          │  src/functions.js, evaluator.js
│  AST変形（参照シフト）   │                          │  src/transform.js
├─────────────────────────┴─────────────────────────┤
│ Formatter（実値 → 表示値: 通貨/%/日付/和暦）        │  src/format.js
├───────────────────────────────────────────────────┤
│ Renderer + Selection + Clipboard + Editor          │  src/sheet.js
│（仮想スクロール・sticky ヘッダー・textarea proxy）  │
└───────────────────────────────────────────────────┘
```

- **疎なセルマップ**: シートは `Map<'row,col', Cell>`。1万行×100列の器でも値のあるセルの分しかメモリを使わない。セルは `raw`（入力そのもの）と `value`（評価済み実値）を分離し、表示はさらにフォーマッタを通す
- **数式エンジンは DOM 非依存の純粋モジュール**: lexer / parser / 依存グラフ / 関数群を分離し、node 単体で全関数のテストが走る（`node --test test/`）
- **仮想スクロール**: 可視範囲のセルだけを DOM に描画。行高・列幅の累積オフセット配列 + 二分探索。固定ヘッダーは `position: sticky`
- **クリップボード**: 不可視 textarea プロキシでネイティブ copy/cut/paste を受ける（権限プロンプト不要・Excel と相互TSV）
- **テーマ**: CSSカスタムプロパティ（`--rss-*`）で差し替え

## ロードマップ（REQUIREMENTS.md 参照）

- **v0.1（現在）**: 数式エンジンコア（40関数・差分再計算・循環検出）+ 仮想スクロールシート + Excel互換コピペ + フィル + undo/redo + フォーマット
- v0.2: 関数100超（XLOOKUP / SUMIFS / TEXT / EOMONTH / 統計系…）・セル結合・ウィンドウ枠固定・条件付き書式・データ検証・オートフィルタ
- v0.3: 複数シートタブ・シート間参照の評価・名前付き範囲・CSV/JSON入出力・検索置換
- v0.4: 10万セル性能・カスタムセルレンダラ/エディタ・rs-chart 連携
- v0.5: 変更イベントストリーム（共同編集の土台）・数式監査

## 検証

- node 単体テスト 85項目（`node --test test/`）: Lexer/Parser/シリアライザ・40関数各1ケース以上・エラー型と伝播・依存差分再計算・循環検出（直接/間接/自己/範囲）・行列挿入削除の参照シフト・フィル/コピーの相対シフト・toJSON/fromJSON ラウンドトリップ・`SUM(A1:A9999)` 性能
- ヘッドレスChromium による受け入れテスト13項目（REQUIREMENTS §6）: 入力→数式連動・差分再計算・循環・エラー表示・行挿入/削除シフト・フィルハンドル・TSVコピペ・undo/redo・フォーマットと raw 編集・VLOOKUP・空データ/10,000セル・toJSON/fromJSON・タッチ操作を全パス

## ライセンス

MIT © ryusuke.sano
