/* eslint-disable import/no-cycle */
/* eslint-disable array-callback-return */
import { createMutationFactory, createMutationMap } from '~app/shared/vuex';
import { NAMESPACE, CoursesListState, ActiveView } from './state';
import CourseModel from '../models/course';
import LessonModel from '../../lessons/models/lesson';

const createMutation = createMutationFactory<CoursesListState>();

export const mutations = {
  setCoursesList: createMutation((state, coursesList: CourseModel[]) => {
    state.courses.coursesList = coursesList;
  }),
  setLessonsList: createMutation((state, lessonsList: LessonModel[]) => {
    state.lessons.lessonsList = lessonsList;
  }),
  setActiveView: createMutation((state, activeView: ActiveView) => {
    state.activeView = activeView;
  })
};

export const coursesListMutations = createMutationMap<typeof mutations, CoursesListState>(NAMESPACE, mutations);
