import { AxiosResponse } from 'axios';
import { api } from '~app/core/api/client';
import { ApiCollectionResponse } from '~app/core/api/response';
import { router } from '~app/core/router';
import { deserialize } from '~app/shared/json-mapper';
import LessonSummaryModel from '../models/lessonSummary';

const structureApi = {
  getLessonsList(): Promise<ApiCollectionResponse<LessonSummaryModel>> {
    return api.get<LessonSummaryModel[]>('/api/voicebot/lessons').then((response) => {
      return {
        total: response.data.length,
        data: response.data.map((it) => deserialize(LessonSummaryModel, it))
      } as ApiCollectionResponse<LessonSummaryModel>;
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

export default structureApi;
