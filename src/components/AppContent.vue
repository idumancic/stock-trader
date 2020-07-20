<template>
  <b-container fluid class="p-3">
    <router-view />
  </b-container>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class AppContent extends Vue {}
</script>

<style></style>
