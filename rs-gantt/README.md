> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm install @parelabo/rs-gantt
```

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-gantt-0.5.0.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSGantt } from '@parelabo/rs-gantt';
import '@parelabo/rs-gantt/rs-gantt.css';   // スタイル（バンドラ経由）

createRSGantt(document.querySelector('#app'), { /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@parelabo/rs-gantt@0.5.0/dist/rs-gantt.css">
<script src="https://cdn.jsdelivr.net/npm/@parelabo/rs-gantt@0.5.0/dist/rs-gantt.min.js"></script>
<script>
  // 公開APIはグローバル RSGantt に載る
  RSGantt.createRSGantt(document.querySelector('#app'), { /* オプション */ });
</script>
```

### Vue 3

```js
import { RsGantt } from '@parelabo/rs-gantt/vue';
import '@parelabo/rs-gantt/rs-gantt.css';   // スタイル（バンドラ経由）
```

```vue
<template>
  <RsGantt />
</template>
```

### React 18 / 19

```jsx
import { RsGantt } from '@parelabo/rs-gantt/react';
import '@parelabo/rs-gantt/rs-gantt.css';   // スタイル（バンドラ経由）

export default function App() {
  return <RsGantt />;
}
```

> `vue` / `react` は peerDependency です（バンドルには含みません）。アプリ側のものが使われます。

---

# rs-gantt

依存ゼロの**対話型プロジェクトガント**。バーをドラッグすれば計画そのもの（start / duration / progress / 依存関係）が書き換わり、依存タスクが連鎖して動く、スケジューリングエンジンを持つ編集ツールです（現在 v0.5）。

- **依存ゼロ・ライセンスキー不要**: ランタイム依存なし。ビルド不要で `src/` から直接 import できる ESモジュール
- **日本の祝日・営業日カレンダー内蔵**: 土日 + 日本の祝日（春分/秋分の計算式・振替休日・国民の休日・五輪特例まで内蔵計算、2000〜2099年）+ 年末年始。非稼働日は網掛けされ、ドラッグは営業日にスナップ、duration は営業日数
- **スケジューラビュー（v0.5）**: `view: 'scheduler'` で **縦軸=リソース（部屋/設備/人）× 横軸=時間** の予約・シフト表ビュー。イベントを**ドラッグで別リソース／別時間へ移動**・右端で終了時刻を変更でき、同一リソースで**時間が重なるイベントは段組み（レーン）表示**。営業時間ウィンドウ（`dayStart`/`dayEnd`）・非稼働日の網掛けに対応
- **大規模データと入出力（v0.4）**: **仮想スクロール**（1万タスクでも可視域だけをDOM描画・左右ペイン同期・行高固定32px、初期描画1000ms以内）・**Excel/TSV貼り付けインポート**（name/start/end/担当 + インデントで階層化）・**CSVエクスポート**（BOM付きUTF-8）・**PNGエクスポート**（タイムラインを canvas 描画）・**印刷CSS**（A4横・ページ分割）
- **リソースとトラッキング（v0.3）**: **リソース（担当者）割当**（バー右／グリッド列にアバター＋名前）・**リソースヒストグラム**（下部パネルで日別の割当合計・過負荷を赤表示・稼働率ビュー）・**ベースライン比較**（計画スナップショットをバー下に薄いバーで表示・遅延日数列）・**進捗ライン**（today 基準のイナズマ線）
- **スケジューリングエンジン（v0.2）**: 依存タイプ4種（**FS / SS / FF / SF**）+ lag・**自動スケジューリング**（先行を動かすと後続が連鎖シフト・循環は検出して拒否）・**クリティカルパス**表示（スラック0のタスク/リンクを強調）・サマリー（親）の期間/進捗を子から自動集計
- **対話型編集**: バーのドラッグ移動・両端リサイズ・進捗ハンドル・端点○からの依存線作成・マイルストーン移動・**行のドラッグ並べ替え / Tab・Shift+Tab でインデント・アウトデント**。すべて undo/redo（Ctrl+Z / Ctrl+Y）可能
- **タスクツリーグリッド**: WBS番号・折りたたみ・列カスタム・列幅ドラッグ・**集計フッター行**・左右ペインのスプリッタ
- **6段階ズーム**: 時 / 日 / 週 / 月 / 四半期 / 年（**Ctrl+ホイール**でも段階ズーム）
- **3行で最初のガントが出る**宣言的API + `toJSON()/fromJSON()` ラウンドトリップ保証
- **プラグインAPI**: today線や非稼働日網掛けなどの組み込み機能も `defineGanttColumn()`（footer で集計行）/ `defineGanttOverlay()` で実装（dogfooding）
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

ソフト開発プロジェクト21タスクの工程表に加え、ページ下部に**スケジューラビュー（会議室・設備予約）**（v0.5）を同梱：予約ブロックをドラッグで別の部屋／別の時間へ移動・右端で終了時刻を変更でき、同じ部屋で時間が重なる予約は段組みで並び、土日は網掛けされます。さらに**1万タスク生成（仮想スクロール）・TSV貼り付けインポート・CSV/PNG書き出し・印刷**（v0.4）や、**リソース割当（担当者アバター）・下部リソースヒストグラム（過負荷を赤表示・稼働率ビュー）・ベースライン保存と比較（薄い計画バー＋遅延日数列）・進捗ライン（イナズマ線）**（v0.3）、ズーム切替（時/日/週/月/四半期/年・Ctrl+ホイール）・全ドラッグ操作・依存線作成と依存タイプ切替（FS/SS/FF/SF）・自動スケジュールのON/OFF・クリティカルパス表示・行のインデント(Tab)/ドラッグ並べ替え・集計フッター・undo/redo・JSONラウンドトリップ・イベントログを試せます。

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
        { id: 2, parent: 1, name: '要件定義', start: '2026-07-06', duration: 5, progress: 60, assignees: ['sato'] },
        { id: 3, parent: 1, name: '基本設計', start: '2026-07-13', duration: 10, assignees: [{ resource: 'tanaka', units: 0.5 }] },
        { id: 4, name: 'リリース判定', start: '2026-07-31', milestone: true },
    ],
    links: [{ from: 2, to: 3, type: 'FS' }],           // type: 'FS'|'SS'|'FF'|'SF'（既定 FS）+ lag?
    resources: [                                       // v0.3 リソース（担当者）
        { id: 'sato', name: '佐藤', color: '#4e79a7', capacity: 1 },
        { id: 'tanaka', name: '田中', color: '#59a14f' },
    ],
    calendar: { holidays: 'jp' },                      // 土日 + 日本の祝日 + 年末年始（既定値なので省略可）
    zoom: 'week',                                      // 'hour'|'day'|'week'|'month'|'quarter'|'year'
    autoSchedule: true,                                // 依存の連鎖シフト（後続を先行制約の満たされる位置へ押し出す）
    criticalPath: false,                               // クリティカルパスの強調表示（gantt.setCriticalPath(true)）
    resourceHistogram: true,                           // 下部リソースヒストグラム（日別の割当合計・過負荷を赤）
    progressLine: false,                               // 進捗ライン（イナズマ線）
    columns: ['wbs', 'name', 'assignees', 'start', 'duration', 'progress', 'delay'],
});

gantt.on('taskDrop', (e) => save(e.task));             // ドラッグ確定（move/resize/progress共通）
gantt.on('taskDblClick', (e) => openEditor(e.task));   // 編集UIはアプリ側が出す
gantt.updateTask(3, { progress: 30 });
gantt.updateLink({ from: 2, to: 3 }, { type: 'SS', lag: 2 }); // 依存タイプ / lag を変更
gantt.setCriticalPath(true);                           // クリティカルパス表示
gantt.assignResource(3, 'sato', 0.5);                  // v0.3 リソース割当（units=0.5=50%）
gantt.captureBaseline();                               // v0.3 現在の日程を計画として保存（遅延日数の基準）
gantt.setProgressLine(true);                           // v0.3 進捗ライン（イナズマ線）
gantt.indentTask(3); gantt.outdentTask(3);             // インデント / アウトデント
gantt.zoomTo('quarter'); gantt.scrollToTask(4);
gantt.undo(); gantt.redo();
const json = gantt.toJSON();  gantt.fromJSON(json);    // ラウンドトリップ保証（リソース/割当/ベースライン含む）
gantt.destroy();
```

## API

### `createRSGantt(target, options): Gantt`

| オプション | 既定値 | 説明 |
|---|---|---|
| `tasks` | `[]` | タスク配列（下記形式） |
| `links` | `[]` | 依存リンク配列（FS/SS/FF/SF + lag） |
| `resources` | `[]` | リソース（担当者／部屋／設備）配列 `{ id, name, color?, capacity? }`（v0.3・スケジューラの縦軸にも使用） |
| `view` | `'gantt'` | `'gantt'`（ツリー+タイムライン）/ `'scheduler'`（縦軸=リソース×横軸=時間の予約表）（v0.5） |
| `events` | `[]` | スケジューラのイベント配列（下記形式）（v0.5） |
| `scheduler` | `{}` | スケジューラの表示設定 `{ dayStart?, dayEnd?, pxPerMin?, slotMinutes?, days? }`（v0.5・下記） |
| `calendar` | `{ holidays: 'jp' }` | 営業日カレンダー（下記） |
| `zoom` | `'day'` | `'hour' \| 'day' \| 'week' \| 'month' \| 'quarter' \| 'year'` |
| `autoSchedule` | `true` | 依存タイプ4種の連鎖シフト（後続を制約の満たされる位置へ押し出す・循環は拒否） |
| `criticalPath` | `false` | クリティカルパス（スラック0のタスク/リンク）の強調表示 |
| `resourceHistogram` | `false` | 下部リソースヒストグラムパネル（日別の割当合計・過負荷を赤）（v0.3） |
| `histogramMode` | `'load'` | ヒストグラムの表示モード `'load'`（実数[人日]）/ `'util'`（稼働率[%]）（v0.3） |
| `progressLine` | `false` | 進捗ライン（today 基準のイナズマ線）（v0.3） |
| `defaultLinkType` | `'FS'` | ドラッグ作成する依存リンクの既定タイプ |
| `footer` | `true` | 集計フッター行（列に `footer` があるとき表示） |
| `columns` | `['wbs','name','start','duration','progress']` | グリッド列（`assignees` / `delay` も組み込み・名前 or 列定義） |
| `gridWidth` | 列幅合計 | 左ペインの初期幅(px) |
| `ganttColumns` / `ganttOverlays` | `[]` | カスタム列 / オーバーレイの登録 |
| `readOnly` | `false` | ドラッグ編集を無効化 |
| `virtualThreshold` | `2000` | 可視行がこの数を超えたら仮想スクロール（上下スペーサ+可視スライス描画）に切り替える（v0.4） |

### データ形式

- **task**: `{ id, name, start, end | duration, progress?, parent?, milestone?, open?, color?, assignees? }`
  - `duration` は**営業日数**（カレンダー基準）。`end` 併用時は end 優先。日付は `'YYYY-MM-DD'` / `Date` / タイムスタンプ
  - 子を持つタスクはサマリー表示（start 省略時は子の包絡期間・進捗は子の営業日重み付き平均で自動集計）
  - **assignees**（v0.3）: `['sato', 'tanaka']`（リソースID）または `[{ resource: 'sato', units: 0.5 }]`（`units` は稼働率・既定 1=100%）
- **link**: `{ id?, from, to, type?: 'FS'|'SS'|'FF'|'SF', lag?: 営業日数 }`
  - **FS**（終了→開始・既定）: 後続は先行の終了後に開始 / **SS**（開始→開始）: 後続は先行の開始以降に開始 / **FF**（終了→終了）: 後続は先行の終了以降に終了 / **SF**（開始→終了）: 後続は先行の開始以降に終了。`lag` は営業日（負数=リード）
- **resource**（v0.3）: `{ id, name, color?, capacity? }`。`capacity` は1日あたりの容量（既定 1）。日別割当合計が capacity を超えた日はヒストグラムで**過負荷（赤）**。スケジューラビューでは**縦軸の1行**になる
- **event**（v0.5・スケジューラ）: `{ id, name, resource, start, end | duration, color? }`
  - `start`/`end` は**日時**（`'YYYY-MM-DD HH:MM'` / `'YYYY-MM-DDTHH:MM'` / `Date` / タイムスタンプ）。時刻省略時は 00:00。`duration` は**分**（`end` 省略時に使用・既定60分）
  - `resource` は割当先リソースID。同一リソースで時間が重なるイベントは**段組み（レーン）表示**される
- **scheduler**（v0.5）: `{ dayStart?: '08:00', dayEnd?: '20:00', pxPerMin?: 1.2, slotMinutes?: 60, days? }`。1日の描画は営業時間ウィンドウ `[dayStart, dayEnd]` ぶんに限定され横幅が有界になる。`slotMinutes` は時刻目盛りとドラッグのスナップ幅
- **calendar**: `{ workdays?: [1,2,3,4,5], holidays?: 'jp'|false, yearEnd?: true, customHolidays?: ['2026-08-13'], customWorkdays?: ['2026-10-10'], scheduleOnHolidays?: false }`
  - `scheduleOnHolidays: true` で**休日にも予定を引ける**（スナップ・日数計算が暦日ベースに。土日祝の網掛けは残る）。実行時は `gantt.setScheduleOnHolidays(v)` / `getScheduleOnHolidays()` で切替可（切替時は既存タスクの日数を現在モードで数え直し・日付は動かさない）

### Gantt メソッド

| メソッド | 説明 |
|---|---|
| `getTask(id)` / `updateTask(id, fields)` | 取得 / 更新（日付は営業日にスナップ・依存の連鎖シフト・undo 可能） |
| `addTask(task)` / `removeTask(id)` | 追加 / 削除（子孫・関連リンクごと） |
| `addLink({from, to, type?, lag?})` / `removeLink(id)` | 依存の追加（循環は警告して拒否）/ 削除 |
| `updateLink(idOrPair, {type?, lag?})` | 依存タイプ / lag の変更（連鎖シフト・undo 可能） |
| `indentTask(id)` / `outdentTask(id)` / `moveTask(src, ref, place)` | インデント / アウトデント / 並べ替え（`place`: `'before'\|'after'\|'child'`） |
| `setCriticalPath(bool)` / `getCriticalPath()` | クリティカルパスの強調表示 |
| `setAutoSchedule(bool)` / `setDefaultLinkType(type)` | 自動スケジュールの切替 / 新規リンクの既定タイプ |
| `setResources(list)` / `getResource(id)` | リソース定義の差し替え / 取得（v0.3） |
| `assignResource(taskId, resource, units?)` / `unassignResource(taskId, resource)` | リソース割当の追加 / 解除（undo 可能・`assignChange` 発火）（v0.3） |
| `getHistogram(range?)` | 現在の割当からリソースヒストグラム（日別合計・過負荷・ピーク）を計算（純粋関数）（v0.3） |
| `setResourceHistogram(bool)` / `setHistogramMode('load'\|'util')` | 下部ヒストグラムパネルの表示 / 実数⇔稼働率 切替（v0.3） |
| `captureBaseline()` / `clearBaseline()` / `hasBaseline()` / `getBaseline(id)` | ベースライン（計画）の保存 / 破棄 / 有無 / 取得（v0.3） |
| `setProgressLine(bool)` / `getProgressLine()` | 進捗ライン（イナズマ線）の表示切替（v0.3） |
| `importTSV(text, {mode?, parent?})` | Excel/TSV貼り付けをタスクツリーに取り込む（`mode`: `'replace'`（既定）/ `'append'`・インデントで階層化）（v0.4） |
| `exportCSV(opts?)` / `downloadCSV(filename?, opts?)` | 現在のタスクを CSV 文字列に / CSV ファイルをダウンロード（BOM付きUTF-8・DFS順・名前は字下げ）（v0.4） |
| `exportPNG(opts?)` / `renderCanvas(opts?)` / `downloadPNG(filename?, opts?)` | タイムラインを PNG(dataURL) に / canvas を返す / PNG をダウンロード（v0.4） |
| `print()` | 印刷ダイアログを開く（印刷CSSで A4横・ページ分割）（v0.4） |
| `setView('gantt'\|'scheduler')` / `getView()` | ガント⇔スケジューラのビュー切替（v0.5） |
| `addEvent(event)` / `updateEvent(id, fields)` / `removeEvent(id)` | スケジューライベントの追加 / 更新（resource/start/end/duration・undo 可能）/ 削除（v0.5） |
| `getEvent(id)` / `getEvents()` / `setEvents(list)` | イベントの取得（内部表現）/ 一覧（正規化コピー）/ 一括差し替え（v0.5） |
| `selectEvent(id)` / `getSchedulerLayout()` | イベント選択 / 現在の段組みレイアウト（リソース別レーン数・配置）を取得（v0.5） |
| `toJSON()` / `fromJSON(json)` | 正規化 JSON の出力 / 復元（リソース/割当/ベースライン/**イベント**含む・ラウンドトリップ保証） |
| `undo()` / `redo()` | コマンドログによる取り消し / やり直し |
| `zoomTo(zoom)` / `zoomStep(dir, anchor?)` / `scrollToTask(id)` | ズーム切替（左端の日付を維持）/ 段階ズーム / タスクへスクロール |
| `on(event, cb)` / `off(event, cb)` / `destroy()` | イベント / 破棄 |

### イベント

`taskClick / taskDblClick / taskDrop / progressChange / linkAdd / linkClick / expand / collapse / selectionChange / assignChange / change` ＋ スケジューラ（v0.5）: `eventClick / eventDblClick / eventDrop / eventAdd / viewChange`

`change` はあらゆる変更で発火します（保存フック用）。`taskDrop` は move / resize / progress ドラッグの確定で、`eventDrop` はスケジューラでイベントを別リソース/別時間へドラッグ確定したときに発火します（`{ event, mode }`）。

### カスタム列 — `defineGanttColumn(def)`

`render(task, gantt)` は文字列 or DOM Node を返します。`footer(gantt)` を定義すると**集計フッター行**にその列の集計値が出ます（組み込み列も件数・日数合計・重み付き進捗などを出します）。

```js
import { defineGanttColumn } from 'rs-gantt';

const assignee = defineGanttColumn({
    name: 'assignee', title: '担当', width: 80,
    render: (task, gantt) => task.assignee || '-',
    footer: (gantt) => `${gantt._tasks.length} 行`,   // フッター行に集計を表示
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

### リソースとトラッキング（v0.3）

```js
const gantt = createRSGantt('#app', {
    tasks: [
        { id: 1, name: '実装', start: '2026-07-06', duration: 8, assignees: ['tanaka'] },
        { id: 2, name: '試験', start: '2026-07-06', duration: 8, assignees: [{ resource: 'tanaka', units: 0.5 }] },
    ],
    resources: [{ id: 'tanaka', name: '田中', color: '#59a14f', capacity: 1 }],
    columns: ['wbs', 'name', 'assignees', 'start', 'duration', 'delay'], // assignees=担当列, delay=遅延日数列
    resourceHistogram: true,    // 下部に日別割当ヒストグラム（capacity 超過日は赤）
    progressLine: true,         // today 基準の進捗ライン（イナズマ線）
});

gantt.assignResource(1, 'tanaka', 0.5);   // 割当（units=稼働率）・unassignResource(id, res) で解除
gantt.setHistogramMode('util');           // 'load'（人日）⇔ 'util'（稼働率%）
const h = gantt.getHistogram();           // { byResource:[{id, days:Map, peak, overloadDays, capacity}], maxLoad }

// ベースライン（計画）を保存 → 以後タスクを動かすとバー下に薄い計画バー・delay 列に営業日で遅延が出る
gantt.captureBaseline();
gantt.updateTask(1, { start: '2026-07-13' });  // 後ろ倒し → delay 列に「+5日」
gantt.clearBaseline();
```

集計は純粋関数として単体でも使えます（`computeHistogram` / `endDelta` / `captureBaseline` / `normalizeResources`）。

### 大規模データと入出力（v0.4）

```js
// 仮想スクロール: 可視行が virtualThreshold(既定 2000)を超えると自動で上下スペーサ+可視スライス描画に切替。
// 左ペイン（ツリーグリッド）と右ペイン（タイムライン）は同じ可視スライスで縦スクロール同期。行高は固定 32px。
const gantt = createRSGantt('#app', { tasks: bigTasks /* 1万件でもOK */ });

// Excel/スプレッドシートからコピーしたタブ区切りを取り込む（名前セル先頭の空白 or 空列でインデント階層化）
gantt.importTSV(`タスク名\t開始\t終了\t担当
設計フェーズ
  基本設計\t2026-07-06\t2026-07-10\t高橋
  DB設計\t2026-07-13\t2026-07-17\t田中、鈴木
    テーブル定義\t2026-07-13\t2026-07-15\t田中`);   // { mode: 'append', parent } で末尾追記も可

// エクスポート
gantt.downloadCSV('工程表.csv');   // BOM付きUTF-8・WBS/名前(字下げ)/開始/終了/日数/進捗/担当
gantt.downloadPNG('工程表.png');   // タイムラインを canvas 描画して PNG 保存（exportPNG() は dataURL）
gantt.print();                     // 印刷ダイアログ（印刷CSSで A4横・ページ分割・操作用装飾は非表示）
```

TSVパース（`parseTSV`）・CSV生成（`tasksToMatrix` + `toCSV`）・canvas描画（`renderToCanvas`）は import して単体でも使えます。

### スケジューラビュー（v0.5）

`view: 'scheduler'` で、縦軸=リソース（部屋/設備/人）× 横軸=時間の**予約・シフト表**になります。イベントをドラッグで**別リソース／別時間へ移動**でき、右端で終了時刻を変更できます。同一リソースで**時間が重なるイベントは段組み（レーン）**で並びます。

```js
const scheduler = createRSGantt('#app', {
    view: 'scheduler',
    resources: [                                        // 縦軸: 部屋/設備/人
        { id: 'roomL', name: '大会議室', color: '#4e79a7' },
        { id: 'roomM', name: '中会議室', color: '#59a14f' },
        { id: 'car',   name: '社用車',   color: '#e15759' },
    ],
    events: [                                           // 予約/シフト（start/end は日時・重なりは段組み）
        { id: 'b1', resource: 'roomL', name: '全体定例', start: '2026-07-09 09:00', end: '2026-07-09 10:30' },
        { id: 'b2', resource: 'roomL', name: '採用面接', start: '2026-07-09 10:00', end: '2026-07-09 11:00' }, // b1 と重なる→別レーン
        { id: 'b3', resource: 'car',   name: '客先訪問', start: '2026-07-10 09:00', end: '2026-07-10 17:00' },
    ],
    scheduler: { dayStart: '08:00', dayEnd: '20:00', slotMinutes: 60 }, // 営業時間ウィンドウ・時刻目盛り/スナップ幅
});

scheduler.on('eventDrop', (e) => save(e.event));       // 別リソース/別時間へドロップ確定（{ event, mode }）
scheduler.addEvent({ id: 'x', resource: 'roomM', name: '打合せ', start: '2026-07-13 14:00', end: '2026-07-13 15:00' });
scheduler.updateEvent('b1', { resource: 'roomM', start: '2026-07-09 11:00' }); // undo 可能
scheduler.setView('gantt');                            // ガントビューへ切替（同一インスタンスで相互切替可）
```

段組みの重なり計算は純粋関数として import して単体でも使えます（`packLanes(events)` / `layoutScheduler(events, resources)` / `overlaps(a, b)`）。日時ユーティリティは `parseDateTime` / `formatDateTime` / `formatTime`、座標変換は `SchedulerScale`。土日・祝日（営業日カレンダー）はスケジューラでも網掛けされます。

### 祝日・営業日 API（単体でも使える）

```js
import { listHolidays, holidayName, createCalendar, parseDate } from 'rs-gantt';
listHolidays(2026);                       // [{ date: '2026-01-01', name: '元日' }, ...]
const cal = createCalendar();             // 土日+祝日+年末年始
cal.isWorkday(parseDate('2026-07-20'));   // false（海の日）
cal.addWorkdays(parseDate('2026-07-16'), 2); // 営業日で2日進める
```

### キーボード操作

`↑↓` 行選択 / `←→` 選択タスクを1営業日移動 / `Shift+←→` リサイズ / `Tab / Shift+Tab` インデント / アウトデント / `Enter` taskDblClick 発火 / `Space` 折りたたみ / `Delete` 選択リンク削除（スケジューラでは選択イベント削除）/ `Ctrl+Z / Ctrl+Y` undo / redo / `Ctrl+ホイール` ズーム

### テーマ

CSSカスタムプロパティ `--rsgt-*` で差し替え:

```css
.rsgt { --rsgt-bar-bg: #4e79a7; --rsgt-milestone: #b45309; --rsgt-today: #ef4444; --rsgt-nonwork-bg: rgba(100,116,139,.1); }
```

## 仕組み

```
公開API createRSGantt → Gantt 本体（正規化・ツリー構築・undo/redoコマンドログ・JSON入出力）
    ├─ TaskGrid（左: ツリー表 role=treegrid・列プラグイン・列幅ドラッグ）
    ├─ Timeline（右: DOM行+バー・アバター・ベースラインバー・TimeScale・LinkLayer(SVG依存線)・Overlay）
    │    └─ DragController（Pointer Events: move/resize/progress/link・ゴースト+日付ツールチップ）
    ├─ ResourceHistogram（下部: 日別割当ヒストグラム・過負荷赤・稼働率ビュー・横スクロール同期）
    ├─ SchedulerView（v0.5: 縦軸=リソース×横軸=時間の予約表・イベントドラッグ・段組み・SchedulerScale 分シリアル値の座標変換）
    └─ 純粋関数群（Node 単体テスト）
         ├─ Scheduler（トポロジカルソート・循環検出・依存4種の連鎖シフト propagate・クリティカルパス computeCritical）
         ├─ lanes（v0.5: 重なり段組みレイアウト packLanes・リソース別 layoutScheduler）
         ├─ resources（割当の正規化・ヒストグラム集計 computeHistogram・過負荷判定）
         ├─ baseline（計画スナップショット captureBaseline・遅延日数 endDelta）
         └─ Calendar（営業日計算・スナップ）← holidays-jp（祝日ルール計算・年単位メモ化）
```

- **日時計算はタイムゾーン安全**: 内部は「日シリアル値」（ローカル日付 y/m/d からの通算日の整数）で計算し、Date のミリ秒演算を日付境界に使わない（DST・TZずれの根絶）
- **祝日は計算式＋ルールテーブルのハイブリッド**: 固定日・ハッピーマンデー・春分/秋分の天文近似式・振替休日・国民の休日をルールで計算し、法改正・特例（五輪等）は例外テーブルで上書き。データファイル依存なし
- **タイムラインは DOM、依存線のみ SVG 1枚**: バー=絶対配置 div は Pointer Events のドラッグ実装と CSS テーマの相性がよく、依存線はクリック選択できる `<path>`（当たり判定用の太い透明パス併設）
- **ドラッグ 60fps**: rAF で間引き、ドラッグ中はゴーストと当該タスクの依存線のみ再計算

## ロードマップ（REQUIREMENTS.md 参照）

- **v0.5（完了）**: スケジューラビュー（`view: 'scheduler'`・縦軸=リソース×横軸=時間の予約/シフト表）・イベントのドラッグでリソース間移動 / 時間変更 / 終了時刻リサイズ・時間が重なるイベントの段組み（レーン）表示・営業時間ウィンドウ・非稼働日の網掛け
- **v0.4（完了）**: 仮想スクロール（1万タスクでも可視域だけDOM描画・左右ペイン同期・行高固定32px）・Excel/TSV貼り付けインポート（インデントで階層化）・CSVエクスポート（BOM付き）・PNGエクスポート（canvas描画）・印刷CSS（A4横・ページ分割）
- **v0.3（完了）**: リソース（担当者）割当（バー/グリッド列にアバター）・リソースヒストグラム（日別割当合計・過負荷を赤・稼働率ビュー）・ベースライン比較（薄い計画バー + 遅延日数列）・進捗ライン（イナズマ線）
- **v0.2（完了）**: 依存4種(FS/SS/FF/SF)+lag・自動スケジューリング（連鎖シフト・循環拒否）・クリティカルパス・サマリー期間/進捗の自動集計・列カスタムレンダラ + 集計フッター行・行のドラッグ並べ替え / インデント(Tab)・時/四半期/年ズーム + Ctrl+ホイール

## 検証

- Node 単体テスト66項目（祝日2026年全件を内閣府データと照合・五輪特例・振替休日・営業日スナップ・循環検出・依存4種の連鎖シフト propagate・クリティカルパス computeCritical のスラック判定・リソース割当の正規化 / ヒストグラム集計 / 過負荷判定・ベースライン遅延の営業日計算・仮想スクロールの可視スライス計算 / スペーサ恒等式・TSVパースのインデント階層化・CSVエスケープ・**段組みレイアウト packLanes / layoutScheduler の最小レーン数と再利用・分シリアル値の日時ユーティリティ・SchedulerScale の座標変換**）を全パス（`node --test test/`）
- ヘッドレスChromium による受け入れテスト：v0.1 の15項目（描画整合・ズーム・全ドラッグ操作・祝日網掛けとスナップ・JSONラウンドトリップ・undo/redo・不正データ耐性・1,000タスク+500リンク初期描画500ms以内）＋ v0.2 の11項目（依存4種のシフト・連鎖・循環拒否・クリティカルパス強調・サマリー自動集計・Tab/Shift+Tab インデント・行ドラッグ並べ替え・時/四半期/年ズーム・Ctrl+ホイール・集計フッター）＋ v0.3 の6項目（リソースをバー/列に表示・ヒストグラムの日別合計が割当と一致し過負荷が赤・ベースライン保存後の遅延日数と薄い計画バー・進捗ラインの左折れ・JSONラウンドトリップ）＋ v0.4 の8項目（1万タスクで可視域だけDOM描画・初期描画700ms以内・左右ペインのスクロール同期・TSVインポートの階層化・CSV内容とBOM・PNGのバー画素・印刷CSS）＋ **v0.5 の7項目（縦軸=リソース×横軸=時間の予約表描画・イベントをドラッグで別リソース/別時間へ移動しモデル更新・時間が重なるイベントの段組み・営業日カレンダーとの整合・イベントのJSONラウンドトリップとundo/redo）**を全パス（コンソールエラー0件）

## ライセンス

MIT © ryusuke.sano
