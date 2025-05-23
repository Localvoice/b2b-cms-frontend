/* eslint-disable import/no-cycle */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */

import { RootState } from '~app/core/store';
import { createGetterFactory, createGetterMap } from '~app/shared/vuex';
import { NAMESPACE, CoursesListState } from './state';

const createGetter = createGetterFactory<CoursesListState, RootState>();

export const getters = {
  getActivePage: createGetter((state) => state.pagintation.activePage),
  getTotalPages: createGetter((state) => state.pagintation.totalPages),
  hasNextPage: createGetter((state) => state.pagintation.hasNextPage),
  hasPreviousPage: createGetter((state) => state.pagintation.hasPreviousPage),
  getCoursesList: createGetter((state) => state.courses.coursesList),
  getLessonsList: createGetter((state) => state.lessons.lessonsList),
  getActiveView: createGetter((state) => state.activeView),
  getResultsLimit: createGetter((state) => state.pagintation.limit)
};

export const coursesListGetters = createGetterMap<typeof getters, CoursesListState, RootState>(NAMESPACE, getters);
