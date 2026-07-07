> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール / 読み込み

```bash
# npm（GitHubのtarball指定）
npm install https://github.com/sano1023/ryusuke-packages-dist/raw/main/tarballs/rs-form-0.1.0.tgz
```

```html
<!-- CDN（jsDelivr・scriptタグ直読み） -->
<script src="https://cdn.jsdelivr.net/gh/sano1023/ryusuke-packages-dist@main/rs-form/dist/rs-form.min.js"></script>
```

```js
// ESM import（npmインストール後）
import { /* 公開API */ } from 'rs-form';
```

CSSが必要なパッケージは `dist/rs-form.css` を link してください。

---

# rs-form

スキーマ駆動・依存ゼロの日本語フォーム/アンケートライブラリ。SurveyJS / Typeform / Jotform などの有料フォーム製品の機能網羅を目指すプロジェクトです（現在 v0.1 = レンダラコア）。

- **スキーマは素のJSON・回答も素のJSON**: 独自クラスやバイナリ形式なし。git管理・DB保存・サーバ間受け渡しがそのまま出来る
- **依存ゼロ**: ランタイム依存なし。ビルド不要で `src/` から直接 import できる ESモジュール
- **質問タイプ12種**: text / textarea / number / radio / checkbox / select / rating / nps / date / email / tel / postal — すべて公開API `defineQuestionType()` で実装（利用者が数行で独自タイプを追加できる）
- **日本語バリデーション/入力補助を標準装備**: 全角/半角の自動変換（`charset`）・ひらがな/カタカナ変換・郵便番号のハイフン揺れ吸収（`１２３−４５６７`→`123-4567`）・電話番号の括弧/ハイフン整形と桁数検証・全角数字→number 型・和暦表示。エラーメッセージは日本語既定（個別/全体で上書き可）
- **条件表示 `visibleIf`**: `"kind == 'その他' && score > 3"` のような宣言的な式を**安全な自前ミニ式パーサ**（トークナイザ + 再帰下降）で評価。`eval` / `new Function` 不使用。非表示中の質問は検証対象外・回答JSONからも除外（値は内部保持し再表示で復元）
- **複数ページ + 進捗バー**: 次へ/戻る（戻っても入力値保持・エラーがあるページからは進めない）
- **localStorage 自動保存**: `autosave: true` でリロードしても下書きから復元。submit 成功でクリア
- **アクセシビリティ**: 全入力の label 紐付け・radio/checkbox/rating/nps は fieldset/legend・エラーは `aria-live="polite"` + `aria-invalid` + `aria-describedby`・Tab/矢印/Space/Enter だけで最後まで回答可能・タップターゲット44px以上・質問タイプに応じた `inputmode`/`autocomplete` 自動設定
- **アダプタ注入**: 住所自動補完（`addressLookup`）と日付ピッカー（`datepicker`、rs-datepicker 連携）は関数を注入するだけ。ライブラリ自身は外部APIを同梱も呼び出しもしない
- **ライセンス**: MIT

対応ブラウザ: 最新の Chrome / Edge / Safari / Firefox（IE・旧ブラウザは非対応）

## デモ

```bash
# このリポジトリで
php -S localhost:8099   # または任意の静的サーバー
# → http://localhost:8099/rs-form/demo/ を開く
```

デモでは問い合わせフォーム（2ページ・自動保存・住所補完・visibleIf）とアンケート（rating / nps / カスタム slider タイプ）の2本を、回答JSONのリアルタイム表示・イベントログ付きで試せます。

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
| `mode` | `'standard'` | 表示モード。`'readonly'` で回答閲覧（`'conversational'` は v0.2 予定） |
| `autosave` | `false` | localStorage への下書き自動保存。リロードで復元・submit 成功でクリア |
| `storageKey` | schema.title | 下書き保存キー（`rs-form:` プレフィックス付与） |
| `messages` | — | エラーメッセージの全体上書き（例: `{ required: '必須だよ' }`） |
| `questionTypes` | `[]` | `defineQuestionType()` で作った独自質問タイプの配列 |
| `addressLookup` | — | `async (postal) => ({ pref, city, town })`。postal 質問の `addressTo` と組で住所自動補完 |
| `datepicker` | — | `(input, api) => ({ destroy })`。date 質問を rs-datepicker 等に差し替えるアダプタ |
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
| `on(event, cb)` / `off(event, cb)` | `submit` `change` `pageChange` `visibilityChange` `validate` `answersChange` |
| `destroy()` | DOM とリスナーを破棄 |

### 質問タイプ早見表（v0.1 の12種）

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

全質問共通: `name`（必須・回答JSONのキー）/ `label` / `description` / `required` / `requiredMessage` / `visibleIf` / `validators`。

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
});
```

### テーマ

CSSカスタムプロパティで差し替えできます:

```css
.rsf {
    --rsf-primary: #16a34a;   /* アクセント色 */
    --rsf-error: #dc2626;     /* エラー色 */
    --rsf-radius: 4px;        /* 角丸 */
    --rsf-star: #f59e0b;      /* rating の星色 */
}
```

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
├────────────────────────────────────────────┤
│ StandardRenderer（v0.1）                    │  src/renderer-standard.js
└────────────────────────────────────────────┘
```

- **レンダラは「スキーマ + 回答」から常に再構築できる**: FormModel はスキーマ/回答に由来しない内部状態を持たない。式パーサ・正規化・検証は DOM 非依存の純粋関数で、node:test の単体テスト対象
- **visibleIf は依存グラフで再評価**: 式のコンパイル時に参照質問を収集し、値が変わった質問に依存する式だけを再評価（カスケードあり）。非表示質問の値は内部保持され、回答JSONからは除外・再表示で復元
- **日本語入力は「blur時に正規化 → 検証」のパイプライン**: 全角英数↔半角・半角カナ→全角（濁点合成）・かな⇔カナ・ハイフン類（ー−‐–—）統一の変換表を自前で持つ（Intl等への依存なし）
- **エラー領域は常に高さを確保**: エラーの表示/消去でレイアウトが動くと「ボタンの1回目のクリックが効かない」問題（CLS）が起きるため

## ロードマップ（REQUIREMENTS.md 参照）

- v0.2 — 対話モード（Typeform風・1問1画面）・matrix / file / signature 質問・ふりがな自動収集アダプタ
- v0.3 — GUIビルダー `createRSFormBuilder`（D&D・プロパティパネル・条件エディタ・undo/redo）
- v0.4 — 採点/クイズ・計算フィールド・集計サマリ（rs-chart 連携）
- v0.5 — 多言語スキーマ・A/Bバリアント・埋め込みスニペット

## 検証

node:test 単体テスト58件（ミニ式パーサ・全角半角/かなカナ/郵便番号/電話番号の正規化・バリデーション・FormModel）+ ヘッドレスChromium 受け入れテスト14項目（REQUIREMENTS §6: 必須エラーとフォーカス移動・visibleIf 連動・郵便番号/charset/tel の実タイプ入力（IME確定相当の全角入力を再現）・複数ページ・下書き復元・回答JSONラウンドトリップ・datepicker アダプタ・aria 検証・キーボードのみでの全問回答・異常系スキーマ・カスタムタイプ・コンソールエラー0件)を全パス。

## ライセンス

MIT © ryusuke.sano
