/**
 * データグリッドを生成する。
 * @param {string|HTMLElement} target コンテナ要素
 * @param {object} options { columns, data, height, onChange, onSelect, onSort }
 * @returns {Grid}
 */
export function createRSGrid(target: string | HTMLElement, options?: object): Grid;
export { Grid };
import { Grid } from './grid.js';
