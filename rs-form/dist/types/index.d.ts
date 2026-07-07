/**
 * 質問タイプ定義のヘルパー（組み込み12タイプもすべてこのAPIで実装されている）。
 * @param {object} def { name, defaults?, group?, render(ctx) }
 */
export function defineQuestionType(def: object): object;
/**
 * フォームを生成する。
 * @param {string|HTMLElement} target セレクタ or 要素
 * @param {object|null} schema フォームスキーマ（素のJSON）
 * @param {object} options オプション
 * @returns {RSForm}
 */
export function createRSForm(target: string | HTMLElement, schema: object | null, options?: object): RSForm;
export class RSForm {
    /**
     * @param {string|HTMLElement} target セレクタ or 要素
     * @param {object|null} schema フォームスキーマ（素のJSON）
     * @param {object} options mode / autosave / storageKey / messages / questionTypes /
     *                         addressLookup / datepicker / submitText / progressBar など
     */
    constructor(target: string | HTMLElement, schema: object | null, options?: object);
    el: Element;
    options: {
        mode: string;
    };
    registry: Map<string, {
        name: string;
        defaults: {};
        render(ctx: any): any;
    }>;
    model: FormModel;
    renderer: StandardRenderer;
    /** 下書きが復元されて開始したか（autosave: true のとき） */
    get restored(): boolean;
    /** 回答JSON（非表示質問は含まない。number は数値・checkbox は配列） */
    getAnswers(): {};
    /** 回答JSONの流し込み（getAnswers とラウンドトリップ保証） */
    setAnswers(answers: any): this;
    /** スキーマJSONを返す（ラウンドトリップ保証） */
    getSchema(): any;
    getValue(name: any): any;
    setValue(name: any, value: any): this;
    isVisible(name: any): boolean;
    /** 手動検証。{ ok, errors: [{ name, pageIndex, messages }] } を返し、エラーをUIに表示する */
    validate(pageIndex?: null): {
        ok: boolean;
        errors: Array<{
            name: any;
            pageIndex: any;
            messages: any;
        }>;
    };
    /** プログラム submit（検証 → OKなら submit イベント発火・下書きクリア） */
    submit(): {
        ok: boolean;
        errors: Array<{
            name: any;
            pageIndex: any;
            messages: any;
        }>;
    };
    nextPage(): {
        ok: boolean;
        errors: Array<{
            name: any;
            pageIndex: any;
            messages: any;
        }>;
    };
    prevPage(): this;
    goToPage(index: any, opts: any): {
        ok: boolean;
        errors: Array<{
            name: any;
            pageIndex: any;
            messages: any;
        }>;
    };
    getProgress(): {
        pageIndex: number;
        pageCount: number;
        percent: number;
    };
    /** 下書き（localStorage）を明示的に消す */
    clearDraft(): this;
    /** 'submit' | 'change' | 'pageChange' | 'visibilityChange' | 'validate' | 'answersChange' */
    on(event: any, cb: any): this;
    off(event: any, cb: any): this;
    destroy(): void;
}
import { FormModel } from './model.js';
import { StandardRenderer } from './renderer-standard.js';
import { defineValidator } from './validators.js';
import { builtinTypes } from './types.js';
import { DEFAULT_MESSAGES } from './validators.js';
export { defineValidator, builtinTypes, FormModel, DEFAULT_MESSAGES };
export { normalizeValue, validateQuestion } from "./validators.js";
export { normalizePostal, normalizeTel, applyCharset, toWareki, toHankakuAlnum, toZenkakuAlnum, hankakuKanaToZenkaku, hiraganaToKatakana, katakanaToHiragana } from "./ja-text.js";
export { compileExpr, parseExpr } from "./expr.js";
