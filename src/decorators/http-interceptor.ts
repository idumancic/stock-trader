import axios, { AxiosResponse, AxiosError } from "axios";
import { HttpService } from "@/http-service";
import { global } from "@modules";

declare module "axios" {
  /*
    override of AxiosResponse interface because of response destructuring
    to get data object because TS would throw error otherwise
  */
  // eslint-disable-next-line
  interface AxiosResponse<T> extends Promise<T> {}
}

export const HttpInterceptor = function<
  T extends { new (...args: any[]): HttpService }
>(originalConstructor: T) {
  return class extends originalConstructor {
    private requestCounter = 0;

    constructor(...args: any[]) {
      super(...args);
      this.useRequestInterceptor();
      this.useResponseInterceptor();
    }

    private useRequestInterceptor() {
      this.instance.interceptors.request.use(config => {
        this.requestCounter++;
        global.commitSetIsLoading(true);
        return config;
      }, this.handleError);
    }

    private useResponseInterceptor() {
      this.instance.interceptors.response.use(({ data }: AxiosResponse) => {
        if (--this.requestCounter === 0) {
          global.commitSetIsLoading(false);
        }

        return data;
      }, this.handleError);
    }

    protected handleError(error: AxiosError) {
      if (--this.requestCounter === 0) {
        global.commitSetIsLoading(false);
      }

      if (axios.isCancel(error)) {
        return;
      }

      return Promise.reject(error);
    }
  };
};
