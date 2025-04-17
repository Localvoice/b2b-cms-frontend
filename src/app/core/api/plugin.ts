import { App } from 'vue';
import { api } from './client';

export const ApiPlugin = {
  install(app: App) {
    app.config.globalProperties.$api = api;
  }
};
