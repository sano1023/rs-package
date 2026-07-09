/**
 * rs-pivot 集計 Worker のクライアント（主スレッド側・v0.3）
 *
 * worker.js を module Worker として起動し、init（ストア構築）/ aggregate（集計）を
 * Promise で扱えるようにする薄いラッパ。Worker 非対応環境やロード失敗時は
 * Pivot 側がメインスレッド集計へフォールバックできるよう、失敗を素直に投げる。
 */
export function isWorkerSupported(): boolean;
export class PivotWorkerClient {
    worker: Worker;
    reqId: number;
    pending: Map<any, any>;
    initWaiters: any[];
    _onMessage(msg: any): void;
    _failAll(message: any): void;
    /** ストアを（再）構築する。データ入れ替え時に呼ぶ */
    init(records: any, calculatedFields: any): Promise<any>;
    /** 正規化済みスライスで集計し、serializeResult() のペイロードを返す */
    aggregate(slice: any): Promise<any>;
    terminate(): void;
}
