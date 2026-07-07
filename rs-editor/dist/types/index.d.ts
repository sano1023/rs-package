/**
 * エディタを生成する。
 * @param {string|HTMLElement} target セレクタ or 要素（textarea / div）
 * @param {object} config toolbar / plugins / placeholder / readonly / onChange など
 * @returns {Editor}
 */
export function createRSEditor(target: string | HTMLElement, config?: object): Editor;
/** 標準機能一式（すべて通常のプラグインとして実装されている） */
export const builtinPlugins: any[];
import { Editor } from './editor.js';
import { definePlugin } from './editor.js';
import { DEFAULT_TOOLBAR } from './editor.js';
export { Editor, definePlugin, DEFAULT_TOOLBAR };
