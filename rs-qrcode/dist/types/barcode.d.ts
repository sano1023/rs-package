export function code128Patterns(): string[];
/** CODE128 の値列（テスト検証用に公開） */
export function code128Values(data: any): number[];
export function eanCheckDigit(digits12: any): number;
/**
 * バーコードを生成する。
 * @param {string} data
 * @param {object} opts { type: 'code128'（既定） | 'ean13' }
 * @returns {{ modules: (0|1)[], text, type }}
 */
export function encodeBarcode(data: string, opts?: object): {
    modules: (0 | 1)[];
    text: any;
    type: any;
};
