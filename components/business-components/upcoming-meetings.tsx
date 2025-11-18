import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Coffee, BarChart3 } from "lucide-react";
import { ClientOnly } from "@/components/generic-components/client-only";
import { useEffect, useState } from "react";
import useBookingsApi from "./hooks/api/useBookingsApi";

export function UpcomingMeetings() {
  const [todayBookings, setTodayBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const bookingsApi = useBookingsApi();

  useEffect(() => {
    const loadTodayBookings = async () => {
      try {
        const bookings = await bookingsApi.getBookings();
        const today = new Date().toDateString();
        const filtered = bookings
          .filter((booking: any) => {
            const bookingDate = new Date(booking.start_date).toDateString();
            return bookingDate === today;
          })
          .slice(0, 3);
        setTodayBookings(filtered);
      } catch (error) {
        console.error("Erro ao carregar reuniões:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTodayBookings();
  }, [bookingsApi]);

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="lg:col-span-2" suppressHydrationWarning={true}>
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
          <ClientOnly>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <Clock className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Carregando reuniões...</p>
                </div>
              </div>
            ) : todayBookings.length === 0 ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <Calendar className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Nenhuma reunião agendada para hoje</p>
                </div>
              </div>
            ) : (
              todayBookings.map((booking: any) => (
                <div
                  key={booking.id}
                  className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
                  suppressHydrationWarning={true}
                >
                  <div
                    className="shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center"
                    suppressHydrationWarning={true}
                  >
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div className="grow" suppressHydrationWarning={true}>
                    <h3 className="font-semibold text-gray-900">{booking.name || "Reunião"}</h3>
                    <p className="text-sm text-gray-600">
                      {booking.room_name} • {formatTime(booking.start_date)} -{" "}
                      {formatTime(booking.end_date)}
                    </p>
                    <p className="text-xs text-blue-600">Responsável: {booking.manager_name}</p>
                  </div>
                  <div className="flex items-center space-x-2" suppressHydrationWarning={true}>
                    {booking.coffee_option ? (
                      <>
                        <Coffee className="h-4 w-4 text-amber-600" />
                        <span className="text-xs text-gray-500">
                          Café: {booking.coffee_quantity || 1} pessoas
                        </span>
                      </>
                    ) : (
                      <span className="text-xs text-gray-500">Sem café</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </ClientOnly>
        </CardContent>
      </Card>
    </div>
  );
}
