> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm login --scope=@sano1023 --auth-type=legacy --registry=https://npm.pkg.github.com
npm config set @sano1023:registry=https://npm.pkg.github.com --location=user
npm install @sano1023/rs-kanban
```

> GitHub Packages から配布しています。public パッケージもインストールには GitHub 認証が必要です。ログイン時の Password には read:packages 権限を持つ personal access token (classic) を使用します。認証不要の導入には、下記の GitHub tarball または CDN を利用できます。

認証・更新の詳細は [共通インストール手順](https://github.com/sano1023/rs-package/blob/main/INSTALLING.md) を参照してください。登録済みバージョンは [GitHub Packages 一覧](https://github.com/sano1023?tab=packages&repo_name=rs-package) で確認できます。以下のパッケージ名による import は Vite などのバンドラ向けです。

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-kanban-0.2.0.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSKanban } from '@sano1023/rs-kanban';
import '@sano1023/rs-kanban/rs-kanban.css';   // スタイル（バンドラ経由）

createRSKanban(document.querySelector('#app'), { columns, cards, /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sano1023/rs-package@main/rs-kanban/dist/rs-kanban.css">
<script src="https://cdn.jsdelivr.net/gh/sano1023/rs-package@main/rs-kanban/dist/rs-kanban.min.js"></script>
<script>
  // 公開APIはグローバル RSKanban に載る
  RSKanban.createRSKanban(document.querySelector('#app'), { columns, cards, /* オプション */ });
</script>
```

### Vue 3

```js
import { RsKanban } from '@sano1023/rs-kanban/vue';
import '@sano1023/rs-kanban/rs-kanban.css';   // スタイル（バンドラ経由）
```

```vue
<template>
  <RsKanban />
</template>
```

### React 18 / 19

```jsx
import { RsKanban } from '@sano1023/rs-kanban/react';
import '@sano1023/rs-kanban/rs-kanban.css';   // スタイル（バンドラ経由）

export default function App() {
  return <RsKanban />;
}
```

> `vue` / `react` は peerDependency です（バンドルには含みません）。アプリ側のものが使われます。

---

# rs-kanban

依存ゼロ・フレームワーク非依存の**カンバンボード**（v0.2・Trello 風 UI）。

- **ドラッグ&ドロップ**: 列間移動・列内並べ替え（プレースホルダ表示・ポインタイベント・タッチ対応）
- **WIP 制限**: `wip: 3` を超える列へのドロップを拒否 → `blocked` イベント。バッジに `2/3` 表示・満杯で赤
- **スイムレーン**: カードの `lane` で横帯に分割（レーン跨ぎのドラッグも可）
- **絞り込み**: テキスト・タグ・担当者（`setFilter`）
- **undo / redo**・インラインカード追加（＋ボタン → 入力 → Enter）
- **`revert()` つき cardMove**: サーバ保存に失敗したら丸ごと戻せる
- **ボード操作は純関数**（model.js）: 移動・WIP 判定・絞り込みを node 単体テストで固定（15件）
- カードのタグ / 担当者 / 期限 / 色・列の色・CSS 変数テーマ・キーボード（Tab + Enter でカードを開く）
- Vue 3 / React ラッパー同梱・MIT

**v0.2 の追加**
- **カード詳細ポップオーバー**: クリックで タイトル/説明/担当/期限/タグ を編集・削除（Esc/外側クリックで閉じる）。`popover: false` で無効化
- **列の管理**: `addColumn / removeColumn（カードは隣列へ退避）/ moveColumn / toggleColumn` API と列メニュー▾（左右移動・折りたたみ・削除）
- **列の折りたたみ**: 縦書きバー（件数つき）にしてボードを広く使える
- **タグ色**: `tagColors: { 急ぎ: '#dc2626' }` でチップに色

```js
import { createRSKanban } from '@sano1023/rs-kanban';
import '@sano1023/rs-kanban/rs-kanban.css';
```

## 使い方

```js
import { createRSKanban } from '@sano1023/rs-kanban';
// CSS: <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sano1023/rs-package@main/rs-kanban/dist/rs-kanban.css">

const board = createRSKanban('#board', {
    columns: [
        { id: 'todo', title: 'ToDo' },
        { id: 'doing', title: '進行中', wip: 3, color: '#2563eb' },   // WIP 制限
        { id: 'done', title: '完了', color: '#16a34a' },
    ],
    cards: [
        { id: 1, title: '要件整理', columnId: 'todo', tags: ['設計'], assignee: '佐藤', due: '8/5' },
        { id: 2, title: 'ログイン実装', columnId: 'doing', lane: '開発チーム', color: '#d97706' },
    ],
    onCardMove: ({ card, from, to, revert }) => saveToServer(card).catch(revert),
    onBlocked: ({ card, reason }) => reason === 'wip' && toast('WIP制限を超えます'),
    onCardClick: ({ card }) => openDetail(card),
});

board.addCard({ title: '新規', tags: ['急ぎ'] }, 'todo');
board.move(1, 'done', 0);                     // プログラム移動（ドラッグと同じ検証・イベント）
board.setFilter({ text: 'ログイン' });        // 絞り込み（tag / assignee も）
board.undo(); board.redo();
board.getBoard();                             // 保存用スナップショット
```

### 純ロジック API（node でも動く）

```js
import { normalizeBoard, moveCard, checkWip, filterCards } from '@sano1023/rs-kanban';
const { board: next, moved, reason } = moveCard(board, cardId, 'doing', 0);   // 純関数（元は不変）
```

## Vue / React

```js
import { RsKanban } from '@sano1023/rs-kanban/vue';    // <RsKanban :columns="columns" :cards="cards" @card-move="..." />
import { RsKanban } from '@sano1023/rs-kanban/react';  // <RsKanban columns={columns} cards={cards} onCardMove={...} ref={ref} />
```

## テスト

```
node --test test/
```

## ライセンス

MIT
