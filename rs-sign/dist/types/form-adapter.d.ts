/**
 * rs-form の options.signaturePad に渡すアダプタ関数を作る。
 * @param {object} padOptions createRSSignPad に渡すオプション（penColor / minWidth / maxWidth / pressure ...）
 *   ＋ png?: toPNG のオプション（{scale, background}）/ clearText? / undoText?
 * @returns {(canvas: HTMLCanvasElement, api: object) => { destroy: Function }}
 */
export function rsSignaturePad(padOptions?: object): (canvas: HTMLCanvasElement, api: object) => {
    destroy: Function;
};
/**
 * rs-form の signature 質問の canvas を rs-sign パッドで置き換える（低レベルAPI）。
 * @param {HTMLCanvasElement} canvas rs-form が用意した canvas
 * @param {{q?:object, setValue:Function, clear?:Function}} api rs-form のアダプタAPI
 * @param {object} padOptions
 * @returns {{ pad: object, destroy: Function }}
 */
export function mountFormSignPad(canvas: HTMLCanvasElement, api: {
    q?: object;
    setValue: Function;
    clear?: Function;
}, padOptions?: object): {
    pad: object;
    destroy: Function;
};
