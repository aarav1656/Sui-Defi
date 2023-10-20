import {normalizeSuiObjectId} from "@mysten/sui.js";
export const DEEPBOOK_PACKAGE_ID = 'https://explorer.sui.io/object/0x000000000000000000000000000000000000000000000000000000000000dee9'
export const CLOCK = normalizeSuiObjectId("0x6");

/**
* @description: Create pool for trading pair
* @param token1 Full coin type of the base asset, eg: "0x3d0d0ce17dcd3b40c2d839d96ce66871ffb40e1154a8dd99af72292b3d10d7fc::wbtc::WBTC"
* @param token2 Full coin type of quote asset, eg: "0x3d0d0ce17dcd3b40c2d839d96ce66871ffb40e1154a8dd99af72292b3d10d7fc::usdt::USDT"
* @param tickSize Minimal Price Change Accuracy of this pool, eg: 10000000
* @param lotSize Minimal Lot Change Accuracy of this pool, eg: 10000
*/
public createPool(
   token1: string,
   token2: string,
   tickSize: number,
   lotSize: number,
): TransactionBlock {
   const txb = new TransactionBlock();
   // 100 sui to create a pool
   const [coin] = txb.splitCoins(txb.gas, [txb.pure(100000000000)]);
   txb.moveCall({
       typeArguments: [token1, token2],
       target: `dee9::clob::create_pool`,
       arguments: [txb.pure(`${tickSize}`), txb.pure(`${lotSize}`), coin],
   });
   txb.setGasBudget(this.gasBudget);
   return txb;
}