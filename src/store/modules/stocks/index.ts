/* eslint-disable @typescript-eslint/no-use-before-define */
import { getStoreBuilder, BareActionContext } from "vuex-typex";
import portfolioModule from "../portfolio";

import { RootState } from "@/store/index";
import { Stock, OrderStock, StockState } from "./types";

const intialState: StockState = {
  stocks: []
};

const module = getStoreBuilder<RootState>().module<StockState>(
  "stocks",
  intialState
);

const getters = {
  stocks: module.read(state => state.stocks, "stocks")
};

const mutations = {
  setStocks(state: StockState, stocks: Stock[]) {
    state.stocks = stocks;
  },
  randomStocks(state: StockState) {
    state.stocks.forEach((stock: Stock) => {
      stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
    });
  }
};

const actions = {
  buyStock(_: BareActionContext<StockState, RootState>, order: OrderStock) {
    portfolioModule.commitBuyStock(order);
  },
  initStocks() {
    stocks.commitSetStocks([
      { id: 1, name: "BMW", price: 110 },
      { id: 2, name: "Google", price: 200 },
      { id: 3, name: "Apple", price: 250 },
      { id: 4, name: "Twitter", price: 8 },
      { id: 5, name: "Tesla", price: 95 }
    ]);
  },
  randomizeStocks() {
    stocks.commitRandomStocks();
  }
};

const stocks = {
  get state() {
    return module.state();
  },

  get stocks() {
    return getters.stocks();
  },

  commitSetStocks: module.commit(mutations.setStocks),
  commitRandomStocks: module.commit(mutations.randomStocks),

  dispatchBuyStock: module.dispatch(actions.buyStock),
  dispatchInitStocks: module.dispatch(actions.initStocks),
  dispatchRandomizeStocks: module.dispatch(actions.randomizeStocks)
};

export default stocks;
