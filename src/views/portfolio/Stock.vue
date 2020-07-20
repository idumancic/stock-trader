<template>
  <b-col sm="12" md="6" lg="4" xl="4" class="mb-3">
    <b-card
      border-variant="primary"
      header-bg-variant="primary"
      header-text-variant="white"
    >
      <template #header>
        <h5 class="font-weight-bold mb-0 float-left">
          {{ stock.name }}
        </h5>
        <div class="float-right" style="margin-top: -0.1rem;">
          <b-badge variant="light" class="mr-1">
            Price: ${{ stock.price }}
          </b-badge>
          <b-badge variant="light">Quantity: {{ stock.quantity }}</b-badge>
        </div>
      </template>
      <div class="float-left">
        <b-input
          type="number"
          placeholder="Quantity"
          v-model.number="quantity"
        />
      </div>
      <div class="float-right">
        <b-button
          variant="danger"
          @click="sellStock"
          :disabled="isSellButtonDisabled"
        >
          Sell
        </b-button>
      </div>
    </b-card>
  </b-col>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { StockPortfolio } from "@/store/modules/portfolio/types";
import { OrderStock } from "@/store/modules/stocks/types";
import portofolioModule from "@/store/modules/portfolio";

@Component
export default class StockComponent extends Vue {
  @Prop({ required: true }) stock!: StockPortfolio;

  quantity = 0;

  get isSellButtonDisabled(): boolean {
    return this.quantity <= 0;
  }

  sellStock(): void {
    const order: OrderStock = {
      stockId: this.stock.id,
      stockPrice: this.stock.price,
      quantity: this.quantity
    };

    portofolioModule.commitSellStock(order);
    this.quantity = 0;
  }
}
</script>

<style></style>
