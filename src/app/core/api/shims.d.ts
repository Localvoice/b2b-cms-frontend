import { ApiClient } from './client';
import { ComponentCustomProperties } from 'vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: ApiClient;
  }
}
