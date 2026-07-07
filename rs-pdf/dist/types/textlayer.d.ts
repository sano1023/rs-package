/**
 * rs-pdf テキストレイヤー
 *
 * アダプタの getTextContent() の文字矩形から、canvas の上に透明テキストの
 * span を重ねて「選択・コピー」をできるようにする（pdf.js の text layer と同方式）。
 * 各 span は実測幅を transform: scaleX() で PDF上の幅に合わせる。
 */
/**
 * container（ページの非回転座標系・position:absolute）にテキストレイヤーを構築する。
 * @param {HTMLElement} container .rsp-textlayer
 * @param {Array<{str,x,y,w,h}>} items PDFポイント・左上原点の文字矩形
 * @param {number} zoom 表示倍率（1 = 1pt/px）
 */
export function buildTextLayer(container: HTMLElement, items: Array<{
    str: any;
    x: any;
    y: any;
    w: any;
    h: any;
}>, zoom: number): void;
