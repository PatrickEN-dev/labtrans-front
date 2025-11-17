import useApi from "@/components/generic-components/hooks/useApi";
import { Manager, CreateManagerData, UpdateManagerData, ManagerQueryParams } from "@/types";

const useManagersApi = () => {
  const api = useApi();
  const baseUrl = "/api/managers";

  const buildQueryString = (params: ManagerQueryParams): string => {
    const searchParams = new URLSearchParams();

    if (params.search) searchParams.append("search", params.search);
    if (params.email) searchParams.append("email", params.email);

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : "";
  };

  return {
    getManagers: (params: ManagerQueryParams = {}) =>
      api.get<Manager[]>(`${baseUrl}${buildQueryString(params)}`),

    getManager: (id: string) => api.get<Manager>(`${baseUrl}/${id}`),

    createManager: (data: CreateManagerData) => api.post<Manager>(baseUrl, data),

    updateManager: (id: string, data: UpdateManagerData) =>
      api.put<Manager>(`${baseUrl}/${id}`, data),

    deleteManager: (id: string) => api.delete<void>(`${baseUrl}/${id}`),

    getManagerByEmail: (email: string) =>
      api.get<Manager>(`${baseUrl}/email/${encodeURIComponent(email)}`),
  };
};

export default useManagersApi;
