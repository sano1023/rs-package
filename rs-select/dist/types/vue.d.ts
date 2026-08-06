export const RsSelect: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    items: {
        type: ArrayConstructor;
        default: () => never[];
    };
    modelValue: {
        type: (ArrayConstructor | StringConstructor | NumberConstructor)[];
        default: null;
    };
    options: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[], string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    items: {
        type: ArrayConstructor;
        default: () => never[];
    };
    modelValue: {
        type: (ArrayConstructor | StringConstructor | NumberConstructor)[];
        default: null;
    };
    options: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{
    [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
}>, {
    items: unknown[];
    modelValue: string | number | unknown[];
    options: Record<string, any>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsSelect;
