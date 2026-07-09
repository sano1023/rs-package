> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm install @parelabo/rs-form
```

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-form-0.5.0.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSForm } from '@parelabo/rs-form';
import '@parelabo/rs-form/rs-form.css';   // スタイル（バンドラ経由）

createRSForm(document.querySelector('#app'), schema, { /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@parelabo/rs-form@0.5.0/dist/rs-form.css">
<script src="https://cdn.jsdelivr.net/npm/@parelabo/rs-form@0.5.0/dist/rs-form.min.js"></script>
<script>
  // 公開APIはグローバル RSForm に載る
  RSForm.createRSForm(document.querySelector('#app'), schema, { /* オプション */ });
</script>
```

### Vue 3

```js
import { RsForm } from '@parelabo/rs-form/vue';
import '@parelabo/rs-form/rs-form.css';   // スタイル（バンドラ経由）
```

```vue
<template>
  <RsForm />
</template>
```

### React 18 / 19

```jsx
import { RsForm } from '@parelabo/rs-form/react';
import '@parelabo/rs-form/rs-form.css';   // スタイル（バンドラ経由）

export default function App() {
  return <RsForm />;
}
```

> `vue` / `react` は peerDependency です（バンドルには含みません）。アプリ側のものが使われます。

---

# rs-form

スキーマ駆動・依存ゼロの日本語フォーム/アンケートライブラリです（現在 v0.5 = レンダラコア + 対話モード + GUIビルダー + 採点/集計/テーマ + 多言語/A・Bバリアント/埋め込み）。

- **スキーマは素のJSON・回答も素のJSON**: 独自クラスやバイナリ形式なし。git管理・DB保存・サーバ間受け渡しがそのまま出来る
- **依存ゼロ**: ランタイム依存なし。ビルド不要で `src/` から直接 import できる ESモジュール
- **質問タイプ16種**: text / textarea / number / radio / checkbox / select / rating / nps / date / email / tel / postal / matrix / file / signature / **calc（計算フィールド）** — すべて公開API `defineQuestionType()` で実装（利用者が数行で独自タイプを追加できる）
- **採点/クイズモード（v0.4）**: 質問に `correctAnswer` と `points` を持たせ、`schema.scoring`（or `quiz: true`）で送信時に**採点結果画面**（得点・％・合否バッジ・設問ごとの正誤）を表示。checkbox は順不同の集合一致＋`partial: true` で部分点。`form.getGrade()` で素のJSONの採点結果も取得できる
- **計算フィールド（v0.4）**: `{ type: 'calc', expression: 'price * qty' }` で**他の回答から自動算出**する読み取り専用フィールド。visibleIf と同じ式パーサ（算術 `+ - * / %` を追加）で評価し、依存する回答が変わるたびに即時再計算・回答JSONにも載る
- **回答集計サマリ（v0.4）**: 複数回答（回答JSONの配列）を質問ごとに集計し、[rs-chart](../rs-chart) で可視化（選択肢の円グラフ・NPS分布・星評価の分布・数値の要約統計）。rs-chart は**読み取り連携（import して使うだけ）で opt-in**。未ロード時は自動で**表フォールバック**
- **テーマエディタ（v0.4）**: CSSカスタムプロパティ（`--rsf-*`）を GUI で編集し、プレビューに即時反映。`exportCSS()` で貼り付け用CSSも書き出せる
- **多言語スキーマ（v0.5）**: ラベル・説明・選択肢テキスト等を `{ ja: '...', en: '...' }` 形式で持てる。`{ locale: 'en' }` 指定や `form.setLocale('en')`（回答を保ったまま）で表示言語を切替。**単一文字列ラベルは完全後方互換**（そのまま両言語共通で表示）。畳み込みは DOM 非依存の純粋関数（`resolveSchemaLocale` / `resolveText` / `schemaLocales`）
- **A/Bバリアント（v0.5）**: `variantSeed`（利用者ID等）から**決定的に**バリアントを割り当て。`variant: 'A'` タグの質問/ページを振り分け・`variants: { A: {...}, B: {...} }` で同じ質問の文言だけ差し替え。純粋関数（`assignVariant` / `applyVariant` / `pickVariantSchema`）でサーバ側の計測と割当を一致させられる
- **埋め込みスニペット生成（v0.5）**: `generateEmbedSnippet(schema, { baseUrl })` で、任意サイトに貼れる **HTML + ESモジュール script**（マウント div + CSS link + `createRSForm()` 呼び出し + スキーマJSON同梱）を書き出す。ビルド不要のまま配布できる。locale / variant / mode も反映
- **対話モード（1問1画面・v0.2）**: `mode: 'conversational'` で1問1画面・Enter で次へ・選択肢は上下キー / 数字キーで選択・スライドアニメーション・完了画面。同一スキーマを standard / conversational で切り替え可能（回答JSONは同一）
- **GUIフォームビルダー（v0.3・別エントリ `rs-form/builder`）**: `createRSFormBuilder()` でノーコード編集。パレットから質問を **D&D** で追加・並べ替え・削除、プロパティパネルでラベル/選択肢/必須/バリデーション/表示条件を GUI 編集、**条件エディタ**で `visibleIf` を組み立て（式の直接編集も可）、**ライブプレビュー**（standard / conversational 切替）、スキーマJSONの**インポート/エクスポート/直接編集**、**undo/redo**。出力は `createRSForm()` にそのまま渡せる素のJSON。GUIビルダーも含めて全部 MIT
- **日本語バリデーション/入力補助を標準装備**: 全角/半角の自動変換（`charset`）・ひらがな/カタカナ変換・郵便番号のハイフン揺れ吸収（`１２３−４５６７`→`123-4567`）・電話番号の括弧/ハイフン整形と桁数検証・全角数字→number 型・和暦表示。エラーメッセージは日本語既定（個別/全体で上書き可）
- **条件表示 `visibleIf`**: `"kind == 'その他' && score > 3"` のような宣言的な式を**安全な自前ミニ式パーサ**（トークナイザ + 再帰下降）で評価。`eval` / `new Function` 不使用。非表示中の質問は検証対象外・回答JSONからも除外（値は内部保持し再表示で復元）
- **複数ページ + 進捗バー**: 次へ/戻る（戻っても入力値保持・エラーがあるページからは進めない）
- **localStorage 自動保存**: `autosave: true` でリロードしても下書きから復元。submit 成功でクリア
- **アクセシビリティ**: 全入力の label 紐付け・radio/checkbox/rating/nps は fieldset/legend・エラーは `aria-live="polite"` + `aria-invalid` + `aria-describedby`・Tab/矢印/Space/Enter だけで最後まで回答可能・タップターゲット44px以上・質問タイプに応じた `inputmode`/`autocomplete` 自動設定
- **ふりがな自動収集（v0.2）**: text 質問に `kanaTo` を付けると、IME の変換前の読み（ひらがな）を composition イベントから収集し、別フィールドへ自動転記
- **アダプタ注入**: 住所自動補完（`addressLookup`）・日付ピッカー（`datepicker`、rs-datepicker 連携）・ファイルアップロード（`uploadFile`、rs-upload 連携）・署名パッド（`signaturePad`、rs-sign 連携）・ふりがな抽出（`kanaSource`）は関数を注入するだけ。ライブラリ自身は外部APIを同梱も呼び出しもしない
- **ライセンス**: MIT

対応ブラウザ: 最新の Chrome / Edge / Safari / Firefox（IE・旧ブラウザは非対応）

## デモ

```bash
# このリポジトリで
php -S localhost:8099   # または任意の静的サーバー
# → http://localhost:8099/rs-form/demo/ を開く
```

デモでは問い合わせフォーム（2ページ・自動保存・住所補完・visibleIf・ふりがな自動収集）とアンケート（rating / nps / カスタム slider タイプ）、**対話モード**（1問1画面・matrix / file / signature・住所補完）を回答JSONのリアルタイム表示・イベントログ付きで、**フォームビルダー（v0.3）** タブでは D&D・プロパティ編集・条件エディタ・ライブプレビュー切替・スキーマ入出力・undo/redo を、**採点・計算 / 回答集計 / テーマ（v0.4）** タブでは採点クイズ＋結果画面・計算フィールドの自動算出・rs-chart による回答集計サマリ（表フォールバック切替つき）・テーマエディタを、さらに **配布・多言語（v0.5）** タブでは日本語/英語の言語切替・A/Bバリアントの決定的割当表示・埋め込みスニペットの出力を試せます。

## インストール

npm公開前は、`src/` ディレクトリをコピーするだけで使えます。

```html
<link rel="stylesheet" href="./rs-form/src/rs-form.css">
```

```js
import { createRSForm } from './rs-form/src/index.js';
// npm公開後: import { createRSForm } from 'rs-form';
```

## クイックスタート

```js
import { createRSForm } from 'rs-form';

const schema = {
    title: 'お問い合わせフォーム',
    pages: [
        {
            title: 'お客様情報',
            questions: [
                { type: 'text',   name: 'name',     label: 'お名前', required: true },
                { type: 'text',   name: 'nameKana', label: 'ふりがな', charset: 'hiragana' },
                { type: 'postal', name: 'zip',      label: '郵便番号', addressTo: 'address' },
                { type: 'text',   name: 'address',  label: '住所' },
                { type: 'email',  name: 'email',    label: 'メールアドレス', required: true },
                { type: 'tel',    name: 'tel',      label: '電話番号' },
            ],
        },
        {
            title: 'お問い合わせ内容',
            questions: [
                { type: 'radio', name: 'kind', label: '種別', required: true,
                  choices: ['製品について', 'お見積り', 'その他'] },
                { type: 'text', name: 'kindOther', label: '種別（その他の内容）',
                  visibleIf: "kind == 'その他'", required: true },
                { type: 'textarea', name: 'body', label: '内容', required: true,
                  validators: [{ type: 'length', max: 2000 }] },
                { type: 'rating', name: 'satisfaction', label: 'サイトの分かりやすさ', max: 5 },
            ],
        },
    ],
};

const form = createRSForm('#app', schema, { autosave: true });

form.on('submit', ({ answers }) => sendToServer(answers)); // 回答は素のJSON
form.getAnswers();       // { name: '佐野', zip: '123-4567', kind: 'その他', ... }
form.setAnswers(saved);  // 回答の流し込み（getAnswers とラウンドトリップ保証）
form.getSchema();        // スキーマJSON（ラウンドトリップ保証）
form.validate();         // 手動検証 → { ok, errors: [{ name, pageIndex, messages }] }
form.destroy();
```

## API

### `createRSForm(target, schema, options): RSForm`

| オプション | 型 / 既定値 | 説明 |
|---|---|---|
| `mode` | `'standard'` | 表示モード。`'readonly'` で回答閲覧。`'conversational'` で対話モード（`import 'rs-form/conversational'` が必要） |
| `autosave` | `false` | localStorage への下書き自動保存。リロードで復元・submit 成功でクリア |
| `storageKey` | schema.title | 下書き保存キー（`rs-form:` プレフィックス付与） |
| `messages` | — | エラーメッセージの全体上書き（例: `{ required: '必須だよ' }`） |
| `questionTypes` | `[]` | `defineQuestionType()` で作った独自質問タイプの配列 |
| `addressLookup` | — | `async (postal) => ({ pref, city, town })`。postal 質問の `addressTo` と組で住所自動補完 |
| `datepicker` | — | `(input, api) => ({ destroy })`。date 質問を rs-datepicker 等に差し替えるアダプタ |
| `uploadFile` | — | `async (file) => ({ url, id, ... })`。file 質問を rs-upload 等でアップロードするアダプタ（指定時は dataURL の代わりに参照を回答に載せる） |
| `signaturePad` | — | `(canvas, api) => ({ destroy })`。signature 質問を rs-sign 等に差し替えるアダプタ |
| `kanaSource` | — | `(endData, ctx) => reading`。ふりがな読みの抽出戦略を差し替えるアダプタ（既定は composition イベントから収集） |
| `submitText` / `nextText` / `prevText` | 送信 / 次へ / 戻る | ボタン文言 |
| `progressBar` | `true` | 複数ページ時の進捗バー表示 |
| `showCompleted` | `true` | submit 成功後に完了画面（`schema.completedText`）を表示 |

### RSForm メソッド

| メソッド | 説明 |
|---|---|
| `getAnswers()` / `setAnswers(json)` | 回答JSONの取得/流し込み（ラウンドトリップ保証）。number は数値型・checkbox は配列・非表示質問は含まない |
| `getSchema()` | スキーマJSONを返す（deep clone・ラウンドトリップ保証） |
| `validate(pageIndex?)` | 検証してエラーをUI表示。`{ ok, errors }` を返す |
| `submit()` | 全体検証 → OKなら `submit` イベント発火・下書きクリア |
| `nextPage()` / `prevPage()` / `goToPage(i)` | ページ遷移（次へは現在ページの検証つき） |
| `getValue(name)` / `setValue(name, v)` | 個別値の取得/設定（visibleIf は自動で再評価） |
| `isVisible(name)` / `getProgress()` / `clearDraft()` | 表示状態・進捗・下書き削除 |
| `getGrade()` | クイズ採点結果 `{ score, maxScore, percent, correctCount, total, passed, details }` を返す（`scoring`/`quiz` スキーマのときのみ・それ以外は `null`） |
| `on(event, cb)` / `off(event, cb)` | `submit` `change` `pageChange` `visibilityChange` `validate` `answersChange` |
| `destroy()` | DOM とリスナーを破棄 |

### 質問タイプ早見表（16種）

| タイプ | 主な指定 | 説明 |
|---|---|---|
| `text` | `charset` `placeholder` | 1行テキスト。`charset: hiragana / katakana / zenkaku / hankaku / alnum` で blur 時に自動変換 + 検証 |
| `textarea` | `rows` `maxLength` | 複数行。`maxLength` か length バリデータで文字数カウンタ表示 |
| `number` | `min` `max` `unit` | 全角数字も自動で半角化し、回答JSONでは number 型 |
| `radio` | `choices` `other` | 単一選択。`other: true` で「その他（自由記述）」を追加（回答は `name_other` キーに併記） |
| `checkbox` | `choices` `minSelect` `maxSelect` `other` | 複数選択。回答は配列（選択肢順） |
| `select` | `choices` `placeholder` | ドロップダウン |
| `rating` | `max`（既定5） | 星評価。キーボード（矢印キー）操作可 |
| `nps` | `minLabel` `maxLabel` | 0〜10 のネットプロモータースコア |
| `date` | `wareki` `min` `max` | ネイティブ `<input type=date>`。`wareki: true` で和暦を併記。`datepicker` アダプタで差し替え可 |
| `email` | — | 形式検証・全角英数の自動変換 |
| `tel` | — | `03（1234）5678` 等の揺れを正規化・桁数検証（10〜11桁） |
| `postal` | `addressTo` | `１２３−４５６７` → `123-4567` 正規化。`addressTo` + `addressLookup` で住所自動補完 |
| `matrix` | `rows` `columns` `multiple` `requireAllRows` | 行×列の一括評価。回答は `{行value: 列value}` オブジェクト（`multiple: true` で行ごと複数選択＝配列）。`required` で全行必須 |
| `file` | `accept` `multiple` `capture` | 実ファイル添付。回答は `{ name, size, type, dataUrl }`（`multiple` で配列）。`uploadFile` アダプタ指定時は参照 `{ url, id, ... }` |
| `signature` | `width` `height` `penColor` | canvas 手書き署名 → `data:image/png;base64,...` の dataURL。`signaturePad` アダプタで rs-sign 等に差し替え可 |
| `calc` | `expression`（or `calc`）`unit` | 他の回答から自動算出する読み取り専用フィールド（例: `expression: 'price * qty'`）。依存が変わると即時再計算。回答JSONにも計算結果が載る |

全質問共通: `name`（必須・回答JSONのキー）/ `label` / `description` / `required` / `requiredMessage` / `visibleIf` / `validators`。
採点用: `correctAnswer`（正解・checkbox は配列）/ `points`（配点・既定1）/ `partial`（checkbox の部分点）。
テキスト系は `kanaTo`（ふりがな転記先の質問name）も指定できます。

### バリデーション

```js
// 質問に validators 配列で指定（message で個別上書き）
{ type: 'text', name: 'code', validators: [
    { type: 'pattern', regexp: '^[A-Z]{3}-\\d{4}$', message: '「ABC-1234」形式で入力してください' },
    { type: 'length', min: 8, max: 8 },
] }
```

組み込み: `required` / `pattern` / `range`（min/max）/ `length`（min/max）/ `charset` / `email` / `tel` / `postal` / `minSelect` / `maxSelect` / `date`。独自バリデータは組み込みと同格に追加できます:

```js
import { defineValidator } from 'rs-form';

defineValidator('corpEmail', (value) =>
    String(value).endsWith('.co.jp') || '会社のメールアドレスを入力してください');

// スキーマ側: validators: ['corpEmail']
```

### 条件表示 — `visibleIf`

```js
{ type: 'text', name: 'kindOther', visibleIf: "kind == 'その他'" }
{ type: 'textarea', name: 'reason', visibleIf: "nps <= 6 && renew != 'はい'" }
{ type: 'text', name: 'fax', visibleIf: "contactBy contains 'FAX'" }   // checkbox 配列
{ type: 'text', name: 'note', visibleIf: "(a == 1 || b == 1) && memo notempty" }
```

- 演算子: `== != > >= < <= && || !`・`contains`（配列/部分文字列）・`empty` / `notempty`（後置）・括弧
- オペランド: 質問name（日本語可）・文字列/数値/真偽リテラル
- 構文エラーは `console.warn` して**常に表示**（安全側）。依存する質問の変更時のみ再評価

### 対話モード — `mode: 'conversational'`（v0.2）

1問ずつ表示するモード。standard と**同じスキーマ・同じ FormModel・同じ回答JSON**で、レンダラだけが差し替わります。対話モードのコードは別エントリ（`rs-form/conversational`）なので、standard だけの利用者には読み込まれません。

```js
import { createRSForm } from 'rs-form/conversational';   // これで conversational レンダラが登録される

createRSForm('#app', schema, { mode: 'conversational' });
```

- **1問1画面**・進捗表示・スライドアニメーション・完了画面
- **キーボードファースト**: Enter で次へ（最後の質問で送信）・選択肢は ↑↓ で移動 / 数字キー 1〜9 で選択・textarea は Enter が改行（Ctrl/Cmd+Enter で次へ）
- 現在の質問を検証してから次へ進む（必須未入力なら進めずエラー表示）。戻る（`prev`）で前の回答は保持
- `visibleIf` で非表示の質問は自動でスキップされる

### GUIフォームビルダー — `createRSFormBuilder(target, options)`（v0.3）

スキーマを GUI で編集するノーコードビルダー。**別エントリ（`rs-form/builder`）** なので、レンダラだけの利用者には1バイトも読み込まれません。パレットのソースは質問タイプ registry、プレビューは既存レンダラ（`createRSForm`）の再利用で、**スキーマ（素のJSON）が唯一の真実**です。

```js
import { createRSFormBuilder } from 'rs-form/builder';   // 別エントリ
import 'rs-form/rs-form.css';                            // 同じ1枚に .rsfb-* も含む

const builder = createRSFormBuilder('#builder', { schema });   // schema は任意（省略可）
builder.on('change', () => save(builder.getSchema()));         // 出力はレンダラと同じ素のJSON
```

できること:

- **パレット D&D**: 質問タイプをキャンバスへドラッグ＆ドロップで追加（クリックでも追加）。カードは D&D で並べ替え・✕で削除
- **プロパティパネル**: 選択した質問の ラベル / キー(name) / 説明 / プレースホルダ / 必須 / 選択肢（1行1つ・「値 &#124; 表示」）/ 最小最大 / 文字数・正規表現バリデーション を GUI 編集（name 変更時は `visibleIf` の参照も追従）
- **条件エディタ**: `質問 × 演算子（== != > >= < <= contains empty notempty）× 値` の行を AND / OR で束ねて `visibleIf` を組み立て。**式の直接編集**も可能で、単純な式は GUI に自動で戻る（複雑な式は直接編集にフォールバック）
- **ライブプレビュー**: 編集中のスキーマを standard / conversational を切り替えて実レンダラで即プレビュー
- **スキーマJSON入出力**: 整形エクスポート・テキストからのインポート（不正JSONは非破壊でエラー表示）・直接編集
- **undo / redo**: すべての編集を履歴で取り消し・やり直し（連続タイプは1操作に集約）

主なメソッド: `getSchema()` / `setSchema(json)` / `addQuestion(type, opts?)` / `removeQuestion(name)` / `moveQuestion(name, page, index)` / `updateQuestion(name, patch, editKey?)` / `renameQuestion(old, new)` / `setVisibleIf(name, expr)` / `selectQuestion(name)` / `setPreviewMode('standard'|'conversational')` / `exportJSON()` / `importJSON(str)` / `undo()` / `redo()` / `on/off('change'|'select', cb)` / `getPreviewForm()` / `destroy()`。

スキーマ操作（追加/並べ替え/削除/プロパティ更新/選択肢テキスト変換/`visibleIf` の構築・解析・参照リネーム）は DOM 非依存の純粋関数（`builder-ops.js`）として切り出され、`visibleIf` の解析は既存の式パーサ（`expr.js`）を再利用します（node:test で単体テスト済み）。

### ふりがな自動収集 — `kanaTo`（v0.2）

漢字の氏名欄に `kanaTo` を付けると、IME の**変換前の読み（ひらがな）**を composition イベントから収集し、ふりがな欄へ自動転記します（外部辞書・API 不要）。

```js
{ type: 'text', name: 'name', label: 'お名前', kanaTo: 'nameKana' },
{ type: 'text', name: 'nameKana', label: 'ふりがな', charset: 'hiragana' }, // 転記先。katakana も可
```

読みの抽出戦略は `options.kanaSource = (endData, { input, source, target }) => reading` で差し替えられます（`undefined` を返すと既定ロジックにフォールバック）。純粋ロジックは `KanaCollector` として単体テスト可能です。

### カスタム質問タイプ — `defineQuestionType(def)`

組み込み12種と同じAPIです。入力要素を作って返すだけで、ラベル・必須マーク・エラー表示・aria 配線・回答JSONへの反映はコアが行います:

```js
import { defineQuestionType, createRSForm } from 'rs-form';

const slider = defineQuestionType({
    name: 'slider',
    defaults: { min: 0, max: 100 },
    render(ctx) {
        const input = document.createElement('input');
        input.type = 'range';
        input.min = ctx.q.min; input.max = ctx.q.max;
        input.value = ctx.value ?? ctx.q.min;
        input.addEventListener('input', () => ctx.setValue(Number(input.value)));
        input.addEventListener('blur', () => ctx.commit());
        return input;
    },
});

createRSForm('#el', schema, { questionTypes: [slider] });
```

`ctx`: `q`（質問定義）/ `id` / `value` / `setValue(v)` / `commit()`（正規化+検証）/ `setComment` / `getComment` / `form` / `onCleanup(fn)`。radio のように fieldset/legend で括りたい場合は `group: true` を指定します。

### アダプタ（住所補完・日付ピッカー）

```js
createRSForm('#app', schema, {
    // 郵便番号 → 住所。ライブラリは外部APIを呼ばない（zipcloud 等の利用は利用側の判断）
    addressLookup: async (postal) => {
        const r = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postal}`).then((x) => x.json());
        const a = r.results?.[0];
        return a ? { pref: a.address1, city: a.address2, town: a.address3 } : null;
    },
    // date 質問を rs-datepicker に差し替え
    datepicker: (input, api) => {
        const dp = createRSDatepicker(input, { onSelect: (iso) => api.setValue(iso) });
        return { destroy: () => dp.destroy() };
    },
    // file 質問を rs-upload でアップロード（回答には参照だけを載せる）
    uploadFile: async (file) => {
        const { url, id } = await rsUpload.put(file);
        return { name: file.name, size: file.size, type: file.type, url, id };
    },
    // signature 質問を rs-sign に差し替え
    signaturePad: (canvas, api) => {
        const pad = createRSSign(canvas, { onEnd: (dataUrl) => api.setValue(dataUrl) });
        return { destroy: () => pad.destroy() };
    },
});
```

> **連携パッケージについて**: `uploadFile`（rs-upload）と `signaturePad`（rs-sign）は「アダプタ契約」だけを定めています。契約さえ満たせば任意の実装を注入でき、アダプタ未指定でも file は dataURL 埋め込み・signature は内蔵 canvas 手書きで**単体で動作**します。

### 採点 / クイズモード（v0.4）

質問に正解と配点を付け、スキーマに `scoring`（or `quiz: true`）を付けると、送信時に採点結果画面が出ます。

```js
const quiz = {
    title: '確認テスト',
    scoring: { passingPercent: 70, showCorrectness: true }, // quiz: true でも可（合否なし）
    pages: [{ questions: [
        { type: 'radio',    name: 'q1', label: '首都は？', choices: ['東京', '大阪'], correctAnswer: '東京', points: 1 },
        { type: 'checkbox', name: 'q2', label: '偶数を全て', choices: ['1','2','3','4'],
          correctAnswer: ['2', '4'], points: 2, partial: true }, // 順不同・部分点
        { type: 'number',   name: 'q3', label: '7×8', correctAnswer: 56, points: 1 },
    ] }],
};
const form = createRSForm('#app', quiz);
form.on('submit', () => console.log(form.getGrade()));
// → { score: 4, maxScore: 4, percent: 100, correctCount: 3, total: 3, passed: true, details: [...] }
```

採点ロジック（`gradeAnswers` / `gradeQuestion` / `isCorrect`）は DOM 非依存の純粋関数で、回答JSONだけから採点できます（サーバ側採点にも使えます）。

### 計算フィールド（v0.4）

`type: 'calc'` は他の回答から自動算出する読み取り専用フィールドです。式は visibleIf と同じミニ式パーサ（算術 `+ - * / %` と単項マイナスを追加）で評価します。

```js
{ type: 'number', name: 'price', label: '単価' },
{ type: 'number', name: 'qty',   label: '数量' },
{ type: 'calc',   name: 'subtotal', label: '小計', expression: 'price * qty', unit: '円' },
{ type: 'calc',   name: 'tax',      label: '消費税', expression: 'subtotal * 0.1', unit: '円' }, // calc→calc も可
{ type: 'text',   name: 'note',  label: '備考', visibleIf: 'subtotal > 10000' }, // 計算値を条件にも使える
```

未回答のオペランドは 0 扱いで計算が壊れず、依存が変わるたびに即時再計算されます。計算結果は回答JSONにも載ります。

### 回答集計サマリ（v0.4・rs-chart 連携）

複数回答（回答JSONの配列）を質問ごとに集計し、[rs-chart](../rs-chart) で可視化します。rs-chart は **import して使うだけ**の opt-in 連携で、渡さなければ表にフォールバックします。

```js
import { createRSFormSummary } from 'rs-form/summary';
import { createRSChart } from 'rs-chart';   // ← 読み取り連携（未使用ならフォールバック）

createRSFormSummary('#summary', {
    schema,                 // or questions: [...]
    responses: [ {...}, {...}, ... ],  // 回答JSONの配列
    createChart: createRSChart,        // 省略/false なら表フォールバック
});
```

選択肢は円グラフ・NPS は 0〜10 の分布 + NPS スコア・rating は星の分布 + 平均・number は要約統計を出します。集計関数（`summarize` / `tallyChoices` / `tallyNPS` / `tallyRating` / `numericStats`）は純粋関数です。

### テーマ / テーマエディタ（v0.4）

CSSカスタムプロパティで差し替えできます（定義は `.rsf` スコープ）:

```css
.rsf {
    --rsf-primary: #16a34a;   /* アクセント色 */
    --rsf-error: #dc2626;     /* エラー色 */
    --rsf-radius: 4px;        /* 角丸 */
    --rsf-star: #f59e0b;      /* rating の星色 */
}
```

GUI で編集してプレビューへ即時反映するテーマエディタも同梱しています:

```js
import { createRSFormThemeEditor } from 'rs-form/theme';
const ed = createRSFormThemeEditor('#editor', { apply: '#preview' }); // #preview 内のフォームに反映
ed.on('change', (theme) => save(theme));
ed.exportCSS();   // ":root, .rsf { --rsf-primary: ...; }" を書き出す
```

### 多言語スキーマ（v0.5）

ラベル・説明・選択肢テキスト・`minLabel`/`maxLabel`・`title` などのテキスト系フィールドを `{ ja, en }` 形式で持てます。値（選択肢の `value` など）は多言語化の対象外なので、回答JSONは言語に依らず同一です。**単一文字列のラベルはそのまま**（後方互換）。

```js
const schema = {
    title: { ja: 'お申し込み', en: 'Registration' },
    pages: [{ questions: [
        { type: 'text',  name: 'name', label: { ja: 'お名前', en: 'Name' }, placeholder: 'shared' /* 単一文字列=両言語共通 */ },
        { type: 'radio', name: 'plan', label: { ja: 'プラン', en: 'Plan' },
          choices: [{ value: 'lite', text: { ja: 'ライト', en: 'Lite' } }] }, // value は不変・text だけ翻訳
    ] }],
};
const form = createRSForm('#app', schema, { locale: 'ja', fallbackLocale: 'ja' });
form.setLocale('en');       // 回答・ページ位置を保ったまま表示言語を切替
form.availableLocales();    // → ['en', 'ja']（スキーマから収集）
```

畳み込みは DOM 非依存の純粋関数です（`rs-form/i18n`）:

```js
import { resolveSchemaLocale, resolveText, schemaLocales } from 'rs-form/i18n';
resolveText({ ja: 'はい', en: 'Yes' }, 'en');   // → 'Yes'（単一文字列や undefined はそのまま返す）
resolveSchemaLocale(schema, 'en', { fallbackLocale: 'ja' }); // → 従来どおりの素のスキーマ
```

### A/Bバリアント（v0.5）

`variantSeed`（利用者ID・セッションID等）から**決定的に**バリアントを割り当てます。同じシードなら常に同じバリアントになるので、サーバ側で計測した割当と一致します。

```js
const schema = { pages: [{ questions: [
    { type: 'text', name: 'name', label: 'お名前' },                 // 未タグ = 全バリアント共通
    { type: 'textarea', name: 'q_a', label: '質問', variant: 'A' },  // A だけに出す
    { type: 'text', name: 'ref', label: '紹介コード', variant: 'B' },// B だけに出す
    { type: 'radio', name: 'cta', label: '既定', choices: ['x'],
      variants: { A: { label: '今すぐ申し込む' }, B: { label: '無料で始める' } } }, // 文言だけ差し替え
] }] };
const form = createRSForm('#app', schema, { variantSeed: userId }); // or { variant: 'A' } で明示
form.getVariant();   // → 'A' | 'B'
```

割当・振り分けは純粋関数です（`rs-form/variant`）:

```js
import { assignVariant, applyVariant, pickVariantSchema } from 'rs-form/variant';
assignVariant(userId, ['A', 'B']);                 // 決定的に 'A' or 'B'（{ A:{weight:2}, B:{} } で重み付け可）
const { variant, schema: applied } = pickVariantSchema(schema, userId); // 割当＋具体スキーマ
```

### 埋め込みスニペット生成（v0.5）

スキーマから、任意サイトに貼れる **HTML + ESモジュール script** を書き出します。ビルド不要のまま配布できます。

```js
import { generateEmbedSnippet } from 'rs-form/embed';
const html = generateEmbedSnippet(schema, {
    baseUrl: 'https://cdn.example.com/rs-form/src', // index.js / rs-form.css の置き場所
    mountId: 'my-form', locale: 'en', variant: 'A', // mode: 'conversational' も可
});
// → <link rel="stylesheet" ...><div id="my-form"></div>
//    <script type="module">import { createRSForm } from '.../index.js'; ... createRSForm('#my-form', schema, {...})</script>
```

スキーマは JSON として script 内に同梱され、`</script>` を含む文字列も安全にエスケープされます（値は不変）。構成要素を個別に取りたいときは `buildEmbedSnippet` が `{ html, js, css, importUrl, schemaJson, ... }` を返します。

## 仕組み

```
┌────────────────────────────────────────────┐
│ 公開API  createRSForm(el, schema, options)  │  src/index.js
├────────────────────────────────────────────┤
│ Schema（素のJSON = 唯一の真実）              │
├────────────────────────────────────────────┤
│ FormModel（値・検証・visibleIf・ページ遷移・ │  src/model.js（DOM非依存）
│  localStorage自動保存・イベント）            │
├────────────────────────────────────────────┤
│ QuestionType プラグイン（組み込みも同格）    │  src/types.js
│  + defineValidator / 日本語正規化           │  src/validators.js, src/ja-text.js（純粋関数）
│  + ふりがな自動収集（KanaCollector）        │  src/kana-source.js
├───────────────────────────┬────────────────┤
│ StandardRenderer          │ Conversational  │  src/renderer-standard.js
│（複数ページ）              │ Renderer（対話）│  src/renderer-conversational.js
│  ← 1質問の組み立て(ラベル/aria)を共有 →    │  src/render-question.js
└───────────────────────────┴────────────────┘
```

- **2つのレンダラは同じ FormModel を共有**し、1質問の組み立て（ラベル・必須マーク・エラー・fieldset/legend・aria 配線）は `render-question.js` に集約。conversational は `rs-form/conversational` 別エントリで、standard 利用者には読み込まれない

- **レンダラは「スキーマ + 回答」から常に再構築できる**: FormModel はスキーマ/回答に由来しない内部状態を持たない。式パーサ・正規化・検証は DOM 非依存の純粋関数で、node:test の単体テスト対象
- **visibleIf は依存グラフで再評価**: 式のコンパイル時に参照質問を収集し、値が変わった質問に依存する式だけを再評価（カスケードあり）。非表示質問の値は内部保持され、回答JSONからは除外・再表示で復元
- **日本語入力は「blur時に正規化 → 検証」のパイプライン**: 全角英数↔半角・半角カナ→全角（濁点合成）・かな⇔カナ・ハイフン類（ー−‐–—）統一の変換表を自前で持つ（Intl等への依存なし）
- **エラー領域は常に高さを確保**: エラーの表示/消去でレイアウトが動くと「ボタンの1回目のクリックが効かない」問題（CLS）が起きるため

## ロードマップ（REQUIREMENTS.md 参照）

- v0.2 ✅ — 対話モード（1問1画面）・matrix / file / signature 質問・ふりがな自動収集（kanaTo / kanaSource）・住所補完/rs-upload/rs-sign アダプタ契約
- v0.3 ✅ — GUIビルダー `createRSFormBuilder`（別エントリ `rs-form/builder`・パレットD&D・プロパティパネル・条件エディタ・ライブプレビュー standard/conversational 切替・スキーマJSON入出力・undo/redo）
- v0.4 ✅ — 採点/クイズ（正解・配点・合否・結果画面）・計算フィールド（`type: 'calc'`）・回答集計サマリ（rs-chart 連携・表フォールバック）・テーマエディタ（別エントリ `rs-form/summary` `rs-form/theme` `rs-form/scoring`）
- v0.5 ✅ — 多言語スキーマ（`{ja,en}` ラベル・`setLocale`・別エントリ `rs-form/i18n`）・A/Bバリアント（決定的シード割当・`rs-form/variant`）・埋め込みスニペット生成（`rs-form/embed`）

node:test 単体テスト162件（ミニ式パーサ＋算術拡張・全角半角/かなカナ/郵便番号/電話番号の正規化・バリデーション・FormModel・KanaCollector・matrix検証・オブジェクト値ラウンドトリップ・ビルダーのスキーマ操作19件・採点/計算フィールド/集計/テーマ 41件・**多言語/A・Bバリアント/埋め込み 28件**）+ ヘッドレスChromium 受け入れテスト（v0.1: 14項目 / v0.2: 10項目 / v0.3: 9項目 / v0.4: 8項目 / v0.5: 6項目）を全パス。v0.5 分は多言語スキーマの locale 切替でラベルが切り替わること・単一文字列labelの後方互換・A/Bバリアントで質問が決定的に振り分けられること・埋め込みスニペットが有効なHTML/JSを出し実際にマウントできること・コンソールエラー0件を機械検証。

## ライセンス

MIT © ryusuke.sano
