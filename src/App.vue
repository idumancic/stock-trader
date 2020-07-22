<template>
  <div id="app">
    <app-header></app-header>
    <app-content></app-content>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AppHeader from "./components/AppHeader.vue";
import AppContent from "./components/AppContent.vue";
import stocksModule from "@/store/modules/stocks";

@Component({
  components: {
    AppHeader,
    AppContent
  }
})
export default class App extends Vue {
  created() {
    stocksModule.dispatchInitStocks();
  }
}
</script>

<style>
html,
#app {
  background-color: #ddd;
}

#app {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 16px;
}
</style>
