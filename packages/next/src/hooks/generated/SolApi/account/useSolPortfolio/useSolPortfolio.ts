import { SWRConfiguration } from 'swr/dist/types';
import { TUsesolportfolioParams, TUsesolportfolioReturn } from './types'
import axios from 'axios'
import useSWR from 'swr';

export const useSolPortfolio = (params: TUsesolportfolioParams, SWRConfig?: SWRConfiguration) => {
  const axiosFetcher = async (endpoint: string, params: any) => axios.post(`/api/moralis/${endpoint}`, params).then(res => res.data);

  const { data, error, mutate, isValidating } = useSWR<TUsesolportfolioReturn>(
    [`SolApi/account/getPortfolio`, params],
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
