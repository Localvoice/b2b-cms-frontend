/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

import { RootState } from '~app/core/store';
import { createGetterFactory, createGetterMap } from '~app/shared/vuex';
import { NAMESPACE, CoursesListState } from './state';

const createGetter = createGetterFactory<CoursesListState, RootState>();

export const getters = {
  getCoursesList: createGetter((state) => state.courses.coursesList)
};

export const coursesListGetters = createGetterMap<typeof getters, CoursesListState, RootState>(NAMESPACE, getters);
