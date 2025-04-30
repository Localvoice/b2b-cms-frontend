import { App } from 'vue';
import { ApiClient } from '~app/core/api/client';
import { Config } from '~app/core/config';
import { setLanguage } from '~app/core/i18n/i18n';
import { router } from '~app/core/router';
import { store } from '~app/core/store';
import { voicebotActions } from '../voicebot/structure/store';
import { AuthPermission, TokenStorage } from './model';
import { AuthInjectKey, AuthService } from './service/auth.service';
import { userHasAccess } from './service/permissions';
import { authActions, authGetters, authStore, NAMESPACE } from './store';

export function AuthModule(app: App, config: Config, api: ApiClient): Promise<any> {
  const authService = new AuthService(new TokenStorage(), api);

  return authService.initialize().then((token) => {
    // Register the auth module
    store.registerModule(NAMESPACE, authStore);

    // Watch for changes in language getter
    store.watch((state, getters) => getters[authGetters.getLanguage], setLanguage);

    // Global properties for permissions and auth
    app.config.globalProperties.$permission = AuthPermission;
    app.config.globalProperties.$auth = {
      hasAccess: userHasAccess
    };

    // Provide the auth service to the app
    app.provide(AuthInjectKey, authService);

    // Navigation guard
    router.beforeEach((to, from, next) => {
      const isAuthorized: boolean = store.getters[authGetters.isAuthorized];
      const isGuest = to.matched.some((r) => r.meta.guest);

      if (isGuest) {
        return isAuthorized ? next('/') : next();
      }

      // TODO change this when it's done
      if (!isAuthorized) {
        console.log('User is not authorized');
        // return authService.logout();
      }

      return next();
    });

    if (!token) {
      return Promise.resolve(null);
    }

    // return Promise.all([store.dispatch(authActions.fetchUser), store.dispatch(voicebotActions.fetchStructure)]);
    return Promise.all([store.dispatch(authActions.fetchUser)]);
  });
}
