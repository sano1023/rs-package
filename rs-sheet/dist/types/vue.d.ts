export const RsSheet: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    data: {
        type: ArrayConstructor;
        default: undefined;
    };
    cells: {
        type: ObjectConstructor;
        default: undefined;
    };
    rows: {
        type: NumberConstructor;
        default: undefined;
    };
    cols: {
        type: NumberConstructor;
        default: undefined;
    };
    sheetName: {
        type: StringConstructor;
        default: undefined;
    };
    formats: {
        type: ObjectConstructor;
        default: undefined;
    };
    columnWidths: {
        type: ObjectConstructor;
        default: undefined;
    };
    rowHeights: {
        type: ObjectConstructor;
        default: undefined;
    };
    sheets: {
        type: ArrayConstructor;
        default: undefined;
    };
    namedRanges: {
        type: ObjectConstructor;
        default: undefined;
    };
    height: {
        type: NumberConstructor;
        default: undefined;
    };
    defaultColWidth: {
        type: NumberConstructor;
        default: undefined;
    };
    defaultRowHeight: {
        type: NumberConstructor;
        default: undefined;
    };
    headerWidth: {
        type: NumberConstructor;
        default: undefined;
    };
    headerHeight: {
        type: NumberConstructor;
        default: undefined;
    };
    readOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "selectionChange" | "ops" | "sheetChange" | "init")[], "change" | "selectionChange" | "ops" | "sheetChange" | "init", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    data: {
        type: ArrayConstructor;
        default: undefined;
    };
    cells: {
        type: ObjectConstructor;
        default: undefined;
    };
    rows: {
        type: NumberConstructor;
        default: undefined;
    };
    cols: {
        type: NumberConstructor;
        default: undefined;
    };
    sheetName: {
        type: StringConstructor;
        default: undefined;
    };
    formats: {
        type: ObjectConstructor;
        default: undefined;
    };
    columnWidths: {
        type: ObjectConstructor;
        default: undefined;
    };
    rowHeights: {
        type: ObjectConstructor;
        default: undefined;
    };
    sheets: {
        type: ArrayConstructor;
        default: undefined;
    };
    namedRanges: {
        type: ObjectConstructor;
        default: undefined;
    };
    height: {
        type: NumberConstructor;
        default: undefined;
    };
    defaultColWidth: {
        type: NumberConstructor;
        default: undefined;
    };
    defaultRowHeight: {
        type: NumberConstructor;
        default: undefined;
    };
    headerWidth: {
        type: NumberConstructor;
        default: undefined;
    };
    headerHeight: {
        type: NumberConstructor;
        default: undefined;
    };
    readOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    onSelectionChange?: ((...args: any[]) => any) | undefined;
    onOps?: ((...args: any[]) => any) | undefined;
    onSheetChange?: ((...args: any[]) => any) | undefined;
    onInit?: ((...args: any[]) => any) | undefined;
}>, {
    cells: Record<string, any>;
    data: unknown[];
    readOnly: boolean;
    headerHeight: number;
    headerWidth: number;
    rows: number;
    cols: number;
    sheetName: string;
    formats: Record<string, any>;
    columnWidths: Record<string, any>;
    rowHeights: Record<string, any>;
    sheets: unknown[];
    namedRanges: Record<string, any>;
    height: number;
    defaultColWidth: number;
    defaultRowHeight: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsSheet;
