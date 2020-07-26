import axios, {
  AxiosInstance,
  CancelTokenSource,
  AxiosRequestConfig
} from "axios";

abstract class HttpClient {
  protected readonly instance: AxiosInstance;
  public readonly cancelTokenSource: CancelTokenSource;
  private defaultConfig: AxiosRequestConfig = {
    baseURL: "https://stock-trader-61fc7.firebaseio.com/",
    headers: {
      "Content-Type": "application/json"
    }
  };

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.defaultConfig, config));
    this.cancelTokenSource = axios.CancelToken.source();
  }
}

export default HttpClient;
