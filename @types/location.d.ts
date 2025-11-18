interface Location {
  id: string;
  name: string;
  address: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

interface CreateLocationData {
  name: string;
  address?: string;
  description?: string;
}

type UpdateLocationData = Partial<CreateLocationData>;

interface LocationQueryParams {
  search?: string;
}
