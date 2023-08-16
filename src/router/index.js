import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
const routes = [
  {
    path: '/',
    redirect: '/home'
  },

  {
    path: '/home',
    name: 'home',
    meta: {
      title: 'Checker',
      icon: 'mdi-account',
      visible: true,
    },
    component: () => import('../views/Home.vue')
  },

  {
    path: '/grid',
    name: 'grid',
    meta: {
      title: 'Grid',
      icon: 'mdi-grid',
      visible: true,
  },
    component: () => import('../views/GridView.vue')
  },

  {
    path: '/',
    name: 'home',
    meta: {
      title: 'home',
    },

    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: 'Home',
          icon: 'mdi-view-dashboard',
          visible: true,
        },
        component: () => import('@/views/Home.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters["auth/Authenticated"]) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
})

export default router



