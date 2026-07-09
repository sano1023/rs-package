/** SVG要素の文字列を作る */
export function svgIcon(inner: any): string;
/**
 * カスタムボタン定義のヘルパー（組み込みボタンもすべてこのAPIで実装されている）。
 */
export function definePlayerButton(def: any): any;
export namespace ICONS {
    let play: string;
    let pause: string;
    let replay: string;
    let volumeHigh: string;
    let volumeLow: string;
    let volumeMute: string;
    let captions: string;
    let settings: string;
    let pip: string;
    let fullscreen: string;
    let fullscreenExit: string;
    let check: string;
    let chevron: string;
    let back: string;
    let close: string;
    let expand: string;
    let next: string;
    let prev: string;
    let skipNext: string;
    let skipPrev: string;
    let playlist: string;
}
export const BUILTIN_BUTTONS: any[];
declare function resolve(v: any, player: any): any;
import { speakTime } from './format.js';
export { resolve as resolveDef, speakTime };
