/** チャートオプションから最初の系列の数値配列を取り出す（フォールバック用の純粋関数） */
export function firstSeriesValues(chart: any): any;
/**
 * 数値配列 → 簡易バーの矩形配列（純粋関数・DOM非依存 = node 単体テスト可能）。
 * 連携先が未ロードのときのサムネイル描画に使う。
 */
export function chartFallbackBars(values: any, w: any, h: any, { pad, gap }?: {
    pad?: number | undefined;
    gap?: number | undefined;
}): any;
/** ノードのチャートオプションを正規化する（描画サイズを注入・既定は縦棒） */
export function chartOptionsFor(node: any, width: any, height: any, defaults?: {}): any;
/** 指定ノードの埋め込みチャートを破棄する */
export function destroyEmbed(diagram: any, id: any): void;
/**
 * チャート内包ノードのタイプ定義を返す（opt-in・注入）。
 *
 *   import { createRSChart } from 'rs-chart';
 *   const chartNode = defineChartNode({ createRSChart });
 *   createRSDiagram(el, { nodeTypes: [chartNode], nodes: [{ type: 'chart', chart: {...} }] });
 *
 * @param {object} config
 *   - createRSChart: rs-chart の生成関数（省略/未ロード時はフォールバック描画）
 *   - name: タイプ名（既定 'chart'）
 *   - defaults: { width, height } 既定サイズ
 *   - chartDefaults: すべてのチャートに適用する既定オプション
 */
export function defineChartNode(config?: object): {
    defaults: any;
    anchors: string[];
    shape: string;
    labelPosition: string;
};
