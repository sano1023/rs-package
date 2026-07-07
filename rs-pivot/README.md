> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール / 読み込み

```bash
# npm（GitHubのtarball指定）
npm install https://github.com/sano1023/ryusuke-packages-dist/raw/main/tarballs/rs-pivot-0.1.0.tgz
```

```html
<!-- CDN（jsDelivr・scriptタグ直読み） -->
<script src="https://cdn.jsdelivr.net/gh/sano1023/ryusuke-packages-dist@main/rs-pivot/dist/rs-pivot.min.js"></script>
```

```js
// ESM import（npmインストール後）
import { /* 公開API */ } from 'rs-pivot';
```

CSSが必要なパッケージは `dist/rs-pivot.css` を link してください。

---

# rs-pivot

有料JSピボットテーブルライブラリ（Flexmonster / WebDataRocks / AG Grid Enterprise ピボット / Syncfusion 等）の機能網羅を目指す、依存ゼロのピボットテーブルライブラリ。業務システム・SaaS の集計画面・BI・売上/在庫/勤怠などの日本語業務レポート向けです（現在 v0.1）。

- **依存ゼロ**: ランタイム依存なし。ビルド不要で `src/` から直接 import できる ESモジュール
- **フラットなJSON配列を渡すだけ**: サーバ・キューブ・スキーマ定義は不要（3行で導入）
- **集計エンジンはDOM非依存の純粋関数群**: 列指向ストア＋カテゴリ辞書化で10万行の読み込み＋初回集計を1秒以内（実測 約200ms）。`node --test` で検算済み
- **集計＝プラグイン**: sum / avg / count / min / max / countDistinct の組み込み集計もすべて `defineAggregation()` で実装（利用者が数行でカスタム集計を追加できる）
- **フィールドリスト D&D UI**: 行/列/値/フィルタゾーンへドラッグ＆ドロップ（Pointer Events・タッチ対応・キーボード代替つき）
- **日本語業務向けスマート初期設定**: 桁区切り・¥表示・**日本の会計年度（4月始まり）** をオプション1つで
- **日付自動グルーピング**: Date / ISO文字列フィールドを行/列に置くと **年/四半期/月** に自動展開
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
| `subtotals` / `grandTotals` | `true` | 小計 / 総計の表示（`slice.options` でも指定可） |
| `fieldPanel` | `true` | `false` でフィールドリストを非表示（表のみ） |
| `detailModal` | `true` | `false` でダブルクリック時の組み込みモーダルを無効化（イベントのみ） |
| `maxCells` | `50000` | 描画セル数の上限（超えると警告して行を打ち切る） |

### スライスJSONスキーマ（`toJSON()` / `fromJSON()` の対象）

```js
{
    rows:    [fieldName | { field, sort?: 'asc'|'desc'|{ byValue: 0, dir?: 'desc' }, dateGroup?: 'year'|'quarter'|'month' }],
    columns: [...同上],
    values:  [{ field, agg, format?, label? }],
    filters: [{ field, include?: [...], exclude?: [...] }],
    options: { fiscalYear?, subtotals?, grandTotals? },
}
```

- 日付フィールドを `dateGroup` なしで置くと **年/四半期/月の3段に自動展開** されます
- `sort: { byValue: 0 }` は「値フィールド0番の合計」による値順ソート（既定は降順）
- 未知のキーは無視されます（旧バージョンのJSONも読める後方互換）

### Pivot メソッド

| メソッド | 説明 |
|---|---|
| `on(name, fn)` / `off(name, fn)` | イベント購読。`cellDblClick`（`{ records, value, rowPath, colPath, field, agg }`）/ `sliceChange` / `render` |
| `toJSON()` / `fromJSON(json)` | スライス定義（レイアウト）の保存 / 復元 |
| `setData(records)` | データ入れ替え（スライスは維持。消えたフィールドは自動除去） |
| `refresh()` | 再集計＋再描画 |
| `getCSV(opts?)` / `getTSV(opts?)` | CSV / TSV 文字列（既定は生値・`{ bom: true }` でBOM付き） |
| `exportCSV(filename?)` / `exportTSV(filename?)` | BOM付きUTF-8でダウンロード（Excel対応） |
| `sliceModel` | スライス操作API（`addField` / `moveField` / `removeField` / `setAgg` / `setSort` / `setFilter` / `setOption`） |
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

- **列指向ストア**: 読み込み時にフィールドごとの配列へ変換。文字列はカテゴリ辞書化（値→整数コード）し、集計はハッシュと整数比較だけで回す
- **1パス集計**: 各行について「行チェーン（総計→…→リーフ）×列チェーン」の全プレフィックス組み合わせのアキュムレータを更新。小計/総計が merge 不要で出るため、カスタム集計（init/step/result のみ）でも正確
- **明細ドリルスルー**: セル→明細はレコードを保持せず遅延フィルタで取得（メモリを消費しない）
- **テーブルモデル**: 集計ツリー→セルグリッド（rowspan/colspan）への変換は純粋関数で、DOM描画とCSVエクスポートが同じモデルを共有

## ロードマップ（REQUIREMENTS.md 参照）

- **v0.1（現在）**: 集計コア6種＋多段グループ＋小計/総計・D&D UI・日付/会計年度グルーピング・ソート・フィルタ・明細・toJSON/fromJSON・CSV/TSV
- v0.2: 計算フィールド・median/stdev・行/列/総計比・Top-N・条件付き書式・展開/折りたたみ
- v0.3: **rs-chart 連携（`pivot.chart()`）**・rs-grid 明細連携・10万行チューニング・Web Worker
- v0.4: 週/日粒度・レポートテンプレート・印刷CSS

## 検証

- `node --test`（41項目）: 列指向ストア・辞書化・集計6種＋カスタム集計のブルートフォース検算・多段グループ・小計/総計・日付/会計年度グルーピング・ソート・フィルタ・スライス正規化/ラウンドトリップ・テーブルモデル・CSV/TSV・空状態・10万行性能
- ヘッドレスChromium 受け入れテスト（13項目）: 初期描画・D&D再集計・sum全セル一致（1,160セル）・小計/総計一致とON/OFF・会計年度グルーピング・フィルタ・値順ソート・明細モーダル・toJSON/fromJSONのDOM一致・CSV・カスタム集計・空状態・コンソールエラー0 を全パス

## ライセンス

MIT © ryusuke.sano
