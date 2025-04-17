import axios, { AxiosInstance } from 'axios';
import { Sort } from '~app/shared/sort';
import { Config } from '../config/types';
import { collectionResponseInterceptor } from './response';

export type ApiClient = AxiosInstance;

// Axios instance
export const api: ApiClient = axios.create({
  paramsSerializer(params) {
    return Object.keys(params)
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');
  }
});

// Helper to convert Sort into query param
export function sortParams(sort?: Sort): { sorting: string } | null {
  return sort?.active ? { sorting: `${sort.active},${sort.direction}` } : null;
}

// Set base URL and attach response interceptor
export const apiInitializer: (config: Config) => ApiClient = (config) => {
  // api.defaults.baseURL = config.apiUrl;
  api.interceptors.response.use(collectionResponseInterceptor);
  return api;
};
