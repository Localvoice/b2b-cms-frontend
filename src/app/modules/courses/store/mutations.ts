/* eslint-disable import/no-cycle */
/* eslint-disable array-callback-return */
import { createMutationFactory, createMutationMap } from '~app/shared/vuex';
import { NAMESPACE, CourseDetailsState } from './state';
import CourseModel from '../models/Course';
import LessonModel from '../models/Lesson';

const createMutation = createMutationFactory<CourseDetailsState>();

export const mutations = {
  setActiveCourse: createMutation((state, course: CourseModel) => {
    state.activeCourse = course;
  }),
  setCourseLessons: createMutation((state, lessons: LessonModel[]) => {
    state.courseLessons = lessons;
  }),
  setSelectedLessonId: createMutation((state, lessonId: string | null) => {
    state.selectedLessonId = lessonId;
    if (!lessonId) {
      return (state.lessonExamples = []);
    }
    const lesson = state.courseLessons.find((lesson) => lesson.lessonId === lessonId);
    if (!lesson) return;
    state.lessonExamples = lesson.lessonExamples;
  })
};

export const coursesListMutations = createMutationMap<typeof mutations, CourseDetailsState>(NAMESPACE, mutations);
