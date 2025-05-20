/* eslint-disable import/no-cycle */
import { createEntityAdapter, EntityAdapter } from '~app/shared/vuex';
import UserDataModel from '../models/userData';
import { userData } from '../dummyData/userData';

export const NAMESPACE = 'settings';

export interface SettingsState {
  userData: UserDataModel | null;
  isEditing: boolean;
}

export const CoursesListEntityAdapter: EntityAdapter<UserDataModel> = createEntityAdapter<UserDataModel>();

export function initialState(): SettingsState {
  return {
    userData,
    isEditing: false
  };
}
