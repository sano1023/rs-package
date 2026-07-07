/**
 * テーブルモデルを区切りテキストへ変換する。
 * @param {object} model buildTableModel() の戻り値
 * @param {object} opts { delimiter?: ','|'\t', raw?: boolean（true=生値 / false=表示文字列）, bom?: boolean }
 */
export function tableToDelimited(model: object, opts?: object): string;
/** CSV 文字列を作る（raw=生値。Excel 用途は bom:true を推奨） */
export function toCSV(model: any, opts?: {}): string;
/** TSV 文字列を作る */
export function toTSV(model: any, opts?: {}): string;
