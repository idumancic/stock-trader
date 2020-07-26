import axios, {
  AxiosInstance,
  CancelTokenSource,
  AxiosRequestConfig
} from "axios";

export abstract class HttpService {
  protected readonly instance: AxiosInstance;
  public readonly cancelTokenSource: CancelTokenSource;
  private defaultConfig: AxiosRequestConfig = {
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
      "Content-Type": "application/json"
    }
  };

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign(this.defaultConfig, config));
    this.cancelTokenSource = axios.CancelToken.source();
  }
}
