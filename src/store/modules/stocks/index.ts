import { getStoreBuilder, BareActionContext } from "vuex-typex";
import { Stock, Order, StockState } from "./types";
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
  randomStocks(state: StockState) {}
};

const actions = {
  buyStock(context: BareActionContext<StockState, RootState>, order: Order) {},
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
  get stocks() {
    return getters.stocks();
  },

  commitSetStocks: module.commit(mutations.setStocks),
  commitRandomStocks: module.commit(mutations.randomStocks),

  dispatchBuyStock: module.dispatch(actions.buyStock),
  dispatchInitStocks: module.dispatch(actions.initStocks)
};

export default stocks;
