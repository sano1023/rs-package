/**
 * セル行列 → rs-chart options。
 * @param {Array<Array<{v:any,t:string}>>} matrix 選択範囲のセル（{v, t}）
 * @param {object} [opts]
 *   type: 'column'(既定)/'bar'/'line'/'area'/'pie' など
 *   orientation: 'auto'(既定)/'columns'/'rows' — 系列を列方向/行方向どちらに取るか
 *   headers: 'auto'(既定)/true/false — 先頭行を系列名にするか
 *   categories: 'auto'(既定)/true/false — 先頭列をカテゴリにするか
 * @returns {{type:string, xAxis:{categories:string[]}, series:Array<{name:string,data:number[]}>}}
 */
export function rangeToChartData(matrix: Array<Array<{
    v: any;
    t: string;
}>>, opts?: object): {
    type: string;
    xAxis: {
        categories: string[];
    };
    series: Array<{
        name: string;
        data: number[];
    }>;
};
