/* eslint-disable import/no-cycle */
import { createEntityAdapter, EntityAdapter } from '~app/shared/vuex';
import CourseModel from '../models/course';
import LessonModel from '../../lessons/models/lesson';

export type ActiveView = 'courses' | 'lessons';

export const NAMESPACE = 'coursesList';

export interface CoursesListState {
  activeView: ActiveView;
  courses: {
    allCourses: CourseModel[];
    coursesList: CourseModel[];
    pagintation: {
      activePage: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      limit: number;
    };
  };
  lessons: {
    lessonsList: LessonModel[];
  };
}

export const CoursesListEntityAdapter: EntityAdapter<CourseModel> = createEntityAdapter<CourseModel>();

export function initialState(): CoursesListState {
  return {
    activeView: 'courses',
    courses: {
      allCourses: [],
      coursesList: [],
      pagintation: {
        activePage: 1,
        totalPages: 1,
        hasNextPage: false,
        hasPreviousPage: false,
        limit: 5
      }
    },
    lessons: {
      lessonsList: []
    }
  };
}
