import axios from "axios";
import globalModule from "@/store/modules/global";
import { StockTraderEndpoints } from "./types";

const instance = axios.create({
  baseURL: "https://stock-trader-61fc7.firebaseio.com/"
});

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

instance.interceptors.request.use(
  config => {
    globalModule.commitSetIsLoading(true);
    return config;
  },
  error => {
    if (axios.isCancel(error)) {
      return;
    }

    globalModule.commitSetIsLoading(false);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(response => {
  globalModule.commitSetIsLoading(false);
  return response;
});

const endpoints: StockTraderEndpoints = {
  saveData: data =>
    instance.put("data.json", data, { cancelToken: source.token }),
  loadData: () => instance.get("data.json", { cancelToken: source.token })
};

export default endpoints;
