import { RouteConfig } from "vue-router";

export const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: () => import("@/views/Portfolio.vue")
  },
  {
    path: "/stocks",
    name: "Stocks",
    component: () => import("@/views/Stocks.vue")
  }
];
