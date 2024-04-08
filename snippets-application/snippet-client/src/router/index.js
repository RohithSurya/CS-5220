import { createRouter, createWebHistory } from "vue-router";

import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import Profile from "../components/Profile.vue";
import Snippets from "../components/Snippets.vue";

const routes = [
  { path: "/", component: Register },
  { path: "/register", component: Register },
  { path: "/login", component: Login },
  { path: "/profile/:id", component: Profile },
  { path: "/snippets/:id", component: Snippets },
];

const router = createRouter({
  routes: routes,
  history: createWebHistory(),
});

export default router;
