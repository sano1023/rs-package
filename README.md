# ryusuke-packages（配布版）

自作JSライブラリコレクションの**ビルド済み配布リポジトリ**です。ソースコードは含まれません。

- **利用は無償**（商用プロジェクトへの組み込みOK）
- **改変・再配布・リバースエンジニアリングは禁止**（各パッケージの LICENSE.txt 参照）
- 機能追加・改修・カスタマイズは作者への**有償依頼**として承ります → **https://parelabo.com** / contact@parelabo.com

**バニラJS / `<script>`タグ** で利用できます。Vue 3 / React ラッパーの有無は下の一覧と各 README を参照してください。

## インストール

標準の配布先は npmjs.com です。初回登録の状況は [インストール手順](./INSTALLING.md) を確認してください。ログインやトークンは不要です。使うプロジェクトで必要なパッケージをインストールします。

```bash
npm install @sano1023/rs-editor
```

以前 GitHub Packages を設定した環境では、プロジェクトの `.npmrc` に `@sano1023:registry=https://registry.npmjs.org/` を設定してください。全パッケージのコマンド、バージョン指定、既存 lockfile の移行は [利用者向けインストール手順](./INSTALLING.md) を参照してください。

npm レジストリを使わない場合は GitHub の tarball を直接指定できます。

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-editor-0.6.0.tgz
```

## 使い方

**バニラ JS（ESM）**
```js
import { createRSEditor } from '@sano1023/rs-editor';
import '@sano1023/rs-editor/rs-editor.css';

createRSEditor('#editor', { toolbar: 'undo redo | bold italic' });
```

**Vue 3**
```js
import { RsEditor } from '@sano1023/rs-editor/vue';
import '@sano1023/rs-editor/rs-editor.css';
```
```vue
<RsEditor v-model="html" toolbar="undo redo | bold italic" />
```

**React**
```jsx
import { RsEditor } from '@sano1023/rs-editor/react';
import '@sano1023/rs-editor/rs-editor.css';

<RsEditor value={html} onChange={setHtml} />
```

`vue` / `react` は peerDependency（バンドルに同梱しません）。

**`<script>` タグ（CDN・ビルド環境不要）**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sano1023/rs-package@main/rs-editor/dist/rs-editor.css">
<script src="https://cdn.jsdelivr.net/gh/sano1023/rs-package@main/rs-editor/dist/rs-editor.min.js"></script>
<script>
  RSEditor.createRSEditor('#editor', { plugins: [RSEditor.plugins.checklist] });
</script>
```

## パッケージ一覧

| パッケージ | バージョン | Vue/React | CSS | 概要 |
|---|---|---|---|---|
| [@sano1023/rs-baslider](./rs-baslider/) | 0.1.0 | ✅ | 要 | Before/After比較スライダー |
| [@sano1023/rs-calendar](./rs-calendar/) | 0.5.0 | ✅ | 要 | 依存ゼロのイベントカレンダー |
| [@sano1023/rs-chart](./rs-chart/) | 0.5.0 | ✅ | 要 | 依存ゼロのSVG/Canvasチャートライブラリ |
| [@sano1023/rs-cmdk](./rs-cmdk/) | 0.1.0 | — | 要 | 依存ゼロのコマンドパレット |
| [@sano1023/rs-datepicker](./rs-datepicker/) | 0.4.0 | ✅ | 要 | 日本語ファースト・依存ゼロの日付ピッカー |
| [@sano1023/rs-diagram](./rs-diagram/) | 0.6.0 | ✅ | 要 | 依存ゼロのSVG作図・ダイアグラムライブラリ |
| [@sano1023/rs-editor](./rs-editor/) | 0.6.0 | ✅ | 要 | プラグインアーキテクチャを持つ、依存ゼロのWYSIWYGエディタライブラリ |
| [@sano1023/rs-form](./rs-form/) | 0.5.0 | ✅ | 要 | 依存ゼロのスキーマ駆動フォームビルダー |
| [@sano1023/rs-gantt](./rs-gantt/) | 0.5.0 | ✅ | 要 | 依存ゼロの対話型プロジェクトガントチャート |
| [@sano1023/rs-grid](./rs-grid/) | 0.4.1 | ✅ | 要 | Excel風データグリッド |
| [@sano1023/rs-image](./rs-image/) | 0.9.0 | ✅ | 要 | 依存ゼロの画像処理＆合成エディタ |
| [@sano1023/rs-kana](./rs-kana/) | 0.1.0 | — | 不要 | IME変換中の読みを使う依存ゼロのカタカナ自動入力ライブラリ |
| [@sano1023/rs-kanban](./rs-kanban/) | 0.2.0 | ✅ | 要 | 依存ゼロのカンバンボード |
| [@sano1023/rs-lightbox](./rs-lightbox/) | 0.1.0 | ✅ | 要 | 依存ゼロ・フレームワーク非依存の画像ライトボックス |
| [@sano1023/rs-livecam](./rs-livecam/) | 0.2.0 | ✅ | 不要 | リアルタイムカメラ加工 |
| [@sano1023/rs-notify](./rs-notify/) | 0.1.0 | — | 要 | 依存ゼロのトースト通知＋Promiseベースの confirm / alert / prompt ダイアログ |
| [@sano1023/rs-pdf](./rs-pdf/) | 0.5.0 | ✅ | 要 | 依存ゼロのPDFビューア＆注釈ライブラリ |
| [@sano1023/rs-pivot](./rs-pivot/) | 0.4.0 | ✅ | 要 | 依存ゼロのピボットテーブルライブラリ |
| [@sano1023/rs-player](./rs-player/) | 0.5.0 | ✅ | 要 | 依存ゼロのHTML5動画プレイヤー |
| [@sano1023/rs-qrcode](./rs-qrcode/) | 0.1.2 | ✅ | 不要 | QRコード/バーコード生成 |
| [@sano1023/rs-replay](./rs-replay/) | 0.4.0 | ✅ | 要 | 完全セルフホスト・依存ゼロのセッション記録/再生ライブラリ |
| [@sano1023/rs-report](./rs-report/) | 0.5.0 | ✅ | 要 | 依存ゼロの帳票 |
| [@sano1023/rs-scanner](./rs-scanner/) | 0.1.0 | ✅ | 要 | QR/バーコード読み取り |
| [@sano1023/rs-select](./rs-select/) | 0.1.0 | ✅ | 要 | 依存ゼロの高機能セレクトボックス |
| [@sano1023/rs-sheet](./rs-sheet/) | 0.5.0 | ✅ | 要 | 本格数式エンジン内蔵・依存ゼロのセル指向スプレッドシートライブラリ |
| [@sano1023/rs-sign](./rs-sign/) | 0.4.0 | ✅ | 要 | 電子署名SaaSの画面部品網羅を目指す、依存ゼロの署名パッド＋電子印鑑ライブラリ |
| [@sano1023/rs-slider](./rs-slider/) | 0.1.0 | ✅ | 要 | 依存ゼロの画像スライダーコレクション |
| [@sano1023/rs-splitter](./rs-splitter/) | 0.1.0 | — | 要 | 依存ゼロの分割ペイン |
| [@sano1023/rs-text-animation](./rs-text-animation/) | 0.1.0 | — | 要 | 依存ゼロのテキストアニメーションライブラリ |
| [@sano1023/rs-tour](./rs-tour/) | 0.1.0 | ✅ | 不要 | 依存ゼロ・フレームワーク非依存のスポットライト型ガイドツアーライブラリ |
| [@sano1023/rs-tree](./rs-tree/) | 0.2.1 | ✅ | 要 | 依存ゼロのツリービュー |
| [@sano1023/rs-upload](./rs-upload/) | 0.4.0 | ✅ | 要 | 依存ゼロのファイルアップロードUI＋転送エンジン |

各パッケージの詳しい使い方（props・イベント・メソッド）は、それぞれの README を参照してください。
