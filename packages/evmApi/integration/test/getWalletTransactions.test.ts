import { MoralisEvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getWalletTransactions', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get the transactions of an account', async () => {
    const result = await evmApi.transaction.getWalletTransactions({
      address: '0x7de3085b3190b3a787822ee16f23be010f5f8686',
    });

    expect(result).toBeDefined();
    expect(result.raw.total).toBe(404);
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get the transactions of an invalid account and throw an error ', async () => {
    const failedResult = await evmApi.transaction
      .getWalletTransactions({
        address: '0x7dE3085b3190B3a787822Ee16F23be010f5F868',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.transaction.getWalletTransactions({
        address: '0x7dE3085b3190B3a787822Ee16F23be010f5F868',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
