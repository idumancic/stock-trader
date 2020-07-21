<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand to="/">Stock Trader</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/portfolio">Portfolio</b-nav-item>
        <b-nav-item to="/stocks">Stocks</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item @click="onEndDayClick">End Day</b-nav-item>
        <b-nav-item-dropdown text="Save & Load" right>
          <b-dropdown-item href="#">Save Data</b-dropdown-item>
          <b-dropdown-item href="#">Load Data</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-text class="ml-4">
          Funds: <strong>{{ funds | currency }}</strong>
        </b-nav-text>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import portfolioModule from "@/store/modules/portfolio";
import stocksModule from "@/store/modules/stocks";

@Component
export default class AppHeader extends Vue {
  get funds() {
    return portfolioModule.funds;
  }

  onEndDayClick() {
    stocksModule.dispatchRandomizeStocks();
  }
}
</script>

<style></style>
