/**
 * 明細モーダルを開く。
 * @param {HTMLElement} host 追加先（ピボットのルート要素）
 * @param {object[]} records 明細レコード
 * @param {string[]} fieldNames 表示する列名
 * @param {string} title 見出し（セルのパスラベル）
 * @returns {() => void} クローズ関数
 */
export function showDetailModal(host: HTMLElement, records: object[], fieldNames: string[], title: string): () => void;
