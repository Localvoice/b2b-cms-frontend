import Vue from 'vue';
import { navigationInitializer } from '~app/navigation';
import vuetify from '~app/shared/vuetify';
import { appRoutes } from '../app.routes';
import App from '../app.vue';
import { api, apiInitializer, ApiPlugin } from './api';
import { ConfigPluginFactory } from './config';
import { IS_DEV } from './env';
import { errorHandler } from './error';
import { i18n, TimezonePlugin } from './i18n';
import { appInitializer } from './initializer';
import { router, RouterHistoryPlugin } from './router';
import { store } from './store';

// configuration
// Vue.config.productionTip = !IS_DEV;
// Vue.config.errorHandler = errorHandler;
const ConfigPlugin = ConfigPluginFactory({ store });

// global plugins
Vue.use(ConfigPlugin);
Vue.use(ApiPlugin);
// Vue.use(RouterHistoryPlugin(router));
// Vue.use(TimezonePlugin);
// Vue.use(SysToastPlugin);
// Vue.use(SysModalPlugin);

// routes
router.addRoutes(appRoutes);

// initialization process
const configRequest = ConfigPlugin.init();
// console.log('config po init', getConfig);

// appInitializer.register(() => getConfig);
appInitializer.register(() => {
  console.log('register apiInitializer before');
  navigationInitializer();
  return configRequest.then((config) => apiInitializer(config));
});

export function bootstrap(elementOrSelector?: Element | string): Promise<void> {
  return appInitializer.resolve().then(() => {
    const root = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    });

    // handle errors outside of Vue
    window.addEventListener('error', (e) => {
      e.preventDefault();
      // errorHandler(e.error, root);
    });

    // handle unhandled rejections not captured by Vue (eg. no `return` in lifecycle hook / event binding)
    window.addEventListener('unhandledrejection', (e) => {
      e.preventDefault();
      e.promise.catch((error) => (error ? errorHandler(error, root) : null));
    });

    root.$mount(elementOrSelector);
  });
}
