/* eslint-disable import/no-cycle */
import { createEntityAdapter, EntityAdapter } from '~app/shared/vuex';
import LessonModel from '../models/Lesson';

export const NAMESPACE = 'lessonDetails';

export interface LessonDetailsState {
  activeLesson: LessonModel | null;
}

export const CoursesListEntityAdapter: EntityAdapter<LessonModel> = createEntityAdapter<LessonModel>();

export function initialState(): LessonDetailsState {
  return {
    activeLesson: null
  };
}
