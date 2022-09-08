import { SWRConfiguration } from 'swr/dist/types';
import { TUseevmnfttradesParams, TUseevmnfttradesReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useEvmNFTTrades = (params: TUseevmnfttradesParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUseevmnfttradesReturn>(
    [`EvmApi/nft/getNFTTrades`, params],
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
