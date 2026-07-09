/**
 * 手書き署名パッド（createRSSignPad）。value はストロークJSON。
 * change のたびに toJSON() を onChange へ渡し、value の書き戻しは fromJSON() で反映する。
 * SignPad に readonly / disabled 相当のオプションは無いため用意しない。
 */
export const RsSignPad: React.ForwardRefExoticComponent<React.RefAttributes<any>>;
/**
 * 電子印鑑（createRSHanko）。印影 canvas を生成してホストへ差し込むジェネレータ。
 * dpi / font / color / stamps は構築時スナップショット。render オプションはリアクティブ。
 * Hanko に破棄メソッドは無いためアンマウントではホストをクリアするだけ。
 */
export const RsHanko: React.ForwardRefExoticComponent<React.RefAttributes<any>>;
/**
 * 文書配置・締結ワークフロー（createRSSign）。
 * pages は構築時スナップショット（setPages は無い）。mode / zoom は実在するセッターで追従。
 * 値の双方向は持たず、イベントと imperative ハンドルで扱う。
 */
export const RsSign: React.ForwardRefExoticComponent<React.RefAttributes<any>>;
export default RsSignPad;
import React from 'react';
