/* eslint-disable import/no-cycle */
import { createEntityAdapter, EntityAdapter } from '~app/shared/vuex';
import CourseModel from '../models/course';
import LessonModel from '../../lessons/models/lesson';

export const NAMESPACE = 'coursesList';

export interface CoursesListState {
  courses: {
    coursesList: CourseModel[];
  };
  lessons: {
    lessonsList: LessonModel[];
  };
}

export const CoursesListEntityAdapter: EntityAdapter<CourseModel> = createEntityAdapter<CourseModel>();

export function initialState(): CoursesListState {
  return {
    courses: {
      coursesList: []
    },
    lessons: {
      lessonsList: []
    }
  };
}
