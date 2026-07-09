> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm install @parelabo/rs-replay
```

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-replay-0.4.0.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSReplayPlayer } from '@parelabo/rs-replay';
import '@parelabo/rs-replay/rs-replay.css';   // スタイル（バンドラ経由）

createRSReplayPlayer(document.querySelector('#app'), session, { /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@parelabo/rs-replay@0.4.0/dist/rs-replay.css">
<script src="https://cdn.jsdelivr.net/npm/@parelabo/rs-replay@0.4.0/dist/rs-replay.min.js"></script>
<script>
  // 公開APIはグローバル RSReplay に載る
  RSReplay.createRSReplayPlayer(document.querySelector('#app'), session, { /* オプション */ });
</script>
```

### Vue 3

```js
import { RsReplayPlayer, RsHeatmap } from '@parelabo/rs-replay/vue';
import '@parelabo/rs-replay/rs-replay.css';   // スタイル（バンドラ経由）
```

```vue
<template>
  <RsReplayPlayer />
</template>
```

### React 18 / 19

```jsx
import { RsReplayPlayer, RsHeatmap } from '@parelabo/rs-replay/react';
import '@parelabo/rs-replay/rs-replay.css';   // スタイル（バンドラ経由）

export default function App() {
  return <RsReplayPlayer />;
}
```

> `vue` / `react` は peerDependency です（バンドルには含みません）。アプリ側のものが使われます。

---

# rs-replay

完全セルフホスト・依存ゼロのセッション記録/再生ライブラリ（現在 v0.4）。

- **完全セルフホスト = データ主権**: 記録データをどこへ送るかは利用側の `onChunk` コールバックが決める。**ライブラリ自身はいかなる外部送信も行わない**（fetch / XHR / sendBeacon のコードがそもそも存在しない）
- **プライバシー・バイ・デフォルト**: input値・password・`[data-rs-mask]` / `.rs-mask` 要素は**DOM読み取りの時点で伏字化され、生値がシリアライズ層に到達しない**（マスク済みの値しか受け取れない reader 構造で保証）。**Shadow DOM / iframe / Canvas の記録経路でも同じ reader を通す**
- **分析と監査（v0.4）**: **レイジクリック**（短時間連打）/ **デッドクリック**（DOM無反応クリック）を検出しプレイヤーのタイムラインにマーカー表示。**ファネル到達集計**（カスタムイベントの段階到達を集計）。**プライバシー監査ツール `auditSession(session)`**: セッションJSONを走査し、メール/電話/カード番号らしきパターンと未マスク input 値を検出して「マスク漏れ」を報告する（保存/共有前の機械チェック）
- **ヒートマップ同梱（v0.3）**: 記録済みセッションから**クリック / ムーブ / スクロール深度**のヒートマップを自前canvasで生成（`createRSHeatmap`）。**要素単位集計**＋**複数セッション合成**で、レスポンシブに強い（セレクタ正規化で動的id・CSS-in-JSクラスを除外し、座標がずれても要素で合算）。集計は rs-chart 等に依存しない
- **高い忠実度（v0.2）**: 同一オリジン iframe・Shadow DOM の記録/再生、Canvas の画像スナップショット、無操作区間のスキップ、コンソールエラー/カスタムイベント/SPAルート変化のタイムラインマーカー
- **実運用サイズ（v0.2）**: `CompressionStream('gzip')` による gzip 圧縮（**通常操作5分で gzip 後 500KB 未満**）。非対応環境は非圧縮に自動フォールバック
- **プレイヤー同梱のオールインワン**: タイムライン・シーク・速度（0.5〜8x）・仮想カーソル・クリックリップルまで同梱。「記録コアだけ」ではないオールインワン
- **安全な再生**: sandbox iframe（`allow-scripts` なし）で再現するため、**記録ページのスクリプトは一切実行されない**（再生が第2のXSS経路にならない）
- **依存ゼロ・ビルド不要**: ESモジュールを `src/` から直接 import。記録開始はスニペット数行
- **ライセンス**: MIT

対応ブラウザ: 最新の Chrome / Edge / Safari / Firefox

## デモ

```bash
# このリポジトリで
php -S localhost:8099   # または任意の静的サーバー
# → http://localhost:8099/rs-replay/demo/ を開く
```

左半分のフォーム・ボタン・スクロール領域を操作し、「ここまでを再生」を押すと右半分のプレイヤーで再現される**ループバックデモ**。password やマスク要素の生値が再生側に一切現れないことをその場で確認できます。**v0.2 では Shadow DOM・同一オリジン iframe・Canvas を含むコンポーネントの記録/再生、カスタムイベント/console.error/ルート変化のタイムラインマーカー、無操作スキップ、gzip 後サイズの表示も試せます。v0.3 では「現在の操作をセッションに追加」で複数セッションを溜め、「ヒートマップ表示」で左ペインにクリック/ムーブ/スクロール深度のヒートマップを重ね、種別切替・強度調整もその場で試せます。v0.4 では「反応しないボタン」を素早く連打してから再生するとレイジクリック（◆）/デッドクリック（○）がタイムラインに表示され、「現在のセッションを監査」でマスク漏れ検査（メール/電話/カード番号/未マスクinput）、「ファネル到達集計」で段階到達の集計を試せます。**

## インストール

npm公開前は、`src/` ディレクトリをコピーするだけで使えます。

```html
<link rel="stylesheet" href="./rs-replay/src/rs-replay.css">
```

```js
import { createRSReplayRecorder, createRSReplayPlayer } from './rs-replay/src/index.js';
// npm公開後: import { createRSReplayRecorder, createRSReplayPlayer } from 'rs-replay';
```

## クイックスタート

```js
import { createRSReplayRecorder, createRSReplayPlayer, mergeChunks } from 'rs-replay';

// ---- 記録 ----
const recorder = createRSReplayRecorder({
    maskSelector: '.secret',            // 既定([data-rs-mask], .rs-mask)に追加するマスク対象
    chunkInterval: 10000,               // 10秒ごと or
    chunkEvents: 500,                   // 500イベントごとに onChunk
    onChunk: (chunk, meta) => {
        // 送信は利用側の責務（ライブラリは送らない）。例:
        // navigator.sendBeacon('/api/replay', JSON.stringify(chunk));
    },
});
recorder.start();
// ... ユーザー操作 ...
recorder.stop();                        // 最終チャンクをflushして停止
const session = recorder.getSession();  // その場再生用のセッションJSON

// ---- 再生 ----
const player = createRSReplayPlayer('#viewer', session, { speed: 1 });
player.play();
player.seek(12000);
player.setSpeed(2);
player.on('finish', () => console.log('再生完了'));

// ---- サーバーに貯めたチャンクからの再生 ----
const restored = mergeChunks(chunksFromServer);      // seq連番・version・sessionIdを検証
createRSReplayPlayer('#viewer', restored);           // JSON文字列を直接渡してもよい
```

## API

### `createRSReplayRecorder(options): Recorder`

| オプション | 既定値 | 説明 |
|---|---|---|
| `maskSelector` | `''` | 既定のマスク対象（`[data-rs-mask], .rs-mask`）に**追加**するセレクタ |
| `ignoreSelector` | `'[data-rs-ignore], .rs-replay-ignore'` | 記録から丸ごと除外するサブツリー（プレイヤー自身を同一ページに置く場合等） |
| `chunkInterval` | `10000` | onChunk の発火間隔（ms） |
| `chunkEvents` | `500` | onChunk の発火イベント数 |
| `maxBufferedEvents` | `5000` | 未flushイベントの保持上限（超過で強制flush） |
| `moveThrottle` | `50` | マウス移動の記録間隔（ms）。直線区間はさらに間引き |
| `scrollThrottle` | `100` | スクロールの記録間隔（ms・対象ごと） |
| `onChunk` | `null` | `(chunk, meta) => {}`。チャンクの行き先はここだけが決める |
| `keepSession` | `true` | `getSession()` 用に全イベントを保持。長時間記録では `false` + チャンク運用 |
| `compress` | `'auto'` | `getCompressedSession()` の圧縮方針。`'auto'`=可能ならgzip / `false`=非圧縮（v0.2） |
| `recordCanvas` | `false` | **opt-in**。canvas を `toDataURL` で画像スナップショット化（マスク対象内の canvas は取り込まない）（v0.2） |
| `recordConsoleErrors` | `true` | `console.error` もマーカー用に記録（本来の出力はそのまま通す）（v0.2） |

Shadow DOM（open）・同一オリジン iframe は**既定で記録/再生される**（オプション不要）。境界ごとに `MutationObserver` を張り、差分も追随する。

### Recorder メソッド

| メソッド | 説明 |
|---|---|
| `start()` | スナップショットを取り記録開始 |
| `stop()` | 保留分を確定し最終チャンクをflushして停止 |
| `getSession()` | セッションJSON（進行中でも可。`keepSession: true` 時のみ） |
| `addEvent(name, data)` | カスタムイベントを記録（タイムラインにマーカー表示）（v0.2） |
| `getCompressedSession()` | `Promise<Uint8Array>`。gzip 済みバイト列（非対応環境は非圧縮UTF-8。先頭マジックで自動判別）（v0.2） |
| `on(name, fn)` / `off(name, fn)` | イベント: `start` / `stop` / `chunk` / `error` |
| `destroy()` | stop + 全リスナー・MutationObserver・タイマーを解放 |

### `createRSReplayPlayer(target, session, options): Player`

`session` はセッションJSONオブジェクトでも**JSON文字列**でもよい。`version` 不一致は黙って壊れず明示エラーを投げる。

| オプション | 既定値 | 説明 |
|---|---|---|
| `speed` | `1` | 再生速度（0.5〜8） |
| `autoplay` | `false` | 生成後すぐ再生 |
| `skipInactive` | `false` | 無操作区間をスキップして再生（タイムラインには区間を表示）（v0.2） |
| `inactiveThreshold` | `1500` | この ms を超えるイベント間隔を「無操作区間」と判定（v0.2） |
| `analyze` | `true` | レイジ/デッドクリックを検出しタイムラインにマーカー表示（v0.4）。`false` で無効化 |
| `rageOptions` / `deadOptions` | `null` | 検出パラメータ（`{minClicks, windowMs, radius}` / `{windowMs}`）の上書き（v0.4） |

生成後、`player.skips`（無操作区間 `{start,end}` の配列）と `player.markers`（`route`/`error`/`custom`／v0.4 の `rage`/`dead` マーカーの配列）を参照できる。タイムライン上にはスキップ区間（ハッチング）と各マーカー（点・レイジは菱形）が描画される。

### Player メソッド

| メソッド | 説明 |
|---|---|
| `play()` / `pause()` | 再生 / 一時停止（末尾からの `play()` は先頭に戻る） |
| `seek(ms)` | 任意時点へ。過去へは「スナップショット再構築 → 差分早送り」（二分探索） |
| `setSpeed(x)` | 0.5〜8x |
| `setSkipInactive(on)` | 無操作スキップの ON/OFF を切り替え（v0.2） |
| `getAnalysis()` | レイジ/デッドクリックの検出結果 `{ rage, dead }` を返す（v0.4） |
| `on(name, fn)` / `off(name, fn)` | イベント: `play` / `pause` / `seek` / `speed` / `finish` / `skipInactive` / `marker`（v0.2） |
| `destroy()` | UI・リスナーを解放 |

`createRSReplayPlayerFromData(target, data, options)`（v0.2・async）は gzip/非圧縮バイト列・JSON文字列・セッションオブジェクトのいずれからでもプレイヤーを生成する（`DecompressionStream` で自動判別）。

コントロールはすべて日本語UI・`aria-label` 付き。キーボード: **Space = 再生/停止・← → = 5秒シーク**。テーマはCSSカスタムプロパティ（`--rsr-bg` / `--rsr-accent` 等）で上書き可能。

### `createRSHeatmap(target, sessions, options): Heatmap`（v0.3）

記録済みセッション（`getSession()` / `mergeChunks()` の戻り・単体でも配列でもJSON文字列でも可）を集計し、`target` 要素の上に自前canvasでヒートマップをオーバーレイする。**複数セッションは合成される**（同じ要素・同じ位置・同じ深度帯で強度が加算）。

```js
import { createRSHeatmap } from 'rs-replay';

const sessions = [sessionA, sessionB, sessionC];   // 複数セッションを合成
const heatmap = createRSHeatmap('#page', sessions, { type: 'click' });
heatmap.setType('move');       // 'click' | 'move' | 'scroll'
heatmap.setIntensity(1.8);     // 強度（0.1〜4）
heatmap.destroy();
```

| オプション | 既定値 | 説明 |
|---|---|---|
| `type` | `'click'` | `'click'`（要素単位）/ `'move'`（位置密度）/ `'scroll'`（深度到達率） |
| `intensity` | `1` | 見た目の濃さ（0.1〜4）。集計は変えず描画のみ再計算 |
| `radius` | `30` | クリック/ムーブのブロブ半径（px） |
| `opacity` | `0.7` | オーバーレイ全体の不透明度 |
| `showControls` | `true` | 種別切替・強度スライダー・凡例のバーを表示 |
| `showLegend` | `true` | 凡例（低→高グラデーション＋件数）を表示 |
| `lookupRoot` | `ownerDocument` | クリック要素をライブDOMから引き当てる起点（`querySelector` の対象） |
| `cell` | `20` | ムーブ集計のグリッドセル辺（px） |
| `bands` | `20` | スクロール深度の帯数 |

**集計方式:**
- **クリック**: 各クリックの rsid を snapshot から**正規化セレクタ**へ変換し、要素単位で件数を合算。描画時はそのセレクタでライブ要素を引き当て中心に配置するため、**レスポンシブで座標がずれても要素で合算**できる。要素が引けないクリック（`id=0` 等）は座標グリッドで束ねる
- **ムーブ**: マウス移動はセル（既定20px角）の位置密度で合算
- **スクロール深度**: 各セッションの window スクロール最深到達（`scrollY + ビューポート高`）から、深度帯ごとの到達率を出す

**セレクタ正規化（精度向上）:** `id`（安定なもの）→ `data-*` → 安定クラス → `nth-of-type`（最小限）の順。**動的id**（4桁以上の連番/乱数・React useId `:r0:`・UUID・長い16進ハッシュ・`ember`/`ext-gen`/`radix-`/`headlessui-` 等）と **CSS-in-JS クラス**（emotion `css-xxxx`/`e1v9qxk0`・styled-components `sc-xxxx`・JSS `jssNN`・CSS Modules のハッシュ付き・MUI makeStyles）は除外し、構造ベースへフォールバックする。

| Heatmap メソッド | 説明 |
|---|---|
| `setType(type)` | 種別を切替（再集計＋再描画） |
| `setIntensity(v)` | 強度を変更（再描画のみ） |
| `setSessions(sessions)` | セッションを差し替えて再集計 |
| `getAggregate()` | 現在の集計結果を返す |
| `on(name, fn)` / `off(name, fn)` | イベント: `type` / `intensity` |
| `destroy()` | オーバーレイ・リスナーを解放 |

集計の純関数（`aggregate` / `aggregateClicks` / `aggregateMoves` / `aggregateScroll`）とセレクタ正規化（`buildSelector` / `isDynamicId` / `isDynamicClass` / `stableClasses`）は個別に export され、DOM無しでも使える（**集計は input値・テキスト等の生値には一切触れない**。rsid・座標・構造メタのみを読む）。

### 分析（レイジ/デッドクリック・ファネル）（v0.4）

セッションの `events` 配列だけを読む **DOM非依存の純関数**。プレイヤーは `analyze: true`（既定）でレイジ/デッドクリックを自動検出し、タイムラインに `rage`（◆）/`dead`（○）マーカーを描く。個別にも呼べる。

```js
import { detectRageClicks, detectDeadClicks, funnelReach } from 'rs-replay';

// レイジクリック（近接位置の短時間連打）: 既定 3回以上・間隔1000ms以内・半径30px
const rage = detectRageClicks(session.events, { minClicks: 3, windowMs: 1000, radius: 30 });
// → [{ count, tStart, tEnd, t, x, y, id }, ...]

// デッドクリック（クリック後 windowMs 以内に mutation/route/input が無い＝無反応）
const dead = detectDeadClicks(session.events, { windowMs: 1000 });
// → [{ t, x, y, id }, ...]

// ファネル到達集計（カスタムイベント名の段階到達を複数セッションで数える）
const funnel = funnelReach(sessions, ['view', 'cart', 'pay', 'done']);
// → { total, ordered, steps: [{ name, count, rate, stepRate, dropoff }, ...] }
```

- **レイジクリック**: `recorder.addEvent` 不要。記録済みのクリックイベントから座標と時刻で機械検出する。「押しても反応しないボタンを連打した」等のいらだちのシグナル
- **デッドクリック**: クリック直後に DOM が変わらなかった（`mutation`/`route`/`input` が来ない）クリック。無反応要素・リンク切れのシグナル
- **ファネル**: 既定（`ordered: true`）では `steps` を順番どおり辿れた段階までを到達とみなし、各段階の**到達数・全体到達率・直前段階からの遷移率・離脱数**を返す。`ordered: false` で順序を無視し発火有無だけで数える。`addEvent(name)` で刻んだカスタムイベントがそのまま段階名になる

export: `detectRageClicks` / `detectDeadClicks` / `analysisMarkers`（Player用マーカー化）/ `funnelReach` / `ANALYSIS`（`{RAGE:'rage', DEAD:'dead'}`）。

### プライバシー監査 `auditSession(session)`（v0.4）

セッションJSON（snapshot ツリー＋ events）を走査し、**マスク漏れ**を検出して報告する。記録前の設定ミス（`maskSelector` の付け忘れ・サードパーティ製フィールド等）で生値がセッションへ落ちていないかを、**保存/共有の前に機械チェック**するための道具。DOM非依存の純関数で、外部送信は一切しない。

```js
import { auditSession } from 'rs-replay';

const report = auditSession(session);   // JSON文字列でも可
// {
//   ok: false,                                    // 漏れなし=true
//   findings: [ { kind, where, rsid, redacted } ],// kind: 'email'|'phone'|'card'|'unmasked-input'
//   counts: { email, phone, card, unmaskedInput },
//   scanned: { nodes, events, strings },
// }
if (!report.ok) console.warn('マスク漏れ:', report.counts);
```

- **検出対象**: メールアドレス・電話番号（国内10〜11桁 / 国際 +国番号）・クレジットカード番号（**Luhn チェック**通過の13〜19桁）らしきパターンと、**未マスク input 値**（マスク済み＝`●`と空白のみ、以外を含む値）
- **走査範囲**: snapshot のテキスト・input値・属性、events の input値・mutation（テキスト/属性/追加ノード）・custom データ・`meta.url`
- **報告に生値は載せない**: `findings` は伏字化した `redacted`（例: カードは `**** **** **** 4242`）と rsid・場所のみ。**監査結果自体が第2の漏えい経路にならない**設計
- 正しくマスクされたセッション（`●` のみ）は `ok: true`（漏れなし）を返す

export: `auditSession` と、個別に使えるパターン検出（`findEmails` / `findPhones` / `findCardNumbers` / `luhnValid` / `isMaskedValue`）。

### マスク仕様（既定）

| 対象 | 記録される値 |
|---|---|
| `input` / `textarea` の値 | 文字数・空白の形を保った伏字（`●●● ●●`） |
| `type="password"` / `type="hidden"` | **文字数すら残さない固定長 `●●●`** |
| `[data-rs-mask]` / `.rs-mask` 配下 | テキスト・値・PII属性（alt / title / placeholder 等）を伏字。値は固定長。画像 `src` は透明1pxに差し替え |
| `select` | 選択indexのみ（マスク対象内は選択状態も記録しない） |
| `checkbox` / `radio` | checked の真偽のみ |
| `script` / `noscript` / コメント / `on*` 属性 | 中身を記録しない（タグのみ構造として残る） |

### セッションJSON / チャンク

```js
// セッション
{ version: 1, meta: { startedAt, url, viewport: {w, h}, userAgent }, snapshot: { node }, events: [{ t, type, data }, ...] }
// チャンク（seq=0 のみ meta / snapshot を含む）
{ version: 1, sessionId, seq, events }
```

v0.2 の拡張は**すべて既存スキーマへの追加フィールド**（`version` は 1 のまま・後方互換）: シリアライズノードに `sh`/`shId`（Shadow DOM）・`doc`（同一オリジン iframe の中身）・`cv`（Canvas 画像）が付き、イベントに `custom`（`addEvent`）型が加わる。**v0.1 のセッションはそのまま v0.2 プレイヤーで再生できる**。

ユーティリティ: `validateSession(session)` / `sessionToJSON` / `sessionFromJSON(str)` / `mergeChunks(chunks)` / `computeInactiveSkips` / `extractMarkers` を export。

### gzip 圧縮（v0.2）

`CompressionStream('gzip')` を使う（アダプタ不要）。非対応環境では非圧縮 UTF-8 にフォールバックし、解凍側は先頭のマジックバイト（`0x1f 0x8b`）で圧縮/非圧縮を自動判別する。

```js
import { sessionToGzip, sessionFromGzip, isCompressionSupported } from 'rs-replay';

const bytes = await recorder.getCompressedSession();   // Promise<Uint8Array>（gzip）
// navigator.sendBeacon('/api/replay', bytes);          // 送信は利用側の責務
const session = await sessionFromGzip(bytes);           // 自動判別で解凍＋検証
```

export: `isCompressionSupported()` / `gzipBytes` / `gunzipBytes` / `looksGzipped` / `sessionToGzip` / `sessionFromGzip`。

## 仕組み

```
Recorder  createRSReplayRecorder(options)
  Snapshot（自前ウォーカー・rsid付与） ┐
  Mutation（MutationObserver・rAF集約）├─ Masking reader（生値はここで消える）
  Interaction（move/click/scroll/input）┘        │
                                          Chunker ──→ onChunk（送信は利用側）
                    │ セッションJSON（version付き）
Player  createRSReplayPlayer(el, session)
  Rebuilder（sandbox iframe・allow-scriptsなし）/ Timeline（二分探索シーク）
  / オーバーレイ（仮想カーソル・リップル）/ Controls（日本語UI・キーボード対応）
```

- **マスクは「構造で保証」**: シリアライザ・レコーダーは reader（`mask.js`）経由でしか値を読めず、reader はマスク済みの文字列しか返さない。マスクセレクタが不正な場合も「マスクする」側に倒れる
- **Mutationは rAF で集約**: 追加ノードは flush 時点の最新状態を（同じマスク経路で）シリアライズ。ノード移動は「既知idの再追加」として再生側が旧位置から外して処理
- **マウス軌跡の間引き**: スロットリングに加え、直近2点と新点がほぼ一直線なら直前点を上書き（`isRedundantMove`）
- **シーク**: イベント配列への二分探索。過去方向はスナップショット再構築＋差分早送り

## ロードマップ（REQUIREMENTS.md 参照）

- v0.1: スナップショット＋Mutation記録・操作イベント・マスク既定・プレイヤー（再生/シーク/速度/仮想カーソル/リップル）・チャンク・ループバックデモ
- v0.2: 無操作スキップ（タイムライン表示）・console.error/カスタムイベント/SPAルート変化のマーカー・Shadow DOM / 同一オリジンiframe の記録/再生・Canvas スナップショット（opt-in）・gzip圧縮（CompressionStream・5分で500KB未満）
- v0.3: ヒートマップ（`createRSHeatmap`・クリック/ムーブ/スクロール深度の3種・要素単位集計・複数セッション合成・オーバーレイUI（種別切替/強度レンジ/凡例）・セレクタ正規化で動的id/CSS-in-JSクラスを除外）
- **v0.4（現在）**: レイジクリック/デッドクリック検出＋タイムラインマーカー・ファネル到達集計（`funnelReach`）・プライバシー監査ツール（`auditSession`・メール/電話/カード番号/未マスクinput のマスク漏れ検出）

## 検証

- node 単体テスト 82件（マスク判定・イベント/スキーマ/チャンク/無操作スキップ/マーカー・シリアライザ（Shadow/iframe/Canvas 含む）・gzip往復・セレクタ正規化・ヒートマップ集計（クリック/ムーブ/スクロール・複数セッション合成）・**レイジ/デッドクリック検出・ファネル到達集計・プライバシー監査（メール/電話/カード番号のパターン検出と未マスクinput検出）**）: `node --test test/`
- ヘッドレスChromium 受け入れテスト: v0.1 の 13項目（REQUIREMENTS §6）＋ v0.2 の 10項目＋ v0.3 の 9項目＋ **v0.4 の分析/監査**を全パス。筆頭は「password・`[data-rs-mask]`・`.rs-mask` に入力/記載した複数の生値が `JSON.stringify(session)` のどこにも現れない」こと（**Shadow DOM / iframe / Canvas 経路でも不検出**）、および再生iframeで記録ページ由来のscriptが実行されないこと。**v0.4 では `auditSession` が意図的に混入させた未マスクのメール/電話/カード番号を検出し、正しくマスクされたセッションは「漏れなし」を返す**ことを確認
- v0.2 の実測: セッションの gzip 圧縮率およそ 40%、通常操作5分相当の合成セッション（約5,000イベント）で gzip 後 約39KB（目標 500KB 未満）

## ライセンス

MIT © ryusuke.sano
