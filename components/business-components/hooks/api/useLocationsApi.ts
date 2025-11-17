import useApi from "@/components/generic-components/hooks/useApi";
import { Location, CreateLocationData, UpdateLocationData, LocationQueryParams } from "@/types";

const useLocationsApi = () => {
  const api = useApi();
  const baseUrl = "/api/locations";

  const buildQueryString = (params: LocationQueryParams): string => {
    const searchParams = new URLSearchParams();

    if (params.search) searchParams.append("search", params.search);

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : "";
  };

  return {
    getLocations: (params: LocationQueryParams = {}) =>
      api.get<Location[]>(`${baseUrl}${buildQueryString(params)}`),

    getLocation: (id: string) => api.get<Location>(`${baseUrl}/${id}`),

    createLocation: (data: CreateLocationData) => api.post<Location>(baseUrl, data),

    updateLocation: (id: string, data: UpdateLocationData) =>
      api.put<Location>(`${baseUrl}/${id}`, data),

    deleteLocation: (id: string) => api.delete<void>(`${baseUrl}/${id}`),
  };
};

export default useLocationsApi;
