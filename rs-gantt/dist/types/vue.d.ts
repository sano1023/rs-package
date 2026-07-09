export const RsGantt: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: ObjectConstructor;
        default: undefined;
    };
    tasks: {
        type: ArrayConstructor;
        default: undefined;
    };
    links: {
        type: ArrayConstructor;
        default: undefined;
    };
    calendar: {
        type: ObjectConstructor;
        default: undefined;
    };
    zoom: {
        type: StringConstructor;
        default: undefined;
    };
    autoSchedule: {
        type: BooleanConstructor;
        default: undefined;
    };
    readOnly: {
        type: BooleanConstructor;
        default: undefined;
    };
    criticalPath: {
        type: BooleanConstructor;
        default: undefined;
    };
    defaultLinkType: {
        type: StringConstructor;
        default: undefined;
    };
    footer: {
        type: BooleanConstructor;
        default: undefined;
    };
    columns: {
        type: ArrayConstructor;
        default: undefined;
    };
    ganttColumns: {
        type: ArrayConstructor;
        default: undefined;
    };
    ganttOverlays: {
        type: ArrayConstructor;
        default: undefined;
    };
    resources: {
        type: ArrayConstructor;
        default: undefined;
    };
    progressLine: {
        type: BooleanConstructor;
        default: undefined;
    };
    resourceHistogram: {
        type: BooleanConstructor;
        default: undefined;
    };
    histogramMode: {
        type: StringConstructor;
        default: undefined;
    };
    view: {
        type: StringConstructor;
        default: undefined;
    };
    scheduler: {
        type: ObjectConstructor;
        default: undefined;
    };
    events: {
        type: ArrayConstructor;
        default: undefined;
    };
    gridWidth: {
        type: NumberConstructor;
        default: undefined;
    };
    virtualThreshold: {
        type: NumberConstructor;
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("change" | "update:modelValue" | "init" | "taskClick" | "taskDblClick" | "taskDrop" | "progressChange" | "linkAdd" | "linkClick" | "expand" | "collapse" | "selectionChange" | "eventClick" | "eventDrop" | "eventDblClick" | "eventAdd" | "assignChange" | "viewChange")[], "change" | "update:modelValue" | "init" | "taskClick" | "taskDblClick" | "taskDrop" | "progressChange" | "linkAdd" | "linkClick" | "expand" | "collapse" | "selectionChange" | "eventClick" | "eventDrop" | "eventDblClick" | "eventAdd" | "assignChange" | "viewChange", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: ObjectConstructor;
        default: undefined;
    };
    tasks: {
        type: ArrayConstructor;
        default: undefined;
    };
    links: {
        type: ArrayConstructor;
        default: undefined;
    };
    calendar: {
        type: ObjectConstructor;
        default: undefined;
    };
    zoom: {
        type: StringConstructor;
        default: undefined;
    };
    autoSchedule: {
        type: BooleanConstructor;
        default: undefined;
    };
    readOnly: {
        type: BooleanConstructor;
        default: undefined;
    };
    criticalPath: {
        type: BooleanConstructor;
        default: undefined;
    };
    defaultLinkType: {
        type: StringConstructor;
        default: undefined;
    };
    footer: {
        type: BooleanConstructor;
        default: undefined;
    };
    columns: {
        type: ArrayConstructor;
        default: undefined;
    };
    ganttColumns: {
        type: ArrayConstructor;
        default: undefined;
    };
    ganttOverlays: {
        type: ArrayConstructor;
        default: undefined;
    };
    resources: {
        type: ArrayConstructor;
        default: undefined;
    };
    progressLine: {
        type: BooleanConstructor;
        default: undefined;
    };
    resourceHistogram: {
        type: BooleanConstructor;
        default: undefined;
    };
    histogramMode: {
        type: StringConstructor;
        default: undefined;
    };
    view: {
        type: StringConstructor;
        default: undefined;
    };
    scheduler: {
        type: ObjectConstructor;
        default: undefined;
    };
    events: {
        type: ArrayConstructor;
        default: undefined;
    };
    gridWidth: {
        type: NumberConstructor;
        default: undefined;
    };
    virtualThreshold: {
        type: NumberConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onChange?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onInit?: ((...args: any[]) => any) | undefined;
    onTaskClick?: ((...args: any[]) => any) | undefined;
    onTaskDblClick?: ((...args: any[]) => any) | undefined;
    onTaskDrop?: ((...args: any[]) => any) | undefined;
    onProgressChange?: ((...args: any[]) => any) | undefined;
    onLinkAdd?: ((...args: any[]) => any) | undefined;
    onLinkClick?: ((...args: any[]) => any) | undefined;
    onExpand?: ((...args: any[]) => any) | undefined;
    onCollapse?: ((...args: any[]) => any) | undefined;
    onSelectionChange?: ((...args: any[]) => any) | undefined;
    onEventClick?: ((...args: any[]) => any) | undefined;
    onEventDrop?: ((...args: any[]) => any) | undefined;
    onEventDblClick?: ((...args: any[]) => any) | undefined;
    onEventAdd?: ((...args: any[]) => any) | undefined;
    onAssignChange?: ((...args: any[]) => any) | undefined;
    onViewChange?: ((...args: any[]) => any) | undefined;
}>, {
    footer: boolean;
    view: string;
    virtualThreshold: number;
    calendar: Record<string, any>;
    zoom: string;
    autoSchedule: boolean;
    readOnly: boolean;
    criticalPath: boolean;
    defaultLinkType: string;
    ganttOverlays: unknown[];
    progressLine: boolean;
    resourceHistogram: boolean;
    histogramMode: string;
    scheduler: Record<string, any>;
    events: unknown[];
    modelValue: Record<string, any>;
    tasks: unknown[];
    links: unknown[];
    columns: unknown[];
    ganttColumns: unknown[];
    resources: unknown[];
    gridWidth: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsGantt;
