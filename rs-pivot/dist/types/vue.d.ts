export const RsPivot: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: ObjectConstructor;
        default: undefined;
    };
    data: {
        type: ArrayConstructor;
        default: undefined;
    };
    format: {
        type: ObjectConstructor;
        default: undefined;
    };
    aggregations: {
        type: ArrayConstructor;
        default: undefined;
    };
    calculatedFields: {
        type: ArrayConstructor;
        default: undefined;
    };
    cellRenderer: {
        type: FunctionConstructor;
        default: undefined;
    };
    fiscalYear: {
        type: BooleanConstructor;
        default: undefined;
    };
    subtotals: {
        type: BooleanConstructor;
        default: undefined;
    };
    grandTotals: {
        type: BooleanConstructor;
        default: undefined;
    };
    fieldPanel: {
        type: BooleanConstructor;
        default: undefined;
    };
    detailModal: {
        type: BooleanConstructor;
        default: undefined;
    };
    reportTemplates: {
        type: BooleanConstructor;
        default: undefined;
    };
    maxCells: {
        type: NumberConstructor;
        default: undefined;
    };
    drillThrough: {
        type: ObjectConstructor;
        default: undefined;
    };
    worker: {
        type: BooleanConstructor;
        default: undefined;
    };
    templates: {
        type: ArrayConstructor;
        default: undefined;
    };
    templatesKey: {
        type: StringConstructor;
        default: undefined;
    };
    templateStorage: {
        type: ObjectConstructor;
        default: undefined;
    };
    createRSChart: {
        type: FunctionConstructor;
        default: undefined;
    };
    createRSGrid: {
        type: FunctionConstructor;
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "sliceChange" | "render" | "cellDblClick" | "templateSave" | "templateApply" | "templateDelete" | "init")[], "update:modelValue" | "sliceChange" | "render" | "cellDblClick" | "templateSave" | "templateApply" | "templateDelete" | "init", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: ObjectConstructor;
        default: undefined;
    };
    data: {
        type: ArrayConstructor;
        default: undefined;
    };
    format: {
        type: ObjectConstructor;
        default: undefined;
    };
    aggregations: {
        type: ArrayConstructor;
        default: undefined;
    };
    calculatedFields: {
        type: ArrayConstructor;
        default: undefined;
    };
    cellRenderer: {
        type: FunctionConstructor;
        default: undefined;
    };
    fiscalYear: {
        type: BooleanConstructor;
        default: undefined;
    };
    subtotals: {
        type: BooleanConstructor;
        default: undefined;
    };
    grandTotals: {
        type: BooleanConstructor;
        default: undefined;
    };
    fieldPanel: {
        type: BooleanConstructor;
        default: undefined;
    };
    detailModal: {
        type: BooleanConstructor;
        default: undefined;
    };
    reportTemplates: {
        type: BooleanConstructor;
        default: undefined;
    };
    maxCells: {
        type: NumberConstructor;
        default: undefined;
    };
    drillThrough: {
        type: ObjectConstructor;
        default: undefined;
    };
    worker: {
        type: BooleanConstructor;
        default: undefined;
    };
    templates: {
        type: ArrayConstructor;
        default: undefined;
    };
    templatesKey: {
        type: StringConstructor;
        default: undefined;
    };
    templateStorage: {
        type: ObjectConstructor;
        default: undefined;
    };
    createRSChart: {
        type: FunctionConstructor;
        default: undefined;
    };
    createRSGrid: {
        type: FunctionConstructor;
        default: undefined;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onSliceChange?: ((...args: any[]) => any) | undefined;
    onRender?: ((...args: any[]) => any) | undefined;
    onCellDblClick?: ((...args: any[]) => any) | undefined;
    onTemplateSave?: ((...args: any[]) => any) | undefined;
    onTemplateApply?: ((...args: any[]) => any) | undefined;
    onTemplateDelete?: ((...args: any[]) => any) | undefined;
    onInit?: ((...args: any[]) => any) | undefined;
}>, {
    maxCells: number;
    data: unknown[];
    calculatedFields: unknown[];
    cellRenderer: Function;
    templatesKey: string;
    templateStorage: Record<string, any>;
    fieldPanel: boolean;
    reportTemplates: boolean;
    createRSChart: Function;
    createRSGrid: Function;
    modelValue: Record<string, any>;
    format: Record<string, any>;
    aggregations: unknown[];
    fiscalYear: boolean;
    subtotals: boolean;
    grandTotals: boolean;
    detailModal: boolean;
    drillThrough: Record<string, any>;
    worker: boolean;
    templates: unknown[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsPivot;
