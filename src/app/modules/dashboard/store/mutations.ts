/* eslint-disable import/no-cycle */
/* eslint-disable array-callback-return */
import { createMutationFactory, createMutationMap } from '~app/shared/vuex';
import { NAMESPACE, CoursesListState, ActiveView } from './state';
import CourseModel from '../models/course';
import LessonModel from '../../lessons/models/lesson';

const createMutation = createMutationFactory<CoursesListState>();

export const mutations = {
  setAllCourses: createMutation((state, coursesList: CourseModel[]) => {
    state.courses.allCourses = coursesList;
    state.courses.coursesList = coursesList.slice(0, state.courses.pagintation.limit);
    state.courses.pagintation.activePage = 1;

    const totalPages = Math.ceil(coursesList.length / state.courses.pagintation.limit);
    state.courses.pagintation.totalPages = totalPages;
    if (totalPages > 1) {
      state.courses.pagintation.hasNextPage = true;
    }
  }),
  setCoursesList: createMutation((state, coursesList: CourseModel[]) => {
    state.courses.coursesList = coursesList;
  }),
  setLessonsList: createMutation((state, lessonsList: LessonModel[]) => {
    state.lessons.lessonsList = lessonsList;
  }),
  setActiveView: createMutation((state, activeView: ActiveView) => {
    state.activeView = activeView;
  }),
  updateCourses: createMutation((state, courses: CourseModel[]) => {
    state.courses.coursesList = courses;
  }),
  updateActivePage: createMutation((state, page: number) => {
    state.courses.pagintation.activePage = page;

    if (page === 1) {
      state.courses.pagintation.hasPreviousPage = false;
    } else {
      state.courses.pagintation.hasPreviousPage = true;
    }

    if (page === state.courses.pagintation.totalPages) {
      state.courses.pagintation.hasNextPage = false;
    } else if (page < state.courses.pagintation.totalPages) {
      state.courses.pagintation.hasNextPage = true;
    }

    const start = (page - 1) * state.courses.pagintation.limit;
    const end = start + state.courses.pagintation.limit;
    const paginatedCourses = state.courses.allCourses.slice(start, end);
    state.courses.coursesList = paginatedCourses;
  }),
  setCoursesLimit: createMutation((state, limit: number) => {
    const totalPages = Math.ceil(state.courses.allCourses.length / limit);
    state.courses.pagintation = {
      ...state.courses.pagintation,
      limit,
      totalPages,
      activePage: 1,
      hasPreviousPage: false,
      hasNextPage: totalPages > 1
    };

    state.courses.coursesList = state.courses.allCourses.slice(0, limit);
  })
};

export const coursesListMutations = createMutationMap<typeof mutations, CoursesListState>(NAMESPACE, mutations);
