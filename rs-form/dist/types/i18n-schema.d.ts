/**
 * 値が多言語マップ（`{ ja: '...', en: '...' }`）かどうか。
 * plain object（配列でない）で、キーが1つ以上あり、全ての値が文字列のときだけ多言語とみなす。
 * これにより `{ value, text }`（value が非文字列）や普通のオブジェクトは誤判定しない。
 */
export function isLocalized(v: any): boolean;
/**
 * 多言語フィールドを1つの文字列に解決する。
 * - 単なる文字列（や数値・undefined）はそのまま返す（後方互換）
 * - `{ ja, en }` なら locale の値 → fallbackLocale の値 → 最初に見つかった文字列、の順で返す
 * @param {*} field 文字列 or 多言語マップ
 * @param {string} locale 目標ロケール
 * @param {string} [fallbackLocale] 目標が無いとき使うロケール
 */
export function resolveText(field: any, locale: string, fallbackLocale?: string): any;
/**
 * スキーマ内の全テキスト系フィールドに fn を適用した新しいスキーマ（deep clone）を返す。
 * resolveSchemaLocale と schemaLocales はどちらもこの1つの走査を共有する（走査位置の一元管理）。
 * @param {object} schema
 * @param {(v:*)=>*} fn テキスト系フィールドの値を受け取り、置き換え値を返す
 */
export function mapTextFields(schema: object, fn: (v: any) => any): any;
/**
 * スキーマを指定ロケールへ畳み込む。多言語フィールドは locale の文字列に置換され、
 * 単一文字列ラベルはそのまま。結果は従来どおりの素のJSONで、createRSForm にそのまま渡せる。
 * @param {object} schema
 * @param {string} locale
 * @param {object} [options] { fallbackLocale }
 */
export function resolveSchemaLocale(schema: object, locale: string, options?: object): any;
/**
 * スキーマ内の多言語フィールドに現れる全ロケールコードを収集して返す（言語切替UIの構築に使える）。
 * テキスト系フィールドの位置だけを見るので `{ value, text }` の value 等を誤ってロケール扱いしない。
 * @returns {string[]} ソート済みのロケールコード配列
 */
export function schemaLocales(schema: any): string[];
/**
 * rs-form 多言語スキーマ（v0.5）— label 等を `{ ja, en }` 形式で持てるようにする後方互換拡張
 *
 * すべて DOM 非依存の純粋関数。スキーマ（素のJSON）を「locale を1つ選んだ素のJSON」へ畳み込むだけで、
 * FormModel / レンダラ / 各質問タイプは一切変更しない（畳み込み後は従来どおりの文字列ラベルになる）。
 *
 *   import { resolveSchemaLocale } from 'rs-form/i18n';
 *   const jaSchema = resolveSchemaLocale(schema, 'ja', { fallbackLocale: 'ja' });
 *
 * 後方互換: label が単なる文字列なら resolveText はそのまま返す。既存スキーマは何も変わらない。
 */
/** 畳み込む「テキスト系」フィールド（値/選択肢の value は対象外） */
export const SCHEMA_TEXT_KEYS: string[];
export const QUESTION_TEXT_KEYS: string[];
