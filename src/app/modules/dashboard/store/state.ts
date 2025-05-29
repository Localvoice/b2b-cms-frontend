/* eslint-disable import/no-cycle */
import { createEntityAdapter, EntityAdapter } from '~app/shared/vuex';
import CourseModel from '../models/course';
import LessonModel from '../../lessons/models/lesson';

export type CourseWithSingleCategory = Omit<CourseModel, 'categories'> & {
  category: string;
};
export type ActiveView = 'courses' | 'lessons';

export const NAMESPACE = 'coursesList';

export interface CoursesListState {
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
    allCourses: CourseWithSingleCategory[];
    coursesList: CourseWithSingleCategory[];
  };
  lessons: {
    allLessons: LessonModel[];
    lessonsList: LessonModel[];
  };
}

export const CoursesListEntityAdapter: EntityAdapter<CourseModel> = createEntityAdapter<CourseModel>();

export function initialState(): CoursesListState {
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
      allCourses: [],
      coursesList: []
    },
    lessons: {
      allLessons: [],
      lessonsList: []
    }
  };
}
