export const RsLightbox: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    items: {
        type: ArrayConstructor;
        default: () => never[];
    };
    options: {
        type: ObjectConstructor;
        default: () => {};
    };
}>, () => null, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("close" | "zoom" | "open" | "change" | "load" | "error")[], "close" | "zoom" | "open" | "change" | "load" | "error", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    items: {
        type: ArrayConstructor;
        default: () => never[];
    };
    options: {
        type: ObjectConstructor;
        default: () => {};
    };
}>> & Readonly<{
    onClose?: ((...args: any[]) => any) | undefined;
    onZoom?: ((...args: any[]) => any) | undefined;
    onOpen?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    onLoad?: ((...args: any[]) => any) | undefined;
    onError?: ((...args: any[]) => any) | undefined;
}>, {
    items: unknown[];
    options: Record<string, any>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsLightbox;
