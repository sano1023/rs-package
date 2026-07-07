> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール / 読み込み

```bash
# npm（GitHubのtarball指定）
npm install https://github.com/sano1023/ryusuke-packages-dist/raw/main/tarballs/rs-livecam-0.2.0.tgz
```

```html
<!-- CDN（jsDelivr・scriptタグ直読み） -->
<script src="https://cdn.jsdelivr.net/gh/sano1023/ryusuke-packages-dist@main/rs-livecam/dist/rs-livecam.min.js"></script>
```

```js
// ESM import（npmインストール後）
import { /* 公開API */ } from 'rs-livecam';
```

CSSが必要なパッケージは `dist/rs-livecam.css` を link してください。

---

# rs-livecam

リアルタイムカメラ加工ライブラリ。美肌フィルタ・仮想背景/背景モザイク・2Dアバター変換をかけた映像を、自分への表示にも WebRTC での配信にもそのまま使えます。コアは依存ゼロ・ビルド不要・ESモジュール。

**安全設計が本体**: 出力は常に「加工済みcanvasの captureStream」だけで、**生カメラ映像が外に出る配線が存在しません**。セグメンテーションやトラッキングが外れたフレームは人物の描画がスキップされ、**背景だけになります（人が消える）**。すっぴん・部屋の映り込みが事故で流出する経路がない。

- **camera モード**: 美肌（smooth 0〜1）・明るさ・彩度。GPU加速の合成でリアルタイム
- **mosaic / blur モード**: **画面全体**をモザイク/ぼかし（アダプタ不要のプライバシーモード。離席時・見せられない作業中に）
- **background モード**: 仮想背景（画像）/ 背景モザイク / 背景ぼかし ＋ 消えるフェイルセーフ
- **avatar モード**: 2Dパーツアバター（依存ゼロ描画）をリグ値（目パチ・口パク・頭の位置/傾き）で駆動。**プリセット `female` / `male` / `neutral`**（長髪・リボン・まつ毛 / 短髪・眉・広い肩幅）＋色カスタム。口はモーションキャプチャに忠実（閉じればきっちり閉じるMARデッドゾーン、頭は滑らか・口は素早いスムージング）。本人の映像は1ピクセルも出ない。離席したら「離席中」プレート
- ML部（人物セグメンテーション・顔ランドマーク）は**アダプタ注入**。MediaPipe 用マッパー（`selfieSegAdapter` / `faceMeshAdapter`）同梱

## デモ

```bash
php -S localhost:8099
# → http://localhost:8099/rs-livecam/demo/ を開く
```

カメラなしでも「デモ映像で開始」で全モード体験可（フェイクアダプタ同梱）。「加工を外す」チェックで人が消えるフェイルセーフを実演。**P2Pループバック**ボタンで WebRTC 経由の受信映像も確認できます。

## クイックスタート

```js
import { createRSLiveCam } from './rs-livecam/index.js';

const cam = createRSLiveCam({ mode: 'camera', smooth: 0.6, brightness: 1.05 });
await cam.start();
container.appendChild(cam.canvas);            // 自分に表示
cam.set('smooth', 0.8);                       // 通話中にリアルタイム変更

// WebRTC で相手へ（加工済みだけが送られる）
pc.addTrack(cam.stream.getVideoTracks()[0], cam.stream);
```

### 仮想背景 / 背景モザイク（MediaPipe Selfie Segmentation を注入）

```js
import { createRSLiveCam, selfieSegAdapter } from './rs-livecam/index.js';

const seg = new SelfieSegmentation({ locateFile: (f) => `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${f}` });
seg.setOptions({ modelSelection: 1 });

const cam = createRSLiveCam({
    mode: 'background',
    segmentation: selfieSegAdapter(seg),
    background: bgImage,        // HTMLImage / canvas、'mosaic'、'blur'
});
```

### アバター（MediaPipe FaceMesh を注入）

```js
import { createRSLiveCam, faceMeshAdapter } from './rs-livecam/index.js';

const mesh = new FaceMesh({ locateFile: (f) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${f}` });
const cam = createRSLiveCam({
    mode: 'avatar',
    tracking: faceMeshAdapter(mesh),
    avatar: { preset: 'female', awayText: '離席中' },   // 女性/男性プリセット・色は個別上書き可
});
```

## API

| オプション/メソッド | 説明 |
| --- | --- |
| `mode` | `'camera'` / `'mosaic'` / `'blur'` / `'background'` / `'avatar'`（`setMode()` で切替） |
| `smooth` / `brightness` / `saturate` | フィルタ（`set(key, value)` でリアルタイム変更） |
| `background` | `'mosaic'`（+`mosaicSize`）/ `'blur'` / 画像（`setBackground()`） |
| `segmentation` / `tracking` | アダプタ（`setSegmentation()` / `setTracking()`） |
| `avatar` | `{ preset: 'female'|'male'|'neutral', hair, skin, accent, awayText }`（`setAvatar()`） |
| `cam.canvas` / `cam.stream` | 表示用canvas / 配信用MediaStream |
| `start(stream?)` | カメラ起動。streamを渡すと任意入力（テスト・画面共有） |
| `stop()` / `destroy()` | 停止 / 破棄 |
| イベント | `on('start' \| 'stop' \| 'frame' \| 'error' \| 'trackinglost' \| 'mode')` |

### アダプタ契約（自作モデルを繋ぐ場合）

```js
// セグメンテーション: マスク（人物=白/不透明）を返す。null で「人が消える」
{ name, segment(frameCanvas) → canvas | ImageData | null }

// トラッキング: リグ値を返す。present:false で「離席中」
{ name, track(frameCanvas) → { present, eyeL, eyeR, mouth, headX, headY, roll } | null }
```

## P2P に載せる

`cam.stream` は普通のカメラ MediaStream と同格なので、`RTCPeerConnection.addTrack` にそのまま渡すだけです。デモの「P2Pループバック」は同一ページ内で2つの RTCPeerConnection を直結しており、本番との差はシグナリング（offer/answer の交換手段）だけ。

## 制限（v0.1）

- 美肌は「ぼかしレイヤーのアルファ合成」方式（GPUで軽い）。周波数分離のWebGLシェーダ版は v0.2
- アバターは2Dパーツ（VRM/3Dは three.js アダプタとして v0.2 候補）
- カメラは HTTPS（または localhost）必須

## 検証

Playwright（Chromium）18項目・実カメラなし（合成映像 captureStream＋フェイクアダプタ注入）。美肌の分散減少・明るさ・全体モザイク/ぼかし・モザイク/仮想背景合成・性別プリセット描画差・口の開閉追従（リグ直接注入と合成468点ランドマーク両方）・**フェイルセーフ（マスク喪失/アダプタ例外/未設定の全経路で人物非流出）**・アバター描画とまばたき反映・離席プレート・**WebRTCループバックで受信側にフレーム到達**・stop/destroy を確認済み。

## ライセンス

MIT
