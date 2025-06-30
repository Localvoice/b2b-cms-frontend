/* eslint-disable import/no-cycle */
/* eslint-disable no-shadow */
import { RootState } from '~app/core/store';
import { createActionFactory, createActionMap } from '~app/shared/vuex';
import { coursesListMutations } from './mutations';
import { NAMESPACE, CourseDetailsState } from './state';
import { courses } from '../dummyData/courses';
import { lessons } from '../dummyData/lessons';
// import lessonListApi from '../service/lessonList.api';

const createAction = createActionFactory<CourseDetailsState, RootState>();

export const actions = {
  fetchCourseDetails: createAction(({ commit }, { courseId }) => {
    const courseDetails = courses.find((course) => course.courseId === courseId);
    commit(coursesListMutations.setActiveCourse.local, courseDetails ? courseDetails : null);

    const courseLessons = lessons.filter((lesson) => lesson.courseId === courseId);
    commit(coursesListMutations.setCourseLessons.local, courseLessons);
  })
};

export const courseDetailsActions = createActionMap<typeof actions, CourseDetailsState, RootState>(NAMESPACE, actions);
