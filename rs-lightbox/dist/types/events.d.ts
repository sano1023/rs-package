/**
 * rs-lightbox 小さなイベントエミッタ
 *
 * on(event, cb) は購読解除関数を返す。emit はコールバック内の例外を握りつぶし、
 * 利用者のハンドラが投げても内部の cleanup が止まらないようにする（例外は console.error へ）。
 */
/** @returns {{ on: (event: string, cb: Function) => (() => void), emit: (event: string, ...args: any[]) => void, clear: () => void }} */
export function createEmitter(): {
    on: (event: string, cb: Function) => (() => void);
    emit: (event: string, ...args: any[]) => void;
    clear: () => void;
};
