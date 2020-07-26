import { HttpService } from "@/http-service";
import { HttpInterceptor } from "@/decorators/http-interceptor";
import { StockPortfolioData } from "@/types";

@HttpInterceptor
class StockTraderService extends HttpService {
  saveData(data: StockPortfolioData) {
    return this.instance.put("data.json", data, {
      cancelToken: this.cancelTokenSource.token
    });
  }

  loadData() {
    return this.instance.get<StockPortfolioData>("data.json", {
      cancelToken: this.cancelTokenSource.token
    });
  }
}

export default new StockTraderService();
