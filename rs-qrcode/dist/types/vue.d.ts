export const RsQrCode: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    value: {
        type: StringConstructor;
        default: string;
    };
    ecLevel: {
        type: StringConstructor;
        default: undefined;
    };
    forceEcLevel: {
        type: StringConstructor;
        default: undefined;
    };
    margin: {
        type: NumberConstructor;
        default: undefined;
    };
    dark: {
        type: StringConstructor;
        default: undefined;
    };
    light: {
        type: StringConstructor;
        default: undefined;
    };
    size: {
        type: NumberConstructor;
        default: undefined;
    };
    scale: {
        type: NumberConstructor;
        default: undefined;
    };
    logo: {
        type: (StringConstructor | ObjectConstructor)[];
        default: undefined;
    };
    logoScale: {
        type: NumberConstructor;
        default: undefined;
    };
    label: {
        type: StringConstructor;
        default: undefined;
    };
    render: {
        type: StringConstructor;
        default: string;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("render" | "error")[], "render" | "error", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: StringConstructor;
        default: string;
    };
    ecLevel: {
        type: StringConstructor;
        default: undefined;
    };
    forceEcLevel: {
        type: StringConstructor;
        default: undefined;
    };
    margin: {
        type: NumberConstructor;
        default: undefined;
    };
    dark: {
        type: StringConstructor;
        default: undefined;
    };
    light: {
        type: StringConstructor;
        default: undefined;
    };
    size: {
        type: NumberConstructor;
        default: undefined;
    };
    scale: {
        type: NumberConstructor;
        default: undefined;
    };
    logo: {
        type: (StringConstructor | ObjectConstructor)[];
        default: undefined;
    };
    logoScale: {
        type: NumberConstructor;
        default: undefined;
    };
    label: {
        type: StringConstructor;
        default: undefined;
    };
    render: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{
    onRender?: ((...args: any[]) => any) | undefined;
    onError?: ((...args: any[]) => any) | undefined;
}>, {
    margin: number;
    label: string;
    size: number;
    light: string;
    dark: string;
    scale: number;
    render: string;
    value: string;
    ecLevel: string;
    forceEcLevel: string;
    logo: string | Record<string, any>;
    logoScale: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export const RsBarcode: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    value: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: StringConstructor;
        default: undefined;
    };
    barHeight: {
        type: NumberConstructor;
        default: undefined;
    };
    quiet: {
        type: NumberConstructor;
        default: undefined;
    };
    dark: {
        type: StringConstructor;
        default: undefined;
    };
    light: {
        type: StringConstructor;
        default: undefined;
    };
    label: {
        type: StringConstructor;
        default: undefined;
    };
    showText: {
        type: BooleanConstructor;
        default: undefined;
    };
    scale: {
        type: NumberConstructor;
        default: undefined;
    };
    render: {
        type: StringConstructor;
        default: string;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("render" | "error")[], "render" | "error", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    value: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: StringConstructor;
        default: undefined;
    };
    barHeight: {
        type: NumberConstructor;
        default: undefined;
    };
    quiet: {
        type: NumberConstructor;
        default: undefined;
    };
    dark: {
        type: StringConstructor;
        default: undefined;
    };
    light: {
        type: StringConstructor;
        default: undefined;
    };
    label: {
        type: StringConstructor;
        default: undefined;
    };
    showText: {
        type: BooleanConstructor;
        default: undefined;
    };
    scale: {
        type: NumberConstructor;
        default: undefined;
    };
    render: {
        type: StringConstructor;
        default: string;
    };
}>> & Readonly<{
    onRender?: ((...args: any[]) => any) | undefined;
    onError?: ((...args: any[]) => any) | undefined;
}>, {
    label: string;
    light: string;
    dark: string;
    quiet: number;
    barHeight: number;
    showText: boolean;
    scale: number;
    type: string;
    render: string;
    value: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsQrCode;
