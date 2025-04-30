import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash
      };
    }

    if (savedPosition) {
      return savedPosition;
    }

    return { left: 0, top: 0 };
  },
  linkActiveClass: 'active',
  routes: []
});
