import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '',
        component: () => import('pages/IndexPage.vue'),
        /*meta: { requiresAuth: true } // Требует авторизации*/
      }],
  },

  {
    path: '/login',
    component: () => import('pages/AuthPage.vue'),
    meta: { requiresAuth: false } // Не требует авторизации
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
