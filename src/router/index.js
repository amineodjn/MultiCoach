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
      path: '/register-user',
      name: 'register',
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/register-coach',
      name: 'register-coach',
      component: () => import('../views/RegisterCoach.vue'),
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
      name: 'resetPassword',
      component: () => import('../views/ResetPwd.vue'),
    },
    {
      path: '/coach-profile/:uid',
      name: 'coachProfile',
      component: () => import('../views/coachProfile.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/user-profile/:uid',
      name: 'userProfile',
      component: () => import('../views/userProfile.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/myProfile',
      name: 'myProfile',
      component: () => import('../views/myProfile.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: () => import('../views/schedule.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/connections',
      name: 'connections',
      component: () => import('../views/connections.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/editProfile',
      name: 'editProfile',
      component: () => import('../views/editProfile.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/offers/:uid',
      name: 'offers',
      component: () => import('../views/offers.vue'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/profile.vue'),
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