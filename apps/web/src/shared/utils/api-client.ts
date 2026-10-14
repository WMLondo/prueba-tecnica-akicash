import type { QueryParams } from "../types/query-params.type";
import { ApiError, getApiErrorMessage } from "./api-error";

export class ApiClient {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get<T>(path: string, params?: QueryParams) {
    return this.request<T>(this.buildUrl(path, params));
  }

  post<T>(path: string, body: unknown) {
    return this.request<T>(this.buildUrl(path), {
      method: "POST",
      body: JSON.stringify(body),
    });
  }

  private buildUrl(path: string, params?: QueryParams) {
    const url = `${this.baseUrl.replace(/\/$/, "")}${path}`;

    if (!params) {
      return url;
    }

    const search = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      if (value === undefined || value === "") {
        continue;
      }

      search.set(key, String(value));
    }

    const query = search.toString();

    return query ? `${url}?${query}` : url;
  }

  private async request<T>(url: string, init?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });

    if (!response.ok) {
      const body = await response.json().catch(() => undefined);

      throw new ApiError(
        response.status,
        getApiErrorMessage(body, response.statusText),
        body,
      );
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json() as Promise<T>;
  }
}
