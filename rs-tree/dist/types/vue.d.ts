export const RsTree: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    nodes: {
        type: ArrayConstructor;
        required: true;
    };
    options: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[], string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    nodes: {
        type: ArrayConstructor;
        required: true;
    };
    options: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{
    [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
}>, {
    options: Record<string, any>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsTree;
