export const RsDiagram: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: ObjectConstructor;
        default: undefined;
    };
    nodes: {
        type: ArrayConstructor;
        default: undefined;
    };
    links: {
        type: ArrayConstructor;
        default: undefined;
    };
    lanes: {
        type: ArrayConstructor;
        default: undefined;
    };
    grid: {
        type: (BooleanConstructor | ObjectConstructor)[];
        default: undefined;
    };
    palette: {
        type: (BooleanConstructor | ObjectConstructor)[];
        default: undefined;
    };
    paletteItems: {
        type: ArrayConstructor;
        default: undefined;
    };
    styleBar: {
        type: BooleanConstructor;
        default: undefined;
    };
    contextMenu: {
        type: (ArrayConstructor | BooleanConstructor)[];
        default: undefined;
    };
    nodeTypes: {
        type: ArrayConstructor;
        default: undefined;
    };
    linkTypes: {
        type: ArrayConstructor;
        default: undefined;
    };
    template: {
        type: StringConstructor;
        default: undefined;
    };
    data: {
        type: ObjectConstructor;
        default: undefined;
    };
    virtualize: {
        type: BooleanConstructor;
        default: undefined;
    };
    virtualizeMargin: {
        type: NumberConstructor;
        default: undefined;
    };
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
    readOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change" | "init" | "selectionChange" | "nodeClick" | "nodeAdd" | "nodeRemove" | "linkAdd" | "linkRemove" | "layout" | "viewChange")[], "update:modelValue" | "change" | "init" | "selectionChange" | "nodeClick" | "nodeAdd" | "nodeRemove" | "linkAdd" | "linkRemove" | "layout" | "viewChange", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: ObjectConstructor;
        default: undefined;
    };
    nodes: {
        type: ArrayConstructor;
        default: undefined;
    };
    links: {
        type: ArrayConstructor;
        default: undefined;
    };
    lanes: {
        type: ArrayConstructor;
        default: undefined;
    };
    grid: {
        type: (BooleanConstructor | ObjectConstructor)[];
        default: undefined;
    };
    palette: {
        type: (BooleanConstructor | ObjectConstructor)[];
        default: undefined;
    };
    paletteItems: {
        type: ArrayConstructor;
        default: undefined;
    };
    styleBar: {
        type: BooleanConstructor;
        default: undefined;
    };
    contextMenu: {
        type: (ArrayConstructor | BooleanConstructor)[];
        default: undefined;
    };
    nodeTypes: {
        type: ArrayConstructor;
        default: undefined;
    };
    linkTypes: {
        type: ArrayConstructor;
        default: undefined;
    };
    template: {
        type: StringConstructor;
        default: undefined;
    };
    data: {
        type: ObjectConstructor;
        default: undefined;
    };
    virtualize: {
        type: BooleanConstructor;
        default: undefined;
    };
    virtualizeMargin: {
        type: NumberConstructor;
        default: undefined;
    };
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
    readOnly: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    onInit?: ((...args: any[]) => any) | undefined;
    onSelectionChange?: ((...args: any[]) => any) | undefined;
    onNodeClick?: ((...args: any[]) => any) | undefined;
    onNodeAdd?: ((...args: any[]) => any) | undefined;
    onNodeRemove?: ((...args: any[]) => any) | undefined;
    onLinkAdd?: ((...args: any[]) => any) | undefined;
    onLinkRemove?: ((...args: any[]) => any) | undefined;
    onLayout?: ((...args: any[]) => any) | undefined;
    onViewChange?: ((...args: any[]) => any) | undefined;
}>, {
    grid: boolean | Record<string, any>;
    data: Record<string, any>;
    template: string;
    modelValue: Record<string, any>;
    nodes: unknown[];
    links: unknown[];
    lanes: unknown[];
    palette: boolean | Record<string, any>;
    paletteItems: unknown[];
    styleBar: boolean;
    contextMenu: boolean | unknown[];
    nodeTypes: unknown[];
    linkTypes: unknown[];
    virtualize: boolean;
    virtualizeMargin: number;
    ariaLabel: string;
    readOnly: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsDiagram;
