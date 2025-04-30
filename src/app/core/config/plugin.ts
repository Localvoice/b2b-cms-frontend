import { App } from 'vue';
import { Store } from 'vuex';
import { api } from '../api/client';
import { configActions, configGetters, configStore, NAMESPACE } from './store';
import { Config } from './types';

export interface AppConfigPluginOptions {
  store: Store<any>;
}

type AppConfigPlugin = {
  install(app: App): void;
  init(): Promise<Config>;
};

export const ConfigPluginFactory = ({ store }: AppConfigPluginOptions): AppConfigPlugin => ({
  install(app: App) {
    store.registerModule(NAMESPACE, configStore);

    store.watch(
      (state, getters) => getters[configGetters.getApiUrl],
      (apiUrl) => {
        if (apiUrl) {
          api.defaults.baseURL = apiUrl;
        }
      }
    );

    // Add $config to global properties
    app.config.globalProperties.$config = store.getters[configGetters.getState];
  },

  async init() {
    // await store.dispatch(configActions.loadConfig);
    return store.getters[configGetters.getState];
  }
});
