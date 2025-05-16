/* eslint-disable import/no-cycle */
import { createEntityAdapter, EntityAdapter } from '~app/shared/vuex';
import CourseModel from '../models/course';
import LessonModel from '../../lessons/models/lesson';

export type ActiveView = 'courses' | 'lessons';

export const NAMESPACE = 'coursesList';

export interface CoursesListState {
  activeView: ActiveView;
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
    activeView: 'courses',
    courses: {
      coursesList: []
    },
    lessons: {
      lessonsList: []
    }
  };
}
