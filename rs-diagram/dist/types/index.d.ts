/**
 * ダイアグラムを生成する。
 * @param {string|HTMLElement} target セレクタ or 要素
 * @param {object} options nodes / links / grid / palette / contextMenu / readOnly /
 *                         nodeTypes / linkTypes / guides / ariaLabel など
 * @returns {Diagram}
 */
export function createRSDiagram(target: string | HTMLElement, options?: object): Diagram;
export { commandOps } from "./changestream.js";
import { Diagram } from './diagram.js';
import { defineNodeType } from './define.js';
import { defineLinkType } from './define.js';
import { builtinNodeTypes } from './types/nodes.js';
import { builtinLinkTypes } from './types/links.js';
export { Diagram, defineNodeType, defineLinkType, builtinNodeTypes, builtinLinkTypes };
export { pickImageForNode, fileToDataURL } from "./imagetools.js";
export { snapValue, anchorPoint, boundaryPoint, nodeBounds, contentBounds } from "./geometry.js";
export { routeStraight, routeOrthogonal, routeBezier, routeOrthogonalAvoid, pointsToPath, bezierPath, polylinePoint, autoSide, segmentHitsRect } from "./routing.js";
export { computeLayout, layoutTree, layoutLayered, layoutGrid, layoutRadial, LAYOUT_NAMES } from "./layout.js";
export { templates, getTemplate, expandTemplate, TEMPLATE_NAMES, templateNodeTypes } from "./templates.js";
export { portPoint, resolvePorts, portFraction, fractionSide } from "./ports.js";
export { isGroup, childrenOf, descendantIds, parentOf, fitBounds } from "./groups.js";
export { viewportRect, rectVisible, spanBounds, visibleIdSet, diffKeys, changedKeys } from "./virtualize.js";
export { defineChartNode, chartFallbackBars, firstSeriesValues, chartOptionsFor, destroyEmbed } from "./integrations/rs-chart.js";
export { makeRSImagePicker, resolveImageEditFlow } from "./integrations/rs-image.js";
export { buildFamilyTree, familyUnions, familyGenerations, familyIndex, formatYears, sampleFamily, makeRandomFamily, familyPerson, familyUnion, FAMILY_LAYOUT } from "./familytree.js";
