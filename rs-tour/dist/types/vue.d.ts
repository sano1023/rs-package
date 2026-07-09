export const RsTour: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    steps: {
        type: ArrayConstructor;
        default: () => never[];
    };
    autoStart: {
        type: BooleanConstructor;
        default: boolean;
    };
    padding: {
        type: NumberConstructor;
        default: undefined;
    };
    zIndex: {
        type: NumberConstructor;
        default: undefined;
    };
    overlayColor: {
        type: StringConstructor;
        default: undefined;
    };
    accentColor: {
        type: StringConstructor;
        default: undefined;
    };
    ringColor: {
        type: StringConstructor;
        default: undefined;
    };
    scrollWaitMs: {
        type: NumberConstructor;
        default: undefined;
    };
    labels: {
        type: ObjectConstructor;
        default: undefined;
    };
}>, () => null, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("step" | "finish" | "close" | "init")[], "step" | "finish" | "close" | "init", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    steps: {
        type: ArrayConstructor;
        default: () => never[];
    };
    autoStart: {
        type: BooleanConstructor;
        default: boolean;
    };
    padding: {
        type: NumberConstructor;
        default: undefined;
    };
    zIndex: {
        type: NumberConstructor;
        default: undefined;
    };
    overlayColor: {
        type: StringConstructor;
        default: undefined;
    };
    accentColor: {
        type: StringConstructor;
        default: undefined;
    };
    ringColor: {
        type: StringConstructor;
        default: undefined;
    };
    scrollWaitMs: {
        type: NumberConstructor;
        default: undefined;
    };
    labels: {
        type: ObjectConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onStep?: ((...args: any[]) => any) | undefined;
    onFinish?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
    onInit?: ((...args: any[]) => any) | undefined;
}>, {
    steps: unknown[];
    autoStart: boolean;
    padding: number;
    zIndex: number;
    overlayColor: string;
    accentColor: string;
    ringColor: string;
    scrollWaitMs: number;
    labels: Record<string, any>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsTour;
