interface Booking extends BaseEntity {
  room: string;
  manager: string;
  start_date: string;
  end_date: string;
  name?: string;
  description?: string;
  purpose?: string;
  coffee_option: boolean;
  coffee_quantity?: number;
  coffee_description?: string;
  room_name?: string;
  room_location?: string;
  manager_name?: string;
  manager_email?: string;
  room_id?: string;
  manager_id?: string;
  status?: string;
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

interface BookingQueryParams {
  room_id?: string;
  manager_id?: string;
  start_date?: string;
  end_date?: string;
}

interface Booking extends BookingCreatePayload {
  id: string;
  room_id: string;
  room_name: string;
  manager_id: string;
  manager_name: string;
  status: string;
  created_at: string;
  updated_at: string;
}
interface BookingFormData {
  locationId: string;
  roomId: string;
  date: string;
  startTime: string;
  endTime: string;
  managerId: string;
  hasRefreshments: boolean;
  refreshmentQuantity: number;
  refreshmentDescription: string;
}
