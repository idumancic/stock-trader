import Vue from "vue";
import Vuex from "vuex";
import { getStoreBuilder } from "vuex-typex";

import { StockState } from "./modules/stocks/types";
import { PortfolioState } from "./modules/portfolio/types";
import { GlobalState } from "./modules/global/types";

Vue.use(Vuex);

export interface RootState {
  stocks: StockState;
  portfolio: PortfolioState;
  global: GlobalState;
}

export default getStoreBuilder<RootState>().vuexStore();
