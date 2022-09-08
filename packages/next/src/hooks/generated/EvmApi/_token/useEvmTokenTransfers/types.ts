import Moralis from "moralis";

type TSDKCall = typeof Moralis.EvmApi._token.getTokenTransfers;
export type TUseEvmTokenTransfersParams = Parameters<TSDKCall>[0];
export type TUseEvmTokenTransfersReturn = ReturnType<NonNullable<Awaited<ReturnType<TSDKCall>>>['toJSON']>;