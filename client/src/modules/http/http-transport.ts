/* eslint-disable func-names */
const METHODS = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

interface RequestDataObject {
  [key: string]: any;
}

interface HeadersObject {
  [key: string]: string;
}

interface OptionsObject {
  data?: RequestDataObject;
  file?: FormData;
  timeout?: number;
  headers?: HeadersObject;
}

interface RequestPreparedOptions extends OptionsObject {
  method: string;
}

function queryStringify(data: RequestDataObject): string {
  if (!data) {
    return '';
  }
  const params = new URLSearchParams();

  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((item: any) => {
        params.append(key, item);
      });
    } else {
      params.set(key, data[key]);
    }
  });

  const paramsString = params.toString();
  if (!paramsString) {
    return '';
  }
  return `?${paramsString}`;
}

export default class HTTPTransport {
  baseUrl: string;

  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  get = (url: string, options: OptionsObject = {}) => {
    if (options.data) {
      const data = queryStringify(options.data);
      url = `${url}${data}`; // eslint-disable-line no-param-reassign
    }

    return this.request(`${this.baseUrl}${url}`, { ...options, method: METHODS.GET }, options?.timeout);
  };

  put = (
    url: string,
    options: OptionsObject = {},
  ) => this.request(`${this.baseUrl}${url}`, { ...options, method: METHODS.PUT }, options?.timeout);

  post = (
    url: string,
    options: OptionsObject = {},
  ) => this.request(`${this.baseUrl}${url}`, { ...options, method: METHODS.POST }, options?.timeout);

  delete = (
    url: string,
    options: OptionsObject = {},
  ) => this.request(`${this.baseUrl}${url}`, { ...options, method: METHODS.DELETE }, options?.timeout);

  // options:
  // headers — obj
  // data — obj
  request = (url: string, options: RequestPreparedOptions, timeout = 12000) => {
    const {
      method,
      data,
      headers = {},
      file,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.timeout = timeout;

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        let responseData;
        try {
          responseData = JSON.parse(xhr.response);
        } catch {
          responseData = xhr.response;
        }

        if (xhr.status >= 400) {
          reject(new Error(responseData.message || 'error'));
        }

        resolve({
          status: xhr.status,
          data: responseData,
        });
      };

      xhr.onabort = function () {
        reject(new Error('aborted'));
      };
      xhr.onerror = function () {
        reject(new Error('error'));
      };
      xhr.ontimeout = function () {
        reject(new Error('request timed out'));
      };

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else if (file) {
        xhr.send(file);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
