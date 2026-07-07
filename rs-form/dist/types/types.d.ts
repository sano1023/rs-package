export namespace text {
    let name: string;
    let defaults: {};
    function render(ctx: any): any;
}
export namespace textarea {
    let name_1: string;
    export { name_1 as name };
    export namespace defaults_1 {
        let rows: number;
    }
    export { defaults_1 as defaults };
    export function render(ctx: any): any;
}
export namespace number {
    let name_2: string;
    export { name_2 as name };
    let defaults_2: {};
    export { defaults_2 as defaults };
    export function render(ctx: any): any;
}
export namespace email {
    let name_3: string;
    export { name_3 as name };
    let defaults_3: {};
    export { defaults_3 as defaults };
    export function render(ctx: any): any;
}
export namespace tel {
    let name_4: string;
    export { name_4 as name };
    let defaults_4: {};
    export { defaults_4 as defaults };
    export function render(ctx: any): any;
}
export namespace postal {
    let name_5: string;
    export { name_5 as name };
    export namespace defaults_5 {
        let placeholder: string;
    }
    export { defaults_5 as defaults };
    export function render(ctx: any): any;
}
export namespace date {
    let name_6: string;
    export { name_6 as name };
    let defaults_6: {};
    export { defaults_6 as defaults };
    export function render(ctx: any): any;
}
export namespace radio {
    let name_7: string;
    export { name_7 as name };
    let defaults_7: {};
    export { defaults_7 as defaults };
    export let group: boolean;
    export function render(ctx: any): any;
}
export namespace checkbox {
    let name_8: string;
    export { name_8 as name };
    let defaults_8: {};
    export { defaults_8 as defaults };
    let group_1: boolean;
    export { group_1 as group };
    export function render(ctx: any): any;
}
export namespace select {
    let name_9: string;
    export { name_9 as name };
    export namespace defaults_9 {
        let placeholder_1: string;
        export { placeholder_1 as placeholder };
    }
    export { defaults_9 as defaults };
    export function render(ctx: any): any;
}
export namespace rating {
    let name_10: string;
    export { name_10 as name };
    export namespace defaults_10 {
        let max: number;
    }
    export { defaults_10 as defaults };
    let group_2: boolean;
    export { group_2 as group };
    export function render(ctx: any): any;
}
export namespace nps {
    let name_11: string;
    export { name_11 as name };
    export namespace defaults_11 {
        let minLabel: string;
        let maxLabel: string;
    }
    export { defaults_11 as defaults };
    let group_3: boolean;
    export { group_3 as group };
    export function render(ctx: any): any;
}
/** 組み込み12タイプ */
export const builtinTypes: {
    name: string;
    defaults: {};
    render(ctx: any): any;
}[];
