export const RsImageEditor: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    src: {
        type: (ObjectConstructor | StringConstructor)[];
        default: null;
    };
    height: {
        type: NumberConstructor;
        default: undefined;
    };
    tools: {
        type: ArrayConstructor;
        default: undefined;
    };
    stamps: {
        type: ArrayConstructor;
        default: undefined;
    };
    fonts: {
        type: ArrayConstructor;
        default: undefined;
    };
    crop: {
        type: ObjectConstructor;
        default: undefined;
    };
    adjust: {
        type: ObjectConstructor;
        default: undefined;
    };
    filter: {
        type: ObjectConstructor;
        default: undefined;
    };
    shape: {
        type: ObjectConstructor;
        default: undefined;
    };
    frame: {
        type: ObjectConstructor;
        default: undefined;
    };
    maxSourceDimension: {
        type: NumberConstructor;
        default: undefined;
    };
    segmentation: {
        type: ObjectConstructor;
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("error" | "change" | "init")[], "error" | "change" | "init", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    src: {
        type: (ObjectConstructor | StringConstructor)[];
        default: null;
    };
    height: {
        type: NumberConstructor;
        default: undefined;
    };
    tools: {
        type: ArrayConstructor;
        default: undefined;
    };
    stamps: {
        type: ArrayConstructor;
        default: undefined;
    };
    fonts: {
        type: ArrayConstructor;
        default: undefined;
    };
    crop: {
        type: ObjectConstructor;
        default: undefined;
    };
    adjust: {
        type: ObjectConstructor;
        default: undefined;
    };
    filter: {
        type: ObjectConstructor;
        default: undefined;
    };
    shape: {
        type: ObjectConstructor;
        default: undefined;
    };
    frame: {
        type: ObjectConstructor;
        default: undefined;
    };
    maxSourceDimension: {
        type: NumberConstructor;
        default: undefined;
    };
    segmentation: {
        type: ObjectConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onError?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    onInit?: ((...args: any[]) => any) | undefined;
}>, {
    height: number;
    filter: Record<string, any>;
    frame: Record<string, any>;
    shape: Record<string, any>;
    segmentation: Record<string, any>;
    tools: unknown[];
    crop: Record<string, any>;
    adjust: Record<string, any>;
    stamps: unknown[];
    src: string | Record<string, any>;
    fonts: unknown[];
    maxSourceDimension: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsImageEditor;
