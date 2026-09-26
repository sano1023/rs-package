> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm login --scope=@sano1023 --auth-type=legacy --registry=https://npm.pkg.github.com
npm config set @sano1023:registry=https://npm.pkg.github.com --location=user
npm install @sano1023/rs-cmdk
```

> GitHub Packages から配布しています。public パッケージもインストールには GitHub 認証が必要です。ログイン時の Password には read:packages 権限を持つ personal access token (classic) を使用します。認証不要の導入には、下記の GitHub tarball または CDN を利用できます。

認証・更新の詳細は [共通インストール手順](https://github.com/sano1023/rs-package/blob/main/INSTALLING.md) を参照してください。登録済みバージョンは [GitHub Packages 一覧](https://github.com/sano1023?tab=packages&repo_name=rs-package) で確認できます。以下のパッケージ名による import は Vite などのバンドラ向けです。

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-cmdk-0.1.0.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSCmdk } from '@sano1023/rs-cmdk';
import '@sano1023/rs-cmdk/rs-cmdk.css';   // スタイル（バンドラ経由）

createRSCmdk({ commands });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sano1023/rs-package@main/rs-cmdk/dist/rs-cmdk.css">
<script src="https://cdn.jsdelivr.net/gh/sano1023/rs-package@main/rs-cmdk/dist/rs-cmdk.min.js"></script>
<script>
  // 公開APIはグローバル RSCmdk に載る
  RSCmdk.createRSCmdk({ commands });
</script>
```

---

# rs-cmdk

依存ゼロ・フレームワーク非依存の**コマンドパレット**（v0.1・Ctrl+K / ⌘K・kbar / cmdk 代替）。

- **日本語ファーストのファジー検索**: 「ほぞん / ホゾン / hozon」を同一視（かな正規化 + ローマ字→かな）。
  `kana`（ふりがな）と `keywords`（英語別名）にも一致
- **スコアリング**: 完全一致 > 前方一致 > 単語頭一致 > 部分一致、**最近使った順の加点**
  （`storageKey` 指定で localStorage に永続化）
- **ネストページ**: `children` を持つコマンドで階層化（「テーマ切替 › ダーク」）。Backspace / ← / Esc で戻る
- グループ見出し・アイコン・ショートカット表示（`<kbd>`）・disabled
- **Ctrl+K / ⌘K で開閉**（`hotkey` 変更可・`open()` で手動起動）・↑↓ Enter Esc・WAI-ARIA dialog/combobox
- 命令的 API（ラッパー不要）・SSR 安全・CSS 変数テーマ・MIT

```js
import { createRSCmdk } from '@sano1023/rs-cmdk';
import '@sano1023/rs-cmdk/rs-cmdk.css';
```

## 使い方

```js
import { createRSCmdk } from '@sano1023/rs-cmdk';
// CSS: <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sano1023/rs-package@main/rs-cmdk/dist/rs-cmdk.css">

const palette = createRSCmdk({
    storageKey: 'my-app-cmdk',                  // 最近使った順を保存
    commands: [
        { id: 'new', label: '新規作成', kana: 'しんきさくせい', icon: '＋',
          shortcut: 'Ctrl+N', group: 'ファイル', run: () => createNew() },
        { id: 'save', label: '保存', kana: 'ほぞん', group: 'ファイル', run: () => save() },
        { id: 'theme', label: 'テーマ切替', children: [                 // ネストページ
            { id: 'light', label: 'ライト', run: () => setTheme('light') },
            { id: 'dark', label: 'ダーク', run: () => setTheme('dark') },
        ]},
    ],
});

palette.open(); palette.close(); palette.toggle();
palette.setCommands(nextCommands);              // 動的差し替え
palette.destroy();                              // ホットキー解除
```

### 純ロジック API（node でも動く）

```js
import { rankItems, scoreItem } from '@sano1023/rs-cmdk';
rankItems(commands, 'hozon', recentIds);        // スコア降順
```

## テスト

```
node --test test/
```

## ライセンス

MIT
