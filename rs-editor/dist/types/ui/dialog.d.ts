/**
 * rs-editor 簡易ダイアログ
 *
 * openDialog(wrapperEl, options) → Promise
 *   解決値: { values } / { remove: true } / null（キャンセル）
 *
 * options:
 *   title, fields[{name,label,type,value,placeholder,accept,onChange,onInput}]
 *     type: input の type（text / number / color / file …）or 'select'
 *     select は options[{value,label}] を、number は min / max / step を受け付ける
 *     onChange(input, inputs) は change、onInput(input, inputs) は input のたびに呼ばれる
 *   submitLabel / cancelLabel（null で非表示） / removeLabel
 *   body: HTMLElement — タイトル直下に差し込む任意要素（プレビュー等）
 *   modal: false — 背景を暗転させず右上に浮かせる（検索置換など、本文を見ながら使う用）
 *   actions: [{label, className, onAction(values, api)}] — 独自ボタン。
 *     指定時は submit ボタンの代わりに描画され、Promise はボタン側が api.close() を呼ぶまで解決しない。
 *     api = { close(result), values(), setStatus(text) }
 */
export function openDialog(wrapperEl: any, { title, fields, submitLabel, cancelLabel, removeLabel, body, modal, actions, }: {
    title: any;
    fields?: never[] | undefined;
    submitLabel?: string | undefined;
    cancelLabel?: string | undefined;
    removeLabel?: null | undefined;
    body?: null | undefined;
    modal?: boolean | undefined;
    actions?: null | undefined;
}): Promise<any>;
