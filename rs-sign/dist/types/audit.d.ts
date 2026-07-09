/** 文字列の SHA-256 を 'sha256:<hex>' 形式で返す */
export function sha256(str: any): Promise<string>;
/** 監査JSON（文字列 or オブジェクト or 省略）から AuditChain を生成する */
export function createAuditChain(json: any): AuditChain;
/**
 * 監査チェーンを全鎖検証する。各エントリの hash を再計算し、prevHash が
 * 直前の hash と一致すること・seq が 0 から連番であることを確認する。
 * 途中エントリの who/what/at/payloadHash/prevHash/hash のいずれかが書き換わると false。
 * @param {object|string|Array} audit 監査JSON（{entries} or 配列）
 * @returns {Promise<boolean>}
 */
export function verifyAudit(audit: object | string | any[]): Promise<boolean>;
/**
 * rs-sign 監査ログ（SHA-256 ハッシュチェーン）
 *
 * 各アクションを { seq, who, what, at, payloadHash, prevHash, hash } として記録し、
 *   hash = 'sha256:' + SHA-256(seq ⌇ who ⌇ what ⌇ at ⌇ payloadHash ⌇ prevHash)
 * で前後を連結する（WebCrypto crypto.subtle.digest）。verifyAudit() が全鎖を
 * 再計算・検証し、途中のアクション書換え（改ざん）を検出できる。
 *
 * 責務は「改ざん検知可能な監査証跡フォーマット」まで。否認防止（署名鍵・タイム
 * スタンプ局）は利用側サーバの責務（REQUIREMENTS §2・§8）。
 *
 * DOM 非依存。ブラウザでは globalThis.crypto（localhost も secure context）、
 * node 単体テストでは node:crypto の webcrypto を使う。
 */
export const AUDIT_JSON_VERSION: 1;
/** 連結の起点（先頭エントリの prevHash） */
export const GENESIS_HASH: string;
/**
 * 追記専用の監査チェーン。append は crypto が非同期なため直列化して順序を保証する。
 */
export class AuditChain {
    /** @param {Array} entries 既存エントリ（load 時） */
    constructor(entries?: any[]);
    entries: any[];
    _tail: Promise<void>;
    /** 末尾ハッシュ（無ければ GENESIS） */
    get lastHash(): any;
    get length(): number;
    /**
     * アクションを1件追記する。
     * @param {{who?, what, at?, payload?}} action
     * @returns {Promise<object>} 追記されたエントリ
     */
    append(action: {
        who?: any;
        what: any;
        at?: any;
        payload?: any;
    }): Promise<object>;
    /** 進行中の append がすべて解決してから resolve する */
    flush(): Promise<void>;
    /** 監査JSON（version 付き） */
    toJSON(): {
        version: number;
        genesis: string;
        entries: any[];
    };
}
