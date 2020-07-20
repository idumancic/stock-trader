import Vue from "vue";
import Vuex from "vuex";
import { getStoreBuilder } from "vuex-typex";
import { StockState } from "./modules/stocks/state";

Vue.use(Vuex);

export interface RootState {
  stock: StockState;
}

export default getStoreBuilder<RootState>().vuexStore();
