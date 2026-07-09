export const RsPlayer: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    sources: {
        type: (StringConstructor | ArrayConstructor)[];
        default: undefined;
    };
    src: {
        type: StringConstructor;
        default: undefined;
    };
    poster: {
        type: StringConstructor;
        default: undefined;
    };
    tracks: {
        type: ArrayConstructor;
        default: undefined;
    };
    autoplay: {
        type: BooleanConstructor;
        default: undefined;
    };
    muted: {
        type: BooleanConstructor;
        default: undefined;
    };
    loop: {
        type: BooleanConstructor;
        default: undefined;
    };
    preload: {
        type: StringConstructor;
        default: undefined;
    };
    speeds: {
        type: ArrayConstructor;
        default: undefined;
    };
    theme: {
        type: ObjectConstructor;
        default: undefined;
    };
    i18n: {
        type: ObjectConstructor;
        default: undefined;
    };
    hotkeys: {
        type: BooleanConstructor;
        default: undefined;
    };
    wheelVolume: {
        type: BooleanConstructor;
        default: undefined;
    };
    gestures: {
        type: BooleanConstructor;
        default: undefined;
    };
    miniPlayer: {
        type: BooleanConstructor;
        default: undefined;
    };
    chapters: {
        type: (StringConstructor | ArrayConstructor)[];
        default: undefined;
    };
    thumbnails: {
        type: (StringConstructor | ArrayConstructor)[];
        default: undefined;
    };
    playlist: {
        type: ArrayConstructor;
        default: undefined;
    };
    adapters: {
        type: ArrayConstructor;
        default: undefined;
    };
    analytics: {
        type: (ObjectConstructor | FunctionConstructor)[];
        default: undefined;
    };
    watermark: {
        type: ObjectConstructor;
        default: undefined;
    };
    captionStyle: {
        type: ObjectConstructor;
        default: undefined;
    };
    preservesPitch: {
        type: BooleanConstructor;
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("ended" | "error" | "ready" | "play" | "pause" | "ratechange" | "timeupdate" | "seeking" | "seeked" | "volumechange" | "qualitychange" | "durationchange" | "loadedmetadata" | "statechange")[], "ended" | "error" | "ready" | "play" | "pause" | "ratechange" | "timeupdate" | "seeking" | "seeked" | "volumechange" | "qualitychange" | "durationchange" | "loadedmetadata" | "statechange", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    sources: {
        type: (StringConstructor | ArrayConstructor)[];
        default: undefined;
    };
    src: {
        type: StringConstructor;
        default: undefined;
    };
    poster: {
        type: StringConstructor;
        default: undefined;
    };
    tracks: {
        type: ArrayConstructor;
        default: undefined;
    };
    autoplay: {
        type: BooleanConstructor;
        default: undefined;
    };
    muted: {
        type: BooleanConstructor;
        default: undefined;
    };
    loop: {
        type: BooleanConstructor;
        default: undefined;
    };
    preload: {
        type: StringConstructor;
        default: undefined;
    };
    speeds: {
        type: ArrayConstructor;
        default: undefined;
    };
    theme: {
        type: ObjectConstructor;
        default: undefined;
    };
    i18n: {
        type: ObjectConstructor;
        default: undefined;
    };
    hotkeys: {
        type: BooleanConstructor;
        default: undefined;
    };
    wheelVolume: {
        type: BooleanConstructor;
        default: undefined;
    };
    gestures: {
        type: BooleanConstructor;
        default: undefined;
    };
    miniPlayer: {
        type: BooleanConstructor;
        default: undefined;
    };
    chapters: {
        type: (StringConstructor | ArrayConstructor)[];
        default: undefined;
    };
    thumbnails: {
        type: (StringConstructor | ArrayConstructor)[];
        default: undefined;
    };
    playlist: {
        type: ArrayConstructor;
        default: undefined;
    };
    adapters: {
        type: ArrayConstructor;
        default: undefined;
    };
    analytics: {
        type: (ObjectConstructor | FunctionConstructor)[];
        default: undefined;
    };
    watermark: {
        type: ObjectConstructor;
        default: undefined;
    };
    captionStyle: {
        type: ObjectConstructor;
        default: undefined;
    };
    preservesPitch: {
        type: BooleanConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onEnded?: ((...args: any[]) => any) | undefined;
    onError?: ((...args: any[]) => any) | undefined;
    onReady?: ((...args: any[]) => any) | undefined;
    onPlay?: ((...args: any[]) => any) | undefined;
    onPause?: ((...args: any[]) => any) | undefined;
    onRatechange?: ((...args: any[]) => any) | undefined;
    onTimeupdate?: ((...args: any[]) => any) | undefined;
    onSeeking?: ((...args: any[]) => any) | undefined;
    onSeeked?: ((...args: any[]) => any) | undefined;
    onVolumechange?: ((...args: any[]) => any) | undefined;
    onQualitychange?: ((...args: any[]) => any) | undefined;
    onDurationchange?: ((...args: any[]) => any) | undefined;
    onLoadedmetadata?: ((...args: any[]) => any) | undefined;
    onStatechange?: ((...args: any[]) => any) | undefined;
}>, {
    loop: boolean;
    speeds: unknown[];
    adapters: unknown[];
    preservesPitch: boolean;
    tracks: unknown[];
    i18n: Record<string, any>;
    captionStyle: Record<string, any>;
    sources: string | unknown[];
    src: string;
    poster: string;
    autoplay: boolean;
    muted: boolean;
    preload: string;
    theme: Record<string, any>;
    hotkeys: boolean;
    wheelVolume: boolean;
    gestures: boolean;
    miniPlayer: boolean;
    chapters: string | unknown[];
    thumbnails: string | unknown[];
    playlist: unknown[];
    analytics: Function | Record<string, any>;
    watermark: Record<string, any>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsPlayer;
