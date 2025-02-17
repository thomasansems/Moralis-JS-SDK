import { MoralisEvmApi } from '../../src/EvmApi';
import { cleanEvmApi, setupEvmApi } from '../setup';

describe('getNFTTokenIdOwners', () => {
  let evmApi: MoralisEvmApi;

  beforeAll(() => {
    evmApi = setupEvmApi();
  });

  afterAll(() => {
    cleanEvmApi();
  });

  it('should get the token Id owners', async () => {
    const result = await evmApi.nft.getNFTTokenIdOwners({
      address: '0x7de3085b3190b3a787822ee16f23be010f5f8686',
      format: 'decimal',
      tokenId: '1',
    });

    expect(result).toBeDefined();
    expect(result.raw.total).toBe(10);
    expect(result).toEqual(expect.objectContaining({}));
  });

  it('should not get the token Id owners and throw an error ', async () => {
    const failedResult = await evmApi.nft
      .getNFTTokenIdOwners({
        address: '0x7de3085b3190b3a787822ee16f23be010f5f868',
        format: 'decimal',
        tokenId: '1',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      evmApi.nft.getNFTTokenIdOwners({
        address: '0x7de3085b3190b3a787822ee16f23be010f5f868',
        format: 'decimal',
        tokenId: '1',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0005] Invalid address provided"`);
  });
});
