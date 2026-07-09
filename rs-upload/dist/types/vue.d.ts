export const RsUpload: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    transport: {
        type: (ObjectConstructor | FunctionConstructor)[];
        default: undefined;
    };
    accept: {
        type: (StringConstructor | ArrayConstructor)[];
        default: undefined;
    };
    maxSize: {
        type: NumberConstructor;
        default: undefined;
    };
    maxFiles: {
        type: NumberConstructor;
        default: undefined;
    };
    minImageSize: {
        type: ObjectConstructor;
        default: undefined;
    };
    parallel: {
        type: NumberConstructor;
        default: undefined;
    };
    retry: {
        type: ObjectConstructor;
        default: undefined;
    };
    preprocess: {
        type: ArrayConstructor;
        default: undefined;
    };
    hiddenInput: {
        type: (StringConstructor | ObjectConstructor)[];
        default: undefined;
    };
    paste: {
        type: (StringConstructor | BooleanConstructor)[];
        default: undefined;
    };
    multiple: {
        type: BooleanConstructor;
        default: undefined;
    };
    autoStart: {
        type: BooleanConstructor;
        default: undefined;
    };
    view: {
        type: StringConstructor;
        default: undefined;
    };
    camera: {
        type: (BooleanConstructor | ObjectConstructor)[];
        default: undefined;
    };
    edit: {
        type: (BooleanConstructor | ObjectConstructor)[];
        default: undefined;
    };
    pdfRenderer: {
        type: (ObjectConstructor | FunctionConstructor)[];
        default: undefined;
    };
    videoPreview: {
        type: BooleanConstructor;
        default: undefined;
    };
    previewSize: {
        type: NumberConstructor;
        default: undefined;
    };
    locale: {
        type: StringConstructor;
        default: undefined;
    };
    texts: {
        type: ObjectConstructor;
        default: undefined;
    };
    meta: {
        type: ObjectConstructor;
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("progress" | "ready" | "fileAdded" | "fileRejected" | "fileStart" | "fileProgress" | "fileDone" | "fileError" | "fileCanceled" | "fileRemoved" | "fileReplaced" | "allDone" | "change")[], "progress" | "ready" | "fileAdded" | "fileRejected" | "fileStart" | "fileProgress" | "fileDone" | "fileError" | "fileCanceled" | "fileRemoved" | "fileReplaced" | "allDone" | "change", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    transport: {
        type: (ObjectConstructor | FunctionConstructor)[];
        default: undefined;
    };
    accept: {
        type: (StringConstructor | ArrayConstructor)[];
        default: undefined;
    };
    maxSize: {
        type: NumberConstructor;
        default: undefined;
    };
    maxFiles: {
        type: NumberConstructor;
        default: undefined;
    };
    minImageSize: {
        type: ObjectConstructor;
        default: undefined;
    };
    parallel: {
        type: NumberConstructor;
        default: undefined;
    };
    retry: {
        type: ObjectConstructor;
        default: undefined;
    };
    preprocess: {
        type: ArrayConstructor;
        default: undefined;
    };
    hiddenInput: {
        type: (StringConstructor | ObjectConstructor)[];
        default: undefined;
    };
    paste: {
        type: (StringConstructor | BooleanConstructor)[];
        default: undefined;
    };
    multiple: {
        type: BooleanConstructor;
        default: undefined;
    };
    autoStart: {
        type: BooleanConstructor;
        default: undefined;
    };
    view: {
        type: StringConstructor;
        default: undefined;
    };
    camera: {
        type: (BooleanConstructor | ObjectConstructor)[];
        default: undefined;
    };
    edit: {
        type: (BooleanConstructor | ObjectConstructor)[];
        default: undefined;
    };
    pdfRenderer: {
        type: (ObjectConstructor | FunctionConstructor)[];
        default: undefined;
    };
    videoPreview: {
        type: BooleanConstructor;
        default: undefined;
    };
    previewSize: {
        type: NumberConstructor;
        default: undefined;
    };
    locale: {
        type: StringConstructor;
        default: undefined;
    };
    texts: {
        type: ObjectConstructor;
        default: undefined;
    };
    meta: {
        type: ObjectConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onProgress?: ((...args: any[]) => any) | undefined;
    onReady?: ((...args: any[]) => any) | undefined;
    onFileAdded?: ((...args: any[]) => any) | undefined;
    onFileRejected?: ((...args: any[]) => any) | undefined;
    onFileStart?: ((...args: any[]) => any) | undefined;
    onFileProgress?: ((...args: any[]) => any) | undefined;
    onFileDone?: ((...args: any[]) => any) | undefined;
    onFileError?: ((...args: any[]) => any) | undefined;
    onFileCanceled?: ((...args: any[]) => any) | undefined;
    onFileRemoved?: ((...args: any[]) => any) | undefined;
    onFileReplaced?: ((...args: any[]) => any) | undefined;
    onAllDone?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
}>, {
    transport: Function | Record<string, any>;
    parallel: number;
    retry: Record<string, any>;
    preprocess: unknown[];
    meta: Record<string, any>;
    autoStart: boolean;
    texts: Record<string, any>;
    view: string;
    camera: boolean | Record<string, any>;
    videoPreview: boolean;
    pdfRenderer: Function | Record<string, any>;
    previewSize: number;
    hiddenInput: string | Record<string, any>;
    accept: string | unknown[];
    maxSize: number;
    maxFiles: number;
    minImageSize: Record<string, any>;
    paste: string | boolean;
    multiple: boolean;
    edit: boolean | Record<string, any>;
    locale: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsUpload;
