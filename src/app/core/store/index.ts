import { createStore } from 'vuex';
import { sync } from 'vuex-router-sync';
import { IS_DEV } from '../env';
import { router } from '../router';
import { RootState } from './state';

export const store = createStore<RootState>({
  strict: IS_DEV
});

sync(store, router);

export * from './state';
