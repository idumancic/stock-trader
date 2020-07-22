<template>
  <b-row v-if="stocks.length > 0">
    <stock v-for="stock in stocks" :key="stock.id" :stock="stock"></stock>
  </b-row>
  <b-row v-else>
    <b-col xl="12" class="text-center">
      <span class="no-portfolio">Portfolio is empty &#128533;</span>
    </b-col>
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

<style scoped>
.no-portfolio {
  font-size: 200%;
  font-weight: 300;
}
</style>
