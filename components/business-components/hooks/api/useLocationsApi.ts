import { useCallback } from "react";
import { getMockLocations, MOCK_LOCATIONS, type Location } from "@/lib/mock-data";
import useApi from "@/components/generic-components/hooks/useApi";

interface LocationQueryParams {
  search?: string;
}

interface CreateLocationData {
  name: string;
  address?: string;
  description?: string;
}

interface UpdateLocationData {
  name?: string;
  address?: string;
  description?: string;
}

const useLocationsApi = () => {
  const api = useApi();

  const getLocations = useCallback(
    async (params: LocationQueryParams = {}): Promise<Location[]> => {
      try {
        // Tentar API real primeiro
        const buildQueryString = (params: LocationQueryParams): string => {
          const searchParams = new URLSearchParams();
          if (params.search) searchParams.append("search", params.search);
          const queryString = searchParams.toString();
          return queryString ? `?${queryString}` : "";
        };

        const locations = await api.get<Location[]>(`/locations${buildQueryString(params)}`);
        return locations;
      } catch (error) {
        console.warn("Erro na API real, usando dados mockados:", error);
        // Fallback para dados mockados
        const locations = await getMockLocations();

        if (params.search) {
          return locations.filter((location) =>
            location.name.toLowerCase().includes(params.search!.toLowerCase())
          );
        }

        return locations;
      }
    },
    [api]
  );

  const getLocation = useCallback(
    async (id: string): Promise<Location> => {
      try {
        // Tentar API real primeiro
        const location = await api.get<Location>(`/locations/${id}/`);
        return location;
      } catch (error) {
        console.warn("Erro na API real, usando dados mockados:", error);
        // Fallback para dados mockados
        const location = MOCK_LOCATIONS.find((l) => l.id === id);
        if (!location) {
          throw new Error("Location not found");
        }
        return location;
      }
    },
    [api]
  );

  const createLocation = useCallback(async (data: CreateLocationData): Promise<Location> => {
    const newLocation: Location = {
      id: `loc-${Date.now()}`,
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    return new Promise((resolve) => setTimeout(() => resolve(newLocation), 300));
  }, []);

  const updateLocation = useCallback(
    async (id: string, data: UpdateLocationData): Promise<Location> => {
      const location = await getLocation(id);
      const updatedLocation = {
        ...location,
        ...data,
        updated_at: new Date().toISOString(),
      };
      return new Promise((resolve) => setTimeout(() => resolve(updatedLocation), 300));
    },
    [getLocation]
  );

  const deleteLocation = useCallback(async (): Promise<void> => {
    // Simular exclusão
    return new Promise((resolve) => setTimeout(() => resolve(), 200));
  }, []);

  return {
    getLocations,
    getLocation,
    createLocation,
    updateLocation,
    deleteLocation,
  };
};

export default useLocationsApi;
