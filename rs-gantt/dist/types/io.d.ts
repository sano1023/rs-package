/**
 * タブ区切りテキストをタスクレコード配列にパースする。
 *
 * - 1行目が既知の見出し語を含めばヘッダーとして扱い、列を対応づける。無ければ [名前,開始,終了,担当] 順。
 * - 階層は「名前セル先頭の空白」で表す（半角空白2つ・全角空白1つ・タブ1つ = 1段）。
 * - 空行は無視。名前が空の行も無視。
 *
 * @param {string} text
 * @param {object} [opts]
 * @param {number} [opts.indentSize=2] 半角空白いくつを1段とみなすか
 * @param {string} [opts.idPrefix='t'] 生成するタスクIDの接頭辞
 * @returns {Array<{id, name, parent, level, start?, end?, duration?, progress?, assignees?}>}
 */
export function parseTSV(text: string, opts?: {
    indentSize?: number | undefined;
    idPrefix?: string | undefined;
}): Array<{
    id: any;
    name: any;
    parent: any;
    level: any;
    start?: any;
    end?: any;
    duration?: any;
    progress?: any;
    assignees?: any;
}>;
/**
 * タスクレコード配列 → CSV 用の2次元セル配列（先頭はヘッダー行）。
 * レコードは { wbs?, name, level?/_level?, start?, end?, duration?, progress?, assignees? }。
 * @param {Array<object>} records
 * @param {object} [opts]
 * @param {string[]} [opts.header] 見出し行
 * @param {string} [opts.indentUnit='  '] 名前列のインデント文字（階層表現）
 * @param {boolean} [opts.indentNames=true] 名前を階層に応じて字下げするか
 */
export function tasksToMatrix(records: Array<object>, opts?: {
    header?: string[] | undefined;
    indentUnit?: string | undefined;
    indentNames?: boolean | undefined;
}): string[][];
/**
 * 2次元セル配列 → CSV 文字列（RFC 4180）。
 * @param {Array<Array<*>>} rows
 * @param {object} [opts]
 * @param {string} [opts.delimiter=','] 区切り文字
 * @param {string} [opts.eol='\r\n'] 改行
 * @param {boolean} [opts.bom=false] 先頭に UTF-8 BOM（Excel で文字化けを防ぐ）
 */
export function toCSV(rows: Array<Array<any>>, opts?: {
    delimiter?: string | undefined;
    eol?: string | undefined;
    bom?: boolean | undefined;
}): string;
