<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand to="/">Stock Trader</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/portfolio" active-class="active">Portfolio</b-nav-item>
        <b-nav-item to="/stocks" active-class="active">Stocks</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="#">End Day</b-nav-item>
        <b-nav-item-dropdown text="Save & Load" right>
          <b-dropdown-item href="#">Save Data</b-dropdown-item>
          <b-dropdown-item href="#">Load Data</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class AppHeader extends Vue {}
</script>

<style></style>
