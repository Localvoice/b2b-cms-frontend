/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiClient } from '~app/core/api/client';
import { createUrl } from '~app/shared/helpers/url';
import { AuthToken, importAuthToken, TokenStorage } from '../model';

const LOGIN_PATH = '/session/sign-in';

export const AuthInjectKey: string = 'authService';

export class AuthService {
  private token: Promise<AuthToken | null> | undefined;

  private tokenRefreshRequest: Promise<void> | undefined;

  constructor(
    private storage: TokenStorage,
    private api: ApiClient
  ) {}

  get loginUrl(): string {
    return createUrl(window.location.host, LOGIN_PATH);
  }

  initialize(): Promise<AuthToken | null> {
    if (this.token) {
      return this.token;
    }

    this.token = this.storage.load().then((token) => {
      if (token) {
        this.api.interceptors.request.use((request) => this.tokenHeaderInterceptor(request));
        this.api.interceptors.response.use(
          (response) => response,
          (error) => console.log(error)
        );
      }

      return token;
    });
    return this.token;
  }

  logout(): void {
    this.redirectToLogin();
  }

  redirectToLogin() {
    window.location.href = this.loginUrl;
  }

  private refreshToken(): Promise<void> {
    if (!this.token) return Promise.reject();

    return this.token.then((token) => {
      if (!token) {
        throw Error('No refresh token');
      }

      this.token = this.api
        .post<AuthToken>('/api/test/authentication/refresh', {
          userId: token.userId,
          refreshToken: token.refreshToken
        })
        .then((res) => ({
          ...importAuthToken(JSON.stringify(res.data))
        }));

      return this.token.then((authToken) => this.storage.store(authToken as AuthToken)).catch(() => this.logout());
    });
  }

  private tokenHeaderInterceptor(
    request: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> {
    if (request.url?.includes('authentication')) {
      return Promise.resolve(request);
    }

    return this.token!.then((token) => {
      request.headers!.Authorization = `Bearer ${token!.accessToken}`;
      return request;
    });
  }

  private refreshTokenInterceptor(error: AxiosError): Promise<any> {
    if (error.response?.status === 401 && error.config && !error.config.url?.includes('authentication')) {
      if (!this.tokenRefreshRequest) {
        this.tokenRefreshRequest = this.refreshToken();
      }

      return this.tokenRefreshRequest
        .then(() => this.api.request(error.config!))
        .finally(() => (this.tokenRefreshRequest = undefined));
    }

    throw error;
  }
}
