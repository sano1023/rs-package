> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm install @sano1023/rs-select
```

npmjs.com の公開パッケージです。ログインやトークンは不要です。
更新・旧レジストリからの移行の詳細は [共通インストール手順](https://github.com/sano1023/rs-package/blob/main/INSTALLING.md) を参照してください。登録済みバージョンは [npm](https://www.npmjs.com/package/@sano1023/rs-select) で確認できます。以下のパッケージ名による import は Vite などのバンドラ向けです。

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-select-0.1.0.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSSelect } from '@sano1023/rs-select';
import '@sano1023/rs-select/rs-select.css';   // スタイル（バンドラ経由）

createRSSelect(document.querySelector('#app'), { items, /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sano1023/rs-select@0.1.0/dist/rs-select.css">
<script src="https://cdn.jsdelivr.net/npm/@sano1023/rs-select@0.1.0/dist/rs-select.min.js"></script>
<script>
  // 公開APIはグローバル RSSelect に載る
  RSSelect.createRSSelect(document.querySelector('#app'), { items, /* オプション */ });
</script>
```

### Vue 3

```js
import { RsSelect } from '@sano1023/rs-select/vue';
import '@sano1023/rs-select/rs-select.css';   // スタイル（バンドラ経由）
```

```vue
<template>
  <RsSelect />
</template>
```

### React 18 / 19

```jsx
import { RsSelect } from '@sano1023/rs-select/react';
import '@sano1023/rs-select/rs-select.css';   // スタイル（バンドラ経由）

export default function App() {
  return <RsSelect />;
}
```

> `vue` / `react` は peerDependency です（バンドルには含みません）。アプリ側のものが使われます。

---

# rs-select

依存ゼロ・フレームワーク非依存の**高機能セレクトボックス**（v0.1）。

- **日本語ファーストの検索**: 「とうきょう / トウキョウ / ﾄｳｷｮｳ / toukyou / tokyo」をすべて同一視。
  かな正規化（カナ→かな・全半角・半角カナ濁点合成・大小）＋**ローマ字→かな変換**（ヘボン式/訓令式・促音・撥音）。
  候補に `kana`（ふりがな）を持たせると漢字ラベルにも当たる
- **既存 `<select>` の拡張**（progressive enhancement）: 値は元の `<select>` に同期＝**フォーム送信がそのまま動く**。
  `<optgroup>`・`data-kana`・selected を引き継ぎ、destroy で元に戻る
- **複数選択タグ**（× で削除・Backspace で末尾削除）・**タグ作成**（`allowCreate` →「◯◯を追加」・`create` イベント）
- **非同期候補**: `load: async (query) => items` — debounce・スピナー・**古い応答の破棄**（レースしない）
- **仮想リスト**: 候補が閾値（既定100）を超えると自動でウィンドウ描画。1万件でも軽快
- **WAI-ARIA combobox** パターン（combobox / listbox / option・aria-activedescendant）・
  キーボード完備（↑↓ Enter Esc Tab・タイプで即検索）
- グループ見出し・disabled 候補・クリアボタン・プレースホルダ・CSS 変数テーマ
- Vue 3 / React ラッパー（v-model 対応）・MIT

```js
import { matches, normalizeForSearch, romajiToHiragana } from '@sano1023/rs-select';
import '@sano1023/rs-select/rs-select.css';
```

## 使い方

```html
<!-- 既存の <select> をそのまま強化 -->
<select name="pref" id="pref">
    <optgroup label="関東">
        <option value="13" data-kana="とうきょうと">東京都</option>
    </optgroup>
</select>
<script type="module">
    import { createRSSelect } from '@sano1023/rs-select';
    createRSSelect('#pref');
</script>
```

```js
// items 配列（コンテナ要素に生成）
const sel = createRSSelect('#host', {
    multiple: true,
    allowCreate: true,
    placeholder: 'タグを追加…',
    items: [
        { value: '13', label: '東京都', kana: 'とうきょうと', group: '関東' },
        { value: '27', label: '大阪府', kana: 'おおさかふ', group: '近畿' },
    ],
    onChange: ({ value }) => console.log(value),
});

// 非同期候補（社員検索など）
createRSSelect('#staff', {
    load: async (query) => fetch(`/api/staff?q=${encodeURIComponent(query)}`).then((r) => r.json()),
});

sel.getValue(); sel.setValue(['13', '27']);
sel.setItems(nextItems); sel.open(); sel.close(); sel.setDisabled(true);
```

### 純ロジック API（node でも動く）

```js
import { matches, normalizeForSearch, romajiToHiragana } from '@sano1023/rs-select';
matches({ label: '東京都', kana: 'とうきょうと' }, 'toukyou');   // true
```

## Vue / React

```js
import { RsSelect } from '@sano1023/rs-select/vue';    // <RsSelect v-model="value" :items="items" :options="{ multiple: true }" />
import { RsSelect } from '@sano1023/rs-select/react';  // <RsSelect items={items} value={value} onChange={...} ref={ref} />
```

## テスト

```
node --test test/
```

## ライセンス

MIT
