export const RsLiveCam: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    mode: {
        type: StringConstructor;
        default: undefined;
    };
    smooth: {
        type: NumberConstructor;
        default: undefined;
    };
    brightness: {
        type: NumberConstructor;
        default: undefined;
    };
    saturate: {
        type: NumberConstructor;
        default: undefined;
    };
    mosaicSize: {
        type: NumberConstructor;
        default: undefined;
    };
    blurSize: {
        type: NumberConstructor;
        default: undefined;
    };
    background: {
        type: (ObjectConstructor | StringConstructor)[];
        default: undefined;
    };
    segmentation: {
        type: ObjectConstructor;
        default: undefined;
    };
    tracking: {
        type: ObjectConstructor;
        default: undefined;
    };
    avatar: {
        type: ObjectConstructor;
        default: undefined;
    };
    width: {
        type: NumberConstructor;
        default: undefined;
    };
    height: {
        type: NumberConstructor;
        default: undefined;
    };
    fps: {
        type: NumberConstructor;
        default: undefined;
    };
    facingMode: {
        type: StringConstructor;
        default: undefined;
    };
    autoStart: {
        type: BooleanConstructor;
        default: boolean;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("mode" | "start" | "stop" | "frame" | "error" | "trackinglost")[], "mode" | "start" | "stop" | "frame" | "error" | "trackinglost", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    mode: {
        type: StringConstructor;
        default: undefined;
    };
    smooth: {
        type: NumberConstructor;
        default: undefined;
    };
    brightness: {
        type: NumberConstructor;
        default: undefined;
    };
    saturate: {
        type: NumberConstructor;
        default: undefined;
    };
    mosaicSize: {
        type: NumberConstructor;
        default: undefined;
    };
    blurSize: {
        type: NumberConstructor;
        default: undefined;
    };
    background: {
        type: (ObjectConstructor | StringConstructor)[];
        default: undefined;
    };
    segmentation: {
        type: ObjectConstructor;
        default: undefined;
    };
    tracking: {
        type: ObjectConstructor;
        default: undefined;
    };
    avatar: {
        type: ObjectConstructor;
        default: undefined;
    };
    width: {
        type: NumberConstructor;
        default: undefined;
    };
    height: {
        type: NumberConstructor;
        default: undefined;
    };
    fps: {
        type: NumberConstructor;
        default: undefined;
    };
    facingMode: {
        type: StringConstructor;
        default: undefined;
    };
    autoStart: {
        type: BooleanConstructor;
        default: boolean;
    };
}>> & Readonly<{
    onMode?: ((...args: any[]) => any) | undefined;
    onStart?: ((...args: any[]) => any) | undefined;
    onStop?: ((...args: any[]) => any) | undefined;
    onFrame?: ((...args: any[]) => any) | undefined;
    onError?: ((...args: any[]) => any) | undefined;
    onTrackinglost?: ((...args: any[]) => any) | undefined;
}>, {
    mode: string;
    smooth: number;
    brightness: number;
    saturate: number;
    mosaicSize: number;
    background: string | Record<string, any>;
    avatar: Record<string, any>;
    segmentation: Record<string, any>;
    tracking: Record<string, any>;
    facingMode: string;
    width: number;
    blurSize: number;
    height: number;
    fps: number;
    autoStart: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsLiveCam;
