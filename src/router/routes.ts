import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/Login',
  },
  {
    path: '/Login',
    name: 'Login',
    meta: { title: 'Login' },
    component: () => import('pages/login/LoginPage.vue'),
  },
  {
    path: '/DoggyChat',
    name: 'DoggyChat',
    redirect: '/DoggyChat/Home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'Home',
        name: 'Home',
        component: () => import('pages/personal/PersonalPage.vue'),
      },
      {
        path: 'ChatBox/:userId',
        name: 'ChatBox',
        component: () => import('pages/chatBox/chatBoxPage.vue'),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
