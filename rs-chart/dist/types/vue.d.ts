export const RsChart: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    type: {
        type: StringConstructor;
        default: undefined;
    };
    series: {
        type: ArrayConstructor;
        default: undefined;
    };
    xAxis: {
        type: ObjectConstructor;
        default: undefined;
    };
    yAxis: {
        type: (ArrayConstructor | ObjectConstructor)[];
        default: undefined;
    };
    legend: {
        type: ObjectConstructor;
        default: undefined;
    };
    tooltip: {
        type: ObjectConstructor;
        default: undefined;
    };
    colors: {
        type: ArrayConstructor;
        default: undefined;
    };
    chartTypes: {
        type: ArrayConstructor;
        default: undefined;
    };
    renderer: {
        type: StringConstructor;
        default: undefined;
    };
    title: {
        type: StringConstructor;
        default: undefined;
    };
    annotations: {
        type: ArrayConstructor;
        default: undefined;
    };
    zoom: {
        type: (ObjectConstructor | BooleanConstructor)[];
        default: undefined;
    };
    navigator: {
        type: (ObjectConstructor | BooleanConstructor)[];
        default: undefined;
    };
    rangeSelector: {
        type: (ObjectConstructor | BooleanConstructor)[];
        default: undefined;
    };
    crosshair: {
        type: (ObjectConstructor | BooleanConstructor)[];
        default: undefined;
    };
    stacked: {
        type: (StringConstructor | BooleanConstructor)[];
        default: undefined;
    };
    animation: {
        type: (ObjectConstructor | BooleanConstructor)[];
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("hover" | "zoom" | "init" | "render" | "legendToggle" | "pointClick")[], "hover" | "zoom" | "init" | "render" | "legendToggle" | "pointClick", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: StringConstructor;
        default: undefined;
    };
    series: {
        type: ArrayConstructor;
        default: undefined;
    };
    xAxis: {
        type: ObjectConstructor;
        default: undefined;
    };
    yAxis: {
        type: (ArrayConstructor | ObjectConstructor)[];
        default: undefined;
    };
    legend: {
        type: ObjectConstructor;
        default: undefined;
    };
    tooltip: {
        type: ObjectConstructor;
        default: undefined;
    };
    colors: {
        type: ArrayConstructor;
        default: undefined;
    };
    chartTypes: {
        type: ArrayConstructor;
        default: undefined;
    };
    renderer: {
        type: StringConstructor;
        default: undefined;
    };
    title: {
        type: StringConstructor;
        default: undefined;
    };
    annotations: {
        type: ArrayConstructor;
        default: undefined;
    };
    zoom: {
        type: (ObjectConstructor | BooleanConstructor)[];
        default: undefined;
    };
    navigator: {
        type: (ObjectConstructor | BooleanConstructor)[];
        default: undefined;
    };
    rangeSelector: {
        type: (ObjectConstructor | BooleanConstructor)[];
        default: undefined;
    };
    crosshair: {
        type: (ObjectConstructor | BooleanConstructor)[];
        default: undefined;
    };
    stacked: {
        type: (StringConstructor | BooleanConstructor)[];
        default: undefined;
    };
    animation: {
        type: (ObjectConstructor | BooleanConstructor)[];
        default: undefined;
    };
}>> & Readonly<{
    onHover?: ((...args: any[]) => any) | undefined;
    onZoom?: ((...args: any[]) => any) | undefined;
    onInit?: ((...args: any[]) => any) | undefined;
    onRender?: ((...args: any[]) => any) | undefined;
    onLegendToggle?: ((...args: any[]) => any) | undefined;
    onPointClick?: ((...args: any[]) => any) | undefined;
}>, {
    title: string;
    legend: Record<string, any>;
    series: unknown[];
    xAxis: Record<string, any>;
    zoom: boolean | Record<string, any>;
    yAxis: Record<string, any> | unknown[];
    type: string;
    tooltip: Record<string, any>;
    colors: unknown[];
    chartTypes: unknown[];
    renderer: string;
    annotations: unknown[];
    navigator: boolean | Record<string, any>;
    rangeSelector: boolean | Record<string, any>;
    crosshair: boolean | Record<string, any>;
    stacked: string | boolean;
    animation: boolean | Record<string, any>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export const RsDashboard: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    columns: {
        type: NumberConstructor;
        default: undefined;
    };
    gap: {
        type: NumberConstructor;
        default: undefined;
    };
    sync: {
        type: ObjectConstructor;
        default: undefined;
    };
    items: {
        type: ArrayConstructor;
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "init"[], "init", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    columns: {
        type: NumberConstructor;
        default: undefined;
    };
    gap: {
        type: NumberConstructor;
        default: undefined;
    };
    sync: {
        type: ObjectConstructor;
        default: undefined;
    };
    items: {
        type: ArrayConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onInit?: ((...args: any[]) => any) | undefined;
}>, {
    columns: number;
    gap: number;
    sync: Record<string, any>;
    items: unknown[];
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsChart;
