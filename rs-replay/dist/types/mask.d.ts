/** 追加セレクタを既定にマージした最終セレクタを返す */
export function buildMaskSelector(extra: any): string;
/** 文字列を「文字数・空白の形だけ残した伏字」にする */
export function maskChars(str: any): string;
/** 要素がマスク対象ツリー内にあるか（自身か祖先がセレクタに一致） */
export function inMaskedTree(el: any, maskSelector?: string): boolean;
/** 文字数すら残さず固定長で隠す対象か（password / hidden / マスク対象内） */
export function isHardMasked(el: any, maskSelector?: string): boolean;
/** フォーム要素の現在値を「マスク済み文字列」として読む。生値は決して返さない */
export function readMaskedValue(el: any, maskSelector?: string): string;
/**
 * マスク済みリーダーを作る。Recorder / Serializer はこの reader 経由でのみ
 * テキスト・値・属性を読む（生値を返すメソッドは存在しない）。
 * @param {string} [extraSelector] 既定に「追加」するマスクセレクタ
 */
export function createMaskReader(extraSelector?: string): {
    selector: string;
    /** 要素がマスク対象ツリー内か */
    masked(el: any): boolean;
    /** input / textarea の値（常にマスク済み） */
    value(el: any): string;
    /** select の選択状態。マスク対象なら -1（選択内容を残さない） */
    select(el: any): number;
    /** テキストノードの内容。マスク対象内・textarea配下は伏字 */
    text(node: any): string;
    /** 属性値。value属性とマスク対象内のPII属性を伏字化する */
    attr(el: any, name: any, raw: any): any;
};
/**
 * rs-replay マスキング層
 *
 * 【安全設計の中核】「生値がシリアライズ層に到達しない」ことを構造で保証する。
 * Recorder / Serializer は DOMの生値（input.value・Text.data・value属性）を直接読まず、
 * 必ず createMaskReader() が返す reader を経由する。reader のすべてのメソッドは
 * 「マスク済みの値」しか返さないため、シリアライザやイベントバッファに生値が
 * 混入する経路がそもそも存在しない（rs-livecam の「生映像が外に出る配線を
 * 構造的に持たない」フェイルセーフと同じ思想）。
 *
 * マスク規則（既定）:
 * - input / textarea の値      → 文字数を保った伏字（●）。空白は形を残す
 * - password / hidden          → 文字数すら残さない固定長 `●●●`
 * - [data-rs-mask] / .rs-mask  → 配下のテキスト・値・主要属性をすべて伏字（値は固定長）
 * - select                     → 既定では selectedIndex のみ記録（マスク対象内なら -1）
 * - checkbox / radio           → checked の真偽のみ（value属性は伏字）
 */
export const MASK_CHAR: "\u25CF";
export const MASK_FIXED: "\u25CF\u25CF\u25CF";
export const DEFAULT_MASK_SELECTOR: "[data-rs-mask], .rs-mask";
/** マスク対象内の画像は透明1pxに差し替える（壊れ画像のエラーも出さない） */
export const BLANK_IMAGE: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
