import { RouteRecordRaw } from 'vue-router';

export const authRoutes: RouteRecordRaw[] = [
  {
    path: 'password',
    component: () => import(/* webpackChunkName: "auth" */ './components/password/page.vue')
  },
  {
    path: 'preferences',
    name: 'auth-user-preferences',
    component: () => import(/* webpackChunkName: "auth" */ './components/preferences.vue')
  }
];

export const authRoutesPublic: RouteRecordRaw[] = [
  {
    path: '/password-reset',
    name: 'password-reset',
    component: () => import(/* webpackChunkName: "auth" */ './components/password-reset.vue'),
    meta: {
      guest: true,
      layout: 'public'
    }
  }
];
