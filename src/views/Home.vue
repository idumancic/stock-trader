<template>
  <b-jumbotron header="Stock Trader" lead="Trade or View your Portfolio">
    <p>You may Save & Load your Data</p>
    <p>Click on 'End Day' to begin a New Day!</p>
    <hr class="my-4" />
    <p>
      Your Funds: <strong> {{ funds | currency }}</strong>
    </p>
  </b-jumbotron>
</template>

<script>
import Vue from "vue";
import Component from "vue-class-component";
import { portfolio } from "@/store/modules";

@Component
export default class Home extends Vue {
  get funds() {
    return portfolio.funds;
  }
}
</script>

<style></style>
