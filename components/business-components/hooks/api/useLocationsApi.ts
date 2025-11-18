import { useCallback } from "react";
import { getMockLocations, MOCK_LOCATIONS, type Location } from "@/lib/mock-data";

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
  const getLocations = useCallback(
    async (params: LocationQueryParams = {}): Promise<Location[]> => {
      // Usar apenas dados mockados
      console.log("Usando dados mockados para locations");

      const locations = await getMockLocations();

      if (params.search) {
        return locations.filter((location) =>
          location.name.toLowerCase().includes(params.search!.toLowerCase())
        );
      }

      return locations;
    },
    []
  );

  const getLocation = useCallback(async (id: string): Promise<Location> => {
    console.log("Usando dados mockados para location:", id);

    const location = MOCK_LOCATIONS.find((l) => l.id === id);
    if (!location) {
      throw new Error("Location not found");
    }
    return location;
  }, []);

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
