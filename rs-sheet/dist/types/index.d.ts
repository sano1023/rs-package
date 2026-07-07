/**
 * スプレッドシートを生成する。
 * @param {string|HTMLElement} target セレクタ or 要素
 * @param {object} options data / cells / rows / cols / columnWidths / formats / height / onChange など
 * @returns {RSSheet}
 */
export function createRSSheet(target: string | HTMLElement, options?: object): RSSheet;
import { RSSheet } from './sheet.js';
import { Engine } from './engine.js';
import { SheetModel } from './model.js';
import { defineFunction } from './functions.js';
import { registry } from './functions.js';
import { Matrix } from './functions.js';
import { RSError } from './errors.js';
import { ERR } from './errors.js';
import { isError } from './errors.js';
import { parseFormula } from './parser.js';
import { serialize } from './parser.js';
import { tokenize } from './lexer.js';
import { isFormula } from './lexer.js';
import { normalizeFullwidth } from './lexer.js';
import { evalAst } from './evaluator.js';
import { shiftForCopy } from './transform.js';
import { adjustForStructure } from './transform.js';
import { collectRefs } from './transform.js';
import { formatValue } from './format.js';
import { detectInput } from './format.js';
import { BUILTIN_FORMATS } from './format.js';
import { colToLetter } from './refs.js';
import { letterToCol } from './refs.js';
import { parseA1 } from './refs.js';
import { toA1 } from './refs.js';
import { a1 } from './refs.js';
import { parseRangeA1 } from './refs.js';
import { dateToSerial } from './datetime.js';
import { serialToParts } from './datetime.js';
import { toWareki } from './datetime.js';
export { RSSheet, Engine, SheetModel, defineFunction, registry, Matrix, RSError, ERR, isError, parseFormula, serialize, tokenize, isFormula, normalizeFullwidth, evalAst, shiftForCopy, adjustForStructure, collectRefs, formatValue, detectInput, BUILTIN_FORMATS, colToLetter, letterToCol, parseA1, toA1, a1, parseRangeA1, dateToSerial, serialToParts, toWareki };
