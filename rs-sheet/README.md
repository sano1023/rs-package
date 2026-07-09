> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm install @parelabo/rs-sheet
```

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-sheet-0.5.0.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSSheet } from '@parelabo/rs-sheet';
import '@parelabo/rs-sheet/rs-sheet.css';   // スタイル（バンドラ経由）

createRSSheet(document.querySelector('#app'), { /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@parelabo/rs-sheet@0.5.0/dist/rs-sheet.css">
<script src="https://cdn.jsdelivr.net/npm/@parelabo/rs-sheet@0.5.0/dist/rs-sheet.min.js"></script>
<script>
  // 公開APIはグローバル RSSheet に載る
  RSSheet.createRSSheet(document.querySelector('#app'), { /* オプション */ });
</script>
```

### Vue 3

```js
import { RsSheet } from '@parelabo/rs-sheet/vue';
import '@parelabo/rs-sheet/rs-sheet.css';   // スタイル（バンドラ経由）
```

```vue
<template>
  <RsSheet />
</template>
```

### React 18 / 19

```jsx
import { RsSheet } from '@parelabo/rs-sheet/react';
import '@parelabo/rs-sheet/rs-sheet.css';   // スタイル（バンドラ経由）

export default function App() {
  return <RsSheet />;
}
```

> `vue` / `react` は peerDependency です（バンドルには含みません）。アプリ側のものが使われます。

---

# rs-sheet

**本格数式エンジン内蔵・依存ゼロ**のセル指向スプレッドシートライブラリです（現在 v0.5）。

- **本格数式エンジン込みで MIT**: 字句解析 → 再帰下降パーサ → AST評価の自前エンジンを内蔵。数式エンジンまで含めて依存ゼロ・ライセンスキー不要
- **依存ゼロ・ビルド不要**: ランタイム依存なし。`src/` から直接 import できる ESモジュール
- **組み込み関数136個**: SUM / IF / VLOOKUP に加え **XLOOKUP / SUMIFS / COUNTIFS / TEXT / SUBSTITUTE / DATEDIF / EOMONTH / WORKDAY / NETWORKDAYS（祝日対応）/ MEDIAN / STDEV / RANK / PERCENTILE** など（下記一覧）。`defineFunction()` でカスタム関数を数行で追加でき、組み込み関数もすべて同じ API で実装（dogfooding）
- **共同編集の土台（v0.5）**: **変更イベントストリーム（`on('ops', ops => …)`。共同編集サーバへ流せる op 粒度の差分 `{type,payload,seq}` を発火。既存 `on('change')` はそのまま）・読み取り専用ビュー（`readOnly` オプション / `setReadOnly()`。入力・削除・ペースト・フィル・行列挿入削除・undo/redo を禁止し、閲覧・選択・コピーは可）・数式監査（`setAudit()`。選択セルの参照元 / 参照先を依存グラフから辿って矢印で表示）**
- **性能とカスタマイズ（v0.4）**: **10万セル対応（差分描画＋再計算・再描画の microtask バッチ化で、同一 tick の多数変更を1回の再描画に束ねる）・カスタムセルレンダラ / エディタ（`defineCellRenderer()`、組み込みの チェックボックス / 選択肢（ドロップダウン）セル）・rs-chart 連携（範囲を選んでチャート化。`createRSChart` があれば動く opt-in 連携でハード依存にしない）**
- **複数シート（v0.3）**: **シートタブ（追加 / 削除 / リネーム）・シート間参照 `Sheet2!A1` の評価（依存グラフはシート横断で、別シートのセルを変えると参照先が再計算される）・名前付き範囲 `=SUM(売上)`・CSV / JSON 入出力・検索置換・印刷**
- **表現力（v0.2）**: **セル結合・ウィンドウ枠固定（行/列フリーズ）・条件付き書式（カラースケール / データバー / セル値ルール）・データ検証（リスト→ドロップダウン / 数値範囲）・オートフィルタ・範囲ソート**
- **依存グラフによる差分再計算**: セル変更時は影響セルだけをトポロジカル順に再評価。循環参照は関与セルを `#CYCLE!` に
- **Excel互換の編集体験**: 仮想スクロール（可変行高・列幅）・フィルハンドル・TSVコピペ（Excelと相互）・行列挿入削除で全数式の参照を自動シフト・undo/redo
- **日本の業務書式が標準**: `¥#,##0` 通貨 / 桁区切り / % / 日付 / **和暦（`ggge年m月d日` → 令和8年7月7日）**。`'1,234'` `'¥500'` `'50%'` `'2026/7/7'` や全角数字の入力を自動で型判定
- **rs-grid との棲み分け**: rs-grid は行指向の業務データグリッド、rs-sheet は任意のセルに値・数式・書式を置けるセル指向スプレッドシート。データモデルも API も別物
- **ライセンス**: MIT

対応ブラウザ: 最新の Chrome / Edge / Safari / Firefox（IE・旧ブラウザは非対応）

## デモ

```bash
# このリポジトリで
php -S localhost:8099   # または任意の静的サーバー
# → http://localhost:8099/rs-sheet/demo/ を開く
```

見積書（単価×数量→小計→合計が連動・XLOOKUP・タイトルのセル結合・見出しの枠固定・数量の数値検証・コードのリスト入力・小計のデータバー・和暦の発行日）と売上集計（SUMIFS/MEDIAN/RANK・カラースケール・データバー・達成率のセル値ルール・判定のリスト検証・オートフィルタ）の2シナリオを試せます。

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
| `onOps` | `(ops) => {}` | 変更イベントストリーム（v0.5）。op 粒度の差分 `[{ type, payload, seq }]`（`on('ops', …)` と同じ。共同編集サーバへ流せる） |
| `readOnly` | `false` | 読み取り専用ビュー（v0.5）。true で全ての編集操作を禁止し閲覧のみに |

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
| `mergeCells(range)` / `unmergeCells(range)` | セル結合・解除 |
| `setFreeze(rows, cols)` / `freezeAtSelection()` | ウィンドウ枠固定（先頭 N 行 / M 列） |
| `addConditionalFormat(range, rule)` / `clearConditionalFormats()` | 条件付き書式（`{type:'colorScale'/'dataBar'/'cellValue', ...}`） |
| `setValidation(range, v)` / `clearValidation(range?)` | データ検証（`{type:'list', values}` / `{type:'number', op, min, max}`） |
| `setFilter(range)` / `clearFilter()` / `applyColumnFilter(col, values)` | オートフィルタ |
| `sortRange(range, keyCol, order)` | 範囲を列で並べ替え（`'asc'`/`'desc'`） |
| `addSheet(name?)` / `removeSheet(i?)` / `renameSheet(i, name)` / `switchSheet(i)` | 複数シート操作（v0.3）。追加は末尾・名前は自動で一意化。リネームは数式内の `Sheet2!A1` も追従 |
| `sheetNames()` | シート名の配列 |
| `defineName(name, def)` / `deleteName(name)` / `listNames()` | 名前付き範囲（v0.3）。`def` は `'B2:B10'` / `'Sheet2!A1:A10'` |
| `exportCSV({sheet?, mode?, delimiter?})` / `importCSV(text, {sheet?, origin?, delimiter?, clear?})` | CSV 入出力（v0.3）。`mode:'value'`（表示値・既定）/ `'raw'`（数式そのもの） |
| `exportJSON(pretty?)` / `importJSON(json)` | ブック全体の JSON 入出力（v0.3。namedRanges・全シート含む） |
| `find(query, opts?)` / `replaceAll(query, replacement, opts?)` | 検索・置換（v0.3）。`opts`: `{matchCase, wholeCell, inFormulas, allSheets}` |
| `toHTMLTable(i?)` / `print(i?)` | 印刷（v0.3）。使用範囲を静的テーブル化 / 別ウィンドウで印刷 |
| `setCellType(range, type, options?)` / `clearCellType(range)` | カスタムセル型（v0.4）。`type` は `'checkbox'` / `'select'`（`options={values:[...]}`）/ `defineCellRenderer()` で登録した独自型 |
| `chartFromRange(range, target, opts?)` | 選択（または指定）範囲を rs-chart でチャート化（v0.4・opt-in）。`opts`: `{type, orientation, headers, categories, ...rs-chart オプション}`。rs-chart が無ければ明確なエラー |
| `flush()` | 保留中の再描画（microtask バッチ）を即時反映（v0.4） |
| `setReadOnly(v?)` / `isReadOnly()` | 読み取り専用ビューの切替・照会（v0.5）。true で編集操作を禁止、閲覧・選択・コピーは可 |
| `setAudit(on?)` / `toggleAudit()` / `isAuditOn()` | 数式監査の矢印表示を切替（v0.5）。選択セルの参照元(青)/参照先(赤)を描画 |
| `getAuditTrace(ref?)` | 参照元/参照先を辿った純粋データ `{ target, precedents:{cells,ranges}, dependents }`（v0.5） |
| `toJSON()` / `fromJSON(json)` | 直列化。value は保存せず raw から再計算で復元（ラウンドトリップ保証。結合・固定・書式・検証・フィルタ・セル型・複数シート・名前付き範囲も往復） |
| `on(event, cb)` / `off(event, cb)` | `change` / `ops`（v0.5・op 粒度の差分ストリーム） / `selectionChange` / `sheetChange` |
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

- **参照**: `A1` / 絶対参照 `$A$1` `$A1` `A$1` / 範囲 `A1:B10` / **シート間参照 `Sheet2!A1`・`'見積 4月'!A1:B10`（v0.3で評価。依存グラフはシート横断）** / **名前付き範囲 `=SUM(売上)`（v0.3）**
- **演算子**: `+ - * / ^ %`（後置）`&`（文字列結合）`= <> < <= > >=`。優先順位は Excel 準拠（単項マイナスは `^` より強く `-2^2=4`）
- **全角入力**: `＝ＳＵＭ（Ａ１、Ｂ２）` のような全角の数式・数値も半角に正規化して受け付ける
- **エラー型**: `#DIV/0!` `#REF!` `#VALUE!` `#NAME?` `#CYCLE!`（循環参照）`#N/A` `#NUM!`。エラーは第一級の値として伝播し、`IFERROR` / `ISERROR` / `COUNT` 系だけが捕捉できる
- **差分再計算**: セルごとに参照先/参照元の双方向依存グラフを保持し、変更の影響セルだけをトポロジカル順に再評価（範囲参照は「範囲購読」として持つため `SUM(A1:A10000)` でも軽量）
- **参照シフト**: フィル/コピーの相対シフトも行列挿入削除の再配置も AST 変形で行う（文字列置換はしない）。削除範囲を指す参照は `#REF!` に落ちる

### 組み込み関数（136個）

| 分類 | 関数 |
|---|---|
| 集計 | SUM / AVERAGE / AVERAGEA / COUNT / COUNTA / COUNTBLANK / MAX / MIN / PRODUCT / SUMPRODUCT / SUMSQ |
| 条件付き集計 | SUMIF / COUNTIF / **SUMIFS / COUNTIFS / AVERAGEIF / AVERAGEIFS / MAXIFS / MINIFS** |
| 論理 | IF / AND / OR / NOT / TRUE / FALSE / XOR / **IFS / SWITCH** / IFERROR / IFNA / ISERROR / ISERR / ISNA / ISBLANK / ISNUMBER / ISTEXT / ISNONTEXT / ISLOGICAL / ISEVEN / ISODD / NA |
| 数値・数学 | ROUND / ROUNDUP / ROUNDDOWN / ABS / INT / MOD / SQRT / POWER / EXP / LN / LOG / LOG10 / SIGN / TRUNC / CEILING / FLOOR / MROUND / QUOTIENT / GCD / LCM / FACT / COMBIN / EVEN / ODD / PI / RADIANS / DEGREES / SIN / COS / TAN |
| 統計 | **MEDIAN / MODE / STDEV / STDEVP / VAR / VARP / LARGE / SMALL / RANK / PERCENTILE / QUARTILE**（STDEV.S/.P・VAR.S/.P 別名あり） |
| 文字列 | CONCATENATE / LEFT / RIGHT / MID / LEN / TRIM / UPPER / LOWER / **TEXT / VALUE / SUBSTITUTE / FIND / SEARCH / REPLACE / REPT / PROPER / TEXTJOIN / EXACT / CHAR / CODE / T / CLEAN** |
| 日付・時刻 | TODAY / NOW / DATE / YEAR / MONTH / DAY / **EDATE / EOMONTH / DATEDIF / WEEKDAY / WEEKNUM / WORKDAY / NETWORKDAYS / DAYS / DATEVALUE / HOUR / MINUTE / SECOND / TIME** |
| 検索・参照 | VLOOKUP / HLOOKUP / INDEX / MATCH / **XLOOKUP / LOOKUP / CHOOSE / ROWS / COLUMNS** |

`IF` / `AND` / `OR` / `IFERROR` / `IFS` / `SWITCH` / `IFNA` などは短絡評価（lazy）。`SUMIF(S)` / `COUNTIF(S)` の条件は `">100"` `"<>x"` `"A*"`（ワイルドカード `*` `?`）に対応。`WORKDAY` / `NETWORKDAYS` は第3引数で**祝日リスト（範囲）**を受け付けます。`defineFunction()` で登録するので合計は簡単に拡張できます。

### カスタム関数 — `defineFunction(name, fn, opts)`

```js
import { defineFunction } from 'rs-sheet';

defineFunction('TAXINC', (v) => Math.floor(v * 1.10), { minArgs: 1, maxArgs: 1 });
// → セルに =TAXINC(B2) と書ける
```

`opts`: `{ minArgs, maxArgs, lazy }`。`lazy: true` なら `fn(argNodes, ctx)` で未評価ASTを受け取り `ctx.eval(node)` で評価する（短絡評価・エラー捕捉が可能）。

## 表現力（v0.2）

```js
sheet.mergeCells('A1:F1');                       // セル結合（左上の値を表示）
sheet.setFreeze(3, 1);                            // 先頭3行・1列をウィンドウ枠固定
sheet.freezeAtSelection();                        // アクティブセルの左上で固定

// 条件付き書式
sheet.addConditionalFormat('B4:D8', { type: 'colorScale', minColor: '#fdecec', midColor: '#fff6cc', maxColor: '#c6efce' });
sheet.addConditionalFormat('E4:E8', { type: 'dataBar', color: '#bcd8ff' });
sheet.addConditionalFormat('G4:G8', { type: 'cellValue', op: '>=', value: 1, style: { bg: '#c6efce', bold: true } });

// データ検証（リストはセル選択時に ▾ ドロップダウン、数値範囲外は赤枠 + ツールチップ）
sheet.setValidation('C7:C11', { type: 'list', values: ['PC-01', 'MN-01', 'DK-01'] });
sheet.setValidation('D7:D11', { type: 'number', op: 'between', min: 1, max: 999 });

// オートフィルタ・ソート（ヘッダー行の ▾ から値の絞り込みと並べ替え）
sheet.setFilter('A3:H8');
sheet.applyColumnFilter(7, ['達成']);            // 列7が「達成」の行だけ表示
sheet.sortRange('A4:H8', 4, 'desc');             // 4列目で降順ソート
```

- **セル結合**: `position` はスパースな `merges` 配列で保持。仮想スクロールでもアンカーが範囲外の結合を正しく描画し、覆われたセルはスキップ。選択・行列挿入削除は結合に追従
- **枠固定**: 固定行/列は独立したオーバーレイ層でスクロールに追従（横スクロールで固定行が横に、縦スクロールで固定列が縦に動き、交差はコーナーで固定）
- **条件付き書式**: カラースケールは範囲の min/max から2〜3色を線形補間、データバーは背景グラデーション、セル値ルールは比較 / between / contains に対応
- **データ検証・フィルタ・ソートの判定ロジックは `src/features.js` に純粋関数として分離**し、node 単体でテスト可能（`colorScaleBg` / `validateValue` / `compareValues` など）

## 性能とカスタマイズ（v0.4）

### 10万セル性能 — 差分描画 + 再描画バッチ化

```js
const sheet = createRSSheet('#el', { rows: 2000, cols: 50, cells });   // 10万セルでも初期描画は可視分のみ

// 同一 tick の多数変更は microtask で1回の再描画に束ねられる
for (let i = 0; i < 300; i++) sheet.setCell(`A${i + 1}`, String(i));   // 再描画は1回だけ
sheet.flush();                                                         // 保留中の再描画を即時反映（任意）
```

- **差分描画**: セル変更後は「再計算されたセル ∪ 直接変更したセル」のうち**可視範囲のものだけ**を DOM で差し替える（`src/batch.js` の `dirtyCellsInView`）。10万セルでも実際に触るのは変わった数セル
- **再描画バッチ化**: 変更のたびに描画せず `RenderBatcher` が microtask にまとめ、1フレームに1回だけ描画する（結合・条件付き書式があるシートは範囲全体に影響するため全面再描画にフォールバック）。値の再計算は同期のまま（`getCell().value` は即座に確定）

### カスタムセルレンダラ / エディタ — `defineCellRenderer()`

```js
import { defineCellRenderer } from 'rs-sheet';

// 組み込み: チェックボックス（クリック / Space でトグル）と 選択肢（ドロップダウン）
sheet.setCellType('E4:E8', 'checkbox');
sheet.setCellType('G4:G8', 'select', { values: ['高', '中', '低'] });

// 独自レンダラを数行で追加
defineCellRenderer('stars', { editor: false, render(el, ctx) { el.textContent = '★'.repeat(Number(ctx.value) || 0); } });
sheet.setCellType('H4:H8', 'stars');
```

- レンダラ定義は `render(el, ctx)` 必須（`ctx = {value, text, cell, options, doc}`）。`editor:false` でテキスト編集を抑止しクリック操作に、`editor:'dropdown'` で選択肢メニューに。`onActivate(ctx)` はクリック / Space 時の書き込み値を返す
- セル型は範囲単位で保持し `toJSON`/`fromJSON`・行列挿入削除・undo に追従。トグル / 選択肢の純粋ロジックは `src/cell-renderers.js`（`checkboxChecked` / `toggledCheckboxRaw` / `choiceValues`）で node 単体テスト可能

### rs-chart 連携（opt-in・ハード依存なし）

```js
// rs-chart（createRSChart）が window かオプションにあれば動く。無ければ明確なエラー
sheet.select('B3:D8');
const chart = sheet.chartFromRange(sheet.getSelection().ref, '#chart', { type: 'column' });
```

- 範囲のセル行列 → rs-chart の `{type, xAxis.categories, series}` への変換は `src/chart-adapter.js` の **純粋関数 `rangeToChartData`**（見出し行 / ラベル列の自動判定・`orientation` で系列を行/列どちらに取るか・pie は name/value ペア）。node 単体でテスト可能
- rs-chart の**ソースには一切依存しない**。`createRSChart` を `options.createChart` か `window.createRSChart` で解決し、無ければ「rs-chart が見つかりません」と投げる

## 共同編集の土台（v0.5）

### 変更イベントストリーム — `on('ops', ops => …)`

```js
// op 粒度の差分イベントを購読（共同編集サーバへそのまま流せる）
sheet.on('ops', (ops) => {
    for (const op of ops) socket.send(op); // { type, payload, seq }
});
sheet.setCell('B2', '=A1*2');
// → [{ type:'set-cell', seq:1, payload:{ sheet:'Sheet1', ref:'B2', row:1, col:1,
//        oldRaw:'', newRaw:'=A1*2', oldFormat, newFormat, oldStyle, newStyle, value } }]
```

- `type` は `set-cell` / `clear-cell` / `insert-rows` / `delete-rows` / `insert-cols` / `delete-cols`。各 op に単調増加の `seq` が付き、順序付けに使える
- 既存の `on('change')`（高レベルの changes 配列）は**そのまま**。`ops` は別チャンネルなので後方互換を壊さない
- op の生成（`changesToOps`）と復元（`opToEntry` / `opsToEntries`）は `src/changestream.js` の**純粋関数**。受信側は `engine.applyCellChanges(opsToEntries(ops))` でストリームを再適用できる（node 単体でラウンドトリップをテスト可能）

### 読み取り専用ビュー — `readOnly` / `setReadOnly()`

```js
const view = createRSSheet('#el', { data, readOnly: true }); // 閲覧専用
view.setReadOnly(false); // 編集可能に戻す
```

- 入力・F2・Delete・ペースト・切り取り・フィルハンドル・行列挿入削除・undo/redo・チェックボックス/選択肢の操作・コンテキストメニューの編集項目を**すべて禁止**。選択・スクロール・コピー・数式監査といった**閲覧操作は使える**
- プログラム API（`setCell` 等）は共同編集の受信のため**あえて禁止しない**（リモートの変更を反映できる）。UI クラス `rss--readonly` が付く

### 数式監査 — `setAudit()` / `getAuditTrace()`

```js
sheet.setAudit(true);      // 監査モード ON
sheet.select('A3');        // 選択セルの参照元/参照先に矢印
sheet.getAuditTrace('A3'); // { precedents:{cells,ranges}, dependents } の純粋データ
```

- 既存の**依存グラフ**（`precedents` / `dependents` / 範囲購読）から、選択セルの**参照元（precedents・青矢印）**と**参照先（dependents・赤矢印）**を辿って SVG オーバーレイに描画。範囲参照は点線ボックス + 矢印で表示
- トレースの純粋関数は `src/audit-trace.js`（`precedentsOf` / `dependentsOf` / `traceCell` / `arrowBetween`）。矢印は依存グラフと厳密に一致し、node 単体でテスト可能

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
    // 非空のときだけ出力: merges / freeze / condFormats / validations / filter /
    // cellTypes（v0.4: [{range, type:'checkbox'|'select', options}]）
  }],
  namedRanges: { '売上': 'Sheet1!B2:B10' }, // v0.3。名前 → 参照文字列（シート修飾込み）
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
│  Functions（136関数）    │                          │  src/functions.js, evaluator.js
│  AST変形（参照シフト）   │                          │  src/transform.js
├─────────────────────────┴─────────────────────────┤
│ Formatter（実値 → 表示値）│ Features（条件付き書式・  │  src/format.js
│（通貨/%/日付/和暦）       │  検証・ソートの純粋判定）  │  src/features.js
├─────────────────────────┬─────────────────────────┤
│ ChangeStream（op 粒度の  │ AuditTrace（参照元/参照先 │  src/changestream.js
│  差分と復元・純粋）       │  トレース・純粋）         │  src/audit-trace.js
├─────────────────────────┴─────────────────────────┤
│ Renderer + Selection + Clipboard + Editor          │  src/sheet.js
│（仮想スクロール・結合・枠固定・条件付き書式・検証・   │
│  オートフィルタ・sticky ヘッダー・textarea proxy・   │
│  読み取り専用ビュー・数式監査の矢印オーバーレイ）     │
└───────────────────────────────────────────────────┘
```

- **疎なセルマップ**: シートは `Map<'row,col', Cell>`。1万行×100列の器でも値のあるセルの分しかメモリを使わない。セルは `raw`（入力そのもの）と `value`（評価済み実値）を分離し、表示はさらにフォーマッタを通す
- **数式エンジンは DOM 非依存の純粋モジュール**: lexer / parser / 依存グラフ / 関数群を分離し、node 単体で全関数のテストが走る（`node --test test/`）
- **仮想スクロール**: 可視範囲のセルだけを DOM に描画。行高・列幅の累積オフセット配列 + 二分探索。固定ヘッダーは `position: sticky`
- **クリップボード**: 不可視 textarea プロキシでネイティブ copy/cut/paste を受ける（権限プロンプト不要・Excel と相互TSV）
- **テーマ**: CSSカスタムプロパティ（`--rss-*`）で差し替え

## ロードマップ（REQUIREMENTS.md 参照）

- v0.1: 数式エンジンコア（40関数・差分再計算・循環検出）+ 仮想スクロールシート + Excel互換コピペ + フィル + undo/redo + フォーマット
- v0.2: 関数136個（XLOOKUP / SUMIFS / TEXT / EOMONTH / WORKDAY / 統計系…）・セル結合・ウィンドウ枠固定・条件付き書式・データ検証・オートフィルタ / ソート
- v0.3: 複数シートタブ（追加/削除/リネーム）・シート間参照 `Sheet2!A1` の評価（横断依存グラフ）・名前付き範囲 `=SUM(売上)`・CSV/JSON入出力・検索置換・印刷CSS
- v0.4: 10万セル性能（差分描画・再描画の microtask バッチ化）・カスタムセルレンダラ / エディタ（チェックボックス / 選択肢セル）・rs-chart 連携（範囲を選んでチャート化・opt-in）
- **v0.5（現在）**: 変更イベントストリーム（共同編集の土台・op 粒度の差分と復元）・読み取り専用ビュー・数式監査（参照元 / 参照先トレースの矢印表示）

## 検証

- node 単体テスト 170項目（`node --test test/`）: Lexer/Parser/シリアライザ・**136関数**各1ケース以上（祝日引数・エラー系含む）・条件付き書式/データ検証/ソートの判定ロジック・エラー型と伝播・依存差分再計算・循環検出（直接/間接/自己/範囲）・行列挿入削除の参照シフト・フィル/コピーの相対シフト・シート間参照と横断再計算・名前付き範囲・シート追加/削除/リネームと数式追従・CSV/JSON 入出力ラウンドトリップ・検索置換・toJSON/fromJSON ラウンドトリップ・v0.4: 差分描画の dirty セル計算・再描画バッチャの束ね・チェックボックス/選択肢の純粋ロジック・range→チャートデータ変換・10万セル再計算性能・**v0.5: 変更イベントストリームの op 生成 / clear-cell / 構造 op、op → エンジン再適用のラウンドトリップ、数式監査の参照元/参照先トレースと依存グラフ一致（12項目）**
- ヘッドレスChromium による受け入れテスト: **v0.1（13項目 + コンソールエラー0）**・**v0.2（9項目）**・**v0.3（9項目）**・**v0.4（8項目）**に加え、**v0.5（6項目: op 粒度の変更イベント発火と内容・clear-cell op・読み取り専用の編集不可/閲覧可・数式監査の矢印と依存グラフ一致/選択替え・デモ新UI・コンソールエラー0）**を全パス

## ライセンス

MIT © ryusuke.sano
