import "@babel/polyfill";
import "mutationobserver-shim";
import "reflect-metadata";
import Vue from "vue";

import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.config.errorHandler = (err: Error, vm: Vue & { $bvToast: any }) => {
  console.log(err.stack);
  vm.$bvToast.toast(err.message, {
    title: "Stock Trader",
    variant: "danger"
  });
};

Vue.filter("currency", (value: string | number) => {
  return `$${value.toLocaleString()}`;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
