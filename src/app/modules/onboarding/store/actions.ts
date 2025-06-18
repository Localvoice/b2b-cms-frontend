/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
import { RootState } from '~app/core/store';
import { createActionFactory, createActionMap } from '~app/shared/vuex';
import { onboardingMutations } from './mutations';
import { NAMESPACE, OnboardingState } from './state';
// import lessonListApi from '../service/lessonList.api';

const createAction = createActionFactory<OnboardingState, RootState>();

export const actions = {
  setStepForward: createAction(({ commit }) => {
    commit(onboardingMutations.moveStepForward.local);
  }),
  setStepBackward: createAction(({ commit }) => {
    commit(onboardingMutations.moveStepBackward.local);
  }),
  setAboutForm: createAction(({ commit }, { data }) => {
    commit(onboardingMutations.updateAboutForm.local, data);
  }),
  setAvatarForm: createAction(({ commit }, { data }) => {
    commit(onboardingMutations.updateAvatarForm.local, data);
  }),
  setSocialMediaForm: createAction(({ commit }, { data }) => {
    commit(onboardingMutations.updateSocialMediaForm.local, data);
  }),
  setActiveStepId: createAction(({ commit }, { stepId }) => {
    commit(onboardingMutations.setActiveStepId.local, stepId);
  })
};

export const onboardingActions = createActionMap<typeof actions, OnboardingState, RootState>(NAMESPACE, actions);
