export const RsForm: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    schema: {
        type: ObjectConstructor;
        default: null;
    };
    modelValue: {
        type: ObjectConstructor;
        default: null;
    };
    mode: {
        type: StringConstructor;
        default: undefined;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    autosave: {
        type: BooleanConstructor;
        default: undefined;
    };
    storageKey: {
        type: StringConstructor;
        default: undefined;
    };
    storage: {
        type: ObjectConstructor;
        default: undefined;
    };
    messages: {
        type: ObjectConstructor;
        default: undefined;
    };
    questionTypes: {
        type: ArrayConstructor;
        default: undefined;
    };
    addressLookup: {
        type: FunctionConstructor;
        default: undefined;
    };
    datepicker: {
        type: (ObjectConstructor | BooleanConstructor)[];
        default: undefined;
    };
    submitText: {
        type: StringConstructor;
        default: undefined;
    };
    progressBar: {
        type: (StringConstructor | BooleanConstructor)[];
        default: undefined;
    };
    showCompleted: {
        type: BooleanConstructor;
        default: undefined;
    };
    locale: {
        type: StringConstructor;
        default: undefined;
    };
    fallbackLocale: {
        type: StringConstructor;
        default: undefined;
    };
    defaultLocale: {
        type: StringConstructor;
        default: undefined;
    };
    variant: {
        type: StringConstructor;
        default: undefined;
    };
    variantSeed: {
        type: (NumberConstructor | StringConstructor)[];
        default: undefined;
    };
    variants: {
        type: ArrayConstructor;
        default: undefined;
    };
    options: {
        type: ObjectConstructor;
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change" | "answersChange" | "submit" | "pageChange" | "visibilityChange" | "validate" | "localeChange" | "init")[], "update:modelValue" | "change" | "answersChange" | "submit" | "pageChange" | "visibilityChange" | "validate" | "localeChange" | "init", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    schema: {
        type: ObjectConstructor;
        default: null;
    };
    modelValue: {
        type: ObjectConstructor;
        default: null;
    };
    mode: {
        type: StringConstructor;
        default: undefined;
    };
    readonly: {
        type: BooleanConstructor;
        default: boolean;
    };
    autosave: {
        type: BooleanConstructor;
        default: undefined;
    };
    storageKey: {
        type: StringConstructor;
        default: undefined;
    };
    storage: {
        type: ObjectConstructor;
        default: undefined;
    };
    messages: {
        type: ObjectConstructor;
        default: undefined;
    };
    questionTypes: {
        type: ArrayConstructor;
        default: undefined;
    };
    addressLookup: {
        type: FunctionConstructor;
        default: undefined;
    };
    datepicker: {
        type: (ObjectConstructor | BooleanConstructor)[];
        default: undefined;
    };
    submitText: {
        type: StringConstructor;
        default: undefined;
    };
    progressBar: {
        type: (StringConstructor | BooleanConstructor)[];
        default: undefined;
    };
    showCompleted: {
        type: BooleanConstructor;
        default: undefined;
    };
    locale: {
        type: StringConstructor;
        default: undefined;
    };
    fallbackLocale: {
        type: StringConstructor;
        default: undefined;
    };
    defaultLocale: {
        type: StringConstructor;
        default: undefined;
    };
    variant: {
        type: StringConstructor;
        default: undefined;
    };
    variantSeed: {
        type: (NumberConstructor | StringConstructor)[];
        default: undefined;
    };
    variants: {
        type: ArrayConstructor;
        default: undefined;
    };
    options: {
        type: ObjectConstructor;
        default: undefined;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    onAnswersChange?: ((...args: any[]) => any) | undefined;
    onSubmit?: ((...args: any[]) => any) | undefined;
    onPageChange?: ((...args: any[]) => any) | undefined;
    onVisibilityChange?: ((...args: any[]) => any) | undefined;
    onValidate?: ((...args: any[]) => any) | undefined;
    onLocaleChange?: ((...args: any[]) => any) | undefined;
    onInit?: ((...args: any[]) => any) | undefined;
}>, {
    messages: Record<string, any>;
    storage: Record<string, any>;
    storageKey: string;
    options: Record<string, any>;
    readonly: boolean;
    fallbackLocale: string;
    defaultLocale: string;
    submitText: string;
    locale: string;
    variant: string;
    variantSeed: string | number;
    variants: unknown[];
    schema: Record<string, any>;
    modelValue: Record<string, any>;
    mode: string;
    autosave: boolean;
    questionTypes: unknown[];
    addressLookup: Function;
    datepicker: boolean | Record<string, any>;
    progressBar: string | boolean;
    showCompleted: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsForm;
