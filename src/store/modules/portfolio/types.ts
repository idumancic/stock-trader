import { Stock } from "../stocks/types";

export interface StockPortfolio {
  id: number;
  name?: string;
  price?: number;
  quantity: number;
}

export interface PortfolioState {
  funds: number;
  stocks: StockPortfolio[];
}
