/* eslint-disable import/no-cycle */
/* eslint-disable array-callback-return */
import { createMutationFactory, createMutationMap } from '~app/shared/vuex';
import { NAMESPACE, CourseDetailsState } from './state';
import CourseModel from '../models/course';

const createMutation = createMutationFactory<CourseDetailsState>();

export const mutations = {
  setActiveCourse: createMutation((state, course: CourseModel) => {
    state.activeCourse = course;
  }),
  setEditingActive: createMutation((state) => {
    state.isEditing = true;
  }),
  setEditingInactive: createMutation((state) => {
    state.isEditing = false;
  })
};

export const coursesListMutations = createMutationMap<typeof mutations, CourseDetailsState>(NAMESPACE, mutations);
