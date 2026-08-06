/**
 * 1件のスコア（0 = 不一致）。
 * @param {{ label: string, kana?: string, keywords?: string[] }} item
 * @param {string} query
 * @param {Map<string, number>} [recency] id → 直近使用の序数（大きいほど最近）
 * @returns {number}
 */
export function scoreItem(item: {
    label: string;
    kana?: string;
    keywords?: string[];
}, query: string, recencyBoost?: number): number;
/**
 * コマンド一覧を検索して順位付けする。
 * @param {Array<object>} items
 * @param {string} query
 * @param {string[]} [recentIds] 最近実行した id（新しい順）
 * @returns {Array<object>} スコア降順（同点は元順）
 */
export function rankItems(items: Array<object>, query: string, recentIds?: string[]): Array<object>;
import { matches } from './match.js';
import { normalizeForSearch } from './match.js';
import { romajiToHiragana } from './match.js';
export { matches, normalizeForSearch, romajiToHiragana };
