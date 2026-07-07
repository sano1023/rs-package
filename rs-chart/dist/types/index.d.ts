/** チャートタイプ定義のヘルパー（組み込みタイプもすべてこのAPIで実装されている） */
export function defineChartType(def: any): any;
/**
 * チャートを生成する。
 * @param {string|HTMLElement} target セレクタ or 要素
 * @param {object} options type / series / xAxis / yAxis / legend / tooltip / colors / chartTypes など
 * @returns {Chart}
 */
export function createRSChart(target: string | HTMLElement, options?: object): Chart;
/**
 * ダッシュボードを生成する（グリッドレイアウト + ズーム/ホバー連動 + KPIカード）。
 */
export function createRSDashboard(target: any, options?: {}): Dashboard;
/** 標準チャートタイプ一式 */
export const builtinTypes: {
    name: string;
    axes: boolean;
    draw(ctx: any): void;
}[];
import { Chart } from './chart.js';
import { Dashboard } from './dashboard.js';
import { DEFAULT_COLORS } from './chart.js';
export { Chart, Dashboard, DEFAULT_COLORS };
