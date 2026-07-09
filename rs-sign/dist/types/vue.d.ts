/**
 * 手書き署名パッド（createRSSignPad）。
 * modelValue はストロークJSON（encodeStrokes のプレーンオブジェクト）。
 * change のたびに toJSON() を emit し、外から書き戻された値は fromJSON() で反映する。
 * SignPad には readonly / disabled 相当のオプションは実装されていないため用意しない。
 * penColor / minWidth / maxWidth は実 API 同様 instance.options.* を直接更新して追従する
 * （既存ストロークではなく以降の描画に効く）。他のオプションはマウント時スナップショット。
 */
export const RsSignPad: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | ObjectConstructor)[];
        default: null;
    };
    penColor: {
        type: StringConstructor;
        default: undefined;
    };
    minWidth: {
        type: NumberConstructor;
        default: undefined;
    };
    maxWidth: {
        type: NumberConstructor;
        default: undefined;
    };
    pressure: {
        type: BooleanConstructor;
        default: boolean;
    };
    ariaLabel: {
        type: StringConstructor;
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
    hiddenInput: {
        type: (StringConstructor | ObjectConstructor)[];
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "change" | "strokestart" | "strokeend" | "replaystart" | "replayend" | "init")[], "update:modelValue" | "change" | "strokestart" | "strokeend" | "replaystart" | "replayend" | "init", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | ObjectConstructor)[];
        default: null;
    };
    penColor: {
        type: StringConstructor;
        default: undefined;
    };
    minWidth: {
        type: NumberConstructor;
        default: undefined;
    };
    maxWidth: {
        type: NumberConstructor;
        default: undefined;
    };
    pressure: {
        type: BooleanConstructor;
        default: boolean;
    };
    ariaLabel: {
        type: StringConstructor;
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
    hiddenInput: {
        type: (StringConstructor | ObjectConstructor)[];
        default: undefined;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onChange?: ((...args: any[]) => any) | undefined;
    onStrokestart?: ((...args: any[]) => any) | undefined;
    onStrokeend?: ((...args: any[]) => any) | undefined;
    onReplaystart?: ((...args: any[]) => any) | undefined;
    onReplayend?: ((...args: any[]) => any) | undefined;
    onInit?: ((...args: any[]) => any) | undefined;
}>, {
    width: number;
    height: number;
    modelValue: string | Record<string, any>;
    penColor: string;
    minWidth: number;
    maxWidth: number;
    pressure: boolean;
    ariaLabel: string;
    hiddenInput: string | Record<string, any>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
/**
 * 電子印鑑（createRSHanko）。印影 canvas を生成してホストへ差し込むジェネレータ。
 * dpi / font / color / stamps は構築時スナップショット。render オプション
 * （type / name / sizeMm など）はリアクティブで、変わると再描画する。
 * Hanko に破棄メソッドは無いためアンマウントではホストをクリアするだけ。
 */
export const RsHanko: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    dpi: {
        type: NumberConstructor;
        default: number;
    };
    font: {
        type: (StringConstructor | ObjectConstructor)[];
        default: undefined;
    };
    color: {
        type: StringConstructor;
        default: undefined;
    };
    stamps: {
        type: ArrayConstructor;
        default: undefined;
    };
    options: {
        type: ObjectConstructor;
        default: undefined;
    };
    type: {
        type: StringConstructor;
        default: undefined;
    };
    name: {
        type: StringConstructor;
        default: undefined;
    };
    sizeMm: {
        type: NumberConstructor;
        default: undefined;
    };
    seed: {
        type: NumberConstructor;
        default: undefined;
    };
    bleed: {
        type: NumberConstructor;
        default: undefined;
    };
    fade: {
        type: NumberConstructor;
        default: undefined;
    };
    company: {
        type: StringConstructor;
        default: undefined;
    };
    title: {
        type: StringConstructor;
        default: undefined;
    };
    dateFormat: {
        type: StringConstructor;
        default: undefined;
    };
    date: {
        type: (NumberConstructor | DateConstructor | StringConstructor)[];
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "init"[], "init", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    dpi: {
        type: NumberConstructor;
        default: number;
    };
    font: {
        type: (StringConstructor | ObjectConstructor)[];
        default: undefined;
    };
    color: {
        type: StringConstructor;
        default: undefined;
    };
    stamps: {
        type: ArrayConstructor;
        default: undefined;
    };
    options: {
        type: ObjectConstructor;
        default: undefined;
    };
    type: {
        type: StringConstructor;
        default: undefined;
    };
    name: {
        type: StringConstructor;
        default: undefined;
    };
    sizeMm: {
        type: NumberConstructor;
        default: undefined;
    };
    seed: {
        type: NumberConstructor;
        default: undefined;
    };
    bleed: {
        type: NumberConstructor;
        default: undefined;
    };
    fade: {
        type: NumberConstructor;
        default: undefined;
    };
    company: {
        type: StringConstructor;
        default: undefined;
    };
    title: {
        type: StringConstructor;
        default: undefined;
    };
    dateFormat: {
        type: StringConstructor;
        default: undefined;
    };
    date: {
        type: (NumberConstructor | DateConstructor | StringConstructor)[];
        default: undefined;
    };
}>> & Readonly<{
    onInit?: ((...args: any[]) => any) | undefined;
}>, {
    title: string;
    font: string | Record<string, any>;
    color: string;
    type: string;
    name: string;
    dpi: number;
    stamps: unknown[];
    options: Record<string, any>;
    sizeMm: number;
    seed: number;
    bleed: number;
    fade: number;
    company: string;
    dateFormat: string;
    date: string | number | Date;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
/**
 * 文書配置・締結ワークフロー（createRSSign）。
 * pages は構築時にのみ読まれる（setPages は無い）ため構築時スナップショット。
 * mode / zoom は実在するセッター（setMode / setZoom）で追従する。
 * 値の双方向バインドは持たず、イベント（ready/fieldFilled/complete 等）と
 * expose メソッドで扱う。
 */
export const RsSign: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    pages: {
        type: ArrayConstructor;
        default: () => never[];
    };
    mode: {
        type: StringConstructor;
        default: string;
    };
    actor: {
        type: StringConstructor;
        default: undefined;
    };
    signers: {
        type: ArrayConstructor;
        default: undefined;
    };
    signer: {
        type: (NumberConstructor | StringConstructor)[];
        default: undefined;
    };
    zoom: {
        type: NumberConstructor;
        default: number;
    };
    orderMode: {
        type: StringConstructor;
        default: undefined;
    };
    order: {
        type: ArrayConstructor;
        default: undefined;
    };
    deadline: {
        type: (NumberConstructor | DateConstructor | StringConstructor)[];
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("init" | "load" | "ready" | "fieldFilled" | "complete" | "decline" | "sendback" | "modechange")[], "init" | "load" | "ready" | "fieldFilled" | "complete" | "decline" | "sendback" | "modechange", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    pages: {
        type: ArrayConstructor;
        default: () => never[];
    };
    mode: {
        type: StringConstructor;
        default: string;
    };
    actor: {
        type: StringConstructor;
        default: undefined;
    };
    signers: {
        type: ArrayConstructor;
        default: undefined;
    };
    signer: {
        type: (NumberConstructor | StringConstructor)[];
        default: undefined;
    };
    zoom: {
        type: NumberConstructor;
        default: number;
    };
    orderMode: {
        type: StringConstructor;
        default: undefined;
    };
    order: {
        type: ArrayConstructor;
        default: undefined;
    };
    deadline: {
        type: (NumberConstructor | DateConstructor | StringConstructor)[];
        default: undefined;
    };
}>> & Readonly<{
    onInit?: ((...args: any[]) => any) | undefined;
    onLoad?: ((...args: any[]) => any) | undefined;
    onReady?: ((...args: any[]) => any) | undefined;
    onFieldFilled?: ((...args: any[]) => any) | undefined;
    onComplete?: ((...args: any[]) => any) | undefined;
    onDecline?: ((...args: any[]) => any) | undefined;
    onSendback?: ((...args: any[]) => any) | undefined;
    onModechange?: ((...args: any[]) => any) | undefined;
}>, {
    orderMode: string;
    order: unknown[];
    deadline: string | number | Date;
    signers: unknown[];
    mode: string;
    zoom: number;
    signer: string | number;
    pages: unknown[];
    actor: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsSignPad;
