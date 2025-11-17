import useApi from "@/components/generic-components/hooks/useApi";
import { Booking, CreateBookingData, UpdateBookingData, BookingQueryParams } from "@/types";

const useBookingsApi = () => {
  const api = useApi();
  const baseUrl = "/api/bookings";

  const buildQueryString = (params: BookingQueryParams): string => {
    const searchParams = new URLSearchParams();

    if (params.room_id) searchParams.append("room_id", params.room_id);
    if (params.manager_id) searchParams.append("manager_id", params.manager_id);
    if (params.start_date) searchParams.append("start_date", params.start_date);
    if (params.end_date) searchParams.append("end_date", params.end_date);

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : "";
  };

  return {
    getBookings: (params: BookingQueryParams = {}) =>
      api.get<Booking[]>(`${baseUrl}${buildQueryString(params)}`),

    getBooking: (id: string) => api.get<Booking>(`${baseUrl}/${id}`),

    createBooking: (data: CreateBookingData) => api.post<Booking>(baseUrl, data),

    updateBooking: (id: string, data: UpdateBookingData) =>
      api.put<Booking>(`${baseUrl}/${id}`, data),

    deleteBooking: (id: string) => api.delete<void>(`${baseUrl}/${id}`),
  };
};

export default useBookingsApi;
