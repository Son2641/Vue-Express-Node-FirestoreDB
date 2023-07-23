import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import StudentView from '../views/Students/View.vue';
import StudentCreate from '../views/Students/Create.vue';
import Update from '../views/Students/Update.vue';
import { useAuth0 } from '@auth0/auth0-vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/students',
      name: 'students',
      component: StudentView,
      meta: { requiresAuth: true },
    },
    {
      path: '/students/create',
      name: 'studentCreate',
      component: StudentCreate,
      meta: { requiresAuth: true },
    },
    {
      path: '/students/:id/update',
      name: 'studentUpdate',
      component: Update,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth0();

  if (
    to.matched.some((record) => record.meta.requiresAuth) &&
    !isAuthenticated.value
  ) {
    alert('Login to access student list');
    next('/');
  } else {
    next();
  }
});

export default router;
