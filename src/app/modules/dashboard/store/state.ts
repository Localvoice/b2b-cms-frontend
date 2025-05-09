/* eslint-disable import/no-cycle */
import { createEntityAdapter, EntityAdapter } from '~app/shared/vuex';
import CourseModel from '../models/course';

export const NAMESPACE = 'coursesList';

export interface CoursesListState {
  courses: {
    coursesList: CourseModel[];
  };
}

export const CoursesListEntityAdapter: EntityAdapter<CourseModel> = createEntityAdapter<CourseModel>();

export function initialState(): CoursesListState {
  return {
    courses: {
      coursesList: []
    }
  };
}
