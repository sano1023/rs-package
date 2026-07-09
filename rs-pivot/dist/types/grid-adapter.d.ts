/**
 * 明細レコードを rs-grid の { columns, data } へ変換する（純粋関数）。
 * @param {object[]} records 明細レコード
 * @param {object} opts
 *   - fields:  表示するフィールド名の既定リスト（store.fieldNames）
 *   - columns: 表示列。文字列配列（列名）／ rs-grid 列定義配列のいずれか（ドリルスルーの列カスタム）
 *   - limit:   表示件数上限（既定は全件）
 *   - fieldType: (name) => 'number'|'date'|'string'（列型の推定に使用）
 * @returns {{ columns: object[], data: object[] }}
 */
export function recordsToGrid(records: object[], opts?: object): {
    columns: object[];
    data: object[];
};
/**
 * ドリルスルー明細を rs-grid で表示するモーダルを開く。
 * @param {HTMLElement} host 追加先（ピボットのルート要素）
 * @param {object} cfg
 *   - records: 明細レコード
 *   - title:   見出し
 *   - createGrid: createRSGrid（注入）
 *   - grid:    recordsToGrid に渡す opts（columns/limit/fields/fieldType）
 * @returns {() => void} クローズ関数
 */
export function showGridDetailModal(host: HTMLElement, cfg: object): () => void;
