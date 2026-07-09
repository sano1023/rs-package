/** 順序モードを正規化する（既定 = parallel。v0.2 の「誰でも順不同」を保つ） */
export function normalizeMode(mode: any): "serial" | "parallel";
/**
 * 署名者順序を正規化する。既知IDのみ・重複除去し、order に欠けた署名者は
 * signerIds の並び順で末尾に補完する（順序未指定でも全員が現れる）。
 * @param {Array<string>} order
 * @param {Array<string>} signerIds signers から取り出したID配列
 * @returns {Array<string>}
 */
export function normalizeOrder(order: Array<string>, signerIds: Array<string>): Array<string>;
/** 署名者が必須フィールドを充足し終えたか（remaining === 0。担当0件も true） */
export function signerDone(fields: any, signerId: any): boolean;
/**
 * その署名者が「今」フィールドを充足してよいか（手番判定）。
 * - parallel: 常に true（同時充足可）
 * - serial: order 上で自分より前の署名者が全員 done のときだけ true
 * order に含まれない署名者・null（誰でも）は制約なしで true。
 * @returns {boolean}
 */
export function canSignerAct(order: any, mode: any, fields: any, signerId: any): boolean;
/** 今アクション可能な署名者の一覧（未完了かつ手番） */
export function activeSigners(order: any, mode: any, fields: any): any;
/**
 * 有効期限切れか。deadline 未設定なら常に false。
 * @param {string|number|Date|null} deadline ISO文字列 / epoch ms / Date
 * @param {number} now 比較時刻（既定 = 現在の epoch ms）。テストで固定できる
 * @returns {boolean}
 */
export function isExpired(deadline: string | number | Date | null, now?: number): boolean;
/** 差し戻し/辞退情報を正規化する（{ who, reason, at }） */
export function normalizeDecline(d: any): {
    who: string | null;
    reason: string;
    at: any;
} | null;
/**
 * 文書全体の実効状態を解決する（純粋・優先度順）。
 *   declined（辞退中）> completed（完成）> expired（期限切れ）> baseState
 * @returns {'draft'|'signing'|'completed'|'declined'|'expired'}
 */
export function resolveState({ baseState, declined, deadline, now }?: {}): "draft" | "signing" | "completed" | "declined" | "expired";
/**
 * ワークフローの集約ステータス（デモ・テスト・進捗表示向けの読み取り専用ビュー）。
 * @returns {{mode, order, expired, deadline, declined, state, active,
 *            signers: [{id, index, total, filled, remaining, done, active, blocked}]}}
 */
export function workflowStatus({ signers, order, mode, fields, declined, deadline, now, state }?: {}): {
    mode: any;
    order: any;
    expired: any;
    deadline: any;
    declined: any;
    state: any;
    active: any;
    signers: [{
        id: any;
        index: any;
        total: any;
        filled: any;
        remaining: any;
        done: any;
        active: any;
        blocked: any;
    }];
};
/** 順序モード（直列 = 前の署名者が終わるまで次は充足不可 / 並列 = 同時に充足可） */
export const ORDER_MODES: string[];
