/**
 * 1質問のフィールドを組み立てる。
 * @param {object} o { q, model, form, registry, onCleanup?(fn), inlineValidate?(name) }
 * @returns {null|{ wrapper, primary, errorEl, typeDef, content, isGroup, inputs }}
 */
export function buildQuestionField(o: object): null | {
    wrapper: any;
    primary: any;
    errorEl: any;
    typeDef: any;
    content: any;
    isGroup: any;
    inputs: any;
};
/** validate 結果を1フィールドに反映する（rsf-invalid クラス・aria-invalid・エラー文言） */
export function applyErrorState(entry: any, messages: any): void;
