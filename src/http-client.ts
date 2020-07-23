import axios, { AxiosInstance, AxiosResponse, CancelToken } from "axios";

declare module "axios" {
  type AxiosResponse<T = any> = Promise<T>;
}

abstract class HttpClient {
  protected readonly instance: AxiosInstance;
  protected cancelToken!: CancelToken;

  constructor(baseURL?: string) {
    this.instance = axios.create({
      baseURL: baseURL ?? "https://stock-trader-61fc7.firebaseio.com/",
      headers: {
        "Content-Type": "application/json"
      }
    });

    this.useCancelToken();
    this.useRequestInterceptor();
    this.useResponseInterceptor();
  }

  private useCancelToken() {
    this.cancelToken = axios.CancelToken.source().token;
  }

  private useRequestInterceptor() {
    this.instance.interceptors.request.use(
      config => config,
      error => {
        if (axios.isCancel(error)) {
          return;
        }
        return Promise.reject(error);
      }
    );
  }

  private useResponseInterceptor() {
    this.instance.interceptors.response.use(
      ({ data }: AxiosResponse) => data,
      this.handleError
    );
  }

  protected handleError = (error: any) => Promise.reject(error);
}

export default HttpClient;
