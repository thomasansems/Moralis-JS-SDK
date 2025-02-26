import { BigNumber, Camelize, toCamelCase } from '@moralisweb3/core';
import { EvmChainish, EvmAddressish, EvmAddress, Erc20Transfer } from '@moralisweb3/evm-utils';
import { operations } from '../../generated/types';
import { createPaginatedEndpointFactory, createPaginatedEndpoint, PaginatedParams } from '@moralisweb3/api-utils';
import { EvmChainResolver } from '../EvmChainResolver';

// Old name: getTokenTransfers
type operation = 'getWalletTokenTransfers';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>>, PaginatedParams {
  chain?: EvmChainish;
  address: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

// TODO: get decimals from API, then we can add a ERC20Value instance
export const getWalletTokenTransfers = createPaginatedEndpointFactory((core) =>
  createPaginatedEndpoint({
    name: 'getWalletTokenTransfers',
    urlParams: ['address'],
    getUrl: (params: Params) => `/${params.address}/erc20/transfers`,
    apiToResult: (data: ApiResult, params: Params) =>
      (data.result ?? []).map((transfer) =>
        Erc20Transfer.create({
          ...toCamelCase(transfer),
          chain: EvmChainResolver.resolve(params.chain, core),
          address: EvmAddress.create(transfer.address, core),
          toAddress: EvmAddress.create(transfer.to_address, core),
          fromAddress: EvmAddress.create(transfer.from_address, core),
          value: BigNumber.create(transfer.value),
          blockTimestamp: new Date(transfer.block_timestamp),
        }),
      ),
    resultToJson: (data) => data.map((transfer) => transfer.toJSON()),
    parseParams: (params: Params): ApiParams => ({
      ...params,
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      address: EvmAddress.create(params.address, core).lowercase,
      to_block: params.toBlock,
      from_block: params.fromBlock,
      from_date: params.fromDate,
      to_date: params.toDate,
    }),
    firstPageIndex: 0,
  }),
);
