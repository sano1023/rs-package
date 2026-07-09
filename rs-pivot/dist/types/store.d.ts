/**
 * 列指向ストアを構築する。
 * @param {object[]} records フラットなJSON配列
 * @param {object[]} calculatedFields [{ name, expression }]（v0.2 計算フィールド。式は eval 不使用の自前パーサ）
 */
export function buildStore(records: object[], calculatedFields?: object[]): {
    count: number;
    records: object[];
    fieldNames: any[];
    calcFieldNames: any[];
    fields: {
        name: any;
        type: any;
        calc: boolean;
    }[];
    column: (n: any) => any;
    fieldType: (n: any) => any;
    /** フィルタUI用: フィールドの一意な値の一覧（表示値・ソート済み） */
    distinctValues(n: any): any[];
};
/** 空値（null/undefined/''）を表すグループコードの番兵。どの実コードとも衝突しない */
export const BLANK: "\0";
/** 空値の表示ラベル */
export const BLANK_LABEL: "(\u7A7A\u767D)";
