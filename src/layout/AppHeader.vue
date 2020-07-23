<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" sticky>
    <b-container>
      <b-navbar-brand to="/">Stock Trader</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/portfolio">
            <i class="fas fa-chart-pie"></i>Portfolio
          </b-nav-item>
          <b-nav-item to="/stocks">
            <i class="fas fa-chart-line"></i>Stocks
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="onEndDayClick">
            <i class="fas fa-calendar-day"></i>End Day
          </b-nav-item>
          <b-nav-item-dropdown right>
            <template #text><i class="fas fa-cog"></i>Settings </template>
            <b-dropdown-item @click="onSaveDataClick">
              <i class="fas fa-cloud-upload-alt"></i>Save Data
            </b-dropdown-item>
            <b-dropdown-item @click="onLoadDataClick">
              <i class="fas fa-cloud-download-alt"></i>Load Data
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-text class="ml-xl-4 ml-lg-4 d-none d-lg-block d-xl-block">
            <i class="fas fa-wallet"></i>Funds:
            <strong>{{ funds | currency }}</strong>
          </b-nav-text>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { portfolio, stocks } from "@modules";

@Component
export default class AppHeader extends Vue {
  get funds() {
    return portfolio.funds;
  }

  onEndDayClick() {
    stocks.dispatchRandomizeStocks();
  }

  onSaveDataClick() {
    portfolio.dispatchSave();
  }

  onLoadDataClick() {
    portfolio.dispatchLoad();
  }
}
</script>

<style></style>
