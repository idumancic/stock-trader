export interface StockPortfolio {
  stockId: number;
  quantity: number;
}

export interface PortfolioState {
  funds: number;
  portfolio: StockPortfolio[];
}
