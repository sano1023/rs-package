> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm install @parelabo/rs-grid
```

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-grid-0.4.1.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSGrid } from '@parelabo/rs-grid';
import '@parelabo/rs-grid/rs-grid.css';   // スタイル（バンドラ経由）

createRSGrid(document.querySelector('#app'), { /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@parelabo/rs-grid@0.4.1/dist/rs-grid.css">
<script src="https://cdn.jsdelivr.net/npm/@parelabo/rs-grid@0.4.1/dist/rs-grid.min.js"></script>
<script>
  // 公開APIはグローバル RSGrid に載る
  RSGrid.createRSGrid(document.querySelector('#app'), { /* オプション */ });
</script>
```

### Vue 3

```js
import { RsGrid } from '@parelabo/rs-grid/vue';
import '@parelabo/rs-grid/rs-grid.css';   // スタイル（バンドラ経由）
```

```vue
<template>
  <RsGrid />
</template>
```

### React 18 / 19

```jsx
import { RsGrid } from '@parelabo/rs-grid/react';
import '@parelabo/rs-grid/rs-grid.css';   // スタイル（バンドラ経由）

export default function App() {
  return <RsGrid />;
}
```

> `vue` / `react` は peerDependency です（バンドルには含みません）。アプリ側のものが使われます。

---

# rs-grid

Excel風データグリッド。仮想スクロールで10万行、Excelとの相互コピペ、フィルハンドル連番、**数式（=SUM(A1:B2) 等）**、undo/redo まで揃った表計算ライクな編集体験を依存ゼロで提供します。ビルド不要・ESモジュール。

- **仮想スクロール**: 描画は可視分だけ（100,000行の setData が約40ms、スクロールしても描画行数一定）
- **Excel互換コピペ**: Ctrl+C/X/V が TSV で Excel・スプレッドシートと相互運用（不可視 textarea プロキシ方式）
- **数式エンジン**: `=D1*0.1`・`=SUM(A1:B10)`・`=IF(D1>100,"高","低")`。セル参照/範囲/絶対参照($A$1)/15関数/演算子一式。依存チェーン自動再計算・循環参照検出(#CIRC!)・エラー表示(#DIV/0!等)。編集時は生数式・表示とコピーは計算値
- **フィルハンドル**: 選択範囲右下の■をドラッグ → 数値は等差数列で連番、**数式は相対参照をシフト**（$絶対参照は固定）、その他は繰り返し。ドラッグ中はオートスクロール
- **ステータスバー**: 複数セル選択で下部に合計・平均・個数（Excelの右下と同じ）
- **列メニュー（▾）**: 各列ヘッダーから ソート / **フィルタ**（値チェックリスト＋条件: 含む・等しい・より大きい/小さい・空）/ 列の非表示 / **この列まで固定**
- **フィルタ**: 複数列の積・行番号は連番表示・元データは無傷。フィルタ中の編集/数式/コピペも正しいデータ行に反映
- **固定列**: `fixedColumns: 2` または列メニューから。横スクロールでも sticky で残る
- **カスタムレンダラ**: `renderer: 'progress'`（バー）/ `'stars'`（★評価）/ `'badge'`（色付きピル・badgeColors）/ 関数レンダラ。`format: 'currency'`（¥3桁区切り）、`cellClass` で条件付き書式
- **バリデーション**: `validator: (v, row) => bool` — 不正セルを赤表示
- **検索**: `search(q)` がヒット数を返し全セルをハイライト・最初のヒットへ移動
- **エクスポート**: `getCsv()` / `getJson()`（フィルタ後ビュー or 全行、数式は計算値）、`exportCsv()` / `exportJson()` でダウンロード（CSVはBOM付きでExcelに文字化けなし）
- 列タイプ: text / number（右寄せ・数値検証）/ date / select / checkbox、readonly 列
- 範囲選択（ドラッグ / Shift+矢印）・行/列ヘッダー選択・Ctrl+A・Delete一括クリア
- ソート（昇順→降順→解除・元順序復元）・列幅ドラッグ・右クリックメニュー（行/列の挿入・削除）
- undo / redo（Ctrl+Z / Ctrl+Y。ソートや行挿入の後でも正しく戻る参照ベースの履歴）
- **行/列のドラッグ並べ替え**: 行番号・列ヘッダーをつかんでドラッグ（ガイドライン表示・ドロップで移動）。列移動時はフィルタ/ソートキーを自動で再マップ
- **セル結合**: 範囲選択→右クリック→「セルを結合」。クリックで全域選択・編集は結合サイズのエディタ・undo対応。API: `mergeCells(r,c,rs,cs)`（フィルタ/ソート中は解除表示）
- **コメント**: 右クリック→「コメントを追加/編集」。赤い三角マーク・ホバーで吹き出し表示。行に紐づくのでソート後も追従
- **ネストヘッダー**: `headerGroups: [{title, from, to}]` で2段グループヘッダー（列非表示で colspan 自動調整）
- **複数列ソート**: Shift+ヘッダークリックで第2・第3キー（▲1 ▲2 の番号マーカー）
- **スマホ対応**: タップ選択・ダブルタップ編集・ネイティブ慣性スクロール
- 文字キーで即編集開始（置換）・F2/Enter で編集・IME入力対応

## デモ

```bash
# このリポジトリで
php -S localhost:8099
# → http://localhost:8099/rs-grid/demo/ を開く
```

## インストール

npm 公開前のため、`src/` をプロジェクトにコピーして import してください。

```html
<link rel="stylesheet" href="rs-grid/rs-grid.css">
```

## クイックスタート

```js
import { createRSGrid } from './rs-grid/index.js';

const grid = createRSGrid('#grid', {
    columns: [
        { key: 'name', title: '名前', width: 140 },
        { key: 'dept', title: '部署', type: 'select', options: ['営業', '開発'] },
        { key: 'joined', title: '入社日', type: 'date' },
        { key: 'salary', title: '給与', type: 'number' },
        { key: 'active', title: '在籍', type: 'checkbox' },
    ],
    data: rows,               // オブジェクト配列（[[...], ...] の行配列も可）
    height: 440,
    onChange: (changes) => {}, // [{row, key, oldValue, newValue}]
});
```

## API

### `createRSGrid(target, options): Grid`

| オプション | 説明 |
| --- | --- |
| `columns` | `[{ key, title, type, options, width, readonly, align, renderer, format, cellClass, validator, badgeColors, hidden }]`。type: `'text'`（既定）/ `'number'` / `'date'` / `'select'` / `'checkbox'` |
| `data` | 行オブジェクト配列 or 行配列（columns の順にマップ） |
| `height` | スクロール領域の高さ（px・既定 400） |
| `fixedColumns` | 左からn列を固定（sticky） |
| `headerGroups` | `[{title, from, to}]` 2段グループヘッダー（指定時は列ドラッグ無効） |
| `onChange` / `onSelect` / `onSort` / `onFilter` | イベント（`on('change', cb)` でも可） |

### メソッド

`getData()` / `setData(rows)` / `getValue(r, key)` / `setValue(r, key, v)` / `setValues(entries)` / `insertRow(at)` / `deleteRows(from, to)` / `insertCol(at, def)` / `deleteCol(at)` / `selectCell(r, c)` / `getSelection()` / `undo()` / `redo()` / `setFilter(c, filter)` / `clearFilters()` / `hideColumn(c)` / `showAllColumns()` / `setFixedColumns(n)` / `search(q)` / `clearSearch()` / `moveRow(from, to)` / `moveColumn(from, to)` / `mergeCells(r, c, rs, cs)` / `mergeSelection()` / `unmergeSelection()` / `getMerges()` / `setComment(r, key, text)` / `getComment(r, key)` / `getCsv(opts)` / `getJson(opts)` / `exportCsv(name)` / `exportJson(name)` / `destroy()`

### キーボード

| キー | 動作 |
| --- | --- |
| 矢印 / Tab / Enter | 移動（Shift+矢印で範囲拡張、Enterは編集開始） |
| 文字キー | 即編集開始（既存値を置換）。F2 は既存値を保持して編集。`=` で数式入力 |
| Ctrl+C / X / V | コピー / 切り取り / 貼り付け（TSV・**Excel相互**。足りない行は自動追加） |
| Delete / Backspace | 範囲クリア |
| Ctrl+A / Ctrl+Home / Ctrl+End | 全選択 / 先頭へ / 末尾へ |
| Ctrl+Z / Ctrl+Y | 元に戻す / やり直す |
| Space | チェックボックスをトグル |


### 数式

セルに `=` から始まる式を入力すると数式になります（青字表示・列ヘッダーの A/B/C… が列レター）。

- 演算子: `+ - * / ^ %` `&`（文字列結合） `= <> < > <= >=`
- 参照: `A1`（相対）/ `$A$1`（絶対）/ `A1:B10`（範囲）
- 関数: SUM / AVERAGE / MIN / MAX / COUNT / COUNTA / IF / ROUND / ABS / INT / MOD / POWER / SQRT / AND / OR / NOT / LEN / CONCATENATE
- エラー: #NAME? / #VALUE! / #DIV/0! / #REF! / #CIRC!（循環参照）
- 再計算はバージョン付きメモ化の遅延評価（依存グラフの手動管理なしで依存チェーンが正しく更新される）

### テーマ（CSSカスタムプロパティ）

`--rsg-border` `--rsg-header-bg` `--rsg-sel-bg` `--rsg-focus-border` `--rsg-readonly-bg` `--rsg-font` など。

## 仕組み

- 仮想スクロール: tbody の上下にスペーサ行（height指定）を置き、可視範囲のスライスだけ `<tr>` を生成。ヘッダーは `position: sticky`
- クリップボード: グリッドフォーカス中は不可視 textarea が focus と選択を保持し、ブラウザ標準の copy/cut/paste イベントで TSV を授受（権限プロンプトなし・Excel互換）
- undo は「行オブジェクトの参照 + key + 新旧値」で記録するため、ソートや行挿入で行番号が変わっても正しく戻る

## 既知の制限（v0.4 時点）

- セル結合はフィルタ/ソートなしの時のみ描画（データは保持・解除表示）
- ネストヘッダー指定時は列ドラッグ無効
- 数式はソート後の行番号を参照するため、数式とソートの併用は注意
- ソートは undo 履歴に乗らない（Excel同様、データ順の入れ替えとして扱う）
- タッチでの範囲ドラッグ選択は未対応（タップ選択・ダブルタップ編集は対応）

## 検証

Playwright（Chromium）による62項目（コア19 + 数式14 + フィルタ等15 + 結合/ドラッグ等14）の自動テストで、仮想化・編集（5タイプ）・キーボード・範囲選択・TSVコピペ・フィルハンドル連番・ソート・列リサイズ・コンテキストメニュー・undo/redo・**100,000行性能**・モバイルタップ操作・コンソールエラーなしを確認済み。

## ライセンス

MIT
