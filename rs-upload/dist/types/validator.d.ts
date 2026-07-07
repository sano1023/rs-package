/**
 * accept 指定（配列 or カンマ区切り文字列）を正規化する。
 * 受け付ける形式: 'image/jpeg'（完全一致）・'image/*'（前方一致）・'.png'（拡張子）
 */
export function normalizeAccept(accept: any): string[] | null;
/**
 * ファイルが accept 指定に合致するか。
 * @param {string[]} entries normalizeAccept 済みの配列
 * @param {{name: string, type: string}} file
 * @param {string|null} sniffed マジックバイトで実測した MIME（あれば宣言より優先）
 */
export function matchAccept(entries: string[], file: {
    name: string;
    type: string;
}, sniffed?: string | null): boolean;
/** ブラウザ既定の画像実測（createImageBitmap）。デコード不能は null（=検査スキップ） */
export function defaultMeasureImage(file: any): Promise<{
    width: number;
    height: number;
} | null>;
/**
 * ファイル群を検証して受理/拒否に振り分ける。
 * @param {File[]} files 投入されたファイル
 * @param {object} options { accept, maxSize, maxFiles, minImageSize, magicCheck = true, measureImage }
 * @param {object} texts resolveTexts() 済みの文言テーブル
 * @param {number} existingCount すでにキューにある（キャンセル以外の）件数。maxFiles の残枠計算に使う
 * @returns {Promise<{ accepted: File[], rejected: {file, reason, message}[] }>}
 *   reason: 'magic' | 'accept' | 'maxSize' | 'maxFiles' | 'minImageSize'
 */
export function validateFiles(files: File[], options?: object, texts?: object, existingCount?: number): Promise<{
    accepted: File[];
    rejected: {
        file: any;
        reason: any;
        message: any;
    }[];
}>;
