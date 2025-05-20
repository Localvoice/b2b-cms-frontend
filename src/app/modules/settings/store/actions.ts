/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
import { RootState } from '~app/core/store';
import { createActionFactory, createActionMap } from '~app/shared/vuex';
import { userDataMutations } from './mutations';
import { NAMESPACE, SettingsState } from './state';
// import lessonListApi from '../service/lessonList.api';
import UserDataModel from '../models/userData';
import { userData } from '../dummyData/userData';

const createAction = createActionFactory<SettingsState, RootState>();

export const actions = {
  fetchUserData: createAction(({ commit }, { userId } = {}) => {
    commit(userDataMutations.setUserData.local, userData);
    // lessonListApi.getLessonsList().then((data) => {
    //   console.log('data from chatbots', data);
    //   commit(lessonListMutations.setLessonList.local, data);
    // });
  }),
  toggleEditing: createAction(({ commit }) => {
    commit(userDataMutations.toggleIsEditing.local);
  })
};

export const userDataActions = createActionMap<typeof actions, SettingsState, RootState>(NAMESPACE, actions);
