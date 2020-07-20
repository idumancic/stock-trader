<template>
  <b-row>
    <stock v-for="stock in stocks" :key="stock.id" :stock="stock"></stock>
  </b-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import portfolioModule from "@/store/modules/portfolio";
import StockComponent from "./Stock.vue";

@Component({
  components: {
    stock: StockComponent
  }
})
export default class Stocks extends Vue {
  get stocks() {
    return portfolioModule.stockPortfolio;
  }
}
</script>
