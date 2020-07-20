<template>
  <b-row>
    <stock v-for="stock in stocks" :key="stock.id" :stock="stock"></stock>
  </b-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Stock, { IStock } from "./Stock.vue";

@Component({
  components: {
    Stock
  }
})
export default class Stocks extends Vue {
  stocks: IStock[] = [
    { id: 1, name: "BMW", price: 110 },
    { id: 2, name: "Google", price: 200 },
    { id: 3, name: "Apple", price: 250 },
    { id: 4, name: "Twitter", price: 8 },
    { id: 5, name: "Tesla", price: 95 }
  ];
}
</script>
