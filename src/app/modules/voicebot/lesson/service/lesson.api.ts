import { api } from '~app/core/api/client';
import { router } from '~app/core/router';
import { deserialize } from '~app/shared/json-mapper';
import LessonModel from '../models/lesson';

const lessonApi = {
  getLesson(key: string): Promise<LessonModel | void> {
    const params = {
      key
    };
    return api
      .get<LessonModel>('/api/voicebot/lesson', { params })
      .then((response) => deserialize(LessonModel, response.data))
      .catch(() => {
        router.app.$toast.success('There was a problem with lesson fetching');
      });
  }
};

export default lessonApi;
