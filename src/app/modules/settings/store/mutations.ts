/* eslint-disable import/no-cycle */
/* eslint-disable array-callback-return */
import { createMutationFactory, createMutationMap } from '~app/shared/vuex';
import { NAMESPACE, SettingsState } from './state';
import UserDataModel from '../models/userData';

const createMutation = createMutationFactory<SettingsState>();

export const mutations = {
  setUserData: createMutation((state, userData: UserDataModel) => {
    state.userData = userData;
  }),
  toggleIsEditing: createMutation((state) => {
    state.isEditing = !state.isEditing;
  })
};

export const userDataMutations = createMutationMap<typeof mutations, SettingsState>(NAMESPACE, mutations);
