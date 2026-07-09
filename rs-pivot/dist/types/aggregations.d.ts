/**
 * rs-pivot 集計定義
 *
 * 組み込み集計（sum / avg / count / min / max / countDistinct）もすべて
 * defineAggregation() で実装する（プラグインAPIのドッグフーディング）。
 * 各定義は init / step / result の3関数からなる純粋なアキュムレータで、DOMに依存しない。
 */
/**
 * 集計方法を定義する。
 * @param {object} def { name, label?, init(), step(acc, value), result(acc), countLike? }
 *   - countLike: true のとき件数系とみなし、値フィールドの数値フォーマット（¥等）を適用しない
 */
export function defineAggregation(def: object): {
    label: any;
    countLike: boolean;
};
/**
 * 集計レジストリ（name → 定義）を作る。custom は defineAggregation() の戻り値の配列。
 */
export function createRegistry(custom?: any[]): Map<any, any>;
export namespace sum {
    let label: any;
    let countLike: boolean;
}
export namespace avg { }
export namespace count { }
export namespace min { }
export namespace max { }
export namespace countDistinct { }
export namespace median { }
export namespace stdev { }
/** 組み込み集計の一覧 */
export const builtinAggregations: {
    label: any;
    countLike: boolean;
}[];
