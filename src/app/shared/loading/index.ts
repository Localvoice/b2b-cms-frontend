/* eslint-disable no-param-reassign */
import { App, Plugin } from 'vue';
import { SysLoading } from './loading.directive';
import { loadingService } from './loading.service';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $loading: typeof loadingService;
  }
}

export const SysLoadingPlugin: Plugin = {
  install(app: App) {
    app.directive('sys-loading', SysLoading);
    app.config.globalProperties.$loading = loadingService;
  }
};

export * from './types';
export { loadingService };
