> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm install @sano1023/rs-editor
```

npmjs.com の公開パッケージです。ログインやトークンは不要です。
更新・旧レジストリからの移行の詳細は [共通インストール手順](https://github.com/sano1023/rs-package/blob/main/INSTALLING.md) を参照してください。登録済みバージョンは [npm](https://www.npmjs.com/package/@sano1023/rs-editor) で確認できます。以下のパッケージ名による import は Vite などのバンドラ向けです。

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-editor-0.10.1.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSEditor } from '@sano1023/rs-editor';
import '@sano1023/rs-editor/rs-editor.css';   // スタイル（バンドラ経由）

createRSEditor(document.querySelector('#app'), { /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sano1023/rs-editor@0.10.1/dist/rs-editor.css">
<script src="https://cdn.jsdelivr.net/npm/@sano1023/rs-editor@0.10.1/dist/rs-editor.min.js"></script>
<script>
  // 公開APIはグローバル RSEditor に載る
  RSEditor.createRSEditor(document.querySelector('#app'), { /* オプション */ });
</script>
```

### Vue 3

```js
import { RsEditor } from '@sano1023/rs-editor/vue';
import '@sano1023/rs-editor/rs-editor.css';   // スタイル（バンドラ経由）
```

```vue
<template>
  <RsEditor />
</template>
```

### React 18 / 19

```jsx
import { RsEditor } from '@sano1023/rs-editor/react';
import '@sano1023/rs-editor/rs-editor.css';   // スタイル（バンドラ経由）

export default function App() {
  return <RsEditor />;
}
```

> `vue` / `react` は peerDependency です（バンドルには含みません）。アプリ側のものが使われます。

---

# rs-editor

プラグインアーキテクチャを持つ、依存ゼロのWYSIWYGエディタライブラリです（現在 v0.10.1）。

- **依存ゼロ**: ランタイム依存なし。ビルド済みの ESモジュールをパッケージから import できる
- **プラグインアーキテクチャ**: 太字などの組み込み機能もすべて同じプラグインAPIで実装（利用者が数行で機能を追加できる）
- **HTML / JSON 両対応**: `getHTML()/setHTML()` に加え、構造化JSONでの入出力（`getJSON()/setJSON()`）をサポート。ラウンドトリップ保証つき
- **日本語IME対応**: composition 中は DOM に触れず、`onChange` も発火しない。「1変換 = 1履歴」で undo できる
- **`document.execCommand` 不使用**: Selection / Range API とドキュメントモデル変形による自前実装
- **v0.2 の追加機能**: テーブル / 文字色・背景色 / 配置・インデント / 画像アップロード連携・リサイズハンドル / フローティングツールバー / Markdownショートカット / Word・Googleドキュメント貼り付けの高度な浄化
- **v0.3 の拡張プラグイン（opt-in）**: 定番の拡張機能を13本収録（下記）。すべて公開プラグインAPIだけで実装されており、同じ書き方で独自プラグインを作れる
- **v0.5 のブロック体験（opt-in）**: **スラッシュコマンド**（空段落で `/` → ブロック挿入メニュー・文字入力で絞り込み・↑↓Enter操作）／**チェックリスト**（☑クリックでトグル）／**コールアウト**（💡情報・⚠️注意・✅成功・📝メモの色付きボックス）／**ブロックのドラッグ並べ替え**（⠿ハンドル・undo対応）
- **v0.5 の上位プラグイン（opt-in）**: **コメント**（選択範囲にアンカー・サイドパネルで一覧/解決・HTML属性だけで保存されるので外部ストア不要）／**脚注**（自動採番・文末リストに自動同期）／**フォーマットペインター**（書式コピー→次の選択に適用）／**リビジョン履歴**（版の保存・単語レベル差分・復元）— いずれも opt-in で追加できます
- **v0.6 の追加（opt-in）**: **区切り線（divider）** — 色・太さ・線種（実線/破線/点線/二重線）・幅を指定できる `<hr>`。プリセットのドロップダウン＋プレビュー付きダイアログ、本文の区切り線はクリック選択→ダブルクリックで編集・Backspaceで削除
- **v0.10 のシンプルUI（スマホ向け）**: 固定ツールバーを出さず、**空の行の丸ボタン**（写真・区切り線・「＋」メニュー）と**選択時の装飾バー**だけで書ける note 風のUI。ボタンの並びは通常UIとは別に設定できる。`editor.setUI('simple' | 'standard')` で通常UIと切り替えられ、本文・履歴・保存形式は共通（→ [使い方](#v0100-シンプルuiスマホ向けとui切替)）
- **v0.5 の日本語特化（opt-in）**: **ルビ**（ふりがな挿入・クリック編集）／**文字種変換**（全半角・ひらカタ・半角カナ→全角）／**かんたん校正**（全角英数・半角カナ・句読点混在・カタカナ長音ゆれ・ら抜き言葉を辞書レスで検出、ワンクリック/一括修正）／**縦書きプレビュー**
- **ライセンス**: 無償（商用可）。改変・再配布不可。詳細は [LICENSE.txt](./LICENSE.txt) を参照してください。

対応ブラウザ: 最新の Chrome / Edge / Safari / Firefox（IE・旧ブラウザは非対応）

## デモ

```bash
# このリポジトリで
php -S localhost:8099   # または任意の静的サーバー
# → http://localhost:8099/rs-editor/demo/ を開く
```

デモでは全ツールバー機能・カスタムプラグイン（⭐スタンプ）・HTML/JSON出力のリアルタイム表示・ラウンドトリップ検査・readonly / destroy を試せます。

```js
import { createRSEditor } from '@sano1023/rs-editor';
import '@sano1023/rs-editor/rs-editor.css';
```

## クイックスタート

```html
<textarea id="content"><p>初期コンテンツ</p></textarea>
```

```js
import { createRSEditor } from '@sano1023/rs-editor';

const editor = createRSEditor('#content', {
    // ツールバー定義文字列（'|' はセパレータ）
    toolbar: 'undo redo | bold italic underline | h1 h2 | bullist numlist | link image | code',
    placeholder: '本文を入力…',
    onChange: (html) => console.log(html),
});

editor.getHTML();              // '<p>…</p>'
editor.setHTML('<p>hello</p>');
editor.getJSON();              // 構造化JSON（下記）
editor.setJSON(savedJson);     // JSONから復元
editor.destroy();              // 元の textarea / div に戻す
```

対象要素が `textarea` の場合は編集内容が自動で `value` に同期されます（フォーム送信にそのまま使える）。`div` も指定可能です。

## API

### `createRSEditor(target, config): Editor`

| オプション | 型 / 既定値 | 説明 |
|---|---|---|
| `toolbar` | string | ツールバー定義。既定は全標準ボタン。`'|'` がセパレータ |
| `plugins` | `Plugin[]` | 追加プラグイン（標準プラグインは常に読み込まれる） |
| `placeholder` | string | 空のときに表示する文言 |
| `readonly` | `false` | 読み取り専用で開始 |
| `content` | string | 初期HTML（省略時は対象要素の値/内容） |
| `onChange` | `(html) => void` | 内容変更時（IME変換中は発火しない） |
| `imageUploadHandler` | `(file) => Promise<url>` | 画像アップロード連携。設定すると画像ダイアログのファイル選択・画像ファイルのペースト/ドロップが有効になる |
| `floatingToolbar` | string \| `false` | 選択時ポップアップのボタン定義。既定 `'bold italic underline strikethrough | link'`、`false` で無効化 |
| `insertToolbar` | string \| `false` | 空の行にキャレットがあるとき、行の横に出す挿入ボタン。既定 `false`（通常UIでは出さない） |
| `insertPlacement` | `'auto'` \| `'inline'` | 挿入ボタンの位置。`'auto'` は左に余白があれば行の左外、なければ行の右端。`'inline'` は常に行の右端 |
| `ui` | `'standard'` \| `'simple'` | 最初に表示するUI。`'simple'` はスマホ向けのシンプルUI（[v0.10.0](#v0100-シンプルuiスマホ向けとui切替)） |
| `simple` | `{ toolbar, floatingToolbar, insertToolbar }` | シンプルUI側のボタン定義（省略時は既定のシンプルUI） |

### Editor メソッド

| メソッド | 説明 |
|---|---|
| `getHTML()` / `setHTML(html)` | HTML入出力。入力はホワイトリスト方式でサニタイズされる |
| `getJSON()` / `setJSON(json)` | 構造化JSON入出力。`setJSON(getJSON())` は完全一致（ラウンドトリップ保証） |
| `insertContent(html)` | キャレット位置へ挿入（サニタイズ込み） |
| `getText()` | プレーンテキスト取得 |
| `undo()` / `redo()` | 独自履歴スタックによる undo / redo |
| `focus()` / `setReadonly(v)` / `destroy()` | 基本操作 |
| `toggleSource(force?)` | WYSIWYG ⇔ HTMLソース編集の切替 |
| `exec(name)` / `isActive(name)` | ツールバーボタンの実行 / 押下状態 |
| `setUI(name)` / `ui` | UIの切替（`'standard'` / `'simple'`）と現在のUI。本文・選択・undo/redo 履歴は維持 |
| `on(event, cb)` / `off(event, cb)` | `change` `selectionchange` `focus` `blur` `init` `destroy` `sourcemode` `uichange` |
| `commands.*` | プラグイン向けコマンド群（`toggleMark` `setHeading` `toggleList` `setLink` `setColor` `setBgColor` `setAlign` `indent` `outdent` `insertTable` `tableAddRow/Col` `tableDeleteRow/Col` `tableDelete` など） |

### 標準ツールバーボタン

`undo redo bold italic underline strikethrough forecolor backcolor h1 h2 h3 heading paragraph alignleft aligncenter alignright blockquote codeblock bullist numlist outdent indent link unlink image photo table code`

- `forecolor` / `backcolor` はパレットのドロップダウン（「色を解除」つき）
- `table` はドロップダウンで挿入・行/列の追加削除・表の削除。セル内は `Tab / Shift+Tab` で移動し、最終セルの `Tab` は行を追加
- `indent` / `outdent` はリスト内ではネスト操作、段落・見出しではインデント（最大8段）
- 画像はクリックで選択し、右下ハンドルのドラッグでリサイズ（width属性・縦横比維持）
- 定義の中に `...` を書くと、それより後ろのボタンは「…」メニューにまとまる（v0.10。例: `'undo redo | bold italic ... table media code'`）
- `heading` はレベルを選ばない見出しボタン（段落 ⇔ h2）。`photo` はダイアログを挟まず端末の写真・画像ファイルを選んでアップロードする（`imageUploadHandler` が必要）。どちらもシンプルUIの既定ボタン

ショートカット: `Ctrl+B/I/U`（太字/斜体/下線）、`Ctrl+Shift+X`（取り消し線）、`Ctrl+K`（リンク）、`Ctrl+Z / Ctrl+Y`（undo/redo）、リスト内 `Tab / Shift+Tab`（ネスト/解除）。コードブロック内は `Enter` で改行、空行でもう一度 `Enter` すると抜けます。引用内も空行で `Enter` すると引用の外に出ます（途中なら引用が分割される）。

### Markdown ショートカット

行頭で入力すると変換されます: `# ` `## ` `### `（見出し）、`- ` / `* `（箇条書き）、`1. `（番号付き）、`> `（引用）、`` ``` ``（コードブロック）。

### 拡張プラグイン（v0.3・opt-in）

標準では読み込まれません。使うものだけ import して `plugins` に渡し、ボタン名をツールバー定義に足します。

```js
import { charmap } from '@sano1023/rs-editor/plugins/charmap';
import { searchreplace } from '@sano1023/rs-editor/plugins/searchreplace';
import { wordcount } from '@sano1023/rs-editor/plugins/wordcount';

createRSEditor('#content', {
    toolbar: '… | charmap searchreplace',
    plugins: [charmap, searchreplace, wordcount],
});
```

| プラグイン | ボタン | 内容 |
|---|---|---|
| `charmap` | `charmap` | 特殊文字のグリッド挿入 |
| `emoticons` | `emoticons` | 絵文字のグリッド挿入 |
| `insertdatetime` | `insertdatetime` | 日付・時刻を各種形式で挿入 |
| `nonbreaking` | `nonbreaking` | NBSP挿入（Ctrl+Shift+Space） |
| `searchreplace` | `searchreplace` | 検索と置換（Ctrl+F・非モーダル・すべて置換対応） |
| `preview` | `preview` | 出力HTMLのプレビュー |
| `visualblocks` | `visualblocks` | ブロック構造の可視化トグル |
| `fullscreen` | `fullscreen` | 全画面編集（Ctrl+Shift+F / Esc解除） |
| `anchor` | `anchor` | ページ内アンカー `<a id>` の挿入（schema拡張の実例） |
| `media` | `media` | YouTube / Vimeo の埋め込み（許可ホスト外のiframeは破棄） |
| `wordcount` | なし | ステータスバーに文字数・単語数を表示 |
| `autolink` | なし | URL入力＋スペース/Enterで自動リンク化 |
| `autosave` | なし | localStorageへの下書き自動保存と復元バー（`autosaveKey` で保存キー指定） |
| `toc` | `toc` | 目次ブロックの挿入/削除。挿入位置はメニューで選択（カーソル位置 / 先頭=タイトル直下）。h2/h3 の2階層から自動生成。見出し ID を維持して更新・ページ内ジャンプに対応（v0.8.0 の詳細は下記） |

### 拡張プラグイン（v0.5・opt-in）

| プラグイン | ボタン | 内容 |
|---|---|---|
| `slashmenu` | なし | 空の段落で `/` を押すとブロック挿入メニュー（見出し/リスト/チェックリスト/引用/コード/表/コールアウト/画像/動画/目次）。文字入力で絞り込み・↑↓Enter・Esc。IME変換開始で自動クローズ |
| `checklist` | `checklist` | チェックリスト。`<li data-rse-check="0/1">` で保存され、☑部分のクリックでトグル（undo可） |
| `callout` | `callout` | コールアウト（情報/注意/成功/メモ）。段落属性 `data-rse-callout` なので中身は普通に編集できる |
| `dragblock` | なし | ホバーで⠿ハンドル表示→ドラッグで最上位ブロックを並べ替え（モデル変形なのでundo可） |
| `formatpainter` | `formatpainter` | 書式のコピー/適用。コピー元にキャレット→ボタン→適用先を選択（太字/斜体/下線/取り消し線/色を運ぶ） |
| `footnote` | `footnote` | 脚注。本文に `[n]` マーカー・文末に脚注リストを自動採番で同期。マーカークリックで編集/削除 |
| `comments` | `comment` | 範囲コメント。選択→ボタンで追加、右パネルに一覧（本文へジャンプ/解決）。`data-rse-comment(-data)` 属性でHTMLに内包保存 |
| `revisions` | `revisions` | リビジョン履歴。「版を保存」→ 一覧から**単語レベル差分**（追加=緑/削除=赤）表示・復元・削除（localStorage・`pluginOptions.revisions.key`） |
| `ruby` | `ruby` | ルビ（ふりがな）。選択→挿入、ルビクリックで編集/解除。`<ruby>漢字<rt>かんじ</rt></ruby>` |
| `jpconvert` | `jpconvert` | 文字種変換（選択範囲）: 全角英数⇔半角・ひらがな⇔カタカナ・半角カナ→全角 |
| `proofread` | `proofread` | 日本語かんたん校正。全角英数/半角カナ/句読点スタイル混在/カタカナ長音ゆれ/ら抜き言葉/連続空白を辞書レスで検出し、パネルからジャンプ・個別修正・一括修正 |
| `tategaki` | `tategaki` | 縦書きプレビュー（writing-mode: vertical-rl のオーバーレイ表示） |

### 拡張プラグイン（v0.6・opt-in）

| プラグイン | ボタン | 内容 |
|---|---|---|
| `divider` | `divider` | 区切り線（水平線）。**色・太さ・線種・幅**を指定できる。ドロップダウンからプリセット挿入／「スタイルを指定して挿入…」でプレビュー付きダイアログ |

```js
import { divider } from '@sano1023/rs-editor/plugins/divider';

createRSEditor('#content', {
    toolbar: '… | divider',
    plugins: [divider],
    pluginOptions: {
        divider: {
            // すべての挿入に効く既定スタイル
            defaults: { color: '#94a3b8', thickness: 2 },
            // ドロップダウンの内容（省略時は 標準/太線/破線/点線/二重線/短い線）
            presets: [
                { label: '細い線', attrs: {} },
                { label: '赤い太線', attrs: { color: '#ef4444', thickness: 4 } },
                { label: '区切り（40%）', attrs: { width: 40, lineStyle: 'dashed' } },
            ],
        },
    },
});
```

- 属性: `color`（CSS色）/ `thickness`（1〜20 px）/ `lineStyle`（`solid` `dashed` `dotted` `double`）/ `width`（5〜100 %・中央寄せ）。既定値（`#cbd5e1` / 1px / solid / 100%）と同じ指定は出力から省かれ、CSS変数 `--rse-divider-color` などテーマ側の指定が活きる
- 保存形式は `<hr class="rse-hr" data-rse-color="…" data-rse-thickness="…" data-rse-line="…" data-rse-width="…" style="…">`。**data属性がモデルの正**で、`style` は保存したHTMLを rs-editor のCSS無しで表示しても同じ見た目になるように併記される（読み込み時は属性から再構築されるので往復しても壊れない）
- 本文の区切り線は**クリックで選択**（青枠）→ ツールバーのメニューから編集/削除、**ダブルクリック**で直接編集、**Backspace / Delete** で削除。いずれも undo 可
- プレーンな `<hr>`（他エディタやMarkdown由来）も既定スタイルの区切り線として取り込まれる。※このプラグイン未読込のときは従来どおり `<hr>` は破棄される
- JSONでは `{ "type": "divider", "attrs": { "color": "#ef4444", "thickness": 3 } }`。不正な値（`url(...)` を含む色など）は読み込み時・出力時に落とされる

### メニューのカスタマイズ — `pluginOptions`

ドロップダウンメニューの中身はプラグイン別オプションで差し替えられます。選択肢が1つでもメニューを表示します。先頭の項目を直接実行する場合は `exec(name)` を使います。

```js
createRSEditor('#content', {
    pluginOptions: {
        toc: { positions: ['caret'] },                    // 'caret' | 'top'
        table: { menu: ['rowBelow', 'deleteTable'] },     // rowAbove/rowBelow/colLeft/colRight/deleteRow/deleteCol/deleteTable/'|'
        color: { palette: ['#000000', '#e06666'],         // 共通パレット（forePalette/backPaletteで個別指定も可）
                 allowClear: false },                      // 「色を解除」を出さない
        divider: { defaults: { color: '#94a3b8' },        // 色/太さ/線種/幅の既定値
                   presets: [{ label: '太線', attrs: { thickness: 4 } }] },
        charmap: { chars: ['©', '™', '→'] },
        emoticons: { emoji: ['🍣', '🍜'] },
        insertdatetime: { formats: ['YYYY-MM-DD', 'HH:mm'] }, // トークン: YYYY MM DD M D HH mm ss
    },
});
```

ツールバーに出すボタン自体の取捨選択は `toolbar` / `floatingToolbar` の定義文字列で行います。

### プラグインAPI — `definePlugin(def)`

組み込み機能もすべてこのAPIで実装されています（dogfooding）。

```js
import { createRSEditor, definePlugin } from '@sano1023/rs-editor';

const stamp = definePlugin({
    name: 'stamp',
    buttons: {
        stamp: {
            icon: '⭐',                       // 文字列 or HTML/SVG
            tooltip: 'スタンプを挿入',
            onAction: (editor) => editor.insertContent('⭐'),
            isActive: (editor) => false,      // ツールバーの押下状態
            isDisabled: (editor) => false,
        },
    },
    keymaps: { 'Mod-Shift-s': 'stamp' },      // ボタン名 or (editor) => bool
    onInit: (editor) => {},
    onDestroy: (editor) => {},
    sanitize: { tags: { mark: [] } },          // サニタイザ許可タグの拡張
    schema: { nodes: {}, marks: {} },          // ドキュメントモデルのノード種別拡張フック
});

createRSEditor('#content', { toolbar: '… | stamp', plugins: [stamp] });
```

- `buttons` のキーがツールバー定義文字列で使う名前になる
- ボタンに `onInsert(editor)` を定義すると、空の行の挿入ボタン（`insertToolbar`）から押されたときだけその動作を実行する（省略時は `onAction`／メニューの先頭項目）。キャレットの行へ挿入するための入口（例: `toc`）
- `keymaps` の修飾キーは `Mod`（Ctrl/⌘）/ `Shift` / `Alt`
- `schema.nodes` に `{ inline, match(el), parse(el), serialize(node) }` を登録すると独自ノード種別を保存・復元できる

### JSONドキュメントモデル

```json
{
    "type": "doc",
    "children": [
        { "type": "heading", "level": 1, "children": [{ "type": "text", "text": "見出し" }] },
        { "type": "paragraph", "children": [
            { "type": "text", "text": "こんにちは、" },
            { "type": "text", "text": "太字", "marks": ["bold"] },
            { "type": "text", "text": "リンク", "marks": [{ "type": "link", "attrs": { "href": "https://…" } }] }
        ] },
        { "type": "bullet_list", "children": [
            { "type": "list_item", "children": [{ "type": "text", "text": "項目（ネストは list_item 内に list）" }] }
        ] }
    ]
}
```

ノード種別: `paragraph` / `heading(level)` / `blockquote` / `code_block` / `bullet_list` / `ordered_list` / `list_item` / `table` / `table_row` / `table_cell(attrs: header, colspan, rowspan, align)` / `text(marks)` / `hard_break` / `image(attrs: src, alt, width, height)`。

マーク: `bold` `italic` `underline` `strike` `link{href}` `color{value}` `bgcolor{value}`。段落・見出しは `attrs.align`（left/center/right/justify）と `attrs.indent`（1〜8）を持てます。未知のノード種別を読み込んだ場合は落ちずにプレーンテキスト化（テキストが無ければ無視）します。

## 仕組み

```
┌─────────────────────────────────────────┐
│ 公開API  createRSEditor(el, config)      │  src/index.js, src/editor.js
├─────────────────────────────────────────┤
│ Toolbar / UI 層（ボタン・ダイアログ）      │  src/ui/
├─────────────────────────────────────────┤
│ Plugin システム（全機能はプラグイン）      │  src/plugins/
├─────────────────────────────────────────┤
│ EditorCore インターフェース               │
├─────────────────────────────────────────┤
│ ContentEditableCore（v0.1 実装）          │  src/core/
│  ※将来 ProseMirror 実装に差し替え可能     │
└─────────────────────────────────────────┘
```

- **タイプ入力はネイティブに任せ、コマンドはモデル変形で行う**: ツールバー操作時は「DOM → モデルにパース → 変形 → 再描画 → 選択復元」という ProseMirror 型の流れ。タイプ中は contenteditable のネイティブ編集をそのまま使い、IMEを壊さない
- **線形位置**: キャレット/選択は「文字数 + ブロック境界」の数値で表現し、DOM再描画をまたいで復元する（`src/core/model.js`）
- **履歴**: DOMスナップショット式の独自スタック。`compositionstart` 時点を1履歴として積むため「1変換 = 1履歴」になる。ネイティブ undo（`historyUndo`）は `beforeinput` で横取り
- **キャレット書式トグル**: 選択なしで太字等を押した場合はゼロ幅スペース（ZWSP）入りのマーク要素を置いて入力を誘導し、入力後に掃除する。ZWSPはすべての出力（HTML/JSON）から除去される
- **サニタイズ**: `setHTML` / ペースト / `insertContent` はホワイトリスト方式で浄化。style 属性は色・配置・インデントのプロパティのみ許可し、`javascript:` 等のスキームを拒否。Word / Googleドキュメント由来のHTMLはプリパスで「スタイル装飾 → 意味タグ（strong/em/u/s）」へ変換し、Wordのリストマーカーや `font-weight:normal` の `<b>` ラッパー（Google Docs）も正しく処理する

## 既知の制限（v0.6 時点）

- 折りたたみ（details/summary）ブロックは未実装（カスタムブロックは編集不可アトムになる位置モデルのため、編集可能な折りたたみはコア拡張が必要）
- ライブの変更履歴（Track Changes）は未実装。コアの入力パスへのフックが必要なため、代替として **revisions プラグイン（版の保存＋単語レベル差分＋復元）** を提供
- コメントはシングルユーザー向け（リアルタイム協調編集は非対応・スコープ外）
- proofread は辞書レスの機械的検出（形態素解析なし）。ら抜き検出は代表パターンのみ

- サイズは全プラグイン込みで約185KB（非圧縮・コメント込み。目安の50KBは超過）。opt-in プラグインは使う分だけ読み込まれ、minify+gzip では大幅に縮む
- リスト項目・テーブルセル内では見出し/引用への変換は効かない
- テーブルのセル結合UIは未実装（貼り付けられた colspan/rowspan は保持される）
- Word の箇条書きは段落として取り込まれる（リスト構造の再構築はしない）
- ブロック要素を含むHTMLを段落の途中に `insertContent` すると、現在のブロックの直後に挿入される。ボックス・引用内では同じコンテナ内を維持する
- アンカーは出力HTMLに `contenteditable="false"` とZWSPフィラーを含む
- toc プラグインは h2/h3 を対象とし、既存 ID は重複がない限り保持する
- divider のダイアログの色はブラウザ標準のカラーピッカー（16進のみ）。`rgb()` や色名を使う場合は `pluginOptions.divider` / `setJSON` で指定する
- 末尾がテーブルやカスタムブロックの場合、続きを書けるように空段落を補う（出力HTMLにも `<p><br></p>` が含まれる）。カード・目次の末尾空段落は書き足すために維持する
- codesample（シンタックスハイライト・要ハイライタ）、pagebreak、directionality、help は未実装。必要なAPIサーフェス（カスタムノード・UI拡張・キーマップ）は実装済みプラグインで証明済みで、同じ書き方で追加できる

## 検証

`node --test rs-editor/test/*.test.mjs` によるモデルレベルのテスト（divider: 17項目 — 属性の正規化・HTML/JSON往復・サニタイズ・挿入/編集/削除の変形）に加え、Playwright による自動テスト（v0.1: 29項目 + v0.2: 21項目 + v0.3: 16項目 + toc: 9項目 + ブロック脱出UX: 12項目 + pluginOptions: 8項目 + v0.5: 18項目）で、基本操作・HTML/JSONラウンドトリップ・ペースト浄化・undo/redo・テーブル操作・色/配置/インデント・Markdownショートカット・フローティングツールバー・画像アップロード/リサイズ・全拡張プラグイン（v0.5の12本は実クリック/実ドラッグ/実キー入力で検証）に加え、日本語IME受け入れテスト（変換中の change 抑制 / 1変換=1履歴 / 太字継続 / リスト内変換→Enter）を CDP の IME エミュレーションで確認済み。

## ライセンス

無償（商用可）。改変・再配布不可。詳細は [LICENSE.txt](./LICENSE.txt) を参照してください。

### v0.7.0: 外部操作パネルとタッチ操作

| メソッド | 説明 |
|---|---|
| `captureSelection()` | 現在の選択範囲（逆方向の選択・挿入位置を含む）を保存し、不透明なブックマークを返す。本文外・ソースモード・IME変換中は `null` |
| `restoreSelection(bookmark?)` | 保存位置を復元。引数省略時は最後の保存位置。成功は `true`、失敗は `false` |
| `openTool(name, { anchor }?)` | メニュー型ツールのメニューを指定要素の近くに表示。単一項目でも表示する。通常ツールは `exec` と同じ。成功は `true` |
| `isEnabled(name)` | readonly・ソースモード・IME変換中・プラグインの `isDisabled` を含む実行可否 |
| `getToolState(name)` | `{ active, enabled }`。`isActive(name)` も引き続き使用可能 |
| `setToolbar(definition)` | 本文・選択・undo/redo 履歴を維持してボタン定義を変更。`false` / `''` で非表示 |
| `setFloatingToolbar(definition)` | 選択時ツールバーを変更。`true` / 引数省略で標準ボタン、`false` / `''` で非表示 |

外部パネルへフォーカスを移す**前**に保存してください。ブックマークは同じエディタ・同じ本文に限り有効です。本文変更後・破棄後・ソースモード・IME変換中の復元は失敗します。失敗時は挿入・書式変更を中止し、利用者に本文内で位置を選び直してもらってください。ブックマークの内容を変更・永続化しないでください。

```js
let selection;
openPanel.addEventListener('pointerdown', () => {
    selection = editor.captureSelection();
});
// キーボードでパネルを開く場合も、本文からフォーカスを移す前に保存する。
boldButton.addEventListener('click', () => {
    if (editor.restoreSelection(selection) && editor.isEnabled('bold')) editor.exec('bold');
});
colorButton.addEventListener('click', () => {
    if (editor.restoreSelection(selection)) editor.openTool('forecolor', { anchor: colorButton });
});
// 画像選択・アップロードなどの非同期処理後も同じ手順で挿入できる。
// if (editor.restoreSelection(selection)) editor.commands.insertImage({ src: uploadedURL });

editor.setToolbar('undo redo | bold italic | image table');
editor.setFloatingToolbar(false);
```

`exec()` は従来どおりメニューの先頭の実行可能な項目を実行します。メニューを表示する用途には `openTool()` を使います。メニュー選択時にも実行可否を再検証し、その時点の本文選択を使用します。選択が本文外へ移っていれば、最後に本文内で選択した位置を使用します。ダイアログや非同期処理用の `restoreSelection()` は、引き続き本文が変わったブックマークを拒否します。

画像リサイズはマウス・指・ペン共通の Pointer Events に対応し、pointer capture、キャンセル、capture 喪失、ウィンドウ非アクティブ化・破棄時に終了します。途中までの変更も1回の undo で戻せます。`touch-action: none` はハンドルだけに適用します。
メニュー・選択ツールバー・ダイアログは VisualViewport の resize/scroll に追従します。小さな画面では内部スクロールを使用し、ダイアログの操作ボタンを下部に固定表示します。

動作例: [外部操作・モバイルデモ](./demo/mobile.html)

### v0.8.0: 自動目次とボックス

```js
import { createRSEditor } from '@sano1023/rs-editor';
import { toc } from '@sano1023/rs-editor/plugins/toc';
import { box } from '@sano1023/rs-editor/plugins/box';
import '@sano1023/rs-editor/rs-editor.css';

const editor = createRSEditor('#content', {
    plugins: [toc, box],
    toolbar: 'undo redo | h2 h3 | bold italic | bullist numlist | image | toc box',
    pluginOptions: {
        toc: { title: '目次', subheadings: true, numbered: true, positions: ['top', 'caret'] },
    },
});
```

script タグ版では `RSEditor.plugins.toc` / `RSEditor.plugins.box` を指定します。通常版への自動追加はありません。既存の `callout`（単一段落の色付き装飾）も引き続き使用できます。

- **目次**: h2 が親、h3 が子のリンク付きリスト。h1 は記事タイトルとして除外します。見出しの追加・改名・並べ替えに自動追従し、既存の見出し ID を維持します。EnterによるIDの重複では元の空でない見出しを優先し、新しくできた側に別のIDを付けます。
- 「目次を挿入」は最初の本文直下 h2 の前（導入文の後）に置きます。h2 がない場合は記事タイトルの直後、タイトルもなければ先頭です。「カーソル位置」も選べます。`autoInsert: true` は初期化時の自動挿入を有効にします。通常は利用者が挿入します。
- 目次をクリックすると「設定」「削除」が表示されます。設定はタイトル・小見出し・番号。削除しても本文は残ります。先頭に h3 がある場合は最上位に表示し、編集画面で階層の案内を表示します。
- 見出しがない目次は保存 HTML に `hidden` を付け、公開時には隠します。編集画面では案内を表示し、後から見出しを追加できます。
- **ボックス**: 枠線・背景色・左ライン・タイトル付き・アイコン付きの5種類。見本から選び、色・タイトル・アイコンを設定します。選択した段落群をまとめて囲み、未選択時は空のボックスを追加します。ボックス内を選択している場合はそのボックスの設定を変更します。
- ボックス内では複数段落・リスト・画像・書式変更を保持します。「外側に段落を追加」で下へ移動でき、「囲みを解除」は中身を残します。「中身ごと削除」は確認後に実行し、undo で戻せます。
- 編集用の操作ボタンは保存 HTML に含まれません。公開ページでも同じ CSS を読み込むと目次・ボックスの装飾が適用されます。固定ヘッダーがあるサイトでは公開側の見出しに `scroll-margin-top` を設定してください。
- プラグインを外して再読み込みするとカスタム構造を保持できません。編集・保存・再編集には同じ `toc` / `box` を登録してください。

0.7.0 のレビュー修正も含みます。外部メニューを開く前の保存位置復元、IME・readonly・破棄後の操作ガード、非同期画像アップロードの挿入位置と順序保持、モーダルの Tab 移動制御を改善しました。目次は保存通知より前に同期し、HTML ソース編集とプレビューでも見出しリンクを維持します。

互換性: 既存目次も h2/h3 の2階層へ更新され、h1 の項目は除外されます。旧 HTML の見出し ID は重複がない限り維持します。ボックスは新しい opt-in プラグインです。

[自動目次・ボックスのデモ](./demo/blocks.html)

### v0.9.0: 大きなアイコン・キャプション・リンクカード

- `box` に「アイコン付き（大）」と、キャプションの帯・タブ・枠上の3スタイルを追加（計9種類）。大きなアイコンは枠線をまたぐ丸型のバッジです。ヒント・チェック・注意・メモ・バツ・疑問の6種類、色は6色。見本を見ながら変更でき、本文・選択・undo を保持します。
- キャプションはボックスの設定からタイトルを入力します。タイトルは本文の見出し（h2/h3）とは別で、目次に含みません。
- 関連記事は `linkcard` プラグインで挿入します。「✓ 詳しくはこちら！」の見出し、URL、記事タイトル、説明文、画像URL、同じタブ／新しいタブを設定できます。説明・画像は任意、枠上の見出しは空欄で非表示。URLだけからのタイトル・画像の自動取得は行いません。
- 編集中はカードのリンクへ移動せず、クリックで設定・外側への段落追加・削除を表示します。公開表示ではカード全体がリンクになります。保存HTML／JSONとundo／redoに対応。編集・再読込には同じプラグインを登録してください。
- 公開ページでも `rs-editor.css` を読み込んでください。背景が白以外の場合は親要素に `--rse-block-surface` を設定すると、枠線に重なるアイコンの縁・見出し背景を合わせられます。

```js
import { linkcard } from '@sano1023/rs-editor/plugins/linkcard';
createRSEditor('#content', {
    plugins: [toc, box, linkcard],
    toolbar: 'undo redo | h2 h3 | bold image | toc box linkcard',
});
// script タグ版: RSEditor.plugins.linkcard
```

[ボックス・カードの見本を含むデモ](./demo/index.html)

### v0.10.1: リンクカードの設定画面の修正

0.10.0 の不具合を1件直しました。設定・API・保存形式の変更はありません（0.10.0 からはそのまま更新できます）。

```bash
npm install @sano1023/rs-editor@0.10.1
```

- **リンクカードの設定画面で、画像 URL を入力した直後に「適用」をクリックしても効かない問題**を修正しました（`linkcard` プラグイン）。2回目のクリックや `Tab`・`Enter` では適用できていました。
  - 原因: 見本の画像を、入力欄を離れた時点（`change`）で表示していました。入力欄から直接ボタンを押すと、押した瞬間に見本の画像の分だけダイアログが伸び、マウスを離すまでの間にボタンが下へ動いてクリックが外れます。0.10.0 でこの画面を 600px に広げた結果、見本の画像が大きくなり、ずれが約13px から約90px に増えて起きるようになりました。
  - 修正: 画像の枠は入力中から同じ大きさで確保し、入力欄を離れたときは枠を画像に置き換えるだけにしました（ダイアログの高さは変わりません）。打ちかけの URL を読み込まない点は従来どおりです。リンク先 URL も入力のたびに見本へ反映します。
- 独自プラグインでダイアログを作る場合の注意: テキスト欄の `onChange` は欄を離れた瞬間、つまりボタンを押した瞬間にも呼ばれます。そこでダイアログの高さが変わる更新（見本の表示・行の出し入れ）をすると同じ問題が起きるので、`onInput` で行ってください。
- 検証: 実際の Chrome（PC／タッチ表示）で「入力 → そのまま『適用』を1回クリック」を再現するテストを追加しました（修正前は失敗）。ユニット163件、ブラウザ11ファイル。

### v0.10.0: シンプルUI（スマホ向け）とUI切替

スマホでは通常のツールバーが数段に折り返して本文が狭くなるため、固定ツールバーを出さないUIを追加しました。

- **空の行**にキャレットを置くと、その行の横に丸い挿入ボタンが出ます。「写真」「区切り線」は1タップで挿入し、**「＋」**のメニューからは見出し・リスト・表・ボックス・リンクカード・目次など、通常UIと同じものを挿入できます（設定が必要なものは設定画面が開きます）。
- **文字を選択**すると装飾バー（太字・斜体・取り消し線・文字色・見出し・箇条書き・番号付きリスト・引用・背景色・下線・リンク）が出ます。幅に入らないボタンは自動で**「…」**メニューにまとまります。
- どのボタンを並べ、どれをメニューに入れるかは、通常UIのツールバーとは別に設定できます（→ [ボタンを変える](#ボタンを変える)）。
- 切り替わるのはボタンの出し方だけです。プラグイン・保存形式（HTML / JSON）・ショートカット・Markdown入力は通常UIと共通です。

#### この版で変わったこと（一覧）

| 種類 | 内容 | 通常UIへの影響 | 説明 |
|---|---|---|---|
| 追加 | シンプルUIと、`setUI()` による通常UIとの切替 | なし（`ui` を指定しなければ従来どおり） | [サンプル](#そのまま使えるサンプル)・[切替](#いつ切り替えるかはアプリ側で決める)・[互換性](#通常uiとの互換性) |
| 追加 | 空の行の挿入ボタンと「＋」メニュー（`insertToolbar`） | 指定したときだけ出る | [ボタンを変える](#ボタンを変える) |
| 追加 | 選択時バーの文字色・背景色など。幅に入らないボタンは「…」メニューへ自動で移る | シンプルUIのみ | [ボタンを変える](#ボタンを変える) |
| 追加 | ツールバー定義の `...`（それ以降を「その他」メニューにまとめる） | 書いたときだけ | [ボタンを変える](#ボタンを変える) |
| 追加 | `photo`・`heading` ボタン、プラグイン用の `onInsert`・`openDialog({ width })` | 使ったときだけ | [早見表](#v0100-で増えた設定api早見表) |
| 変更 | 設定画面（モーダル）の幅。PCは480px以上、スマホは画面幅いっぱい | **あり** | [修正の詳細](#合わせて直したこと確認状況) |
| 修正 | 選択時バーをキーボードで操作できない（`Tab` で移動できる） | **あり** | [表示のルール](#表示のルール) |
| 修正 | ドラッグ並べ替えの「⠿」が文字に重なる | **あり** | [修正の詳細](#合わせて直したこと確認状況) |
| 修正 | カラーパレットの列ずれ、書式ボタンが点灯しない場合がある | **あり** | [修正の詳細](#合わせて直したこと確認状況) |

動くサンプルは2つあります。コードをそのまま読めるよう、どちらも1ファイルで完結しています。

- [demo/simple.html](./demo/simple.html) — シンプルUIの最小構成。タイトル欄つきの記事入力画面、通常UIとの切替、画面幅での自動切替、保存されるHTMLの表示
- [demo/index.html](./demo/index.html) — 全プラグインを載せた例。本文の上の「v0.10 の変更を確認する」で、UIの切替と設定画面を試せる。`simple: { ... }` でボタンを通常UIと別に決める例を含む

#### そのまま使えるサンプル

記事入力画面にシンプルUIを入れ、スマホ幅のときだけシンプルUIにする例です（Vite などのバンドラを使うアプリ向け。`/api/images` は利用側で用意する画像アップロードAPIで、`{ "url": "https://..." }` を返す想定）。

```html
<button type="button" id="ui-toggle"></button>
<textarea id="content"><p>本文</p></textarea>
<button type="button" id="save">保存</button>
```

```js
import { createRSEditor } from '@sano1023/rs-editor';
import { divider } from '@sano1023/rs-editor/plugins/divider';
import { box } from '@sano1023/rs-editor/plugins/box';
import '@sano1023/rs-editor/rs-editor.css';

// 写真ボタン・貼り付け・ドロップで呼ばれる。画像のURLを返す
async function uploadImage(file) {
    const body = new FormData();
    body.append('file', file);
    const response = await fetch('/api/images', { method: 'POST', body });
    if (!response.ok) throw new Error('画像をアップロードできませんでした');
    return (await response.json()).url;
}

const phone = matchMedia('(max-width: 640px)');
const editor = createRSEditor('#content', {
    plugins: [divider, box],            // どちらのUIでも同じものを登録する（保存形式が共通になる）
    imageUploadHandler: uploadImage,
    placeholder: '本文を入力…',
    toolbar: 'undo redo | bold italic underline | forecolor backcolor | h2 h3 | bullist numlist blockquote | link image table | divider box',
    ui: phone.matches ? 'simple' : 'standard',
});

// 画面幅が変わったら切り替える（本文・選択・undo 履歴はそのまま）
phone.addEventListener('change', () => editor.setUI(phone.matches ? 'simple' : 'standard'));

// 利用者が手動で切り替えるボタン
const toggle = document.querySelector('#ui-toggle');
const label = () => { toggle.textContent = editor.ui === 'simple' ? '通常の編集画面にする' : 'シンプルな編集画面にする'; };
toggle.addEventListener('click', () => editor.setUI(editor.ui === 'simple' ? 'standard' : 'simple'));
editor.on('uichange', label);
label();

// 保存。どちらのUIで編集しても同じ形式のHTMLが得られる
document.querySelector('#save').addEventListener('click', () => {
    const html = editor.getHTML();
    // fetch('/api/articles', { method: 'POST', body: JSON.stringify({ html }) }) など
});
```

最小限の指定は次のとおりです。以降の節で、切替・互換性・ボタンの変更・表示のルールを順に説明します。

```js
import { createRSEditor } from '@sano1023/rs-editor';
import { divider } from '@sano1023/rs-editor/plugins/divider';
import '@sano1023/rs-editor/rs-editor.css';

const editor = createRSEditor('#content', {
    plugins: [divider],                 // UIに関係なく1回だけ登録する（区切り線ボタンに必要）
    imageUploadHandler: uploadImage,    // 写真ボタンに必要。(file) => Promise<画像URL>
    toolbar: 'undo redo | bold italic | h2 h3 | bullist numlist | link image | divider',  // 通常UIのツールバー
    ui: 'simple',                       // 最初に表示するUI。省略時は 'standard'（通常UI）
});

editor.setUI('standard');   // 通常UIへ。本文・選択・undo/redo 履歴はそのまま
editor.setUI('simple');     // シンプルUIへ
editor.ui;                  // 現在のUI: 'standard' | 'simple'
editor.on('uichange', (name) => console.log(name));
```

script タグ版も同じオプションです（`RSEditor.createRSEditor('#content', { ui: 'simple', plugins: [RSEditor.plugins.divider] })`）。

#### いつ切り替えるかはアプリ側で決める

rs-editor は画面幅を見て自動では切り替えません。「幅は狭いがキーボードとマウスで使うPC」「横向きのタブレット」などをライブラリ側で判定すると、意図しない切替が起きるためです。`setUI()` を好きな条件で呼んでください。

```js
// 例1: 画面幅で切り替える
const phone = matchMedia('(max-width: 640px)');
const apply = () => editor.setUI(phone.matches ? 'simple' : 'standard');
phone.addEventListener('change', apply);
apply();

// 例2: 利用者が選ぶ（設定を保存しておき、次回は ui オプションに渡す）
simpleButton.addEventListener('click', () => editor.setUI('simple'));
```

`setUI()` は指定したUIになっていれば `true`、未知の名前・破棄後は `false` を返します。ソース表示中に呼ぶと、編集中のソースを本文へ反映してから切り替えます。

#### 通常UIとの互換性

- 2つのUIは同じエディタ・同じプラグイン・同じ保存形式で動きます。通常UIで作った表・文字色・配置・ボックス・目次・リンクカードなどは、シンプルUIでもそのまま表示・編集・保存されます（専用のボタンが出ないだけで、構造は変わりません）。ボックスや目次をタップしたときの「設定／削除」も同じです。
- シンプルUIのボタンは通常UIと同じコマンドを実行します。シンプルUIで書いた本文を通常UIで開いても、同じHTML・JSONです。
- 互換になるのは**同じ `plugins` を登録している場合**です。PC用とスマホ用のページで別々に `createRSEditor` する場合も `plugins` を揃えてください（例: `divider` を登録していないエディタは区切り線を読み込みません。これは従来と同じ動作です）。1つのエディタを `setUI()` で切り替える使い方なら、常に揃います。

#### ボタンを変える

| オプション | 既定値 | 説明 |
|---|---|---|
| `simple.floatingToolbar` | `'bold italic strikethrough forecolor heading bullist numlist blockquote backcolor underline link'` | シンプルUIの選択時バー。`false` で非表示 |
| `simple.insertToolbar` | `'photo divider ... h2 h3 bullist numlist checklist blockquote codeblock \| table box callout linkcard toc media'` | シンプルUIの空行ボタン。`false` で非表示 |
| `simple.toolbar` | `false` | シンプルUIでも固定ツールバーを出す場合に指定 |
| `insertToolbar` | `false` | 通常UIでも空行ボタンを使う場合に指定 |
| `insertPlacement` | `'auto'` | 挿入ボタンの位置。下記参照 |

```js
createRSEditor('#content', {
    plugins: [divider, box],
    ui: 'simple',
    simple: {
        // 文字を選択したとき。先頭から幅に入るだけ並び、入らない分は自動で「…」メニューへ
        floatingToolbar: 'bold forecolor backcolor heading link underline',
        // 空の行。"..." より前は1タップのボタン、後ろは「＋」メニュー（'|' はメニューの区切り線）
        insertToolbar: 'photo divider ... h2 h3 bullist | table box',
    },
});
editor.setInsertToolbar('photo');        // 後から変更（現在のUIの定義だけが変わる）
editor.setFloatingToolbar();             // 引数省略・true で、現在のUIの既定に戻す
```

- ボタン名は通常UIのツールバーと同じもの（標準ボタンと、登録したプラグインのボタン）を使えます。**プラグインを登録していないボタン名は表示されません**（既定の `checklist` `box` `callout` `linkcard` `toc` `media` `divider` は、そのプラグインを `plugins` に入れたときだけ出ます）。
- **`...` で「その他」メニューにまとめる**: 定義の中に `...` を書くと、それより後ろのボタンは並べずに1つのメニューボタンにまとめます。空の行では「＋」、選択時バーと固定ツールバーでは「…」のボタンになり、メニューにはアイコンと名前が並びます。この書き方は通常UIの `toolbar` / `floatingToolbar` でも使えます（例: `toolbar: 'undo redo | bold italic ... table media code'`）。
- **選択時バーは1行に収めます**: シンプルUIの選択時バーは折り返さず、画面幅に入らないボタンを後ろから自動で「…」メニューへ移します（先頭に書いたボタンほど優先して並びます）。既定の並びは、PCでは全部、幅390pxのスマホでは7個＋「…」です。「…」から文字色・背景色を選ぶと、続けてパレットが開きます。
- `setToolbar()` / `setFloatingToolbar()` / `setInsertToolbar()` は**現在のUI**の定義だけを変更します。定義はUIごとに保持され、切り替えて戻っても残ります。
- 挿入ボタンと「＋」メニューは1回の選択で実行します。メニュー型のボタン（`divider` など）もプリセットのメニューを開かず、既定の動作（`divider` なら標準の線、`table` なら行数・列数の設定画面）を実行します。`toc` は文書の先頭ではなく、その行に目次を入れます。
- `photo`: 端末のファイル選択を直接開き、選んだ画像を `imageUploadHandler` でアップロードして、押した時点の行に挿入します（複数選択可）。処理中の通知・保留・失敗時の扱いは[画像アップロード](#複数画像のアップロードと保留)と同じです。`imageUploadHandler` が未設定なら `image` と同じURLダイアログを開きます。`pluginOptions: { image: { multiple: false, accept: 'image/png,image/jpeg' } }` で1枚ずつ・種類の限定ができます。
- `heading`: レベルを選ばない見出しボタンです。段落を h2 にし、見出し（h1〜h3 のどれでも）で押すと段落に戻します。レベルは `pluginOptions: { block: { headingLevel: 3 } }` で変更できます。

#### 表示のルール

- 挿入ボタンは、本文にフォーカスがあり、キャレットが**空の段落**にあるときだけ表示します（見出しの行末で Enter した直後の空行を含みます）。文字を入力する・範囲選択する・本文の外へフォーカスが移ると消えます。readonly・IME変換中・ダイアログ表示中は表示しません。
- 位置は、行の左に余白があれば行の左外、スマホのように余白がなければ行の右端です。エディタのすぐ左に別のUI（サイドメニューなど）がある画面では `insertPlacement: 'inline'` を指定すると、常に行の右端に出します。
- 選択時の装飾バーは、マウス・ペンでは選択範囲の上、**指で触れた後は選択範囲の下**に出します（上に出るOSのコピー／貼り付けメニューと、下端の選択ハンドルを避けるため）。通常UIの選択時バーの位置は変更していません。
- 挿入後の入力行がキーボードの裏や画面外に出る場合は、見える位置までスクロールします。
- キーボード操作: 空の行で `Tab` を押すと挿入ボタンへ、**文字を選択して `Tab` を押すと選択時の装飾バーへ**移動します（本文中に目次やリンクカードのリンクがあっても、ボタンが出ている間は先にボタンへ移ります）。`←` `→` で選択、`Enter` で実行、`Esc`（または `Shift+Tab`）で本文に戻ります。実行後は本文へフォーカスが戻り、選択は保たれます。文字色のパレットや「＋」「…」のメニューは、開いたあと `Tab` で項目へ移動して `Enter` で選びます。`Esc` はメニューだけを閉じ、開いたボタンへフォーカスを戻します。
- ドラッグ並べ替え（`dragblock` プラグイン）を併用すると、行の左外には「⠿」ハンドルが出ます。挿入ボタンはその分だけ左に離して表示します。

#### 見た目の調整

シンプルUIは枠・背景・左右の余白を持ちません（アプリ側のカードや記事レイアウトにそのまま置く想定）。必要に応じて CSS 変数で調整します。色は従来の `--rse-accent` `--rse-border` `--rse-bg` などに従います。

```css
.rse {
    --rse-accent: #f97316;                       /* 押下中・ホバーの色 */
    --rse-simple-border: 1px solid #cbd5e1;      /* シンプルUIにも枠を付ける（既定: なし） */
    --rse-simple-radius: 8px;
    --rse-simple-bg: #fff;                       /* 既定: transparent */
    --rse-simple-padding: 12px 14px;             /* 本文の余白（既定: 8px 0） */
    --rse-insert-size: 36px;                     /* 挿入ボタンの直径（既定: 32px、タッチ端末は 40px） */
    --rse-insert-color: #64748b;                 /* 挿入ボタンのアイコン色 */
}
```

シンプルUIの本文は 16px 未満にならないようにしています（iOS がフォーカス時に画面を拡大しないため）。エディタ本体には `rse-simple` クラスが付くので、`.rse-simple .rse-content` でアプリ側の文字サイズ・行間を指定できます。

#### React / Vue

`ui` を変えるとエディタを作り直さずに `setUI()` します。`simple` / `insertToolbar` / `insertPlacement` はマウント時の設定です。

```jsx
<RsEditor value={html} onChange={setHtml} plugins={[divider]} imageUploadHandler={upload}
    ui={isPhone ? 'simple' : 'standard'} simple={{ insertToolbar: 'photo divider' }} />
```

```vue
<RsEditor v-model="html" :plugins="plugins" :image-upload-handler="upload"
    :ui="isPhone ? 'simple' : 'standard'" @uichange="onUiChange" />
```

ref からは `setUI(name)` も呼べます。

#### やりたいこと別の設定

| やりたいこと | 書き方 |
|---|---|
| スマホのときだけシンプルUIにする | `ui: phone.matches ? 'simple' : 'standard'` と `phone.addEventListener('change', …)`（[サンプル](#そのまま使えるサンプル)） |
| 「＋」メニューの中身を変える | `simple: { insertToolbar: 'photo divider ... h2 h3 \| table box' }`（`...` より後ろがメニュー、`\|` は区切り線） |
| 「＋」を出さず、ボタンだけ並べる | `simple: { insertToolbar: 'photo divider table' }`（`...` を書かない） |
| 空の行のボタンを出さない | `simple: { insertToolbar: false }` |
| 選択時バーを太字・文字色・リンクだけにする | `simple: { floatingToolbar: 'bold forecolor link' }` |
| 自作プラグインのボタンを入れる | `definePlugin` の `buttons` に付けた名前を、定義の文字列にそのまま書く（例: `'photo ... table stamp'`） |
| 通常UIでも空の行のボタンを使う | `insertToolbar: 'photo divider ... table box'`（`simple` の外に書く） |
| 通常UIのツールバーを短くし、残りを「…」に入れる | `toolbar: 'undo redo \| bold italic ... table media code'` |
| 表示中のエディタのボタンを変える | `editor.setInsertToolbar('photo')` / `editor.setFloatingToolbar('bold link')`（現在のUIの定義だけが変わる） |
| シンプルUIにも枠を付ける | CSS で `.rse { --rse-simple-border: 1px solid #cbd5e1; --rse-simple-padding: 12px 14px; }` |
| 設定画面（モーダル）の最低幅を変える | CSS で `.rse { --rse-dialog-width: 560px; }` |
| エディタの左隣にメニューなどがあり、挿入ボタンが重なる | `insertPlacement: 'inline'`（常に行の右端に出す） |

#### v0.10.0 で増えた設定・API（早見表）

| 分類 | 名前 | 内容 |
|---|---|---|
| オプション | `ui` | `'standard'`（既定）/ `'simple'`。最初に表示するUI |
| オプション | `simple` | `{ toolbar, floatingToolbar, insertToolbar }`。シンプルUI側のボタン定義（省略した項目は既定） |
| オプション | `insertToolbar` | 通常UIの、空の行の挿入ボタン。既定は `false`（出さない） |
| オプション | `insertPlacement` | `'auto'`（既定）/ `'inline'`。挿入ボタンの位置 |
| オプション | `pluginOptions.image` | `{ multiple, accept }`。`photo` のファイル選択（既定は複数選択・`image/*`） |
| オプション | `pluginOptions.block` | `{ headingLevel }`。`heading` が作る見出しのレベル（既定 2） |
| メソッド | `setUI(name)` | UIを切り替える。成功は `true` |
| メソッド | `setInsertToolbar(definition)` | 現在のUIの挿入ボタンを変更。省略・`true` で既定、`false` で非表示 |
| プロパティ | `ui` | 現在のUI（`'standard'` / `'simple'`） |
| イベント | `uichange` | UIが切り替わったとき。引数は新しいUIの名前 |
| ボタン | `photo` / `heading` | 写真・画像ファイルを直接選んで挿入 / 見出し（h2）と段落の切替 |
| 定義の書き方 | `...` | それ以降のボタンを「その他」メニューにまとめる（全ツールバー共通） |
| プラグインAPI | `buttons.<名前>.onInsert(editor)` | 空の行の挿入ボタンから押されたときの動作（省略時は通常の動作） |
| プラグインAPI | `ed.openDialog({ width })` | ダイアログの幅（数値はpx、CSSの長さも可） |
| CSS | `--rse-simple-border` `--rse-simple-radius` `--rse-simple-bg` `--rse-simple-padding` | シンプルUIの枠・角丸・背景・本文の余白 |
| CSS | `--rse-insert-size` `--rse-insert-color` `--rse-dialog-width` | 挿入ボタンの直径とアイコン色、モーダルの最低幅 |
| CSS | `.rse-simple` | シンプルUIのときエディタ本体に付くクラス |
| React / Vue | `ui` `simple` `insertToolbar` `insertPlacement` | 同名のprops。`ui` は変更に追従。ref から `setUI(name)`、Vue は `@uichange` |

#### 合わせて直したこと・確認状況

- **選択時の装飾バーをキーボードで操作できない問題**を修正しました（通常UIの選択時バーにも適用）。文字を選択して `Tab` を押すと、本文のフォーカスが外れた時点でバーが閉じ、フォーカスがページ先頭（body）へ落ちていました。固定ツールバーのないシンプルUIでは、文字色などをキーボードで選べない状態でした。本文からバー（とバーから開いたメニュー）へ移るときは表示を保ち、エディタの外へフォーカスが出たときに閉じます。また、本文中に目次やリンクカードがあるとブラウザ任せの `Tab` はそのリンクへ先に移るため、バーや挿入ボタンが出ている間の `Tab` は必ずそこへ移動するようにしました（リスト・表の中の `Tab` は従来どおりです）。メニューを `Esc` で閉じたときにフォーカスを失う点も直しました。
- **ドラッグ並べ替えの「⠿」が文字に重なる問題**を修正しました（`dragblock` プラグイン。通常UIにも適用）。ハンドルは本文にマウスを載せたときだけ、ブロックの左外に出ます。これまでは、非表示のはずのハンドルがエディタの左上に出たままになり、左余白が狭いとホバー時も文字の上に重なっていました。画面の左端で置く場所がないときは表示しません。
- カラーパレットで「色を解除」が1列目に入り、色見本の列がずれて表示される問題を修正しました（通常UIにも適用）。
- 単語を選んで太字などを付けた直後に、そのボタンが点灯しないことがある問題を修正しました（選択の端が書式の外側の境界に残る場合）。範囲選択では、最初に選択されている文字の書式も見て判定します。通常UIのツールバーにも適用されます。
- **設定画面（モーダル）の幅**を広げました。これまでは内容任せの幅で、入力欄だけのダイアログはPCでも200px台でした。幅を指定しないモーダルは最低480px、見本を表示するリンクカード・ボックスは600pxです。画面が狭いときは画面幅に収まり、スマホでは幅いっぱいになります。タッチ端末では入力欄を16pxにしています（iOSがフォーカス時に画面を拡大しないため）。検索・置換（本文を見ながら使う非モーダル）は従来の幅です。
  - 最低幅は `.rse { --rse-dialog-width: 560px; }` で変更できます。独自プラグインは `ed.openDialog({ title, fields, width: 720 })`（数値はpx、`'40rem'` などのCSS長さも可）で幅を指定できます。
- 既定のUI（`ui` 未指定）は、上記の修正（モーダルの幅・選択時バーのキーボード操作・ドラッグハンドル・パレット・ボタンの点灯）を除いて従来と同じ表示・動作です。既存のHTML・JSONはそのまま読み込めます。
- 検証: ユニット162件（今回26件追加）と、Chrome 157 のPC／タッチ表示のブラウザ11ファイル（今回2ファイル追加。追加分は Chrome 122 でも実行）。挿入ボタンの位置・1タップ挿入・「＋」「…」メニュー・ファイル選択からの写真挿入・装飾バーと文字色・UI切替・モーダルの幅・ドラッグハンドルの位置・表示領域を縮めたキーボード表示の模擬・キーボードだけでの挿入と装飾（Tab／矢印／Enter／Esc）・Popover API のないブラウザの模擬を確認しています。
- **iPhone / Android の実機では未確認**です（接続できる端末がないため）。特に、指で選択したときの装飾バーとOSのメニュー・選択ハンドルの重なり、ソフトウェアキーボード表示中のボタン位置、OSの日本語IMEは、実機で確認してください。ヘッドレスChromeでは長押しによる単語選択を再現できず、指で触れた後の選択として模擬しています。

### v0.9.3の使い方・更新時の確認

```bash
npm install @sano1023/rs-editor@0.9.3
```

（最新は 0.10.1 です。以下の 0.9.3 の機能はそのまま含まれます。）既存のHTML・JSONを引き続き読み込めます。新しい操作を有効にするフラグは不要です。目次・ボックス・脚注・リンクカード・検索置換は、それぞれのプラグインを登録して利用してください。

#### 選択位置を保存して外部UIから操作する

本文から外部パネルへフォーカスを移す前に `captureSelection()` を呼び、操作直前に `restoreSelection()` の戻り値を確認します。[外部操作のコード例](#v070-外部操作パネルとタッチ操作)も参照してください。同じ本文の再描画でテキストノードが結合されても、選んだ文字と選択方向を維持します。本文が編集されて位置が無効になった場合は `false` を返すので、本文内で選び直してください。

```js
// 本文を選択している間に保存する。
const bookmark = editor.captureSelection();

// 外部パネルから太字を適用する場合。
if (bookmark && editor.restoreSelection(bookmark) && editor.isEnabled('bold')) {
    editor.exec('bold');
}
editor.setFloatingToolbar(true); // 標準の選択時ツールバーを表示可能にする
```

メニュー型のツールは `openTool('forecolor', { anchor: button })` のように開きます。メニューからの操作は、その時点の本文選択（本文外へ移った場合は最後の本文選択）に作用します。IME変換中は通常のツールバーボタンが無効表示になります。外部ボタンも `getToolState(name).enabled` または `isEnabled(name)` に合わせ、変換確定後に実行してください。

#### 複数画像のアップロードと保留

`imageUploadHandler` はファイルごとに呼び出され、画像URLの文字列または `URL` オブジェクトを返します。例の `/api/images` は利用側で用意するアップロードAPIで、成功時に `{ "url": "https://..." }` を返す想定です。

```js
const editor = createRSEditor('#content', {
    imageUploadHandler: async (file) => {
        const body = new FormData();
        body.append('file', file);
        const response = await fetch('/api/images', { method: 'POST', body });
        if (!response.ok) throw new Error('画像をアップロードできませんでした');
        const { url } = await response.json();
        if (typeof url !== 'string' || !url.trim()) throw new Error('画像URLがありません');
        return url;
    },
});

// filesはFileListまたはFileの配列。外部ファイル選択UIを開く前に位置を保存する。
const bookmark = editor.captureSelection();
// ファイル選択が終わった後に実行する。
const inserted = await editor.uploadFiles(files, { bookmark, alt: '記事の画像' });
// true: 1枚以上挿入できた。false: 未挿入（失敗・取消・全件保留など）。
```

- `a.png → slow.png → c.png` の順に渡した場合、aが完了すれば先に挿入します。cだけが先に完了してもslowを追い越さず、slowの完了後に残りを順に挿入します。
- 処理中の「キャンセル」は未完了分だけを取り消します。aとcが完了済みなら両方を残し、slowの遅れて届いた結果は挿入しません。アップロード通信自体は停止しません。
- 本文の変更、readonly、ソースモード、IME変換中、メニュー・ダイアログ表示中などで安全に挿入できない画像は保留します。本文の挿入位置を選び、「現在の位置に挿入」を押すと再開できます。「画像を破棄」は保留画像を捨てます。保留は再読み込みやエディタ破棄では失われます。
- 同じ位置への別々のアップロードも開始順に挿入します。別の位置で開始した処理は、先行処理で本文が変わると保留になる場合があります。先行処理が止まっていても、準備済み画像は通知のボタンから明示的に挿入・破棄できます。
- 部分挿入後に残りが保留・失敗しても戻り値は `true` です。全画像の成功判定には通知または `uploadstatus` を利用してください。イベントの `count` は挿入待ちとして保留している枚数、`failed` は失敗枚数です。成功通知は3秒後に消え、保留・失敗通知は残ります。

```js
editor.on('uploadstatus', ({ status, count, failed, message }) => {
    // status: uploading / inserted / pending / failed / discarded
    document.querySelector('#upload-status').textContent = message;
});
```

#### React / Vueで自動目次を使う

`pluginOptions.toc.autoInsert: true` で、マウント時に目次を追加します。初期値の同期で目次は消えず、初期化だけではフォーカス・変更通知・undo履歴を発生させません。そのため、編集前に保存する場合も、親の初期HTMLではなくラッパーの `getHTML()` から正規化済みHTMLを取得してください。`autoInsert` は初期化時の設定です。後から外部の `value` / `modelValue` で本文を置き換える際に目次も残す場合は、そのHTMLに目次を含めてください。

React:

```jsx
import React from 'react';
import { RsEditor } from '@sano1023/rs-editor/react';
import { toc } from '@sano1023/rs-editor/plugins/toc';
import '@sano1023/rs-editor/rs-editor.css';

export function ArticleEditor({ onSave }) {
    const [html, setHtml] = React.useState('<h2 id="intro">はじめに</h2><p>本文</p>');
    const editorRef = React.useRef(null);
    return <>
        <RsEditor ref={editorRef} value={html} onChange={setHtml}
            plugins={[toc]} pluginOptions={{ toc: { autoInsert: true } }} />
        <button onClick={() => onSave(editorRef.current.getHTML())}>保存</button>
    </>;
}
```

Vue:

```vue
<script setup>
import { ref } from 'vue';
import { RsEditor } from '@sano1023/rs-editor/vue';
import { toc } from '@sano1023/rs-editor/plugins/toc';
import '@sano1023/rs-editor/rs-editor.css';
const emit = defineEmits(['save']);
const html = ref('<h2 id="intro">はじめに</h2><p>本文</p>');
const editorRef = ref(null);
const plugins = [toc];
const pluginOptions = { toc: { autoInsert: true } };
</script>
<template>
    <RsEditor ref="editorRef" v-model="html" :plugins="plugins" :plugin-options="pluginOptions" />
    <button @click="emit('save', editorRef.getHTML())">保存</button>
</template>
```

#### 本文の編集操作

| 操作 | v0.9.3の動作 |
|---|---|
| カード・目次・区切り線を含む範囲をリスト化／コード化 | 原子ブロックを保持し、前後の本文を別々に変換する |
| 複数の引用をまとめて選択し引用ボタンを押す | 全部が引用なら解除。一部だけ引用なら1つにまとめ、入れ子を増やさない |
| 引用内の一部を選択してボックスを適用 | 選択した段落を引用の内側で囲む。キャレットだけなら同じ引用内に空のボックスを追加する |
| 選択が既存ボックスの内外をまたぐ | 選択方向に関係なく新規挿入。既存ボックスの色・タイトルを入れ子として残す |
| 範囲全体が同じボックスの中 | そのボックスの設定を開く |
| カード直前の空段落でDelete | 空段落を削除し、カードを残す |
| カード直後の末尾の空引用でBackspace | 引用を解除し、続きを書ける通常段落を残す |
| セルやリスト項目の内側でBackspace／Delete | 外側のカード・目次を選択しない。表・リストの編集動作を優先する |
| 見出しの先頭でEnter | 元の見出しに既存IDを保つ。前にできた見出しには別のIDを付ける |
| 検索・置換後にダイアログを閉じる | 検索結果や置換後の選択を保ち、その位置から入力を続けられる |

検索置換は `searchreplace` プラグインを登録し、Ctrl+F（MacではCommand+F）または検索置換ボタンで開きます。表・ボックス等の構造変更はundoで戻せます。

#### JSON保存・読み込み

`editor.getJSON()` の結果を保存し、同じプラグイン構成で `editor.setJSON(saved)` に渡してください。`_number`・`_dom`など、`_`から始まる内部フィールドは入力時に無視します。脚注番号は本文の順番から自動で振り直すため、JSONに番号を設定する必要はありません。HTML・JSONの入力は許可した構造に正規化され、イベントハンドラー属性や危険なURLは本文へ取り込みません。

```js
// footnoteプラグインを登録したeditorに渡す例。
editor.setJSON({
    type: 'doc',
    children: [{
        type: 'paragraph',
        children: [
            { type: 'text', text: '補足のある文章' },
            { type: 'footnote_ref', attrs: { note: '補足説明' } },
        ],
    }],
});
const saved = editor.getJSON();
```

### v0.9.3: 選択・構造編集・アップロード・JSON入力の修正

- `setJSON()` の内部フィールドを除去し、HTML入力と同じサニタイズを通します。脚注番号もエスケープし、一瞬だけ不正な要素が本文へ入る問題を防ぎます。
- 選択ブックマークは線形位置と方向を保持し、再描画による隣接テキストノードの結合後も同じ文字を復元します。検索・置換ダイアログを閉じても最新の選択を維持します。
- セル・リスト項目内の削除で外のカードや目次を選択しません。リスト・コード変換は原子ブロックの前後で分け、カード等を保持します。カード直前の空行のDeleteと、カード直後の空引用のBackspaceを修正し、後者は入力行を残して引用を解除します。
- 複数引用の解除と混在選択の引用化、引用内のボックス挿入、選択方向に依存しないボックス判定を修正しました。選択が既存のボックスをまたぐ場合は、その装飾を入れ子のボックスとして保持します。
- Enterで見出しが分割されても元の見出しIDを維持します。React/Vueの自動目次を初期値の同期で消さず、初期フォーカス・変更通知・undo履歴も発生させません。
- メニューは開いた時点の古い選択へ戻さず、現在または最後の本文選択へ適用します。ボックス・引用の境界を含む選択の変換と貼り付け、ボックス内での表・区切り線・目次の挿入と削除、カード内にキャレットがあるときの挿入を修正しました。
- アップロードは先頭から完了した分を順に挿入します。途中の未完了画像を追い越さず、処理中の「キャンセル」は未完了分だけを取り消して完了済み画像を残します（ハンドラの通信自体は停止しません）。戻り値は1枚以上挿入できた場合にtrue、未挿入・全件保留の場合はfalseです。先行アップロードを待つ画像も、準備完了後は現在位置への挿入・破棄を選べます。メニュー・ダイアログ表示中の自動挿入は保留します。失敗やアプリ側コールバックの例外が後続処理を止めず、MIME型が空の明示選択ファイルとURLオブジェクトの結果にも対応します。
- 脚注を含む目次の同期、再読み込み時の見出し ID、目次削除後の選択位置、確認ダイアログの初期フォーカスとキャンセル後の復帰、補助平面文字を含むタイトルの長さ制限を修正しました。
- コメントの一時ハイライトがダイアログを無効にする問題、ボックス内の脚注一覧の重複、カード直前のボックス削除後の入力位置、`setFloatingToolbar(true)`の空表示を修正しました。目次同期で毎回ページ全体のIDを走査しません。
- IME変換中はツールバーボタンを無効表示にします。keyCode 229の削除はbeforeinput側で判断し、原子ブロックの二段階削除を維持します。Android実機・OSの日本語IMEは未検証で、合成イベントとChromeのCDP検証のみです。
- 3回目の検証: ユニット136件（新規24件）、Chrome 157のブラウザ9ファイル（PC・タッチ表示）が成功。`test/review3-regressions.*`に再現ケース、入力安全性、DOMとモデルの位置対応、React/Vueマウントの回帰テストを追加しました。
- 0.9.2に対する2・3回目の再レビュー修正を含みます。操作と連携例は上記「v0.9.3の使い方・更新時の確認」を参照してください。

### v0.9.2: レビューで見つかった編集・選択・目次の修正

- 選択ブックマークはDOMの位置と方向を保持し、メニューを開いても選択が動きません。本文変更後の古い選択や、一時的なブロック選択クラスによる挿入失敗を修正しました。
- div形式の貼り付け後のキャレット、カード・目次の後ろの入力行、入れ子引用のEnter、ボックス内の書式変換・Markdown入力を修正しました。動画の段落とボックス最後の入力行をBackspaceで誤削除しません。
- 複数・入れ子の目次とボックスは操作した対象を編集します。目次の保存時同期は不要なDOM変更をせず、自動挿入は初期フォーカスや変更イベントに影響しません。
- 選択なしのアップロードと同じ位置への並行アップロードに対応しました。ダイアログ表示中に完了した画像は保留され、ダイアログを閉じた後に挿入位置を選べます。
- 非表示ツールバーの余白、狭い画面での操作バーの重なり、プレビューの幅、外部UIから戻った際の操作バー表示、既存目次の番号表示を修正しました。

### v0.9.1: 編集操作の安定性と外部UI連携

- リンクカード・目次に隣接する、文字のある段落の先頭で Backspace、末尾で Delete を押すと、最初の1回はブロックを青枠で選択します。もう一度削除キーを押すとそのブロックだけを削除し、前後の段落は結合しません。Esc・選択移動で解除できます。ブラウザのキャレットは Delete なら手前の段落末尾、Backspace なら後ろの段落先頭を優先して保ち、文字・Enter・IME入力で青枠だけを解除します。コピー・切り取りも対象ブロックだけに作用します。
- カード・目次の直後の空段落で Backspace を押すと、その空段落を削除します。ただし末尾の入力用空行は維持し、カードの後ろに書き足せる状態を保ちます。この空行で Backspace を押してもカードは選択・削除されません。明示的な範囲削除と操作バーの削除は従来どおりです。
- ファイル選択・貼り付け・ドロップの画像アップロードは開始時の位置を使用します。本文の編集・ソースモード・readonly・IME変換等で戻れなければ、画像を保留して通知します。本文の挿入先を選び「現在の位置に挿入」か「画像を破棄」を押してください。失敗も通知します。成功通知は最新の1件にまとめて3秒後に消し、編集用イベントリスナーは成功時に解除します。保留と失敗（一部成功を含む）の通知は閉じるまで残します。保留はエディタの生存中のみで、HTML保存や再読み込みには含まれません。
- 外部ファイル選択画面からも `editor.uploadFiles(files, { bookmark, alt }?)` を利用できます。元の位置に挿入できた場合は Promise が true、保留・失敗は false。`uploadstatus` イベントは `{ status, count, failed, message }` を返します（uploading / inserted / pending / failed / discarded）。count は保留中の枚数です。
- アプリ側のモーダルなどへフォーカスが移ると、エディタのメニュー・ブロック操作バー・選択時ツールバーを閉じます。エディタに戻るまで、スクロールや選択イベントだけで再表示されることはありません。Popover API があるブラウザでは最上位層を使用するため、フォーカスを移さないトーストや読み込み表示より手前に出る場合があります。編集を遮断するアプリ側モーダルは、表示時にそのモーダルへフォーカスを移してください。
- Android実機およびデスクトップOSの日本語IMEによる確認は**未実施**です。接続可能なAndroid端末・デスクトップIME環境がなく、ブラウザの自動検証・IMEイベント模擬は実機検証を代替しません。Chrome 122/157のCDPでは、カード・目次の選択直後の文字/Enter/日本語入力、変換確定・取消、keyCode 229、undoを確認しました。実IME確認時は、この手順に加えてボックス内の日本語入力・変換取消・確定・Enter・Backspace・undo、アップロード完了と変換の重なり、キーボード表示中のメニューを確認します。
