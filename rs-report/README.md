> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm install @sano1023/rs-report
```

npmjs.com の公開パッケージです。ログインやトークンは不要です。
更新・旧レジストリからの移行の詳細は [共通インストール手順](https://github.com/sano1023/rs-package/blob/main/INSTALLING.md) を参照してください。登録済みバージョンは [npm](https://www.npmjs.com/package/@sano1023/rs-report) で確認できます。以下のパッケージ名による import は Vite などのバンドラ向けです。

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-report-0.5.0.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSReport } from '@sano1023/rs-report';
import '@sano1023/rs-report/rs-report.css';   // スタイル（バンドラ経由）

createRSReport(document.querySelector('#app'), { template, data: { rows, params } });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sano1023/rs-report@0.5.0/dist/rs-report.css">
<script src="https://cdn.jsdelivr.net/npm/@sano1023/rs-report@0.5.0/dist/rs-report.min.js"></script>
<script>
  // 公開APIはグローバル RSReport に載る
  RSReport.createRSReport(document.querySelector('#app'), { template, data: { rows, params } });
</script>
```

### Vue 3

```js
import { RsReport } from '@sano1023/rs-report/vue';
import '@sano1023/rs-report/rs-report.css';   // スタイル（バンドラ経由）
```

```vue
<template>
  <RsReport />
</template>
```

### React 18 / 19

```jsx
import { RsReport } from '@sano1023/rs-report/react';
import '@sano1023/rs-report/rs-report.css';   // スタイル（バンドラ経由）

export default function App() {
  return <RsReport />;
}
```

> `vue` / `react` は peerDependency です（バンドルには含みません）。アプリ側のものが使われます。

---

# rs-report

依存ゼロ・フレームワーク非依存の**帳票（レポート）エンジン**（v0.5・ロードマップ完走）。
SVF / ActiveReports JS / Stimulsoft / Jaspersoft の代替として、帳票定義（JSON）＋データ配列から
mm 精度のバンドレイアウトで自動改ページつきの帳票を組版し、実寸プレビュー・実寸印刷（→PDF保存）まで行います。

- **バンドレイアウト**: reportHeader / pageHeader / groupHeader / detail / groupFooter / carryOver・carryIn（繰越）/ pageFooter / reportFooter
- **自動改ページ**: グループヘッダの再出力（「（続き）」表示可）・孤立行防止（orphanRows）・グループ単位の改ページ・フッタ専用ページ
- **集計と繰越**: `{{ @sum(amount) }}` がバンドの位置でスコープを自動判定（グループ計/ページ計/総計）。`@carryIn/@carryOut` でページ繰越、`@sum(qty * unitPrice)` の式集計も可
- **日本の帳票の書式を標準装備**: Excel互換数値パターン（`#,##0;▲#,##0`）・和暦（令和元年対応）・**大字漢数字**（金壱萬弐阡…円也）・全角半角・JIS用紙（A/B列・はがき・長3/角2封筒）
- **式エンジン**: `eval` 不使用の自前パーサ。`{{ taxRate == 8 ? '軽減' : '' }}`・`visibleIf`・消費税端数処理 `tax()` 内蔵。`__proto__` 等へは到達しない設計
- **組版はDOM非依存の純関数**: `renderReport()` は node でそのまま動き、「1000行が何ページになるか」「繰越が合うか」を単体テストできる
- **実寸印刷**: 非表示 iframe に `@page` サイズつき自己完結HTMLを書き込んで印刷。ホストページの CSS を汚さない
- **同梱テンプレート**: 請求書（**適格請求書＝インボイス制度対応**: 登録番号・税率別区分集計・軽減税率マーク）・見積書・納品書・領収書（大字併記・収入印紙欄）
- Vue 3 / React ラッパー同梱・MIT ライセンス

**v0.2 の追加**
- **多段組（columns）**: detail バンドを N 列に面付け（across=左→右 / down=列ごと）
- **宛名ラベル・タックシール**: `createLabelTemplate('a4-24')` — 24/21/12/10/44/65面プリセット＋寸法直接指定・位置合わせ用枠線・既定の宛名レイアウト（〒/住所/氏名様）
- **Canvas / PNG 出力**: `report.toCanvas(page, { dpi: 300 })` / `toPNG()` — 禁則処理つき行折り返し（wrapText）
- **エコシステムアダプタ**（注入式・本体は依存ゼロのまま）: `registerQRElements(rs-qrcode)` → `{ type: 'qrcode' | 'barcode' }` 要素、`registerSealElement(rs-sign)` → `{ type: 'seal' }` 電子印鑑（印影キャッシュ）、`registerChartElement(rs-chart)` → 帳票内ミニチャート

**v0.3 の追加 — GUI 帳票デザイナ（別エントリ）**
- `createRSReportDesigner('#app', { template, data, onChange })` — ActiveReports/SVF のデザイナに相当する GUI を MIT で
- パレット（クリック追加・アダプタ登録済みなら QR/バーコード/印影も）・ドラッグ移動（1mm グリッドスナップ）・リサイズハンドル・バンド高さのドラッグ変更
- プロパティパネル（座標・テキスト/式・書式・揃え・枠線・表示条件）・バンドの追加/削除（グループは groups も自動整備）
- undo/redo（100段）・テンプレ JSON 入出力（不正定義は取り込み前に検証）・実データを流すライブプレビュー
- 別エントリ `rs-report/designer` ＝ランタイムだけ使うページにはデザイナのコードが載らない

```js
import { createRSReportDesigner } from '@sano1023/rs-report/designer';   // + rs-report-designer.css
const designer = createRSReportDesigner('#designer', {
    template,                        // 省略時は空の A4
    data: { rows: sampleRows },      // プレビュー用サンプルデータ
    onChange: (tpl) => save(tpl),    // 変更のたびに最新テンプレート
});
```

**v0.4 の追加 — PDF 直接出力**
- `report.toPDF({ dpi: 300 })` → `Blob` / `report.downloadPDF('請求書.pdf')` — 依存ゼロの自前ミニ PDF ライター（各ページを canvas → JPEG → 画像 XObject）。`onProgress` 対応
- 低レベル API: `reportToPDF(pages, options)` / `buildImagePDF(entries)`（バイト列組み立ては純関数で、xref のオフセット整合まで node でテスト）
- 証憑テンプレに **発注書（order）・検収書（acceptance）** を追加（計6種）

**v0.5 の追加 — データ連携とサブレポート（ロードマップ完走）**
- **CSV 差し込み**: `rowsFromCSV(text)` — RFC4180（クォート・改行内包）・BOM・TSV 自動判定・数値の自動変換。CSV → 宛名ラベル面付けが 2 行で書ける
- **注入アダプタ**: `rowsFromRSGrid(grid)` / `rowsFromRSSheet(sheet)` / `rowsFromRSPivot(pivot)` — グリッド/スプレッドシート/ピボット集計をそのまま帳票の rows に
- **サブレポート**: `{ type: 'subreport', template, rows: 'orders' }` — 親の行が持つ配列フィールドを、要素の矩形内で独立に組版（集計スコープも子で閉じる）。収まらない場合は `subreportOverflow` で検知

```js
import { createRSReport, createLabelTemplate, rowsFromCSV } from '@sano1023/rs-report';
createRSReport('#labels', {
    template: createLabelTemplate('a4-24'),
    data: { rows: rowsFromCSV(csvText) },   // CSV差し込み → 24面ラベル
});
```

```js
import { createRSReport, createLabelTemplate, rowsFromCSV } from '@sano1023/rs-report';
import '@sano1023/rs-report/rs-report.css';
```

## 使い方

```js
import { createRSReport, createDocumentTemplate } from '@sano1023/rs-report';
import { prepareDocumentRows } from '@sano1023/rs-report';
// CSS: <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sano1023/rs-package@main/rs-report/dist/rs-report.css">

const report = createRSReport('#preview', {
    template: createDocumentTemplate('invoice'),   // invoice | estimate | delivery | receipt
    data: {
        rows: prepareDocumentRows([
            { name: 'Webサイト制作', qty: 1, unit: '式', unitPrice: 300000 },
            { name: 'お茶菓子', qty: 10, unit: '箱', unitPrice: 500, taxRate: 8 },  // 軽減税率
        ]),
        params: {
            no: 'INV-2026-0042', issuedAt: '2026年7月28日', dueAt: '2026年8月31日',
            customer: { name: '株式会社ぱれ', zip: '150-0001', address: '東京都渋谷区…' },
            issuer: { name: '自社名', regNo: 'T1234567890123', tel: '03-…' },
            bank: 'サンプル銀行 本店 普通 1234567',
        },
    },
});

report.print();          // 実寸印刷（PDFに保存すればPDF出力）
report.toHTML();         // 自己完結HTML文字列
```

### 独自帳票の定義

```js
const template = {
    paper: 'A4', margin: 12,
    groups: [{ by: 'dept' }],
    bands: {
        pageHeader: { height: 7, elements: [ /* 列見出し */ ] },
        groupHeader: [{ height: 8, elements: [
            { type: 'text', text: '■ {{ dept }}{{ #repeated ? "（続き）" : "" }}', w: 186, h: 8, bold: true },
        ]}],
        detail: { height: 6.5, zebra: '#f8fafc', elements: [
            { type: 'field', field: 'date', format: 'date:M/D', x: 0, w: 30, h: 6.5, border: true },
            { type: 'field', field: 'amount', format: '#,##0', x: 126, w: 30, h: 6.5, align: 'right', border: true },
        ]},
        groupFooter: [{ height: 7, elements: [
            { type: 'text', text: '{{ dept }} 計 {{ @sum(amount) }}', x: 96, w: 60, h: 7, align: 'right', bold: true },
        ]}],
        pageFooter: { height: 8, elements: [
            { type: 'text', text: '{{ #page }} / {{ #pages }}', w: 186, h: 6, align: 'center' },
        ]},
    },
};
const report = createRSReport('#app', { template, data: { rows } });

// DOM 不要の組版だけなら（node でも動く）
import { renderReport } from '@sano1023/rs-report';
const { pages, pageCount } = renderReport(template, { rows });
```

### 要素タイプ

`text`（`{{式}}` 埋め込み）/ `field`（データバインド＋format）/ `line`（斜線可）/ `rect` / `image`（dataURL可・contain/cover/fill）/ `table`（合計欄などの小表）/ `spacer`。
`defineElementType(name, { toItems })` で独自要素（バーコード等）を追加できます。

### 書式（format）

`'#,##0'` `'#,##0;▲#,##0'` `'currency'` `'percent:1'` `'date:YYYY年M月D日(ddd)'`
`'wareki'`（令和元年対応） `'daiji'`（金壱萬…円） `'kansuji'` `'zenkaku'/'hankaku'` `'pad:8'`、または `(value, row) => string`。
`defineFormat()` で追加登録できます。

### 式（`{{ }}`）

- フィールド: `{{ name }}` `{{ customer.zip }}` / パラメータ: `{{ $.no }}`
- ページ変数: `{{ #page }} {{ #pages }} {{ #rowIndex }} {{ #repeated }}`
- 集計: `{{ @sum(amount) }} {{ @count() }} {{ @avg(x) }} {{ @sum(qty * unitPrice) }}`（スコープは配置バンドで自動、`@sum(x, 'report')` で明示）
- 繰越: `{{ @carryIn(amount) }} {{ @carryOut(amount) }}`
- 関数: `round / floor / ceil / abs / min / max / concat / coalesce / tax(金額, 税率, 'floor'|'round'|'ceil')` など

## Vue / React

```js
import { RsReport } from '@sano1023/rs-report/vue';    // <RsReport :template="tpl" :data="{ rows }" ref="r" />
import { RsReport } from '@sano1023/rs-report/react';  // <RsReport template={tpl} data={{ rows }} ref={r} />
```

## テスト

```
node --test test/
```

組版エンジンが DOM 非依存のため、改ページ・繰越・集計スコープ・インボイス金額・PDF 構造の受け入れテストを node 単体で 130 件実行します。

## ライセンス

MIT
