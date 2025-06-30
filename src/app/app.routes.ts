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
        component: () => import(/* webpackChunkName: "dashboard" */ '~app/modules/platform/views/Dashboard.vue')
      },
      {
        path: '/app/courses',
        meta: { title: 'Twoje Kursy' },
        component: () => import(/* webpackChunkName: "courses" */ '~app/modules/platform/views/CoursesList.vue')
      },
      {
        path: '/app/courses/:courseId',
        meta: { title: 'Zawartość kursu' },
        component: () =>
          import(
            /* webpackChunkName: "course-id" */ '~app/modules/platform/submodules/course-details/views/CourseDetails.vue'
          )
      },
      {
        path: '/app/lessons',
        meta: { title: 'Twoje Lekcje' },
        component: () => import(/* webpackChunkName: "lessons" */ '~app/modules/platform/views/LessonsList.vue')
      },
      {
        path: '/app/lessons/:lessonId',
        meta: { title: 'Zawartość lekcji' },
        component: () =>
          import(
            /* webpackChunkName: "lesson-id" */ '~app/modules/platform/submodules/lesson-details/views/LessonDetails.vue'
          )
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
      },
      {
        path: '/app/finances',
        meta: { title: 'Finanse' },
        component: () => import(/* webpackChunkName: "finances" */ '~app/modules/finances/views/index.vue')
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
      },
      {
        path: 'onboarding',
        name: 'onboarding',
        meta: { title: 'Onboarding' },
        component: () =>
          import(/* webpackChunkName: "session-onboarding" */ '~app/modules/onboarding/views/Onboarding.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "not-found" */ '~app/core/router/not-found.vue')
  }
];
