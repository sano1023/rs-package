/** オーバーレイ定義のヘルパー */
export function defineGanttOverlay(def: any): any;
/** 非稼働日（土日・祝日・年末年始・カスタム休日）の網掛け */
export const nonWorkingOverlay: any;
/** today線（今日の日付に縦線） */
export const todayOverlay: any;
/**
 * 進捗ライン（イナズマ線 / v0.3）
 *
 * today の縦線を基準に、各タスク行で「実進捗のフロンティア」へ折れる稲妻状の折れ線を描く。
 * 進捗が今日より手前（左）＝遅延、今日より先（右）＝前倒し。`gantt.progressLine` が真のときのみ描画。
 * scale から直接計算するため _rects（バー矩形）に依存しない（描画順の影響を受けない）。
 */
export const progressLineOverlay: any;
/** 標準オーバーレイ一式 */
export const builtinOverlays: any[];
