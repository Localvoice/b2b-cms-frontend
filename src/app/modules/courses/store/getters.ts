/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

import { RootState } from '~app/core/store';
import { createGetterFactory, createGetterMap } from '~app/shared/vuex';
import { NAMESPACE, CourseDetailsState } from './state';

const createGetter = createGetterFactory<CourseDetailsState, RootState>();

export const getters = {
  getCourseDetails: createGetter((state) => state.activeCourse),
  getEditingState: createGetter((state) => state.isEditing)
};

export const courseDetailsGetters = createGetterMap<typeof getters, CourseDetailsState, RootState>(NAMESPACE, getters);
