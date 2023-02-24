import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginUser from "../views/LoginUser.vue";
import RegisterUser from "../views/RegisterUser.vue";
import UserInfo from "../views/UserInfo.vue";
import MonsterBattle from "../views/MonsterBattle.vue";
import NotFound from "../views/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  { path: "/login", name: "login", component: LoginUser },
  { path: "/register", name: "register", component: RegisterUser },
  { path: "/userInfo", name: "userInfo", component: UserInfo },
  { path: "/battle", name: "battle", component: MonsterBattle },
  { path: "/:notFound(.*)", name: "notFound", component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
