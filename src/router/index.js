import Vue from "vue";
import VueRouter from "vue-router";

import { auth } from "@/firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  console.log(user);
  to.matched.some(record => record.meta.requiresAuth)
    ? user
      ? next()
      : next({ name: "Login" })
    : next();
});

export default router;
