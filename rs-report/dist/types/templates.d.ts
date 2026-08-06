/**
 * 証憑テンプレートを生成する。
 * @param {'invoice'|'estimate'|'delivery'|'receipt'} kind
 * @param {object} [custom] テンプレートへのパッチ（paper / margin / style / bands の部分上書き）
 * @returns {object} rs-report テンプレート
 */
export function createDocumentTemplate(kind?: "invoice" | "estimate" | "delivery" | "receipt", custom?: object): object;
/**
 * 明細行を前処理して税区分列を付ける。
 * テンプレート内の式を単純に保つため、taxable8 / taxable10 / amountValue を行に展開する。
 * @param {object[]} rows
 * @returns {object[]}
 */
export function prepareDocumentRows(rows: object[]): object[];
/** 請求書（適格請求書対応） */
export const invoiceTemplate: object;
/** 見積書 */
export const estimateTemplate: object;
/** 納品書 */
export const deliveryTemplate: object;
/** 領収書（但し書き・収入印紙欄つき） */
export const receiptTemplate: object;
