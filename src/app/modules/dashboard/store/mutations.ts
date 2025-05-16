/* eslint-disable import/no-cycle */
/* eslint-disable array-callback-return */
import { createMutationFactory, createMutationMap } from '~app/shared/vuex';
import { NAMESPACE, CoursesListState } from './state';
import CourseModel from '../models/course';
import LessonModel from '../../lessons/models/lesson';

const createMutation = createMutationFactory<CoursesListState>();

export const mutations = {
  setCoursesList: createMutation((state, coursesList: CourseModel[]) => {
    state.courses.coursesList = coursesList;
  }),
  setLessonsList: createMutation((state, lessonsList: LessonModel[]) => {
    state.courses.coursesList = lessonsList;
  })
};

export const coursesListMutations = createMutationMap<typeof mutations, CoursesListState>(NAMESPACE, mutations);
