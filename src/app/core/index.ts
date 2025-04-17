import { createApp, h } from 'vue';
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
import { createRouterHistoryPlugin, router } from './router';
import { store } from './store';
import { TimezonePlugin } from './i18n/timezone.plugin';
import { errorHandler } from './error/handler';
import { ApiPlugin } from './api/plugin';
import { api, apiInitializer } from './api/client';
import { i18n } from './i18n/i18n';
import { registerGlobalFilters } from '~app/shared/vue';

// configuration
// Vue.config.productionTip = !IS_DEV;
// Vue.config.errorHandler = errorHandler;
const ConfigPlugin = ConfigPluginFactory({ store });

// global plugins
// Vue.use(ConfigPlugin);
// Vue.use(ApiPlugin);
// Vue.use(RouterHistoryPlugin(router));
// Vue.use(TimezonePlugin);
// Vue.use(SysToastPlugin);
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
// appInitializer.register(() => auth);
// appInitializer.register(() => auth.then((token) => (token ? navigationInitializer() : null)));
appInitializer.register(LayoutLoader);

export function bootstrap(elementOrSelector?: Element | string): Promise<void> {
  console.log('bootstrap', appRoutes);
  return appInitializer.resolve().then(() => {
    const root = createApp({
      vuetify,
      router,
      store,
      render: () => h(App)
    });

    root.use(ConfigPlugin);
    root.use(ApiPlugin);
    // root.use(createRouterHistoryPlugin(router));
    root.use(TimezonePlugin);
    root.use(SysToastPlugin);
    root.use(i18n);
    root.use(router);

    import('../shared/vendors').then((m) => root.use(m.VendorsPlugin));
    import('../shared/version').then((m) => root.use(m.AppVersionPlugin));
    import('../shared/loading').then((m) => root.use(m.SysLoadingPlugin));
    import('../shared/spinner').then((m) => root.use(m.SysSpinnerPlugin));
    import('../shared/base').then((m) => root.use(m.BaseComponentsPlugin));
    import('../shared/drawer').then((m) => root.use(m.DrawerComponentsPlugin));
    import('../shared/fixedButton').then((m) => root.use(m.FixedButtonPlugin));
    import('../shared/facebook').then((m) => root.use(m.FacebookSDKPlugin));

    registerGlobalFilters(root);

    // root.config.errorHandler = errorHandler;

    // handle errors outside of Vue
    window.addEventListener('error', (e) => {
      e.preventDefault();
      console.log(e.error);
      // errorHandler(e.error, root);
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
        console.log(err);
      }
    }
  });
}
