<template>
  <b-row>
    <stock
      v-for="stock in stocks"
      :key="stock.id"
      :max-quantity="stock.maxQuantity"
      :stock="stock"
      @action="onBuyAction"
    >
      <template #stock-action> <i class="fas fa-coins"></i>Buy </template>
    </stock>
  </b-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import StockComponent from "@/components/BaseStock.vue";

import stocksModule from "@/store/modules/stocks";
import { Stock, OrderStock } from "@/store/modules/stocks/types";
import portfolioModule from "@/store/modules/portfolio";

@Component({
  components: {
    stock: StockComponent
  }
})
export default class Stocks extends Vue {
  get stocks() {
    return stocksModule.stocks.map(stock => {
      const temp: {
        id: number;
        price: number;
        name: string;
        maxQuantity: number;
      } = {
        ...stock,
        maxQuantity: Math.floor(portfolioModule.funds / stock.price)
      };

      return temp as Stock & { maxQuantity: number };
    });
  }

  onBuyAction(order: OrderStock) {
    stocksModule.dispatchBuyStock(order);
  }
}
</script>
