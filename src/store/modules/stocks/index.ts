/* eslint-disable @typescript-eslint/no-use-before-define */
import { getStoreBuilder, BareActionContext } from "vuex-typex";
import { Stock, OrderStock, StockState } from "./types";
import { RootState } from "@/store/index";

const intialState: StockState = {
  stocks: []
};

const module = getStoreBuilder<RootState>().module<StockState>(
  "stock",
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
    console.log(state);
  }
};

const actions = {
  buyStock(_: BareActionContext<StockState, RootState>, order: OrderStock) {
    console.log(order);
  },
  initStocks() {
    stocks.commitSetStocks([
      { id: 1, name: "BMW", price: 110 },
      { id: 2, name: "Google", price: 200 },
      { id: 3, name: "Apple", price: 250 },
      { id: 4, name: "Twitter", price: 8 },
      { id: 5, name: "Tesla", price: 95 }
    ]);
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
  dispatchInitStocks: module.dispatch(actions.initStocks)
};

export default stocks;
