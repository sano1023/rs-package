/**
 * Animate text in an element.
 *
 * @param {string|HTMLElement} target
 * @param {object} [options]
 * @returns {{start: Function, pause: Function, resume: Function, replay: Function, finish: Function, next: Function, setText: Function, destroy: Function}}
 */
export function createRSTextAnimation(target: string | HTMLElement, options?: object): {
    start: Function;
    pause: Function;
    resume: Function;
    replay: Function;
    finish: Function;
    next: Function;
    setText: Function;
    destroy: Function;
};
export const VERSION: "0.1.0";
