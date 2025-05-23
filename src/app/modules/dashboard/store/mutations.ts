/* eslint-disable import/no-cycle */
/* eslint-disable array-callback-return */
import { createMutationFactory, createMutationMap } from '~app/shared/vuex';
import { NAMESPACE, CoursesListState, ActiveView } from './state';
import CourseModel from '../models/course';
import LessonModel from '../../lessons/models/lesson';

const createMutation = createMutationFactory<CoursesListState>();

export const mutations = {
  setDashboardData: createMutation(
    (state, { coursesList, lessonsList }: { coursesList: CourseModel[]; lessonsList: LessonModel[] }) => {
      state.courses.allCourses = coursesList;
      state.lessons.allLessons = lessonsList;

      state.courses.coursesList = coursesList.slice(0, state.pagintation.limit);
      state.lessons.lessonsList = lessonsList.slice(0, state.pagintation.limit);
      state.pagintation.activePage = 1;

      const totalPages = Math.ceil(coursesList.length / state.pagintation.limit);
      state.pagintation.totalPages = totalPages;
      if (totalPages > 1) {
        state.pagintation.hasNextPage = true;
      }
    }
  ),
  setCoursesList: createMutation((state, coursesList: CourseModel[]) => {
    state.courses.allCourses = coursesList;
    state.courses.coursesList = coursesList.slice(0, state.pagintation.limit);

    state.pagintation.activePage = 1;
    state.pagintation.hasPreviousPage = false;

    const totalPages = Math.ceil(coursesList.length / state.pagintation.limit);
    state.pagintation.totalPages = totalPages;
    if (totalPages > 1) {
      state.pagintation.hasNextPage = true;
    }
  }),
  setLessonsList: createMutation((state, lessonsList: LessonModel[]) => {
    state.lessons.allLessons = lessonsList;
    state.lessons.lessonsList = lessonsList.slice(0, state.pagintation.limit);

    state.pagintation.activePage = 1;
    state.pagintation.hasPreviousPage = false;

    const totalPages = Math.ceil(lessonsList.length / state.pagintation.limit);
    state.pagintation.totalPages = totalPages;
    if (totalPages > 1) {
      state.pagintation.hasNextPage = true;
    }
  }),
  setActiveView: createMutation((state, activeView: ActiveView) => {
    state.activeView = activeView;
    state.pagintation.activePage = 1;
    state.pagintation.hasPreviousPage = false;
    state.pagintation.hasNextPage = state.pagintation.totalPages > 1;

    if (activeView === 'courses') {
      state.courses.coursesList = state.courses.allCourses.slice(0, state.pagintation.limit);
    } else {
      state.lessons.lessonsList = state.lessons.allLessons.slice(0, state.pagintation.limit);
    }
  }),
  updateCourses: createMutation((state, courses: CourseModel[]) => {
    state.courses.coursesList = courses;
  }),
  updateActivePage: createMutation((state, page: number) => {
    state.pagintation.activePage = page;

    if (page === 1) {
      state.pagintation.hasPreviousPage = false;
    } else {
      state.pagintation.hasPreviousPage = true;
    }

    if (page === state.pagintation.totalPages) {
      state.pagintation.hasNextPage = false;
    } else if (page < state.pagintation.totalPages) {
      state.pagintation.hasNextPage = true;
    }

    const start = (page - 1) * state.pagintation.limit;
    const end = start + state.pagintation.limit;

    if (state.activeView === 'courses') {
      const paginatedCourses = state.courses.allCourses.slice(start, end);
      state.courses.coursesList = paginatedCourses;
    } else {
      const paginatedLessons = state.lessons.allLessons.slice(start, end);
      state.lessons.lessonsList = paginatedLessons;
    }
  }),
  setCoursesLimit: createMutation((state, limit: number) => {
    let totalPages = Math.ceil(state.courses.allCourses.length / limit);
    if (state.activeView === 'lessons') {
      totalPages = Math.ceil(state.lessons.allLessons.length / limit);
    }

    state.pagintation = {
      ...state.pagintation,
      limit,
      totalPages,
      activePage: 1,
      hasPreviousPage: false,
      hasNextPage: totalPages > 1
    };

    if (state.activeView === 'courses') {
      state.courses.coursesList = state.courses.allCourses.slice(0, limit);
    } else {
      state.lessons.lessonsList = state.lessons.allLessons.slice(0, limit);
    }
  })
};

export const coursesListMutations = createMutationMap<typeof mutations, CoursesListState>(NAMESPACE, mutations);
