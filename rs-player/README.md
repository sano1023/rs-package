> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール / 読み込み

```bash
# npm（GitHubのtarball指定）
npm install https://github.com/sano1023/ryusuke-packages-dist/raw/main/tarballs/rs-player-0.1.0.tgz
```

```html
<!-- CDN（jsDelivr・scriptタグ直読み） -->
<script src="https://cdn.jsdelivr.net/gh/sano1023/ryusuke-packages-dist@main/rs-player/dist/rs-player.min.js"></script>
```

```js
// ESM import（npmインストール後）
import { /* 公開API */ } from 'rs-player';
```

CSSが必要なパッケージは `dist/rs-player.css` を link してください。

---

# rs-player

有料動画プレイヤー（JW Player / THEOplayer 等）の機能網羅を目指す、依存ゼロのHTML5動画プレイヤーライブラリ。企業サイトの製品動画・eラーニング・社内動画ポータル・メディアサイト向けです（現在 v0.1）。

- **依存ゼロ**: ランタイム依存なし。ビルド不要で `src/` から直接 import できる ESモジュール（JS+CSS 合計 約23KB gzip）
- **ライセンスキー・ドメイン制限・再生数課金なし**（MITライセンス）
- **YouTube級の操作体験を既定で提供**: Space/K・J/L=±10秒・←→=±5秒・↑↓=音量・M/F/C・数字0-9ジャンプ・&lt; &gt;=速度、コントロール自動非表示（静止3秒）、ホバー時刻ツールチップ、ドラッグシーク
- **状態機械とUIの分離**: PlayerCore が `idle / loading / playing / paused / ended / error` の状態機械を持ち、メディアイベントを正規化して発火。UI部品はイベント購読のみで描画（カスタムUIへの差し替え耐性・テスト容易）
- **字幕はVTTを自前レンダリング**: メニューで切替/オフ・サイズ/背景の調整可。ネイティブ cue に依存しない
- **画質切替**: 複数ソース（プログレッシブ）を `currentTime`・再生状態・速度を維持して差し替え
- **ボタン＝プラグイン**: 再生ボタン等の組み込みUIもすべて `definePlayerButton()` で実装（利用者が独自ボタンを数行で追加できる）
- **HLS/DASH はアダプタ注入**: 契約 `{ name, attach(video, src) → { levels, currentLevel, destroy } }` に従うオブジェクトを渡すだけ。本体は hls.js 等を import しない

対応ブラウザ: 最新の Chrome / Edge / Safari / Firefox

## デモ

```bash
# このリポジトリで
php -S localhost:8099   # または任意の静的サーバー
# → http://localhost:8099/rs-player/demo/ を開く
```

2画質切替（カラー/セピアのテスト動画）・日英字幕・全ショートカット・イベントログ・カスタム「10秒送り」ボタン・destroy/再生成を試せます。
テスト動画は `demo/media/make-media.sh`（ffmpeg）で再生成できます。

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
player.toJSON();                      // { state, currentTime, duration, volume, muted, rate, quality, caption, ... }
player.destroy();
```

## API

### `createRSPlayer(target, options): Player`

| オプション | 型 / 既定値 | 説明 |
|---|---|---|
| `sources` | `Source[]` \| string | `{ src, label, type?, default? }` の配列。複数渡すと設定メニューに画質切替が出る |
| `poster` | string | ポスター画像URL |
| `tracks` | `Track[]` | 字幕 `{ src, label, srclang?, default? }`（WebVTT）。自前レンダリング |
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
| `buttons` | 既定並び | コントロールバーの並び。既定 `['play','volume','time','spacer','captions','settings','pip','fullscreen']` |
| `customButtons` | `[]` | `definePlayerButton()` で作ったボタン定義 |
| `adapters` | `[]` | HLS/DASH等のソースアダプタ（下記） |
| `persist` | `true` | 音量・ミュート・速度の記憶（localStorage キー `rs-player`）。`false` で無効 |

### Player メソッド / プロパティ

`play()` / `pause()` / `togglePlay()` / `seek(sec)` / `setVolume(0-1)` / `setMuted(bool)` / `toggleMute()` /
`setRate(rate)` / `setQuality(label)` / `setCaption(index | label | -1)` / `setCaptionStyle({scale, bg})` /
`toggleFullscreen()` / `togglePiP()` / `toggleMenu()` / `on(type, cb)` / `off(type, cb)` / `toJSON()` / `destroy()`。
`player.video`（生の `<video>`）、`player.core`（PlayerCore: `seekBy` / `seekPercent` / `speedStep` / `toggleCaptions` など）にもアクセスできます。

### イベント

`statechange`（{from, to}）/ `play` / `pause` / `timeupdate` / `seeking` / `seeked` / `ratechange` /
`volumechange` / `qualitychange` / `captionchange` / `cuechange` / `durationchange` / `progress`（バッファ）/
`ended` / `error` / `playblocked`（自動再生ブロック）/ 視聴進捗 `progress25` `progress50` `progress75` `progress100`（1再生1回。リプレイでリセット）

### キーボードショートカット（YouTube互換）

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

### ソースアダプタ（HLS/DASH。v0.4 でラッパー同梱予定）

```js
const adapter = {
    name: 'hls',
    canPlay: (src) => src.endsWith('.m3u8'),     // 省略時は .m3u8/.mpd や source.adapter 指定で選ばれる
    attach(video, src) {
        const hls = new Hls();                    // hls.js は利用側が用意（本体は import しない）
        hls.loadSource(src); hls.attachMedia(video);
        return { levels: hls.levels, currentLevel: hls.currentLevel, destroy: () => hls.destroy() };
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
    → <video> ─ ネイティブ(MP4/WebM) / Adapter(HLS/DASH)
```

- **状態機械は純粋データ**（`src/state.js` の遷移表）。時刻フォーマット・ショートカット表・VTTパーサもDOM非依存の関数で、node:test で単体テストされている
- **アクセシビリティ**: 全ボタンに日本語 aria-label、シークバー/音量は `role="slider"` ＋ aria-valuenow/valuetext、全操作キーボード可、`prefers-reduced-motion` 対応、タッチターゲット44px（モバイル）

## ロードマップ（REQUIREMENTS.md 参照）

- **v0.1（現在）**: コア + YouTube級コントロール・字幕・画質切替・永続化・進捗イベント
- v0.2: チャプター・サムネイルプレビュー（VTTスプライト）・ダブルタップ±10秒・ミニプレイヤー・エンドスクリーン
- v0.3: プレイリスト・サムネイル自動生成（`thumbnails: 'auto'`）・A-Bループ・コマ送り・ウォーターマーク
- v0.4: HLSアダプタ同梱・ライブ配信UI・ピッチ保持
- v0.5: rs-livecam 連携（MediaStream）・アナリティクスアダプタ

## 検証

- node 単体テスト 45件（状態機械・時刻フォーマット・ショートカット表・VTTパーサ・PlayerCore のフェイクvideo検証）
- ヘッドレスChromium による受け入れテスト 13項目 + コンソールエラー0件（REQUIREMENTS §6。再生/一時停止の状態一致・全ショートカット・速度/画質/字幕メニュー・ドラッグシーク・localStorage復元・自動非表示・Fullscreen API・aria・視聴進捗イベント順序）を全パス

## ライセンス

MIT © ryusuke.sano
