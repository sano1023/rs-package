/**
 * 列指向ストアを構築する。
 * @param {object[]} records フラットなJSON配列
 */
export function buildStore(records: object[]): {
    count: number;
    records: object[];
    fieldNames: string[];
    fields: {
        name: string;
        type: any;
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
