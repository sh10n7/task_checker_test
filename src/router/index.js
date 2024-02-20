import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AuthComponent from '../components/AuthComponent.vue';

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: AuthComponent
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    meta: { requiresAuth: true } // このルートは認証が必要であるという明記をする。
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
