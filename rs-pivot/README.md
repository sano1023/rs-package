> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm install @parelabo/rs-pivot
```

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-pivot-0.4.0.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSPivot } from '@parelabo/rs-pivot';
import '@parelabo/rs-pivot/rs-pivot.css';   // スタイル（バンドラ経由）

createRSPivot(document.querySelector('#app'), { /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@parelabo/rs-pivot@0.4.0/dist/rs-pivot.css">
<script src="https://cdn.jsdelivr.net/npm/@parelabo/rs-pivot@0.4.0/dist/rs-pivot.min.js"></script>
<script>
  // 公開APIはグローバル RSPivot に載る
  RSPivot.createRSPivot(document.querySelector('#app'), { /* オプション */ });
</script>
```

### Vue 3

```js
import { RsPivot } from '@parelabo/rs-pivot/vue';
import '@parelabo/rs-pivot/rs-pivot.css';   // スタイル（バンドラ経由）
```

```vue
<template>
  <RsPivot />
</template>
```

### React 18 / 19

```jsx
import { RsPivot } from '@parelabo/rs-pivot/react';
import '@parelabo/rs-pivot/rs-pivot.css';   // スタイル（バンドラ経由）

export default function App() {
  return <RsPivot />;
}
```

> `vue` / `react` は peerDependency です（バンドルには含みません）。アプリ側のものが使われます。

---

# rs-pivot

依存ゼロのピボットテーブルライブラリ。業務システム・SaaS の集計画面・BI・売上/在庫/勤怠などの日本語業務レポート向けです（現在 v0.4）。

- **依存ゼロ**: ランタイム依存なし。ビルド不要で `src/` から直接 import できる ESモジュール
- **フラットなJSON配列を渡すだけ**: サーバ・キューブ・スキーマ定義は不要（3行で導入）
- **集計エンジンはDOM非依存の純粋関数群**: 列指向ストア＋カテゴリ辞書化＋TypedArray化で、10万行の読み込み＋初回集計を **300ms以内・再スライス200ms以内**（実測 約90ms / 約20ms）。`node --test` で検算済み。DOM非依存なので **Web Worker（`worker: true`）へそのまま逃がせる**
- **rs-chart / rs-grid とネイティブ連携（v0.3）**: ピボット結果をワンクリックでチャート化（`pivot.chart()`・再スライスで自動追従）、セルダブルクリックの明細を rs-grid（Excel風グリッド）で表示。**rs-pivot + rs-chart + rs-grid だけで無料のBIダッシュボードが組める**（連携はopt-in・未ロード時は明確なエラー）
- **集計＝プラグイン**: sum / avg / count / min / max / countDistinct / **median / stdev** の組み込み集計もすべて `defineAggregation()` で実装（利用者が数行でカスタム集計を追加できる）
- **計算フィールド（v0.2）**: `粗利 = 売上 - 原価` のように式で新フィールドを定義（四則演算＋既存フィールド参照・**eval不使用の安全な自前パーサ**）
- **割合表示（v0.2）**: 値フィールドごとに **行比 / 列比 / 総計比**（パーセント表示）
- **Top-N（v0.2）**: 行/列グループを**値の上位N件のみ表示**し、残りを「その他」へまとめる（総計は保存）
- **条件付き書式（v0.2）**: **ヒートマップ着色・データバー**（カスタムセルレンダラAPI `cellRenderer` として公開）
- **展開/折りたたみ（v0.2）**: 行/列グループ単位で畳める。状態は `toJSON()` に保存
- **フラットテーブルモード（v0.2）**: ピボットせず集計結果を一覧表（次元列＋値列）で
- **チャート連携（v0.3）**: `pivot.chart(el, { type })` で現在のスライスをシリーズ/カテゴリに変換して rs-chart を描画。再スライスすると自動更新
- **明細を rs-grid で（v0.3）**: `drillThrough: { grid: true }` でダブルクリック明細を rs-grid 表示。**表示列・件数上限・独自ハンドラ**をカスタム可能
- **Web Worker 集計（v0.3）**: `worker: true` で集計を Worker へオフロード（列指向ストアは一度だけ構築して辞書再利用）。非対応/未指定時はメインスレッド（後方互換）
- **日付グルーピングの週/日粒度（v0.4）**: 年/四半期/月に加えて **週（ISO 8601・年またぎ対応）/ 日** の粒度。行/列の日付ピルの **粒** ボタンで切替
- **複数値の列配置切替（v0.4）**: 複数の値フィールドを **列の内側（既定）/ 外側** どちらに展開するか切替（`valuePlacement: 'inner'|'outer'`）
- **レポートテンプレート（v0.4）**: 名前付きスライスを保存/呼び出し（管理UI＋API・`localStorage` 併用可）。よく使うレイアウトをワンクリックで再現
- **印刷CSS（v0.4）**: A4横想定。印刷時はフィールドパネルを隠し、多段ヘッダをページごとに繰り返し・行を途中で切らない改ページ制御
- **フィールドリスト D&D UI**: 行/列/値/フィルタゾーンへドラッグ＆ドロップ（Pointer Events・タッチ対応・キーボード代替つき）
- **日本語業務向けスマート初期設定**: 桁区切り・¥表示・**日本の会計年度（4月始まり）** をオプション1つで
- **日付自動グルーピング**: Date / ISO文字列フィールドを行/列に置くと **年/四半期/月** に自動展開（**週/日** は「粒」ボタンで切替・v0.4）
- **セルダブルクリックで明細**: `cellDblClick` イベント（`e.records`）＋組み込みモーダル
- **レイアウトの保存/復元**: スライス定義の `toJSON()` / `fromJSON()`
- **CSV/TSVエクスポート**: 多段ヘッダをフラット化・生値・BOM付きUTF-8でExcel対応
- **ライセンス**: MIT（透かしなし・行数制限なし・年額ライセンスなし）

対応ブラウザ: 最新の Chrome / Edge / Safari / Firefox

## デモ

```bash
# このリポジトリで
php -S localhost:8099   # または任意の静的サーバー
# → http://localhost:8099/rs-pivot/demo/ を開く
```

固定シードで生成したサンプル売上データ1万行（地域/店舗/区分/カテゴリ/商品/日付/売上/数量/原価）で、D&D・会計年度・フィルタ・ソート・明細ドリルスルー・エクスポート・レイアウト保存/復元を試せます。

## インストール

npm公開前は、`src/` ディレクトリをコピーするだけで使えます。

```html
<link rel="stylesheet" href="./rs-pivot/src/rs-pivot.css">
```

```js
import { createRSPivot } from './rs-pivot/src/index.js';
// npm公開後: import { createRSPivot } from 'rs-pivot';
```

## クイックスタート

```html
<div id="container" style="height: 600px"></div>
```

```js
import { createRSPivot } from 'rs-pivot';

const pivot = createRSPivot('#container', {
    data: records,                       // フラットなJSON配列（これだけで動く）
    slice: {
        rows:    ['地域', '店舗'],
        columns: ['日付'],               // 日付フィールドは年/四半期/月に自動グルーピング
        values:  [{ field: '売上', agg: 'sum' }, { field: '数量', agg: 'count' }],
        filters: [{ field: '区分', include: ['店頭', 'EC'] }],
    },
    fiscalYear: true,                    // 年度/四半期を4月始まりの会計年度で
    format: { 売上: { thousands: true, prefix: '¥' } },
});

pivot.on('cellDblClick', (e) => console.log(e.records));  // セルを構成する明細レコード
const layout = pivot.toJSON();          // スライス定義の保存
pivot.fromJSON(layout);                 // 復元（同一の表になる）
pivot.setData(newRecords);              // データ入れ替え（スライスは維持）
pivot.exportCSV('売上.csv');            // BOM付きUTF-8（Excel対応）
pivot.destroy();
```

## API

### `createRSPivot(target, options): Pivot`

| オプション | 型 / 既定値 | 説明 |
|---|---|---|
| `data` | `object[]` | フラットなJSON配列。フィールド型（number / date / string）は自動推定 |
| `slice` | object | 行/列/値/フィルタの配置（下記スキーマ） |
| `fiscalYear` | `false` | `true` で年/四半期を4月始まりの会計年度に（例: 2026年4月 → 2026年度 Q1） |
| `format` | `{}` | フィールド名 → `{ thousands?, decimals?, prefix?, suffix? }`。既定で桁区切りON |
| `aggregations` | `[]` | `defineAggregation()` で作ったカスタム集計の登録 |
| `calculatedFields` | `[]` | 計算フィールド `[{ name, expression }]`（例: `{ name:'粗利', expression:'売上 - 原価' }`）。式は四則演算＋既存フィールド参照・eval不使用 |
| `cellRenderer` | `null` | 条件付き書式のセルレンダラ `(td, cell, ctx) => void`。`heatmap()` / `dataBar()` を渡せる |
| `subtotals` / `grandTotals` | `true` | 小計 / 総計の表示（`slice.options` でも指定可） |
| `fieldPanel` | `true` | `false` でフィールドリストを非表示（表のみ） |
| `detailModal` | `true` | `false` でダブルクリック時の組み込みモーダルを無効化（イベントのみ） |
| `maxCells` | `50000` | 描画セル数の上限（超えると警告して行を打ち切る） |
| `worker` | `false` | `true` で集計を Web Worker へ（v0.3・DOM非依存の実証）。カスタム集計は関数のため非対応 |
| `drillThrough` | `null` | ダブルクリック明細のカスタム（v0.3）: `{ grid?, columns?, limit?, handler?, height? }`（下記） |
| `templatesKey` | `null` | レポートテンプレートの `localStorage` キー（v0.4）。指定すると保存が永続化され、起動時に復元 |
| `templates` | `[]` | 初期テンプレート `[{ name, slice }]`（v0.4） |
| `reportTemplates` | `true` | `false` でフィールドパネルのレポート管理バーを非表示（API は使える） |
| `createRSChart` / `createRSGrid` | `globalThis` から解決 | 連携の依存注入。省略時はグローバルの同名関数を使う（未ロード時は明確なエラー） |

### スライスJSONスキーマ（`toJSON()` / `fromJSON()` の対象）

```js
{
    rows:    [fieldName | { field, sort?: 'asc'|'desc'|{ byValue: 0, dir?: 'desc' }, dateGroup?: 'year'|'quarter'|'month'|'week'|'day', topN?: { n, by?, dir? } }],
    columns: [...同上],
    values:  [{ field, agg, format?, label?, showAs?: 'row'|'column'|'total' }],
    filters: [{ field, include?: [...], exclude?: [...] }],
    options: { fiscalYear?, subtotals?, grandTotals?, flat?, valuePlacement?: 'inner'|'outer', collapsed?: { rows: [[...labels]], columns: [[...]] } },
}
```

- 日付フィールドを `dateGroup` なしで置くと **年/四半期/月の3段に自動展開** されます。**週（ISO 8601）/ 日** は明示的な `dateGroup: 'week'|'day'` でのみ使います（自動展開には含めない）
- `sort: { byValue: 0 }` は「値フィールド0番の合計」による値順ソート（既定は降順）
- `topN: { n: 5, by: 0, dir: 'desc' }` は値フィールド `by` で上位/下位 N 件のみ表示し、残りを「その他」へ（総計は保存）
- `showAs: 'row'|'column'|'total'` は 行比 / 列比 / 総計比（パーセント表示）
- `options.flat: true` でフラットテーブルモード、`options.collapsed` に展開/折りたたみ状態（ラベルパスの配列）を保存
- `options.valuePlacement: 'outer'`（v0.4）で複数の値フィールドを**列の外側**（値ごとに全列を繰り返す）に展開。既定 `'inner'`（列の内側）。列があり値が2つ以上のときだけ効きます
- 未知のキーは無視されます（旧バージョンのJSONも読める後方互換）

### Pivot メソッド

| メソッド | 説明 |
|---|---|
| `on(name, fn)` / `off(name, fn)` | イベント購読。`cellDblClick`（`{ records, value, rowPath, colPath, field, agg, columns }`）/ `sliceChange` / `render` |
| `chart(el, opts?)` | 現在のスライスを rs-chart で描画（v0.3）。`opts.type`（column/bar/line/area/pie…）・再スライスで自動更新。rs-chart 未ロード時は明確なエラー |
| `toJSON()` / `fromJSON(json)` | スライス定義（レイアウト）の保存 / 復元 |
| `setData(records)` | データ入れ替え（スライスは維持。消えたフィールドは自動除去） |
| `refresh()` | 再集計＋再描画（`worker: true` では非同期） |
| `whenRendered()` | 次の描画完了で解決する Promise（`worker: true` の非同期描画待ちに使う） |
| `getCSV(opts?)` / `getTSV(opts?)` | CSV / TSV 文字列（既定は生値・`{ bom: true }` でBOM付き） |
| `exportCSV(filename?)` / `exportTSV(filename?)` | BOM付きUTF-8でダウンロード（Excel対応） |
| `setCellRenderer(fn)` | 条件付き書式のセルレンダラを設定（`heatmap()` / `dataBar()` / 独自関数・`null` で解除） |
| `setCalculatedFields(defs)` | 計算フィールドを設定し列を再構築（データは維持） |
| `saveTemplate(name)` / `applyTemplate(name)` / `deleteTemplate(name)` / `getTemplates()` | レポートテンプレート（名前付きスライス）の保存 / 呼び出し / 削除 / 一覧（v0.4） |
| `templates` | `ReportTemplates` インスタンス（`save` / `get` / `list` / `remove` / `rename` / `toJSON` / `fromJSON`・`localStorage` 併用可） |
| `sliceModel` | スライス操作API（`addField` / `moveField` / `removeField` / `setAgg` / `setSort` / `setDateGroup` / `setFilter` / `setOption` / `setShowAs` / `setTopN` / `setValuePlacement` / `toggleCollapse`） |
| `destroy()` | 破棄 |

### カスタム集計 — `defineAggregation(def)`

組み込み集計もすべてこのAPIで実装されています。`init`（アキュムレータ生成）→ `step`（1行ずつ更新）→ `result`（値の取り出し）の3関数を渡すだけで、**小計/総計もmerge不要で正確に**計算されます。

```js
import { defineAggregation, createRSPivot } from 'rs-pivot';

const range = defineAggregation({
    name: 'range',
    label: '範囲',
    init: () => ({ min: Infinity, max: -Infinity }),
    step: (acc, v) => { if (v < acc.min) acc.min = v; if (v > acc.max) acc.max = v; },
    result: (acc) => acc.max - acc.min,
});

createRSPivot('#el', { aggregations: [range], slice: { values: [{ field: '売上', agg: 'range' }] } });
```

### 計算フィールド — `calculatedFields`（v0.2）

式で新しいフィールドを定義します。四則演算（`+ - * /`）・括弧・単項マイナス・既存フィールド参照が使え、**eval を使わない安全な自前パーサ**で評価します。空値はセルへ伝播（いずれかが空なら結果も空）、0除算は空になります。フィールド名に空白や記号を含む場合は `[フィールド名]` と角括弧で囲めます。

```js
createRSPivot('#el', {
    data: records,
    calculatedFields: [
        { name: '粗利', expression: '売上 - 原価' },
        { name: '粗利率', expression: '(売上 - 原価) / 売上 * 100' }, // 先行する計算フィールドも参照可
    ],
    slice: { rows: ['地域'], values: [{ field: '粗利', agg: 'sum' }] },
});
```

### 割合表示 / Top-N（v0.2）

```js
// 値フィールドを行比（各行のリーフ列合計=100%）で表示
{ field: '売上', agg: 'sum', showAs: 'row' }   // 'row' | 'column' | 'total'

// 店舗を売上上位5件だけ表示し、残りを「その他」へまとめる（総計は保存）
{ field: '店舗', topN: { n: 5, by: 0, dir: 'desc' } }
```

`pivot.sliceModel.setShowAs(index, 'row')` / `setTopN('rows', index, { n: 5 })` で動的に切り替えられます（フィールドパネルの値ピルの **%**・行/列ピルの **N** ボタンからも操作可）。

### 条件付き書式 — `cellRenderer`（v0.2）

データセルごとに `cellRenderer(td, cell, ctx)` が呼ばれます（`td`=セル要素、`cell`={ raw, text, kind, vi, rowNode, colNode }、`ctx`={ stats: 値ごとの{min,max}, valueDefs, model }）。同じシグネチャで独自の書式を実装できます。組み込みの `heatmap()` / `dataBar()` はこのAPIのファクトリです。

```js
import { createRSPivot, heatmap, dataBar, combineRenderers } from 'rs-pivot';

pivot.setCellRenderer(heatmap({ min: '#ffffff', max: '#f97316' }));   // ヒートマップ着色
pivot.setCellRenderer(dataBar({ color: '#93c5fd' }));                 // データバー
pivot.setCellRenderer(combineRenderers(heatmap(), dataBar({ vi: 1 })));// 併用（vi で値フィールドを限定）
```

### 展開/折りたたみ・フラットモード（v0.2）

- 結果テーブルの行/列グループ見出しの **▾ / ▸** で折りたたみ/展開。状態は `toJSON().options.collapsed` に保存され `fromJSON()` で復元されます（`pivot.sliceModel.toggleCollapse('rows', ['関東'])` でも操作可）
- `pivot.sliceModel.setOption('flat', true)` でフラットテーブルモード（ピボットせず、各次元を列に持つ一覧表）

### 週/日粒度・値の配置・レポートテンプレート・印刷（v0.4）

```js
// 日付の粒度: 週（ISO 8601）/ 日。行/列の日付ピルの「粒」ボタンでも切替
pivot.fromJSON({ columns: [{ field: '日付', dateGroup: 'week' }], rows: ['地域'], values: [{ field: '売上', agg: 'sum' }] });
pivot.sliceModel.setDateGroup('columns', 0, 'day');

// 複数値の列配置: 'inner'（列の内側・既定）/ 'outer'（列の外側=値ごとに全列を繰り返す）
pivot.sliceModel.setValuePlacement('outer');

// レポートテンプレート（名前付きスライス・localStorage 併用可）
pivot.saveTemplate('地域×区分の売上');   // 現在のレイアウトを保存
pivot.getTemplates();                     // ['地域×区分の売上', ...]
pivot.applyTemplate('地域×区分の売上');   // 呼び出して表を丸ごと復元
pivot.deleteTemplate('地域×区分の売上');

// 印刷（A4横想定・フィールドパネル非表示・多段ヘッダをページごとに繰り返し）
window.print();
```

- **週粒度**は ISO 8601（月曜始まり・第1週は最初の木曜を含む週）。年またぎの週も正しく扱い、`2026-W01` のようなラベルで単調にソートされます
- **値の配置 `outer`** は列があり値が2つ以上のときだけ意味を持ちます（それ以外は自動で `inner` 相当）。CSV/TSV も同じ列順で出力されます
- レポートテンプレートは `pivot.templates`（`ReportTemplates`）でも直接操作でき、`toJSON()` / `fromJSON()` でまとめて移送できます

### rs-chart 連携 — `pivot.chart()`（v0.3）

現在のスライスをシリーズ/カテゴリに変換して rs-chart を描画します。**行リーフ＝カテゴリ、もう一方の軸のリーフ×値フィールド＝シリーズ**（円系はカテゴリ×先頭値の1シリーズ）。再スライスすると自動で追従します。

```js
import { createRSChart } from 'rs-chart';   // 連携先を注入（or window.createRSChart / options.createRSChart）
const chart = pivot.chart('#chart', { type: 'column' });   // pie / bar / line / area / column …
// 以降 D&D やフィルタで再スライスすると chart も自動更新される
```

スライス→チャートデータ変換は純粋関数 `pivotToChart(result, opts)` として公開されており（node 単体テスト済み）、描画抜きで検算できます。

### rs-grid 明細連携・ドリルスルーのカスタム — `drillThrough`（v0.3）

ダブルクリック明細を、組み込みモーダルの代わりに rs-grid（Excel風・仮想スクロール・コピペ）で表示できます。表示列・件数上限・独自ハンドラをカスタムできます。

```js
createRSPivot('#el', {
    data: records,
    createRSGrid,                     // 依存注入（or window.createRSGrid）
    drillThrough: {
        grid: true,                   // rs-grid で表示（false/未指定なら組み込みモーダル）
        columns: ['地域', '店舗', '売上'], // 表示列（省略時は生レコードの全フィールド）
        limit: 1000,                  // 表示件数上限（e.records は常に全件）
        // handler: (e) => {...},     // 独自ハンドラ（あれば既定表示を抑止）
    },
});
```

### Web Worker 集計 — `worker: true`（v0.3）

集計エンジンは DOM 非依存の純粋関数群なので、そのまま Web Worker で回せます。列指向ストアは Worker 内で1度だけ構築してキャッシュし、再スライスは同じストアで集計します（辞書再利用）。

```js
const pivot = createRSPivot('#el', { data: bigRecords, slice, worker: true });
await pivot.whenRendered();   // worker:true は非同期描画。完了を待てる
```

`worker: true` はメインスレッドをブロックせず10万行を集計します。Worker 非対応環境や集計失敗時は自動でメインスレッドへフォールバック（後方互換）。カスタム集計（関数）は Worker へ送れないため、`worker: true` との併用はエラーになります。

### フィールドリストの操作

- **D&D**: フィールドを 行/列/値/フィルタ ゾーンへドラッグ（Pointer Events・タッチ対応）。ゾーン間の移動・並べ替え・ゾーン外へのドラッグで除去
- **キーボード代替**: ピルにフォーカスして Enter/Space で選択 → ←→ でゾーン移動・↑↓ で並べ替え・Enter で確定・Delete で除去（aria-live で読み上げ）
- **フィルタ**: ピルの ▾ から値リストのチェックボックスポップアップ（検索付き・全て/なし）
- **ソート**: 行/列ピルの ↕ から ラベル昇順/降順・値の合計で昇順/降順
- **集計方法**: 値ピルの ∑ から組み込み＋カスタム集計を選択

### テーマ

CSSカスタムプロパティ（`--rsp-*`）で差し替え:

```css
.rs-pivot {
    --rsp-accent: #7c3aed;
    --rsp-header-bg: #f5f3ff;
    --rsp-subtotal-bg: #ede9fe;
    --rsp-grand-bg: #ddd6fe;
    --rsp-font-size: 12px;
}
```

## 仕組み

```
公開API createRSPivot → Pivot（イベント・ライフサイクル）
    ├─ FieldPanel（D&D・フィルタ/ソート/集計メニュー・キーボード代替）
    ├─ ResultTable（多段ヘッダ・小計/総計・明細ドリルスルー）
    ├─ SliceModel（行/列/値/フィルタ定義・唯一の状態源・toJSON/fromJSON）
    └─ AggregationEngine（純粋関数群・DOM非依存）
         列指向ストア / カテゴリ辞書 / 日付グルーピング / グループキー → 測度アキュムレータ
```

- **列指向ストア**: 読み込み時にフィールドごとの配列へ変換。文字列はカテゴリ辞書化（値→整数コード）、数値は **Float64Array**・日付コードは **Int32Array/Uint8Array**（TypedArray化）で保持し、集計はハッシュと整数比較だけで回す
- **1パス集計**: 各行について「行チェーン（総計→…→リーフ）×列チェーン」の全プレフィックス組み合わせのアキュムレータを更新。小計/総計が merge 不要で出るため、カスタム集計（init/step/result のみ）でも正確
- **明細ドリルスルー**: セル→明細はレコードを保持せず遅延フィルタで取得（メモリを消費しない）
- **テーブルモデル**: 集計ツリー→セルグリッド（rowspan/colspan）への変換は純粋関数で、DOM描画とCSVエクスポートが同じモデルを共有
- **Worker 対応（v0.3）**: 重い蓄積ループは `serializeResult()` でプレーン化して Worker から返し、主スレッドで `hydrateResult()` により集計結果へ復元。ドリルスルー明細だけ主スレッドのストアで遅延再構築（辞書は決定的で一致）
- **連携（v0.3）**: rs-chart / rs-grid は import して使うだけ（ソース非改変）。未使用ならロードしない opt-in 設計
- **値の配置切替（v0.4）**: 集計結果は不変のまま、テーブルモデル（純粋関数）が列を `inner`（entry-major）/ `outer`（value-major）に並べ替える。DOM描画・CSV は共通の列記述子 `model.columns` を共有するため、どちらでも整合

## ロードマップ（REQUIREMENTS.md 参照）

- **v0.1**: 集計コア6種＋多段グループ＋小計/総計・D&D UI・日付/会計年度グルーピング・ソート・フィルタ・明細・toJSON/fromJSON・CSV/TSV
- **v0.2**: 計算フィールド・median/stdev・行/列/総計比・Top-N・条件付き書式（ヒートマップ/データバー）・展開/折りたたみ・フラットテーブルモード
- **v0.3**: rs-chart 連携（`pivot.chart()`）・rs-grid 明細連携・ドリルスルーのカスタム・10万行チューニング（TypedArray化・辞書再利用）・Web Worker 集計
- **v0.4（現在）**: 日付グルーピングの週/日粒度・複数値の列配置切替（内側/外側）・レポートテンプレート（名前付きスライス・localStorage併用）・印刷CSS（A4横・パネル非表示・改ページ制御）

## 検証

- `node --test`（113項目）: 列指向ストア・辞書化・集計8種（+カスタム集計）のブルートフォース検算・多段グループ・小計/総計・日付/会計年度グルーピング・ソート・フィルタ・スライス正規化/ラウンドトリップ・テーブルモデル・CSV/TSV・空状態・10万行性能／**v0.2**: 計算フィールドの式パーサ/評価・median/stdev・行/列/総計比・Top-N（総計保存）・展開/折りたたみ・フラットモード・条件付き書式／**v0.3**: `pivotToChart` のスライス→チャート変換・`recordsToGrid` の列/件数カスタム・Worker 直列化（`serializeResult`/`hydrateResult` 往復が `aggregate` と同型同値）・TypedArray化・10万行性能（実測 初回≈90ms / 再スライス≈20ms）／**v0.4**: ISO週/日粒度（既知値・年またぎ・エンジン統合）・値配置 outer（inner とセル値一致・ヘッダ矩形性・CSV整合）・レポートテンプレート（保存/呼出/改名/localStorage往復/SliceModel復元）
- ヘッドレスChromium 受け入れテスト: **v0.1（13項目）** 初期描画・D&D再集計・sum全セル一致（1,160セル）・小計/総計・会計年度・フィルタ・値順ソート・明細・toJSON/fromJSON・CSV・カスタム集計・空状態／**v0.2（8項目）** 計算フィールド・median/stdev・割合表示=100%・Top-N・ヒートマップ・折りたたみ・フラットモード／**v0.3（8項目）** `pivot.chart` 描画＋再スライス追従・rs-chart未ロード時の明確なエラー・明細の rs-grid 表示・ドリルスルー列/件数カスタム・10万行性能目標・`worker:true` の集計がメイン/ブルートフォースと完全一致・Worker明細・コンソールエラー0／**v0.4** 週/日粒度のグルーピング一致・複数値の列内側/外側で表構造が変化・レポートテンプレの保存→呼出で復元・印刷CSSでフィールドパネル非表示・コンソールエラー0 を全パス

## ライセンス

MIT © ryusuke.sano
