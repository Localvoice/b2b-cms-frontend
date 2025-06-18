/* eslint-disable import/no-cycle */
/* eslint-disable array-callback-return */
import { createMutationFactory, createMutationMap } from '~app/shared/vuex';
import { NAMESPACE, OnboardingState } from './state';
import { AboutForm, AvatarForm, SocialMediaForm } from './types';
import { calculateProgress } from './helpers';

const createMutation = createMutationFactory<OnboardingState>();

export const mutations = {
  moveStepBackward: createMutation((state) => {
    const newActiveStepId = state.activeStepId - 1;
    state.activeStepId = newActiveStepId;
    state.progress = calculateProgress(newActiveStepId, state.steps.length);
  }),
  moveStepForward: createMutation((state) => {
    const newActiveStepId = state.activeStepId + 1;
    state.activeStepId = newActiveStepId;
    if (!state.accessibleStepIds.includes(newActiveStepId)) {
      state.accessibleStepIds.push(newActiveStepId);
    }
    state.progress = calculateProgress(newActiveStepId, state.steps.length);
  }),
  updateAboutForm: createMutation((state, data: AboutForm) => {
    state.aboutForm = data;
  }),
  updateAvatarForm: createMutation((state, data: AvatarForm) => {
    state.avatarForm = data;
  }),
  updateSocialMediaForm: createMutation((state, data: SocialMediaForm) => {
    state.socialMediaForm = data;
  }),
  setActiveStepId: createMutation((state, stepId: number) => {
    if (state.accessibleStepIds.includes(stepId)) {
      state.activeStepId = stepId;
    }
  })
};

export const onboardingMutations = createMutationMap<typeof mutations, OnboardingState>(NAMESPACE, mutations);
