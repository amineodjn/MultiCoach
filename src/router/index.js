import { createRouter, createWebHistory } from 'vue-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: () => import('../views/SignIn.vue'),
    },
    {
      path: '/feed',
      name: 'feed',
      component: () => import('../views/Feed.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('../views/ResetPwd.vue'),
    },
  ],
});

const getCurrentUser = () => {
  return new Promise ((resolve, reject) => {
    const removeListener = onAuthStateChanged(getAuth(), 
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  })
}

router.beforeEach(async (to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert('You need to be signed in to view this page');
      next('/sign-in');
    }

  } else {
    next();
  }
}); 
export default router;