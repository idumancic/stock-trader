<template>
  <b-row v-if="stocks.length > 0">
    <stock
      v-for="stock in stocks"
      :key="stock.id"
      :stock="stock"
      :max-quantity="stock.quantity"
      color-variant="info"
      action-variant="danger"
      @action="onSellAction"
    >
      <template #stock-header>
        <h5 class="font-weight-bold mb-0 float-left">
          {{ stock.name }}
        </h5>
        <div class="float-right" style="margin-top: -0.1rem;">
          <b-badge variant="light" class="mr-1">
            Price: {{ stock.price | currency }}
          </b-badge>
          <b-badge variant="light">Quantity: {{ stock.quantity }}</b-badge>
        </div>
      </template>
      <template #stock-action> <i class="fas fa-coins"></i>Sell </template>
    </stock>
  </b-row>
  <b-row v-else>
    <b-col xl="12" class="text-center">
      <span class="no-portfolio">Portfolio is empty &#128533;</span>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import StockComponent from "@/components/BaseStock.vue";

import { portfolio } from "@/store/modules";
import { OrderStock } from "@/store/modules/stocks/types";

@Component({
  components: {
    stock: StockComponent
  }
})
export default class Stocks extends Vue {
  get stocks() {
    return portfolio.stockPortfolio;
  }

  onSellAction(order: OrderStock) {
    portfolio.commitSellStock(order);
  }
}
</script>

<style scoped>
.no-portfolio {
  font-size: 200%;
  font-weight: 300;
}
</style>
