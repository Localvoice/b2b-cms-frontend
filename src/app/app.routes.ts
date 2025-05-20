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
        component: () => import(/* webpackChunkName: "dashboard" */ '~app/modules/dashboard/views/Dashboard.vue')
      },
      {
        path: '/app/courses',
        meta: { title: 'Twoje Kursy' },
        component: () => import(/* webpackChunkName: "courses" */ '~app/modules/courses/views/CoursesList.vue')
      },
      {
        path: '/app/courses/course-id',
        meta: { title: 'Zawartość kursu' },
        component: () => import(/* webpackChunkName: "course-id" */ '~app/modules/courses/views/CourseDetails.vue')
      },
      {
        path: '/app/lessons',
        meta: { title: 'Twoje Lekcje' },
        component: () => import(/* webpackChunkName: "lessons" */ '~app/modules/lessons/views/LessonsList.vue')
      },
      {
        path: '/app/lessons/lesson-id',
        meta: { title: 'Zawartość lekcji' },
        component: () => import(/* webpackChunkName: "lesson-id" */ '~app/modules/lessons/views/LessonDetails.vue')
      },
      {
        path: '/app/stats',
        meta: { title: 'Statystyki' },
        component: () => import(/* webpackChunkName: "stats" */ '~app/modules/stats/views/index.vue')
      },
      {
        path: '/app/settings',
        meta: { title: 'Ustawienia' },
        component: () => import(/* webpackChunkName: "settings" */ '~app/modules/settings/views/index.vue')
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
