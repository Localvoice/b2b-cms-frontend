/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

import { RootState } from '~app/core/store';
import { createGetterFactory, createGetterMap } from '~app/shared/vuex';
import { NAMESPACE, LessonDetailsState } from './state';

const createGetter = createGetterFactory<LessonDetailsState, RootState>();

export const getters = {
  getLessonDetails: createGetter((state) => state.activeLesson)
};

export const lessonDetailsGetters = createGetterMap<typeof getters, LessonDetailsState, RootState>(NAMESPACE, getters);
