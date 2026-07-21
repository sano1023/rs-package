export const RsDatePicker: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | DateConstructor | ArrayConstructor | ObjectConstructor)[];
        default: null;
    };
    mode: {
        type: StringConstructor;
        default: undefined;
    };
    months: {
        type: NumberConstructor;
        default: undefined;
    };
    inline: {
        type: BooleanConstructor;
        default: undefined;
    };
    showTime: {
        type: BooleanConstructor;
        default: undefined;
    };
    timeStep: {
        type: NumberConstructor;
        default: undefined;
    };
    firstDay: {
        type: NumberConstructor;
        default: undefined;
    };
    format: {
        type: StringConstructor;
        default: undefined;
    };
    locale: {
        type: ObjectConstructor;
        default: undefined;
    };
    markers: {
        type: ArrayConstructor;
        default: undefined;
    };
    rangeColors: {
        type: ObjectConstructor;
        default: undefined;
    };
    minDate: {
        type: (StringConstructor | DateConstructor)[];
        default: undefined;
    };
    maxDate: {
        type: (StringConstructor | DateConstructor)[];
        default: undefined;
    };
    disabledDates: {
        type: (ArrayConstructor | FunctionConstructor)[];
        default: undefined;
    };
    name: {
        type: StringConstructor;
        default: undefined;
    };
    hiddenNames: {
        type: ObjectConstructor;
        default: undefined;
    };
    hiddenFormat: {
        type: StringConstructor;
        default: undefined;
    };
    renderDay: {
        type: FunctionConstructor;
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change" | "open" | "close" | "init")[], "update:modelValue" | "change" | "open" | "close" | "init", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | DateConstructor | ArrayConstructor | ObjectConstructor)[];
        default: null;
    };
    mode: {
        type: StringConstructor;
        default: undefined;
    };
    months: {
        type: NumberConstructor;
        default: undefined;
    };
    inline: {
        type: BooleanConstructor;
        default: undefined;
    };
    showTime: {
        type: BooleanConstructor;
        default: undefined;
    };
    timeStep: {
        type: NumberConstructor;
        default: undefined;
    };
    firstDay: {
        type: NumberConstructor;
        default: undefined;
    };
    format: {
        type: StringConstructor;
        default: undefined;
    };
    locale: {
        type: ObjectConstructor;
        default: undefined;
    };
    markers: {
        type: ArrayConstructor;
        default: undefined;
    };
    rangeColors: {
        type: ObjectConstructor;
        default: undefined;
    };
    minDate: {
        type: (StringConstructor | DateConstructor)[];
        default: undefined;
    };
    maxDate: {
        type: (StringConstructor | DateConstructor)[];
        default: undefined;
    };
    disabledDates: {
        type: (ArrayConstructor | FunctionConstructor)[];
        default: undefined;
    };
    name: {
        type: StringConstructor;
        default: undefined;
    };
    hiddenNames: {
        type: ObjectConstructor;
        default: undefined;
    };
    hiddenFormat: {
        type: StringConstructor;
        default: undefined;
    };
    renderDay: {
        type: FunctionConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onOpen?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
    onInit?: ((...args: any[]) => any) | undefined;
}>, {
    format: string;
    locale: Record<string, any>;
    mode: string;
    inline: boolean;
    months: number;
    firstDay: number;
    minDate: string | Date;
    maxDate: string | Date;
    disabledDates: Function | unknown[];
    markers: unknown[];
    rangeColors: Record<string, any>;
    renderDay: Function;
    modelValue: string | Date | unknown[] | Record<string, any>;
    showTime: boolean;
    timeStep: number;
    name: string;
    hiddenNames: Record<string, any>;
    hiddenFormat: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export const RsDateSelect: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | DateConstructor)[];
        default: null;
    };
    name: {
        type: StringConstructor;
        default: undefined;
    };
    format: {
        type: StringConstructor;
        default: undefined;
    };
    labels: {
        type: ObjectConstructor;
        default: undefined;
    };
    yearRange: {
        type: ObjectConstructor;
        default: undefined;
    };
    order: {
        type: StringConstructor;
        default: undefined;
    };
    chain: {
        type: BooleanConstructor;
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change" | "init")[], "update:modelValue" | "change" | "init", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | DateConstructor)[];
        default: null;
    };
    name: {
        type: StringConstructor;
        default: undefined;
    };
    format: {
        type: StringConstructor;
        default: undefined;
    };
    labels: {
        type: ObjectConstructor;
        default: undefined;
    };
    yearRange: {
        type: ObjectConstructor;
        default: undefined;
    };
    order: {
        type: StringConstructor;
        default: undefined;
    };
    chain: {
        type: BooleanConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onInit?: ((...args: any[]) => any) | undefined;
}>, {
    labels: Record<string, any>;
    format: string;
    chain: boolean;
    yearRange: Record<string, any>;
    order: string;
    modelValue: string | Date;
    name: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export const RsSchedulePicker: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: ObjectConstructor;
        default: null;
    };
    name: {
        type: StringConstructor;
        default: undefined;
    };
    months: {
        type: NumberConstructor;
        default: undefined;
    };
    timeStep: {
        type: NumberConstructor;
        default: undefined;
    };
    timePresets: {
        type: ArrayConstructor;
        default: undefined;
    };
    showTime: {
        type: BooleanConstructor;
        default: undefined;
    };
    showSummary: {
        type: BooleanConstructor;
        default: undefined;
    };
    minDate: {
        type: (StringConstructor | DateConstructor)[];
        default: undefined;
    };
    maxDate: {
        type: (StringConstructor | DateConstructor)[];
        default: undefined;
    };
    disabledDates: {
        type: (ArrayConstructor | FunctionConstructor)[];
        default: undefined;
    };
    markers: {
        type: ArrayConstructor;
        default: undefined;
    };
    rangeColors: {
        type: ObjectConstructor;
        default: undefined;
    };
    renderDay: {
        type: FunctionConstructor;
        default: undefined;
    };
    firstDay: {
        type: NumberConstructor;
        default: undefined;
    };
    locale: {
        type: ObjectConstructor;
        default: undefined;
    };
    hiddenFormat: {
        type: StringConstructor;
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change" | "init")[], "update:modelValue" | "change" | "init", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: ObjectConstructor;
        default: null;
    };
    name: {
        type: StringConstructor;
        default: undefined;
    };
    months: {
        type: NumberConstructor;
        default: undefined;
    };
    timeStep: {
        type: NumberConstructor;
        default: undefined;
    };
    timePresets: {
        type: ArrayConstructor;
        default: undefined;
    };
    showTime: {
        type: BooleanConstructor;
        default: undefined;
    };
    showSummary: {
        type: BooleanConstructor;
        default: undefined;
    };
    minDate: {
        type: (StringConstructor | DateConstructor)[];
        default: undefined;
    };
    maxDate: {
        type: (StringConstructor | DateConstructor)[];
        default: undefined;
    };
    disabledDates: {
        type: (ArrayConstructor | FunctionConstructor)[];
        default: undefined;
    };
    markers: {
        type: ArrayConstructor;
        default: undefined;
    };
    rangeColors: {
        type: ObjectConstructor;
        default: undefined;
    };
    renderDay: {
        type: FunctionConstructor;
        default: undefined;
    };
    firstDay: {
        type: NumberConstructor;
        default: undefined;
    };
    locale: {
        type: ObjectConstructor;
        default: undefined;
    };
    hiddenFormat: {
        type: StringConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onInit?: ((...args: any[]) => any) | undefined;
}>, {
    locale: Record<string, any>;
    months: number;
    firstDay: number;
    minDate: string | Date;
    maxDate: string | Date;
    disabledDates: Function | unknown[];
    markers: unknown[];
    rangeColors: Record<string, any>;
    renderDay: Function;
    modelValue: Record<string, any>;
    showTime: boolean;
    timeStep: number;
    name: string;
    hiddenFormat: string;
    timePresets: unknown[];
    showSummary: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsDatePicker;
