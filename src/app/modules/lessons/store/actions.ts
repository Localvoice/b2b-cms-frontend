/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
import { RootState } from '~app/core/store';
import { createActionFactory, createActionMap } from '~app/shared/vuex';
import { lessonsListMutations } from './mutations';
import { NAMESPACE, LessonDetailsState } from './state';
// import lessonListApi from '../service/lessonList.api';
import CourseModel from '../models/lesson';
import { lessons } from '../dummyData/lessons';

const createAction = createActionFactory<LessonDetailsState, RootState>();

export const actions = {
  fetchLessonDetails: createAction(({ commit }, { lessonId } = {}) => {
    commit(lessonsListMutations.setActiveLesson.local, lessons[0]);
    // lessonListApi.getLessonsList().then((data) => {
    //   console.log('data from chatbots', data);
    //   commit(lessonListMutations.setLessonList.local, data);
    // });
  }),
  setLessonEditing: createAction(({ commit }) => {
    commit(lessonsListMutations.setEditingActive.local);
  }),
  leaveLessonEditing: createAction(({ commit }) => {
    commit(lessonsListMutations.setEditingInactive.local);
  })
};

export const lessonDetailsActions = createActionMap<typeof actions, LessonDetailsState, RootState>(NAMESPACE, actions);
