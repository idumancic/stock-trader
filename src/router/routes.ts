import { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import Portfolio from "@/views/portfolio/Portfolio.vue";
import Stocks from "@/views/stocks/Stocks.vue";

export const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: Portfolio
  },
  {
    path: "/stocks",
    name: "Stocks",
    component: Stocks
  }
];
