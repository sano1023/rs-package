/**
 * rs-qrcode を注入して 'qrcode' / 'barcode' 要素タイプを登録する。
 *
 * qrcode: { type: 'qrcode', value|field|text, ecc?, quietZone?, dark?, light? }
 * barcode: { type: 'barcode', value|field|text, symbology?('CODE128'|'EAN13'), showText?, barColor? }
 *
 * @param {{ createRSQR: Function, createRSBarcode: Function }} qrModule rs-qrcode のモジュール
 */
export function registerQRElements(qrModule: {
    createRSQR: Function;
    createRSBarcode: Function;
}): void;
/**
 * rs-sign を注入して 'seal'（電子印鑑）要素タイプを登録する。
 *
 * { type: 'seal', name|field|value, seal?('mitome'|'kaku'|'data'|登録名), size?, color?, hanko? }
 * 印影は PNG dataURL（canvas 描画）なのでブラウザ環境専用。
 *
 * @param {{ createRSHanko: Function }} signModule rs-sign のモジュール
 */
export function registerSealElement(signModule: {
    createRSHanko: Function;
}): void;
/**
 * rs-chart を注入して 'chart' 要素タイプを登録する（帳票内ミニチャート）。
 * SVG レンダラで描いた <svg> をそのまま埋め込む。
 *
 * { type: 'chart', chart: { type: 'bar', series: [...] } }  … series の data に式は使えない（生データ）
 *
 * @param {{ createRSChart: Function }} chartModule rs-chart のモジュール
 */
export function registerChartElement(chartModule: {
    createRSChart: Function;
}): void;
