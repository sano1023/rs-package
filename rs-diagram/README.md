> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm install @parelabo/rs-diagram
```

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-diagram-0.5.0.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSDiagram } from '@parelabo/rs-diagram';
import '@parelabo/rs-diagram/rs-diagram.css';   // スタイル（バンドラ経由）

createRSDiagram(document.querySelector('#app'), { /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@parelabo/rs-diagram@0.5.0/dist/rs-diagram.css">
<script src="https://cdn.jsdelivr.net/npm/@parelabo/rs-diagram@0.5.0/dist/rs-diagram.min.js"></script>
<script>
  // 公開APIはグローバル RSDiagram に載る
  RSDiagram.createRSDiagram(document.querySelector('#app'), { /* オプション */ });
</script>
```

### Vue 3

```js
import { RsDiagram } from '@parelabo/rs-diagram/vue';
import '@parelabo/rs-diagram/rs-diagram.css';   // スタイル（バンドラ経由）
```

```vue
<template>
  <RsDiagram />
</template>
```

### React 18 / 19

```jsx
import { RsDiagram } from '@parelabo/rs-diagram/react';
import '@parelabo/rs-diagram/rs-diagram.css';   // スタイル（バンドラ経由）

export default function App() {
  return <RsDiagram />;
}
```

> `vue` / `react` は peerDependency です（バンドルには含みません）。アプリ側のものが使われます。

---

# rs-diagram

依存ゼロのSVG作図・ダイアグラムライブラリです（現在 v0.5）。

- **宣言的**: `nodes` / `links` の配列を渡すだけで3行で図が出る。独自DSLもクラス継承も不要
- **依存ゼロ**: ランタイム依存なし。ビルド不要で `src/` から直接 import できる ESモジュール
- **プラグインアーキテクチャ**: ノード形状・リンク形状はプラグイン（`defineNodeType` / `defineLinkType`）。組み込みの rect / diamond / orthogonal 等もすべて同じAPIで実装
- **model が唯一の真実**: ドラッグもリサイズも接続もすべて「modelへのコマンド適用 → viewはmodelから再描画」。undo/redo は全編集操作に自動対応
- **エディタ = ビューア**: `readOnly: true` の切り替えだけで読み取り専用ビューアになる（クリックイベントは生きる）
- **v0.1 の機能**: 6種の組み込み形状 / straight・orthogonal リンク＋矢印 / クリック・Shift・矩形選択 / ドラッグ移動・8方向リサイズ / アンカーD&Dで接続作成 / グリッドスナップ・整列ガイドライン / パレット / コンテキストメニュー / undo・redo / JSON入出力 / SVG・PNGエクスポート
- **v0.2 の機能**:
  - **パン/ズーム**: スペース or 中ボタンドラッグでカメラ移動、Ctrl+ホイールでカーソル中心ズーム、ホイールでスクロール。`setView/getView/resetView/zoomToFit` API
  - **自由な線/矢印**: パレットの「線を引く/矢印を引く/両矢印」をクリック→キャンバスをドラッグ。端点はノードに置くと自動接続、空白なら座標端点（`from: {x, y}`）。**リンクのクリック選択・Delete削除・端点ドラッグでの付け替え・自由線の移動**に対応
  - **画像**: 画像ノードをパレットから置く／ダブルクリックでファイル選択→dataURLで内包（保存JSONに含まれ、PNG出力も汚染なし。大きい画像は自動縮小）
  - **スタイルバー**: 選択すると上部に表示。ノード=塗り/枠/文字色、リンク=線色/太さ/破線/矢印（両矢印可）をその場で変更（undo可）
  - **入出力**: `exportJSON({download})` / `importJSONFile(file)` / `loadFrom(url)` / `saveTo(url)`（fetchでAPI送受信）
  - **スタンプ**: 絵文字スタンプノード（`type: 'stamp', emoji: '⭐'`）。パレットに⭐✅⚠️👍を同梱
  - **ラベル編集**: ノードをダブルクリックでその場編集（Enter確定・Shift+Enter改行・Esc取消）
- **v0.3 の機能**:
  - **自動レイアウト**: `diagram.layout('tree' | 'layered' | 'grid' | 'radial')`。DOM非依存の純粋関数（`layout.js`）。undo可能で、重なりが解消される
  - **日本語業務テンプレ**: `createRSDiagram(el, { template: 'orgchart', data })` で定番図が一発生成。**組織図 / 稟議・承認フロー / ER図 / ネットワーク構成図 / 座席表**（専用ノードタイプ＋サンプルデータ＋レイアウトのプリセット）
  - **bezier リンク・障害物回避ルーティング**: `router: 'bezier'`（滑らかな曲線）/ `router: 'avoid'`（間のノードを避けて迂回する直交配線）
  - **ポート**: ノード上の明示的な接続点 `ports: [{ id, position }]`（position は `'left'` 等の辺名か `{ x, y }` 割合）。ポートの●からドラッグで `from: { node, port }` 接続
  - **リンクラベル**: `label` を経路上に表示（`labelT` で位置比率指定）。選択してハンドルをドラッグで自由移動（undo可）
  - **リンク再接続**: 選択したリンクの端点◯をドラッグでノード/ポートへ付け替え
  - **グループ化**: `diagram.group(ids)` で子を囲むコンテナを作成。グループ移動で子が追従、見出しの▶で折りたたみ（子を隠し、子へのリンクはグループへ再ルート）
  - **スイムレーン**: `lanes: [{ id, label, x, y, width, height }]`。レーン帯の移動で内部ノードが追従、ハンドルでリサイズ。`laneOf(nodeId)` で所属判定
  - **キーボード操作一式**: Tab/Shift+Tab（ノード巡回）・矢印キー（移動・Shiftで大きく）・Enter（ラベル編集）・Esc（解除）・Ctrl+G / Ctrl+Shift+G（グループ化/解除）
- **v0.4 の機能**:
  - **仮想化描画**: ビューポート外ノード/リンクの `<g>` を DOM から除去し、再入場で復元する（**model は不変・view だけを間引く**）。既定でON（`virtualize: false` で無効化、`virtualizeMargin` で先読み余白）。パン/ズームに追従し、**1,000ノードの図でパン/ズーム60fps**（実測: 可視域のみ約100ノードを描画、1フレーム1ms未満）
  - **差分描画（dirty節点のみ再描画）**: 各ノード/リンクを署名（signature）でキャッシュし、変化した要素の `<g>` だけを作り直す。移動は `transform` だけ更新して中身を再生成しないので、ドラッグ/選択の応答が軽い
  - **変更イベントストリーム（コラボ向け）**: すべてのコマンド実行を op 粒度の `{ type, payload }` 列へ細分化。`diagram.on('op', op => …)` で1 opずつ、`diagram.on('modelChange', e => e.ops)` で1コマンド分の op 列を受け取れる。**undo/redo も逆操作の op 列として流れる**ので、そのままサーバ同期の差分に使える（同期そのものはアプリ側の責務）。`diagram.getLastOps()` / `getRenderStats()` / `setVirtualize(on)` を追加
- **v0.5 の機能（エコシステム連携・opt-in）**: 同リポジトリの他パッケージと相互運用する。**連携先は import しない**（生成関数を「注入」で受け取るので rs-diagram 自体は依存ゼロのまま）。**連携先が未ロードでも図は壊れない**（自動フォールバック）。
  - **rs-chart 内包ノード**: `defineChartNode({ createRSChart })` が返すノードタイプを登録すると、`{ type: 'chart', chart: {...rs-chartのオプション} }` で**図の中に小型チャート（rs-chart 実体）**を持てる。チャートは SVG の `foreignObject` に埋め込まれ、ノードのドラッグ/選択/ズームにそのまま追従する。`updateNode(id, { chart })` で**図中のチャートがデータ追従**（ノード再構築時・削除時・破棄時にチャートは確実に destroy される）。`createRSChart` を渡さなければ純SVGの簡易バー（サムネイル）へフォールバック。「`defineNodeType` の draw 内で `createRSChart` を呼ぶだけで実現できる」ことの実証
  - **画像ノードの rs-image 編集**: `makeRSImagePicker({ createRSImageEditor })` を `options.imagePicker` に渡すと、**画像ノードのダブルクリックで rs-image のエディタがモーダル起動**し、トリミング/回転/文字入れ等の編集結果を dataURL でノードへ書き戻す。`createRSImageEditor` が無ければ既定のファイル選択へフォールバック
- **ライセンス**: MIT

対応ブラウザ: 最新の Chrome / Edge / Safari / Firefox（IE・旧ブラウザは非対応）

## デモ

```bash
# このリポジトリで
php -S localhost:8099   # または任意の静的サーバー
# → http://localhost:8099/rs-diagram/demo/ を開く
```

デモはパレット付きフローチャートエディタです。パレットからのD&D投入・ドラッグ編集・接続作成・undo/redo・保存/読込（localStorage）・SVG/PNGエクスポート・読み取り専用切り替えを試せます。

## インストール

npm公開前は、`src/` ディレクトリをコピーするだけで使えます。

```html
<link rel="stylesheet" href="./rs-diagram/src/rs-diagram.css">
```

```js
import { createRSDiagram } from './rs-diagram/src/index.js';
// npm公開後: import { createRSDiagram } from 'rs-diagram';
```

## クイックスタート

```html
<div id="canvas" style="height: 480px"></div>
<div id="palette"></div>
```

```js
import { createRSDiagram } from 'rs-diagram';

const diagram = createRSDiagram('#canvas', {
    nodes: [
        { id: 'start',  type: 'rounded', label: '申請',     x: 120, y: 40 },
        { id: 'check',  type: 'diamond', label: '課長承認?', x: 110, y: 160 },
        { id: 'done',   type: 'rect',    label: '発注処理',  x: 120, y: 300 },
    ],
    links: [
        { from: 'start', to: 'check' },
        { from: 'check', to: 'done',  label: 'はい' },
        { from: 'check', to: 'start', label: 'いいえ', router: 'orthogonal' },
    ],
    grid: { size: 8, snap: true, show: true },
    palette: '#palette',      // ステンシル一覧をこの要素に描画（D&Dで投入）
    contextMenu: true,        // 右クリックメニュー（複製/削除/最前面へ/最背面へ）
});

// 編集はすべて model 操作（viewは自動追従・undo可能）
diagram.addNode({ id: 'mail', type: 'rect', label: 'メール通知', x: 300, y: 300 });
diagram.updateNode('check', { label: '部長承認?' });
diagram.removeNode('mail');
diagram.select(['start', 'check']);

diagram.on('nodeMove',    (e) => console.log(e.node.id, e.node.x, e.node.y));
diagram.on('linkConnect', (e) => console.log(e.link.from, '→', e.link.to));
diagram.on('modelChange', () => save(diagram.toJSON()));   // 自動保存はこの1行

diagram.undo(); diagram.redo();
diagram.exportSVG();          // 単体表示可能なSVG文字列
diagram.exportPNG();          // PNGダウンロード（Blobも返す）
diagram.destroy();
```

## API

### `createRSDiagram(target, options): Diagram`

| オプション | 型 / 既定値 | 説明 |
|---|---|---|
| `nodes` | `Node[]` | 初期ノード。`{ id?, type?, label?, x, y, width?, height?, style?, ... }` |
| `links` | `Link[]` | 初期リンク。`{ id?, from, to, label?, router?, arrow?, style?, ... }` |
| `grid` | `{ size: 8, snap: true, show: true }` | グリッド表示とスナップ |
| `guides` | `true` | ドラッグ中の整列ガイドライン（他ノードの端/中心に吸着する赤ガイド） |
| `palette` | selector \| element | ステンシル一覧を描画する要素。D&Dでキャンバスへ投入 |
| `paletteItems` | `[{ type, label, defaults? }]` | パレットの項目（省略時は組み込み6形状） |
| `contextMenu` | `true` | 右クリックメニュー。`false` で無効、配列で項目差し替え |
| `readOnly` | `false` | 読み取り専用ビューア（`nodeClick` 等の閲覧イベントは生きる） |
| `nodeTypes` / `linkTypes` | `[]` | カスタム形状プラグインの登録 |
| `virtualize` | `true` | 仮想化描画（ビューポート外ノード/リンクの `<g>` を DOM から除去）。大規模図で有効 |
| `virtualizeMargin` | `160` | 仮想化の先読み余白（model座標）。画面外に少し広げてパン時の欠けを防ぐ |
| `ariaLabel` | `'ダイアグラムエディタ'` | コンテナの aria-label |

- `id` 省略時は自動採番。`width` / `height` 省略時はタイプの既定値
- ノード・リンクの**未知のプロパティは保持され** `toJSON()` でそのまま返る（アプリ側の付加情報を壊さない）
- 座標は model 座標（ズーム非依存）。`x`/`y` はノード左上

### 組み込みノードタイプ（7種）

| type | 形状 | 既定サイズ |
|---|---|---|
| `rect` | 四角形 | 120×48 |
| `rounded` | 角丸四角形 | 120×48 |
| `ellipse` | 楕円 | 120×56 |
| `diamond` | ひし形（判断） | 140×72 |
| `text` | 枠なしテキスト | 120×32 |
| `image` | 画像（`node.image` にURL/dataURL。ダブルクリックでファイル選択） | 96×72 |
| `stamp` | 絵文字スタンプ（`node.emoji`） | 56×56 |

### 組み込みリンクタイプ

- `router: 'straight'`（既定）— 形状境界から境界への直線
- `router: 'orthogonal'` — 水平垂直の折れ線。`fromAnchor` / `toAnchor`（top/right/bottom/left）で出入りの辺を指定可能
- `router: 'bezier'` — 滑らかな三次ベジェ曲線
- `router: 'avoid'` — 障害物回避の直交配線（間にある他ノードを避けて迂回。疎グリッド上の A*）
- `arrow: 'triangle'（既定） | 'open' | 'none'`、`arrowStart`（始点側の矢印=両矢印）、`style: { stroke, strokeWidth, dash }`
- **端点は座標も指定できる**: `from: { x, y }` / `to: { x, y }`（ノードに依存しない自由な線・矢印）
- **端点はポートも指定できる**: `from: { node: 'id', port: 'out' }`
- **ラベル**: `label` を経路上に表示。`labelT`（0..1 経路上の位置）・`labelDx` / `labelDy`（オフセット。ドラッグで自動設定）

### 業務テンプレート

`createRSDiagram(el, { template, data })` で定番図が完成します（`data` 省略時はサンプル）。

| template | 内容 | 専用ノードタイプ | 既定レイアウト |
|---|---|---|---|
| `orgchart` | 組織図（氏名＋役職） | `org-person` | tree |
| `approval` | 稟議/承認フロー | rounded/rect/diamond | layered |
| `er` | ER図（テーブル＋カラム） | `er-table` | grid |
| `network` | ネットワーク構成図 | `net-device`（cloud/router/switch/server/pc） | tree |
| `seating` | 座席表 | `seat` | 明示配置 |

### Diagram メソッド

| メソッド | 説明 |
|---|---|
| `addNode(node)` / `updateNode(id, props)` / `removeNode(id)` | ノード編集（すべてundo可能。削除はリンクも連鎖削除） |
| `addLink(link)` / `updateLink(id, props)` / `removeLink(id)` | リンク編集 |
| `select(ids)` / `getSelection()` | 選択の変更・取得 |
| `deleteSelection()` / `duplicateSelection()` | 選択の削除・オフセット付き複製（Ctrl+D相当） |
| `bringToFront()` / `sendToBack()` | 選択ノードのz順変更 |
| `undo()` / `redo()` / `canUndo` / `canRedo` | コマンド履歴 |
| `toJSON()` / `fromJSON(json)` | JSON入出力（ラウンドトリップ保証） |
| `exportJSON({download, filename})` / `importJSONFile(file)` | JSON文字列/ファイルでの書き出し・読み込み |
| `loadFrom(url, fetchOptions)` / `saveTo(url, {method, headers})` | fetchでAPIからの読み込み・APIへの送信 |
| `selectLinks(ids)` / `getLinkSelection()` | リンクの選択 |
| `setView({x, y, scale})` / `getView()` / `resetView()` / `zoomToFit()` | パン/ズーム |
| `setDrawMode({arrow, arrowStart, router})` / `getDrawMode()` | 線描画モード（キャンバスドラッグで線を引く。router で bezier/avoid も可） |
| `layout(name, opts)` | 自動レイアウト（`'tree'`/`'layered'`/`'grid'`/`'radial'`・undo可） |
| `group(ids)` / `ungroup(id)` / `toggleCollapse(id)` | グループ化・解除・折りたたみ |
| `addLane(lane)` / `updateLane(id, props)` / `removeLane(id)` / `selectLane(id)` | スイムレーン編集 |
| `laneOf(nodeId)` / `nodesInLane(lane)` | レーン所属判定・レーン内ノード取得 |
| `exportSVG()` | 単体表示可能なSVG文字列を返す |
| `exportPNG({ scale, download, filename })` | PNG Blob を生成（既定でダウンロードも実行） |
| `setReadOnly(v)` | 読み取り専用の切り替え |
| `setVirtualize(on)` | 仮想化描画のON/OFF切り替え（大規模図の性能検証・比較用） |
| `getRenderStats()` | 描画統計 `{ virtualize, renderedNodes, renderedLinks, totalNodes, totalLinks }`（DOMにある `<g>` 数＝可視域） |
| `getLastOps()` | 直近コマンドが生成した op 列 `{ type, payload }[]`（コラボ同期の差分） |
| `on(event, cb)` / `off(event, cb)` | イベント購読 |
| `destroy()` | 破棄 |

### イベント

`nodeClick` / `nodeAdd` / `nodeRemove` / `nodeMove` / `nodeResize` / `linkAdd` / `linkConnect` / `linkRemove` / `linkDraw` / `imageSet` / `selectionChange` / `modelChange` / `viewChange` / `drawModeChange` / `layout` / `groupCollapse` / `laneAdd` / `laneMove` / `laneResize` / `laneRemove` / `op`

- **`op`**（v0.4・コラボ向け変更イベントストリーム）: すべての編集を op 粒度 `{ type, payload }` で1つずつ発火する。`addNode` / `removeNode` / `addLink` / `removeLink` / `updateNode` / `updateLink` / `updateLane` / `reorder` / `addLane` / `removeLane` 等。**undo/redo では逆操作の op が流れる**ので、そのままサーバ同期の差分に使える（同期はアプリ側の責務）
- **`modelChange`** は1コマンドにつき1回発火し、`{ type, direction, ops }` を渡す（`ops` がそのコマンドの op 列）。`diagram.on('modelChange', e => save(diagram.toJSON()))` の自動保存はこれまで通り動く

### キーボード操作

Tab / Shift+Tab（ノード巡回選択）/ 矢印キー（選択ノードを移動・Shiftで大きく）/ Enter（単一選択ノードのラベル編集）/ Delete（削除・リンク/レーンにも効く）/ Ctrl+D（複製）/ Ctrl+G・Ctrl+Shift+G（グループ化/解除）/ Ctrl+Z（undo）/ Ctrl+Y・Ctrl+Shift+Z（redo）/ Escape（選択・描画モード解除）/ スペース+ドラッグ（パン）/ Ctrl+ホイール（ズーム）

### カスタム形状 — `defineNodeType(def)` / `defineLinkType(def)`

組み込み形状もすべてこのAPIで実装されています。

```js
import { defineNodeType, defineLinkType, createRSDiagram } from 'rs-diagram';

const server = defineNodeType({
    name: 'server',
    defaults: { width: 96, height: 72 },
    anchors: ['top', 'bottom', 'left', 'right'],   // 省略時はこの4点
    draw({ renderer, group, width, height, style }) {
        // Renderer 抽象（rect/circle/path/text/…）だけで描く
        renderer.rect({ x: 0, y: 0, width, height, rx: 6, fill: style.fill, stroke: style.stroke, 'stroke-width': style.strokeWidth }, group);
        renderer.line({ x1: 0, y1: 16, x2: width, y2: 16, stroke: style.stroke }, group);
    },
});

const dashed = defineLinkType({
    name: 'dashed',
    route({ source, target }) { /* 純粋関数: 経路点の配列を返す */ },
    defaults: { dash: '6 4', arrow: 'triangle' },
});

createRSDiagram('#el', { nodeTypes: [server], linkTypes: [dashed], nodes: [{ type: 'server', x: 40, y: 40 }] });
```

### エコシステム連携（v0.5・opt-in）

同リポジトリの `rs-chart` / `rs-image` と相互運用できます。rs-diagram は連携先を **import しません**。生成関数を「注入」で受け取るので**依存ゼロのまま**で、**連携先が未ロードでも図は壊れません**（自動フォールバック）。

**rs-chart 内包ノード** — `defineNodeType` の draw 内で `createRSChart` を呼ぶだけで「図の中の小型チャート」が実現できます。

```js
import { createRSDiagram, defineChartNode } from 'rs-diagram';
import { createRSChart } from 'rs-chart';   // ← アプリ側で import して注入

const chartNode = defineChartNode({ createRSChart, defaults: { width: 250, height: 170 } });

const diagram = createRSDiagram('#el', {
    nodeTypes: [chartNode],
    nodes: [{
        id: 'sales', type: 'chart', x: 40, y: 40, chartTitle: '月次売上',
        chart: { type: 'column', series: [{ name: '売上', data: [120, 200, 150] }], xAxis: { categories: ['1月', '2月', '3月'] } },
    }],
});

// データ更新で図中のチャートが追従（undo 可）
diagram.updateNode('sales', { chart: { ...diagram.getNode('sales').chart, series: [{ data: [120, 200, 150, 210] }] } });
```

- チャートは SVG の `foreignObject` に埋め込まれ、ノードのドラッグ/選択/ズームに自動追従します
- `createRSChart` を渡さない（未ロード）場合は純SVGの簡易バー（サムネイル）へフォールバックします
- 内包チャートはノードの再構築時・削除時・`diagram.destroy()` 時に確実に `destroy()` されます

**画像ノードの rs-image 編集** — `makeRSImagePicker` を `imagePicker` に渡すと、**画像ノードのダブルクリックで rs-image エディタがモーダル起動**し、編集結果を dataURL でノードへ書き戻します。

```js
import { createRSDiagram, makeRSImagePicker } from 'rs-diagram';
import { createRSImageEditor } from 'rs-image';   // ← 注入

createRSDiagram('#el', {
    nodes: [{ id: 'pic', type: 'image', x: 40, y: 40, image: '...' }],
    imagePicker: makeRSImagePicker({ createRSImageEditor }),   // 未指定 or 未ロード時は既定のファイル選択
});
```

| ヘルパー | 説明 |
|---|---|
| `defineChartNode({ createRSChart, name?, defaults?, chartDefaults? })` | rs-chart 内包ノードのタイプ定義を返す。`name` 既定 `'chart'`。ノードは `{ type, chart, chartTitle? }` |
| `makeRSImagePicker({ createRSImageEditor, editorOptions?, title? })` | `options.imagePicker` 用の関数を返す。未注入時はファイル選択にフォールバック |
| `chartFallbackBars` / `firstSeriesValues` / `chartOptionsFor` / `resolveImageEditFlow` | 連携の純粋関数（node 単体テスト可能） |

### テーマ

CSSカスタムプロパティ（`--rsd-*`）で差し替えられます。

```css
.rsd {
    --rsd-bg: #0f172a;
    --rsd-node-fill: #1e293b;
    --rsd-node-stroke: #94a3b8;
    --rsd-text: #e2e8f0;
    --rsd-link: #94a3b8;
    --rsd-selection: #38bdf8;
}
```

## 仕組み

- **model が唯一の真実**: `{ nodes, links }` への操作はすべてコマンド（apply/revert を持つ差分オブジェクト）として適用され、view は model から再描画される。これにより undo/redo が全操作で自動的に成立する
- **純粋関数層**: スナップ・アンカー・境界交点・整列ガイド（`geometry.js`）と直線・直交ルーティング（`routing.js`）はDOM非依存の純粋関数で、node 単体でテストできる
- **Renderer 抽象**: 描画は SVGRenderer の背後にあり、形状プラグインは Renderer だけに依存する（rs-chart と同思想）
- **ズーム/パン設計**: 最上位 `<g transform>` 1枚で行う設計（v0.1 は恒等変換）。model 座標系は不変で、JSONやエクスポートにビューポートが混入しない

## ロードマップ（REQUIREMENTS.md 参照）

- v0.2: ズーム/パン / 自由な線・矢印 / 画像 / スタイルバー / 入出力 / スタンプ / ラベル編集（実装済み）
- v0.3: bezier・障害物回避ルーティング / ポート / リンクラベル・再接続 / グループ化・折りたたみ / キーボード一式 / 自動レイアウト（tree/layered/grid/radial）/ 日本語業務テンプレ（組織図・稟議フロー・ER図・ネットワーク図・座席表）/ スイムレーン（実装済み）
- v0.4: 仮想化描画（1,000ノードでパン/ズーム60fps）/ 差分描画 / 変更イベントストリーム（実装済み）
- v0.5: rs-chart 内包ノード / 画像ノードの rs-image 編集（エコシステム連携・実装済み）

## 検証

- 幾何計算・ルーティング・自動レイアウト・グループ・ポート・**仮想化/差分描画・変更イベントストリーム・エコシステム連携の純粋関数**の node 単体テスト（`test/*.test.mjs`、45項目）
- ヘッドレスChromiumでの受け入れテスト:
  - v0.1（13項目）: 初期描画のSVG構造 / D&D後の座標一致 / グリッドスナップ / リサイズとリンク追従 / パレットD&D / アンカー接続 / 直交経路 / 矩形選択と一括削除 / undo・redo / JSONラウンドトリップ / 複製 / エクスポート / readOnly
  - v0.2（15項目）: パン/ズーム / 自由な線・矢印 / リンク選択・再接続 / スタイルバー / 画像 / スタンプ / ラベル編集 / 入出力
  - v0.3（11項目）: テンプレ生成 / 4種の自動レイアウト（重なり解消）/ bezier / 障害物回避 / ポート接続 / リンクラベルのドラッグ / 端点再接続 / グループ移動・折りたたみ / スイムレーン / キーボード操作
  - v0.4（8項目）: 1,000ノードの仮想化（可視域のみ描画）/ 仮想化ON/OFFの可逆性 / パンでの入退場（model不変）/ 仮想化下の選択・ドラッグ・リンク追従 / リンク仮想化と選択復元 / パン中央値<16.7ms かつ 仮想化ON>OFF / op粒度の変更イベントと undo/redo 両立 / コンソールエラー0
  - v0.5（7項目）: rs-chart 内包ノードの図中描画（foreignObject に rs-chart 実体）/ データ更新でチャート追従 / 画像ノードのダブルクリックで rs-image 編集起動 / 適用で dataURL 書き戻し / 連携先未ロード時フォールバック（chart=簡易バー・image=ファイル選択）/ チャートノードのドラッグ追従（相互運用維持）/ コンソールエラー0

## ライセンス

MIT © ryusuke.sano
