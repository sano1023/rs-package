> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール / 読み込み

```bash
# npm（GitHubのtarball指定）
npm install https://github.com/sano1023/ryusuke-packages-dist/raw/main/tarballs/rs-upload-0.1.0.tgz
```

```html
<!-- CDN（jsDelivr・scriptタグ直読み） -->
<script src="https://cdn.jsdelivr.net/gh/sano1023/ryusuke-packages-dist@main/rs-upload/dist/rs-upload.min.js"></script>
```

```js
// ESM import（npmインストール後）
import { /* 公開API */ } from 'rs-upload';
```

CSSが必要なパッケージは `dist/rs-upload.css` を link してください。

---

# rs-upload

有料アップロードSaaS/ウィジェット（Uploadcare / Filestack / Transloadit / Uppy+Companion 等）の機能網羅を目指す、依存ゼロのファイルアップロードUI＋転送エンジン。ベンダーサーバなしで、どの自前バックエンドにもそのまま刺さります（現在 v0.1）。

- **依存ゼロ・ビルド不要**: ランタイム依存なし。`src/` から直接 import できる ESモジュール＋CSS 1枚
- **ベンダーサーバ不要**: 転送は利用者のエンドポイント直行。認証ヘッダ・URL はすべて利用者のもの
- **コアとUIを分離**: UploadQueue（状態機械・並列数制御・指数バックオフリトライ）は DOM なしで単体利用可。Widget はその上の1利用者
- **転送アダプタ契約**: 組み込みの `simpleTransport` も自作アダプタも同格（chunked / tus は v0.2 / v0.3 で追加予定）
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

D&D・貼り付け・進捗・キャンセル/リトライ/削除・偽装ファイル拒否・hidden input 連携を、疑似アップロード（fetchモック）と実サーバー受信の2モードで試せます。

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
| `preprocess` | `[]` | 前処理アダプタ配列（下記契約。rs-image 連携は v0.3） |
| `hiddenInput` | なし | フォーム連携。name 文字列（hidden input を生成）/ セレクタ / input 要素。1件なら素のURL・複数はJSON配列 |
| `paste` | `'document'` | ペースト取り込み。`'element'` でウィジェット内限定・`false` で無効 |
| `multiple` | `true` | ファイル選択ダイアログの複数選択 |
| `autoStart` | `true` | 追加後すぐアップロード開始（`false` なら `start()` まで待機） |
| `locale` | `'ja'` | `'en'` 同梱。`texts` オプションでキー単位の文言差し替え可 |
| `meta` | `{}` | transport に渡す任意メタデータ |

### インスタンスメソッド

| メソッド | 説明 |
|---|---|
| `on(event, fn)` / `off(event, fn)` | イベント購読（下記一覧） |
| `addFiles(files)` | FileList / File[] / File を検証してキューへ（`Promise<追加アイテム[]>`） |
| `openFileDialog()` | ファイル選択ダイアログを開く |
| `start()` | `autoStart: false` のとき手動開始 |
| `cancel(id)` / `cancelAll()` | AbortController で転送を中断 |
| `retry(id)` | error / canceled のファイルを最初からやり直す |
| `remove(id)` / `clear()` | キューから取り除く（進行中なら abort してから） |
| `toJSON()` | キュー状態のスナップショット（下記） |
| `destroy()` | object URL の revoke・リスナー解除・DOM 破棄まで |

### イベント

`fileAdded / fileRejected / fileStart / fileProgress / fileDone / fileError / fileCanceled / fileRemoved / progress / allDone / change`

- `fileRejected` — `{ file, reason, message }`。reason は `magic | accept | maxSize | maxFiles | minImageSize`
- `fileProgress` — `{ file, loaded, total, ratio }`（loaded は単調増加）
- `fileError` — `{ file, error, attempt, willRetry, delay }`
- `progress` — 全体集計 `{ loaded, total, ratio, totals }`
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

### 前処理アダプタ契約 — `definePreprocessor(def)`

バリデーション通過後・転送前に配列順で直列適用されます（v0.3 の `rsImageAdapter()` もこの形）。

```js
{ name: 'rs-image', match?: (file) => boolean, process(file, { signal, onProgress }) => Promise<Blob|File> }
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

- v0.1（現在）: D&D＋リストUI＋バリデーション＋simple転送＋並列/リトライ＋hidden input＋i18n＋a11y
- v0.2: chunkedTransport（自前分割プロトコル・中断再開）・フォルダD&D・カメラ撮影・グリッドビュー
- v0.3: rs-image 前処理アダプタ・簡易編集・tusTransport・S3 presigned レシピ
- v0.4: 動画/PDFプレビュー・帯域スロットリング・残り時間推定

## 検証

```bash
node --test test/   # UploadQueue・バリデーション・マジックバイト・simpleTransport の単体テスト
```

ブラウザ側は REQUIREMENTS.md §6 の受け入れテスト（ヘッドレスChromium）で全項目を自動検証しています。

## ライセンス

MIT
