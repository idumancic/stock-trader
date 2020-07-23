export interface Stock {
  id: number;
  name: string;
  price: number;
}

export interface OrderStock {
  stockId: number;
  stockPrice: number;
  quantity: number;
}

export interface StockPortfolio {
  id: number;
  name?: string;
  price?: number;
  quantity: number;
}

export interface StockPortfolioData {
  funds: number;
  stockPortfolio: StockPortfolio[];
  stocks: Stock[];
}
