/** URL からダウンロードファイル名を推定する（パス末尾セグメント・クエリ/ハッシュ除去。取れなければ fallback） */
export function filenameFromUrl(url: any, fallback?: string): any;
export { defineUrlImporter };
import { defineUrlImporter } from './contracts.js';
