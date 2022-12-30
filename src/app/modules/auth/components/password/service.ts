import { AxiosResponse } from 'axios';
import { ApiClient, api } from '~app/core/api/client';

export class PasswordService {
  constructor(private apiClient: ApiClient) {}

  change(current: string, password: string): Promise<AxiosResponse> {
    return this.apiClient.put<void>('/api/account/me/password', {
      oldPassword: current,
      newPassword: password
    });
  }
}

export const passwordService = new PasswordService(api);
