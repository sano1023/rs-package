/**
 * keydown イベント（相当のオブジェクト）をアクションに解決する。
 * Ctrl / Meta / Alt との同時押しはブラウザ既定を優先して無視する。
 * @param {{key: string, ctrlKey?: boolean, metaKey?: boolean, altKey?: boolean}} ev
 * @returns {{action: string, value?: number} | null}
 */
export function resolveHotkey(ev: {
    key: string;
    ctrlKey?: boolean;
    metaKey?: boolean;
    altKey?: boolean;
}): {
    action: string;
    value?: number;
} | null;
/**
 * ショートカットを無効化すべきターゲットか（入力欄フォーカス中など）。
 * @param {{tagName?: string, isContentEditable?: boolean}} target
 */
export function isTypingTarget(target: {
    tagName?: string;
    isContentEditable?: boolean;
}): boolean;
/**
 * rs-player YouTube互換キーボードショートカット表（DOM非依存の純粋データ + 解決関数）
 *
 * action は PlayerCore / Player のメソッド名に対応する論理名。
 * UI 層はコンテナの keydown を resolveHotkey() に通すだけでよい。
 */
/** ショートカット定義（keys は小文字で照合する） */
export const HOTKEYS: ({
    keys: string[];
    action: string;
    label: string;
    value?: undefined;
} | {
    keys: string[];
    action: string;
    value: number;
    label: string;
})[];
