> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm install @parelabo/rs-player
```

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-player-0.5.0.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSPlayer } from '@parelabo/rs-player';
import '@parelabo/rs-player/rs-player.css';   // スタイル（バンドラ経由）

createRSPlayer(document.querySelector('#app'), { /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@parelabo/rs-player@0.5.0/dist/rs-player.css">
<script src="https://cdn.jsdelivr.net/npm/@parelabo/rs-player@0.5.0/dist/rs-player.min.js"></script>
<script>
  // 公開APIはグローバル RSPlayer に載る
  RSPlayer.createRSPlayer(document.querySelector('#app'), { /* オプション */ });
</script>
```

### Vue 3

```js
import { RsPlayer } from '@parelabo/rs-player/vue';
import '@parelabo/rs-player/rs-player.css';   // スタイル（バンドラ経由）
```

```vue
<template>
  <RsPlayer />
</template>
```

### React 18 / 19

```jsx
import { RsPlayer } from '@parelabo/rs-player/react';
import '@parelabo/rs-player/rs-player.css';   // スタイル（バンドラ経由）

export default function App() {
  return <RsPlayer />;
}
```

> `vue` / `react` は peerDependency です（バンドルには含みません）。アプリ側のものが使われます。

---

# rs-player

依存ゼロのHTML5動画プレイヤーライブラリ。企業サイトの製品動画・eラーニング・社内動画ポータル・メディアサイト・ライブ配信の視聴ページ向けです（現在 v0.5）。

- **依存ゼロ**: ランタイム依存なし。ビルド不要で `src/` から直接 import できる ESモジュール
- **ライセンスキー・ドメイン制限なし**（MITライセンス）
- **主要動画サイト互換のキーボード操作を既定で提供**: Space/K・J/L=±10秒・←→=±5秒・↑↓=音量・M/F/C・数字0-9ジャンプ・&lt; &gt;=速度、コントロール自動非表示（静止3秒）、ホバー時刻ツールチップ、ドラッグシーク
- **チャプター**（v0.2）: シークバーの区切り＋ホバーで章名・設定メニューからジャンプ（配列 or WebVTT）
- **サムネイルプレビュー**（v0.2）: VTTスプライト（`#xywh=`）をホバー/ドラッグ位置で切り出して表示
- **モバイルジェスチャ**（v0.2）: 左右ダブルタップで±10秒（リップル表示）・長押しで2倍速（離すと復帰）
- **ミニプレイヤー**（v0.2）: 再生中にスクロールで画面外へ出たら右下にフローティング（戻る/閉じる）
- **エンドスクリーン**（v0.2）: 再生終了でリプレイと「次の動画」カード
- **プレイリスト**（v0.3）: 複数動画を連続再生。前へ/次へボタン・右からスライドするサイドリスト・現在位置ハイライト（終了で自動的に次へ）
- **自動サムネイル**（v0.3）: `thumbnails: 'auto'` で、同一オリジンの動画を裏の `<video preload>` で等間隔にシーク→canvas→メモリキャッシュしてプレビュー生成（CORS不可時は静かに無効化）
- **A-Bループ**（v0.3）: 区間 [A, B] を指定して自動リピート（シークバーに区間シェード＋A/Bマーカー）
- **コマ送り**（v0.3）: `,` / `.` で1フレーム相当（±1/30秒）ずつ移動（自動で一時停止）
- **ロゴウォーターマーク**（v0.3）: 四隅/中央に配置・リンク付き（別タブ）
- **HLSアダプタ同梱**（v0.4）: `hlsAdapter(Hls)` に hls.js を渡すと、設定→画質に**レベル**（1080p/720p/…）と **AUTO**（自動ビットレート）が並ぶ。hls.js 本体は**同梱しない**（依存ゼロ・利用側が注入）。レベル切替は既存の `qualitychange` イベントに共通化
- **ライブ配信UI**（v0.4）: `live: true`（または hls.js のライブ検出 / `duration===Infinity`）で **LIVE バッジ**・**ライブエッジへジャンプ**・シーク可能な **DVR 窓**を表示。シークバーの軸が DVR 窓 `[start, end]` に切替わる
- **倍速時のピッチ保持**（v0.4）: `preservesPitch`（既定 true）。速度変更・ソース差し替え後も `video.preservesPitch` を維持（設定メニューでトグル可）
- **MediaStream 再生モード**（v0.5・rs-livecam 連携）: `srcObject` に `MediaStream` を渡す（または `player.setStream(stream)`）と、尺・シークの概念が無いため**シークバーと総時間表示が自動で隠れる**。rs-livecam は**import せず**、MediaStream を受ける口（`srcObject` / `setStream`）で連携する
- **アナリティクスアダプタ**（v0.5）: `play/pause/progress/ended/leave` などの視聴イベントの**送信先を利用側が注入**（`analytics`）。**本体は送信しない**（fetch/ビーコンを持たず、整形したイベントを注入ハンドラへ渡すだけ）
- **状態機械とUIの分離**: PlayerCore が `idle / loading / playing / paused / ended / error` の状態機械を持ち、メディアイベントを正規化して発火。UI部品はイベント購読のみで描画（カスタムUIへの差し替え耐性・テスト容易）
- **字幕はVTTを自前レンダリング**: メニューで切替/オフ・サイズ/背景の調整可。ネイティブ cue に依存しない
- **画質切替**: 複数ソース（プログレッシブ）を `currentTime`・再生状態・速度を維持して差し替え。HLS はレベル/AUTO
- **ボタン＝プラグイン**: 再生ボタン等の組み込みUIもすべて `definePlayerButton()` で実装（利用者が独自ボタンを数行で追加できる）
- **HLS/DASH はアダプタ注入**: 契約 `{ name, attach(video, src) → { levels, currentLevel, setLevel?, on?, destroy } }` に従うオブジェクトを渡すだけ。本体は hls.js 等を import しない（v0.4 で hls.js 用の `hlsAdapter(Hls)` を同梱）

対応ブラウザ: 最新の Chrome / Edge / Safari / Firefox（HLS はネイティブ対応の Safari 以外では hls.js を注入）

## デモ

```bash
# このリポジトリで
php -S localhost:8099   # または任意の静的サーバー
# → http://localhost:8099/rs-player/demo/ を開く
```

上段プレイヤーで v0.1/v0.2（2画質切替・日英字幕・チャプター・VTTスプライトのサムネイル・ダブルタップ/長押し・ミニプレイヤー・エンドスクリーン・全ショートカット・カスタム「10秒送り」ボタン・destroy/再生成）、中段の「プレイリストプレイヤー」で v0.3（プレイリスト連続再生・サイドリスト・自動サムネイル・A-Bループ・コマ送り・ウォーターマーク）、「ストリーミングプレイヤー」で v0.4（HLSアダプタの画質レベル/AUTO・LIVEバッジとライブエッジジャンプ・DVR窓・倍速ピッチ保持）、最下段の「MediaStream プレイヤー」で v0.5（MediaStream 再生モードでのシーク/総時間の自動非表示・アナリティクスアダプタへの視聴イベント配信）を試せます。v0.4 デモは hls.js の代わりに**フェイクHLS**を、v0.5 デモは rs-livecam の代わりに `canvas.captureStream()` の**フェイク MediaStream** を注入し、裏で同梱の progressive 動画を再生してUIを体験できるようにしています（実運用では hls.js を CDN 等から、MediaStream を rs-livecam 等から注入）。
テスト動画は `demo/media/make-media.sh`（ffmpeg）、サムネイルスプライトは `demo/media/make-thumbnails.mjs`（依存ゼロ・Node の zlib のみ）で再生成できます（プレイリストは既存の2本の webm をそのまま2アイテムとして使います）。

## インストール

npm公開前は、`src/` ディレクトリをコピーするだけで使えます。

```html
<link rel="stylesheet" href="./rs-player/src/rs-player.css">
```

```js
import { createRSPlayer } from './rs-player/src/index.js';
// npm公開後: import { createRSPlayer } from 'rs-player';
```

## クイックスタート

```html
<div id="player" style="max-width: 720px"></div>
```

```js
import { createRSPlayer } from 'rs-player';

const player = createRSPlayer('#player', {
    sources: [                                    // 複数画質（プログレッシブ）
        { src: '/video-1080.mp4', label: '1080p', default: true },
        { src: '/video-720.mp4',  label: '720p' },
    ],
    poster: '/poster.jpg',
    tracks: [                                     // VTT字幕
        { src: '/ja.vtt', label: '日本語', srclang: 'ja', default: true },
    ],
});

player.on('timeupdate', (e) => {});   // play / pause / seeked / ratechange / qualitychange / progress25 …
player.play();
player.seek(30);
player.setQuality('720p');            // currentTime・再生状態・速度を維持して切替
player.toJSON();                      // { state, currentTime, duration, volume, muted, rate, quality, caption, chapter, ... }
player.destroy();
```

## チャプター・サムネイル・エンドスクリーン（v0.2）

```js
createRSPlayer('#player', {
    sources: [{ src: '/video.mp4', label: '1080p', default: true }],

    // チャプター（配列 or チャプターWebVTTのURL）。シークバーに区切り＋ホバーで章名＋設定メニューでジャンプ
    chapters: [
        { start: 0, title: 'イントロ' },
        { start: 95, title: '本編' },
        { start: 300, title: 'まとめ' },
    ],

    // サムネイルプレビュー（VTTスプライト。cue が image.png#xywh=x,y,w,h）。ホバー/ドラッグで表示
    thumbnails: '/sprite.vtt',

    // エンドスクリーンの「次の動画」カード（sources/src で差し替え、href で遷移）
    next: [
        { title: '次の講座', poster: '/next.jpg', sources: [{ src: '/next.mp4', label: '1080p' }] },
    ],

    // モバイル体験（既定 ON）。false で無効化できる
    gestures: true,      // 左右ダブルタップ±10秒（リップル）・長押し2倍速
    miniPlayer: true,    // スクロールで画面外に出たら右下にフローティング
});
```

チャプターWebVTTは各 cue のテキストが章タイトルになります。サムネイルスプライトは
`demo/media/make-thumbnails.mjs`（依存ゼロ・Node の zlib のみ）で軽量な PNG + VTT を生成できます。

## プレイリスト・自動サムネイル・A-Bループ・コマ送り・ウォーターマーク（v0.3）

```js
const player = createRSPlayer('#player', {
    // プレイリスト（複数動画を連続再生）。前へ/次へボタン・右のサイドリスト・現在位置ハイライトが出る
    playlist: [
        { title: '第1回 導入', poster: '/1.jpg', sources: [{ src: '/1.mp4', label: '1080p' }], thumbnails: 'auto' },
        { title: '第2回 実装', poster: '/2.jpg', sources: [{ src: '/2.mp4', label: '1080p' }], thumbnails: 'auto' },
    ],
    playlistLoop: false,          // 末尾/先頭で折り返すか
    playlistStart: 0,             // 開始インデックス
    // playlistAutoAdvance: true, // 終了で自動的に次へ（既定 true）

    // 自動サムネイル: 同一オリジンの動画を裏 <video> でシークして生成（CORS不可は静かに無効化）
    thumbnails: 'auto',

    // ロゴウォーターマーク（位置・リンク）
    watermark: { text: 'ACME', image: '/logo.svg', href: 'https://example.com/', position: 'top-right' },

    fps: 30,                      // コマ送りの基準フレームレート（既定30。1/fps 秒ずつ）
});

// プレイリスト
player.playlistNext(); player.playlistPrev(); player.playlistGoto(1);
player.togglePlaylistPanel();               // サイドリストの開閉
player.core.playlistIndex;                  // 現在位置
player.on('playlistchange', ({ index, item, hasNext, hasPrev }) => {});

// A-Bループ
player.setLoopA(); player.setLoopB();        // 引数省略で現在時刻。A→Bの区間を自動リピート
player.toggleABPoint();                       // なし→A→B→解除 を1操作で巡回
player.clearABLoop();
player.on('abloopchange', ({ a, b, active }) => {});

// コマ送り（キーボード , / . でも可）
player.frameStep(1);   // +1/fps 秒（進む・一時停止）
player.frameStep(-1);  // -1/fps 秒（戻る）
```

`position` は `top-left` / `top-right`（既定）/ `bottom-left` / `bottom-right` / `center`。`watermark` に文字列を渡すと画像URLとして扱います。
プレイリストの各アイテムは `sources`（または `src`）に加え、`poster` / `thumbnails`（`'auto'` 等）/ `tracks` / `chapters` を個別指定できます。

## HLS・ライブ配信・ピッチ保持（v0.4）

### HLSアダプタ（`hlsAdapter(Hls)`）

hls.js は**同梱しません**（依存ゼロ堅持）。利用側が hls.js を用意し、`hlsAdapter(Hls)` で注入します。
レベルが画質メニューに並び、AUTO（自動ビットレート）に対応。レベル切替は progressive の画質切替と同じ `qualitychange` イベントに共通化されます。

```html
<!-- hls.js は CDN 等から（本体には同梱しない） -->
<script src="https://cdn.jsdelivr.net/npm/hls.js@1/dist/hls.min.js"></script>
```

```js
import { createRSPlayer, hlsAdapter } from 'rs-player';

const player = createRSPlayer('#player', {
    sources: [{ src: '/stream/master.m3u8', type: 'application/x-mpegURL' }],
    adapters: [hlsAdapter(window.Hls)],   // ← hls.js を渡す（bundler なら import Hls from 'hls.js'）
});

player.setLevel('auto');   // AUTO（自動ビットレート）
player.setLevel(0);        // レベルを固定（0 = levels[0]。通常は最高画質）
player.core.levels;        // [{ index, label, height, width, bitrate }, …]
player.on('levelschange', ({ levels, auto, currentLevel }) => {});
player.on('qualitychange', ({ quality, level, auto }) => {});   // progressive と共通
```

Safari 等の**ネイティブHLS**対応環境では `Hls.isSupported()` が false になり、`hlsAdapter` は自動で `<video src>` のネイティブ再生にフォールバックします（この場合レベル制御は不可）。
アダプタ契約は `{ name, canPlay?(src, source), attach(video, src) → { levels, currentLevel, setLevel?(i), on?(type, cb), destroy() } }`。`on` は `levels` / `levelswitch` / `live` を橋渡しします（自作アダプタでも同契約で `setLevel` に対応できます）。

### ライブ配信UI

`live: true`（または hls.js のライブ検出 / `duration===Infinity`）で LIVE バッジ・ライブエッジへのジャンプ・シーク可能な DVR 窓を表示します。ライブ時はシークバーの軸が `video.seekable` の DVR 窓 `[start, end]` に切替わります。

```js
const player = createRSPlayer('#live', {
    sources: [{ src: '/live.m3u8', type: 'application/x-mpegURL' }],
    adapters: [hlsAdapter(window.Hls)],
    live: true,                 // 明示指定（省略時は duration/アダプタから自動判定）
    // liveEdgeThreshold: 3,    // この秒数以内なら「ライブエッジ」とみなす（既定 3）
    // liveEdgeOffset: 0.5,     // ライブエッジへ戻る際、末尾からのオフセット秒（既定 0.5）
});

player.isLive;               // ライブか
player.seekToLiveEdge();     // 最新（ライブエッジ）へジャンプ
player.core.liveWindow();    // { start, end, duration }（DVR 窓）
player.core.liveEdge();      // ライブエッジの秒位置
player.core.isAtLiveEdge();  // エッジ付近か
player.on('livechange', ({ live }) => {});
```

左下の LIVE バッジは、エッジ再生中は点灯（赤）、DVR を遡ると消灯し、クリックで最新へ戻します。

### 倍速時のピッチ保持（`preservesPitch`）

既定で `preservesPitch: true`（声のピッチを保つ）。速度変更・ソース差し替え後も `video.preservesPitch` を維持します。設定メニューの「ピッチ保持」からもトグルできます。

```js
const player = createRSPlayer('#el', { preservesPitch: true });
player.setPreservesPitch(false);   // 倍速で "早口"（ピッチ変化を許す）
player.on('pitchchange', ({ preservesPitch }) => {});
```

## MediaStream 再生・アナリティクス（v0.5）

### MediaStream 再生モード（rs-livecam 連携）

`srcObject` に `MediaStream` を渡す（または `player.setStream(stream)`）と **MediaStream 再生モード**に入ります。ライブカメラ等には尺・シークの概念が無いため、**シークバーと総時間表示が自動で隠れます**（コンテナに `rsp-stream` クラスが付き、CSS で非表示化）。rs-livecam は **import しません** — MediaStream を受ける口（`srcObject` / `setStream`）で連携します。

```js
import { createRSPlayer } from 'rs-player';
// 例: rs-livecam / getUserMedia が生成した MediaStream を注入
const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

const player = createRSPlayer('#el', {
    srcObject: stream,     // ← MediaStream 再生モード（シーク/総時間を自動で隠す）
    muted: true, autoplay: true,
});

player.setStream(otherStream); // 別ストリームへ差し替え
player.clearStream();           // MediaStream 再生モードを解除（sources があれば通常再生へ戻る）
player.isStream;                // MediaStream 再生中か
player.on('streamchange', ({ stream, active }) => {});
```

`isMediaStream(x)` / `streamTrackInfo(stream)` / `streamUIVisibility({ stream })` のユーティリティも公開しています。

### アナリティクスアダプタ（`analytics`）

視聴イベント（`play` / `pause` / `seek` / `ratechange` / `quality` / `progress`〈25/50/75/100%〉/ `ended` / `leave`〈離脱〉/ `ready`）の**送信先を利用側が注入**します。**本体は一切送信しません**（`fetch` / `sendBeacon` / XHR を持たない）— 整形したイベントを注入ハンドラへ渡すだけで、送信先（GA4 / 自社ビーコン / ログ基盤…）の実装は利用側の責務です。

```js
const player = createRSPlayer('#el', {
    sources: [{ src: '/v.webm' }],
    analytics: (event) => {
        // event = { type, position?, duration?, percent?, at?, ...meta }
        gtag('event', event.type, event);       // 例: GA4 へ
    },
    // 関数のほか { track(event) } / { send(event) } / それらの配列も可
});
player.on('analytics', ({ event }) => {});       // 送出イベントは購読でも観測できる
```

`leave`（離脱）は `player.destroy()` 時・ページ離脱（`pagehide`）時に、一度でも再生していれば1回だけ渡ります。整形は純粋関数 `formatAnalyticsEvent(type, ctx, detail)` が担い、`toAnalyticsHandler(analytics)` で注入形（関数 / `{track}` / `{send}` / 配列）を単一 dispatch に正規化します。

## API

### `createRSPlayer(target, options): Player`

| オプション | 型 / 既定値 | 説明 |
|---|---|---|
| `sources` | `Source[]` \| string | `{ src, label, type?, default? }` の配列。複数渡すと設定メニューに画質切替が出る |
| `poster` | string | ポスター画像URL |
| `tracks` | `Track[]` | 字幕 `{ src, label, srclang?, default? }`（WebVTT）。自前レンダリング |
| `chapters` | `Chapter[]` \| string | v0.2。`{ start, title, end? }` の配列 or チャプターWebVTTのURL。シークバー区切り＋メニュー |
| `thumbnails` | string \| `Thumb[]` \| `'auto'` | v0.2。VTTスプライトのURL（cue が `image.png#xywh=x,y,w,h`）。**v0.3: `'auto'` で同一オリジン動画から自動生成** |
| `next` | `NextItem` \| `NextItem[]` | v0.2。エンドスクリーンの「次の動画」`{ title, poster?, sources?/src?, href? }` |
| `playlist` | `Item[]` | v0.3。連続再生する動画配列 `{ title, sources?/src?, poster?, thumbnails?, tracks?, chapters? }`。前へ/次へ・サイドリストが出る |
| `playlistLoop` | `false` | v0.3。末尾/先頭で折り返す |
| `playlistStart` | `0` | v0.3。開始インデックス |
| `playlistAutoAdvance` | `true` | v0.3。`false` で終了時の自動次送りを無効 |
| `watermark` | — | v0.3。ロゴ `{ image?, text?, href?, target?, position?, opacity?, label? }`（文字列は画像URL扱い） |
| `fps` | `30` | v0.3。コマ送りの基準フレームレート（1/fps 秒ずつ） |
| `live` | 自動判定 | v0.4。`true`/`false` で明示。省略時はアダプタのライブ報告 / `duration===Infinity` で判定 |
| `liveEdgeThreshold` | `3` | v0.4。エッジ付近とみなす秒数（LIVEバッジの点灯判定） |
| `liveEdgeOffset` | `0.5` | v0.4。ライブエッジへ戻る際の末尾からのオフセット秒 |
| `preservesPitch` | `true` | v0.4。倍速時のピッチ保持。`false` でピッチ変化を許す |
| `srcObject` | — | v0.5。`MediaStream`（rs-livecam 等）。渡すと MediaStream 再生モード（シーク/総時間を自動で隠す） |
| `analytics` | — | v0.5。視聴イベントの送信先。関数 / `{track}` / `{send}` / それらの配列。**本体は送信しない** |
| `gestures` | `true` | v0.2。`false` でダブルタップ±10秒/長押し2倍速を無効 |
| `miniPlayer` | `true` | v0.2。`false` でスクロール時のミニプレイヤーを無効 |
| `doubleTapMs` / `longPressMs` | `320` / `450` | v0.2。ダブルタップ判定窓・長押し判定時間（ミリ秒） |
| `autoplay` / `muted` / `loop` | `false` | `<video>` の同名属性に対応 |
| `preload` | `'metadata'` | `'auto'` \| `'none'` |
| `speeds` | `[0.25 … 2]` | 速度メニューの選択肢 |
| `hotkeys` | `true` | `false` でキーボードショートカット無効 |
| `wheelVolume` | `false` | `true` でホイール音量（opt-in） |
| `volumeSlider` | `'horizontal'` | `'vertical'` でポップアップ縦スライダ |
| `hideDelay` | `3000` | コントロール自動非表示までのミリ秒 |
| `captionStyle` | `{ scale: 1, bg: true }` | 字幕の初期スタイル（メニューからも変更可） |
| `theme` | — | `{ accent: '#e11d48' }` 等。`--rsp-accent` 等のCSS変数に反映 |
| `i18n` | 日本語 | 文言の部分差し替え（`src/i18n.js` のキー参照） |
| `buttons` | 既定並び | コントロールバーの並び。既定 `['play','live','volume','time','spacer','captions','settings','pip','fullscreen']`（`live` はライブ時のみ表示） |
| `customButtons` | `[]` | `definePlayerButton()` で作ったボタン定義 |
| `adapters` | `[]` | HLS/DASH等のソースアダプタ（下記） |
| `persist` | `true` | 音量・ミュート・速度の記憶（localStorage キー `rs-player`）。`false` で無効 |

### Player メソッド / プロパティ

`play()` / `pause()` / `togglePlay()` / `seek(sec)` / `setVolume(0-1)` / `setMuted(bool)` / `toggleMute()` /
`setRate(rate)` / `setQuality(label)` / `setCaption(index | label | -1)` / `setCaptionStyle({scale, bg})` /
`toggleFullscreen()` / `togglePiP()` / `toggleMenu()` / `on(type, cb)` / `off(type, cb)` / `toJSON()` / `destroy()`。
v0.3: `playlistNext()` / `playlistPrev()` / `playlistGoto(i)` / `togglePlaylistPanel()` /
`setLoopA(sec?)` / `setLoopB(sec?)` / `toggleABPoint(sec?)` / `clearABLoop()` / `frameStep(dir)`。
v0.4: `setLevel(index | 'auto' | -1)` / `seekToLiveEdge()` / `setPreservesPitch(bool)` / `isLive`（プロパティ）。
v0.5: `setStream(stream | null)` / `clearStream()` / `isStream`（プロパティ）。
`player.video`（生の `<video>`）、`player.core`（PlayerCore: `seekBy` / `seekPercent` / `speedStep` / `toggleCaptions` /
`getChapters()` / `chapterAt(sec)` / `seekToChapter(i)` / `thumbAt(sec)` / `getPlaylist()` / `playlistIndex` / `getABLoop()` / `setThumbnails(list)` /
`hasLevels()` / `levels` / `levelLabelAt(i)` / `getActiveLevelLabel()` / `liveWindow()` / `liveEdge()` / `isAtLiveEdge()` / `getStream()` / `reportLeave()` など）にもアクセスできます。

### イベント

`statechange`（{from, to}）/ `play` / `pause` / `timeupdate` / `seeking` / `seeked` / `ratechange` /
`volumechange` / `qualitychange` / `captionchange` / `cuechange` / `durationchange` / `progress`（バッファ）/
`ended` / `error` / `playblocked`（自動再生ブロック）/ 視聴進捗 `progress25` `progress50` `progress75` `progress100`（1再生1回。リプレイでリセット）

v0.2 で追加: `chapterschange`（{chapters}）/ `chapterchange`（{index, chapter}：現在章の変化）/ `thumbnailschange` /
`gesture`（{action:'seek'\|'speed'\|'speedEnd', ...}：ダブルタップ/長押し）/ `minichange`（{mini}）/ `next`（{item}：次の動画選択）/ `replay`

v0.3 で追加: `playlistchange`（{index, item, hasNext, hasPrev}）/ `playlistpanel`（{open}）/ `abloopchange`（{a, b, active}）/ `framestep`（{dir, currentTime}）

v0.4 で追加: `levelschange`（{levels, auto, currentLevel}：HLSレベルの確定/切替）/ `livechange`（{live}）/ `seektolive`（{edge, currentTime}）/ `pitchchange`（{preservesPitch}）。HLSレベルの切替は `qualitychange`（{quality, level, auto}）にも共通化して発火します

v0.5 で追加: `streamchange`（{stream, active}：MediaStream 再生モードの開始/解除）/ `analytics`（{event}：注入ハンドラへ渡す視聴イベントを購読でも観測できる。`analytics` オプション指定時のみ発火）

### キーボードショートカット

| キー | 動作 |
|---|---|
| `Space` / `K` | 再生・一時停止 |
| `J` / `L` | 10秒戻る / 進む |
| `←` / `→` | 5秒戻る / 進む |
| `↑` / `↓` | 音量 ±5% |
| `M` | ミュート切替 |
| `F` | 全画面切替 |
| `C` | 字幕切替 |
| `0`〜`9` | 0%〜90% の位置へジャンプ |
| `<` / `>` | 再生速度を下げる / 上げる |
| `,` / `.` | コマ送り（1フレーム戻る / 進む・±1/30秒。v0.3） |

入力欄フォーカス中は無効。表は `HOTKEYS`（`src/hotkeys.js`）としてエクスポートされています。

### カスタムボタン — `definePlayerButton(def)`

```js
import { createRSPlayer, definePlayerButton } from 'rs-player';

const shareBtn = definePlayerButton({
    name: 'share',
    position: 'right',                 // buttons 省略時の挿入位置（left / right）
    label: '共有',                      // aria-label ＋ ホバーツールチップ
    icon: '<path d="M18 16.08c-.76 …"/>',   // 24x24 SVGパス
    onClick(player) { navigator.share({ url: location.href }); },
    // update(player, el) {}           // 状態反映（events のイベントで呼ばれる）
    // events: ['statechange']
    // render(player) => HTMLElement   // 完全カスタム描画も可
});

createRSPlayer('#el', { customButtons: [shareBtn] });
// 並びを固定したい場合: buttons: ['play', 'volume', 'time', 'spacer', 'share', 'fullscreen']
```

組み込みの再生・音量・時刻・字幕・設定・PiP・全画面ボタンもすべてこのAPIで実装されています。

### ソースアダプタ（HLS/DASH）

hls.js を使うだけなら**同梱の `hlsAdapter(Hls)`**（上記「HLS・ライブ配信…」節）を使います。DASH 等の独自アダプタは同じ契約で自作できます:

```js
const adapter = {
    name: 'hls',
    canPlay: (src) => src.endsWith('.m3u8'),     // 省略時は .m3u8/.mpd や source.adapter 指定で選ばれる
    attach(video, src) {
        const hls = new Hls();                    // hls.js は利用側が用意（本体は import しない）
        hls.loadSource(src); hls.attachMedia(video);
        return {
            levels: hls.levels,                   // 画質メニューに並ぶ（{ index, label, height, bitrate }）
            currentLevel: hls.currentLevel,       // -1 = AUTO
            setLevel: (i) => { hls.currentLevel = i; },   // v0.4: レベル選択
            on: (type, cb) => { /* 'levels' / 'levelswitch' / 'live' を橋渡し */ },
            destroy: () => hls.destroy(),
        };
    },
};
createRSPlayer('#el', { sources: [{ src: '/live.m3u8', label: 'HLS' }], adapters: [adapter] });
```

### テーマ

CSSカスタムプロパティで差し替え:

```css
.rsp {
    --rsp-accent: #2563eb;        /* シークバー・アクティブ色 */
    --rsp-text: #fff;
    --rsp-menu-bg: rgba(28,28,28,.94);
    --rsp-caption-bg: rgba(8,8,8,.75);
    --rsp-font-size: 13px;
}
```

`theme: { accent: '#2563eb' }` オプションでも同じ変数に反映されます。

## 仕組み

```
公開API createRSPlayer → Player（コンテナDOM・自動非表示・全画面/PiP・字幕描画）
    → PlayerCore（状態機械・メディアイベント正規化・ソース管理・字幕cue計算・永続化）
    → ControlBar（全ボタンが definePlayerButton 製）/ SeekBar / Menu（サブメニュー式）
    → <video> ─ ネイティブ(MP4/WebM) / Adapter(HLS/DASH。hlsAdapter(Hls) 同梱・本体は非import) / MediaStream(srcObject。rs-livecam 非import)
```

- **状態機械は純粋データ**（`src/state.js` の遷移表）。時刻フォーマット・ショートカット表・VTTパーサもDOM非依存の関数で、node:test で単体テストされている
- **アクセシビリティ**: 全ボタンに日本語 aria-label、シークバー/音量は `role="slider"` ＋ aria-valuenow/valuetext、全操作キーボード可、`prefers-reduced-motion` 対応、タッチターゲット44px（モバイル）

## ロードマップ（REQUIREMENTS.md 参照）

- v0.1: コア + 標準コントロール・字幕・画質切替・永続化・進捗イベント
- v0.2: チャプター・サムネイルプレビュー（VTTスプライト `#xywh=`）・ダブルタップ±10秒/長押し2倍速・ミニプレイヤー・エンドスクリーン
- v0.3: プレイリスト・サムネイル自動生成（`thumbnails: 'auto'`）・A-Bループ・コマ送り・ウォーターマーク
- v0.4: HLSアダプタ同梱（`hlsAdapter(Hls)`・画質レベル/AUTO）・ライブ配信UI（LIVEバッジ/ライブエッジ/DVR窓）・倍速ピッチ保持（`preservesPitch`）
- **v0.5（現在）**: rs-livecam 連携（`srcObject` の MediaStream 再生モード＝シーク/総時間を自動非表示）・アナリティクスアダプタ（視聴イベントの送信先を注入・本体は非送信）。360度/VR は永久スコープ外
- 以降: プラグインエコシステム等（REQUIREMENTS.md 参照）

## 検証

- node 単体テスト 136件（状態機械・時刻フォーマット・ショートカット表・VTTパーサ・チャプター/サムネイルスプライトのパース・PlayerCore のフェイクvideo検証に加え、v0.3: プレイリスト状態遷移・A-Bループ判定・コマ送り時刻計算・自動サムネイルの区間計算/同一オリジン判定・ウォーターマーク位置解決、v0.4: HLSレベル正規化/ラベル・フェイクHls注入によるアダプタ契約・DVR窓/ライブエッジ判定・ライブ判定・ピッチ保持適用・PlayerCore のレベル/ライブ/ピッチ統合、v0.5: MediaStream 判定/トラック要約/UI可視性・アナリティクスの注入正規化/種別マッピング/イベント整形・PlayerCore の MediaStream 再生モードとアナリティクス橋渡し〈play/pause/progress/ended/leave の順序・本体非送信〉）
- ヘッドレスChromium による受け入れテスト: v0.1 が 13項目（REQUIREMENTS §6）、v0.2 が 10項目（チャプター/サムネイル/ジェスチャ/ミニ/エンドスクリーン）、v0.3 が 7項目（プレイリスト前後/サイドリストのハイライト・自動サムネイル生成とホバー表示・A-Bループ・コマ送り・ウォーターマーク・連続再生）、v0.4 が 9項目（フェイクHls注入による画質レベルメニュー/AUTO・setLevel→qualitychange・LIVEバッジ・DVR窓を遡ってのライブエッジジャンプ・シークバーのDVR軸・preservesPitch トグル〈API/メニュー〉）、v0.5 が 7項目（フェイク MediaStream 注入での再生モード＝シーク/総時間の自動非表示・clearStream での復活・アナリティクスへの play/pause/progress〈25→100〉/ended/leave の順序配信・本体が sendBeacon/XHR を呼ばないこと）＋ 各コンソールエラー0件を全パス

## ライセンス

MIT © ryusuke.sano
