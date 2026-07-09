/** 値が「正しくマスク済み（●と空白のみ・または空）」か */
export function isMaskedValue(v: any): boolean;
/** 文字列からメールアドレスらしき部分をすべて返す */
export function findEmails(str: any): [] | RegExpMatchArray;
/** Luhn チェック（クレジットカード番号の妥当性）。13〜19桁のみ true になり得る */
export function luhnValid(digits: any): boolean;
/** 文字列から電話番号らしき部分を返す（国内10〜11桁 / +国番号11〜13桁・区切りor先頭0or+を要求） */
export function findPhones(str: any): string[];
/** 文字列からクレジットカード番号らしき部分（Luhn一致）を返す */
export function findCardNumbers(str: any): string[];
/**
 * セッションのプライバシー監査を実行する。
 * @param {object|string} session セッションJSON（オブジェクト or JSON文字列）
 * @param {{pii?:boolean, unmasked?:boolean}} [options]
 *        pii(既定true): メール/電話/カード検出 / unmasked(既定true): 未マスクinput検出
 * @returns {{ok, findings, counts, scanned}}
 *   ok: 漏れなし(true) / findings: [{kind, where, rsid, redacted}] /
 *   counts: {email, phone, card, unmaskedInput} / scanned: {nodes, events, strings}
 */
export function auditSession(session: object | string, options?: {
    pii?: boolean;
    unmasked?: boolean;
}): {
    ok: any;
    findings: any;
    counts: any;
    scanned: any;
};
