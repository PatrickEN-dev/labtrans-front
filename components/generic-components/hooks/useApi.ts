import { useCallback } from "react";

const useApi = () => {
  const request = useCallback(
    async <T = unknown>(url: string, options: RequestInit = {}): Promise<T> => {
      try {
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            ...options.headers,
          },
          ...options,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
      } catch (error) {
        console.error("API request failed:", error);
        throw error;
      }
    },
    []
  );

  const get = useCallback(<T = unknown>(url: string): Promise<T> => request<T>(url), [request]);

  const post = useCallback(
    <T = unknown>(url: string, data: unknown): Promise<T> =>
      request<T>(url, { method: "POST", body: JSON.stringify(data) }),
    [request]
  );

  const put = useCallback(
    <T = unknown>(url: string, data: unknown): Promise<T> =>
      request<T>(url, { method: "PUT", body: JSON.stringify(data) }),
    [request]
  );

  const patch = useCallback(
    <T = unknown>(url: string, data: unknown): Promise<T> =>
      request<T>(url, { method: "PATCH", body: JSON.stringify(data) }),
    [request]
  );

  const del = useCallback(
    <T = unknown>(url: string): Promise<T> => request<T>(url, { method: "DELETE" }),
    [request]
  );

  return { get, post, put, patch, delete: del };
};

export default useApi;
