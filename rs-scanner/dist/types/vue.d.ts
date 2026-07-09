export const RsScanner: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    formats: {
        type: ArrayConstructor;
        default: undefined;
    };
    adapters: {
        type: ArrayConstructor;
        default: undefined;
    };
    continuous: {
        type: BooleanConstructor;
        default: undefined;
    };
    dedupMs: {
        type: NumberConstructor;
        default: undefined;
    };
    interval: {
        type: NumberConstructor;
        default: undefined;
    };
    beep: {
        type: BooleanConstructor;
        default: undefined;
    };
    facingMode: {
        type: StringConstructor;
        default: undefined;
    };
    decoder: {
        type: StringConstructor;
        default: undefined;
    };
    autoStart: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("stop" | "scan" | "error" | "start")[], "stop" | "scan" | "error" | "start", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    formats: {
        type: ArrayConstructor;
        default: undefined;
    };
    adapters: {
        type: ArrayConstructor;
        default: undefined;
    };
    continuous: {
        type: BooleanConstructor;
        default: undefined;
    };
    dedupMs: {
        type: NumberConstructor;
        default: undefined;
    };
    interval: {
        type: NumberConstructor;
        default: undefined;
    };
    beep: {
        type: BooleanConstructor;
        default: undefined;
    };
    facingMode: {
        type: StringConstructor;
        default: undefined;
    };
    decoder: {
        type: StringConstructor;
        default: undefined;
    };
    autoStart: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onStop?: ((...args: any[]) => any) | undefined;
    onScan?: ((...args: any[]) => any) | undefined;
    onError?: ((...args: any[]) => any) | undefined;
    onStart?: ((...args: any[]) => any) | undefined;
}>, {
    formats: unknown[];
    adapters: unknown[];
    facingMode: string;
    interval: number;
    continuous: boolean;
    dedupMs: number;
    beep: boolean;
    decoder: string;
    autoStart: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsScanner;
