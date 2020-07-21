import { AxiosResponse } from "axios";
import { Stock } from "@/store/modules/stocks/types";
import { StockPortfolio } from "@/store/modules/portfolio/types";

type StockPortfolioState = {
  funds: number;
  stockPortfolio: StockPortfolio[];
  stocks: Stock[];
};

export interface StockTraderEndpoints {
  saveData(data: StockPortfolioState): void;
  loadData(): Promise<AxiosResponse<StockPortfolioState>>;
}
