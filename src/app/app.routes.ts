import { defineComponent } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { RouterView } from '~app/core/router';

export const appRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('~app/modules/index.vue'),
    // beforeEnter: authenticate,
    redirect: '/app',
    children: [
      {
        path: '/app',
        meta: { title: 'Strona główna' },
        component: defineComponent({
          render: () => '/app page'
        })
      }
    ]
  },
  {
    path: '/session',
    component: RouterView,
    name: 'session',
    redirect: '/session/sign-in',
    children: [
      {
        path: 'sign-in',
        name: 'sign-in',
        meta: { title: 'Zaloguj się' },
        component: () => import(/* webpackChunkName: "session" */ '~app/modules/session/views/SignIn.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "not-found" */ '~app/core/router/not-found.vue')
  }
];
