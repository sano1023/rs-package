/** ひらがな・カタカナ・長音・空白のみで構成されるか（＝まだ変換されていない読み） */
export function isKanaOnly(s: any): boolean;
/**
 * text/textarea 入力に「ふりがな自動収集」を配線する。
 * ctx.q.kanaTo に転記先の質問name、任意で ctx.q.kanaCharset（'hiragana' | 'katakana'）。
 * 転記先質問に charset があればそれを優先する。
 * @returns {() => void} 解除関数
 */
export function attachKanaSource(input: any, ctx: any): () => void;
/**
 * composition イベント列から「変換前の読み」を取り出す純粋なステートマシン。
 *   start()        変換開始
 *   update(data)   compositionupdate の data（かなのうちだけ保持し、漢字変換後は無視する）
 *   end(data)      compositionend の data。確定した読みを返し内部に積む
 *   consume()      積んだ読みを取り出してクリアする
 */
export class KanaCollector {
    reset(): void;
    _pending: any;
    _reading: string | undefined;
    start(): void;
    update(data: any): void;
    /** @returns {string} この変換で確定した読み */
    end(data: any): string;
    /** 積み上げた読みを取り出してクリアする */
    consume(): string | undefined;
}
