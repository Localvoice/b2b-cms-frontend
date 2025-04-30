/* eslint-disable import/no-cycle */
import { api } from '~app/core/api/client';
import { ApiCollectionResponse } from '~app/core/api/response';
import { deserialize } from '~app/shared/json-mapper';
import { CourseStructureModel } from '../models/courseStructure';

const structureApi = {
  getStructure(): Promise<ApiCollectionResponse<CourseStructureModel>> {
    return api.get<CourseStructureModel[]>('/api/voicebot/structure').then((response) => {
      return {
        total: response.data.length,
        data: response.data.map((it) => deserialize(CourseStructureModel, it))
      } as ApiCollectionResponse<CourseStructureModel>;
    });
  }
};

export default structureApi;
