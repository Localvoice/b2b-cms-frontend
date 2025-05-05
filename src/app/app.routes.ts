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
    meta: { hideNavigation: true },
    children: [
      {
        path: 'sign-in',
        name: 'sign-in',
        meta: { title: 'Zaloguj się' },
        component: () => import(/* webpackChunkName: "session-signin" */ '~app/modules/session/views/SignIn.vue')
      },
      {
        path: 'sign-up',
        name: 'sign-up',
        meta: { title: 'Zarejestruj się' },
        component: () => import(/* webpackChunkName: "session-signup" */ '~app/modules/session/views/SignUp.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "not-found" */ '~app/core/router/not-found.vue')
  }
];
