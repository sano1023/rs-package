> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール / 読み込み

```bash
# npm（GitHubのtarball指定）
npm install https://github.com/sano1023/ryusuke-packages-dist/raw/main/tarballs/rs-replay-0.1.0.tgz
```

```html
<!-- CDN（jsDelivr・scriptタグ直読み） -->
<script src="https://cdn.jsdelivr.net/gh/sano1023/ryusuke-packages-dist@main/rs-replay/dist/rs-replay.min.js"></script>
```

```js
// ESM import（npmインストール後）
import { /* 公開API */ } from 'rs-replay';
```

CSSが必要なパッケージは `dist/rs-replay.css` を link してください。

---

# rs-replay

有料セッションリプレイSaaS（FullStory / Hotjar / LogRocket / Microsoft Clarity 等）の機能網羅を目指す、完全セルフホスト・依存ゼロのセッション記録/再生ライブラリ（現在 v0.1）。

- **完全セルフホスト = データ主権**: 記録データをどこへ送るかは利用側の `onChunk` コールバックが決める。**ライブラリ自身はいかなる外部送信も行わない**（fetch / XHR / sendBeacon のコードがそもそも存在しない）
- **プライバシー・バイ・デフォルト**: input値・password・`[data-rs-mask]` / `.rs-mask` 要素は**DOM読み取りの時点で伏字化され、生値がシリアライズ層に到達しない**（マスク済みの値しか受け取れない reader 構造で保証）
- **プレイヤー同梱のオールインワン**: タイムライン・シーク・速度（0.5〜8x）・仮想カーソル・クリックリップルまで同梱。rrweb のような「記録コアだけ」ではない
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

左半分のフォーム・ボタン・スクロール領域を操作し、「ここまでを再生」を押すと右半分のプレイヤーで再現される**ループバックデモ**。password やマスク要素の生値が再生側に一切現れないことをその場で確認できます。

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
| `compress` | `'auto'` | v0.1では未使用（gzip圧縮は v0.2 で対応予定） |

### Recorder メソッド

| メソッド | 説明 |
|---|---|
| `start()` | スナップショットを取り記録開始 |
| `stop()` | 保留分を確定し最終チャンクをflushして停止 |
| `getSession()` | セッションJSON（進行中でも可。`keepSession: true` 時のみ） |
| `on(name, fn)` / `off(name, fn)` | イベント: `start` / `stop` / `chunk` / `error` |
| `destroy()` | stop + 全リスナー・MutationObserver・タイマーを解放 |

### `createRSReplayPlayer(target, session, options): Player`

`session` はセッションJSONオブジェクトでも**JSON文字列**でもよい。`version` 不一致は黙って壊れず明示エラーを投げる。

| オプション | 既定値 | 説明 |
|---|---|---|
| `speed` | `1` | 再生速度（0.5〜8） |
| `autoplay` | `false` | 生成後すぐ再生 |

### Player メソッド

| メソッド | 説明 |
|---|---|
| `play()` / `pause()` | 再生 / 一時停止（末尾からの `play()` は先頭に戻る） |
| `seek(ms)` | 任意時点へ。過去へは「スナップショット再構築 → 差分早送り」（二分探索） |
| `setSpeed(x)` | 0.5〜8x |
| `on(name, fn)` / `off(name, fn)` | イベント: `play` / `pause` / `seek` / `speed` / `finish` |
| `destroy()` | UI・リスナーを解放 |

コントロールはすべて日本語UI・`aria-label` 付き。キーボード: **Space = 再生/停止・← → = 5秒シーク**。テーマはCSSカスタムプロパティ（`--rsr-bg` / `--rsr-accent` 等）で上書き可能。

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

ユーティリティ: `validateSession(session)` / `sessionToJSON` / `sessionFromJSON(str)` / `mergeChunks(chunks)` を export。

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

- **v0.1（現在）**: スナップショット＋Mutation記録・操作イベント・マスク既定・プレイヤー（再生/シーク/速度/仮想カーソル/リップル）・チャンク・ループバックデモ
- v0.2: 無操作スキップ・gzip圧縮（CompressionStream）・Shadow DOM / 同一オリジンiframe・Canvasスナップショット
- v0.3: ヒートマップ（`createRSHeatmap`・クリック/ムーブ/スクロール深度）
- v0.4: レイジクリック/デッドクリック検出・プライバシー監査ツール（`auditSession`）

## 検証

- node 単体テスト 31件（マスク判定・イベント/スキーマ/チャンク・シリアライザ）: `node --test test/`
- ヘッドレスChromium 受け入れテスト 13項目（REQUIREMENTS §6）を全パス。筆頭は「password・`[data-rs-mask]`・`.rs-mask` に入力/記載した複数の生値が `JSON.stringify(session)` のどこにも現れない」こと、および再生iframeで記録ページ由来のscriptが実行されないこと

## ライセンス

MIT © ryusuke.sano
