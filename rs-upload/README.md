> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm install @parelabo/rs-upload
```

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-upload-0.4.0.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSUpload } from '@parelabo/rs-upload';
import '@parelabo/rs-upload/rs-upload.css';   // スタイル（バンドラ経由）

createRSUpload(document.querySelector('#app'), { /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@parelabo/rs-upload@0.4.0/dist/rs-upload.css">
<script src="https://cdn.jsdelivr.net/npm/@parelabo/rs-upload@0.4.0/dist/rs-upload.min.js"></script>
<script>
  // 公開APIはグローバル RSUpload に載る
  RSUpload.createRSUpload(document.querySelector('#app'), { /* オプション */ });
</script>
```

### Vue 3

```js
import { RsUpload } from '@parelabo/rs-upload/vue';
import '@parelabo/rs-upload/rs-upload.css';   // スタイル（バンドラ経由）
```

```vue
<template>
  <RsUpload />
</template>
```

### React 18 / 19

```jsx
import { RsUpload } from '@parelabo/rs-upload/react';
import '@parelabo/rs-upload/rs-upload.css';   // スタイル（バンドラ経由）

export default function App() {
  return <RsUpload />;
}
```

> `vue` / `react` は peerDependency です（バンドルには含みません）。アプリ側のものが使われます。

---

# rs-upload

依存ゼロのファイルアップロードUI＋転送エンジン。ベンダーサーバなしで、どの自前バックエンドにもそのまま刺さります（現在 v0.4）。

- **依存ゼロ・ビルド不要**: ランタイム依存なし。`src/` から直接 import できる ESモジュール＋CSS 1枚
- **ベンダーサーバ不要**: 転送は利用者のエンドポイント直行。認証ヘッダ・URL はすべて利用者のもの
- **コアとUIを分離**: UploadQueue（状態機械・並列数制御・指数バックオフリトライ）は DOM なしで単体利用可。Widget はその上の1利用者
- **転送アダプタ契約**: 組み込みの `simpleTransport` / `chunkedTransport` / **`tusTransport`（v0.3）** / **S3 presigned（v0.3）** も自作アダプタも同格
- **画像以外のプレビュー（v0.4）**: 動画は `video`＋`canvas` で1フレームをサムネ化、PDF は **rs-pdf のレンダラアダプタ注入**（`pdfRenderer`）で1ページ目を描画。PDF は opt-in（未注入なら汎用アイコンにフォールバック・rs-pdf のソースは変更せず import のみ）
- **帯域スロットリング（v0.4）**: `chunkedTransport({ maxBytesPerSec })` でトークンバケット的に送信レートを上限へ抑制（トランスポート単位で共有＝並列送信の合計レートも守る）
- **残り時間推定（v0.4）**: 転送速度の移動平均から `progress` イベントに `speed` / `eta`（残り秒数）を配り、全体進捗バーに「残り 約◯分◯秒」を表示
- **クライアント側前処理（v0.3）**: `rsImageAdapter()` が **rs-image の変換エンジン**（段階縮小・圧縮・WebP変換・EXIF正立・targetBytes）を前処理として接続。送信前に縮小＆WebP化して転送量とサーバ負荷を削る。opt-in（渡した時だけ rs-image を読み込む・コアの依存はゼロのまま）
- **送信前の簡易編集（v0.3）**: `edit` で各画像に編集ボタン。**rs-image のUIをモーダルで開いて回転・トリミング**し、結果をファイル実体に反映してから送る
- **tus 対応（v0.3）**: `tusTransport` は tus resumable upload protocol 1.0 準拠（creation → HEAD で Upload-Offset 確認 → PATCH）。tusd 等の既存サーバがそのまま使え、中断再開も対応
- **S3 直アップロード（v0.3）**: `s3PutTransport`（単発 presigned PUT）／`s3MultipartTransport`（CreateMultipartUpload → パート毎 presigned PUT → ETag 収集 → Complete）。**署名は利用者の自前バックエンド**、ブラウザは PUT のみ
- **URL取り込み契約（v0.3）**: `defineUrlImporter({ name, fetch(url) => Promise<File> })` で契約を定義（取得実装はアプリ側の責務・スコープ外）
- **チャンク転送＋中断再開（v0.2）**: `chunkedTransport` は自前分割プロトコル（Content-Range・5MB既定）。fingerprint を localStorage に記録し、**タブ再読込後もサーバ offset から続き**を送れる
- **フォルダD&D（v0.2）**: `webkitGetAsEntry` で再帰走査し、ファイルに相対パス（`relativePath`）を付与
- **カメラ撮影（v0.2）**: `getUserMedia` でプレビュー→撮影→File化。非対応スマホは `capture` 属性入力にフォールバック
- **グリッド表示（v0.2）**: `view: 'grid'` でカードのグリッドビュー。`setView()` で実行時に切替
- **本気のバリデーション**: accept は宣言 MIME だけでなく**マジックバイト検査**（JPEG/PNG/GIF/WebP/PDF/ZIP 等）で拡張子偽装を拒否
- **普通の `<form>` に刺さる**: hidden input 連携で結果URLをフォーム値に格納
- **アクセシブル**: キーボードのみで選択/キャンセル/リトライ/削除が完結・`aria-live="polite"` で開始/完了/エラーを通知
- **ライセンス**: MIT

対応ブラウザ: 最新の Chrome / Edge / Safari / Firefox

## デモ

```bash
# このリポジトリで
php -S localhost:8099   # PHP なら実受信（demo/upload.php）も試せる
# → http://localhost:8099/rs-upload/demo/ を開く
```

D&D・フォルダD&D・カメラ撮影・貼り付け・進捗・キャンセル/リトライ/削除・偽装ファイル拒否・hidden input 連携・グリッド表示切替を、疑似アップロード（fetchモック）・実サーバー受信（`upload.php`）・**チャンク転送（`chunk.php`・中断再開）** の3モードで試せます。チャンク転送で大きめファイルの送信中にページを再読み込みし、同じファイルを再投入するとサーバの offset から続きが送られます。

**v0.3 の前処理**もデモから試せます: 「送信前に縮小＆WebP化（`rsImageAdapter`）」をONにすると転送前に画像が縮小・WebP化され、「送信前に回転・トリミング（簡易編集）」をONにすると各画像の編集ボタンから rs-image のモーダルで回転・トリミングして反映できます。`tus` / `S3 presigned` / URL取り込み契約の使い方はページ下部のレシピを参照してください（デモ環境に tus/S3 サーバはないため説明のみ）。

**v0.4** もデモから試せます: 動画ファイルを投入するとサムネイル（1フレーム）が表示されます。PDF は「PDFプレビューを有効化」ボタンで rs-pdf アダプタ（pdf.js を CDN 読込）を注入すると1ページ目が表示されます（未注入なら汎用アイコン）。チャンク転送モードで「帯域制限」を選ぶと送信レートが上限に抑えられ、全体進捗に**残り時間の推定**が出ます。

## インストール

npm公開前は、`src/` ディレクトリをコピーするだけで使えます。

```html
<link rel="stylesheet" href="./rs-upload/src/rs-upload.css">
```

```js
import { createRSUpload, simpleTransport } from './rs-upload/src/index.js';
// npm公開後: import { createRSUpload, simpleTransport } from 'rs-upload';
```

## クイックスタート

```html
<div id="uploader"></div>
```

```js
import { createRSUpload, simpleTransport } from 'rs-upload';

const upload = createRSUpload('#uploader', {
    transport: simpleTransport({
        endpoint: '/api/upload',
        headers: () => ({ Authorization: 'Bearer ' + token }),   // 認証は全部利用者のもの
    }),
    accept: ['image/jpeg', 'image/png', 'image/webp'],   // 宣言MIMEだけでなくマジックバイトでも検査
    maxSize: 20 * 1024 * 1024,
    maxFiles: 10,
    hiddenInput: 'attachments',                          // 結果URLをフォーム値に
});

upload.on('fileDone', ({ file, result }) => console.log(result.url));
upload.addFiles(files);      // プログラマティック投入
upload.destroy();            // object URL の revoke・リスナー解除まで
```

## API

### `createRSUpload(target, options)`

| オプション | 型 / 既定値 | 説明 |
|---|---|---|
| `transport` | — | 転送アダプタ（必須）。`simpleTransport()` または自作（下記契約） |
| `accept` | なし（全形式） | `['image/jpeg', 'image/*', '.png']`。宣言MIME＋マジックバイト実測の両方で照合 |
| `magicCheck` | `true` | マジックバイト偽装検査（`false` で無効化） |
| `maxSize` | なし | 1ファイルの上限バイト数。超過は上限サイズ入りの文言で拒否 |
| `maxFiles` | なし | 保持できる枚数上限。バッチを跨いで数え、超過分だけ拒否 |
| `minImageSize` | なし | `{ width, height }`。画像の最小解像度（`createImageBitmap` で実測） |
| `parallel` | `3` | 同時アップロード数 |
| `retry` | `{ count: 3, baseDelay: 1000 }` | 指数バックオフ自動リトライ（1s → 2s → 4s） |
| `preprocess` | `[]` | 前処理アダプタ配列（下記契約）。`rsImageAdapter()` で縮小/圧縮/WebP化/EXIF正立（v0.3） |
| `edit` | `false` | 送信前の簡易編集（回転・トリミング）。`true` / `{ editor, tools, export, height }`（v0.3・rs-image が必要） |
| `hiddenInput` | なし | フォーム連携。name 文字列（hidden input を生成）/ セレクタ / input 要素。1件なら素のURL・複数はJSON配列 |
| `paste` | `'document'` | ペースト取り込み。`'element'` でウィジェット内限定・`false` で無効 |
| `multiple` | `true` | ファイル選択ダイアログの複数選択 |
| `view` | `'list'` | 表示モード。`'grid'` でカードのグリッドビュー（v0.2） |
| `camera` | `false` | カメラ撮影ボタンを表示。`true` / `{ facingMode, type, quality }`（v0.2） |
| `pdfRenderer` | なし | PDF1ページ目プレビュー用の rs-pdf レンダラアダプタ（`pdfjsAdapter(pdfjsLib)` 等）。未注入なら PDF は汎用アイコン（v0.4） |
| `videoPreview` | `true` | 動画サムネイル生成の有効/無効（v0.4） |
| `previewSize` | `128` | 動画/PDF サムネの長辺ピクセル（v0.4） |
| `autoStart` | `true` | 追加後すぐアップロード開始（`false` なら `start()` まで待機） |
| `locale` | `'ja'` | `'en'` 同梱。`texts` オプションでキー単位の文言差し替え可 |
| `meta` | `{}` | transport に渡す任意メタデータ |

### インスタンスメソッド

| メソッド | 説明 |
|---|---|
| `on(event, fn)` / `off(event, fn)` | イベント購読（下記一覧） |
| `addFiles(files)` | FileList / File[] / File を検証してキューへ（`Promise<追加アイテム[]>`） |
| `openFileDialog()` | ファイル選択ダイアログを開く |
| `openCamera()` | カメラ撮影を開始（getUserMedia モーダル / 非対応時は `capture` 属性入力・v0.2） |
| `setView(view)` | 表示モードを切り替える（`'list'` / `'grid'`・v0.2） |
| `openEditor(id)` | 簡易編集モーダル（回転・トリミング）を開く（`edit` 有効時・v0.3） |
| `start()` | `autoStart: false` のとき手動開始 |
| `cancel(id)` / `cancelAll()` | AbortController で転送を中断 |
| `retry(id)` | error / canceled のファイルを最初からやり直す |
| `replaceFile(id, file)` | ファイル実体を差し替える（編集結果の反映等・queued に戻す・v0.3） |
| `remove(id)` / `clear()` | キューから取り除く（進行中なら abort してから） |
| `toJSON()` | キュー状態のスナップショット（下記） |
| `destroy()` | object URL の revoke・リスナー解除・DOM 破棄まで |

### イベント

`fileAdded / fileRejected / fileStart / fileProgress / fileDone / fileError / fileCanceled / fileReplaced / fileRemoved / progress / allDone / change`

- `fileRejected` — `{ file, reason, message }`。reason は `magic | accept | maxSize | maxFiles | minImageSize`
- `fileProgress` — `{ file, loaded, total, ratio }`（loaded は単調増加）
- `fileError` — `{ file, error, attempt, willRetry, delay }`
- `progress` — 全体集計 `{ loaded, total, ratio, totals, speed, eta, remaining }`。`speed`（バイト/秒・移動平均）と `eta`（残り秒数）は v0.4。速度未確定・完了時は `speed`/`eta` が `null` になりうる（`eta` は完了時 0）
- `allDone` — 進行中・待機中・リトライ待ちがなくなった時点で1回

### `toJSON()` の形

```js
{
    files: [{
        id: 'f_01', name: 'photo.jpg', size: 3145728, type: 'image/jpeg',
        state: 'uploading',   // queued | preprocessing | uploading | done | error | canceled
        progress: 0.62, attempts: 1, result: null, error: null,
    }],
    totals: { count: 3, done: 1, loaded: 5242880, total: 12582912 },
}
```

### 転送アダプタ契約 — `defineTransport(def)`

すべての転送はこの契約の実装で、組み込みアダプタも同格です。

```js
import { defineTransport } from 'rs-upload';

const myTransport = defineTransport({
    name: 'my-backend',
    // 成功で result（{ url?, response?, … }）を resolve。onProgress(loaded, total) を随時呼ぶ
    async upload(file, { onProgress, signal, meta }) {
        // signal: AbortSignal（キャンセル対応必須）。meta: { name, size, type, id, ...options.meta }
        return { url: 'https://...' };
    },
    // resume(file, saved, ctx) は中断再開対応アダプタ（v0.2 chunked / v0.3 tus）で実装
});
```

#### 組み込み: `simpleTransport({ endpoint, method = 'POST', headers, fieldName = 'file', params })`

単発リクエスト。`POST` は multipart/form-data（`fieldName` にファイル）、`PUT` は raw ボディ。`endpoint` / `headers` / `params` は `(file, meta) =>` の関数でも渡せます（トークンの遅延評価）。ブラウザでは XMLHttpRequest で実進捗を配線し、XHR がない環境（Node 等）では fetch にフォールバックします。

#### 組み込み: `chunkedTransport({ endpoint, chunkSize = 5MB, headers, maxBytesPerSec })`（v0.2・帯域制限は v0.4）

大きなファイルを分割送信し、中断しても続きから再開できる自前プロトコルの転送アダプタです。**送信中はチャンク1個分しかメモリに載りません**（`file.slice()` の逐次読み。ファイル全体を ArrayBuffer 化しません）。`maxBytesPerSec`（v0.4）を渡すと、チャンク送信前にトークンバケット（`throttle.js`）へバイト数を予約して必要なら待ち、**送信レートを上限に抑えます**。制限はトランスポート単位で共有されるので、並列送信の合計レートも守られます。

```js
import { createRSUpload, chunkedTransport } from 'rs-upload';

createRSUpload('#uploader', {
    transport: chunkedTransport({
        endpoint: '/api/upload',
        chunkSize: 5 * 1024 * 1024,
        headers: () => ({ Authorization: 'Bearer ' + token }),
        maxBytesPerSec: 512 * 1024,   // v0.4: 512 KB/s に帯域制限（省略で無制限）
    }),
});
```

プロトコル（受信側 PHP 骨子は `demo/chunk.php`）:

1. **ハンドシェイク**: `POST {endpoint}`、ヘッダ `X-RSUpload-Fingerprint`、JSON ボディ `{ name, size, type }` → 応答 `{ uploadId, offset }`（新規は `offset=0`、既知の fingerprint なら受信済みバイト数）
2. **チャンク送信**: `PATCH {endpoint}/{uploadId}`、ヘッダ `Content-Range: bytes {start}-{end}/{size}`、ボディは `file.slice(start, end+1)` → 応答 `{ offset }`（サーバの受信済み位置＝クライアントはこれを正として次チャンクへ）
3. **完了**: 最終応答が `{ offset: size, url, … }` を返したら done。その応答がそのまま `result`
4. **中断再開**: `fingerprint = name + ':' + size + ':' + lastModified`。`localStorage['rs-upload:'+fingerprint]` に `{ uploadId, offset, endpoint }` を記録し、**タブ再読込後に同一ファイルを再投入するとハンドシェイク応答の offset から続行**（クライアント記録よりサーバ応答を優先）。done で記録を削除

### フォルダ D&D（v0.2）

フォルダをドロップすると `webkitGetAsEntry` で再帰走査し、各ファイルに相対パス（`file.relativePath = 'photos/2024/a.jpg'`）を付与してキューへ入れます。走査ロジックは単体でも使えます。

```js
import { filesFromDataTransfer } from 'rs-upload';
el.addEventListener('drop', async (e) => {
    e.preventDefault();
    const files = await filesFromDataTransfer(e.dataTransfer); // relativePath 付き File[]
});
```

### 画像以外のプレビュー（v0.4）

画像はこれまで通りサムネイル表示（EXIF正立・`createImageBitmap`）します。v0.4 では **動画**と **PDF** もプレビューできます（どちらも可視域のみ遅延生成・スクロールアウトで解放）。

- **動画サムネ**: `video` 要素で1フレームをデコードし `canvas` にキャプチャします。既定 on（`videoPreview: false` で無効）。単体関数 `captureVideoThumbnail(file, { maxSize, seek, type })` も使えます（デコード不能・非対応コーデックは `null` → 汎用アイコン）。
- **PDF1ページ目**: **rs-pdf のレンダラアダプタ注入**（opt-in）。`pdfRenderer` に `pdfjsAdapter(pdfjsLib)` 等を渡すと1ページ目を描画します。rs-upload コアは rs-pdf を import しません（依存ゼロを維持・注入は import のみ）。未注入なら PDF は汎用アイコン表示にフォールバックします。単体関数 `renderPdfFirstPage(file, renderer, { maxSize })` も使えます。

```js
import { createRSUpload, chunkedTransport } from 'rs-upload';
import { pdfjsAdapter } from 'rs-pdf';            // rs-pdf のレンダラアダプタ（import のみ）
import * as pdfjsLib from 'pdfjs-dist';           // pdf.js は利用者が用意（CDN でも可）

createRSUpload('#uploader', {
    transport: chunkedTransport({ endpoint: '/api/upload' }),
    pdfRenderer: pdfjsAdapter(pdfjsLib),           // 注入時のみ PDF1ページ目プレビューが有効
    videoPreview: true,                            // 既定 on
    previewSize: 128,                              // サムネ長辺px
});
```

### 帯域スロットリングと残り時間推定（v0.4）

- **帯域スロットリング**: `chunkedTransport({ maxBytesPerSec })` で送信レートを上限に抑えます（上記チャンク転送の項参照）。純ロジックの `createThrottle({ bytesPerSec, burst, now })` は自作トランスポートからも使えます（`reserve(bytes)` が「送信開始まで待つべき ms」を返す）。
- **残り時間推定**: 全体の転送速度を移動平均し、`progress` イベントに `speed`（バイト/秒）と `eta`（残り秒数）を配ります。全体進捗バーには `formatDuration()` で「残り 約◯分◯秒」を表示します。推定器 `createSpeedEstimator({ windowMs, now })`（`push(loaded)` / `speed()` / `eta(remaining)`）も単体で使えます。

### カメラ撮影（v0.2）

`camera: true`（または `{ facingMode: 'user' | 'environment', type, quality }`）でカメラ撮影ボタンを表示します。`getUserMedia` が使える環境ではモーダルでプレビュー→撮影→File化し、非対応スマホでは `<input capture>` にフォールバックします。撮影核 `captureFrameToFile(source, { name, type })` も単体で使えます。

### グリッドビュー（v0.2）

`view: 'grid'` でカードのグリッド表示になります。`upload.setView('grid' | 'list')` で実行時に切り替えられます。

### 前処理アダプタ契約 — `definePreprocessor(def)`

バリデーション通過後・転送前に配列順で直列適用されます（v0.3 の `rsImageAdapter()` もこの形）。

```js
{ name: 'rs-image', match?: (file) => boolean, process(file, { signal, onProgress }) => Promise<Blob|File> }
```

### rs-image 前処理 — `rsImageAdapter(options)`（v0.3）

**rs-image の変換エンジン**を前処理として繋ぎ、アップロード前に画像を縮小・圧縮・WebP化・EXIF正立します。転送量とサーバ負荷を削る思想です。rs-image は **import して使うだけ**で、rs-upload コアの依存はゼロのまま（`rsImageAdapter` を渡した時だけ rs-image を読み込みます）。

```js
import { createRSUpload, chunkedTransport, rsImageAdapter } from 'rs-upload';
import { processImage } from 'rs-image';   // engine を注入（未注入なら動的 import で解決）

createRSUpload('#uploader', {
    transport: chunkedTransport({ endpoint: '/api/upload' }),
    preprocess: [rsImageAdapter({
        maxWidth: 1600, maxHeight: 1600,   // 段階縮小（比率維持・片方だけでも可）
        type: 'image/webp', quality: 0.82, // WebP 変換（未指定なら元形式を維持）
        targetBytes: 300 * 1024,           // 目標バイト数まで品質を二分探索で追い込む
        engine: processImage,              // 省略時は '../../rs-image/src/index.js' を動的 import
    })],
});
```

| オプション | 説明 |
|---|---|
| `maxWidth` / `maxHeight` / `fit` | 縮小の上限（`fit`: `'contain'` 既定 / `'cover'` / `'fill'`） |
| `quality` | 0–1（jpeg/webp の品質） |
| `type` | 出力 MIME（`'image/webp'` / `'image/jpeg'` / `'image/png'`）。未指定なら元形式維持 |
| `targetBytes` | 目標バイト数（品質を二分探索・jpeg/webp のみ） |
| `match` | 適用対象の判定（既定: `image/*` かつ SVG 以外） |
| `engine` / `enginePath` | rs-image の `processImage` 注入 / 動的 import 先 |

### 送信前の簡易編集（回転・トリミング）— `edit`（v0.3）

`edit` を有効にすると各画像に編集ボタンが付き、**rs-image のエディタをモーダルで開いて回転・トリミング**できます。「適用」でエクスポート結果がファイル実体に反映され（`replaceFile`）、その状態で転送されます。編集の余地を残すため `autoStart: false` との併用が自然です（`upload.start()` で送信）。

```js
import { createRSUpload, simpleTransport } from 'rs-upload';
import { createRSImageEditor } from 'rs-image';

createRSUpload('#uploader', {
    transport: simpleTransport({ endpoint: '/api/upload' }),
    autoStart: false,
    edit: {
        editor: createRSImageEditor,          // rs-image の UI を注入（未注入なら動的 import）
        tools: ['crop', 'rotate'],            // モーダルのツール（rs-image の tools）
        export: { format: 'webp', quality: 0.85 },
    },
});
```

rs-image のスタイル（`rs-image.css`）をページに読み込んでください。`upload.openEditor(id)` でプログラム的にも開けます。

### tus 転送 — `tusTransport({ endpoint, headers, chunkSize })`（v0.3）

tus resumable upload protocol 1.0 準拠。tusd 等の既存 tus サーバがそのまま使えます。

```js
import { createRSUpload, tusTransport } from 'rs-upload';

createRSUpload('#uploader', {
    transport: tusTransport({
        endpoint: 'https://tusd.example.com/files/',
        chunkSize: 5 * 1024 * 1024,
        headers: () => ({ Authorization: 'Bearer ' + token }),
    }),
});
```

フロー: **creation**（`POST` に `Tus-Resumable: 1.0.0` / `Upload-Length` / `Upload-Metadata`）→ Location → **HEAD** で `Upload-Offset` を確認 → **PATCH**（`Content-Type: application/offset+octet-stream` / `Upload-Offset`）を offset 到達まで。中断しても fingerprint→uploadUrl を localStorage に記録し、HEAD の `Upload-Offset` から再開します。

### S3 presigned レシピ（v0.3）

**署名は利用者の自前バックエンド**が行い、ブラウザは presigned URL に PUT するだけ（AWS 認証情報はブラウザに置かない）。

```js
import { createRSUpload, s3PutTransport, s3MultipartTransport } from 'rs-upload';

// 単発 PUT（~5GB まで）
s3PutTransport({
    presign: (file, meta) => api('/s3/sign-put', { name: meta.name, type: meta.type }), // => { url, headers? }
});

// マルチパート（CreateMultipartUpload → パート毎 presigned PUT → ETag 収集 → Complete）
s3MultipartTransport({
    partSize: 8 * 1024 * 1024,
    createMultipartUpload: (file, meta) => api('/s3/mpu/create', { name: meta.name }),               // => { uploadId, key }
    signPart: ({ partNumber, uploadId, key }) => api('/s3/mpu/sign', { partNumber, uploadId, key }), // => url
    completeMultipartUpload: ({ uploadId, key, parts }) => api('/s3/mpu/complete', { uploadId, key, parts }),
    abortMultipartUpload: ({ uploadId, key }) => api('/s3/mpu/abort', { uploadId, key }),            // 中断時のクリーンアップ（任意）
});
```

`parts` は `[{ PartNumber, ETag }]`（昇順）。**S3 の CORS に `ExposeHeaders: ETag` が必要**です（各パートの ETag をブラウザで読むため）。分割計画は純関数 `s3PartPlan(size, partSize)` でも取得できます。

### URL取り込みアダプタ契約 — `defineUrlImporter(def)`（v0.3・契約定義のみ）

リモートURL（直リンク画像・共有リンク等）を File 化してキューへ入れるための契約を定義します。**取得実装はアプリ側の責務**（CORS の都合で多くは「同一オリジンプロキシ経由」になります・スコープ外）。

```js
import { defineUrlImporter, filenameFromUrl } from 'rs-upload';

const byUrl = defineUrlImporter({
    name: 'by-url',
    async fetch(url, { signal } = {}) {
        const res = await fetch('/proxy?url=' + encodeURIComponent(url), { signal }); // 同一オリジンプロキシ
        const blob = await res.blob();
        return new File([blob], filenameFromUrl(url), { type: blob.type });
    },
});
upload.addFiles([await byUrl.fetch('https://example.com/a.jpg')]);
```

### UploadQueue 単体利用（DOMなし）

```js
import { UploadQueue } from 'rs-upload';

const queue = new UploadQueue({ transport, parallel: 3, retry: { count: 3, baseDelay: 1000 } });
queue.on('fileDone', ({ file, result }) => {});
await queue.addFiles(files);   // Node からも使える（バリデーション込み）
```

### テーマ

CSS カスタムプロパティ（`--rsu-*`）の上書きで差し替えられます。

```css
.rsu { --rsu-accent: #7c3aed; --rsu-radius: 6px; }
```

## 仕組み

- **UploadQueue（純ロジック）**: 状態機械 `queued → preprocessing → uploading → done | error | canceled`（error は自動/手動リトライで uploading に戻る）。並列数制御はアクティブ数を数えて `queued` を順に起動するだけの pump 方式。リトライは `baseDelay × 2^(attempts-1)` の指数バックオフ
- **Validator**: マジックバイト（先頭シグネチャ）→ accept → maxSize → 最小解像度 → maxFiles の順で検査。実測 MIME が取れた場合は宣言より実測を信じて accept を照合
- **Widget**: 大量投入でも固まらないよう、リスト行は rAF でまとめて DocumentFragment 挿入。サムネイルは IntersectionObserver で可視域のみ遅延生成し、スクロールアウトで解放。EXIF 向きは `createImageBitmap` の `imageOrientation: 'from-image'` で正立（非対応時は object URL 直表示にフォールバック）

## ロードマップ（REQUIREMENTS.md 参照）

- v0.1: D&D＋リストUI＋バリデーション＋simple転送＋並列/リトライ＋hidden input＋i18n＋a11y
- v0.2: chunkedTransport（自前分割プロトコル・中断再開）・フォルダD&D・カメラ撮影・グリッドビュー
- v0.3: rs-image 前処理アダプタ（縮小/圧縮/WebP/targetBytes/EXIF正立）・送信前の簡易編集（回転・トリミング）・tusTransport・S3 presigned レシピ（単発PUT／マルチパート）・URL取り込みアダプタ契約
- v0.4（現在）: 画像以外のプレビュー（動画サムネ・PDF1ページ目＝rs-pdfアダプタ注入）・帯域スロットリング（`maxBytesPerSec`）・全体進捗の残り時間推定（転送速度の移動平均→ETA）・中断→リロード→再開の自動検証強化

## 検証

```bash
node --test test/   # UploadQueue・バリデーション・マジックバイト・simple/chunked/tus/S3転送・rsImageAdapter・URL取り込み契約・フォルダ走査・帯域スロットリング（throttle）・残り時間推定（eta） の単体テスト
```

ブラウザ側は REQUIREMENTS.md §6 の受け入れテスト（ヘッドレスChromium）に加え、v0.2 のチャンク転送・中断再開（実PHP受信でバイト一致）・フォルダD&D・カメラ撮影・グリッド表示、v0.3 の rs-image 前処理（送信前に縮小＆WebP化してバイト減）・送信前の回転/トリミング反映・tus（creation→HEAD→PATCH）・S3 マルチパート（ETag 収集→Complete）・URL取り込み契約、v0.4 の動画サムネ生成・PDF1ページ目プレビュー（rs-pdf注入時／未注入フォールバック）・帯域スロットリング（レート上限計測）・残り時間推定（進行で ETA が減少）・中断→リロード→再開（クライアント記録を消してもサーバ offset から再開しバイト一致）を自動検証しています。

## ライセンス

MIT
