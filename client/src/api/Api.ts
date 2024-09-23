/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Customer {
  id?: number;
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface Order {
  id?: number;
  /** @format date */
  order_date?: string;
  /** @format date */
  delivery_date?: string;
  status?: string;
  total_amount?: number;
  customer_id?: number;
}

export interface OrderEntry {
  id?: number;
  quantity?: number;
  product_id?: number;
  order_id?: number;
}

export interface Paper {
  id?: number;
  name?: string;
  discontinued?: boolean;
  stock?: number;
  price?: number;
}

export interface PaperProperty {
  paper_id?: number;
  property_id?: number;
}

export interface Property {
  id?: number;
  property_name?: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title API Documentation
 * @version 1.0.0
 *
 * API for managing Customers, Orders, Papers, and Properties
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  customers = {
    /**
     * No description
     *
     * @name CustomersList
     * @summary Retrieve a list of customers
     * @request GET:/customers
     */
    customersList: (params: RequestParams = {}) =>
      this.request<Customer[], any>({
        path: `/customers`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CustomersCreate
     * @summary Create a new customer
     * @request POST:/customers
     */
    customersCreate: (data: Customer, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/customers`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name CustomersDetail
     * @summary Get a specific customer by ID
     * @request GET:/customers/{id}
     */
    customersDetail: (id: number, params: RequestParams = {}) =>
      this.request<Customer, void>({
        path: `/customers/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name CustomersUpdate
     * @summary Update a customer by ID
     * @request PUT:/customers/{id}
     */
    customersUpdate: (id: number, data: Customer, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/customers/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name CustomersDelete
     * @summary Delete a customer by ID
     * @request DELETE:/customers/{id}
     */
    customersDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/customers/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  orders = {
    /**
     * No description
     *
     * @name OrdersList
     * @summary Retrieve a list of orders
     * @request GET:/orders
     */
    ordersList: (params: RequestParams = {}) =>
      this.request<Order[], any>({
        path: `/orders`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name OrdersCreate
     * @summary Create a new order
     * @request POST:/orders
     */
    ordersCreate: (data: Order, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name OrdersDetail
     * @summary Get a specific order by ID
     * @request GET:/orders/{id}
     */
    ordersDetail: (id: number, params: RequestParams = {}) =>
      this.request<Order, void>({
        path: `/orders/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name OrdersUpdate
     * @summary Update an order by ID
     * @request PUT:/orders/{id}
     */
    ordersUpdate: (id: number, data: Order, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name OrdersDelete
     * @summary Delete an order by ID
     * @request DELETE:/orders/{id}
     */
    ordersDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/orders/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
  papers = {
    /**
     * No description
     *
     * @name PapersList
     * @summary Retrieve a list of papers
     * @request GET:/papers
     */
    papersList: (params: RequestParams = {}) =>
      this.request<Paper[], any>({
        path: `/papers`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name PapersCreate
     * @summary Create a new paper
     * @request POST:/papers
     */
    papersCreate: (data: Paper, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/papers`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name PapersDetail
     * @summary Get a specific paper by ID
     * @request GET:/papers/{id}
     */
    papersDetail: (id: number, params: RequestParams = {}) =>
      this.request<Paper, void>({
        path: `/papers/${id}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name PapersUpdate
     * @summary Update a paper by ID
     * @request PUT:/papers/{id}
     */
    papersUpdate: (id: number, data: Paper, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/papers/${id}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name PapersDelete
     * @summary Delete a paper by ID
     * @request DELETE:/papers/{id}
     */
    papersDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/papers/${id}`,
        method: "DELETE",
        ...params,
      }),
  };
}
