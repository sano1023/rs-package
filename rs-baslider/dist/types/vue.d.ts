export const RsBaSlider: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor;
        default: undefined;
    };
    before: {
        type: (ObjectConstructor | StringConstructor)[];
        default: undefined;
    };
    after: {
        type: (ObjectConstructor | StringConstructor)[];
        default: undefined;
    };
    direction: {
        type: StringConstructor;
        default: undefined;
    };
    labels: {
        type: (ObjectConstructor | BooleanConstructor)[];
        default: undefined;
    };
    hover: {
        type: BooleanConstructor;
        default: undefined;
    };
    clickToMove: {
        type: BooleanConstructor;
        default: undefined;
    };
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change")[], "update:modelValue" | "change", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor;
        default: undefined;
    };
    before: {
        type: (ObjectConstructor | StringConstructor)[];
        default: undefined;
    };
    after: {
        type: (ObjectConstructor | StringConstructor)[];
        default: undefined;
    };
    direction: {
        type: StringConstructor;
        default: undefined;
    };
    labels: {
        type: (ObjectConstructor | BooleanConstructor)[];
        default: undefined;
    };
    hover: {
        type: BooleanConstructor;
        default: undefined;
    };
    clickToMove: {
        type: BooleanConstructor;
        default: undefined;
    };
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}>, {
    direction: string;
    modelValue: number;
    before: string | Record<string, any>;
    after: string | Record<string, any>;
    labels: boolean | Record<string, any>;
    hover: boolean;
    clickToMove: boolean;
    ariaLabel: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsBaSlider;
