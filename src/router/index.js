import Login from "@/views/Login.vue";
import Main from "@/views/Main.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/onlinejudge3/oj-annual-report-2025",
      name: "main",
      component: Main,
    },
    {
      path: "/onlinejudge3/oj-annual-report-2025/login",
      name: "login",
      component: Login,
    },
  ],
});

export default router;
