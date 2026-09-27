> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm login --scope=@sano1023 --auth-type=legacy --registry=https://npm.pkg.github.com
npm config set @sano1023:registry=https://npm.pkg.github.com --location=user
npm install @sano1023/rs-tree
```

> GitHub Packages から配布しています。public パッケージもインストールには GitHub 認証が必要です。ログイン時の Password には read:packages 権限を持つ personal access token (classic) を使用します。認証不要の導入には、下記の GitHub tarball または CDN を利用できます。

認証・更新の詳細は [共通インストール手順](https://github.com/sano1023/rs-package/blob/main/INSTALLING.md) を参照してください。登録済みバージョンは [GitHub Packages 一覧](https://github.com/sano1023?tab=packages&repo_name=rs-package) で確認できます。以下のパッケージ名による import は Vite などのバンドラ向けです。

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-tree-0.2.1.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSTree } from '@sano1023/rs-tree';
import '@sano1023/rs-tree/rs-tree.css';   // スタイル（バンドラ経由）

createRSTree(document.querySelector('#app'), { nodes, /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sano1023/rs-package@main/rs-tree/dist/rs-tree.css">
<script src="https://cdn.jsdelivr.net/gh/sano1023/rs-package@main/rs-tree/dist/rs-tree.min.js"></script>
<script>
  // 公開APIはグローバル RSTree に載る
  RSTree.createRSTree(document.querySelector('#app'), { nodes, /* オプション */ });
</script>
```

### Vue 3

```js
import { RsTree } from '@sano1023/rs-tree/vue';
import '@sano1023/rs-tree/rs-tree.css';   // スタイル（バンドラ経由）
```

```vue
<template>
  <RsTree />
</template>
```

### React 18 / 19

```jsx
import { RsTree } from '@sano1023/rs-tree/react';
import '@sano1023/rs-tree/rs-tree.css';   // スタイル（バンドラ経由）

export default function App() {
  return <RsTree />;
}
```

> `vue` / `react` は peerDependency です（バンドルには含みません）。アプリ側のものが使われます。

---

# rs-tree

依存ゼロ・フレームワーク非依存の**ツリービュー**（v0.2）。

- **三態チェックボックス**: チェックは子孫へカスケード、祖先は自動で中間状態（indeterminate）
- **D&D 移動**: 行の上下 1/4 = 並べ替え・中央 = 子にする。**自分の子孫への移動（循環）は拒否**して `blocked`
- **遅延読込**: `lazy: true` のノードを展開すると `loadChildren(node)` を await して子を取得（失敗時は閉じてリトライ可能）
- **仮想スクロール**: 可視行が閾値（既定200）を超えると自動で固定行高ウィンドウ描画に切替。**1万ノードでも DOM は可視域のみ**
- **検索**: `search('東京')` — ヒットをハイライトし、表示に必要な祖先を自動展開
- **キーボード完備**: ↑↓（移動）・→（展開）・←（折りたたみ/親へ）・Home/End・Enter（選択）・Space（チェック）
- **`revert()` つき nodeMove**・複数選択（Ctrl+クリック）・disabled ノード・アイコン・入れ子 JSON 往復（`toNodes()`）
- **ツリー操作は純関数群**（model.js）: 三態チェック・移動（循環判定）・検索を node 単体テストで固定（14件）
- Vue 3 / React ラッパー同梱・MIT

**v0.2.1 の修正**
- 仮想スクロール中の再描画でスクロール位置が先頭へ戻る不具合を修正。末尾のノードまでスクロールできます。

**v0.2 の追加**
- **インライン名前変更**: F2 / ラベルのダブルクリック（`renamable: true`）→ Enter 確定・Esc 取消・`rename` イベント・`rename()/startRename()` API
- **コンテキストメニュー**: `contextMenu: true` で組み込み（名前変更/子を追加/削除）、関数指定で独自メニュー（右クリック・Esc/外側クリックで閉じる）
- ドラッグ中の**端自動スクロール**（スクロールコンテナ時）

```js
import { createRSTree } from '@sano1023/rs-tree';
import '@sano1023/rs-tree/rs-tree.css';
```

## 使い方

```js
import { createRSTree } from '@sano1023/rs-tree';
// CSS: <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sano1023/rs-package@main/rs-tree/dist/rs-tree.css">

const tree = createRSTree('#tree', {
    checkboxes: true,
    draggable: true,
    nodes: [
        { id: 'sales', label: '営業部', expanded: true, children: [
            { id: 's1', label: '第一課' },
            { id: 's2', label: '第二課', children: [{ id: 's2a', label: '東京チーム' }] },
        ]},
        { id: 'docs', label: '共有フォルダ', lazy: true },      // 遅延読込
    ],
    loadChildren: async (node) => fetch(`/api/children/${node.id}`).then((r) => r.json()),
    onSelect: ({ node }) => openDetail(node),
    onCheck: ({ checkedIds }) => console.log(checkedIds),
    onNodeMove: ({ node, revert }) => saveToServer(node).catch(revert),
});

tree.expand('sales'); tree.expandAll(); tree.collapseAll();
tree.setChecked('s2', true); tree.getChecked();       // ['s2', 's2a']
tree.search('東京');                                   // ハイライト + 祖先展開
tree.addNode({ label: '新規' }, 'sales', 0);
tree.move('s1', 'dev', 0);                             // 循環は false + blocked
tree.toNodes();                                        // 入れ子 JSON（保存用）
```

### 純ロジック API（node でも動く）

```js
import { normalizeTree, applyCheck, moveNode, searchTree, visibleList } from '@sano1023/rs-tree';
```

## Vue / React

```js
import { RsTree } from '@sano1023/rs-tree/vue';    // <RsTree :nodes="nodes" :options="{ checkboxes: true }" @check="..." />
import { RsTree } from '@sano1023/rs-tree/react';  // <RsTree nodes={nodes} options={{}} onCheck={...} ref={ref} />
```

## テスト

```
node --test test/
```

## ライセンス

MIT
