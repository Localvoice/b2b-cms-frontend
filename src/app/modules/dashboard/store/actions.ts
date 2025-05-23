/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
import { RootState } from '~app/core/store';
import { createActionFactory, createActionMap } from '~app/shared/vuex';
import { coursesListMutations } from './mutations';
import { NAMESPACE, CoursesListState } from './state';
// import lessonListApi from '../service/lessonList.api';
import CourseModel from '../models/course';
import { courses } from '../dummyData/courses';
import { lessons } from '../../lessons/dummyData/lessons';

const createAction = createActionFactory<CoursesListState, RootState>();

export const actions = {
  fetchDashboardData: createAction(({ commit }) => {
    commit(coursesListMutations.setDashboardData.local, { coursesList: courses, lessonsList: lessons });
    // commit(coursesListMutations.setCoursesList.local, coursesList);
    // lessonListApi.getLessonsList().then((data) => {
    //   console.log('data from chatbots', data);
    //   commit(lessonListMutations.setLessonList.local, data);
    // });
  }),
  fetchCoursesList: createAction(({ commit }) => {
    commit(coursesListMutations.setCoursesList.local, courses);
  }),
  fetchLessonsList: createAction(({ commit }) => {
    commit(coursesListMutations.setLessonsList.local, lessons);
  }),
  setActiveView: createAction(({ commit }, { activeView }) => {
    commit(coursesListMutations.setActiveView.local, activeView);
  }),
  goToNextPage: createAction(({ commit, state }) => {
    const nextPage = state.pagintation.activePage + 1;
    commit(coursesListMutations.updateActivePage.local, nextPage);
  }),
  goToPreviousPage: createAction(({ commit, state }) => {
    const prevPage = state.pagintation.activePage - 1;
    commit(coursesListMutations.updateActivePage.local, prevPage);
  }),
  setDisplayLimit: createAction(({ commit }, { limit }) => {
    commit(coursesListMutations.setCoursesLimit.local, limit);
  })
};

export const coursesListActions = createActionMap<typeof actions, CoursesListState, RootState>(NAMESPACE, actions);
