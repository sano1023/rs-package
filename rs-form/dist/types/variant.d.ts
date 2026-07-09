/**
 * rs-form A/Bバリアント（v0.5）— 同一スキーマから決定的にバリアントを割り当て、質問を振り分ける
 *
 * すべて DOM 非依存の純粋関数。バリアント割当はシード（利用者ID・セッションID等）から決定的に決まるので、
 * 同じシードなら常に同じバリアントになり、サーバ側で計測した割当と一致させられる。
 *
 * スキーマ側のバリアント指定は2通り（併用可）:
 *   - 質問/ページに `variant: 'A'`（または `variant: ['A','B']`）を付ける → 割当バリアントに合う質問だけ残す
 *   - 質問に `variants: { A: { label: '今すぐ申し込む' }, B: { label: '無料で始める' } }` → 割当バリアントの上書きを適用
 * どちらのタグも無い質問は全バリアント共通で常に表示される。
 *
 *   import { pickVariantSchema } from 'rs-form/variant';
 *   const { variant, schema: applied } = pickVariantSchema(schema, userId);
 */
/**
 * 文字列 → 32bit 符号なし整数ハッシュ（FNV-1a）。決定的で外部依存なし。
 */
export function hashSeed(seed: any): number;
/** バリアント指定（配列 or オブジェクト）を [{ name, weight }] に正規化する */
export function normalizeVariants(variants: any): {
    name: string;
    weight: any;
}[];
/**
 * シードからバリアントを1つ決定的に割り当てる（重み付き）。
 * @param {*} seed 任意のシード（利用者ID等）。文字列化してハッシュする
 * @param {string[]|object|Array} variants 候補（['A','B'] / { A:{weight:2}, B:{} } など）
 * @returns {string|null} 割り当てられたバリアント名
 */
export function assignVariant(seed: any, variants: string[] | object | any[]): string | null;
/** タグ（string / 配列 / undefined）が割当バリアントに一致するか。未指定は全バリアント共通 */
export function variantMatches(tag: any, variant: any): boolean;
/**
 * スキーマに現れるバリアント名を収集する（`variant` タグと `variants` の上書きキーの両方）。
 * @returns {string[]} ソート済み
 */
export function collectVariants(schema: any): string[];
/**
 * 割り当てられたバリアント向けの具体スキーマ（deep clone）を返す。
 * - `variant` タグが割当に一致しない質問/ページを除外
 * - `variants[variant]` の上書きを適用
 * バリアント関連のメタ（variant / variants）は取り除くので、結果は素のスキーマ。
 * @param {object} schema
 * @param {string} variant 割り当てられたバリアント名
 */
export function applyVariant(schema: object, variant: string): any;
/**
 * シードからバリアントを割り当て、その具体スキーマを返すワンショット。
 * @param {object} schema
 * @param {*} seed シード（利用者ID等）
 * @param {object} [options] { variants } 候補を明示（省略時はスキーマから収集・無ければ ['A','B']）
 * @returns {{ variant: string|null, schema: object }}
 */
export function pickVariantSchema(schema: object, seed: any, options?: object): {
    variant: string | null;
    schema: object;
};
