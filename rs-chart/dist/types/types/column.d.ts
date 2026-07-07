export namespace column {
    let name: string;
    let axes: boolean;
    let needsBand: boolean;
    let zeroBased: boolean;
    let stackable: boolean;
    function draw(ctx: any): void;
}
export namespace bar {
    let name_1: string;
    export { name_1 as name };
    let axes_1: boolean;
    export { axes_1 as axes };
    let needsBand_1: boolean;
    export { needsBand_1 as needsBand };
    let zeroBased_1: boolean;
    export { zeroBased_1 as zeroBased };
    export let horizontal: boolean;
    export function draw(ctx: any): void;
}
