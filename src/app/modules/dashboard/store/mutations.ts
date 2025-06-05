/* eslint-disable import/no-cycle */
/* eslint-disable array-callback-return */
import { createMutationFactory, createMutationMap } from '~app/shared/vuex';
import { NAMESPACE, CoursesListState, ActiveView, CourseWithSingleCategory, DataFilters } from './state';
import CourseModel from '../models/course';
import LessonModel from '../../lessons/models/lesson';
import { filterCourses, filterLessons, getTotalPages, mapCoursesToTableData, sortByDateAndField } from './helpers';

const createMutation = createMutationFactory<CoursesListState>();

export const mutations = {
  setDashboardData: createMutation(
    (state, { coursesList, lessonsList }: { coursesList: CourseModel[]; lessonsList: LessonModel[] }) => {
      const initialCourses = mapCoursesToTableData(coursesList);
      const initialLessons = lessonsList;

      const sortDirection = state.sort.dateSortDirection;
      const sortedCourses = sortByDateAndField(initialCourses, null, sortDirection, null);
      const sortedLessons = sortByDateAndField(lessonsList, null, sortDirection, null);

      state.courses.initialCourses = initialCourses;
      state.courses.allCourses = sortedCourses;
      state.courses.coursesList = sortedCourses.slice(0, state.pagintation.limit);

      state.lessons.initialLessons = initialLessons;
      state.lessons.allLessons = sortedLessons;
      state.lessons.lessonsList = sortedLessons.slice(0, state.pagintation.limit);

      state.pagintation.activePage = 1;
      const totalPages = getTotalPages(coursesList.length, state.pagintation.limit);
      state.pagintation.totalPages = totalPages;
      if (totalPages > 1) {
        state.pagintation.hasNextPage = true;
      }
    }
  ),
  setCoursesList: createMutation((state, coursesList: CourseModel[]) => {
    const mappedCourses = mapCoursesToTableData(coursesList);
    state.courses.initialCourses = mappedCourses;
    state.courses.allCourses = mappedCourses;
    state.courses.coursesList = mappedCourses.slice(0, state.pagintation.limit);

    state.pagintation.activePage = 1;
    state.pagintation.hasPreviousPage = false;

    const totalPages = getTotalPages(coursesList.length, state.pagintation.limit);
    state.pagintation.totalPages = totalPages;
    if (totalPages > 1) {
      state.pagintation.hasNextPage = true;
    }
  }),
  setLessonsList: createMutation((state, lessonsList: LessonModel[]) => {
    state.lessons.initialLessons = lessonsList;
    state.lessons.allLessons = lessonsList;
    state.lessons.lessonsList = lessonsList.slice(0, state.pagintation.limit);

    state.pagintation.activePage = 1;
    state.pagintation.hasPreviousPage = false;

    const totalPages = getTotalPages(lessonsList.length, state.pagintation.limit);
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
    state.courses.coursesList = mapCoursesToTableData(courses);
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
    let totalPages = getTotalPages(state.courses.allCourses.length, limit);
    if (state.activeView === 'lessons') {
      totalPages = getTotalPages(state.lessons.allLessons.length, limit);
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
  }),
  toggleDateSorting: createMutation((state) => {
    const sortDirection = state.sort.dateSortDirection === 'asc' ? 'desc' : 'asc';
    const start = (state.pagintation.activePage - 1) * state.pagintation.limit;
    const end = start + state.pagintation.limit;
    state.sort.dateSortDirection = sortDirection;

    let sortedCourses: CourseWithSingleCategory[] = sortByDateAndField(
      state.courses.allCourses,
      null,
      state.sort.dateSortDirection,
      null
    );
    let sortedLessons: LessonModel[] = sortByDateAndField(
      state.lessons.allLessons,
      null,
      state.sort.dateSortDirection,
      null
    );

    if (state.sort.field && state.sort.direction) {
      sortedCourses = sortByDateAndField(
        state.courses.allCourses,
        state.sort.field as keyof CourseWithSingleCategory,
        state.sort.dateSortDirection,
        state.sort.direction
      );
      sortedLessons = sortByDateAndField(
        state.lessons.allLessons,
        state.sort.field as keyof LessonModel,
        state.sort.dateSortDirection,
        state.sort.direction
      );
    }

    state.courses.allCourses = sortedCourses;
    state.courses.coursesList = sortedCourses.slice(start, end);
    state.lessons.allLessons = sortedLessons;
    state.lessons.lessonsList = sortedLessons.slice(start, end);
  }),
  toggleSortField: createMutation((state, field: string) => {
    const start = (state.pagintation.activePage - 1) * state.pagintation.limit;
    const end = start + state.pagintation.limit;
    let direction = state.sort.direction;
    let sortField = state.sort.field;

    if (state.sort.field === null || state.sort.field !== field) {
      sortField = field;
      direction = 'asc';
    } else if (state.sort.direction === 'asc' && state.sort.field === field) {
      direction = 'desc';
    } else if (state.sort.direction === 'desc' && state.sort.field === field) {
      sortField = null;
      direction = null;
    }

    state.sort.field = sortField;
    state.sort.direction = direction;

    let sortedCourses: CourseWithSingleCategory[] = state.courses.allCourses;
    let sortedLessons: LessonModel[] = state.lessons.allLessons;

    if (sortField && direction) {
      sortedCourses = sortByDateAndField(
        state.courses.allCourses,
        sortField as keyof CourseWithSingleCategory,
        state.sort.dateSortDirection,
        direction
      );
      sortedLessons = sortByDateAndField(
        state.lessons.allLessons,
        sortField as keyof LessonModel,
        state.sort.dateSortDirection,
        direction
      );
    } else {
      sortedCourses = sortByDateAndField(state.courses.allCourses, null, state.sort.dateSortDirection, null);
      sortedLessons = sortByDateAndField(state.lessons.allLessons, null, state.sort.dateSortDirection, null);
    }

    state.courses.allCourses = sortedCourses;
    state.courses.coursesList = sortedCourses.slice(start, end);
    state.lessons.allLessons = sortedLessons;
    state.lessons.lessonsList = sortedLessons.slice(start, end);
  }),
  applyFilters: createMutation((state, filters: DataFilters) => {
    const filteredCourses = filterCourses(state.courses.initialCourses, filters);
    const filteredLessons = filterLessons(state.lessons.initialLessons, filters);
    let totalPages = getTotalPages(filteredCourses.length, state.pagintation.limit);

    if (state.activeView === 'lessons') {
      totalPages = getTotalPages(filteredLessons.length, state.pagintation.limit);
    }

    state.pagintation.activePage = 1;
    state.pagintation.hasPreviousPage = false;
    if (totalPages > 1) {
      state.pagintation.hasNextPage = true;
    } else {
      state.pagintation.hasNextPage = false;
    }
    state.pagintation.totalPages = totalPages;

    state.courses.allCourses = filteredCourses;
    state.courses.coursesList = filteredCourses.slice(0, state.pagintation.limit);

    state.lessons.allLessons = filteredLessons;
    state.lessons.lessonsList = filteredLessons.slice(0, state.pagintation.limit);
  }),
  clearFilters: createMutation((state) => {
    state.courses.allCourses = [...state.courses.initialCourses];
    state.courses.coursesList = state.courses.initialCourses.slice(0, state.pagintation.limit);

    state.lessons.allLessons = [...state.lessons.initialLessons];
    state.lessons.lessonsList = state.lessons.initialLessons.slice(0, state.pagintation.limit);

    let totalPages = getTotalPages(state.courses.initialCourses.length, state.pagintation.limit);

    if (state.activeView === 'lessons') {
      totalPages = getTotalPages(state.lessons.initialLessons.length, state.pagintation.limit);
    }

    state.pagintation.activePage = 1;
    state.pagintation.hasPreviousPage = false;
    if (totalPages > 1) {
      state.pagintation.hasNextPage = true;
    } else {
      state.pagintation.hasNextPage = false;
    }
    state.pagintation.totalPages = totalPages;
  })
};

export const coursesListMutations = createMutationMap<typeof mutations, CoursesListState>(NAMESPACE, mutations);
