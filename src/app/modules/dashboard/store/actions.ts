/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
import { RootState } from '~app/core/store';
import { createActionFactory, createActionMap } from '~app/shared/vuex';
import { coursesListMutations } from './mutations';
import { NAMESPACE, CoursesListState } from './state';
// import lessonListApi from '../service/lessonList.api';
import CourseModel from '../models/course';
import { courses } from '../dummyData/courses';

const createAction = createActionFactory<CoursesListState, RootState>();

export const actions = {
  fetchCoursesList: createAction(({ commit }, { pagination, sort, filters } = {}) => {
    // TODO: add pagination, sort, filters
    commit(coursesListMutations.setCoursesList.local, courses);
    // lessonListApi.getLessonsList().then((data) => {
    //   console.log('data from chatbots', data);
    //   commit(lessonListMutations.setLessonList.local, data);
    // });
  })
};

export const coursesListActions = createActionMap<typeof actions, CoursesListState, RootState>(NAMESPACE, actions);
