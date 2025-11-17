import useApi from "@/components/generic-components/hooks/useApi";
import { Room, RoomWithLocation, CreateRoomData, UpdateRoomData, RoomQueryParams } from "@/types";

const useRoomsApi = () => {
  const api = useApi();
  const baseUrl = "/api/rooms";

  const buildQueryString = (params: RoomQueryParams): string => {
    const searchParams = new URLSearchParams();

    if (params.location_id) searchParams.append("location_id", params.location_id);
    if (params.capacity_min) searchParams.append("capacity_min", params.capacity_min.toString());
    if (params.capacity_max) searchParams.append("capacity_max", params.capacity_max.toString());

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : "";
  };

  return {
    getRooms: (params: RoomQueryParams = {}) =>
      api.get<RoomWithLocation[]>(`${baseUrl}${buildQueryString(params)}`),

    getRoom: (id: string) => api.get<RoomWithLocation>(`${baseUrl}/${id}`),

    createRoom: (data: CreateRoomData) => api.post<Room>(baseUrl, data),

    updateRoom: (id: string, data: UpdateRoomData) => api.put<Room>(`${baseUrl}/${id}`, data),

    deleteRoom: (id: string) => api.delete<void>(`${baseUrl}/${id}`),

    getAvailableRooms: (startDate: string, endDate: string, locationId?: string) => {
      const params = new URLSearchParams({
        start_date: startDate,
        end_date: endDate,
      });

      if (locationId) params.append("location_id", locationId);

      return api.get<RoomWithLocation[]>(`${baseUrl}/available?${params.toString()}`);
    },
  };
};

export default useRoomsApi;
