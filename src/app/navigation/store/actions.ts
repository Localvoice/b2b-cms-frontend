import { hasFeature } from '~app/core/config/features';
import { RootState } from '~app/core/store';
import { userHasAccess } from '~app/modules/auth/service/permissions';
import { createActionFactory, createActionMap } from '~app/shared/vuex';
import { getMenuItems } from '../data/menu-items';
import { navigationMutations } from './mutations';
import { NAMESPACE, NavigationState } from './state';

const createAction = createActionFactory<NavigationState, RootState>();

export const actions = {
  loadNavigation: createAction(({ commit }) => {
    return Promise.resolve(getMenuItems()).then((items) => {
      let accessedItems = items;
      if (hasFeature('permissions')) {
        accessedItems = items.filter((item) => {
          if (item.permissions) return userHasAccess(item.permissions, 'OR');
          return true;
        });
      }
      commit(navigationMutations.setNavigation.local, accessedItems);
    });
  })
};

export const navigationActions = createActionMap<typeof actions, NavigationState, RootState>(NAMESPACE, actions);
