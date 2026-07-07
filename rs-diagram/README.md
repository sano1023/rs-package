> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール / 読み込み

```bash
# npm（GitHubのtarball指定）
npm install https://github.com/sano1023/ryusuke-packages-dist/raw/main/tarballs/rs-diagram-0.2.0.tgz
```

```html
<!-- CDN（jsDelivr・scriptタグ直読み） -->
<script src="https://cdn.jsdelivr.net/gh/sano1023/ryusuke-packages-dist@main/rs-diagram/dist/rs-diagram.min.js"></script>
```

```js
// ESM import（npmインストール後）
import { /* 公開API */ } from 'rs-diagram';
```

CSSが必要なパッケージは `dist/rs-diagram.css` を link してください。

---

# rs-diagram

有料JSダイアグラムライブラリ（GoJS / JointJS+ 等）の機能網羅を目指す、依存ゼロのSVG作図ライブラリです（現在 v0.2）。

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
- `arrow: 'triangle'（既定） | 'open' | 'none'`、`arrowStart`（始点側の矢印=両矢印）、`style: { stroke, strokeWidth, dash }`
- **端点は座標も指定できる**: `from: { x, y }` / `to: { x, y }`（ノードに依存しない自由な線・矢印）

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
| `setDrawMode({arrow, arrowStart})` / `getDrawMode()` | 線描画モード（キャンバスドラッグで線を引く） |
| `exportSVG()` | 単体表示可能なSVG文字列を返す |
| `exportPNG({ scale, download, filename })` | PNG Blob を生成（既定でダウンロードも実行） |
| `setReadOnly(v)` | 読み取り専用の切り替え |
| `on(event, cb)` / `off(event, cb)` | イベント購読 |
| `destroy()` | 破棄 |

### イベント

`nodeClick` / `nodeAdd` / `nodeRemove` / `nodeMove` / `nodeResize` / `linkAdd` / `linkConnect` / `linkRemove` / `linkDraw` / `imageSet` / `selectionChange` / `modelChange` / `viewChange` / `drawModeChange`

### キーボード操作

Delete（削除・リンクにも効く）/ Ctrl+D（複製）/ Ctrl+Z（undo）/ Ctrl+Y・Ctrl+Shift+Z（redo）/ Escape（選択・描画モード解除）/ スペース+ドラッグ（パン）/ Ctrl+ホイール（ズーム）

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

- v0.2: bezier・障害物回避ルーティング / ポート / リンク再接続 / グループ化 / キーボード一式 / ミニマップ・ズーム/パン
- v0.3: 自動レイアウト（tree/layered/grid/radial）/ 日本語業務テンプレ（組織図・稟議フロー・ER図・ネットワーク図・座席表）/ スイムレーン
- v0.4: 仮想化描画（1,000ノードでパン/ズーム60fps）/ 変更イベントストリーム
- v0.5: rs-chart・rs-image 連携

## 検証

- 幾何計算・ルーティングの node 単体テスト
- ヘッドレスChromiumでの受け入れテスト13項目（初期描画のSVG構造 / D&D後の座標一致 / グリッドスナップ / リサイズとリンク追従 / パレットD&D / アンカー接続 / 直交経路の検証 / 矩形選択と一括削除 / undo・redo / JSONラウンドトリップ / 複製 / エクスポート / readOnly）

## ライセンス

MIT © ryusuke.sano
