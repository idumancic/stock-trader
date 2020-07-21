<template>
  <b-col sm="12" md="4" lg="3" xl="3" class="mb-3">
    <b-card
      border-variant="dark"
      header-bg-variant="dark"
      header-text-variant="white"
    >
      <template #header>
        <h5 class="font-weight-bold mb-0 float-left">
          {{ stock.name }}
        </h5>
        <b-badge variant="" class="float-right" style="margin-top: 0.2rem;">
          Price: {{ stock.price | currency }}
        </b-badge>
      </template>
      <div class="float-left">
        <b-input
          type="number"
          placeholder="Quantity"
          v-model.number="quantity"
          :max="maxStockQuantity"
        />
      </div>
      <div class="float-right">
        <b-button
          variant="success"
          @click="buyStock"
          :disabled="isBuyButtonDisabled"
          >Buy</b-button
        >
      </div>
    </b-card>
  </b-col>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Stock, OrderStock } from "@/store/modules/stocks/types";
import stocksModule from "@/store/modules/stocks";
import portfolioModule from "@/store/modules/portfolio";

@Component
export default class StockComponent extends Vue {
  @Prop({ required: true }) stock!: Stock;

  quantity = 0;

  get isBuyButtonDisabled(): boolean {
    return this.quantity <= 0;
  }

  get maxStockQuantity(): number {
    return Math.round(portfolioModule.funds / this.stock.price);
  }

  buyStock(): void {
    const order: OrderStock = {
      stockId: this.stock.id,
      stockPrice: this.stock.price,
      quantity: this.quantity
    };

    stocksModule.dispatchBuyStock(order);
    this.quantity = 0;
  }
}
</script>

<style></style>
