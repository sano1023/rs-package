> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール / 読み込み

```bash
# npm（GitHubのtarball指定）
npm install https://github.com/sano1023/ryusuke-packages-dist/raw/main/tarballs/rs-chart-0.5.0.tgz
```

```html
<!-- CDN（jsDelivr・scriptタグ直読み） -->
<script src="https://cdn.jsdelivr.net/gh/sano1023/ryusuke-packages-dist@main/rs-chart/dist/rs-chart.min.js"></script>
```

```js
// ESM import（npmインストール後）
import { /* 公開API */ } from 'rs-chart';
```

CSSが必要なパッケージは `dist/rs-chart.css` を link してください。

---

# rs-chart

有料JSチャートライブラリ（Highcharts / amCharts / FusionCharts 等）の機能網羅を目指す、依存ゼロのSVGチャートライブラリ。業務システム・SaaS・ダッシュボード・金融（Stock）・リアルタイム監視向けです（現在 v0.5・ロードマップ完走）。

- **依存ゼロ**: ランタイム依存なし。ビルド不要で `src/` から直接 import できる ESモジュール（JS合計 約55KB）
- **チャートタイプ＝プラグイン**: line / column などの組み込みタイプもすべて `defineChartType()` で実装（利用者が独自チャートを数行で追加できる）
- **宣言的オプションAPI**: Highcharts 利用者が移行しやすい形（`series` / `xAxis` / `legend` / `tooltip` …）
- **Renderer 抽象**: SVG（既定・エクスポート/アクセシビリティ向き）と Canvas（Turbo mode・大量データ向き）を `renderer` オプションで切替。上位層は同一コード
- **スマートな初期設定**: きりのいい目盛り・日本語の日時ラベル・桁区切り・自動レスポンシブ・初期アニメーション
- **ライセンス**: MIT

対応ブラウザ: 最新の Chrome / Edge / Safari / Firefox

## デモ

```bash
# このリポジトリで
php -S localhost:8099   # または任意の静的サーバー
# → http://localhost:8099/rs-chart/demo/ を開く
```

全タイプ・タイプ混在・時間軸・凡例トグル・共有ツールチップ・リサイズ・エクスポート・カスタムタイプ（ロリポップ）を試せます。

## インストール

npm公開前は、`src/` ディレクトリと `src/rs-chart.css` をコピーするだけで使えます。

```html
<link rel="stylesheet" href="./rs-chart/src/rs-chart.css">
```

```js
import { createRSChart } from './rs-chart/src/index.js';
// npm公開後: import { createRSChart } from 'rs-chart';
```

## クイックスタート

```html
<div id="container" style="height: 320px"></div>
```

```js
import { createRSChart } from 'rs-chart';

const chart = createRSChart('#container', {
    type: 'line',
    title: '月別売上',
    series: [
        { name: '東京', data: [120, 200, 150, 80, 230] },
        { name: '大阪', data: [90, 150, 180, 60, 190], type: 'column' },  // タイプ混在可
    ],
    xAxis: { categories: ['1月', '2月', '3月', '4月', '5月'] },
    yAxis: { title: '売上（万円）' },
});

chart.update({ title: '更新後' });   // オプション差分更新
chart.setSeries(newSeries);          // データ入れ替え（アニメーション付き）
chart.getSVG();                      // 単体表示可能なSVG文字列
chart.exportPNG('sales.png');        // PNGダウンロード（2xスケール）
chart.on('pointClick', (e) => {});   // { seriesName, pointIndex, x, y, ... }
chart.destroy();
```

## API

### `createRSChart(target, options): Chart`

| オプション | 型 / 既定値 | 説明 |
|---|---|---|
| `type` | `'line'` | 既定のシリーズタイプ（下記13タイプの早見表参照） |
| `series` | `Series[]` | `{ name, data, type?, color?, visible?, yAxis?, dataLabels? }` の配列 |
| `title` / `subtitle` | string | タイトル・サブタイトル |
| `xAxis` | object | `{ type: 'category'\|'linear'\|'time', categories?, title?, min?, max? }`。type は データから自動推定 |
| `yAxis` | object \| array | `{ title?, min?, max?, suffix? }`。配列で第2軸（右側）。シリーズ側は `yAxis: 1` で割当 |
| `legend` | `{ show: true }` | 凡例（クリックでシリーズ表示切替。円系は項目単位） |
| `tooltip` | `{ show: true, shared: true }` | `formatter(points) => html` でカスタマイズ可 |
| `colors` | 10色パレット | シリーズ色の配列 |
| `zoom` | `false` | `true` でドラッグ範囲選択ズーム（ズーム中は Shift+ドラッグでパン、「ズーム解除」ボタン表示） |
| `crosshair` | `false` | ホバー時に横線とY値ラベルを表示 |
| `renderer` | `'svg'` | `'canvas'` で Turbo mode（2層キャンバス・20万点を約300msで初期描画）。円系タイプ・凡例クリック・getSVGは対象外 |
| `downsample` | canvas時は自動 | `{threshold: 2000}`。LTTB間引き。ズーム時は表示範囲を再サンプルして詳細が戻る |
| `rangeSelector` | `false` | Stock用の期間ボタン（時間軸: 1M/3M/6M/1Y/全期間、カテゴリ軸: 本数）。`{buttons:[{label, months|days|count|all}]}` で差し替え可 |
| `navigator` | `false` | 全期間ミニチャート + ズーム窓（ドラッグでパン・両端ハンドルでリサイズ・窓外クリックでジャンプ） |
| `annotations` | `[]` | `{type: 'lineY'|'bandY'|'lineX', value/from/to, color?, label?}` の配列 |
| `stacked` | `false` | `true`（積み上げ）/ `'percent'`（100%積み上げ）。column / area に適用 |
| `gauge` | — | gauge用: `{ min, max, suffix, bands: [{from, to, color}] }` |
| `animation` | `{ duration: 600 }` | `false` で無効 |
| `width` / `height` | 自動 | 省略時はコンテナサイズに追従（ResizeObserver） |
| `chartTypes` | `[]` | `defineChartType()` で作った独自タイプの登録 |

### `series[].data` の形式

`[y, y, ...]` / `[[x, y], ...]` / `[{ x, y, name?, color? }, ...]`。欠損は `null`（線は途切れる）。時間軸では x に Date / タイムスタンプ / ISO文字列を使えます。

### チャートタイプ早見表（16タイプ）

| タイプ | データ形式 | 補足 |
|---|---|---|
| `line` / `area` | 数値配列 / [x,y] / {x,y} | null で線が途切れる。area は `stacked` 対応 |
| `column` / `bar` | 数値配列（カテゴリ軸） | column は `stacked` / `'percent'` 対応。負値OK |
| `pie` / `donut` | {name, y} | 外側ラベル自動整列・凡例は項目単位 |
| `scatter` | [x,y] | 最近傍ホバー |
| `gauge` | [値]（先頭のみ使用） | `options.gauge` で範囲・色バンド・接尾辞 |
| `radar` | 数値配列 + xAxis.categories | 複数シリーズ重ね・凡例はシリーズ単位 |
| `heatmap` | {x, y, value} | xAxis / yAxis の categories で行列ラベル。シリーズ色の濃淡 |
| `candlestick` / `ohlc` | {name, open, high, low, close} / [o,h,l,c] | 陽線=赤・陰線=青（series.upColor / downColor で変更）。出来高は column を `yAxis: 1` で重ねる |
| `funnel` | {name, y}（上から順） | 先頭比%ラベル付き |
| `gantt` | {name, start, end, progress?} | 時間軸バー・進捗塗り・`options.gantt.today` で今日線 |
| `map` | {name, value} + `options.map.geo`（GeoJSON） | コロプレス。等距円筒投影・濃淡・グラデ凡例 |
| `treemap` | {name, y} | squarified レイアウト・面積が値に比例 |

### Chart メソッド

`update(partial)` / `setSeries(series)` / `append(seriesIndex, point, {shift})`（リアルタイム追記。shiftで固定長、右端表示中は自動追従） / `getSVG()` / `exportPNG(filename?)` / `toggleLegend(index)` / `on(event, cb)` / `off` / `destroy()`

イベント: `pointClick` / `legendToggle` / `render`


### ダッシュボード — `createRSDashboard(target, options)`

グリッドレイアウトに複数チャートとKPIカードを並べ、チャート間のズーム・ホバーを連動させます。

```js
import { createRSDashboard } from 'rs-chart';

createRSDashboard('#dash', {
    columns: 12,
    sync: { zoom: true, hover: true },   // ズーム/ホバー連動
    items: [
        { w: 12, kpi: [{ label: '売上', value: '1.2億円', delta: '+8.2%' }] },
        { w: 6, h: 240, options: { type: 'line', zoom: true, xAxis: { type: 'time' }, series: [...] } },
        { w: 6, h: 240, options: { type: 'area', zoom: true, xAxis: { type: 'time' }, series: [...] } },
    ],
});
```

チャート単体でも連動APIが使えます: `chart.setZoom(range)` / `chart.hoverAt(xValue)` / `on('zoom' | 'hover')`。

### カスタムチャートタイプ — `defineChartType(def)`

```js
import { createRSChart, defineChartType } from 'rs-chart';

const lollipop = defineChartType({
    name: 'lollipop',
    axes: true,          // 軸を使う（false なら pie 系のような自由描画）
    needsBand: true,     // カテゴリ軸のバンドが必要（column系）
    zeroBased: true,     // Y軸に0を含める
    draw(ctx) {
        // ctx: { renderer, group, series, xScale, yScale, plot, theme, progress, hits, chart }
        const { renderer, group, xScale, yScale, progress } = ctx;
        for (const s of ctx.series) {
            s.points.forEach((p, i) => {
                const x = xScale.scale(i);
                const y = yScale.scale(p.y * progress);
                renderer.line({ x1: x, y1: yScale.scale(0), x2: x, y2: y, stroke: s.color, 'stroke-width': 2 }, group);
                renderer.circle({ cx: x, cy: y, r: 6, fill: s.color }, group);
                ctx.hits.push({ mode: 'x', px: x, py: y, xKey: i, xLabel: xScale.format(i), yValue: p.y,
                    seriesIndex: s.index, seriesName: s.name, pointIndex: i, color: s.color });
            });
        }
    },
});

createRSChart('#el', { type: 'lollipop', chartTypes: [lollipop], series: [...] });
```

- `ctx.progress`（0→1）を使うと初期アニメーションに参加できる
- `ctx.hits` に点を登録するだけでツールチップ・pointClick が動く

### テーマ

CSSカスタムプロパティで差し替え（SVG出力には描画時の値が焼き込まれるため、`getSVG()` 単体でも見た目が保たれます）:

```css
.rsc { --rsc-text: #334155; --rsc-grid: #e2e8f0; --rsc-axis: #94a3b8; --rsc-font-size: 12; }
```

## 仕組み

```
公開API createRSChart → Chart 本体（正規化・レイアウト・ライフサイクル）
    → チャートタイプ プラグイン（全タイプ同格）
    → 共有部品: Scale（linear/category/time・純粋関数）/ Axis / Legend / Tooltip
    → Renderer インターフェース → SVGRenderer（v0.1）/ CanvasRenderer（v0.4予定）
```

- **Scale は描画から分離した純粋関数**: 1-2-5系列の nice ticks、日時単位の自動選択（分/時/日/月/年）
- **レイアウトは実測ベース**: 目盛りラベル幅・凡例の折返しを測ってから余白を確定
- **ヒットテスト**: 各タイプが登録した点から最近傍（x距離 or 直線距離）を探し、共有ツールチップ・ガイド線・pointClick を提供
- **アニメーション**: rAF でシリーズ層のみ再描画（線はドローイン、棒は伸長、円は掃引）

## ロードマップ（REQUIREMENTS.md 参照）

v0.1〜v0.5 のロードマップは完走（コア → 16タイプ → 操作系 → Stock → Turbo → Maps/Gantt/Dashboards）。以降は追加タイプ・投影の拡充・実案件フィードバックで拡張

## 検証

Playwright による自動テスト（v0.1: 21 + v0.2: 14 + 操作系: 9 + Stock: 11 + Turbo: 11 + Maps/Gantt/Dashboards: 10 = 76項目）（全タイプの描画・nice ticks・時間軸境界・凡例トグル・共有ツールチップ・負値・null・リサイズ・setSeries/update・単体SVG表示・カスタムタイプ・pointClick・destroy）を全パス。

## ライセンス

MIT © ryusuke.sano
