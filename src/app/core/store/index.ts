import { createStore } from 'vuex';
import { IS_DEV } from '../env';
import { RootState } from './state';

export const store = createStore<RootState>({
  strict: IS_DEV
});

export * from './state';
