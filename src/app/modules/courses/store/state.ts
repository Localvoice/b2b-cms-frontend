/* eslint-disable import/no-cycle */
import { createEntityAdapter, EntityAdapter } from '~app/shared/vuex';
import CourseModel from '../models/Course';
import LessonModel from '../models/Lesson';
import LessonExample from '../models/LessonExample';

export const NAMESPACE = 'courseDetails';

export interface CourseDetailsState {
  activeCourse: CourseModel | null;
  courseLessons: LessonModel[];
  selectedLessonId: string | null;
  lessonExamples: LessonExample[];
}

export const CoursesListEntityAdapter: EntityAdapter<CourseModel> = createEntityAdapter<CourseModel>();

export function initialState(): CourseDetailsState {
  return {
    activeCourse: null,
    courseLessons: [],
    selectedLessonId: null,
    lessonExamples: []
  };
}
