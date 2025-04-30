import axios, { AxiosInstance } from 'axios';
import { Sort } from '~app/shared/sort';
import { Config } from '../config/types';
import { collectionResponseInterceptor } from './response';

export type ApiClient = AxiosInstance;

const BASE_URL = 'https://api.localvoice.pl/staging';

export const api: ApiClient = axios.create({
  baseURL: BASE_URL,
  paramsSerializer(params) {
    return Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');
  }
});

export function sortParams(sort?: Sort): { sorting: string } | null {
  return sort?.active ? { sorting: `${sort.active},${sort.direction}` } : null;
}

export const apiInitializer: (config: Config) => ApiClient = (config) => {
  api.interceptors.response.use(collectionResponseInterceptor);
  return api;
};
