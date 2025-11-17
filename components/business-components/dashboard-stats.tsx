import { StatsCard } from "@/components/generic-components/stats-card";
import { Clock, MapPin, Users, Coffee } from "lucide-react";

// Mock data - em uma aplicação real, estes dados viriam de uma API
const mockStats = {
  meetingsToday: 12,
  availableRooms: 8,
  totalRooms: 15,
  activeParticipants: 48,
  coffeeOrders: 24,
};

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Reuniões Hoje"
        value={mockStats.meetingsToday}
        description="+3 em relação a ontem"
        icon={Clock}
        iconColor="text-blue-600"
        changeColor="text-green-600"
      />

      <StatsCard
        title="Salas Disponíveis"
        value={mockStats.availableRooms}
        description={`de ${mockStats.totalRooms} total`}
        icon={MapPin}
        iconColor="text-green-600"
      />

      <StatsCard
        title="Participantes"
        value={mockStats.activeParticipants}
        description="em reuniões ativas"
        icon={Users}
        iconColor="text-purple-600"
      />

      <StatsCard
        title="Café Solicitado"
        value={mockStats.coffeeOrders}
        description="copos hoje"
        icon={Coffee}
        iconColor="text-amber-600"
        changeColor="text-amber-600"
      />
    </div>
  );
}
