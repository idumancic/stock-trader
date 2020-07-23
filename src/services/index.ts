import HttpClient from "@/http-client";
import { StockPortfolioData } from "@/types";

class StockTraderService extends HttpClient {
  saveData = (data: StockPortfolioData) =>
    this.instance.put("data.json", data, {
      cancelToken: this.cancelToken
    });

  loadData = () =>
    this.instance.get<StockPortfolioData>("data.json", {
      cancelToken: this.cancelToken
    });
}

export default new StockTraderService();
