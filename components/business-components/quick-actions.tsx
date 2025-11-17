import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ActionButton } from "@/components/generic-components/action-button";
import { Plus, Calendar, MapPin, BarChart3 } from "lucide-react";

const quickActions = [
  {
    icon: Plus,
    label: "Nova Reserva",
    primary: true,
    onClick: () => console.log("Nova reserva"),
  },
  {
    icon: Calendar,
    label: "Ver Agenda",
    primary: false,
    onClick: () => console.log("Ver agenda"),
  },
  {
    icon: MapPin,
    label: "Gerenciar Salas",
    primary: false,
    onClick: () => console.log("Gerenciar salas"),
  },
  {
    icon: BarChart3,
    label: "Relatórios",
    primary: false,
    onClick: () => console.log("Relatórios"),
  },
];

export function QuickActions() {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Ações Rápidas</CardTitle>
        <CardDescription>Principais funcionalidades</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action, index) => (
          <ActionButton
            key={index}
            icon={action.icon}
            variant={action.primary ? "default" : "outline"}
            className={
              action.primary
                ? "w-full justify-start bg-blue-600 hover:bg-blue-700 text-white"
                : "w-full justify-start"
            }
            onClick={action.onClick}
          >
            {action.label}
          </ActionButton>
        ))}
      </CardContent>
    </Card>
  );
}
