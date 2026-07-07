/**
 * Before/After スライダーを生成する。
 * @param {string|HTMLElement} target コンテナ要素
 * @param {object} options
 *   - before / after: URL文字列 | {src, alt} | HTMLElement（canvas等もOK）
 *   - direction: 'horizontal'（既定） | 'vertical'
 *   - position: 初期位置 %（既定 50）
 *   - labels: { before, after } | false
 *   - hover: true でマウス追従（ドラッグ不要）
 *   - clickToMove: false でトラッククリック無効
 *   - onChange: (position) => {}
 * @returns {BASlider}
 */
export function createRSBASlider(target: string | HTMLElement, options?: object): BASlider;
export { BASlider };
import { BASlider } from './baslider.js';
