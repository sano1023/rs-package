/**
 * rs-form 日本語テキスト正規化（DOM非依存の純粋関数群）
 *
 * blur 時の「正規化 → 検証」パイプラインで使う変換表を自前で持つ。
 * Intl / 外部ライブラリへの依存なし。
 */
/** 全角英数字・全角記号 → 半角（Ａ→A・１→1・＠→@ など。全角スペースも半角へ） */
export function toHankakuAlnum(s: any): string;
/** 半角英数字・半角記号 → 全角（A→Ａ・1→１ など。半角スペースは全角スペースへ） */
export function toZenkakuAlnum(s: any): string;
/** 全角数字だけを半角へ（数値・電話番号・郵便番号入力用） */
export function toHankakuDigits(s: any): string;
/** 半角カナ → 全角カナ（ｶﾞ→ガ・ﾊﾟ→パ の濁点/半濁点合成込み） */
export function hankakuKanaToZenkaku(s: any): string;
/** ひらがな → カタカナ（ー・記号はそのまま） */
export function hiraganaToKatakana(s: any): string;
/** カタカナ → ひらがな（ヴ等ひらがなに対応が無い文字とーはそのまま） */
export function katakanaToHiragana(s: any): string;
/**
 * ハイフン類の揺れを ASCII の '-' に統一する（郵便番号・電話番号用）。
 * 対象: 長音ー・全角マイナス−・ハイフン‐・ノーブレークハイフン‑・二分ダッシュ–・全角ダッシュ—・
 *       水平線―・全角ハイフンマイナス－・半角長音ｰ・〜・~
 * ※ かな氏名など長音が意味を持つ欄では使わないこと。
 */
export function normalizeHyphens(s: any): string;
/**
 * 郵便番号の正規化: 「１２３−４５６７」「1234567」→「123-4567」。
 * 7桁に満たない/超える場合は数字・ハイフンだけ整えて返す（検証は validators 側）。
 */
export function normalizePostal(s: any): string;
/**
 * 電話番号の正規化: 全角→半角・括弧をハイフンへ・ハイフン揺れ統一・連続/端のハイフン整理。
 * 「03（1234）5678」→「03-1234-5678」、「0312345678」はそのまま数字列で返す。
 */
export function normalizeTel(s: any): string;
/**
 * charset 指定に応じた自動変換。
 *   hiragana: 半角カナ→全角→ひらがな
 *   katakana: 半角カナ→全角・ひらがな→カタカナ
 *   zenkaku : 半角カナ→全角カナ・半角英数→全角英数
 *   hankaku : 全角英数→半角英数
 *   alnum   : 全角英数→半角英数
 */
export function applyCharset(s: any, charset: any): string;
/** charset 制約を満たすか（applyCharset 後の値を渡すこと） */
export function matchesCharset(s: any, charset: any): any;
/** ISO日付文字列（YYYY-MM-DD）→ 和暦表示（例: 令和8年7月7日）。範囲外・不正は '' */
export function toWareki(iso: any): string;
export namespace CHARSET_LABELS {
    let hiragana: string;
    let katakana: string;
    let zenkaku: string;
    let hankaku: string;
    let alnum: string;
}
