import { App } from 'vue';
import SysSpinner from './spinner.vue';

export * from './types';

export const SysSpinnerPlugin = {
  install(app: App) {
    // app.component('SysSpinner', SysSpinner);
  },
  component: SysSpinner
};
