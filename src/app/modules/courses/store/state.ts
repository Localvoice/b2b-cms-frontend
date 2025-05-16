/* eslint-disable import/no-cycle */
import { createEntityAdapter, EntityAdapter } from '~app/shared/vuex';
import CourseModel from '../models/course';

export const NAMESPACE = 'courseDetails';

export interface CourseDetailsState {
  activeCourse: CourseModel | null;
  isEditing: boolean;
}

export const CoursesListEntityAdapter: EntityAdapter<CourseModel> = createEntityAdapter<CourseModel>();

export function initialState(): CourseDetailsState {
  return {
    activeCourse: null,
    isEditing: false
  };
}
