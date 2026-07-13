/** オーバーレイ root を保護対象に加え、背景の inert を再計算する。 */
export function acquireInert(root: any): void;
/** オーバーレイ root を保護対象から外し、背景の inert を再計算する。最後の 1 つで完全復元。 */
export function releaseInert(root: any): void;
/**
 * container 内のフォーカス可能要素を、tabindex="-1" と非表示を除いて DOM 順で返す。
 * @param {HTMLElement} container
 * @returns {HTMLElement[]}
 */
export function getFocusable(container: HTMLElement): HTMLElement[];
export class FocusManager {
    /**
     * @param {HTMLElement} root オーバーレイのルート要素
     * @param {object} [opts]
     * @param {boolean} [opts.inertBackground=true] 背景を inert にするか
     */
    constructor(root: HTMLElement, { inertBackground }?: {
        inertBackground?: boolean | undefined;
    });
    root: HTMLElement;
    doc: Document;
    inertBackground: boolean;
    origin: Element | null;
    _active: boolean;
    /**
     * トラップを開始する。起点要素を記憶し、背景を inert 化し、初期フォーカスを当てる。
     * @param {HTMLElement|null} initialFocus
     * @param {Element|null} origin フォーカス復帰先（省略時は現在の activeElement）
     */
    activate(initialFocus: HTMLElement | null, origin: Element | null): void;
    /**
     * keydown(Tab) を受けてフォーカスを root 内に閉じ込める。
     * @param {KeyboardEvent} e
     */
    handleTab(e: KeyboardEvent): void;
    /**
     * トラップを終了し、背景 inert を戻し、起点へフォーカスを復帰する。
     * @param {boolean} [restoreFocus=true]
     */
    deactivate(restoreFocus?: boolean): void;
}
