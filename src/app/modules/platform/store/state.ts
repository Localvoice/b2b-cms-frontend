/* eslint-disable import/no-cycle */
import { createEntityAdapter, EntityAdapter } from '~app/shared/vuex';
import CourseModel from '../models/Course';
import LessonModel from '../models/Lesson';
import { ActiveView, CourseWithSingleCategory } from './types';

export const NAMESPACE = 'platform';

export interface PlatformState {
  activeView: ActiveView;
  pagintation: {
    activePage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    limit: number;
  };
  sort: {
    field: string | null;
    direction: 'asc' | 'desc' | null;
    dateSortDirection: 'asc' | 'desc';
  };
  courses: {
    initialCourses: CourseWithSingleCategory[];
    allCourses: CourseWithSingleCategory[];
    coursesList: CourseWithSingleCategory[];
  };
  lessons: {
    initialLessons: LessonModel[];
    allLessons: LessonModel[];
    lessonsList: LessonModel[];
  };
}

export const PlatformEntityAdapter: EntityAdapter<CourseModel> = createEntityAdapter<CourseModel>();

export function initialState(): PlatformState {
  return {
    activeView: 'courses',
    pagintation: {
      activePage: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
      limit: 5
    },
    sort: {
      field: null,
      direction: null,
      dateSortDirection: 'asc'
    },
    courses: {
      initialCourses: [],
      allCourses: [],
      coursesList: []
    },
    lessons: {
      initialLessons: [],
      allLessons: [],
      lessonsList: []
    }
  };
}
