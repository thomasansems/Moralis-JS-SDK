import { ApiConfig } from '@moralisweb3/api-utils';
import { MoralisCore, MoralisStreamError, StreamErrorCode } from '@moralisweb3/core';
import { IWebhook } from '@moralisweb3/streams-typings';
import { sha3 } from '../utils/sha3';

export interface VerifySignatureOptions {
  body: IWebhook;
  signature: string;
}

export const makeVerifySignature =
  (core: MoralisCore) =>
  ({ body, signature }: VerifySignatureOptions): boolean => {
    const apiKey = core.config.get(ApiConfig.apiKey);
    if (!apiKey) {
      throw new MoralisStreamError({
        code: StreamErrorCode.GENERIC_STREAM_ERROR,
        message: 'unable to verify signature without an api key',
      });
    }
    const generatedSignature = sha3(JSON.stringify(body) + apiKey);
    if (signature !== generatedSignature) {
      throw new MoralisStreamError({
        code: StreamErrorCode.INVALID_SIGNATURE,
        message: 'signature is not valid',
      });
    }
    return true;
  };
