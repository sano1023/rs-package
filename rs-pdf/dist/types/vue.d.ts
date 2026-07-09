export const RsPdfViewer: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    src: {
        type: (ArrayBufferConstructor | ObjectConstructor | StringConstructor)[];
        default: null;
    };
    renderer: {
        type: (ObjectConstructor | FunctionConstructor)[];
        default: undefined;
    };
    adapter: {
        type: (ObjectConstructor | FunctionConstructor)[];
        default: undefined;
    };
    zoom: {
        type: (NumberConstructor | StringConstructor)[];
        default: undefined;
    };
    rotation: {
        type: NumberConstructor;
        default: undefined;
    };
    annotations: {
        type: BooleanConstructor;
        default: undefined;
    };
    author: {
        type: StringConstructor;
        default: undefined;
    };
    tools: {
        type: ArrayConstructor;
        default: undefined;
    };
    annotationTypes: {
        type: ArrayConstructor;
        default: undefined;
    };
    annotationStyle: {
        type: ObjectConstructor;
        default: undefined;
    };
    options: {
        type: ObjectConstructor;
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("search" | "redact" | "load" | "error" | "pageChange" | "zoomChange" | "rotate" | "print" | "destroy" | "annotationAdd" | "annotationChange" | "annotationRemove" | "flatten" | "formLoad" | "formChange" | "init")[], "search" | "redact" | "load" | "error" | "pageChange" | "zoomChange" | "rotate" | "print" | "destroy" | "annotationAdd" | "annotationChange" | "annotationRemove" | "flatten" | "formLoad" | "formChange" | "init", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    src: {
        type: (ArrayBufferConstructor | ObjectConstructor | StringConstructor)[];
        default: null;
    };
    renderer: {
        type: (ObjectConstructor | FunctionConstructor)[];
        default: undefined;
    };
    adapter: {
        type: (ObjectConstructor | FunctionConstructor)[];
        default: undefined;
    };
    zoom: {
        type: (NumberConstructor | StringConstructor)[];
        default: undefined;
    };
    rotation: {
        type: NumberConstructor;
        default: undefined;
    };
    annotations: {
        type: BooleanConstructor;
        default: undefined;
    };
    author: {
        type: StringConstructor;
        default: undefined;
    };
    tools: {
        type: ArrayConstructor;
        default: undefined;
    };
    annotationTypes: {
        type: ArrayConstructor;
        default: undefined;
    };
    annotationStyle: {
        type: ObjectConstructor;
        default: undefined;
    };
    options: {
        type: ObjectConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onSearch?: ((...args: any[]) => any) | undefined;
    onRedact?: ((...args: any[]) => any) | undefined;
    onLoad?: ((...args: any[]) => any) | undefined;
    onError?: ((...args: any[]) => any) | undefined;
    onPageChange?: ((...args: any[]) => any) | undefined;
    onZoomChange?: ((...args: any[]) => any) | undefined;
    onRotate?: ((...args: any[]) => any) | undefined;
    onPrint?: ((...args: any[]) => any) | undefined;
    onDestroy?: ((...args: any[]) => any) | undefined;
    onAnnotationAdd?: ((...args: any[]) => any) | undefined;
    onAnnotationChange?: ((...args: any[]) => any) | undefined;
    onAnnotationRemove?: ((...args: any[]) => any) | undefined;
    onFlatten?: ((...args: any[]) => any) | undefined;
    onFormLoad?: ((...args: any[]) => any) | undefined;
    onFormChange?: ((...args: any[]) => any) | undefined;
    onInit?: ((...args: any[]) => any) | undefined;
}>, {
    renderer: Function | Record<string, any>;
    zoom: string | number;
    rotation: number;
    author: string;
    annotationStyle: Record<string, any>;
    src: string | ArrayBuffer | Record<string, any>;
    adapter: Function | Record<string, any>;
    annotations: boolean;
    tools: unknown[];
    annotationTypes: unknown[];
    options: Record<string, any>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsPdfViewer;
