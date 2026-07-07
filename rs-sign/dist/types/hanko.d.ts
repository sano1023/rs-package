/**
 * 電子印鑑ジェネレータを生成する。
 * @param {object} options { dpi = 350, font?, color?, stamps? }
 */
export function createRSHanko(options?: object): Hanko;
export class Hanko {
    /**
     * @param {object} options { dpi?, font?, color?, stamps? }
     */
    constructor(options?: object);
    options: {
        dpi: number;
    };
    registry: Map<any, any>;
    fontFamily: string;
    /** スタンプ定義を追加登録する（defineStamp() の結果） */
    use(stampDef: any): this;
    /** 登録済みスタンプの一覧 */
    stampNames(): any[];
    _resolve(type: any): any;
    /** 描画コンテキストを組み立てて stamp.draw を呼ぶ内部共通処理 */
    _prepare(opts?: {}): {
        stamp: any;
        ctx: {
            sizePx: number;
            sizeMm: number;
            dpi: any;
            mm2px: (mm: any) => number;
            text: any;
            color: any;
            font: string;
            rng: () => number;
            opts: any;
        };
    };
    /**
     * 印面を canvas に描画して返す。
     * @param {object} opts { type: 'mitome'|'kaku'|'data'|独自名, name, sizeMm, ... }
     * @returns {HTMLCanvasElement}
     */
    render(opts?: object): HTMLCanvasElement;
    /** PNG（透過）dataURL を返す */
    toPNG(opts?: {}): string;
    /**
     * SVG 文字列を返す。スタンプが svg(ctx) を実装していればベクタSVG、
     * 無ければ PNG を埋め込んだSVGにフォールバックする。
     */
    toSVG(opts?: {}): any;
}
