<template>
  <div id="app">
    <app-header></app-header>
    <app-content></app-content>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import AppHeader from "./layout/AppHeader.vue";
import AppContent from "./layout/AppContent.vue";
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
  scroll-behavior: smooth;
  background-color: #ddd;
}

#app {
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 16px;
}

i {
  margin-right: 0.5rem;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}

::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #343a40;
}
</style>
