import { EndpointResolver } from '@moralisweb3/api-utils';
import MoralisCore, { AuthErrorCode, MoralisAuthError } from '@moralisweb3/core';
import { BASE_URL } from '../MoralisAuth';
import { completeChallengeEvm, completeChallengeSol } from '../resolvers';
import { AuthNetworkType } from '../utils/AuthNetworkType';

export interface VerifyEvmOptions {
  networkType?: 'evm';
  /**
   * @deprecared use networkType instead
   */
  network?: 'evm';
  message: string;
  signature: string;
}

export interface VerifySolOptions {
  networkType: 'solana';
  /**
   * @deprecared use networkType instead
   */
  network?: 'solana';
  message: string;
  signature: string;
}

export type VerifyOptions = VerifyEvmOptions | VerifySolOptions;

export type VerifyEvmData = ReturnType<typeof makeEvmVerify>;
export type VerifySolData = ReturnType<typeof makeSolVerify>;

const makeEvmVerify = (core: MoralisCore, { networkType, network, ...options }: VerifyEvmOptions) => {
  return EndpointResolver.create(core, BASE_URL, completeChallengeEvm).fetch({
    message: options.message,
    signature: options.signature,
  });
};

const makeSolVerify = (core: MoralisCore, { networkType, network, ...options }: VerifySolOptions) => {
  return EndpointResolver.create(core, BASE_URL, completeChallengeSol).fetch({
    message: options.message,
    signature: options.signature,
  });
};

export const makeVerify = (core: MoralisCore) => async (options: VerifyOptions) => {
  // Backwards compatibility for the 'network' parameter
  if (!options.networkType && options.network) {
    options.networkType = options.network;
  }

  switch (options.networkType) {
    case AuthNetworkType.EVM:
      return makeEvmVerify(core, options);
    case AuthNetworkType.SOLANA:
      return makeSolVerify(core, options);
    default:
      if (!options.networkType) {
        return makeEvmVerify(core, options);
      }

      throw new MoralisAuthError({
        code: AuthErrorCode.INCORRECT_NETWORK,
        message: `Incorrect network provided. Got "${options.networkType}", Valid values are: ${Object.values(
          AuthNetworkType,
        )
          .map((value) => `"${value}"`)
          .join(', ')}`,
      });
  }
};
