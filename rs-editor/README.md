> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール / 読み込み

```bash
# npm（GitHubのtarball指定）
npm install https://github.com/sano1023/ryusuke-packages-dist/raw/main/tarballs/rs-editor-0.5.0.tgz
```

```html
<!-- CDN（jsDelivr・scriptタグ直読み） -->
<script src="https://cdn.jsdelivr.net/gh/sano1023/ryusuke-packages-dist@main/rs-editor/dist/rs-editor.min.js"></script>
```

```js
// ESM import（npmインストール後）
import { /* 公開API */ } from 'rs-editor';
// Vue 3
import { RsEditor } from 'rs-editor/vue';
// React 18
import { RsEditor } from 'rs-editor/react';
```

CSSが必要なパッケージは `dist/rs-editor.css` を link してください。

---

# rs-editor

プラグインアーキテクチャを持つ、依存ゼロのWYSIWYGエディタライブラリ。TinyMCE の代替を目指すプロジェクトです（現在 v0.5）。

- **依存ゼロ**: ランタイム依存なし。ビルド不要で `src/` から直接 import できる ESモジュール
- **プラグインアーキテクチャ**: 太字などの組み込み機能もすべて同じプラグインAPIで実装（利用者が数行で機能を追加できる）
- **HTML / JSON 両対応**: `getHTML()/setHTML()` に加え、構造化JSONでの入出力（`getJSON()/setJSON()`）をサポート。ラウンドトリップ保証つき
- **日本語IME対応**: composition 中は DOM に触れず、`onChange` も発火しない。「1変換 = 1履歴」で undo できる
- **`document.execCommand` 不使用**: Selection / Range API とドキュメントモデル変形による自前実装
- **v0.2 の追加機能**: テーブル / 文字色・背景色 / 配置・インデント / 画像アップロード連携・リサイズハンドル / フローティングツールバー / Markdownショートカット / Word・Googleドキュメント貼り付けの高度な浄化
- **v0.3 の拡張プラグイン（opt-in）**: TinyMCE の主要プラグイン相当を13本収録（下記）。すべて公開プラグインAPIだけで実装されており、同じ書き方で独自プラグインを作れる
- **v0.5 のブロック体験（opt-in）**: **スラッシュコマンド**（空段落で `/` → ブロック挿入メニュー・文字入力で絞り込み・↑↓Enter操作）／**チェックリスト**（☑クリックでトグル）／**コールアウト**（💡情報・⚠️注意・✅成功・📝メモの色付きボックス）／**ブロックのドラッグ並べ替え**（⠿ハンドル・undo対応）
- **v0.5 の有償プラグイン級（opt-in）**: **コメント**（選択範囲にアンカー・サイドパネルで一覧/解決・HTML属性だけで保存されるので外部ストア不要）／**脚注**（自動採番・文末リストに自動同期）／**フォーマットペインター**（書式コピー→次の選択に適用）／**リビジョン履歴**（版の保存・単語レベル差分・復元）— いずれも TinyMCE では有償プラグインの機能
- **v0.5 の日本語特化（opt-in）**: **ルビ**（ふりがな挿入・クリック編集）／**文字種変換**（全半角・ひらカタ・半角カナ→全角）／**かんたん校正**（全角英数・半角カナ・句読点混在・カタカナ長音ゆれ・ら抜き言葉を辞書レスで検出、ワンクリック/一括修正）／**縦書きプレビュー**
- **ライセンス**: MIT

対応ブラウザ: 最新の Chrome / Edge / Safari / Firefox（IE・旧ブラウザは非対応）

## デモ

```bash
# このリポジトリで
php -S localhost:8099   # または任意の静的サーバー
# → http://localhost:8099/rs-editor/demo/ を開く
```

デモでは全ツールバー機能・カスタムプラグイン（⭐スタンプ）・HTML/JSON出力のリアルタイム表示・ラウンドトリップ検査・readonly / destroy を試せます。

## インストール

npm公開前は、`src/` ディレクトリと `src/rs-editor.css` をコピーするだけで使えます。

```html
<link rel="stylesheet" href="./rs-editor/src/rs-editor.css">
```

```js
import { createRSEditor } from './rs-editor/src/index.js';
// npm公開後: import { createRSEditor } from 'rs-editor';
```

## クイックスタート

```html
<textarea id="content"><p>初期コンテンツ</p></textarea>
```

```js
import { createRSEditor } from 'rs-editor';

const editor = createRSEditor('#content', {
    // TinyMCE と同様のツールバー定義文字列（'|' はセパレータ）
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
| `on(event, cb)` / `off(event, cb)` | `change` `selectionchange` `focus` `blur` `init` `destroy` `sourcemode` |
| `commands.*` | プラグイン向けコマンド群（`toggleMark` `setHeading` `toggleList` `setLink` `setColor` `setBgColor` `setAlign` `indent` `outdent` `insertTable` `tableAddRow/Col` `tableDeleteRow/Col` `tableDelete` など） |

### 標準ツールバーボタン

`undo redo bold italic underline strikethrough forecolor backcolor h1 h2 h3 paragraph alignleft aligncenter alignright blockquote codeblock bullist numlist outdent indent link unlink image table code`

- `forecolor` / `backcolor` はパレットのドロップダウン（「色を解除」つき）
- `table` はドロップダウンで挿入・行/列の追加削除・表の削除。セル内は `Tab / Shift+Tab` で移動し、最終セルの `Tab` は行を追加
- `indent` / `outdent` はリスト内ではネスト操作、段落・見出しではインデント（最大8段）
- 画像はクリックで選択し、右下ハンドルのドラッグでリサイズ（width属性・縦横比維持）

ショートカット: `Ctrl+B/I/U`（太字/斜体/下線）、`Ctrl+Shift+X`（取り消し線）、`Ctrl+K`（リンク）、`Ctrl+Z / Ctrl+Y`（undo/redo）、リスト内 `Tab / Shift+Tab`（ネスト/解除）。コードブロック内は `Enter` で改行、空行でもう一度 `Enter` すると抜けます。引用内も空行で `Enter` すると引用の外に出ます（途中なら引用が分割される）。

### Markdown ショートカット

行頭で入力すると変換されます: `# ` `## ` `### `（見出し）、`- ` / `* `（箇条書き）、`1. `（番号付き）、`> `（引用）、`` ``` ``（コードブロック）。

### 拡張プラグイン（v0.3・opt-in）

標準では読み込まれません。使うものだけ import して `plugins` に渡し、ボタン名をツールバー定義に足します。

```js
import { charmap } from 'rs-editor/plugins/charmap';
import { searchreplace } from 'rs-editor/plugins/searchreplace';
import { wordcount } from 'rs-editor/plugins/wordcount';

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
| `toc` | `toc` | 目次ブロックの挿入/削除。挿入位置はメニューで選択（カーソル位置 / 先頭=タイトル直下）。h1〜h3 から自動生成・変更に自動追従。見出しに id（日本語対応スラッグ）を自動付与するので保存HTMLのままページ内ジャンプが動く |

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

### メニューのカスタマイズ — `pluginOptions`

ドロップダウンメニューの中身はプラグイン別オプションで差し替えられます。選択肢が1つだけになった場合はメニューを出さず直接実行されます。

```js
createRSEditor('#content', {
    pluginOptions: {
        toc: { positions: ['caret'] },                    // 'caret' | 'top'
        table: { menu: ['rowBelow', 'deleteTable'] },     // rowAbove/rowBelow/colLeft/colRight/deleteRow/deleteCol/deleteTable/'|'
        color: { palette: ['#000000', '#e06666'],         // 共通パレット（forePalette/backPaletteで個別指定も可）
                 allowClear: false },                      // 「色を解除」を出さない
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
import { createRSEditor, definePlugin } from 'rs-editor';

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

## 既知の制限（v0.5 時点）

- 折りたたみ（details/summary）ブロックは未実装（カスタムブロックは編集不可アトムになる位置モデルのため、編集可能な折りたたみはコア拡張が必要）
- ライブの変更履歴（Track Changes）は未実装。コアの入力パスへのフックが必要なため、代替として **revisions プラグイン（版の保存＋単語レベル差分＋復元）** を提供
- コメントはシングルユーザー向け（リアルタイム協調編集は非対応・スコープ外）
- proofread は辞書レスの機械的検出（形態素解析なし）。ら抜き検出は代表パターンのみ

- サイズは全プラグイン込みで約185KB（非圧縮・コメント込み。目安の50KBは超過）。opt-in プラグインは使う分だけ読み込まれ、minify+gzip では大幅に縮む
- リスト項目・テーブルセル内では見出し/引用への変換は効かない
- テーブルのセル結合UIは未実装（貼り付けられた colspan/rowspan は保持される）
- Word の箇条書きは段落として取り込まれる（リスト構造の再構築はしない）
- ブロック要素を含むHTMLを段落の途中に `insertContent` すると、現在のブロックの直後に挿入される
- アンカーは出力HTMLに `contenteditable="false"` とZWSPフィラーを含む（TinyMCEと同種の手法）
- toc プラグインは h1〜h3 の id を見出しテキスト由来のスラッグで管理する（手書きの id は上書きされる）
- 末尾がテーブルやカスタムブロックの場合、続きを書けるように空段落を自動で維持する（出力HTMLにも `<p><br></p>` が含まれる）
- TinyMCEインベントリのうち codesample（シンタックスハイライト・要ハイライタ）、pagebreak、directionality、help は未実装。必要なAPIサーフェス（カスタムノード・UI拡張・キーマップ）は実装済みプラグインで証明済みで、同じ書き方で追加できる

## 検証

Playwright による自動テスト（v0.1: 29項目 + v0.2: 21項目 + v0.3: 16項目 + toc: 9項目 + ブロック脱出UX: 12項目 + pluginOptions: 8項目 + v0.5: 18項目）で、基本操作・HTML/JSONラウンドトリップ・ペースト浄化・undo/redo・テーブル操作・色/配置/インデント・Markdownショートカット・フローティングツールバー・画像アップロード/リサイズ・全拡張プラグイン（v0.5の12本は実クリック/実ドラッグ/実キー入力で検証）に加え、日本語IME受け入れテスト（変換中の change 抑制 / 1変換=1履歴 / 太字継続 / リスト内変換→Enter）を CDP の IME エミュレーションで確認済み。

## ライセンス

MIT © ryusuke.sano
