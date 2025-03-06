import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import home from "../views/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: home,
    },
    {
      path: "/register-user",
      name: "register",
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/register-coach",
      name: "register-coach",
      component: () => import("../views/RegisterCoach.vue"),
    },
    {
      path: "/sign-in",
      name: "sign-in",
      component: () => import("../views/SignIn.vue"),
    },
    {
      path: "/reset-password",
      name: "resetPassword",
      component: () => import("../views/ResetPwd.vue"),
    },
    {
      path: "/edit/:uid",
      name: "edit",
      component: () => import("../views/editProfile.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/my-profile",
      name: "myProfile",
      component: () => import("../views/myProfile.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/schedule",
      name: "schedule",
      component: () => import("../views/schedule.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/connections",
      name: "connections",
      component: () => import("../views/connections.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/offers/:uid",
      name: "offers",
      component: () => import("../views/offers.vue"),
    },
    {
      path: "/profile/:uid",
      name: "profile",
      props: true,
      component: () => import("../views/user.vue"),
    },
    {
      path: "/bookings",
      name: "bookings",
      props: true,
      component: () => import("../views/bookings.vue"),
    },
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      user => {
        removeListener();
        resolve(user);
      },
      reject,
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      alert("You need to be signed in to view this page");
      next("/sign-in");
    }
  } else {
    next();
  }
});
export default router;
