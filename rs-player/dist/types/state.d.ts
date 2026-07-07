/**
 * 1ステップ遷移する。未知の入力は状態維持。
 * @param {string} state 現在状態
 * @param {string} input 正規化された入力イベント
 * @returns {string} 次状態
 */
export function transition(state: string, input: string): string;
/**
 * rs-player 状態機械（DOM非依存・純粋データ）
 *
 * PlayerCore がメディアイベントを正規化した「入力」に変換し、この遷移表に通して状態を更新する。
 * UI 層は statechange イベントの購読のみで描画する（<video> を直接触らない）。
 */
/** プレイヤーの取りうる状態 */
export const STATES: string[];
export namespace TRANSITIONS {
    export namespace idle {
        let load: string;
    }
    export namespace loading {
        export let canplay: string;
        export let play: string;
        export let playing: string;
        export let pause: string;
        export let ended: string;
        export let error: string;
        let load_1: string;
        export { load_1 as load };
    }
    export namespace paused {
        let play_1: string;
        export { play_1 as play };
        let playing_1: string;
        export { playing_1 as playing };
        export let waiting: string;
        let ended_1: string;
        export { ended_1 as ended };
        let error_1: string;
        export { error_1 as error };
        let load_2: string;
        export { load_2 as load };
    }
    export namespace playing_2 {
        let pause_1: string;
        export { pause_1 as pause };
        let waiting_1: string;
        export { waiting_1 as waiting };
        let ended_2: string;
        export { ended_2 as ended };
        let error_2: string;
        export { error_2 as error };
        let load_3: string;
        export { load_3 as load };
    }
    export { playing_2 as playing };
    export namespace ended_3 {
        let play_2: string;
        export { play_2 as play };
        let playing_3: string;
        export { playing_3 as playing };
        export let seek: string;
        let error_3: string;
        export { error_3 as error };
        let load_4: string;
        export { load_4 as load };
    }
    export { ended_3 as ended };
    export namespace error_4 {
        let load_5: string;
        export { load_5 as load };
    }
    export { error_4 as error };
}
