/* eslint-disable @typescript-eslint/no-use-before-define */
import { getStoreBuilder, BareActionContext } from "vuex-typex";
import { RootState } from "@/store/index";

import { PortfolioState } from "./types";
import { OrderStock, Stock } from "../stocks/types";

const initialState: PortfolioState = {
  funds: 10000,
  portfolio: []
};

const module = getStoreBuilder<RootState>().module("portfolio", initialState);

const getters = {
  stockPortfolio: module.read((state, getters) => {
    return state.portfolio.map(x => {
      const record = getters.stocks.find((y: Stock) => y.id === x.stockId);
      return {
        id: x.stockId,
        quantity: x.quantity,
        price: record.price,
        name: record.name
      } as Stock & { quantity: number };
    });
  }, "stockPortfolio"),
  funds: module.read(state => state.funds, "funds")
};

const mutations = {
  buyStock(state: PortfolioState, order: OrderStock) {
    const record = state.portfolio.find(x => x.stockId === order.stockId);

    if (record) {
      record.quantity += order.quantity;
    } else {
      state.portfolio.push({
        stockId: order.stockId,
        quantity: order.quantity
      });
    }

    state.funds -= order.stockPrice * order.quantity;
  },
  sellStock(state: PortfolioState, order: OrderStock) {
    const record = state.portfolio.find(x => x.stockId === order.stockId);

    if (!record) {
      throw new Error("Stock not found");
    }

    if (record.quantity > order.quantity) {
      record.quantity -= order.quantity;
    } else {
      state.portfolio.splice(state.portfolio.indexOf(record), 1);
    }

    state.funds += order.stockPrice * order.quantity;
  }
};

const actions = {
  sellStock(
    _: BareActionContext<PortfolioState, RootState>,
    order: OrderStock
  ) {
    portofolio.commitSellStock(order);
  }
};

const portofolio = {
  get state() {
    return module.state();
  },

  get stockPortfolio() {
    return getters.stockPortfolio();
  },

  get funds() {
    return getters.funds();
  },

  commitBuyStock: module.commit(mutations.buyStock),
  commitSellStock: module.commit(mutations.sellStock),

  dispatchSellStock: module.dispatch(actions.sellStock)
};

export default portofolio;