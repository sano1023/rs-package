> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール / 読み込み

```bash
# npm（GitHubのtarball指定）
npm install https://github.com/sano1023/ryusuke-packages-dist/raw/main/tarballs/rs-datepicker-0.3.0.tgz
```

```html
<!-- CDN（jsDelivr・scriptタグ直読み） -->
<script src="https://cdn.jsdelivr.net/gh/sano1023/ryusuke-packages-dist@main/rs-datepicker/dist/rs-datepicker.min.js"></script>
```

```js
// ESM import（npmインストール後）
import { /* 公開API */ } from 'rs-datepicker';
```

CSSが必要なパッケージは `dist/rs-datepicker.css` を link してください。

---

# rs-datepicker

日本語ファースト・依存ゼロの日付ピッカー。単一/複数/期間選択・時刻・年スクロールナビゲーション・マーカー・**分割フィールド（年select＋月日モーダル）**を備え、CSSカスタムプロパティでテーマを差し替えられます。ビルド不要・ESモジュール。

- **年の移動が速い**: タイトル（「2026年7月」）クリック → 年スクロールリスト → 月グリッド → 日、の3タップで任意の年月へ
- **期間選択が分かりやすい**: 1クリック目からホバーで帯がプレビュー。期間中は帯色、開始・終了日だけマーカー（色は設定可能）。2ヶ月並べて表示も可
- **拡張できる**: 日付ごとの色ドット＋ラベル（markers）、日セルの最終カスタムフック（renderDay）、無効日、ロケール差し替え
- キーボード操作・aria対応・input直接タイプのゆるいパース（`2026/7/5`・`2026-07-05`・`7月5日` など）

## デモ

```bash
# このリポジトリで
php -S localhost:8099
# → http://localhost:8099/rs-datepicker/demo/ を開く
```

## インストール

npm 公開前のため、`src/` をプロジェクトにコピーして import してください。

```html
<link rel="stylesheet" href="rs-datepicker/rs-datepicker.css">
```

```js
import { createRSDatePicker } from './rs-datepicker/index.js';
```

## クイックスタート

```js
// 基本（input にアタッチ）
const dp = createRSDatePicker('#date', {
    onChange: (value) => console.log(value),   // Date | Date[] | {from, to} | null
});

// 期間選択（2ヶ月表示・帯と端点マーカーの色をカスタム）
createRSDatePicker('#term', {
    mode: 'range',
    months: 2,
    rangeColors: { band: '#fde9d9', endpoint: '#f28e2b' },
});

// 日時（時:分のスクロール列・5分刻み）
createRSDatePicker('#at', { showTime: true, timeStep: 5 });

// フォーム送信（name指定でhidden出力。表示は日本語・送信はYYYY-MM-DD）
createRSDatePicker('#booking', { name: 'booking_date' });
//   → <input type=hidden name=booking_date value=2026-07-15>
createRSDatePicker('#stay', { mode: 'range', name: 'period' });
//   → period_from / period_to の2個
createRSDatePicker('#days', { mode: 'multiple', name: 'holidays' });
//   → 選択数ぶん holidays[] を生成（サーバーで配列受け取り）
```

## API

### `createRSDatePicker(target, options): DatePicker`

`target` は `<input>`（ポップアップ）またはコンテナ要素（`inline: true`）。

| オプション | 既定値 | 説明 |
| --- | --- | --- |
| `mode` | `'single'` | `'single'` / `'multiple'`（トグル複数選択） / `'range'`（期間） |
| `months` | `1` | 並べて表示する月数（1〜3。rangeは2が定番） |
| `inline` | `false` | ポップアップではなく常時表示 |
| `showTime` | `false` | 時:分の選択列を表示（「確定」で閉じる） |
| `timeStep` | `5` | 分の刻み |
| `format` | `'YYYY/MM/DD'` | トークン（`YYYY MM DD M D HH mm ddd`）または関数 `(date) => string` |
| `defaultValue` | — | 初期値（`Date` / 文字列 / 配列 / `{from, to}`） |
| `minDate` / `maxDate` | — | 選択可能範囲 |
| `disabledDates` | — | `Date[]` または `(date) => bool`（例: 週末無効） |
| `markers` | `[]` | `[{ date, color, label }]` — 日セルに色ドット＋title |
| `rangeColors` | — | `{ band, endpoint }` 期間の帯色と端点マーカー色 |
| `renderDay` | — | `(date, el, info) => void` 日セルの最終カスタムフック |
| `locale` | 日本語 | 月名・曜日名・ボタン文言・`firstDay`（0=日曜） |
| `firstDay` | `0` | 週の始まり（`1` で月曜始まり） |
| `name` | — | フォーム送信用 hidden input を生成。single=そのまま1個、**multiple=選択数ぶん `name[]`**、**range=`{name}_from` / `{name}_to`** |
| `hiddenFormat` | `'YYYY-MM-DD'` | hidden の出力フォーマット（showTime時は `YYYY-MM-DD HH:mm`） |
| `hiddenNames` | — | rangeのhidden名を上書き: `{ from: 'check_in', to: 'check_out' }` |
| `onChange` / `onOpen` / `onClose` | — | イベントハンドラ（`on('change', cb)` でも可） |

### DatePicker メソッド

| メソッド | 説明 |
| --- | --- |
| `getValue()` | `Date`（single）/ `Date[]`（multiple）/ `{from, to}`（range）/ `null` |
| `setValue(v)` | 同形式で設定（文字列も可）。表示・inputに反映 |
| `clear()` | 選択解除 |
| `open()` / `close()` | ポップアップ開閉 |
| `update(partial)` | オプション差分更新（format・markers・disabledDates など） |
| `on(event, cb)` / `off(event, cb)` | `change` / `open` / `close` |
| `destroy()` | DOM・リスナーを破棄 |


### 分割日付フィールド — `createRSDateSelect(target, options)`

生年月日などの定番UI。年はセレクトボックス、月・日はモーダルで選ぶ3分割フィールドです。
**年を選ぶと月モーダルが自動で開き、月を選ぶと日モーダルが開く**チェーン式。
確定値は hidden input に `YYYY-MM-DD` 形式で入るので、フォームにそのまま載せられます。

```js
import { createRSDateSelect } from 'rs-datepicker';

createRSDateSelect('#birthday', {
    name: 'birthday',                     // hidden input の name（送信キー）
    value: '1990-04-01',                  // 初期値（yyyy-mm-dd / Date）
    format: 'YYYY-MM-DD',                 // hidden の出力フォーマット
    labels: { year: '年', month: '月', day: '日' },
    yearRange: { from: 1940, to: 2026 }, // 年セレクトの範囲（既定: 今年-100〜今年）
    order: 'desc',                        // 年の並び（desc=新しい年が上）
    chain: true,                          // 年→月→日の自動チェーン（falseで個別選択）
    onChange: (v) => console.log(v),      // '1990-04-01'
});
```

- 月末クランプ: 31日選択後に30日までの月へ変えると自動で丸める（うるう年対応）
- モーダルは オーバーレイクリック / Esc / × で閉じる
- メソッド: `getValue()`（整形済み文字列） / `getDate()` / `setValue(v)` / `clear()` / `destroy()`

### 操作

- **年月移動**: タイトルクリック → 年スクロールリスト（現在年が中央） → 月グリッド → 日ビュー
- **期間選択**: 1クリック目=開始 → ホバーで帯プレビュー → 2クリック目=終了（逆順は自動スワップ）
- **キーボード**: input で `↓` → カレンダーへ。`← → ↑ ↓` 日移動、`PageUp/Down` 月移動、`Enter` 選択、`Esc` 閉じる
- **直接タイプ**（single）: `2026/7/5`・`2026-07-05`・`2026年7月5日`・`7/5`（今年）などを blur / Enter でパース

### テーマ（CSSカスタムプロパティ）

```css
.rsd {
    --rsd-accent: #16a34a;          /* 選択色 */
    --rsd-range-band: #dcfce7;      /* 期間の帯 */
    --rsd-range-endpoint: #16a34a;  /* 期間の端点マーカー */
    --rsd-sun: #dc2626;             /* 日曜の文字色 */
    --rsd-radius: 8px;
}
```

主な変数: `--rsd-bg` `--rsd-text` `--rsd-muted` `--rsd-border` `--rsd-accent` `--rsd-hover` `--rsd-today` `--rsd-sun` `--rsd-sat` `--rsd-range-band` `--rsd-range-endpoint` `--rsd-radius` `--rsd-font`

## 仕組み

- 状態（値・表示月・ビューモード）→ パネル全再描画のシンプルな構成。日グリッドは高々42セル×2枚なので十分軽い
- 例外は期間ホバーのプレビューで、これは**クラスの付け替えだけ**で更新する（ポインタ直下の要素を作り直すと mouseenter が無限ループするため）
- 日付計算は `dateutil.js` の純関数（ローカル時刻ベース・タイムゾーン変換なし）
- ポップアップは body 直下に配置し、画面下端では自動で上に反転

## 既知の制限（v0.2 時点）

- range の from/to に個別の時刻は付けられない
- プリセット（今週・過去30日等）・和暦・週番号は未実装（REQUIREMENTS.md のロードマップ参照）
- 分割フィールドの月・日をセレクトにするオプションは未対応（モーダルのみ）
- 祝日データは内蔵しない（markers で差し込む設計）

## 検証

Playwright（Chromium）による37項目（ピッカー16 + 分割フィールド12 + hidden出力9）の自動テストで、開閉・全選択モード・年ナビ・時刻・制約・マーカー・キーボード・パース・モーダルチェーン・FormData送信・API・コンソールエラーなしを確認済み。

## ライセンス

MIT
