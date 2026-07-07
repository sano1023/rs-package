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
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("focus" | "blur" | "update:modelValue" | "change" | "init" | "selectionchange")[], "focus" | "blur" | "update:modelValue" | "change" | "init" | "selectionchange", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
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
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    onInit?: ((...args: any[]) => any) | undefined;
    onSelectionchange?: ((...args: any[]) => any) | undefined;
}>, {
    readonly: boolean;
    plugins: unknown[];
    toolbar: string;
    floatingToolbar: string | boolean;
    pluginOptions: Record<string, any>;
    modelValue: string;
    placeholder: string;
    autosaveKey: string;
    imageUploadHandler: Function;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsEditor;
