import { Stock } from "../stocks/types";

export interface StockPortfolio extends Stock {
  quantity: number;
}

export interface Portfolio {
  stockId: number;
  quantity: number;
}

export interface PortfolioState {
  funds: number;
  portfolio: Portfolio[];
}
