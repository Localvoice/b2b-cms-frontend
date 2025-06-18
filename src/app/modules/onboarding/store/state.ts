/* eslint-disable import/no-cycle */
import { createEntityAdapter, EntityAdapter } from '~app/shared/vuex';
import { steps } from '../dummyData/steps';

export const NAMESPACE = 'onboarding';

export interface OnboardingState {
  steps: {
    id: number;
    icon: string;
    title: string;
    description: string;
  }[];
  activeStepId: number;
  accessibleStepIds: number[];
  progress: number;
  aboutForm: {
    username: string;
    description: string;
  };
  avatarForm: {
    selectedAvatarSet: number | null;
    dialogue: string | null;
    mistake: string | null;
    congratulations: string | null;
  };
  socialMediaForm: {
    instagram: string;
    youtube: string;
    facebook: string;
  };
}

export const OnboardingEntityAdapter: EntityAdapter<OnboardingState> = createEntityAdapter<OnboardingState>();

export function initialState(): OnboardingState {
  return {
    steps,
    activeStepId: 1,
    accessibleStepIds: [1],
    progress: 0,
    aboutForm: {
      username: '',
      description: ''
    },
    avatarForm: {
      selectedAvatarSet: 1,
      dialogue: null,
      mistake: null,
      congratulations: null
    },
    socialMediaForm: {
      instagram: '',
      youtube: '',
      facebook: ''
    }
  };
}
