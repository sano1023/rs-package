/**
 * 選択肢の度数集計（radio / select / checkbox）。
 * @returns {{ kind:'choice', responders, totalSelections, items:[{value,text,count,percent}] }}
 */
export function tallyChoices(q: any, responses: any): {
    kind: "choice";
    responders: any;
    totalSelections: any;
    items: [{
        value: any;
        text: any;
        count: any;
        percent: any;
    }];
};
/**
 * NPS 分布集計。
 * @returns {{ kind:'nps', counts:number[11], total, promoters, passives, detractors, nps }}
 */
export function tallyNPS(q: any, responses: any): {
    kind: "nps";
    counts: number[11];
    total: any;
    promoters: any;
    passives: any;
    detractors: any;
    nps: any;
};
/**
 * 星評価の分布と平均。
 * @returns {{ kind:'rating', max, counts:number[], total, mean }}
 */
export function tallyRating(q: any, responses: any): {
    kind: "rating";
    max: any;
    counts: number[];
    total: any;
    mean: any;
};
/** 数値回答の要約統計。 */
export function numericStats(q: any, responses: any): {
    kind: string;
    count: number;
    mean: number;
    min: number;
    max: number;
    sum: number;
};
/** テキスト回答の一覧（集計せず回答を集める）。 */
export function collectText(q: any, responses: any): {
    kind: string;
    responders: number;
    values: string[];
};
/** 質問タイプに応じて適切な集計関数を選び、全質問を集計する。 */
export function summarize(questions: any, responses: any): {
    name: any;
    label: any;
    type: any;
    summary: {
        kind: "choice";
        responders: any;
        totalSelections: any;
        items: [{
            value: any;
            text: any;
            count: any;
            percent: any;
        }];
    } | {
        kind: "nps";
        counts: number[11];
        total: any;
        promoters: any;
        passives: any;
        detractors: any;
        nps: any;
    } | {
        kind: "rating";
        max: any;
        counts: number[];
        total: any;
        mean: any;
    } | {
        kind: string;
        count: number;
        mean: number;
        min: number;
        max: number;
        sum: number;
    } | {
        kind: string;
        responders: number;
        values: string[];
    };
}[];
/**
 * 回答集計サマリを描画する（v0.4）。
 * @param {string|HTMLElement} target 描画先
 * @param {object} options { schema | questions, responses:Array<回答JSON>, createChart?, textLimit? }
 *   createChart: rs-chart の createRSChart 相当。省略時はグローバルを探し、無ければ表フォールバック。
 *                false を渡すと明示的に表フォールバックを強制する。
 * @returns {{ el, setResponses(responses), destroy() }}
 */
export function createRSFormSummary(target: string | HTMLElement, options?: object): {
    el: any;
    setResponses(responses: any): any;
    destroy(): any;
};
/** スキーマ（pages / questions）からフラットな質問配列を取り出す */
export function flattenQuestions(schema: any): any;
