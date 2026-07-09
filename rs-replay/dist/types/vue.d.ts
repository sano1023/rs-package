/**
 * セッションレコーダー composable（createRSReplayRecorder）。
 *
 * Recorder は画面を持たない記録エンジンなのでコンポーネント化せず composable にした。
 * マウント時に start()、アンマウント時に stop() → destroy() を呼ぶ。
 * stop() の戻り値でセッションを取得できる（実 API では stop() が recorder を返すため、
 * ここでは stop 後の getSession() をラップして返す。keepSession:false のときは null）。
 *
 * @param {object} options createRSReplayRecorder のオプション（マウント時スナップショット）
 *   maskSelector / ignoreSelector / chunkInterval / chunkEvents / onChunk など
 * @returns 記録操作の集合（recorder ref・start/stop/getSession/addEvent など）
 */
export function useRSReplayRecorder(options?: object): {
    recorder: import("vue").ShallowRef<null, null>;
    instance: () => null;
    start: () => null;
    stop: () => any;
    getSession: () => any;
    getCompressedSession: () => any;
    addEvent: (name: any, data: any) => null;
    on: (name: any, fn: any) => null;
    off: (name: any, fn: any) => null;
};
/**
 * セッションリプレイ・プレイヤー（createRSReplayPlayer）。
 * session は Player 構築時に一度だけ読まれる（setSession は実装に無い）ため、
 * session が変わったときはプレイヤーを作り直す。speed / skipInactive は
 * 実在するセッター（setSpeed / setSkipInactive）で追従する。
 */
export const RsReplayPlayer: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    session: {
        type: (StringConstructor | ObjectConstructor)[];
        required: true;
    };
    speed: {
        type: NumberConstructor;
        default: number;
    };
    autoplay: {
        type: BooleanConstructor;
        default: boolean;
    };
    skipInactive: {
        type: BooleanConstructor;
        default: boolean;
    };
    inactiveThreshold: {
        type: NumberConstructor;
        default: undefined;
    };
    analyze: {
        type: BooleanConstructor;
        default: boolean;
    };
    rageOptions: {
        type: ObjectConstructor;
        default: undefined;
    };
    deadOptions: {
        type: ObjectConstructor;
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("marker" | "play" | "pause" | "seek" | "speed" | "finish" | "skipInactive" | "init")[], "marker" | "play" | "pause" | "seek" | "speed" | "finish" | "skipInactive" | "init", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    session: {
        type: (StringConstructor | ObjectConstructor)[];
        required: true;
    };
    speed: {
        type: NumberConstructor;
        default: number;
    };
    autoplay: {
        type: BooleanConstructor;
        default: boolean;
    };
    skipInactive: {
        type: BooleanConstructor;
        default: boolean;
    };
    inactiveThreshold: {
        type: NumberConstructor;
        default: undefined;
    };
    analyze: {
        type: BooleanConstructor;
        default: boolean;
    };
    rageOptions: {
        type: ObjectConstructor;
        default: undefined;
    };
    deadOptions: {
        type: ObjectConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onMarker?: ((...args: any[]) => any) | undefined;
    onPlay?: ((...args: any[]) => any) | undefined;
    onPause?: ((...args: any[]) => any) | undefined;
    onSeek?: ((...args: any[]) => any) | undefined;
    onSpeed?: ((...args: any[]) => any) | undefined;
    onFinish?: ((...args: any[]) => any) | undefined;
    onSkipInactive?: ((...args: any[]) => any) | undefined;
    onInit?: ((...args: any[]) => any) | undefined;
}>, {
    speed: number;
    skipInactive: boolean;
    autoplay: boolean;
    inactiveThreshold: number;
    analyze: boolean;
    rageOptions: Record<string, any>;
    deadOptions: Record<string, any>;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
/**
 * ヒートマップ・オーバーレイ（createRSHeatmap）。
 * sessions / type / intensity は実在するセッター（setSessions / setType /
 * setIntensity）で追従する。それ以外の見た目オプションはマウント時スナップショット。
 */
export const RsHeatmap: import("vue").DefineComponent<import("vue").ExtractPropTypes<{
    sessions: {
        type: (StringConstructor | ObjectConstructor | ArrayConstructor)[];
        default: () => never[];
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    intensity: {
        type: NumberConstructor;
        default: number;
    };
    radius: {
        type: NumberConstructor;
        default: undefined;
    };
    opacity: {
        type: NumberConstructor;
        default: undefined;
    };
    showControls: {
        type: BooleanConstructor;
        default: boolean;
    };
    showLegend: {
        type: BooleanConstructor;
        default: boolean;
    };
    lookupRoot: {
        type: null;
        default: undefined;
    };
    cell: {
        type: NumberConstructor;
        default: undefined;
    };
    bands: {
        type: NumberConstructor;
        default: undefined;
    };
    maxDepth: {
        type: NumberConstructor;
        default: undefined;
    };
}>, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("init" | "type" | "intensity")[], "init" | "type" | "intensity", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    sessions: {
        type: (StringConstructor | ObjectConstructor | ArrayConstructor)[];
        default: () => never[];
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    intensity: {
        type: NumberConstructor;
        default: number;
    };
    radius: {
        type: NumberConstructor;
        default: undefined;
    };
    opacity: {
        type: NumberConstructor;
        default: undefined;
    };
    showControls: {
        type: BooleanConstructor;
        default: boolean;
    };
    showLegend: {
        type: BooleanConstructor;
        default: boolean;
    };
    lookupRoot: {
        type: null;
        default: undefined;
    };
    cell: {
        type: NumberConstructor;
        default: undefined;
    };
    bands: {
        type: NumberConstructor;
        default: undefined;
    };
    maxDepth: {
        type: NumberConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onInit?: ((...args: any[]) => any) | undefined;
    onType?: ((...args: any[]) => any) | undefined;
    onIntensity?: ((...args: any[]) => any) | undefined;
}>, {
    radius: number;
    opacity: number;
    showControls: boolean;
    showLegend: boolean;
    lookupRoot: any;
    type: string;
    intensity: number;
    sessions: string | unknown[] | Record<string, any>;
    cell: number;
    bands: number;
    maxDepth: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default RsReplayPlayer;
