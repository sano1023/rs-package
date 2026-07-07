/**
 * 注釈（+フォーム値）を XFDF 文字列へ書き出す。
 * @param {Array} annotations 内部モデルの注釈配列
 * @param {Array<{width,height}>} sizes ページ寸法（PDFポイント）
 * @param {object|null} formValues フィールド名→値
 */
export function exportXFDF(annotations: any[], sizes: Array<{
    width: any;
    height: any;
}>, formValues?: object | null): string;
/** XFDF文字列 → { annotations, fields } （内部モデル形式・正規化座標） */
export function importXFDF(xml: any, sizes: any): {
    annotations: {
        type: any;
        page: number;
        style: {};
    }[];
    fields: {};
};
