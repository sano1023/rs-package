# ryusuke-packages（配布版）

自作JSライブラリコレクションの**ビルド済み配布リポジトリ**です。ソースコードは含まれません。

- **利用は無償**（商用プロジェクトへの組み込みOK）
- **改変・再配布・リバースエンジニアリングは禁止**（各パッケージの LICENSE.txt 参照）
- 機能追加・改修・カスタマイズは作者への**有償依頼**として承ります → **https://parelabo.com** / contact@parelabo.com

すべてのパッケージが **バニラJS / Vue 3 / React / `<script>`タグ** の4形態で使えます。

## インストール

```bash
npm install @parelabo/rs-editor
```

npm レジストリを使わない場合は GitHub の tarball を直接指定できます。

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-editor-0.5.0.tgz
```

## 使い方

**バニラ JS（ESM）**
```js
import { createRSEditor } from '@parelabo/rs-editor';
import '@parelabo/rs-editor/rs-editor.css';

createRSEditor('#editor', { toolbar: 'undo redo | bold italic' });
```

**Vue 3**
```js
import { RsEditor } from '@parelabo/rs-editor/vue';
import '@parelabo/rs-editor/rs-editor.css';
```
```vue
<RsEditor v-model="html" toolbar="undo redo | bold italic" />
```

**React**
```jsx
import { RsEditor } from '@parelabo/rs-editor/react';
import '@parelabo/rs-editor/rs-editor.css';

<RsEditor value={html} onChange={setHtml} />
```

`vue` / `react` は peerDependency（バンドルに同梱しません）。

**`<script>` タグ（CDN・ビルド環境不要）**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@parelabo/rs-editor/dist/rs-editor.css">
<script src="https://cdn.jsdelivr.net/npm/@parelabo/rs-editor/dist/rs-editor.min.js"></script>
<script>
  RSEditor.createRSEditor('#editor', { plugins: [RSEditor.plugins.checklist] });
</script>
```

## パッケージ一覧

| パッケージ | バージョン | Vue/React | CSS | 概要 |
|---|---|---|---|---|
| [@parelabo/rs-baslider](./rs-baslider/) | 0.1.0 | ✅ | 要 | Before/After比較スライダー |
| [@parelabo/rs-chart](./rs-chart/) | 0.5.0 | ✅ | 要 | 依存ゼロのSVG/Canvasチャートライブラリ |
| [@parelabo/rs-datepicker](./rs-datepicker/) | 0.3.0 | ✅ | 要 | 日本語ファースト・依存ゼロの日付ピッカー |
| [@parelabo/rs-diagram](./rs-diagram/) | 0.6.0 | ✅ | 要 | 依存ゼロのSVG作図・ダイアグラムライブラリ |
| [@parelabo/rs-editor](./rs-editor/) | 0.5.0 | ✅ | 要 | プラグインアーキテクチャを持つ、依存ゼロのWYSIWYGエディタライブラリ |
| [@parelabo/rs-form](./rs-form/) | 0.5.0 | ✅ | 要 | 依存ゼロのスキーマ駆動フォームビルダー |
| [@parelabo/rs-gantt](./rs-gantt/) | 0.5.0 | ✅ | 要 | 依存ゼロの対話型プロジェクトガントチャート |
| [@parelabo/rs-grid](./rs-grid/) | 0.4.1 | ✅ | 要 | Excel風データグリッド |
| [@parelabo/rs-image](./rs-image/) | 0.6.0 | ✅ | 要 | 依存ゼロの画像処理＆合成エディタ |
| [@parelabo/rs-kana](./rs-kana/) | 0.1.0 | — | 不要 | IME変換中の読みを使う依存ゼロのカタカナ自動入力ライブラリ |
| [@parelabo/rs-lightbox](./rs-lightbox/) | 0.1.0 | ✅ | 要 | 依存ゼロ・フレームワーク非依存の画像ライトボックス |
| [@parelabo/rs-livecam](./rs-livecam/) | 0.2.0 | ✅ | 不要 | リアルタイムカメラ加工 |
| [@parelabo/rs-pdf](./rs-pdf/) | 0.5.0 | ✅ | 要 | 依存ゼロのPDFビューア＆注釈ライブラリ |
| [@parelabo/rs-pivot](./rs-pivot/) | 0.4.0 | ✅ | 要 | 依存ゼロのピボットテーブルライブラリ |
| [@parelabo/rs-player](./rs-player/) | 0.5.0 | ✅ | 要 | 依存ゼロのHTML5動画プレイヤー |
| [@parelabo/rs-qrcode](./rs-qrcode/) | 0.1.2 | ✅ | 不要 | QRコード/バーコード生成 |
| [@parelabo/rs-replay](./rs-replay/) | 0.4.0 | ✅ | 要 | 完全セルフホスト・依存ゼロのセッション記録/再生ライブラリ |
| [@parelabo/rs-scanner](./rs-scanner/) | 0.1.0 | ✅ | 要 | QR/バーコード読み取り |
| [@parelabo/rs-sheet](./rs-sheet/) | 0.5.0 | ✅ | 要 | 本格数式エンジン内蔵・依存ゼロのセル指向スプレッドシートライブラリ |
| [@parelabo/rs-sign](./rs-sign/) | 0.4.0 | ✅ | 要 | 電子署名SaaSの画面部品網羅を目指す、依存ゼロの署名パッド＋電子印鑑ライブラリ |
| [@parelabo/rs-slider](./rs-slider/) | 0.1.0 | ✅ | 要 | 依存ゼロの画像スライダーコレクション |
| [@parelabo/rs-text-animation](./rs-text-animation/) | 0.1.0 | — | 要 | 依存ゼロのテキストアニメーションライブラリ |
| [@parelabo/rs-tour](./rs-tour/) | 0.1.0 | ✅ | 不要 | 依存ゼロ・フレームワーク非依存のスポットライト型ガイドツアーライブラリ |
| [@parelabo/rs-upload](./rs-upload/) | 0.4.0 | ✅ | 要 | 依存ゼロのファイルアップロードUI＋転送エンジン |

各パッケージの詳しい使い方（props・イベント・メソッド）は、それぞれの README を参照してください。
