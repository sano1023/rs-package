/**
 * ダイアグラムを生成する。
 * @param {string|HTMLElement} target セレクタ or 要素
 * @param {object} options nodes / links / grid / palette / contextMenu / readOnly /
 *                         nodeTypes / linkTypes / guides / ariaLabel など
 * @returns {Diagram}
 */
export function createRSDiagram(target: string | HTMLElement, options?: object): Diagram;
import { Diagram } from './diagram.js';
import { defineNodeType } from './define.js';
import { defineLinkType } from './define.js';
import { builtinNodeTypes } from './types/nodes.js';
import { builtinLinkTypes } from './types/links.js';
export { Diagram, defineNodeType, defineLinkType, builtinNodeTypes, builtinLinkTypes };
export { pickImageForNode, fileToDataURL } from "./imagetools.js";
export { snapValue, anchorPoint, boundaryPoint, nodeBounds, contentBounds } from "./geometry.js";
export { routeStraight, routeOrthogonal, pointsToPath, polylinePoint, autoSide } from "./routing.js";
