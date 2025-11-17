import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Calendar, Coffee, BarChart3 } from "lucide-react";

// Mock data - em uma aplicação real, estes dados viriam de uma API
const mockMeetings = [
  {
    id: 1,
    title: "Reunião de Planejamento",
    room: "Sala A1",
    time: "09:00 - 10:30",
    responsible: "João Silva",
    coffeeCount: 8,
    type: "planning",
    color: "blue",
  },
  {
    id: 2,
    title: "Apresentação Cliente",
    room: "Sala B2",
    time: "14:00 - 16:00",
    responsible: "Maria Santos",
    coffeeCount: 12,
    type: "presentation",
    color: "green",
  },
  {
    id: 3,
    title: "Revisão Semanal",
    room: "Sala C1",
    time: "16:30 - 17:30",
    responsible: "Carlos Lima",
    coffeeCount: 0,
    type: "review",
    color: "purple",
  },
];

export function UpcomingMeetings() {
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        iconBg: "bg-blue-600",
        text: "text-blue-600",
      },
      green: {
        bg: "bg-green-50",
        border: "border-green-200",
        iconBg: "bg-green-600",
        text: "text-green-600",
      },
      purple: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        iconBg: "bg-purple-600",
        text: "text-purple-600",
      },
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "planning":
        return Clock;
      case "presentation":
        return Users;
      case "review":
        return Calendar;
      default:
        return Clock;
    }
  };

  return (
    <div className="lg:col-span-2">
      <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl text-gray-900">Próximas Reuniões</CardTitle>
              <CardDescription>Reuniões agendadas para hoje</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Ver Todas
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockMeetings.map((meeting) => {
            const colors = getColorClasses(meeting.color);
            const IconComponent = getIcon(meeting.type);

            return (
              <div
                key={meeting.id}
                className={`flex items-center space-x-4 p-4 ${colors.bg} rounded-lg border ${colors.border}`}
              >
                <div
                  className={`shrink-0 w-12 h-12 ${colors.iconBg} rounded-full flex items-center justify-center`}
                >
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div className="grow">
                  <h3 className="font-semibold text-gray-900">{meeting.title}</h3>
                  <p className="text-sm text-gray-600">
                    {meeting.room} • {meeting.time}
                  </p>
                  <p className={`text-xs ${colors.text}`}>Responsável: {meeting.responsible}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {meeting.coffeeCount > 0 ? (
                    <>
                      <Coffee className="h-4 w-4 text-amber-600" />
                      <span className="text-xs text-gray-500">
                        Café: {meeting.coffeeCount} pessoas
                      </span>
                    </>
                  ) : (
                    <span className="text-xs text-gray-500">Sem café</span>
                  )}
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
