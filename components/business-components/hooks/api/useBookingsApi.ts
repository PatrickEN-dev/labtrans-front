import { useCallback, useMemo } from "react";
import { getMockBookings, MOCK_BOOKINGS, createMockBooking, type Booking } from "@/lib/mock-data";
import useApi from "@/components/generic-components/hooks/useApi";

interface BookingQueryParams {
  room_id?: string;
  manager_id?: string;
  start_date?: string;
  end_date?: string;
}

interface CreateBookingData {
  room: string;
  manager: string;
  start_date: string;
  end_date: string;
  coffee_option?: boolean;
  coffee_quantity?: number;
  coffee_description?: string;
}

type UpdateBookingData = Partial<CreateBookingData>;

const useBookingsApi = () => {
  const api = useApi();

  const getBookings = useCallback(
    async (params: BookingQueryParams = {}): Promise<Booking[]> => {
      try {
        const buildQueryString = (params: BookingQueryParams): string => {
          const searchParams = new URLSearchParams();
          if (params.room_id) searchParams.append("room_id", params.room_id);
          if (params.manager_id) searchParams.append("manager_id", params.manager_id);
          if (params.start_date) searchParams.append("start_date", params.start_date);
          if (params.end_date) searchParams.append("end_date", params.end_date);
          const queryString = searchParams.toString();
          return queryString ? `?${queryString}` : "";
        };

        const bookings = await api.get<Booking[]>(`/bookings${buildQueryString(params)}`);
        return bookings;
      } catch (error) {
        console.warn("Erro na API real, usando dados mockados:", error);

        let bookings = await getMockBookings();

        if (params.room_id) {
          bookings = bookings.filter((booking: Booking) => booking.room === params.room_id);
        }

        if (params.manager_id) {
          bookings = bookings.filter((booking: Booking) => booking.manager === params.manager_id);
        }

        if (params.start_date) {
          bookings = bookings.filter(
            (booking: Booking) => new Date(booking.start_date) >= new Date(params.start_date!)
          );
        }

        if (params.end_date) {
          bookings = bookings.filter(
            (booking: Booking) => new Date(booking.end_date) <= new Date(params.end_date!)
          );
        }

        return bookings;
      }
    },
    [api]
  );

  const getBooking = useCallback(
    async (id: string): Promise<Booking> => {
      try {
        const booking = await api.get<Booking>(`/bookings/${id}/`);
        return booking;
      } catch (error) {
        console.warn("Erro na API real, usando dados mockados:", error);

        const booking = MOCK_BOOKINGS.find((b: Booking) => b.id === id);
        if (!booking) {
          throw new Error("Booking not found");
        }
        return booking;
      }
    },
    [api]
  );

  const createBooking = useCallback(
    async (data: CreateBookingData): Promise<Booking> => {
      try {
        const booking = await api.post<Booking>("/bookings/", data);
        return booking;
      } catch (error) {
        console.warn("Erro na API real, usando dados mockados:", error);

        const bookingData = {
          ...data,
          coffee_option: data.coffee_option ?? false,
        };
        return await createMockBooking(bookingData);
      }
    },
    [api]
  );

  const updateBooking = useCallback(
    async (id: string, data: UpdateBookingData): Promise<Booking> => {
      try {
        const booking = await api.put<Booking>(`/bookings/${id}/`, data);
        return booking;
      } catch (error) {
        console.warn("Erro na API real, usando dados mockados:", error);

        const booking = MOCK_BOOKINGS.find((b: Booking) => b.id === id);
        if (!booking) {
          throw new Error("Booking not found");
        }
        const updatedBooking = { ...booking, ...data, updated_at: new Date().toISOString() };
        return updatedBooking;
      }
    },
    [api]
  );

  const deleteBooking = useCallback(
    async (id: string): Promise<void> => {
      try {
        await api.delete<void>(`/bookings/${id}/`);
      } catch (error) {
        console.warn("Erro na API real, usando dados mockados:", error);

        const index = MOCK_BOOKINGS.findIndex((b: Booking) => b.id === id);
        if (index === -1) {
          throw new Error("Booking not found");
        }
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    },
    [api]
  );

  return useMemo(
    () => ({
      getBookings,
      getBooking,
      createBooking,
      updateBooking,
      deleteBooking,
    }),
    [getBookings, getBooking, createBooking, updateBooking, deleteBooking]
  );
};

export default useBookingsApi;
