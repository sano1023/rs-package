> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール / 読み込み

```bash
# npm（GitHubのtarball指定）
npm install https://github.com/sano1023/ryusuke-packages-dist/raw/main/tarballs/rs-gantt-0.1.0.tgz
```

```html
<!-- CDN（jsDelivr・scriptタグ直読み） -->
<script src="https://cdn.jsdelivr.net/gh/sano1023/ryusuke-packages-dist@main/rs-gantt/dist/rs-gantt.min.js"></script>
```

```js
// ESM import（npmインストール後）
import { /* 公開API */ } from 'rs-gantt';
```

CSSが必要なパッケージは `dist/rs-gantt.css` を link してください。

---

# rs-gantt

有料ガントチャートライブラリ（Bryntum Gantt / dhtmlxGantt Pro / Syncfusion 等）の機能網羅を目指す、依存ゼロの**対話型プロジェクトガント**。バーをドラッグすれば計画そのもの（start / duration / progress / 依存関係）が書き換わる、スケジューリングエンジンを持つ編集ツールです（現在 v0.1）。

- **依存ゼロ・ライセンスキー不要**: ランタイム依存なし。ビルド不要で `src/` から直接 import できる ESモジュール
- **日本の祝日・営業日カレンダー内蔵**: 土日 + 日本の祝日（春分/秋分の計算式・振替休日・国民の休日・五輪特例まで内蔵計算、2000〜2099年）+ 年末年始。非稼働日は網掛けされ、ドラッグは営業日にスナップ、duration は営業日数
- **対話型編集**: バーのドラッグ移動・両端リサイズ・進捗ハンドル・端点○からの依存線（FS）作成・マイルストーン移動。すべて undo/redo（Ctrl+Z / Ctrl+Y）可能
- **タスクツリーグリッド**: WBS番号・折りたたみ・列カスタム・列幅ドラッグ・左右ペインのスプリッタ
- **3行で最初のガントが出る**宣言的API + `toJSON()/fromJSON()` ラウンドトリップ保証
- **プラグインAPI**: today線や非稼働日網掛けなどの組み込み機能も `defineGanttColumn()` / `defineGanttOverlay()` で実装（dogfooding）
- **ライセンス**: MIT

対応ブラウザ: 最新の Chrome / Edge / Safari / Firefox

> **rs-chart の gantt タイプとの棲み分け**: rs-chart の gantt は「データを図として描く」レポート/ダッシュボード埋め込み用の静的チャートタイプです。rs-gantt は WBSツリー編集・ドラッグによる計画変更・依存伝播・undo/redo を持つ**計画立案ツール**でコードは共有しません。閲覧専用の埋め込みが欲しいだけなら rs-chart を使ってください。

## デモ

```bash
# このリポジトリで
php -S localhost:8099   # または任意の静的サーバー
# → http://localhost:8099/rs-gantt/demo/ を開く
```

デモには「＋タスク追加 / ＋子タスク」ボタンと、行/バーの**ダブルクリックで開く編集ダイアログ**（名前・開始日・日数・進捗・マイルストーン・削除）を同梱しています。これはライブラリ内蔵UIではなく、`taskDblClick` フックと `addTask/updateTask/removeTask` API で**アプリ側の編集UIを作る実装例**です（デモのソース参照）。「休日にも予定を引く」チェックで暦日スケジュールも試せます。

ソフト開発プロジェクト21タスクの工程表で、ズーム切替（日/週/月）・全ドラッグ操作・依存線作成・undo/redo・JSONラウンドトリップ・イベントログを試せます。

## インストール

npm公開前は、`src/` ディレクトリと `src/rs-gantt.css` をコピーするだけで使えます。

```html
<link rel="stylesheet" href="./rs-gantt/src/rs-gantt.css">
```

```js
import { createRSGantt } from './rs-gantt/src/index.js';
// npm公開後: import { createRSGantt } from 'rs-gantt';
```

## クイックスタート

```html
<div id="app" style="height: 480px"></div>
```

```js
import { createRSGantt } from 'rs-gantt';
createRSGantt('#app', { tasks: [{ id: 1, name: '要件定義', start: '2026-07-06', duration: 5 }] });
```

実務向けのフル指定:

```js
const gantt = createRSGantt('#app', {
    tasks: [
        { id: 1, name: '設計フェーズ', open: true },                                  // 親 = サマリータスク
        { id: 2, parent: 1, name: '要件定義', start: '2026-07-06', duration: 5, progress: 60 },
        { id: 3, parent: 1, name: '基本設計', start: '2026-07-13', duration: 10 },
        { id: 4, name: 'リリース判定', start: '2026-07-31', milestone: true },
    ],
    links: [{ from: 2, to: 3 }],                       // 既定 type: 'FS'
    calendar: { holidays: 'jp' },                      // 土日 + 日本の祝日 + 年末年始（既定値なので省略可）
    zoom: 'week',                                      // 'day' | 'week' | 'month'
    autoSchedule: true,                                // FS 前倒し禁止（後続を先行の終了後へ押し出す）
    columns: ['wbs', 'name', 'start', 'duration', 'progress'],
});

gantt.on('taskDrop', (e) => save(e.task));             // ドラッグ確定（move/resize/progress共通）
gantt.on('taskDblClick', (e) => openEditor(e.task));   // 編集UIはアプリ側が出す
gantt.updateTask(3, { progress: 30 });
gantt.zoomTo('month'); gantt.scrollToTask(4);
gantt.undo(); gantt.redo();
const json = gantt.toJSON();  gantt.fromJSON(json);    // ラウンドトリップ保証
gantt.destroy();
```

## API

### `createRSGantt(target, options): Gantt`

| オプション | 既定値 | 説明 |
|---|---|---|
| `tasks` | `[]` | タスク配列（下記形式） |
| `links` | `[]` | 依存リンク配列（v0.1 は FS のみ） |
| `calendar` | `{ holidays: 'jp' }` | 営業日カレンダー（下記） |
| `zoom` | `'day'` | `'day' \| 'week' \| 'month'` |
| `autoSchedule` | `true` | FS 依存の前倒し禁止（後続の押し出し）。連鎖シフト完全対応は v0.2 |
| `columns` | `['wbs','name','start','duration','progress']` | グリッド列（名前 or 列定義） |
| `gridWidth` | 列幅合計 | 左ペインの初期幅(px) |
| `ganttColumns` / `ganttOverlays` | `[]` | カスタム列 / オーバーレイの登録 |
| `readOnly` | `false` | ドラッグ編集を無効化 |

### データ形式

- **task**: `{ id, name, start, end | duration, progress?, parent?, milestone?, open?, color? }`
  - `duration` は**営業日数**（カレンダー基準）。`end` 併用時は end 優先。日付は `'YYYY-MM-DD'` / `Date` / タイムスタンプ
  - 子を持つタスクはサマリー表示（start 省略時は子の包絡期間）
- **link**: `{ id?, from, to, type?: 'FS', lag?: 営業日数 }`（SS/FF/SF は v0.2）
- **calendar**: `{ workdays?: [1,2,3,4,5], holidays?: 'jp'|false, yearEnd?: true, customHolidays?: ['2026-08-13'], customWorkdays?: ['2026-10-10'], scheduleOnHolidays?: false }`
  - `scheduleOnHolidays: true` で**休日にも予定を引ける**（スナップ・日数計算が暦日ベースに。土日祝の網掛けは残る）。実行時は `gantt.setScheduleOnHolidays(v)` / `getScheduleOnHolidays()` で切替可（切替時は既存タスクの日数を現在モードで数え直し・日付は動かさない）

### Gantt メソッド

| メソッド | 説明 |
|---|---|
| `getTask(id)` / `updateTask(id, fields)` | 取得 / 更新（日付は営業日にスナップ・undo 可能） |
| `addTask(task)` / `removeTask(id)` | 追加 / 削除（子孫・関連リンクごと） |
| `addLink({from, to})` / `removeLink(id)` | 依存の追加（循環は警告して拒否）/ 削除 |
| `toJSON()` / `fromJSON(json)` | 正規化 JSON の出力 / 復元（ラウンドトリップ保証） |
| `undo()` / `redo()` | コマンドログによる取り消し / やり直し |
| `zoomTo(zoom)` / `scrollToTask(id)` | ズーム切替（左端の日付を維持）/ タスクへスクロール |
| `on(event, cb)` / `off(event, cb)` / `destroy()` | イベント / 破棄 |

### イベント

`taskClick / taskDblClick / taskDrop / progressChange / linkAdd / linkClick / expand / collapse / selectionChange / change`

`change` はあらゆる変更で発火します（保存フック用）。`taskDrop` は move / resize / progress ドラッグの確定で発火します。

### カスタム列 — `defineGanttColumn(def)`

```js
import { defineGanttColumn } from 'rs-gantt';

const assignee = defineGanttColumn({
    name: 'assignee', title: '担当', width: 80,
    render: (task, gantt) => task.assignee || '-',
});
createRSGantt('#app', { ganttColumns: [assignee], columns: ['wbs', 'name', 'assignee', 'start'] });
```

### カスタムオーバーレイ — `defineGanttOverlay(def)`

today線・非稼働日の網掛けも同じ API の組み込みオーバーレイです。

```js
import { defineGanttOverlay } from 'rs-gantt';

const deadline = defineGanttOverlay({
    name: 'deadline', layer: 'over',                  // 'under'（バーの下）| 'over'（上）
    render({ scale, el, height }) {
        const line = document.createElement('div');
        line.style.cssText = `position:absolute;top:0;width:2px;height:${height}px;background:#f59e0b`;
        line.style.left = `${scale.x(window.rsGantt.parseDate('2026-10-01'))}px`;
        el.appendChild(line);
    },
});
```

### 祝日・営業日 API（単体でも使える）

```js
import { listHolidays, holidayName, createCalendar, parseDate } from 'rs-gantt';
listHolidays(2026);                       // [{ date: '2026-01-01', name: '元日' }, ...]
const cal = createCalendar();             // 土日+祝日+年末年始
cal.isWorkday(parseDate('2026-07-20'));   // false（海の日）
cal.addWorkdays(parseDate('2026-07-16'), 2); // 営業日で2日進める
```

### キーボード操作

`↑↓` 行選択 / `←→` 選択タスクを1営業日移動 / `Shift+←→` リサイズ / `Enter` taskDblClick 発火 / `Space` 折りたたみ / `Delete` 選択リンク削除 / `Ctrl+Z / Ctrl+Y` undo / redo

### テーマ

CSSカスタムプロパティ `--rsgt-*` で差し替え:

```css
.rsgt { --rsgt-bar-bg: #4e79a7; --rsgt-milestone: #b45309; --rsgt-today: #ef4444; --rsgt-nonwork-bg: rgba(100,116,139,.1); }
```

## 仕組み

```
公開API createRSGantt → Gantt 本体（正規化・ツリー構築・undo/redoコマンドログ・JSON入出力）
    ├─ TaskGrid（左: ツリー表 role=treegrid・列プラグイン・列幅ドラッグ）
    ├─ Timeline（右: DOM行+バー・TimeScale(日/週/月)・LinkLayer(SVG依存線)・Overlay）
    │    └─ DragController（Pointer Events: move/resize/progress/link・ゴースト+日付ツールチップ）
    └─ Scheduler（純粋関数: トポロジカルソート・循環検出・FS前倒し禁止）
         └─ Calendar（営業日計算・スナップ）← holidays-jp（祝日ルール計算・年単位メモ化）
```

- **日時計算はタイムゾーン安全**: 内部は「日シリアル値」（ローカル日付 y/m/d からの通算日の整数）で計算し、Date のミリ秒演算を日付境界に使わない（DST・TZずれの根絶）
- **祝日は計算式＋ルールテーブルのハイブリッド**: 固定日・ハッピーマンデー・春分/秋分の天文近似式・振替休日・国民の休日をルールで計算し、法改正・特例（五輪等）は例外テーブルで上書き。データファイル依存なし
- **タイムラインは DOM、依存線のみ SVG 1枚**: バー=絶対配置 div は Pointer Events のドラッグ実装と CSS テーマの相性がよく、依存線はクリック選択できる `<path>`（当たり判定用の太い透明パス併設）
- **ドラッグ 60fps**: rAF で間引き、ドラッグ中はゴーストと当該タスクの依存線のみ再計算

## ロードマップ（REQUIREMENTS.md 参照）

- v0.2: 依存4種(FS/SS/FF/SF)+lag・自動スケジューリング完全対応・クリティカルパス・サマリー自動集計・行の並べ替え・時/四半期/年ズーム
- v0.3: リソース割当・ヒストグラム・ベースライン比較・進捗ライン
- v0.4: 仮想スクロール(10,000タスク)・Excel/TSV貼り付けインポート・CSV/PNGエクスポート・印刷CSS
- v0.5: スケジューラビュー（縦軸=リソースの予約・シフト表）

## 検証

- Node 単体テスト16項目（祝日2026年全件を内閣府データと照合・五輪特例・振替休日・営業日スナップ・循環検出・FS伝播）を全パス（`node --test test/`）
- ヘッドレスChromium による受け入れテスト15項目（描画整合・ズーム・ドラッグ移動/リサイズ/進捗/依存線作成のマウス合成・祝日網掛けとスナップ・マイルストーン・折りたたみ・JSONラウンドトリップ・undo/redo・不正データ耐性・1,000タスク+500リンク初期描画500ms以内・コンソールエラー0件）を全パス

## ライセンス

MIT © ryusuke.sano
