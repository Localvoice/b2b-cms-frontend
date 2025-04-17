import Vue, { App } from 'vue';
import { nl2br } from './filters';

export function registerGlobalFilters(app: App) {
  app.config.globalProperties.$filters = {
    nl2br
  };
}

export * from './vnode';
