import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/generic-components/status-badge";

// Mock data - em uma aplicação real, estes dados viriam de uma API
const mockRooms = [
  { id: 1, name: "Sala A1", status: "available" as const },
  { id: 2, name: "Sala A2", status: "occupied" as const },
  { id: 3, name: "Sala B1", status: "reserved" as const },
  { id: 4, name: "Sala B2", status: "available" as const },
];

export function RoomStatus() {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Status das Salas</CardTitle>
        <CardDescription>Disponibilidade em tempo real</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockRooms.map((room) => (
          <StatusBadge key={room.id} status={room.status}>
            {room.name}
          </StatusBadge>
        ))}
      </CardContent>
    </Card>
  );
}
