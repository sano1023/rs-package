/**
 * 集計結果を rs-chart オプションへ変換する。
 * @param {object} result aggregate()/hydrateResult() の戻り値
 * @param {object} opts { type?, value?, maxCategories?, maxSeries?, ...passthrough }
 *   - type: チャートタイプ（既定 'column'）
 *   - value: 円系や単一値チャートで使う値フィールドのインデックス（既定 0）
 *   - maxCategories / maxSeries: 過大な表を安全に描くための上限
 *   - その他のキー（legend/colors/title/yAxis 等）はそのまま createRSChart へ渡す
 * @returns {object} createRSChart(el, これ) に渡せるオプション
 */
export function pivotToChart(result: object, opts?: object): object;
/**
 * 集計結果を rs-chart オプションへ変換する。
 * @param {object} result aggregate()/hydrateResult() の戻り値
 * @param {object} opts { type?, value?, maxCategories?, maxSeries?, ...passthrough }
 *   - type: チャートタイプ（既定 'column'）
 *   - value: 円系や単一値チャートで使う値フィールドのインデックス（既定 0）
 *   - maxCategories / maxSeries: 過大な表を安全に描くための上限
 *   - その他のキー（legend/colors/title/yAxis 等）はそのまま createRSChart へ渡す
 * @returns {object} createRSChart(el, これ) に渡せるオプション
 */
export function sliceToChartData(result: object, opts?: object): object;
