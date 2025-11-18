export interface Location {
  id: string;
  name: string;
  address: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Room {
  id: string;
  name: string;
  capacity?: number;
  location: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Manager {
  id: string;
  name: string;
  email: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface Booking {
  id: string;
  room: string;
  manager: string;
  start_date: string;
  end_date: string;
  coffee_option: boolean;
  coffee_quantity?: number;
  coffee_description?: string;
  room_name?: string;
  room_location?: string;
  manager_name?: string;
  manager_email?: string;
  created_at: string;
  updated_at: string;
}

export const MOCK_LOCATIONS: Location[] = [
  {
    id: "loc-1",
    name: "Matriz - Centro",
    address: "Av. Principal, 123, Centro",
    description: "Edifício corporativo principal",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "loc-2",
    name: "Filial - Zona Sul",
    address: "Rua das Flores, 456, Zona Sul",
    description: "Filial zona sul",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "loc-3",
    name: "Filial - Zona Norte",
    address: "Av. Industrial, 789, Zona Norte",
    description: "Filial zona norte",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const MOCK_ROOMS: Room[] = [
  {
    id: "room-1",
    name: "Sala de Reunião A",
    capacity: 8,
    location: "loc-1",
    description: "Sala pequena para reuniões rápidas",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "room-2",
    name: "Sala de Reunião B",
    capacity: 12,
    location: "loc-1",
    description: "Sala média para reuniões em grupo",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "room-3",
    name: "Auditório Principal",
    capacity: 50,
    location: "loc-1",
    description: "Auditório para eventos e apresentações",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "room-4",
    name: "Sala Zona Sul - 1",
    capacity: 6,
    location: "loc-2",
    description: "Sala compacta filial zona sul",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "room-5",
    name: "Sala Zona Sul - 2",
    capacity: 10,
    location: "loc-2",
    description: "Sala média filial zona sul",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "room-6",
    name: "Sala Zona Norte - 1",
    capacity: 8,
    location: "loc-3",
    description: "Sala filial zona norte",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const MOCK_MANAGERS: Manager[] = [
  {
    id: "mgr-1",
    name: "João Silva",
    email: "joao.silva@empresa.com",
    phone: "(11) 99999-1111",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "mgr-2",
    name: "Maria Santos",
    email: "maria.santos@empresa.com",
    phone: "(11) 99999-2222",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "mgr-3",
    name: "Carlos Oliveira",
    email: "carlos.oliveira@empresa.com",
    phone: "(11) 99999-3333",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: "booking-1",
    room: "room-1",
    manager: "mgr-1",
    start_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(Date.now() + 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
    coffee_option: true,
    coffee_quantity: 10,
    coffee_description: "Café especial",
    room_name: "Sala de Reunião A",
    manager_name: "João Silva",
    manager_email: "joao.silva@empresa.com",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "booking-2",
    room: "room-2",
    manager: "mgr-2",
    start_date: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(),
    end_date: new Date(Date.now() + 48 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
    coffee_option: false,
    room_name: "Sala de Reunião B",
    manager_name: "Maria Santos",
    manager_email: "maria.santos@empresa.com",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const getMockLocations = async (): Promise<Location[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_LOCATIONS;
};

export const getMockLocationById = async (id: string): Promise<Location | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_LOCATIONS.find((location) => location.id === id) || null;
};

export const getMockRoomsByLocation = async (locationId: string): Promise<Room[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_ROOMS.filter((room) => room.location === locationId);
};

export const getMockAllRooms = async (): Promise<Room[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_ROOMS;
};

export const getMockRoomById = async (id: string): Promise<Room | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_ROOMS.find((room) => room.id === id) || null;
};

export const getMockManagers = async (): Promise<Manager[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_MANAGERS;
};

export const getMockManagerById = async (id: string): Promise<Manager | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_MANAGERS.find((manager) => manager.id === id) || null;
};

export const getMockBookings = async (): Promise<Booking[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_BOOKINGS;
};

export const getMockBookingById = async (id: string): Promise<Booking | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return MOCK_BOOKINGS.find((booking) => booking.id === id) || null;
};

export const createMockBooking = async (data: Partial<Booking>): Promise<Booking> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const newBooking: Booking = {
    id: `booking-${Date.now()}`,
    room: data.room || "",
    manager: data.manager || "",
    start_date: data.start_date || new Date().toISOString(),
    end_date: data.end_date || new Date().toISOString(),
    coffee_option: data.coffee_option || false,
    coffee_quantity: data.coffee_quantity,
    coffee_description: data.coffee_description,
    room_name: data.room_name,
    manager_name: data.manager_name,
    manager_email: data.manager_email,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  MOCK_BOOKINGS.push(newBooking);
  return newBooking;
};
