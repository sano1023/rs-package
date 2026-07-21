export function toKatakana(value: any): string;
/**
 * Keep a Katakana field in sync with an IME-entered name.
 *
 * @param {string|HTMLInputElement|HTMLTextAreaElement} sourceTarget Name field.
 * @param {string|HTMLInputElement|HTMLTextAreaElement} kanaTarget Katakana field.
 * @param {object} [options]
 * @returns {{reset: Function, setReading: Function, getState: Function, destroy: Function}}
 */
export function createRSKana(sourceTarget: string | HTMLInputElement | HTMLTextAreaElement, kanaTarget: string | HTMLInputElement | HTMLTextAreaElement, options?: object): {
    reset: Function;
    setReading: Function;
    getState: Function;
    destroy: Function;
};
export const VERSION: "0.1.0";
