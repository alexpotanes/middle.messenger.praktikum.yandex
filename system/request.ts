import { queryStringify } from "../utils/queryStringify";

const BASE_URL = "https://ya-praktikum.tech/api/v2";

interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  data?: Record<string, unknown> | FormData | object;
  responseType?: XMLHttpRequestResponseType;
  timeout?: number;
}

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

class HTTPTransport {
  private baseUrl: string;

  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl;
  }

  get = (url: string, options: RequestOptions = {}) =>
    this.request(url, { ...options, method: "GET" }, options.timeout);

  post = (url: string, options: RequestOptions = {}) =>
    this.request(url, { ...options, method: "POST" }, options.timeout);

  put = (url: string, options: RequestOptions = {}) =>
    this.request(url, { ...options, method: "PUT" }, options.timeout);

  delete = (url: string, options: RequestOptions = {}) =>
    this.request(url, { ...options, method: "DELETE" }, options.timeout);

  request = (url: string, options: RequestOptions = {}, timeout = 5000) => {
    const { headers = {}, method, data, responseType } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error("HTTP method is required"));
        return;
      }

      const isGet = method === METHODS.GET;

      const queryString =
        isGet && data && !(data instanceof FormData)
          ? "?" + queryStringify(data as Record<string, unknown>)
          : "";

      const xhr = new XMLHttpRequest();
      xhr.open(method, this.baseUrl + url + queryString);
      xhr.withCredentials = true;

      if (responseType) {
        xhr.responseType = responseType;
      }

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          let response;

          if (xhr.responseType) {
            response = xhr.response;
          } else {
            try {
              const contentType = xhr.getResponseHeader("Content-Type");
              if (contentType && contentType.includes("application/json")) {
                response = JSON.parse(xhr.responseText);
              } else {
                response = xhr.responseText;
              }
            } catch {
              response = xhr.responseText;
            }
          }

          resolve(response);
        } else {
          reject({
            status: xhr.status,
            statusText: xhr.statusText,
            response: xhr.responseText,
            request: xhr,
          });
        }
      };

      xhr.onabort = () => reject({ reason: "Request aborted", request: xhr });
      xhr.onerror = () => reject({ reason: "Network error", request: xhr });

      xhr.timeout = timeout;
      xhr.ontimeout = () =>
        reject({ reason: "Request timeout", timeout, request: xhr });

      if (isGet) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else if (data) {
        if (!headers["Content-Type"]) {
          xhr.setRequestHeader("Content-Type", "application/json");
        }
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send();
      }
    });
  };
}

export default HTTPTransport;
