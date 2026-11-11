export const RsEditor: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    toolbar: {
        type: StringConstructor;
        default: undefined;
    };
    floatingToolbar: {
        type: (StringConstructor | BooleanConstructor)[];
        default: undefined;
    };
    insertToolbar: {
        type: (StringConstructor | BooleanConstructor)[];
        default: undefined;
    };
    insertPlacement: {
        type: StringConstructor;
        default: undefined;
    };
    ui: {
        type: StringConstructor;
        default: undefined;
    };
    simple: {
        type: ObjectConstructor;
        default: undefined;
    };
    placeholder: {
        type: StringConstructor;
        default: undefined;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    plugins: {
        type: ArrayConstructor;
        default: undefined;
    };
    pluginOptions: {
        type: ObjectConstructor;
        default: undefined;
    };
    autosaveKey: {
        type: StringConstructor;
        default: undefined;
    };
    imageUploadHandler: {
        type: FunctionConstructor;
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("focus" | "blur" | "selectionchange" | "change" | "update:modelValue" | "init" | "uichange")[], "focus" | "blur" | "selectionchange" | "change" | "update:modelValue" | "init" | "uichange", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    toolbar: {
        type: StringConstructor;
        default: undefined;
    };
    floatingToolbar: {
        type: (StringConstructor | BooleanConstructor)[];
        default: undefined;
    };
    insertToolbar: {
        type: (StringConstructor | BooleanConstructor)[];
        default: undefined;
    };
    insertPlacement: {
        type: StringConstructor;
        default: undefined;
    };
    ui: {
        type: StringConstructor;
        default: undefined;
    };
    simple: {
        type: ObjectConstructor;
        default: undefined;
    };
    placeholder: {
        type: StringConstructor;
        default: undefined;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    plugins: {
        type: ArrayConstructor;
        default: undefined;
    };
    pluginOptions: {
        type: ObjectConstructor;
        default: undefined;
    };
    autosaveKey: {
        type: StringConstructor;
        default: undefined;
    };
    imageUploadHandler: {
        type: FunctionConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onFocus?: ((...args: any[]) => any) | undefined;
    onBlur?: ((...args: any[]) => any) | undefined;
    onSelectionchange?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onInit?: ((...args: any[]) => any) | undefined;
    onUichange?: ((...args: any[]) => any) | undefined;
}>, {
    readonly: boolean;
    simple: Record<string, any>;
    plugins: unknown[];
    toolbar: string;
    floatingToolbar: string | boolean;
    insertToolbar: string | boolean;
    ui: string;
    pluginOptions: Record<string, any>;
    modelValue: string;
    insertPlacement: string;
    placeholder: string;
    autosaveKey: string;
    imageUploadHandler: Function;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsEditor;
