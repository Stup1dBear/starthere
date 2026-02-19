import type { ApiResponse } from "../types/auth";

const API_BASE_URL = (import.meta as any).env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

// Get token from zustand persist storage
function getAuthToken(): string | null {
  try {
    const authData = localStorage.getItem("starthere-auth");
    if (authData) {
      const parsed = JSON.parse(authData);
      return parsed.state?.token || null;
    }
  } catch {
    // ignore
  }
  return null;
}

export class ApiClient {
  private getToken(): string | null {
    return getAuthToken();
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getToken();

    // Build headers
    const headers = new Headers(options.headers || {});

    // Set Content-Type if not FormData
    if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    // Add Authorization header if token exists
    if (token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    // 尝试解析 JSON，即使状态码不是 2xx
    let data: ApiResponse<T>;
    try {
      data = await response.json();
    } catch {
      // 如果解析失败，构造一个错误响应
      data = {
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    // 确保即使后端没返回 success 字段，我们也有一个合理的默认值
    if (typeof data.success !== 'boolean') {
      data.success = response.ok;
    }

    return data;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async patch<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
