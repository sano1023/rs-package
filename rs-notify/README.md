> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm install @parelabo/rs-notify
```

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-notify-0.1.0.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { toast.success } from '@parelabo/rs-notify';
import '@parelabo/rs-notify/rs-notify.css';   // スタイル（バンドラ経由）

toast.success('保存しました');
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@parelabo/rs-notify@0.1.0/dist/rs-notify.css">
<script src="https://cdn.jsdelivr.net/npm/@parelabo/rs-notify@0.1.0/dist/rs-notify.min.js"></script>
<script>
  // 公開APIはグローバル RSNotify に載る
  RSNotify.toast.success('保存しました');
</script>
```

---

# rs-notify

依存ゼロ・フレームワーク非依存の**トースト通知＋ダイアログ**（v0.1・Toastify / SweetAlert2 代替）。

- **トースト**: success / error / warning / info / loading・6ポジション・自動クローズ（進捗バー・**ホバーで一時停止**）・
  同時表示上限（古い順に閉じる）・**アクションボタン**（「元に戻す」等）・`toast.promise()` で loading→success/error 連動・
  `aria-live` 読み上げ・XSS 安全（textContent のみ）
- **ダイアログ**: **Promise ベース**の `confirm` / `alert` / `prompt`（+ 汎用 `dialog`）。
  `window.confirm` と違い UI をブロックせず、スタイルも揃う。WAI-ARIA モーダル・フォーカストラップ・
  Esc/Enter・起点フォーカス復帰・danger スタイル（削除確認）
- SSR 安全（DOM 生成は初回呼び出しまで遅延）・reduced motion 対応・CSS 変数テーマ・MIT

## 使い方

```js
import { toast, confirm, alert, prompt } from 'rs-notify';
// CSS: <link rel="stylesheet" href="rs-notify/rs-notify.css">

toast.success('保存しました');
toast.error('保存に失敗しました', { duration: 0 });                  // 0 = 自動で消えない
toast.success('削除しました', { action: { label: '元に戻す', onClick: restore } });

// Promise 連動（保存中… → 保存しました / 失敗しました）
toast.promise(saveData(), {
    loading: '保存中…',
    success: (n) => `${n} 件保存しました`,
    error: (e) => `失敗: ${e.message}`,
});

// ダイアログ（await で書ける）
if (await confirm('この請求書を削除しますか？', { title: '確認', danger: true, okLabel: '削除する' })) {
    await api.delete();
    toast.success('削除しました');
}
await alert('処理が完了しました');
const name = await prompt('テンプレート名', { value: '新しい帳票' });   // キャンセルは null

// 設定
import { configureToasts } from 'rs-notify';
configureToasts({ position: 'bottom-center', duration: 3000, max: 3 });
```

フレームワークのラッパーは不要です（命令的 API のため Vue / React / 素の HTML からそのまま呼べます）。

## テスト

```
node --test test/
```

## ライセンス

MIT
