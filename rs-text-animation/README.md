> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm login --scope=@sano1023 --auth-type=legacy --registry=https://npm.pkg.github.com
npm config set @sano1023:registry=https://npm.pkg.github.com --location=user
npm install @sano1023/rs-text-animation
```

> GitHub Packages から配布しています。public パッケージもインストールには GitHub 認証が必要です。ログイン時の Password には read:packages 権限を持つ personal access token (classic) を使用します。認証不要の導入には、下記の GitHub tarball または CDN を利用できます。

認証・更新の詳細は [共通インストール手順](https://github.com/sano1023/rs-package/blob/main/INSTALLING.md) を参照してください。登録済みバージョンは [GitHub Packages 一覧](https://github.com/sano1023?tab=packages&repo_name=rs-package) で確認できます。以下のパッケージ名による import は Vite などのバンドラ向けです。

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-text-animation-0.1.0.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSTextAnimation } from '@sano1023/rs-text-animation';
import '@sano1023/rs-text-animation/rs-text-animation.css';   // スタイル（バンドラ経由）

createRSTextAnimation(document.querySelector('#app'), { /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sano1023/rs-package@main/rs-text-animation/dist/rs-text-animation.css">
<script src="https://cdn.jsdelivr.net/gh/sano1023/rs-package@main/rs-text-animation/dist/rs-text-animation.min.js"></script>
<script>
  // 公開APIはグローバル RSTextAnimation に載る
  RSTextAnimation.createRSTextAnimation(document.querySelector('#app'), { /* オプション */ });
</script>
```

---

# rs-text-animation

Dependency-free text animation for modern web interfaces.

- Modes: typewriter, rpg, reveal, bounce, scramble, slide, flip, blur, wave, glitch
- Japanese and emoji safe grapheme splitting with Intl.Segmenter
- Reduced motion support
- Click or Enter to advance RPG-style messages

## Demo

Run a static server and open rs-text-animation/demo/.

```js
import { createRSTextAnimation } from '@sano1023/rs-text-animation';
import '@sano1023/rs-text-animation/rs-text-animation.css';
```

## Quick Start

createRSTextAnimation('#title', {
  mode: 'reveal',
  text: 'Your words, in motion.',
  stagger: 46,
  duration: 700,
});

## Options

mode: typewriter | rpg | reveal | bounce | scramble | slide | flip | blur | wave | glitch
text: text to render
speed: typing interval in milliseconds, default 55
delay: initial delay in milliseconds
duration: character effect duration
stagger: per-character delay for reveal and bounce
cursor / cursorChar: typing cursor settings
loop / loopDelay: repeat modes other than rpg
advanceOnClick: allow click and Enter to finish or advance an RPG message

## Instance Methods

start(), replay(), pause(), resume(), finish(), next(), setText(text), and destroy().

The target element emits rsta:start, rsta:complete, rsta:advance, rsta:pause, and rsta:resume.

## License

MIT
