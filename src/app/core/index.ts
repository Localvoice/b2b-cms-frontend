import Vue from 'vue';
import '../modules/loading';
import '../modules/voicebot/lesson';
import { navigationInitializer } from '~app/navigation';
import { SysToastPlugin } from '~app/shared/toast';
import vuetify from '~app/shared/vuetify';
import { LayoutLoader } from '~app/layout';
import { appRoutes } from '../app.routes';
import App from '../app.vue';
import { ConfigPluginFactory } from './config/plugin';
import { IS_DEV } from './env';
import { appInitializer } from './initializer';
import { router, RouterHistoryPlugin } from './router';
import { store } from './store';
import { TimezonePlugin } from './i18n/timezone.plugin';
import { errorHandler } from './error/handler';
import { ApiPlugin } from './api/plugin';
import { api, apiInitializer } from './api/client';
import { i18n } from './i18n/i18n';

// configuration
Vue.config.productionTip = !IS_DEV;
Vue.config.errorHandler = errorHandler;
const ConfigPlugin = ConfigPluginFactory({ store });

// global plugins
Vue.use(ConfigPlugin);
Vue.use(ApiPlugin);
Vue.use(RouterHistoryPlugin(router));
Vue.use(TimezonePlugin);
Vue.use(SysToastPlugin);
// Vue.use(SysModalPlugin);

// routes
appRoutes.map((route) => {
  router.addRoute(route);
});
// initialization process
const configRequest = ConfigPlugin.init();

const auth = configRequest.then((config) =>
  import(/* webpackChunkName: "auth" */ '~app/modules/auth/module').then((m) => m.AuthModule(config, api))
);

appInitializer.register(() => configRequest);
appInitializer.register(() => configRequest.then((config) => apiInitializer(config)));
appInitializer.register(() => auth);
appInitializer.register(() => auth.then((token) => (token ? navigationInitializer() : null)));
appInitializer.register(LayoutLoader);

export function bootstrap(elementOrSelector?: Element | string): Promise<void> {
  return appInitializer.resolve().then(() => {
    const root = new Vue({
      router,
      store,
      vuetify,
      i18n,
      render: (h) => h(App)
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
