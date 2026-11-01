# ライブラリのインストール・更新

全32ライブラリを **npmjs.com** (`https://registry.npmjs.org/`) の公開パッケージ **`@sano1023/rs-*`** として配布します。利用者のログイン・トークンは不要です。

## npmjs.com の登録状況（2026-09-27）

**25件は登録・認証なしインストール検証済みです。** `rs-image@0.9.0` も利用できます。

以下の7件は npm 側の公開レート制限（429）により初回登録待ちです。現時点では npmjs.com からインストールできません。

`rs-sign` / `rs-slider` / `rs-splitter` / `rs-text-animation` / `rs-tour` / `rs-tree` / `rs-upload`

登録待ちの間も GitHub Pages のデモ・既存の GitHub 配布物は利用できます。登録が完了したらこの記録を更新します。

## tarball の復旧と更新（2026-11-01）

- `rs-image-0.6.0.tgz` は過去の Git blob をそのまま復元しました。既存 lockfile の `sha512-T1mutL/JtUSMDlFaCXRVR/YRGFFmFcYdUbw07MYZ7ZEAku0nsfJATlJFDxAVe86kXRR7qzN8zO26esVKcQNt5g==` と一致します。画像エディタを 0.8.0 / 0.9.0 に更新する必要はありません。
- `rs-slider` の現行実装は `0.1.1` として別 tarball にしました。既存の `rs-slider-0.1.0.tgz` は変更しません。`0.1.1` の npmjs.com 登録は現在、公開者の本人認証待ちです。
- 公開済み tarball は同名で上書きせず、古い版も残します。README・型定義だけの変更でも版番号を上げます。

旧 `@parelabo/rs-slider` の依存名・import を維持したまま更新する場合は、アプリの `package.json` を次のように変更して lockfile を再生成してください。

```json
"@parelabo/rs-slider": "https://github.com/sano1023/rs-package/raw/main/tarballs/rs-slider-0.1.1.tgz"
```

過去の差し替えの影響がある `rs-chart` / `rs-diagram` / `rs-lightbox` / `rs-tour` は、現在の配布内容を確認して lockfile の integrity を更新してください。別の空キャッシュを指定した `npm ci --cache <新しい一時ディレクトリ>` で再現性を検証できます。既存の共有 npm キャッシュを全削除する必要はありません。tarball の直接取得に GitHub Packages のトークンは不要ですが、アプリの別の依存が GitHub Packages を使用する場合、その取得には引き続き認証が必要です。

## 1. 新しい環境では設定不要

```bash
npm install @sano1023/rs-image
```

### 以前 GitHub Packages を設定した環境

使うアプリの `package.json` があるディレクトリで実行します。

```bash
npm config set @sano1023:registry=https://registry.npmjs.org/ --location=project
npm config get @sano1023:registry
```

プロジェクトの `.npmrc` には以下の行が入ります。これは認証情報を含まないので Git 管理できます。

```ini
@sano1023:registry=https://registry.npmjs.org/
```

既存の `package-lock.json` が GitHub Packages の URL を保持している場合、設定変更だけでは取得先が変わりません。該当パッケージを一度アンインストールしてから、必要なバージョンを指定して再インストールし、lockfile もコミットしてください。

```bash
npm uninstall @sano1023/rs-image
npm install @sano1023/rs-image@0.9.0
```

複数の rs-* を利用している場合はまとめて削除・再インストールします。GitHub Packages 側の既存パッケージは残っていますが、新しい標準の配布先は npmjs.com です。

## 2. 必要なパッケージをインストール

使うアプリの `package.json` があるディレクトリで、必要なものだけを実行します。

| ライブラリ・API資料 | インストールコマンド |
|---|---|
| [rs-baslider](./rs-baslider/README.md) | `npm install @sano1023/rs-baslider` |
| [rs-calendar](./rs-calendar/README.md) | `npm install @sano1023/rs-calendar` |
| [rs-chart](./rs-chart/README.md) | `npm install @sano1023/rs-chart` |
| [rs-cmdk](./rs-cmdk/README.md) | `npm install @sano1023/rs-cmdk` |
| [rs-datepicker](./rs-datepicker/README.md) | `npm install @sano1023/rs-datepicker` |
| [rs-diagram](./rs-diagram/README.md) | `npm install @sano1023/rs-diagram` |
| [rs-editor](./rs-editor/README.md) | `npm install @sano1023/rs-editor` |
| [rs-form](./rs-form/README.md) | `npm install @sano1023/rs-form` |
| [rs-gantt](./rs-gantt/README.md) | `npm install @sano1023/rs-gantt` |
| [rs-grid](./rs-grid/README.md) | `npm install @sano1023/rs-grid` |
| [rs-image](./rs-image/README.md) | `npm install @sano1023/rs-image` |
| [rs-kana](./rs-kana/README.md) | `npm install @sano1023/rs-kana` |
| [rs-kanban](./rs-kanban/README.md) | `npm install @sano1023/rs-kanban` |
| [rs-lightbox](./rs-lightbox/README.md) | `npm install @sano1023/rs-lightbox` |
| [rs-livecam](./rs-livecam/README.md) | `npm install @sano1023/rs-livecam` |
| [rs-notify](./rs-notify/README.md) | `npm install @sano1023/rs-notify` |
| [rs-pdf](./rs-pdf/README.md) | `npm install @sano1023/rs-pdf` |
| [rs-pivot](./rs-pivot/README.md) | `npm install @sano1023/rs-pivot` |
| [rs-player](./rs-player/README.md) | `npm install @sano1023/rs-player` |
| [rs-qrcode](./rs-qrcode/README.md) | `npm install @sano1023/rs-qrcode` |
| [rs-replay](./rs-replay/README.md) | `npm install @sano1023/rs-replay` |
| [rs-report](./rs-report/README.md) | `npm install @sano1023/rs-report` |
| [rs-scanner](./rs-scanner/README.md) | `npm install @sano1023/rs-scanner` |
| [rs-select](./rs-select/README.md) | `npm install @sano1023/rs-select` |
| [rs-sheet](./rs-sheet/README.md) | `npm install @sano1023/rs-sheet` |
| [rs-sign](./rs-sign/README.md)（初回登録待ち） | `npm install @sano1023/rs-sign` |
| [rs-slider](./rs-slider/README.md)（初回登録待ち） | `npm install @sano1023/rs-slider` |
| [rs-splitter](./rs-splitter/README.md)（初回登録待ち） | `npm install @sano1023/rs-splitter` |
| [rs-text-animation](./rs-text-animation/README.md)（初回登録待ち） | `npm install @sano1023/rs-text-animation` |
| [rs-tour](./rs-tour/README.md)（初回登録待ち） | `npm install @sano1023/rs-tour` |
| [rs-tree](./rs-tree/README.md)（初回登録待ち） | `npm install @sano1023/rs-tree` |
| [rs-upload](./rs-upload/README.md)（初回登録待ち） | `npm install @sano1023/rs-upload` |

複数をまとめて指定することもできます。

```bash
npm install @sano1023/rs-image @sano1023/rs-upload
```

## 3. アプリから利用する

以下は Vite などのバンドラを使う例です。パッケージはビルド済みなので、利用者がこのライブラリのソースをコピーする必要はありません。

```js
import { createRSImageEditor } from '@sano1023/rs-image';
import '@sano1023/rs-image/rs-image.css';

const editor = createRSImageEditor('#editor', { height: 460 });
```

### Vue 3 / React

ラッパーを提供するパッケージでは `/vue` または `/react` を使います。Vue / React 本体はアプリ側でインストールしてください。

```js
// Vue 3
import { RsImageEditor } from '@sano1023/rs-image/vue';
import '@sano1023/rs-image/rs-image.css';
```

```jsx
// React
import { RsImageEditor } from '@sano1023/rs-image/react';
import '@sano1023/rs-image/rs-image.css';

export default function App() {
  return <RsImageEditor />;
}
```

CSS が不要なパッケージもあります。各 README の API 名・CSS・ラッパーの有無を確認してください。ブラウザで直接 HTML を開く場合、裸のパッケージ名はそのまま解決されません。下記の CDN を使えます。

## 4. バージョン指定・更新

```bash
# 登録済みバージョンを確認
npm view @sano1023/rs-image versions --json --registry=https://registry.npmjs.org/

# 特定のバージョンを固定
npm install --save-exact @sano1023/rs-image@0.9.0

# package.json の指定範囲内で更新
npm update @sano1023/rs-image

# 最新版に切り替える
npm install @sano1023/rs-image@latest
```

アプリ側の `package.json` と `package-lock.json` を合わせて管理してください。旧 `@parelabo/rs-*` を利用していた場合は、依存を `@sano1023/rs-*` に入れ替え、JavaScript / CSS の import も変更します。

## tarball・CDN で利用する場合

公開リポジトリの tarball を直接指定する方法も使えます。

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-image-0.9.0.tgz
```

ビルド環境を使わない HTML では CDN から読み込めます。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sano1023/rs-package@main/rs-image/dist/rs-image.css">
<div id="editor"></div>
<script src="https://cdn.jsdelivr.net/gh/sano1023/rs-package@main/rs-image/dist/rs-image.min.js"></script>
<script>
  RSImage.createRSImageEditor('#editor', { height: 460 });
</script>
```

`@main` は配布リポジトリの更新に追従します。固定する場合は GitHub のコミット SHA に置き換えてください。

## よくあるエラー

| 症状 | 確認すること |
|---|---|
| GitHub 側で `401` / `403` | 旧レジストリ設定または lockfile が残っています。上記の移行手順を実行してください |
| npm 側で `401` | npmjs.com 用の古い認証設定が残っていないか確認。公開パッケージの取得にログインは不要です |
| `404` | パッケージ名・バージョン・取得先レジストリを確認 |
| React / Vue の取得が GitHub 側で `404` | 全体の registry が GitHub に向いていないか確認 |

公開する側の作業はソースリポジトリの `PUBLISHING.md` を参照してください。

公式資料: [npm の公開パッケージ](https://docs.npmjs.com/about-public-packages/)
