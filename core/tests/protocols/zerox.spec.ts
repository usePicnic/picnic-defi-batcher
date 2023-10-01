import { expect, test } from "vitest";
import { AssetStore } from "src/transaction/types";
import { getProvider } from "src/utils/get-provider";
import { simulateAssetSwapTransaction } from "src/path/tx-simulator";
import { ZeroX } from "src/path/exchanges";

test("ZeroX: PAX Gold to MAI", async () => {
  const assetStore = new AssetStore();

  const provider = await getProvider({ chainId: 137 });

  await assetStore.cachePricesAndLinkedAssets({
    allocation: [
      { assetId: "24baf9c9-953e-4f2d-8859-b6c5b3c06217", fraction: 1 },
      { assetId: "c5129108-4b4d-4aa2-b75b-9d4348bd1678", fraction: 1 },
    ],
    provider,
    assetStore,
  });

  const swappedValue = await simulateAssetSwapTransaction({
    chainId: 137,
    provider,
    routes: [
      {
        fraction: 1,
        exchange: new ZeroX(),
        fromToken: "0x553d3D295e0f695B9228246232eDF400ed3560B5",
        toToken: "0xa3Fa99A148fA48D14Ed51d610c367C61876997F1",
        params: {
          zeroXAddress: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
          approveAddress: "0xdef1c0ded9bec7f1a1670819833240f027b25eff",
          data: "0x415565b0000000000000000000000000553d3d295e0f695b9228246232edf400ed3560b5000000000000000000000000a3fa99a148fa48d14ed51d610c367c61876997f10000000000000000000000000000000000000000000000000c7d713b49da00000000000000000000000000000000000000000000000000676c5f8d9cddb9b25800000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000042000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000038000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000553d3d295e0f695b9228246232edf400ed3560b5000000000000000000000000a3fa99a148fa48d14ed51d610c367c61876997f100000000000000000000000000000000000000000000000000000000000001400000000000000000000000000000000000000000000000000000000000000340000000000000000000000000000000000000000000000000000000000000034000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000c7d713b49da0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003400000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000012556e69737761705633000000000000000000000000000000000000000000000000000000000000000c7d713b49da00000000000000000000000000000000000000000000000000676c5f8d9cddb9b258000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000e592427a0aece92de3edee1f18e0157c05861564000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000042553d3d295e0f695b9228246232edf400ed3560b5000bb82791bca1f2de4661ed88a30c99a7a9449aa841740001f4a3fa99a148fa48d14ed51d610c367c61876997f1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000553d3d295e0f695b9228246232edf400ed3560b5000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000000000000000000869584cd000000000000000000000000100000000000000000000000000000000000001100000000000000000000000000000000f0d0d9c4adc22a446c739b50dba221cf",
        },
      },
    ],
    sellAsset: assetStore.getAssetById("24baf9c9-953e-4f2d-8859-b6c5b3c06217"),
    amountIn: "1000000000000000000",
    buyAsset: assetStore.getAssetById("c5129108-4b4d-4aa2-b75b-9d4348bd1678"),
  });

  console.log({ swappedValue });
  expect(swappedValue).toBeGreaterThan(0);
});
