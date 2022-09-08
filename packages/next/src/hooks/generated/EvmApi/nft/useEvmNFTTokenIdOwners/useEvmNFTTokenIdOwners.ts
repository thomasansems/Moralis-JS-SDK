import { SWRConfiguration } from 'swr/dist/types';
import { TUseEvmNFTTokenIdOwnersParams, TUseEvmNFTTokenIdOwnersReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTTokenIdOwners = (params: TUseEvmNFTTokenIdOwnersParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseEvmNFTTokenIdOwnersReturn>(
    [`/moralis/EvmApi/nft/getNFTTokenIdOwners`, params],
    axiosFetcher,
    SWRConfig,
  );

  return {
    data,
    error,
    refetch: async () => mutate(),
    isValidating,
  };
};
