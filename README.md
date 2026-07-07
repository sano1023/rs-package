# ryusuke-packages（配布版）

自作JSライブラリコレクションの**ビルド済み配布リポジトリ**です。ソースコードは含まれません。

- **利用は無償**（商用プロジェクトへの組み込みOK）
- **改変・再配布・リバースエンジニアリングは禁止**（各パッケージの LICENSE.txt 参照）
- 機能追加・改修・カスタマイズは作者への**有償依頼**として承ります → **https://parelabo.com** / contact@parelabo.com

## 使い方

**scriptタグ（CDN・ビルド環境不要）**
```html
<script src="https://cdn.jsdelivr.net/gh/sano1023/ryusuke-packages-dist@main/rs-editor/dist/rs-editor.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sano1023/ryusuke-packages-dist@main/rs-editor/dist/rs-editor.css">
<script>
  RSEditor.createRSEditor('#editor', { plugins: [RSEditor.plugins.checklist] });
</script>
```

**npm（tarball URL 指定）**
```bash
npm install https://github.com/sano1023/ryusuke-packages-dist/raw/main/tarballs/rs-editor-0.5.0.tgz
```
```js
import { createRSEditor } from 'rs-editor';
import { RsEditor } from 'rs-editor/vue';    // Vue 3 ラッパー
import { RsEditor } from 'rs-editor/react';  // React 18 ラッパー
```

## パッケージ一覧

| パッケージ | バージョン | 概要 |
|---|---|---|
| [rs-baslider](./rs-baslider/) | 0.1.0 | Before/After比較スライダー |
| [rs-chart](./rs-chart/) | 0.5.0 | 有料チャートライブラリの機能網羅を目指す、依存ゼロのSVGチャートライブラリ |
| [rs-datepicker](./rs-datepicker/) | 0.3.0 | 日本語ファースト・依存ゼロの日付ピッカー |
| [rs-diagram](./rs-diagram/) | 0.2.0 | 有料ダイアグラムライブラリの機能網羅を目指す、依存ゼロのSVG作図ライブラリ |
| [rs-editor](./rs-editor/) | 0.5.0 | プラグインアーキテクチャを持つ、依存ゼロのWYSIWYGエディタライブラリ |
| [rs-form](./rs-form/) | 0.1.0 | 有料フォームビルダー製品の機能網羅を目指す、依存ゼロのスキーマ駆動フォームライブラリ |
| [rs-gantt](./rs-gantt/) | 0.1.0 | 有料ガントチャートライブラリの機能網羅を目指す、依存ゼロの対話型プロジェクトガント |
| [rs-grid](./rs-grid/) | 0.4.1 | Excel風データグリッド |
| [rs-image](./rs-image/) | 0.6.0 | 依存ゼロの画像処理＆合成エディタ |
| [rs-livecam](./rs-livecam/) | 0.2.0 | リアルタイムカメラ加工 |
| [rs-pivot](./rs-pivot/) | 0.1.0 | 有料ピボットテーブルライブラリの機能網羅を目指す、依存ゼロのピボットテーブルライブラリ |
| [rs-qrcode](./rs-qrcode/) | 0.1.2 | QRコード/バーコード生成 |
| [rs-replay](./rs-replay/) | 0.1.0 | 有料セッションリプレイSaaSの機能網羅を目指す、完全セルフホスト・依存ゼロのセッション記録/再生ライブラリ |
| [rs-scanner](./rs-scanner/) | 0.1.0 | QR/バーコード読み取り |
| [rs-sheet](./rs-sheet/) | 0.1.0 | 本格数式エンジン内蔵・依存ゼロのセル指向スプレッドシートライブラリ |
| [rs-sign](./rs-sign/) | 0.1.0 | 電子署名SaaSの画面部品網羅を目指す、依存ゼロの署名パッド＋電子印鑑ライブラリ |
| [rs-slider](./rs-slider/) | 0.1.0 | 依存ゼロの画像スライダーコレクション |
| [rs-upload](./rs-upload/) | 0.1.0 | 有料アップロードSaaS/ウィジェットの機能網羅を目指す、依存ゼロのファイルアップロードUI＋転送エンジン |
| [@knoweble/spotlight-tour](./tour/) | 0.1.0 | 依存ゼロ・フレームワーク非依存のスポットライト型ガイドツアーライブラリ |

各パッケージの詳しい使い方は、それぞれの README を参照してください。
