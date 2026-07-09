/**
 * 1質問が正解かどうか。採点対象でない（correctAnswer 未設定）は null を返す。
 * @returns {boolean|null}
 */
export function isCorrect(q: any, value: any): boolean | null;
/**
 * 1質問の採点。
 * @returns {{ name, graded:boolean, correct?:boolean, points?:number, earned?:number, value?, correctAnswer? }}
 */
export function gradeQuestion(q: any, value: any): {
    name: any;
    graded: boolean;
    correct?: boolean;
    points?: number;
    earned?: number;
    value?: any;
    correctAnswer?: any;
};
/**
 * 回答JSONを採点する。
 * @param {Array} questions フラットな質問定義配列（model.questions 相当）
 * @param {object} answers 回答JSON（name → 値）
 * @param {object} options { passingScore?, passingPercent? }（quiz スキーマの scoring）
 * @returns {{ score, maxScore, percent, correctCount, total, passed:boolean|null, details:Array }}
 */
export function gradeAnswers(questions: any[], answers: object, options?: object): {
    score: any;
    maxScore: any;
    percent: any;
    correctCount: any;
    total: any;
    passed: boolean | null;
    details: any[];
};
/** スキーマから採点設定を取り出す（scoring オブジェクト or quiz:true）。採点しないなら null */
export function scoringConfig(schema: any): any;
/**
 * 採点結果パネルの DOM を組み立てる（renderer から使う）。document を使うため node からは呼ばない。
 * @param {object} grade gradeAnswers の戻り値
 * @param {object} opt { showCorrectness?, labels? }
 * @returns {HTMLElement}
 */
export function buildResultPanel(grade: object, opt?: object): HTMLElement;
