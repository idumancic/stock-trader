<template>
  <b-col sm="12" md="12" lg="6" xl="4" class="mb-3">
    <b-card :bg-variant="colorVariant" header-text-variant="white">
      <template #header>
        <slot name="stock-header" v-bind:stock="stock">
          <h5 class="font-weight-bold mb-0 float-left">
            {{ stock.name }}
          </h5>
          <b-badge
            :variant="actionVariant"
            class="float-right"
            style="margin-top: 0.2rem;"
          >
            Price: {{ stock.price | currency }}
          </b-badge>
        </slot>
      </template>
      <b-input-group>
        <b-input
          type="number"
          placeholder="Quantity"
          v-model.number="quantity"
          :max="maxQuantity"
        />

        <b-input-group-append>
          <b-button
            :variant="actionVariant"
            @click="onActionClick"
            :disabled="isActionButtonDisabled"
          >
            <slot name="stock-action">
              Action
            </slot>
          </b-button>
        </b-input-group-append>
      </b-input-group>
    </b-card>
  </b-col>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Stock, OrderStock, StockPortfolio } from "@/types";

@Component
export default class StockComponent extends Vue {
  @Prop({ required: true }) readonly stock!: Stock | StockPortfolio;
  @Prop({ default: "dark" }) readonly colorVariant!: string;
  @Prop({ default: "success" }) readonly actionVariant!: string;
  @Prop() readonly maxQuantity!: number;

  private quantity = 0;

  get isActionButtonDisabled(): boolean {
    return this.quantity <= 0 || this.quantity > this.maxQuantity;
  }

  onActionClick(): void {
    const orderStock: OrderStock = {
      stockId: this.stock.id,
      stockPrice: this.stock.price ?? 0,
      quantity: this.quantity
    };

    this.$emit("action", orderStock);
    this.quantity = 0;
  }
}
</script>

<style></style>
