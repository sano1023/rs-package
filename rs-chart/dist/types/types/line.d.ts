export namespace line {
    let name: string;
    let axes: boolean;
    function draw(ctx: any): void;
}
export namespace area {
    let name_1: string;
    export { name_1 as name };
    let axes_1: boolean;
    export { axes_1 as axes };
    export let zeroBased: boolean;
    export let stackable: boolean;
    export function draw(ctx: any): void;
}
