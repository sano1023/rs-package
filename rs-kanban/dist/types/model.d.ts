/**
 * 列の正規化。
 * @param {object|string} input { id, title, wip?, color?, collapsed? } または title 文字列
 */
export function normalizeColumn(input: object | string): {
    id: string;
    title: string;
    wip: number | null;
    color: any;
    collapsed: boolean;
};
/**
 * カードの正規化。
 * @param {object|string} input { id, title, columnId, lane?, color?, tags?, assignee?, due?, description? }
 */
export function normalizeCard(input: object | string, fallbackColumnId: any): {
    id: string;
    title: string;
    columnId: any;
    lane: string | null;
    color: any;
    tags: string[];
    assignee: string;
    due: string;
    description: string;
    meta: {};
};
/**
 * ボードの正規化。
 * @param {{ columns: any[], cards?: any[], lanes?: any[] }} input
 * @returns {{ columns: object[], cards: object[], lanes: string[] }}
 */
export function normalizeBoard(input?: {
    columns: any[];
    cards?: any[];
    lanes?: any[];
}): {
    columns: object[];
    cards: object[];
    lanes: string[];
};
/** 指定列（+レーン）のカード（ボード配列の順を保つ） */
export function cardsIn(board: any, columnId: any, lane?: undefined): any;
/**
 * WIP 制限の判定。列に card を1枚足せるか。
 * @returns {{ ok: boolean, count: number, wip: number|null }}
 */
export function checkWip(board: any, columnId: any): {
    ok: boolean;
    count: number;
    wip: number | null;
};
/**
 * カードを移動する（列間・列内並べ替え兼用）。
 * @param {object} board
 * @param {string} cardId
 * @param {string} toColumnId
 * @param {number} toIndex その列（+レーン）内での挿入位置
 * @param {string|null} [toLane] 移動先レーン（undefined = 変更しない）
 * @param {{ enforceWip?: boolean }} [options]
 * @returns {{ board: object, moved: boolean, reason?: string }} 新しいボード（移動不可なら元のまま）
 */
export function moveCard(board: object, cardId: string, toColumnId: string, toIndex: number, toLane?: string | null, options?: {
    enforceWip?: boolean;
}): {
    board: object;
    moved: boolean;
    reason?: string;
};
/**
 * テキスト・タグ・担当者でカードを絞り込む（表示用の id 集合を返す）。
 * @param {object} board
 * @param {{ text?: string, tag?: string, assignee?: string }} filter
 * @returns {Set<string>|null} null = フィルタなし（全件表示）
 */
export function filterCards(board: object, filter?: {
    text?: string;
    tag?: string;
    assignee?: string;
}): Set<string> | null;
/** 列ごとの集計（件数・WIP 超過） */
export function columnStats(board: any): any;
