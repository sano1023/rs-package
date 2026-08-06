/**
 * rs-select 小さなイベントエミッタ
 *
 * on(event, cb) は購読解除関数を返す。emit はコールバック内の例外を握りつぶし、
 * 利用者のハンドラが投げても内部の cleanup が止まらないようにする（例外は console.error へ）。
 */
/** @returns {{ on: Function, emit: Function, clear: Function }} */
export function createEmitter(): {
    on: Function;
    emit: Function;
    clear: Function;
};
