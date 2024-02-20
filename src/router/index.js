import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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

// ナビゲーションガード。移動前に認証状態を確認し、認証が必要なルートかを判断。
// ユーザーが未認証の場合はログインページに遷移するようにする。
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (requiresAuth && !user) {
      next('/');
    } else if (!requiresAuth && user) {
      next('/home');
    } else {
      next();
    }
  });
});

export default router;
