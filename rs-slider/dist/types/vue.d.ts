export const RsSlider: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    mode: {
        type: StringConstructor;
        default: undefined;
    };
    variant: {
        type: StringConstructor;
        default: undefined;
    };
    slides: {
        type: ArrayConstructor;
        default: undefined;
    };
    perView: {
        type: NumberConstructor;
        default: undefined;
    };
    gap: {
        type: NumberConstructor;
        default: undefined;
    };
    speed: {
        type: NumberConstructor;
        default: undefined;
    };
    loop: {
        type: BooleanConstructor;
        default: undefined;
    };
    arrows: {
        type: BooleanConstructor;
        default: undefined;
    };
    dots: {
        type: BooleanConstructor;
        default: undefined;
    };
    swipe: {
        type: BooleanConstructor;
        default: undefined;
    };
    keyboard: {
        type: BooleanConstructor;
        default: undefined;
    };
    autoplay: {
        type: (BooleanConstructor | NumberConstructor | ObjectConstructor)[];
        default: undefined;
    };
    aspectRatio: {
        type: (BooleanConstructor | StringConstructor)[];
        default: undefined;
    };
    overlay: {
        type: (BooleanConstructor | StringConstructor)[];
        default: undefined;
    };
    contentAnimation: {
        type: (BooleanConstructor | StringConstructor)[];
        default: undefined;
    };
    mobileBreakpoint: {
        type: NumberConstructor;
        default: undefined;
    };
    responsive: {
        type: ObjectConstructor;
        default: undefined;
    };
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "update:modelValue" | "play" | "pause" | "init")[], "change" | "update:modelValue" | "play" | "pause" | "init", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    mode: {
        type: StringConstructor;
        default: undefined;
    };
    variant: {
        type: StringConstructor;
        default: undefined;
    };
    slides: {
        type: ArrayConstructor;
        default: undefined;
    };
    perView: {
        type: NumberConstructor;
        default: undefined;
    };
    gap: {
        type: NumberConstructor;
        default: undefined;
    };
    speed: {
        type: NumberConstructor;
        default: undefined;
    };
    loop: {
        type: BooleanConstructor;
        default: undefined;
    };
    arrows: {
        type: BooleanConstructor;
        default: undefined;
    };
    dots: {
        type: BooleanConstructor;
        default: undefined;
    };
    swipe: {
        type: BooleanConstructor;
        default: undefined;
    };
    keyboard: {
        type: BooleanConstructor;
        default: undefined;
    };
    autoplay: {
        type: (BooleanConstructor | NumberConstructor | ObjectConstructor)[];
        default: undefined;
    };
    aspectRatio: {
        type: (BooleanConstructor | StringConstructor)[];
        default: undefined;
    };
    overlay: {
        type: (BooleanConstructor | StringConstructor)[];
        default: undefined;
    };
    contentAnimation: {
        type: (BooleanConstructor | StringConstructor)[];
        default: undefined;
    };
    mobileBreakpoint: {
        type: NumberConstructor;
        default: undefined;
    };
    responsive: {
        type: ObjectConstructor;
        default: undefined;
    };
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onPlay?: ((...args: any[]) => any) | undefined;
    onPause?: ((...args: any[]) => any) | undefined;
    onInit?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: number;
    mode: string;
    variant: string;
    slides: unknown[];
    perView: number;
    gap: number;
    speed: number;
    loop: boolean;
    arrows: boolean;
    dots: boolean;
    swipe: boolean;
    keyboard: boolean;
    autoplay: number | boolean | Record<string, any>;
    aspectRatio: string | boolean;
    overlay: string | boolean;
    contentAnimation: string | boolean;
    mobileBreakpoint: number;
    responsive: Record<string, any>;
    ariaLabel: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export const RsGallery: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    items: {
        type: ArrayConstructor;
        default: undefined;
    };
    thumbs: {
        type: (BooleanConstructor | StringConstructor)[];
        default: undefined;
    };
    arrows: {
        type: BooleanConstructor;
        default: undefined;
    };
    zoom: {
        type: BooleanConstructor;
        default: undefined;
    };
    zoomScale: {
        type: NumberConstructor;
        default: undefined;
    };
    lazy: {
        type: BooleanConstructor;
        default: undefined;
    };
    keyboard: {
        type: BooleanConstructor;
        default: undefined;
    };
    swipe: {
        type: BooleanConstructor;
        default: undefined;
    };
    loop: {
        type: BooleanConstructor;
        default: undefined;
    };
    aspectRatio: {
        type: (BooleanConstructor | StringConstructor)[];
        default: undefined;
    };
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "update:modelValue" | "init")[], "change" | "update:modelValue" | "init", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    items: {
        type: ArrayConstructor;
        default: undefined;
    };
    thumbs: {
        type: (BooleanConstructor | StringConstructor)[];
        default: undefined;
    };
    arrows: {
        type: BooleanConstructor;
        default: undefined;
    };
    zoom: {
        type: BooleanConstructor;
        default: undefined;
    };
    zoomScale: {
        type: NumberConstructor;
        default: undefined;
    };
    lazy: {
        type: BooleanConstructor;
        default: undefined;
    };
    keyboard: {
        type: BooleanConstructor;
        default: undefined;
    };
    swipe: {
        type: BooleanConstructor;
        default: undefined;
    };
    loop: {
        type: BooleanConstructor;
        default: undefined;
    };
    aspectRatio: {
        type: (BooleanConstructor | StringConstructor)[];
        default: undefined;
    };
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onInit?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: number;
    loop: boolean;
    arrows: boolean;
    swipe: boolean;
    keyboard: boolean;
    aspectRatio: string | boolean;
    ariaLabel: string;
    items: unknown[];
    thumbs: string | boolean;
    zoom: boolean;
    zoomScale: number;
    lazy: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export const RsMarquee: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    items: {
        type: ArrayConstructor;
        default: undefined;
    };
    rows: {
        type: ArrayConstructor;
        default: undefined;
    };
    speed: {
        type: NumberConstructor;
        default: undefined;
    };
    reverse: {
        type: BooleanConstructor;
        default: undefined;
    };
    gap: {
        type: NumberConstructor;
        default: undefined;
    };
    pauseOnHover: {
        type: BooleanConstructor;
        default: undefined;
    };
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "init"[], "init", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    items: {
        type: ArrayConstructor;
        default: undefined;
    };
    rows: {
        type: ArrayConstructor;
        default: undefined;
    };
    speed: {
        type: NumberConstructor;
        default: undefined;
    };
    reverse: {
        type: BooleanConstructor;
        default: undefined;
    };
    gap: {
        type: NumberConstructor;
        default: undefined;
    };
    pauseOnHover: {
        type: BooleanConstructor;
        default: undefined;
    };
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onInit?: ((...args: any[]) => any) | undefined;
}>, {
    reverse: boolean;
    gap: number;
    speed: number;
    ariaLabel: string;
    items: unknown[];
    rows: unknown[];
    pauseOnHover: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export const RsMasonry: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: null;
    };
    items: {
        type: ArrayConstructor;
        default: undefined;
    };
    layout: {
        type: StringConstructor;
        default: undefined;
    };
    columnWidth: {
        type: NumberConstructor;
        default: undefined;
    };
    maxColumns: {
        type: NumberConstructor;
        default: undefined;
    };
    rows: {
        type: NumberConstructor;
        default: undefined;
    };
    rowHeight: {
        type: NumberConstructor;
        default: undefined;
    };
    gap: {
        type: NumberConstructor;
        default: undefined;
    };
    filterBar: {
        type: BooleanConstructor;
        default: undefined;
    };
    filterAllLabel: {
        type: StringConstructor;
        default: undefined;
    };
    lightbox: {
        type: BooleanConstructor;
        default: undefined;
    };
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("filter" | "update:modelValue" | "init")[], "filter" | "update:modelValue" | "init", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: null;
    };
    items: {
        type: ArrayConstructor;
        default: undefined;
    };
    layout: {
        type: StringConstructor;
        default: undefined;
    };
    columnWidth: {
        type: NumberConstructor;
        default: undefined;
    };
    maxColumns: {
        type: NumberConstructor;
        default: undefined;
    };
    rows: {
        type: NumberConstructor;
        default: undefined;
    };
    rowHeight: {
        type: NumberConstructor;
        default: undefined;
    };
    gap: {
        type: NumberConstructor;
        default: undefined;
    };
    filterBar: {
        type: BooleanConstructor;
        default: undefined;
    };
    filterAllLabel: {
        type: StringConstructor;
        default: undefined;
    };
    lightbox: {
        type: BooleanConstructor;
        default: undefined;
    };
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onInit?: ((...args: any[]) => any) | undefined;
    onFilter?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: string;
    gap: number;
    ariaLabel: string;
    items: unknown[];
    rows: number;
    layout: string;
    columnWidth: number;
    maxColumns: number;
    rowHeight: number;
    filterBar: boolean;
    filterAllLabel: string;
    lightbox: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export const RsCoverflow: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    items: {
        type: ArrayConstructor;
        default: undefined;
    };
    visible: {
        type: NumberConstructor;
        default: undefined;
    };
    spacing: {
        type: NumberConstructor;
        default: undefined;
    };
    angle: {
        type: NumberConstructor;
        default: undefined;
    };
    depth: {
        type: NumberConstructor;
        default: undefined;
    };
    scale: {
        type: NumberConstructor;
        default: undefined;
    };
    loop: {
        type: BooleanConstructor;
        default: undefined;
    };
    arrows: {
        type: BooleanConstructor;
        default: undefined;
    };
    dots: {
        type: BooleanConstructor;
        default: undefined;
    };
    swipe: {
        type: BooleanConstructor;
        default: undefined;
    };
    keyboard: {
        type: BooleanConstructor;
        default: undefined;
    };
    reflection: {
        type: BooleanConstructor;
        default: undefined;
    };
    autoplay: {
        type: (BooleanConstructor | NumberConstructor | ObjectConstructor)[];
        default: undefined;
    };
    speed: {
        type: NumberConstructor;
        default: undefined;
    };
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "update:modelValue" | "init")[], "change" | "update:modelValue" | "init", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    items: {
        type: ArrayConstructor;
        default: undefined;
    };
    visible: {
        type: NumberConstructor;
        default: undefined;
    };
    spacing: {
        type: NumberConstructor;
        default: undefined;
    };
    angle: {
        type: NumberConstructor;
        default: undefined;
    };
    depth: {
        type: NumberConstructor;
        default: undefined;
    };
    scale: {
        type: NumberConstructor;
        default: undefined;
    };
    loop: {
        type: BooleanConstructor;
        default: undefined;
    };
    arrows: {
        type: BooleanConstructor;
        default: undefined;
    };
    dots: {
        type: BooleanConstructor;
        default: undefined;
    };
    swipe: {
        type: BooleanConstructor;
        default: undefined;
    };
    keyboard: {
        type: BooleanConstructor;
        default: undefined;
    };
    reflection: {
        type: BooleanConstructor;
        default: undefined;
    };
    autoplay: {
        type: (BooleanConstructor | NumberConstructor | ObjectConstructor)[];
        default: undefined;
    };
    speed: {
        type: NumberConstructor;
        default: undefined;
    };
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onInit?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: number;
    speed: number;
    loop: boolean;
    arrows: boolean;
    dots: boolean;
    swipe: boolean;
    keyboard: boolean;
    autoplay: number | boolean | Record<string, any>;
    ariaLabel: string;
    items: unknown[];
    visible: number;
    spacing: number;
    angle: number;
    depth: number;
    scale: number;
    reflection: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export const RsStories: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    stories: {
        type: ArrayConstructor;
        default: undefined;
    };
    duration: {
        type: NumberConstructor;
        default: undefined;
    };
    loop: {
        type: BooleanConstructor;
        default: undefined;
    };
    autoplay: {
        type: BooleanConstructor;
        default: undefined;
    };
    keyboard: {
        type: BooleanConstructor;
        default: undefined;
    };
    muted: {
        type: BooleanConstructor;
        default: undefined;
    };
    holdToPause: {
        type: BooleanConstructor;
        default: undefined;
    };
    aspectRatio: {
        type: (BooleanConstructor | StringConstructor)[];
        default: undefined;
    };
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "update:modelValue" | "play" | "pause" | "init" | "end")[], "change" | "update:modelValue" | "play" | "pause" | "init" | "end", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    stories: {
        type: ArrayConstructor;
        default: undefined;
    };
    duration: {
        type: NumberConstructor;
        default: undefined;
    };
    loop: {
        type: BooleanConstructor;
        default: undefined;
    };
    autoplay: {
        type: BooleanConstructor;
        default: undefined;
    };
    keyboard: {
        type: BooleanConstructor;
        default: undefined;
    };
    muted: {
        type: BooleanConstructor;
        default: undefined;
    };
    holdToPause: {
        type: BooleanConstructor;
        default: undefined;
    };
    aspectRatio: {
        type: (BooleanConstructor | StringConstructor)[];
        default: undefined;
    };
    ariaLabel: {
        type: StringConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onPlay?: ((...args: any[]) => any) | undefined;
    onPause?: ((...args: any[]) => any) | undefined;
    onInit?: ((...args: any[]) => any) | undefined;
    onEnd?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: number;
    loop: boolean;
    keyboard: boolean;
    autoplay: boolean;
    aspectRatio: string | boolean;
    ariaLabel: string;
    stories: unknown[];
    duration: number;
    muted: boolean;
    holdToPause: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export { createRSFullscreen };
export default RsSlider;
import { createRSFullscreen } from './index.js';
