/**
 * HTML文字列を浄化して文字列で返す。
 * extraTags: プラグインが追加する許可タグ（{ tag: [attr, ...] }）
 */
export function sanitizeHTML(html: any, extraTags: any): string;
/** プレーンテキストを段落HTMLへ（空行=段落区切り、単改行=<br>） */
export function textToHTML(text: any): string;
