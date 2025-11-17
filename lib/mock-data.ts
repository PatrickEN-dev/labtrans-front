// Mock data para teste técnico
// Dados simulados para demonstrar funcionalidades sem depender da API

export interface Location {
  id: string;
  name: string;
  address?: string;
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
  created_at: string;
  updated_at: string;
  // Campos expandidos
  room_name: string;
  room_location: string;
  manager_name: string;
  manager_email: string;
}

// Dados mockados
export const MOCK_LOCATIONS: Location[] = [
  {
    id: "loc-1",
    name: "Prédio Principal",
    address: "Rua das Empresas, 123 - Centro",
    description: "Prédio principal da empresa",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "loc-2",
    name: "Anexo Administrativo",
    address: "Rua das Empresas, 125 - Centro",
    description: "Prédio anexo com salas administrativas",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "loc-3",
    name: "Centro de Treinamento",
    address: "Av. do Conhecimento, 456 - Tech Park",
    description: "Centro dedicado a treinamentos e workshops",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];

export const MOCK_ROOMS: Room[] = [
  // Prédio Principal
  {
    id: "room-1",
    name: "Sala de Reunião A",
    capacity: 10,
    location: "loc-1",
    description: "Sala com projetor e ar condicionado",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "room-2",
    name: "Sala de Reunião B",
    capacity: 6,
    location: "loc-1",
    description: "Sala mais reservada para reuniões menores",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "room-3",
    name: "Auditório Principal",
    capacity: 50,
    location: "loc-1",
    description: "Auditório para apresentações e eventos",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  // Anexo Administrativo
  {
    id: "room-4",
    name: "Sala de Conferência",
    capacity: 15,
    location: "loc-2",
    description: "Sala de conferência com videoconferência",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "room-5",
    name: "Sala de Brainstorming",
    capacity: 8,
    location: "loc-2",
    description: "Sala criativa com quadro branco",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  // Centro de Treinamento
  {
    id: "room-6",
    name: "Laboratório de Informática",
    capacity: 20,
    location: "loc-3",
    description: "Laboratório com computadores para treinamento",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "room-7",
    name: "Sala de Workshop",
    capacity: 25,
    location: "loc-3",
    description: "Sala flexível para workshops e dinâmicas",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },

  {
    id: "room-8",
    name: "Sala Íntima",
    capacity: 2,
    location: "loc-1",
    description: "Sala para 2 pessoas - perfeita para reuniões 1:1",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "room-9",
    name: "Sala Pequena",
    capacity: 4,
    location: "loc-2",
    description: "Sala para 4 pessoas - ideal para equipes pequenas",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "room-10",
    name: "Sala Média",
    capacity: 12,
    location: "loc-1",
    description: "Sala para 12 pessoas - boa para reuniões de equipe",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "room-11",
    name: "Sala Grande",
    capacity: 30,
    location: "loc-3",
    description: "Sala para 30 pessoas - ideal para treinamentos",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "room-12",
    name: "Sala Executive",
    capacity: 8,
    location: "loc-2",
    description: "Sala executiva para 8 pessoas - reuniões de diretoria",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "room-13",
    name: "Sala de Apresentação",
    capacity: 40,
    location: "loc-3",
    description: "Sala para 40 pessoas - apresentações e demos",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];

export const MOCK_MANAGERS: Manager[] = [
  {
    id: "mgr-1",
    name: "João Silva",
    email: "joao.silva@empresa.com",
    phone: "(11) 9876-5432",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "mgr-2",
    name: "Maria Santos",
    email: "maria.santos@empresa.com",
    phone: "(11) 9876-5433",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "mgr-3",
    name: "Pedro Oliveira",
    email: "pedro.oliveira@empresa.com",
    phone: "(11) 9876-5434",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "mgr-4",
    name: "Ana Costa",
    email: "ana.costa@empresa.com",
    phone: "(11) 9876-5435",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "mgr-5",
    name: "Carlos Ferreira",
    email: "carlos.ferreira@empresa.com",
    phone: "(11) 9876-5436",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
  },
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: "book-1",
    room: "room-1",
    manager: "mgr-1",
    start_date: "2025-11-18T09:00:00Z",
    end_date: "2025-11-18T10:30:00Z",
    coffee_option: true,
    coffee_quantity: 10,
    coffee_description: "Café da manhã para reunião de planejamento",
    created_at: "2025-11-17T00:00:00Z",
    updated_at: "2025-11-17T00:00:00Z",
    room_name: "Sala de Reunião A",
    room_location: "Prédio Principal",
    manager_name: "João Silva",
    manager_email: "joao.silva@empresa.com",
  },
  {
    id: "book-2",
    room: "room-4",
    manager: "mgr-2",
    start_date: "2025-11-19T14:00:00Z",
    end_date: "2025-11-19T16:00:00Z",
    coffee_option: false,
    created_at: "2025-11-17T00:00:00Z",
    updated_at: "2025-11-17T00:00:00Z",
    room_name: "Sala de Conferência",
    room_location: "Anexo Administrativo",
    manager_name: "Maria Santos",
    manager_email: "maria.santos@empresa.com",
  },
  {
    id: "book-3",
    room: "room-3",
    manager: "mgr-3",
    start_date: "2025-11-20T10:00:00Z",
    end_date: "2025-11-20T12:00:00Z",
    coffee_option: true,
    coffee_quantity: 50,
    coffee_description: "Coffee break para apresentação trimestral",
    created_at: "2025-11-17T00:00:00Z",
    updated_at: "2025-11-17T00:00:00Z",
    room_name: "Auditório Principal",
    room_location: "Prédio Principal",
    manager_name: "Pedro Oliveira",
    manager_email: "pedro.oliveira@empresa.com",
  },
  {
    id: "book-4",
    room: "room-6",
    manager: "mgr-4",
    start_date: "2025-11-21T08:00:00Z",
    end_date: "2025-11-21T17:00:00Z",
    coffee_option: true,
    coffee_quantity: 25,
    coffee_description: "Café e almoço para treinamento full-day",
    created_at: "2025-11-17T00:00:00Z",
    updated_at: "2025-11-17T00:00:00Z",
    room_name: "Laboratório de Informática",
    room_location: "Centro de Treinamento",
    manager_name: "Ana Costa",
    manager_email: "ana.costa@empresa.com",
  },
];

// Helper functions para trabalhar com os dados mockados
export const getMockLocations = (): Promise<Location[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...MOCK_LOCATIONS]), 300); // Simula latência da API
  });
};

export const getMockRoomsByLocation = (locationId: string): Promise<Room[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const rooms = MOCK_ROOMS.filter((room) => room.location === locationId);
      resolve([...rooms]);
    }, 200);
  });
};

export const getMockAllRooms = (): Promise<Room[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...MOCK_ROOMS]), 200);
  });
};

export const getMockManagers = (): Promise<Manager[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...MOCK_MANAGERS]), 200);
  });
};

export const getMockBookings = (): Promise<Booking[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...MOCK_BOOKINGS]), 300);
  });
};

export const createMockBooking = (
  booking: Omit<
    Booking,
    | "id"
    | "created_at"
    | "updated_at"
    | "room_name"
    | "room_location"
    | "manager_name"
    | "manager_email"
  >
): Promise<Booking> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simular validação de conflito de horário
      const existingBookings = MOCK_BOOKINGS.filter((b) => b.room === booking.room);
      const hasConflict = existingBookings.some((b) => {
        const startTime = new Date(booking.start_date).getTime();
        const endTime = new Date(booking.end_date).getTime();
        const existingStart = new Date(b.start_date).getTime();
        const existingEnd = new Date(b.end_date).getTime();

        return startTime < existingEnd && endTime > existingStart;
      });

      if (hasConflict) {
        reject(new Error("Conflito de horário detectado para esta sala"));
        return;
      }

      // Buscar informações da sala e gerente
      const room = MOCK_ROOMS.find((r) => r.id === booking.room);
      const location = MOCK_LOCATIONS.find((l) => l.id === room?.location);
      const manager = MOCK_MANAGERS.find((m) => m.id === booking.manager);

      const newBooking: Booking = {
        ...booking,
        id: `book-${Date.now()}`,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        room_name: room?.name || "Sala não encontrada",
        room_location: location?.name || "Local não encontrado",
        manager_name: manager?.name || "Gerente não encontrado",
        manager_email: manager?.email || "Email não encontrado",
      };

      MOCK_BOOKINGS.push(newBooking);
      resolve(newBooking);
    }, 500); // Simula latência de criação
  });
};

// Funções para simular outros CRUDs
export const updateMockBooking = (id: string, updates: Partial<Booking>): Promise<Booking> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = MOCK_BOOKINGS.findIndex((b) => b.id === id);
      if (index === -1) {
        reject(new Error("Reserva não encontrada"));
        return;
      }

      MOCK_BOOKINGS[index] = {
        ...MOCK_BOOKINGS[index],
        ...updates,
        updated_at: new Date().toISOString(),
      };

      resolve(MOCK_BOOKINGS[index]);
    }, 300);
  });
};

export const deleteMockBooking = (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = MOCK_BOOKINGS.findIndex((b) => b.id === id);
      if (index === -1) {
        reject(new Error("Reserva não encontrada"));
        return;
      }

      MOCK_BOOKINGS.splice(index, 1);
      resolve();
    }, 200);
  });
};
