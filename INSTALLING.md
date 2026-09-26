# ライブラリのインストール・更新

このコレクションのパッケージは **GitHub Packages** (`https://npm.pkg.github.com`) を配布先とし、名前を **`@sano1023/rs-*`** に統一しています。npmjs.com のアカウントは不要です。

この一覧はインストール名・手順の案内です。各バージョンが登録済みかどうかは [GitHub Packages 一覧](https://github.com/sano1023?tab=packages&repo_name=rs-package) で確認してください。README や配布用ファイルの更新だけではレジストリに登録されません。

## 1. 初回のみ: GitHub 認証とレジストリ設定

1. GitHub にログインし、[personal access token (classic)](https://github.com/settings/tokens) を作成します。インストール用には **`read:packages`** 権限が必要です。
2. 次のコマンドを実行します。Username は自分の GitHub ユーザー名、Password は作成したトークンです。

```bash
npm login --scope=@sano1023 --auth-type=legacy --registry=https://npm.pkg.github.com
npm config set @sano1023:registry=https://npm.pkg.github.com --location=user
```

**public のパッケージでも GitHub 認証が必要です。** トークンをアプリのソースや Git 管理対象ファイルに書かないでください。`npm login` のユーザー設定を利用します。

`@sano1023` だけを GitHub Packages に向けます。全体の `registry` は変更しません。React / Vue などは通常の npm レジストリから取得します。

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
| [rs-sign](./rs-sign/README.md) | `npm install @sano1023/rs-sign` |
| [rs-slider](./rs-slider/README.md) | `npm install @sano1023/rs-slider` |
| [rs-splitter](./rs-splitter/README.md) | `npm install @sano1023/rs-splitter` |
| [rs-text-animation](./rs-text-animation/README.md) | `npm install @sano1023/rs-text-animation` |
| [rs-tour](./rs-tour/README.md) | `npm install @sano1023/rs-tour` |
| [rs-tree](./rs-tree/README.md) | `npm install @sano1023/rs-tree` |
| [rs-upload](./rs-upload/README.md) | `npm install @sano1023/rs-upload` |

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
npm view @sano1023/rs-image versions --json --registry=https://npm.pkg.github.com

# 特定のバージョンを固定
npm install --save-exact @sano1023/rs-image@0.8.0

# package.json の指定範囲内で更新
npm update @sano1023/rs-image

# 最新版に切り替える
npm install @sano1023/rs-image@latest
```

アプリ側の `package.json` と `package-lock.json` を合わせて管理してください。旧 `@parelabo/rs-*` を利用していた場合は、依存を `@sano1023/rs-*` に入れ替え、JavaScript / CSS の import も変更します。

## GitHub 認証なしで利用する場合

公開リポジトリの tarball を直接指定する方法も使えます。

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-image-0.8.0.tgz
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
| `401` / `ENEEDAUTH` | GitHub Packages にログイン済みか、トークンが期限切れでないか |
| `403` | `read:packages` 権限と、private パッケージの場合は閲覧権限 |
| `404` | `@sano1023` のレジストリ設定、パッケージ名、登録済みバージョン、閲覧権限 |
| React / Vue の取得が GitHub 側で `404` | 全体の registry を GitHub に変更していないか。スコープ別に設定する |
| GitHub のパッケージページが `404` | private の場合は所有者または閲覧権限のある GitHub アカウントでログインする |

公開する側の作業はソースリポジトリの `PUBLISHING.md` を参照してください。

公式資料: [GitHub Packages の npm レジストリ](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry)
