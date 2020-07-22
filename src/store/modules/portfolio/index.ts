/* eslint-disable @typescript-eslint/no-use-before-define */
import { getStoreBuilder, BareActionContext } from "vuex-typex";
import stockTraderService from "@/services";
import stocksModule from "../stocks";

import { RootState } from "@/store/index";
import { PortfolioState, StockPortfolio } from "./types";
import { OrderStock, Stock } from "../stocks/types";

const initialState: PortfolioState = {
  funds: 10000,
  stocks: []
};

const module = getStoreBuilder<RootState>().module("portfolio", initialState);

const getters = {
  stockPortfolio: module.read(state => {
    return state.stocks.map(x => {
      const record = stocksModule.stocks.find((y: Stock) => y.id === x.id);
      return {
        id: x.id,
        quantity: x.quantity,
        price: record?.price,
        name: record?.name
      } as StockPortfolio;
    });
  }, "stockPortfolio"),
  funds: module.read(state => state.funds, "funds")
};

const mutations = {
  buyStock(state: PortfolioState, order: OrderStock) {
    const totalPrice = order.stockPrice * order.quantity;

    if (totalPrice > state.funds) {
      throw new Error("Can't buy stocks, insufficient funds!");
    }

    const record = state.stocks.find(x => x.id === order.stockId);

    if (record) {
      record.quantity += order.quantity;
    } else {
      state.stocks.push({
        id: order.stockId,
        quantity: order.quantity
      });
    }

    state.funds -= totalPrice;
  },
  sellStock(state: PortfolioState, order: OrderStock) {
    const record = state.stocks.find(x => x.id === order.stockId);

    if (!record) {
      throw new Error("Stock not found");
    } else if (order.quantity > record.quantity) {
      throw new Error("Can't sell more stocks then you have.");
    }

    if (record.quantity > order.quantity) {
      record.quantity -= order.quantity;
    } else {
      state.stocks.splice(state.stocks.indexOf(record), 1);
    }

    state.funds += order.stockPrice * order.quantity;
  },
  setPortfolio(state: PortfolioState, payload: PortfolioState) {
    state.funds = payload.funds;
    state.stocks = payload.stocks ? payload.stocks : [];
  }
};

const actions = {
  sellStock(
    _: BareActionContext<PortfolioState, RootState>,
    order: OrderStock
  ) {
    portofolio.commitSellStock(order);
  },
  save() {
    stockTraderService.saveData({
      funds: portofolio.funds,
      stockPortfolio: portofolio.stockPortfolio,
      stocks: stocksModule.stocks
    });
  },
  async load() {
    const { data } = await stockTraderService.loadData();
    stocksModule.commitSetStocks(data.stocks);
    portofolio.commitSetPortfolio({
      funds: data.funds,
      stocks: data.stockPortfolio
    });
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
  commitSetPortfolio: module.commit(mutations.setPortfolio),

  dispatchSellStock: module.dispatch(actions.sellStock),
  dispatchSave: module.dispatch(actions.save),
  dispatchLoad: module.dispatch(actions.load)
};

export default portofolio;
