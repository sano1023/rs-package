/**
 * ライブカメラを生成する。
 * @param {object} options { mode, smooth, brightness, saturate, background,
 *   segmentation, tracking, avatar, width, height, fps, facingMode, onError... }
 * @returns {LiveCam}
 */
export function createRSLiveCam(options?: object): LiveCam;
import { LiveCam } from './livecam.js';
import { drawAvatar } from './avatar.js';
import { selfieSegAdapter } from './adapters.js';
import { faceMeshAdapter } from './adapters.js';
import { landmarksToRig } from './adapters.js';
export { LiveCam, drawAvatar, selfieSegAdapter, faceMeshAdapter, landmarksToRig };
