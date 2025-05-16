/* eslint-disable import/no-cycle */
/* eslint-disable array-callback-return */
import { createMutationFactory, createMutationMap } from '~app/shared/vuex';
import { NAMESPACE, LessonDetailsState } from './state';
import LessonModel from '../models/lesson';

const createMutation = createMutationFactory<LessonDetailsState>();

export const mutations = {
  setActiveLesson: createMutation((state, lesson: LessonModel) => {
    state.activeLesson = lesson;
  }),
  setEditingActive: createMutation((state) => {
    state.isEditing = true;
  }),
  setEditingInactive: createMutation((state) => {
    state.isEditing = false;
  })
};

export const lessonsListMutations = createMutationMap<typeof mutations, LessonDetailsState>(NAMESPACE, mutations);
