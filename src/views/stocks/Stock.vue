<template>
  <b-col sm="12" md="6" lg="4" xl="4" class="mb-3">
    <b-card
      border-variant="dark"
      header-bg-variant="dark"
      header-text-variant="white"
    >
      <template #header>
        <h5 class="font-weight-bold mb-0">
          {{ stock.name }}
          <small>(Price: {{ stock.price }})</small>
        </h5>
      </template>
      <div class="float-left">
        <b-input type="number" placeholder="Quantity" v-model="quantity" />
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

@Component
export default class StockComponent extends Vue {
  @Prop({ required: true }) stock!: Stock;

  quantity = 0;

  get isBuyButtonDisabled(): boolean {
    return this.quantity <= 0 || !Number.isInteger(this.quantity);
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
