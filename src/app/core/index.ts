import { createApp } from 'vue';
import '../modules/loading';
import '../modules/voicebot/lesson';
import { navigationInitializer } from '~app/navigation';
import { SysToastPlugin } from '~app/shared/toast';
import vuetify from '~app/shared/vuetify';
import VueApexCharts from 'vue3-apexcharts';
import { LayoutLoader } from '~app/layout';
import { appRoutes } from '../app.routes';
import App from '../app.vue';
import { ConfigPluginFactory } from './config/plugin';
import { appInitializer } from './initializer';
import { createRouterHistoryPlugin, router } from './router';
import { store } from './store';
import { TimezonePlugin } from './i18n/timezone.plugin';
import { errorHandler } from './error/handler';
import { ApiPlugin } from './api/plugin';
import { api, apiInitializer } from './api/client';
import { i18n } from './i18n/i18n';
import { registerGlobalFilters } from '~app/shared/vue';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';

const ConfigPlugin = ConfigPluginFactory({ store });

// routes
appRoutes.map((route) => {
  router.addRoute(route);
});

const root = createApp(App);

const configRequest = ConfigPlugin.init();
const auth = configRequest.then((config) =>
  import(/* webpackChunkName: "auth" */ '~app/modules/auth/module').then((m) => m.AuthModule(root, config, api))
);

appInitializer.register(() => configRequest);
appInitializer.register(() => configRequest.then((config) => apiInitializer(config)));
appInitializer.register(() => auth);
// appInitializer.register(() => auth.then((token) => (token ? navigationInitializer() : null)));
appInitializer.register(LayoutLoader);

export function bootstrap(elementOrSelector?: Element | string): Promise<void> {
  return appInitializer.resolve().then(() => {
    // configuration
    root.config.errorHandler = errorHandler;

    // global plugins
    root.use(store);
    root.use(router);
    root.use(vuetify);
    root.use(ConfigPlugin);
    root.use(ApiPlugin);
    root.use(createRouterHistoryPlugin(router));
    root.use(TimezonePlugin);
    root.use(SysToastPlugin);
    root.use(i18n);
    root.use(Vue3Toastify, {
      autoClose: 3000,
      position: 'bottom-center'
    } as ToastContainerOptions);
    root.use(VueApexCharts);

    import('../shared/vendors').then((m) => root.use(m.VendorsPlugin));
    import('../shared/facebook').then((m) => root.use(m.FacebookSDKPlugin));

    registerGlobalFilters(root);

    router.beforeEach((to, from, next) => {
      document.title = to.meta.title as string;
      next();
    });

    // handle errors outside of Vue
    window.addEventListener('error', (e) => {
      e.preventDefault();
      console.log(e.error);
      errorHandler(e.error, root);
    });

    // handle unhandled rejections not captured by Vue (eg. no `return` in lifecycle hook / event binding)
    window.addEventListener('unhandledrejection', (e) => {
      e.preventDefault();
      e.promise.catch((error) => (error ? errorHandler(error, root) : null));
    });

    if (elementOrSelector) {
      try {
        root.mount(elementOrSelector);
      } catch (err) {
        console.log('mountError', err);
      }
    }
  });
}
