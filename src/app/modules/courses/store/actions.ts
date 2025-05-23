/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
import { RootState } from '~app/core/store';
import { createActionFactory, createActionMap } from '~app/shared/vuex';
import { coursesListMutations } from './mutations';
import { NAMESPACE, CourseDetailsState } from './state';
// import lessonListApi from '../service/lessonList.api';
import CourseModel from '../models/course';
import { courses } from '../../dashboard/dummyData/courses';

const createAction = createActionFactory<CourseDetailsState, RootState>();

export const actions = {
  fetchCourseDetails: createAction(({ commit }, { courseId } = {}) => {
    commit(coursesListMutations.setActiveCourse.local, courses[0]);
    // lessonListApi.getLessonsList().then((data) => {
    //   console.log('data from chatbots', data);
    //   commit(lessonListMutations.setLessonList.local, data);
    // });
  }),
  setCourseEditing: createAction(({ commit }) => {
    commit(coursesListMutations.setEditingActive.local);
  }),
  leaveCourseEditing: createAction(({ commit }) => {
    commit(coursesListMutations.setEditingInactive.local);
  })
};

export const courseDetailsActions = createActionMap<typeof actions, CourseDetailsState, RootState>(NAMESPACE, actions);
