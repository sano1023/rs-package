export const RsGrid: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: ArrayConstructor;
        default: () => never[];
    };
    columns: {
        type: ArrayConstructor;
        default: () => never[];
    };
    height: {
        type: NumberConstructor;
        default: undefined;
    };
    fixedColumns: {
        type: NumberConstructor;
        default: undefined;
    };
    headerGroups: {
        type: ArrayConstructor;
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("select" | "filter" | "update:modelValue" | "change" | "sort" | "rowMove" | "colMove" | "merge" | "comment" | "init")[], "select" | "filter" | "update:modelValue" | "change" | "sort" | "rowMove" | "colMove" | "merge" | "comment" | "init", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: ArrayConstructor;
        default: () => never[];
    };
    columns: {
        type: ArrayConstructor;
        default: () => never[];
    };
    height: {
        type: NumberConstructor;
        default: undefined;
    };
    fixedColumns: {
        type: NumberConstructor;
        default: undefined;
    };
    headerGroups: {
        type: ArrayConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onSelect?: ((...args: any[]) => any) | undefined;
    onFilter?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    onSort?: ((...args: any[]) => any) | undefined;
    onRowMove?: ((...args: any[]) => any) | undefined;
    onColMove?: ((...args: any[]) => any) | undefined;
    onMerge?: ((...args: any[]) => any) | undefined;
    onComment?: ((...args: any[]) => any) | undefined;
    onInit?: ((...args: any[]) => any) | undefined;
}>, {
    columns: unknown[];
    fixedColumns: number;
    headerGroups: unknown[];
    modelValue: unknown[];
    height: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsGrid;
