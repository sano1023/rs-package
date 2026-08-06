export const RsReport: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    template: {
        type: ObjectConstructor;
        required: true;
    };
    data: {
        type: ObjectConstructor;
        default: () => {};
    };
    options: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("page" | "zoom" | "render" | "error")[], "page" | "zoom" | "render" | "error", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    template: {
        type: ObjectConstructor;
        required: true;
    };
    data: {
        type: ObjectConstructor;
        default: () => {};
    };
    options: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{
    onPage?: ((...args: any[]) => any) | undefined;
    onZoom?: ((...args: any[]) => any) | undefined;
    onRender?: ((...args: any[]) => any) | undefined;
    onError?: ((...args: any[]) => any) | undefined;
}>, {
    data: Record<string, any>;
    options: Record<string, any>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsReport;
