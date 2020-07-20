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

export interface StockState {
  stocks: Stock[];
}
