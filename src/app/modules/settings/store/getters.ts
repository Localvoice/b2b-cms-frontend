/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

import { RootState } from '~app/core/store';
import { createGetterFactory, createGetterMap } from '~app/shared/vuex';
import { NAMESPACE, SettingsState } from './state';

const createGetter = createGetterFactory<SettingsState, RootState>();

export const getters = {
  getUserData: createGetter((state) => state.userData),
  getEditingState: createGetter((state) => state.isEditing)
};

export const userDataGetters = createGetterMap<typeof getters, SettingsState, RootState>(NAMESPACE, getters);
