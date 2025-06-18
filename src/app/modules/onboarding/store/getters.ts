/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

import { RootState } from '~app/core/store';
import { createGetterFactory, createGetterMap } from '~app/shared/vuex';
import { NAMESPACE, OnboardingState } from './state';

const createGetter = createGetterFactory<OnboardingState, RootState>();

export const getters = {
  getActiveStepId: createGetter((state) => state.activeStepId),
  getAccessibleStepIds: createGetter((state) => state.accessibleStepIds),
  getProgress: createGetter((state) => state.progress),
  getOnboardingData: createGetter((state) => ({
    about: state.aboutForm,
    avatar: state.avatarForm,
    socialMedia: state.socialMediaForm
  }))
};

export const onboardingGetters = createGetterMap<typeof getters, OnboardingState, RootState>(NAMESPACE, getters);
