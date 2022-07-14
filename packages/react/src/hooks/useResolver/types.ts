import { IDefaultCallbacks } from 'hooks/types';
import { MoralisError } from '@moralisweb3/core';
export interface IResolverCallbacks<TResponse> extends IDefaultCallbacks<TResponse> {
  _onComplete?: () => void;
  _onError?: (error?: MoralisError) => void;
  _onSuccess?: (response: TResponse) => void;
  _throwOnError?: boolean;
}

export interface IResolverParams {
  <TResponse = null>(func: () => Promise<TResponse>, params?: IResolverCallbacks<TResponse>): Promise<TResponse | null>;
}
