export namespace candlestick {
    export let name: string;
    export let axes: boolean;
    export let needsBand: boolean;
    export { ohlcExtent as extent };
    export function draw(ctx: any): void;
}
export namespace ohlc {
    let name_1: string;
    export { name_1 as name };
    let axes_1: boolean;
    export { axes_1 as axes };
    let needsBand_1: boolean;
    export { needsBand_1 as needsBand };
    export { ohlcExtent as extent };
    export function draw(ctx: any): void;
}
declare function ohlcExtent(s: any): {
    min: number;
    max: number;
} | null;
export {};
