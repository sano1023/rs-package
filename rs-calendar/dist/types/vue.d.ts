export const RsCalendar: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    events: {
        type: ArrayConstructor;
        default: () => never[];
    };
    options: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, string[], string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    events: {
        type: ArrayConstructor;
        default: () => never[];
    };
    options: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{
    [x: `on${Capitalize<string>}`]: ((...args: any[]) => any) | undefined;
}>, {
    events: unknown[];
    options: Record<string, any>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsCalendar;
