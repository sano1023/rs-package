/**
 * mm → CSS px
 * @param {number} mm
 * @returns {number}
 */
export function mmToPx(mm: number): number;
/**
 * CSS px → mm
 * @param {number} px
 * @returns {number}
 */
export function pxToMm(px: number): number;
/**
 * mm → pt（フォントサイズ換算用）
 * @param {number} mm
 * @returns {number}
 */
export function mmToPt(mm: number): number;
/**
 * pt → mm
 * @param {number} pt
 * @returns {number}
 */
export function ptToMm(pt: number): number;
/**
 * 浮動小数の誤差を帳票実務で意味のある桁（既定 1/1000 mm）に丸める。
 * mm の累積加算で 0.30000000000000004 のような値が座標に出るのを避ける。
 * @param {number} value
 * @param {number} [digits=3]
 * @returns {number}
 */
export function roundMm(value: number, digits?: number): number;
/**
 * 用紙指定を mm の {width,height} に解決する。
 * @param {string|{width:number,height:number}} [paper='A4'] 用紙名 or 実寸
 * @param {'portrait'|'landscape'} [orientation='portrait']
 * @returns {{ width: number, height: number, name: string, orientation: string }}
 */
export function resolvePaper(paper?: string | {
    width: number;
    height: number;
}, orientation?: "portrait" | "landscape"): {
    width: number;
    height: number;
    name: string;
    orientation: string;
};
/**
 * 余白指定（数値 / 一部指定オブジェクト / [t,r,b,l]）を四辺の mm に正規化する。
 * @param {number|number[]|{top?:number,right?:number,bottom?:number,left?:number}} [margin=10]
 * @returns {{ top: number, right: number, bottom: number, left: number }}
 */
export function resolveMargin(margin?: number | number[] | {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
}): {
    top: number;
    right: number;
    bottom: number;
    left: number;
};
/**
 * 用紙と余白から印字領域（mm）を求める。
 * @param {{width:number,height:number}} paper
 * @param {{top:number,right:number,bottom:number,left:number}} margin
 * @returns {{ x: number, y: number, width: number, height: number }}
 */
export function contentBox(paper: {
    width: number;
    height: number;
}, margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
}): {
    x: number;
    y: number;
    width: number;
    height: number;
};
/**
 * rs-report 単位・用紙サイズ
 *
 * 帳票は mm が正。CSS も mm をそのまま書けば実寸で印刷されるため、内部計算・出力ともに mm で持ち、
 * px/pt への変換は「画面プレビューのズーム計算」「フォントサイズ指定」のためだけに使う。
 *
 * 変換の基準:
 *   1in = 25.4mm = 96 CSS px = 72 pt
 */
/** 1インチのミリメートル */
export const MM_PER_INCH: 25.4;
/** 1インチの CSS ピクセル（CSS 仕様の参照ピクセル） */
export const PX_PER_INCH: 96;
/** 1インチのポイント */
export const PT_PER_INCH: 72;
/**
 * JIS/ISO の代表的な用紙サイズ（mm・縦置き時の width × height）。
 * 郵便はがき・長形3号封筒など、日本の帳票で実際に印刷対象になるものを含む。
 */
export const PAPER_SIZES: {
    A3: {
        width: number;
        height: number;
    };
    A4: {
        width: number;
        height: number;
    };
    A5: {
        width: number;
        height: number;
    };
    A6: {
        width: number;
        height: number;
    };
    B4: {
        width: number;
        height: number;
    };
    B5: {
        width: number;
        height: number;
    };
    B6: {
        width: number;
        height: number;
    };
    postcard: {
        width: number;
        height: number;
    };
    'envelope-naga3': {
        width: number;
        height: number;
    };
    'envelope-kaku2': {
        width: number;
        height: number;
    };
    letter: {
        width: number;
        height: number;
    };
    legal: {
        width: number;
        height: number;
    };
    tabloid: {
        width: number;
        height: number;
    };
};
