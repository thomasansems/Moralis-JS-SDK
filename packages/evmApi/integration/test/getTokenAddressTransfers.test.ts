import { MoralisEvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getTokenTransfers', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get the token address transfers of an account', async () => {
    const result = await evmApi.token.getTokenTransfers({
      address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974',
    });

    expect(result).toBeDefined();
    expect(result.raw.total).toBe(807091);
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get the token address transfers of an invalid account and throw an error ', async () => {
    const failedResult = await evmApi.token
      .getTokenTransfers({
        address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b97',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.token.getTokenTransfers({
        address: '0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b97',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
