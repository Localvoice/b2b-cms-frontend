import { AxiosResponse } from 'axios';
import { router } from '~app/core/router';
import { api } from '~app/core/api/client';
import { ApiCollectionResponse } from '~app/core/api/response';
import LessonSummaryModel from '../models/lessonSummary';
import chatbotLessonListSummary from '../dummyData/chatbotLessonListSummary.json';

const lessonListApi = {
  getLessonsList(): Promise<ApiCollectionResponse<LessonSummaryModel>> {
    return api.get<LessonSummaryModel[]>('/api/voicebot/lessons').then((response) => {
      return chatbotLessonListSummary as ApiCollectionResponse<LessonSummaryModel>;
    });
  },
  removeLesson(key: string): Promise<void | AxiosResponse<string>> {
    const params = {
      key
    };
    return api
      .delete('/api/voicebot/lesson', { params })
      .then(() => {
        router.app.$toast.success('Lesson has been successfully deleted');
      })
      .catch((errorMessage) => {
        console.log('errorMessage', errorMessage);
        router.app.$toast.success('There was a problem to delete the lesson');
      });
  }
};

export default lessonListApi;
