/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
import { RootState } from '~app/core/store';
import { createActionFactory, createActionMap } from '~app/shared/vuex';
import { platformMutations } from './mutations';
import { NAMESPACE, PlatformState } from './state';
import { courses } from '../dummyData/courses';
import { lessons } from '../dummyData/lessons';
// import lessonListApi from '../service/lessonList.api';

const createAction = createActionFactory<PlatformState, RootState>();

export const actions = {
  fetchDashboardData: createAction(({ commit }) => {
    commit(platformMutations.setDashboardData.local, { coursesList: courses, lessonsList: lessons });
    // commit(platformMutations.setCoursesList.local, coursesList);
    // lessonListApi.getLessonsList().then((data) => {
    //   console.log('data from chatbots', data);
    //   commit(lessonListMutations.setLessonList.local, data);
    // });
  }),
  fetchCoursesList: createAction(({ commit }) => {
    commit(platformMutations.setCoursesList.local, courses);
  }),
  fetchLessonsList: createAction(({ commit }) => {
    commit(platformMutations.setLessonsList.local, lessons);
  }),
  setActiveView: createAction(({ commit }, { activeView }) => {
    commit(platformMutations.setActiveView.local, activeView);
  }),
  goToNextPage: createAction(({ commit, state }) => {
    const nextPage = state.pagintation.activePage + 1;
    commit(platformMutations.updateActivePage.local, nextPage);
  }),
  goToPreviousPage: createAction(({ commit, state }) => {
    const prevPage = state.pagintation.activePage - 1;
    commit(platformMutations.updateActivePage.local, prevPage);
  }),
  setDisplayLimit: createAction(({ commit }, { limit }) => {
    commit(platformMutations.setCoursesLimit.local, limit);
  }),
  toggleDateSorting: createAction(({ commit }) => {
    commit(platformMutations.toggleDateSorting.local);
  }),
  toggleSortField: createAction(({ commit }, { field }) => {
    commit(platformMutations.toggleSortField.local, field);
  }),
  applyFilters: createAction(({ commit }, { filters }) => {
    commit(platformMutations.applyFilters.local, filters);
  }),
  clearFilters: createAction(({ commit }) => {
    commit(platformMutations.clearFilters.local);
  })
};

export const platformActions = createActionMap<typeof actions, PlatformState, RootState>(NAMESPACE, actions);
