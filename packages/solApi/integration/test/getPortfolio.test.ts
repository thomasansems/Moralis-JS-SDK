import { MoralisSolApi } from '../../src/MoralisSolApi';
import { cleanSolApi, setupSolApi } from '../setup';

describe('Moralis SolApi', () => {
  let SolApi: MoralisSolApi;

  beforeAll(() => {
    SolApi = setupSolApi();
  });

  afterAll(() => {
    cleanSolApi();
  });

  it('should get the portfolio of an account ', async () => {
    const result = await SolApi.account.getPortfolio({
      network: 'mainnet',
      address: '5xoBq7f7CDgZwqHrDBdRWM84ExRetg4gZq93dyJtoSwp',
    });

    expect(result).toBeDefined();
    expect(result).toEqual(expect.objectContaining({}));
    expect(result.raw).toStrictEqual({ nativeBalance: '16136665083' });
  });

  it('should not get the portfolio of an account', async () => {
    const failedResult = await SolApi.account
      .getPortfolio({
        network: 'mainnet',
        address: '5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x',
      })
      .then()
      .catch((err) => {
        return err;
      });

    expect(failedResult).toBeDefined();
    expect(
      SolApi.account.getPortfolio({
        network: 'mainnet',
        address: '5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x5x',
      }),
    ).rejects.toThrowErrorMatchingInlineSnapshot(`"[C0006] Request failed with status 400"`);
  });
});
