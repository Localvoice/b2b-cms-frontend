/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
import { RootState } from '~app/core/store';
import { createActionFactory, createActionMap } from '~app/shared/vuex';
import { lessonsListMutations } from './mutations';
import { NAMESPACE, LessonDetailsState } from './state';
// import lessonListApi from '../service/lessonList.api';
import { lessons } from '../dummyData/lessons';

const createAction = createActionFactory<LessonDetailsState, RootState>();

export const actions = {
  fetchLessonDetails: createAction(({ commit }, { lessonId }) => {
    const lesson = lessons.find((lesson) => lesson.lessonId === lessonId);
    commit(lessonsListMutations.setActiveLesson.local, lesson ? lesson : null);
    // lessonListApi.getLessonsList().then((data) => {
    //   console.log('data from chatbots', data);
    //   commit(lessonListMutations.setLessonList.local, data);
    // });
  })
};

export const lessonDetailsActions = createActionMap<typeof actions, LessonDetailsState, RootState>(NAMESPACE, actions);
