import Vue from "vue";
import Vuex from "vuex";
import { getStoreBuilder } from "vuex-typex";

import { StockState } from "./modules/stocks/types";
import { PortfolioState } from "./modules/portfolio/types";

Vue.use(Vuex);

export interface RootState {
  stocks: StockState;
  portfolio: PortfolioState;
}

export default getStoreBuilder<RootState>().vuexStore();
