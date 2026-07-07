> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール / 読み込み

```bash
# npm（GitHubのtarball指定）
npm install https://github.com/sano1023/ryusuke-packages-dist/raw/main/tarballs/rs-sign-0.1.0.tgz
```

```html
<!-- CDN（jsDelivr・scriptタグ直読み） -->
<script src="https://cdn.jsdelivr.net/gh/sano1023/ryusuke-packages-dist@main/rs-sign/dist/rs-sign.min.js"></script>
```

```js
// ESM import（npmインストール後）
import { /* 公開API */ } from 'rs-sign';
```

CSSが必要なパッケージは `dist/rs-sign.css` を link してください。

---

# rs-sign

電子署名SaaS（DocuSign / Dropbox Sign / freeeサイン / クラウドサイン 等）が提供するフロントエンド部品の段階的な網羅を目指す、依存ゼロの署名・押印ライブラリです（現在 v0.1: 署名パッド＋電子印鑑ジェネレータ）。

- **依存ゼロ**: ランタイム依存なし。ビルド不要で `src/` から直接 import できる ESモジュール
- **滑らかな署名パッド**: Catmull-Rom→3次ベジェ平滑化・筆圧/速度による可変線幅・`getCoalescedEvents()` による120Hzペン対応
- **正のデータはストロークJSON**: 点列 `{x, y, t, p}` ＋ ペン設定のベクタ形式が正。PNG/SVG/再生アニメはそこから導出される派生物（同じJSONからは常に同じ画素 = 決定的レンダリング）
- **電子印鑑ジェネレータ標準装備**: 認印（丸＋姓の縦組み）・角印（社名の右→左縦書き・之印補完）・データー印（姓/日付/社名の3段）。サイズはmm指定・出力は透過PNGとベクタSVG
- **印面＝プラグイン**: 組み込み3印面もすべて `defineStamp()` で実装。独自印面を数行で追加できる
- **ライセンス**: MIT

対応ブラウザ: 最新の Chrome / Edge / Safari / Firefox

> **法的効力について**: 本ライブラリの責務は「画面部品と（v0.2以降の）改ざん検知可能な監査JSON」までです。電子署名法等への法対応 —— タイムスタンプ局連携・電子証明書・長期署名（PAdES/XAdES）による真正な成立の推定・否認防止 —— は利用側システムのサーバ実装の責務です。

## デモ

```bash
# このリポジトリで
php -S localhost:8099   # または任意の静的サーバー
# → http://localhost:8099/rs-sign/demo/ を開く
```

署名パッド（ペン色/太さ・undo/クリア・再生・PNG/SVG/JSON入出力・hidden input連携）と、電子印鑑ジェネレータ（名前入力→認印/角印/データー印の切替プレビュー・mm指定・PNG/SVGダウンロード）を1画面で試せます。

## インストール

npm公開前は、`src/` ディレクトリをコピーするだけで使えます。

```html
<link rel="stylesheet" href="./rs-sign/src/rs-sign.css">
```

```js
import { createRSSignPad, createRSHanko, defineStamp } from './rs-sign/src/index.js';
// npm公開後: import { createRSSignPad, createRSHanko, defineStamp } from 'rs-sign';
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

`opts` は `{ type, name, sizeMm, company?, date?, dateFormat?, font?, color?, seed? }`。

### 組み込み印面（既定の文字組み）

| type | 形 | 既定サイズ | 文字組み |
|---|---|---|---|
| `mitome`（認印） | 丸・枠線0.35mm | 10.5mm（9〜12） | 姓（1〜3字）を縦組み中央・内径82%。1字=1.5倍拡大 / 2字=縦1.15倍 / 3字=0.78倍縮小・字間-5% |
| `kaku`（角印） | 正方形・枠線0.5mm | 21mm（15〜30） | 社名を右列→左列・各列上→下の縦書き。列数=`ceil(√文字数)`・余りマスは「之印」補完（`padNoIn: false` で無効） |
| `data`（データー印） | 丸・3段 | 12mm | 上段=姓 / 中段=日付（`dateFormat: 'wareki'` → `R8.7.7`・`'seireki'` → `26.7.7`）/ 下段=社名・部署。段間に水平罫線2本 |

SVG出力は `<text>` + `transform` で canvas と同一の組版を再現します（レイアウト計算を共有）。

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

### テーマ

CSSカスタムプロパティで差し替え:

```css
:root { --rss-seal-color: #b3261e; }
.rss-pad { --rss-pad-bg: #fffdf5; --rss-pad-border: #c8bfa5; }
```

## 仕組み

```
公開API createRSSignPad / createRSHanko / defineStamp
    ├ SignPad: pointer events（capture + coalesced points）→ 点列記録
    │    描画は rAF バッチ・確定ストロークはオフスクリーンにキャッシュ
    ├ Hanko: 印面レイアウト → canvas 描画 / SVG 生成（同一組版）
    └ 純粋関数層（DOM/canvas 非依存・node:test で検証）
         geometry: リサンプル → Catmull-Rom→ベジェ → 可変幅の外形パス生成
         strokes: ストロークJSONコーデック（記録時丸めで無損失ラウンドトリップ）
         seal-layout: 認印/角印/データー印の文字組み・mm↔px・和暦/西暦書式
```

- **可変幅ストローク**: 平滑化した中心線を高密度サンプルへ展開し、左右の法線オフセット＋丸キャップの**単一閉ポリゴン**を塗る。座標は小数2桁丸めで、表示・PNG・SVGが同じパス文字列を共有する
- **筆圧判定**: 筆圧が変化していれば実ペンとみなし採用。全点一定でも 0 / 0.5 / 1（マウス・タッチの既定値）以外なら採用。それ以外は速度補間（速いほど細い・EMA平滑化）

## ロードマップ（REQUIREMENTS.md 参照）

- v0.1（本バージョン）: 署名パッド＋電子印鑑ジェネレータ
- v0.2: 文書ビュー・フィールド配置エディタ・署名者充足モード・完成合成・監査ログJSON（SHA-256チェーン）
- v0.3: 複数署名者の順序制御・差し戻し・印影のかすれ/にじみ・銀行印風・職印
- v0.4: rs-pdf / rs-form 連携アダプタ

## 検証

- node 単体テスト 27件（平滑化・線幅補間・外形パス・ストロークJSONコーデック・印面レイアウト・和暦書式）: `npm test`
- ヘッドレスChromiumによる受け入れテスト 13件（REQUIREMENTS §6 の12項目＋コンソールエラー0件）: 合成pointerイベントでの2ストローク記録・PNG画素検証・筆圧による線幅差の画素計測・fromJSONラウンドトリップの画素一致・replay・SVG単体表示・認印/データー印/角印の印面検証・hidden input連携・defineStamp —— 全パス

## ライセンス

MIT © ryusuke.sano
