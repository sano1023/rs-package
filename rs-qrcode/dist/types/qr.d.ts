/**
 * QRコードを生成する。
 * @param {string} data 文字列（UTF-8でエンコード）
 * @param {object} opts { ecLevel: 'L'|'M'|'Q'|'H'（既定M）, version: 強制バージョン }
 * @returns {{ matrix: boolean[][], size, version, ecLevel, mask }}
 */
export function encodeQR(data: string, opts?: object): {
    matrix: boolean[][];
    size: any;
    version: any;
    ecLevel: any;
    mask: any;
};
export const MAX_VERSION: 10;
