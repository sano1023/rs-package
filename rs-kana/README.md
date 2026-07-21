> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm install @parelabo/rs-kana
```

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-kana-0.1.0.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSKana } from '@parelabo/rs-kana';

createRSKana(document.querySelector('#name'), document.querySelector('#name-kana'), { /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<script src="https://cdn.jsdelivr.net/npm/@parelabo/rs-kana@0.1.0/dist/rs-kana.min.js"></script>
<script>
  // 公開APIはグローバル RSKana に載る
  RSKana.createRSKana(document.querySelector('#name'), document.querySelector('#name-kana'), { /* オプション */ });
</script>
```

---

# rs-kana

IME変換中に入力されたかなを取得し、氏名などのカタカナ欄へ反映する依存ゼロのライブラリです。

漢字だけから人名の読みを完全に推測することはできません。rs-kana は辞書で推測せず、入力者がIMEで指定した読みを優先します。貼り付けた漢字、変換中の途中編集、IMEがかなを提供しない環境は rskana:unresolved で検知できます。

## Install

import { createRSKana } from './rs-kana/src/index.js';

## Usage

const kana = createRSKana('#name', '#name-kana', {
  onUnresolved: ({ reason }) => console.log(reason),
});

入力済みのカタカナは全角カタカナへ正規化して反映します。ユーザーがカタカナ欄を手で直した後は、既定で自動上書きを止めます。

## API

createRSKana(sourceTarget, kanaTarget, options)

Options:
- clearOnEmpty: clear target when source is empty, default true
- protectManual: do not overwrite a manually corrected target, default true
- dispatchInput: dispatch input event on target updates, default true
- resolveReading: optional async resolver for pasted or existing Kanji
- onUpdate, onUnresolved, onManual: callbacks

Methods:
- reset({ fromSource }): clear manual-edit protection
- setReading(value): set an explicit Katakana reading
- getState(): inspect composition and manual-edit state
- destroy(): remove listeners

Events emitted from source:
rskana:update, rskana:unresolved, rskana:manual.

## Resolver

resolveReading is opt-in. Connect it to a private dictionary or your own API when existing Kanji must be resolved. No reading data is sent anywhere by default.

## License

MIT

