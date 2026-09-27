> **配布版（ビルド済み）** — 本パッケージはビルド済みファイルのみを含みます。
> 利用は無償（商用可）ですが、**改変・再配布はできません**（LICENSE.txt 参照）。
> 機能追加・改修のご依頼は有償で承ります → https://parelabo.com （contact@parelabo.com）

## インストール

```bash
npm install @sano1023/rs-calendar
```

npmjs.com の公開パッケージです。ログインやトークンは不要です。
更新・旧レジストリからの移行の詳細は [共通インストール手順](https://github.com/sano1023/rs-package/blob/main/INSTALLING.md) を参照してください。登録済みバージョンは [npm](https://www.npmjs.com/package/@sano1023/rs-calendar) で確認できます。以下のパッケージ名による import は Vite などのバンドラ向けです。

<details>
<summary>npm レジストリを使わない場合（GitHub tarball 直指定）</summary>

```bash
npm install https://github.com/sano1023/rs-package/raw/main/tarballs/rs-calendar-0.5.0.tgz
```
</details>

## 使い方

### バニラ JS（ESM・バンドラあり）

```js
import { createRSCalendar } from '@sano1023/rs-calendar';
import '@sano1023/rs-calendar/rs-calendar.css';   // スタイル（バンドラ経由）

createRSCalendar(document.querySelector('#app'), { events, /* オプション */ });
```

### `<script>` タグ（CDN・ビルド環境不要）

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sano1023/rs-calendar@0.5.0/dist/rs-calendar.css">
<script src="https://cdn.jsdelivr.net/npm/@sano1023/rs-calendar@0.5.0/dist/rs-calendar.min.js"></script>
<script>
  // 公開APIはグローバル RSCalendar に載る
  RSCalendar.createRSCalendar(document.querySelector('#app'), { events, /* オプション */ });
</script>
```

### Vue 3

```js
import { RsCalendar } from '@sano1023/rs-calendar/vue';
import '@sano1023/rs-calendar/rs-calendar.css';   // スタイル（バンドラ経由）
```

```vue
<template>
  <RsCalendar />
</template>
```

### React 18 / 19

```jsx
import { RsCalendar } from '@sano1023/rs-calendar/react';
import '@sano1023/rs-calendar/rs-calendar.css';   // スタイル（バンドラ経由）

export default function App() {
  return <RsCalendar />;
}
```

> `vue` / `react` は peerDependency です（バンドルには含みません）。アプリ側のものが使われます。

---

# rs-calendar

依存ゼロ・フレームワーク非依存の**イベントカレンダー**（v0.5）。

- **4ビュー**: 月（帯表示・レーン詰め・"+n件"）/ 週・日（時間グリッド・重なり列分割・現在時刻ライン・終日行）/ 予定リスト
- **日本の祝日を内蔵**: 2000〜2099年を計算式で算出（春分/秋分の天文近似・ハッピーマンデー・**振替休日・国民の休日**・五輪特例）。データ取得なし・完全オフライン
- **繰り返し予定（RRULE・RFC5545 サブセット）**: FREQ=DAILY/WEEKLY/MONTHLY/YEARLY・INTERVAL・COUNT・UNTIL・BYDAY（`2MO`=第2月曜 / `-1FR`=最終金曜）・BYMONTHDAY・EXDATE
- **ICS 入出力**: Google カレンダー等の .ics を取り込み（行折り解除・エスケープ・UTC→ローカル・終日 VALUE=DATE）・書き出し（75バイト行折り・日本語対応）
- **操作**: ドラッグで移動（月=日単位 / 週・日=スナップ付き）・下端リサイズ・空き枠のドラッグ選択→予定作成・`revert()` つき変更イベント
- **設計**: 内部は「日シリアル値/分シリアル値」の整数演算で TZ/DST の影響なし。**配置エンジン（帯レーン詰め・重なり列分割）が DOM 非依存の純関数**で、node 単体テスト 36 件で固定
- キーボード操作（イベントは Tab + Enter）・祝日/土日の色分け・CSS 変数テーマ・Vue/React ラッパー同梱・MIT

**v0.2 の追加**
- **繰り返しの個別編集**（Google カレンダー方式）: 「この予定のみ / これ以降すべて / すべての予定」— EXDATE の自動管理・シリーズ分割（UNTIL 打ち切り + 新シリーズ）。純ロジック `excludeOccurrence / detachOccurrence / splitSeries` も公開
- **繰り返しのドラッグ**: occurrence をドラッグすると自動で「この予定のみ」として切り出して移動（`revert()` で丸ごと復元）
- **イベントポップオーバー**: クリックで詳細表示 + タイトル/場所の編集 + 削除（繰り返しはスコープ選択つき）。`popover: false` で無効化
- **ミニカレンダー**: `createRSMiniCalendar('#mini', { onPick })` — 日付ジャンプ・予定マーク（`setMarks`）・単体利用可
- `fixedWeeks: true` で月ビューを常に6週に（高さが安定）

```js
// 繰り返しの個別編集 API
cal.updateOccurrence('w1', '2026-07-13', { start: '2026-07-15 09:00' }, 'one');   // この予定のみ
cal.removeOccurrence('w1', '2026-07-20', 'future');                                // これ以降すべて削除
```

**v0.3 の追加 — リソースビュー・営業時間・重複禁止**
- **リソースビュー**（会議室・担当者・設備の予約表）: `resources: [{ id, title, color }]` を渡すと `'resource'` ビューが有効に。列 = リソース × 1日、イベントは `resourceId` の列に描画、**列間ドラッグでリソースを付け替え**（select にも `resourceId` が入る）
- **営業時間**: `businessHours: { start: '9:00', end: '18:00', days: [1..5] }` — 時間外・非営業日（土日 + **祝日は自動で非営業**、`holidays: true` で営業扱い）を斜線網掛け
- **重複禁止**: `eventOverlap: false` — 同じ列（日/リソース）で重なるドラッグを拒否し `blocked` イベントを発火（リソースが違えば同時刻OK）

```js
const cal = createRSCalendar('#board', {
    view: 'resource',
    resources: [{ id: 'roomA', title: '会議室A' }, { id: 'roomB', title: '会議室B' }],
    events: [{ title: '商談', start: '2026-07-28 10:00', resourceId: 'roomA' }],
    businessHours: { start: '9:00', end: '18:00' },
    eventOverlap: false,                       // 会議室のダブルブッキング禁止
    onBlocked: ({ event }) => toast(`${event.title} は重複のため移動できません`),
});
```

**v0.4 の追加**
- **ISO 8601 週番号**: `weekNumbers: true` — 月ビューの各週に `W31`、週ビューのタイトルにも表示。純ロジック `isoWeekNumber()` も公開（53週の年・年跨ぎ対応）
- **大規模性能の検証**: 1万イベント（1割繰り返し）の月展開 7ms・受け入れテストで固定
- 印刷仕上げ（色の強制印刷・ポップオーバー非表示・リスト全展開）

**v0.5 の追加 — エコシステム連携（ロードマップ完走）**
- **rs-gantt 相互変換**: `eventsFromGanttTasks(tasks)` / `ganttTasksFromEvents(events)` — 工程表とカレンダーを往復（duration⇄期間・マイルストーン・サマリー除外・往復保証）
- **rs-report 連携**: `monthlyReportData(events, 2026, 7)` — 月間予定表（1日1行・祝日・土日祝色分け・繰り返し展開済み）の template + data を生成。`renderReport` に渡せば A4 1枚の帳票に
- **キーボードショートカット**（Google カレンダー風）: `t`=今日 / `j`/`k`=前後 / `m` `w` `d` `l` `r`=ビュー切替（入力中は無効）

```js
import { createRSCalendar } from '@sano1023/rs-calendar';
import '@sano1023/rs-calendar/rs-calendar.css';
```

## 使い方

```js
import { createRSCalendar } from '@sano1023/rs-calendar';
// CSS: <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/sano1023/rs-package@main/rs-calendar/dist/rs-calendar.css">

const cal = createRSCalendar('#calendar', {
    view: 'month',                       // month | week | day | list
    events: [
        { title: '打合せ', start: '2026-07-28 10:00', end: '2026-07-28 11:30' },
        { title: '出張', start: '2026-08-01', end: '2026-08-03' },                  // 終日・複数日（end は最終日）
        { title: '定例', start: '2026-07-06 09:00', rrule: 'FREQ=WEEKLY;BYDAY=MO' },
        { title: '給料日', start: '2026-07-25', rrule: 'FREQ=MONTHLY;BYMONTHDAY=25', color: '#dc2626' },
    ],
    onSelect: ({ start, end, startTime }) => cal.addEvent({ title: '新規', start, end }),
    onEventChange: ({ event, revert }) => saveToServer(event).catch(revert),
    onEventClick: ({ event }) => console.log(event),
});

cal.setView('week');
cal.next(); cal.prev(); cal.today();
cal.addEvent({ ... }); cal.updateEvent(id, { start: '...' }); cal.removeEvent(id);
cal.importICS(icsText);                  // Google カレンダーの書き出しを取り込む
const ics = cal.exportICS();             // .ics 文字列
```

### 主なオプション

| オプション | 既定 | 説明 |
|---|---|---|
| `view` / `date` | `'month'` / 今日 | 初期ビュー・基準日 |
| `weekStart` | `0`（日曜） | 週の開始曜日 |
| `holidays` | `true` | 日本の祝日表示（赤・名称） |
| `hourStart` / `hourEnd` | `0` / `24` | 時間グリッドの範囲 |
| `slotMinutes` / `snapMinutes` | `30` / `15` | グリッド刻み / ドラッグスナップ |
| `monthMaxLanes` | `4` | 月ビューの帯レーン上限（超過は「他 n 件」） |
| `editable` / `selectable` | `true` | D&D 編集 / 空き枠選択 |
| `labels` | 日本語 | 文言の差し替え |

### 純ロジック API（node でも動く）

```js
import { holidayName, listHolidays, expandRRule, parseICS, buildICS } from '@sano1023/rs-calendar';
holidayName(parseDate('2026-09-22'));    // '国民の休日'
listHolidays(2026);                       // [{ date, name }, ...]
```

## Vue / React

```js
import { RsCalendar } from '@sano1023/rs-calendar/vue';    // <RsCalendar :events="events" :options="{ view: 'week' }" @select="..." />
import { RsCalendar } from '@sano1023/rs-calendar/react';  // <RsCalendar events={events} options={{}} onSelect={...} ref={ref} />
```

## テスト

```
node --test test/
```

日付演算・祝日（改元境界・振替・国民の休日）・RRULE 展開・ICS ラウンドトリップ・帯レーン詰め・列分割・UI 契約・シリーズ編集・ポップオーバーの 48 件。

## ライセンス

MIT
