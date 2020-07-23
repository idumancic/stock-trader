import Vue from "vue";
import Vuex from "vuex";
import { getStoreBuilder } from "vuex-typex";

import { StockState } from "./modules/stocks";
import { PortfolioState } from "./modules/portfolio";
import { GlobalState } from "./modules/global";

Vue.use(Vuex);

export interface RootState {
  stocks: StockState;
  portfolio: PortfolioState;
  global: GlobalState;
}

export default getStoreBuilder<RootState>().vuexStore();
