> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm install @parelabo/rs-sign
```

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-sign-0.4.0.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSSignPad } from '@parelabo/rs-sign';
import '@parelabo/rs-sign/rs-sign.css';   // スタイル（バンドラ経由）

createRSSignPad(document.querySelector('#app'), { /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@parelabo/rs-sign@0.4.0/dist/rs-sign.css">
<script src="https://cdn.jsdelivr.net/npm/@parelabo/rs-sign@0.4.0/dist/rs-sign.min.js"></script>
<script>
  // 公開APIはグローバル RSSign に載る
  RSSign.createRSSignPad(document.querySelector('#app'), { /* オプション */ });
</script>
```

### Vue 3

```js
import { RsSignPad, RsHanko, RsSign } from '@parelabo/rs-sign/vue';
import '@parelabo/rs-sign/rs-sign.css';   // スタイル（バンドラ経由）
```

```vue
<template>
  <RsSignPad />
</template>
```

### React 18 / 19

```jsx
import { RsSignPad, RsHanko, RsSign } from '@parelabo/rs-sign/react';
import '@parelabo/rs-sign/rs-sign.css';   // スタイル（バンドラ経由）

export default function App() {
  return <RsSignPad />;
}
```

> `vue` / `react` は peerDependency です（バンドルには含みません）。アプリ側のものが使われます。

---

# rs-sign

電子署名まわりのフロントエンド部品を揃えた、依存ゼロの署名・押印ライブラリです（現在 v0.4: 署名パッド＋電子印鑑ジェネレータ＋契約書ワークフロー＋複数署名者の順序制御/差し戻し/有効期限＋かすれ/にじみ印影・銀行印/職印＋**rs-pdf / rs-form 連携アダプタ**）。

- **依存ゼロ**: ランタイム依存なし。ビルド不要で `src/` から直接 import できる ESモジュール
- **滑らかな署名パッド**: Catmull-Rom→3次ベジェ平滑化・筆圧/速度による可変線幅・`getCoalescedEvents()` による120Hzペン対応
- **正のデータはストロークJSON**: 点列 `{x, y, t, p}` ＋ ペン設定のベクタ形式が正。PNG/SVG/再生アニメはそこから導出される派生物（同じJSONからは常に同じ画素 = 決定的レンダリング）
- **電子印鑑ジェネレータ標準装備**: 認印（丸＋姓の縦組み）・角印（社名の右→左縦書き・之印補完）・データー印（姓/日付/社名の3段）・**銀行印風（横彫り）**・**職印（二重円・円弧文字）**。サイズはmm指定・出力は透過PNGとベクタSVG
- **かすれ/にじみ（v0.3）**: シード付き擬似乱数で印影のかすれ（`destination-out`）・にじみ（輪郭膨張）を再現。**同じ seed なら同じ画素**＝決定的で再現可能
- **印面＝プラグイン**: 組み込み5印面もすべて `defineStamp()` で実装。独自印面を数行で追加できる
- **契約書ワークフロー（v0.2）**: 「複数ページ=画像配列」の文書ビュー・%座標でズーム非依存のフィールド配置エディタ（D&D配置/移動/リサイズ）・署名者充足モード（署名パッドと電子印鑑を内蔵）・全ページの canvas 完成合成・**SHA-256ハッシュチェーンの改ざん検知可能な監査ログ**
- **ワークフロー強化（v0.3）**: **複数署名者の順序制御（直列/並列）**・**差し戻し**（`declined` → コメント付きで `signing` へ戻す）・**有効期限**・下書き途中状態の完全な `toJSON()`/`load()` 復元
- **連携アダプタ（v0.4）**: 署名/印影を **rs-pdf のPDFページ上へ配置し注釈として書き出す** アダプタ（`createPdfSignAdapter`・画像＋%座標＋ページ → rs-pdf スタンプ注釈）・**rs-form の signature 質問へ署名パッドを差し込む** アダプタ（`rsSignaturePad`）。連携は opt-in で、**rs-pdf / rs-form のソースは変更せず公開契約に沿うだけ**（両パッケージ未導入でも rs-sign 単体で動作）
- **ライセンス**: MIT

対応ブラウザ: 最新の Chrome / Edge / Safari / Firefox

> **法的効力について**: 本ライブラリの責務は「画面部品と改ざん検知可能な監査JSON」までです。電子署名法等への法対応 —— タイムスタンプ局連携・電子証明書・長期署名（PAdES/XAdES）による真正な成立の推定・否認防止 —— は利用側システムのサーバ実装の責務です。

## デモ

```bash
# このリポジトリで
php -S localhost:8099   # または任意の静的サーバー
# → http://localhost:8099/rs-sign/demo/ を開く
```

署名パッド（ペン色/太さ・undo/クリア・再生・PNG/SVG/JSON入出力・hidden input連携）と、電子印鑑ジェネレータ（名前入力→認印/角印/データー印の切替プレビュー・mm指定・PNG/SVGダウンロード）、契約書ワークフロー（作成者がフィールドを配置 → 甲/乙が署名・押印で充足 → 完成合成PNG → SHA-256監査ログの検証／改ざん検出）に加え、**v0.4 の連携デモ**（rs-pdf のPDFページへ印影を配置して注釈JSONに書き出し・rs-form の signature 質問へ署名パッドを差し込んで回答JSONに dataURL が載る様子）を1画面で試せます。連携デモは同階層に配置された `../rs-pdf` / `../rs-form` を相対 import し、無い場合は契約データの表示にフォールバックします。

## インストール

npm公開前は、`src/` ディレクトリをコピーするだけで使えます。

```html
<link rel="stylesheet" href="./rs-sign/src/rs-sign.css">
```

```js
import { createRSSignPad, createRSHanko, createRSSign, defineStamp, verifyAudit } from './rs-sign/src/index.js';
// npm公開後: import { createRSSignPad, createRSHanko, createRSSign, defineStamp, verifyAudit } from 'rs-sign';
```

## クイックスタート

```html
<form>
    <div id="pad" style="width: 480px; height: 220px"></div>
    <input type="hidden" name="signature">
</form>
```

```js
import { createRSSignPad, createRSHanko } from 'rs-sign';

// ① 手書き署名パッド
const pad = createRSSignPad('#pad', {
    penColor: '#1b2a5e', minWidth: 1, maxWidth: 3.5,   // px。筆圧/速度でこの範囲を補間
    pressure: true,                                     // 筆圧優先（無い環境は速度補間へ自動フォールバック）
    hiddenInput: 'signature',                           // <input name=signature> に PNG dataURL を自動反映
});
pad.toJSON();                       // ストロークJSON（正のデータ）
pad.fromJSON(json);                 // ラウンドトリップ（toPNG が元と画素一致する）
pad.toPNG({ scale: 2 });            // 透過PNG dataURL
pad.toSVG();                        // 可変幅ストロークをパスで再現した単体表示可能なSVG
pad.replay({ speed: 1.5 });         // 描き順アニメーション再生（Promise）
pad.undo(); pad.clear(); pad.isEmpty();

// ② 電子印鑑
const hanko = createRSHanko({ dpi: 350 });
document.body.appendChild(hanko.render({ type: 'mitome', name: '佐野' }));   // canvas
hanko.toPNG({ type: 'kaku', name: '株式会社佐野商店', sizeMm: 21 });
hanko.toSVG({ type: 'data', name: '佐野', company: '営業部', dateFormat: 'wareki' });
```

## API

### `createRSSignPad(target, options): SignPad`

| オプション | 既定値 | 説明 |
|---|---|---|
| `penColor` | `'#1b2a5e'` | ペン色 |
| `minWidth` / `maxWidth` | `1` / `3.5` | 線幅の範囲(px)。筆圧または速度でこの間を補間 |
| `pressure` | `true` | `event.pressure` を第一候補に使う。無意味な値（マウス既定の0.5等）しか無い場合は速度補間へ自動フォールバック |
| `hiddenInput` | `null` | input名 or 要素。描画のたびに PNG dataURL を value へ反映（空署名は `''`） |
| `width` / `height` | 自動 | 省略時はコンテナ実寸に追従（ResizeObserver） |
| `ariaLabel` | `'署名パッド'` | コンテナに `role="img"` と共に付与 |

### SignPad メソッド

`toJSON()` / `fromJSON(json)` / `toPNG({scale, background})` / `toSVG()` / `replay({speed, gapMs})` / `undo()` / `clear()` / `isEmpty()` / `on(event, cb)` / `off` / `destroy()`

イベント: `change`（ストローク確定・undo・clear・fromJSON） / `strokestart` / `strokeend` / `replaystart` / `replayend`

### ストロークJSON（version 1）

```js
{ version: 1, width: 480, height: 220,
  strokes: [{ color, minWidth, maxWidth, pressure,
              points: [{ x, y, t, p }] }] }   // x,y: px / t: ms / p: 筆圧0..1
```

### `createRSHanko(options): Hanko`

| オプション | 既定値 | 説明 |
|---|---|---|
| `dpi` | `350` | 出力解像度。`px = mm / 25.4 * dpi` |
| `font` | システム明朝 | font-family文字列 または `FontFace`（印章風WebFontのアダプタ。既定はシステム明朝＋自前の字間/変倍調整） |
| `color` | `#d33a2c` | 朱色。CSSカスタムプロパティ `--rss-seal-color` でも差し替え可 |
| `stamps` | `[]` | `defineStamp()` で作った独自印面の登録 |

### Hanko メソッド

`render(opts): HTMLCanvasElement` / `toPNG(opts): dataURL` / `toSVG(opts): string` / `use(stampDef)` / `stampNames()`

`opts` は `{ type, name, sizeMm, company?, title?, date?, dateFormat?, font?, color?, seed?, fade?, bleed? }`。

### 組み込み印面（既定の文字組み）

| type | 形 | 既定サイズ | 文字組み |
|---|---|---|---|
| `mitome`（認印） | 丸・枠線0.35mm | 10.5mm（9〜12） | 姓（1〜3字）を縦組み中央・内径82%。1字=1.5倍拡大 / 2字=縦1.15倍 / 3字=0.78倍縮小・字間-5% |
| `kaku`（角印） | 正方形・枠線0.5mm | 21mm（15〜30） | 社名を右列→左列・各列上→下の縦書き。列数=`ceil(√文字数)`・余りマスは「之印」補完（`padNoIn: false` で無効） |
| `data`（データー印） | 丸・3段 | 12mm | 上段=姓 / 中段=日付（`dateFormat: 'wareki'` → `R8.7.7`・`'seireki'` → `26.7.7`）/ 下段=社名・部署。段間に水平罫線2本 |
| `ginko`（銀行印風・v0.3） | 丸・太枠0.6mm | 12mm（9〜16） | 姓を**横彫り（横一列・右→左）**。先頭字を最も右に置く伝統配置 |
| `shoku`（職印・v0.3） | **二重円**（外枠0.7mm/内円0.4mm） | 18mm（15〜30） | 外周リングに**役職名（`title`）を円弧配置**（接線回転）・中央に氏名＋「之印」の縦組み |

SVG出力は `<text>` + `transform`（銀行印/職印は `rotate` も）で canvas と同一の組版を再現します（レイアウト計算を共有）。

### かすれ／にじみ（v0.3・シード付きで再現可能）

`render`/`toPNG` の `opts` に `fade`（かすれ 0..1）・`bleed`（にじみ 0..1）・`seed` を渡すと、印影に経年劣化の質感を合成します。かすれはシード付き擬似乱数のノイズ格子で `destination-out` に穴を開け、にじみは輪郭を少し膨張させた低透明コピーを背面に敷きます。**同じ seed・同じ引数なら常に同じ画素**（決定的）で、`seed` を変えるとかすれのパターンが変わります。ノイズ格子は純粋関数 `fadeNoise(seed, gw, gh)` として単体テスト可能です。SVG出力はベクタを保つためこの効果を適用しません。

```js
hanko.toPNG({ type: 'mitome', name: '佐野', fade: 0.35, bleed: 0.2, seed: 7 });   // 同 seed なら同一画素
```

### カスタム印面 — `defineStamp(def)`

```js
import { createRSHanko, defineStamp } from 'rs-sign';

const approved = defineStamp({
    name: 'approved-en',                          // render({ type: 'approved-en' }) で使える
    defaults: { sizeMm: 20, name: 'APPROVED' },
    draw(ctx) {
        // ctx: { c2d, canvas, sizePx, sizeMm, mm2px, text, color, font, rng, opts }
        const { c2d, sizePx, mm2px } = ctx;
        c2d.strokeStyle = ctx.color;
        c2d.lineWidth = mm2px(0.5);
        c2d.strokeRect(mm2px(0.3), sizePx / 4, sizePx - mm2px(0.6), sizePx / 2);
        c2d.fillStyle = ctx.color;
        c2d.font = `bold ${mm2px(3.4)}px sans-serif`;
        c2d.textAlign = 'center';
        c2d.textBaseline = 'middle';
        c2d.fillText(ctx.opts.name, sizePx / 2, sizePx / 2);
    },
    // 任意: svg(ctx) を実装するとベクタSVGを出力（未実装ならPNG埋め込みSVGにフォールバック）
});

createRSHanko({ stamps: [approved] });
```

- `ctx.rng` はシード付き擬似乱数（`opts.seed` で固定）。かすれ/にじみ（v0.3）も同じ契約で再現可能にする
- 組み込みの `mitome` / `kaku` / `data` もすべてこのAPIで実装されている

## 契約書ワークフロー — `createRSSign(target, doc, options)`（v0.2）

文書（複数ページ＝画像配列）にフィールドを配置し、署名者が署名/押印して締結、完成合成PNGと監査ログを得るまでの状態機械です。

```js
import { createRSSign, verifyAudit } from 'rs-sign';

// doc.pages は url / HTMLImageElement / HTMLCanvasElement の配列（rs-image と同じページモデル）
const sign = createRSSign('#viewer', { pages: ['p1.png', 'p2.png'] }, {
    mode: 'edit',
    signers: [{ id: 'party-a', name: '甲' }, { id: 'party-b', name: '乙' }],
});
await sign.ready;                                  // ページ画像の読込完了

// ① 作成者: フィールドを配置（%座標。ズーム・リサイズに不変）。UIのパレット＋D&Dでも可
sign.addField({ type: 'seal', page: 0, x: 82.5, y: 88, w: 9, h: 6.5, signer: 'party-a', required: true });

// ② 署名者: 充足モードへ（未充足フィールドへスクロール誘導・タップで署名/押印モーダル）
sign.setMode('sign', { signer: 'party-a' });

// ③ 全必須フィールド充足で完成合成＋監査ログ
sign.on('fieldFilled', (e) => { /* e.field */ });
sign.on('complete', async (e) => {
    e.pages;                                       // 合成済み canvas 配列
    e.pngs;                                        // PNG dataURL 配列
    await verifyAudit(e.audit);                    // 監査チェーン検証（true）
});

sign.toJSON();                                     // フィールド定義・充足状態・監査（version付き）
sign.load(json);                                   // 途中充足状態も含めて復元
sign.setZoom(1.5); sign.progress('party-a'); sign.destroy();
```

| オプション | 既定値 | 説明 |
|---|---|---|
| `mode` | `'edit'` | `'edit'`（配置エディタ）/ `'sign'`（署名者充足）/ `'view'`（閲覧） |
| `signers` | `[]` | `['id', ...]` または `[{ id, name }, ...]` |
| `signer` | `null` | 充足モードの現在署名者 |
| `orderMode` | `'parallel'` | **署名順序（v0.3）**。`'serial'`＝`order` 上で前の署名者が完了するまで次は充足不可 / `'parallel'`＝同時に充足可 |
| `order` | signers順 | **署名者順序（v0.3）**。ID配列。直列の手番判定に使う |
| `deadline` | `null` | **有効期限（v0.3）**。ISO文字列 / epoch ms / `Date`。過ぎると充足不可（`expired`） |
| `zoom` | `1` | 初期ズーム（0.4〜3.0） |
| `actor` | `'creator'` | 編集・差し戻しアクションの監査 who |

### Sign メソッド

`addField(def)` / `removeField(id)` / `updateField(id, patch)` / `getFields()` / `setMode(mode, {signer})` / `setZoom(z)` / `zoomBy(d)` / `progress(signer)` / `composite()`（`Promise<{pages, pngs}>`）/ `getAudit()` / `flush()` / `toJSON()` / `load(json)` / `on` / `off` / `destroy()`

**v0.3 ワークフロー**: `setOrder(order, mode)` / `setDeadline(deadline)` / `isExpired(now?)` / `canAct(signer?)` / `decline(reason)` / `sendBack(comment, { reset?, signer? })`（差し戻し: `declined`→`signing`）/ `workflow(now?)`（順序・手番・期限・差し戻しの集約ステータス）。

```js
const sign = createRSSign('#viewer', { pages }, {
    signers: [{ id: 'a', name: '甲' }, { id: 'b', name: '乙' }],
    orderMode: 'serial', order: ['a', 'b'],            // 甲が終わるまで乙は押印不可
    deadline: '2026-07-31T23:59:59+09:00',             // 期限を過ぎると expired
});
sign.canAct('b');                                       // false（甲が未完了）
await sign.decline('金額を訂正してください');            // → declined（理由付き）
await sign.sendBack('訂正版で再確認を', { reset: true }); // 差し戻し: declined → signing（甲の値をリセット）
```

イベント: `ready` / `fieldFilled` / `complete`（`{pages, pngs, audit}`）/ `decline` / `sendback` / `modechange` / `load`

状態機械: `draft`（作成者が配置）→ `signing`（署名者が充足）→ `completed`（全必須充足で合成）/ `declined`（辞退・差し戻し要求）/ `expired`（期限切れ）。`declined` からは `sendBack()` でコメント付きに `signing` へ戻せます。順序・期限・差し戻しの状態も `toJSON()`/`load()` で完全に往復します（バージョンは v0.2 互換の 1 のまま追記）。

### フィールドタイプと %座標

| type | 値の種類 | 充足UI |
|---|---|---|
| `signature` | 画像(PNG) | 内蔵署名パッド（`createRSSignPad`）で手書き |
| `seal` | 画像(PNG) | 内蔵電子印鑑（`createRSHanko`）で認印/角印/データー印を生成 |
| `date` | テキスト | 当日を既定にした日付入力 |
| `text` | テキスト | テキスト入力 |
| `checkbox` | 真偽 | タップでトグル（モーダルなし） |

フィールドは `x, y, w, h` すべて**ページ寸法比（0..100）の%座標**で保存され、ズーム・リサイズに不変です。

### 監査ログ（SHA-256ハッシュチェーン）— `verifyAudit(audit)`

各アクションを次の形で記録し、`hash = SHA-256(seq ⌇ who ⌇ what ⌇ at ⌇ payloadHash ⌇ prevHash)` で前後を連結します（WebCrypto `crypto.subtle`）。

```js
{ seq: 3, who: 'party-a', what: 'field.filled:f1', at: '2026-07-08T…',
  payloadHash: 'sha256:…', prevHash: 'sha256:…', hash: 'sha256:…' }
```

`await verifyAudit(sign.getAudit())` が全鎖を再計算・検証します。途中のアクションを1文字でも書き換えると `false` を返す（改ざん検知）ため、否認防止そのものは担いませんが「改ざんされていないこと」を利用側サーバで検証できます。`AuditChain` / `createAuditChain(json)` を直接使うこともできます。

### テーマ

CSSカスタムプロパティで差し替え:

```css
:root { --rss-seal-color: #b3261e; }
.rss-pad { --rss-pad-bg: #fffdf5; --rss-pad-border: #c8bfa5; }
```

## 連携アダプタ（v0.4）

rs-sign は署名・押印の「画面部品と監査JSON」を担い、**PDFのパース/描画は rs-pdf、フォームの組み立ては rs-form** に任せます。v0.4 ではこの2つへ opt-in で接続するアダプタを rs-sign 側に用意しました。**どちらも相手パッケージのソースは変更せず公開契約に沿うだけ**で、相手が未導入でも rs-sign は単体で動きます（NFC・生体認証は永久にスコープ外）。

### rs-pdf 連携 — 署名/印影をPDFページへ配置し注釈として書き出す

rs-sign の署名/印影は「画像 dataURL ＋ %座標 ＋ ページ番号」です。これを rs-pdf の**画像スタンプ注釈**（`{ type: 'stamp', page, rect, image }`）へ変換します。座標系は rs-sign（page=0始まり・x/y/w/h=% 0..100）→ rs-pdf（page=1始まり・rect=0..1）を吸収します。生成は**DOM非依存の純粋関数**で、rs-pdf を注入すれば実際のページ上へ配置できます。

```js
import { createRSHanko, createRSSign, signatureAnnotation, fieldsToAnnotations, createPdfSignAdapter } from 'rs-sign';
import { createRSPDF, pdfjsAdapter } from 'rs-pdf';

// ① 純粋: 画像＋%座標＋ページ → rs-pdf スタンプ注釈データ（rs-pdf 不要・単体テスト可能）
const png = createRSHanko().toPNG({ type: 'mitome', name: '佐野' });
signatureAnnotation({ image: png, page: 0, x: 82.5, y: 88, w: 8, h: 8 });
// → { type:'stamp', page:1, rect:{ x:0.825, y:0.88, w:0.08, h:0.08 }, image: png, style:{ opacity:1 } }

// ② 締結済み Sign の充足署名/印影だけを注釈化（未充足・非画像フィールドは除外）
const annots = fieldsToAnnotations(sign);   // sign = createRSSign(...) / フィールド配列でも可

// ③ rs-pdf を注入して実配置（rs-pdf の公開契約 annotations.add を呼ぶだけ）
const pdf = createRSPDF('#viewer', { src: '/contract.pdf', renderer: pdfjsAdapter(pdfjsLib) });
const adapter = createPdfSignAdapter(pdf);
adapter.placeSignature({ image: png, page: 0, x: 58, y: 78, w: 22, h: 16 });   // 1件配置
adapter.place(sign);                                                            // 締結署名/印影を一括配置
adapter.setStampImage(png, { widthPt: 90 });                                    // rs-pdf のスタンプツールで手押し
pdf.annotations.toJSON();                                                        // 注釈として書き出し（XFDFも可）
```

| 関数 | 説明 |
|---|---|
| `signatureAnnotation(input, opts?)` | 画像＋%座標＋ページ → スタンプ注釈データ（純粋）。`input={ image, page, x, y, w, h, opacity?, id?, name? }`・`opts={ pageBase=0, type='stamp' }` |
| `fieldToAnnotation(field, opts?)` | rs-sign フィールド1件 → 注釈データ。充足済みの signature/seal 以外は `null` |
| `fieldsToAnnotations(fieldsOrSign, opts?)` / `signToAnnotations(sign, opts?)` | フィールド配列 or `createRSSign` の戻り値 → 充足画像フィールドの注釈配列 |
| `placeAnnotations(pdfViewer, annotations)` | 生成済み注釈を rs-pdf viewer へ実配置 |
| `createPdfSignAdapter(pdfViewer, defaults?)` | rs-pdf viewer を束ねたアダプタ（`toAnnotation` / `placeSignature` / `placeField` / `place` / `setStampImage`） |

> rs-pdf v0.3+ には既に電子印鑑の押印機構（`setStampImage` / `datestamp`）があります。rs-sign は二重実装せず「**rs-pdf へ渡せる注釈データを生成する**」ことに徹し、実配置は rs-pdf の契約に委ねます。

### rs-form 連携 — signature 質問へ署名パッドを差し込む

rs-form には v0.2 から signature 質問タイプがあり、`options.signaturePad = (canvas, api) => ({ destroy })` というアダプタ契約で既定の手書き実装を差し替えられます。rs-sign はこの契約に合う関数を1つ提供します。**rs-form のソースは変更しません。**

```js
import { createRSForm } from 'rs-form';
import { rsSignaturePad } from 'rs-sign';

createRSForm('#app', schema, {
    // これ1行で signature 質問の既定 canvas が rs-sign の滑らかな署名パッドに置き換わる
    signaturePad: rsSignaturePad({ penColor: '#1b2a5e', minWidth: 1, maxWidth: 3.2 }),
});
// 署名すると rs-form の回答JSONに 'data:image/png;base64,...' が載る（未署名は undefined）
```

`rsSignaturePad(padOptions?)` は `createRSSignPad` のオプション（`penColor` / `minWidth` / `maxWidth` / `pressure` …）に加え、`png`（`toPNG` のオプション）・`clearText` / `undoText` を受け付けます。低レベルAPI `mountFormSignPad(canvas, api, padOptions?)` も公開しており、rs-form の canvas を隠して rs-sign パッド（＋消去/元に戻すのツールバー）を差し込み、描画のたびに `api.setValue(PNG dataURL)` で回答へ同期します。

## 仕組み

```
公開API createRSSignPad / createRSHanko / defineStamp
    ├ SignPad: pointer events（capture + coalesced points）→ 点列記録
    │    描画は rAF バッチ・確定ストロークはオフスクリーンにキャッシュ
    ├ Hanko: 印面レイアウト → canvas 描画 / SVG 生成（同一組版）
    └ 純粋関数層（DOM/canvas 非依存・node:test で検証）
         geometry: リサンプル → Catmull-Rom→ベジェ → 可変幅の外形パス生成
         strokes: ストロークJSONコーデック（記録時丸めで無損失ラウンドトリップ）
         seal-layout: 認印/角印/データー印/銀行印/職印の文字組み・mm↔px・和暦/西暦書式・かすれノイズ格子
         workflow: 順序制御（直列/並列）・手番判定・有効期限・差し戻し状態（純粋関数）
```

- **可変幅ストローク**: 平滑化した中心線を高密度サンプルへ展開し、左右の法線オフセット＋丸キャップの**単一閉ポリゴン**を塗る。座標は小数2桁丸めで、表示・PNG・SVGが同じパス文字列を共有する
- **筆圧判定**: 筆圧が変化していれば実ペンとみなし採用。全点一定でも 0 / 0.5 / 1（マウス・タッチの既定値）以外なら採用。それ以外は速度補間（速いほど細い・EMA平滑化）

## ロードマップ（REQUIREMENTS.md 参照）

- v0.1: 署名パッド＋電子印鑑ジェネレータ
- v0.2: 文書ビュー・フィールド配置エディタ・署名者充足モード・完成合成・監査ログJSON（SHA-256チェーン）
- v0.3: 複数署名者の順序制御（直列/並列）・差し戻し・有効期限・下書き完全復元・印影のかすれ/にじみ・銀行印風・職印
- v0.4（本バージョン）: rs-pdf 連携（署名/印影をPDFページへ配置し注釈として書き出し）・rs-form 連携（signature 質問へ署名パッドを差し込み）。NFC・生体認証は永久にスコープ外

## 検証

- node 単体テスト 66件（平滑化・線幅補間・外形パス・ストロークJSONコーデック・印面レイアウト（認印/角印/データー印/**銀行印/職印**）・和暦書式・**かすれノイズの決定性**／**監査SHA-256チェーンの連結・改ざん検出**／**フィールド%座標の正規化・充足判定・文書JSONラウンドトリップ**／**順序制御（直列/並列）・手番判定・有効期限・差し戻し状態の集約**／**rs-pdf 連携: 署名/印影の画像＋%座標＋ページ → スタンプ注釈データ変換（rect 0..1・page 1始まり・充足画像フィールドのみ抽出）**）: `npm test`
- ヘッドレスChromiumによる受け入れテスト:
  - v0.1（13件・REQUIREMENTS §6）: 2ストローク記録・PNG画素検証・筆圧線幅差・fromJSONラウンドトリップの画素一致・replay・SVG単体表示・認印/データー印/角印・hidden input・defineStamp
  - v0.2（9件）: D&Dフィールド配置の%座標保存・ズーム変更で%不変（相対維持）・充足モードで署名/押印して未充足が減る・全充足で complete イベント・完成合成PNGへの署名/印影の焼き込み・監査SHA-256チェーンの連結・改ざんで `verifyAudit` が false・toJSON/load の途中状態復元・コンソールエラー0件
  - v0.3（9件）: 直列で前の署名者完了まで次は充足不可・並列は同時可・差し戻し（declined→コメント付きで signing へ戻す・値リセット）・有効期限切れ判定・下書き途中状態（順序/期限/差し戻し/充足値/監査）の toJSON→load 完全復元・かすれ印影が同シードで画素一致/別シードで変化・銀行印の横彫り画素・職印の二重円と円弧文字・コンソールエラー0件 —— 全パス
  - v0.4（7件）: 署名/印影の画像＋%座標＋ページ → スタンプ注釈データ生成・締結 Sign の充足署名/印影のみ注釈化・**rs-pdf（実物）へ実配置され `annotations.toJSON()`/XFDF に stamp（画像＋rect＋page）として書き出せる**・締結署名の一括配置・**rs-form（実物）の signature 質問に rs-sign パッドが差し込まれ（既定 canvas を隠す）回答JSONに dataURL が載る/消去で消える**・コンソールエラー0件 —— 全パス

## ライセンス

MIT © ryusuke.sano
