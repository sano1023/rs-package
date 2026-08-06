/** 既定の宛名ラベル要素（rows: { zip, address, name, honorific? } を想定） */
export function defaultAddressElements(label: any): ({
    type: string;
    text: string;
    x: number;
    y: number;
    w: number;
    h: number;
    fontSize: number;
    visibleIf: string;
    wrap?: undefined;
    valign?: undefined;
    lineHeight?: undefined;
    bold?: undefined;
    align?: undefined;
} | {
    type: string;
    text: string;
    x: number;
    y: number;
    w: number;
    h: number;
    fontSize: number;
    wrap: boolean;
    valign: string;
    lineHeight: number;
    visibleIf?: undefined;
    bold?: undefined;
    align?: undefined;
} | {
    type: string;
    text: string;
    x: number;
    y: number;
    w: number;
    h: number;
    fontSize: number;
    bold: boolean;
    align: string;
    visibleIf?: undefined;
    wrap?: undefined;
    valign?: undefined;
    lineHeight?: undefined;
})[];
/**
 * 面付けテンプレートを生成する。
 * @param {string|object} preset プリセット名（'a4-24' 等）または寸法指定
 * @param {object} [custom]
 * @param {object[]} [custom.elements] ラベル1枚分の要素（省略時は宛名レイアウト）
 * @param {boolean}  [custom.outline=false] ラベル枠線を描く（位置合わせ試し印刷用）
 * @param {string}   [custom.paper='A4']
 * @returns {object} rs-report テンプレート
 */
export function createLabelTemplate(preset?: string | object, custom?: {
    elements?: object[] | undefined;
    outline?: boolean | undefined;
    paper?: string | undefined;
}): object;
/**
 * 面付けプリセット（A4 縦・mm）。
 * width/height はラベル1枚の実寸、margin はシートの上下左右余白、gap はラベル間隔。
 */
export const LABEL_PRESETS: {
    /** 3列×8行・70×33.9mm（宛名ラベルの定番。左右余白なし） */
    'a4-24': {
        cols: number;
        rows: number;
        width: number;
        height: number;
        marginTop: number;
        marginLeft: number;
        gapX: number;
        gapY: number;
    };
    /** 2列×6行・86.4×42.3mm */
    'a4-12': {
        cols: number;
        rows: number;
        width: number;
        height: number;
        marginTop: number;
        marginLeft: number;
        gapX: number;
        gapY: number;
    };
    /** 2列×5行・86.4×50.8mm */
    'a4-10': {
        cols: number;
        rows: number;
        width: number;
        height: number;
        marginTop: number;
        marginLeft: number;
        gapX: number;
        gapY: number;
    };
    /** 3列×7行・63.5×38.1mm（角丸ラベルの定番寸法） */
    'a4-21': {
        cols: number;
        rows: number;
        width: number;
        height: number;
        marginTop: number;
        marginLeft: number;
        gapX: number;
        gapY: number;
    };
    /** 5列×13行・38.1×21.2mm（小型・整理ラベル） */
    'a4-65': {
        cols: number;
        rows: number;
        width: number;
        height: number;
        marginTop: number;
        marginLeft: number;
        gapX: number;
        gapY: number;
    };
    /** 4列×11行・48.3×25.4mm */
    'a4-44': {
        cols: number;
        rows: number;
        width: number;
        height: number;
        marginTop: number;
        marginLeft: number;
        gapX: number;
        gapY: number;
    };
};
