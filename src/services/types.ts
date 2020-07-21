import { Stock } from "@/store/modules/stocks/types";
import { StockPortfolio } from "@/store/modules/portfolio/types";

export interface StockTraderEndpoints {
  saveData(data: {
    funds: number;
    stockPortfolio: StockPortfolio[];
    stocks: Stock[];
  }): void;
}
