/**
 * ImageData から1Dバーコードを読む。
 * 中央付近の複数ラインをサンプリングし、両方向で試行する。
 * @returns {{ text, format } | null}
 */
export function decode1D(imageData: any, { formats }?: {
    formats?: string[] | undefined;
}): {
    text: any;
    format: any;
} | null;
