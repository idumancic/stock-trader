import axios, { AxiosResponse } from "axios";
import { StockPortfolioData } from "@/types";
import { global } from "@modules";

interface StockTraderEndpoints {
  saveData(data: StockPortfolioData): void;
  loadData(): Promise<AxiosResponse<StockPortfolioData>>;
}

const instance = axios.create({
  baseURL: "https://stock-trader-61fc7.firebaseio.com/"
});

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

instance.interceptors.request.use(
  config => {
    global.commitSetIsLoading(true);
    return config;
  },
  error => {
    if (axios.isCancel(error)) {
      return;
    }

    global.commitSetIsLoading(false);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(response => {
  global.commitSetIsLoading(false);
  return response;
});

const endpoints: StockTraderEndpoints = {
  saveData: data =>
    instance.put("data.json", data, { cancelToken: source.token }),
  loadData: () => instance.get("data.json", { cancelToken: source.token })
};

export default endpoints;
