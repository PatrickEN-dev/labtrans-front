import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingDateTimeProps {
  form: any;
}

export function BookingDateTime({ form }: BookingDateTimeProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const {
    setValue,
    watch,
    formState: { errors },
  } = form;
  const date = watch("date");
  const startTime = watch("startTime");
  const endTime = watch("endTime");

  const handleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setValue("date", format(selectedDate, "yyyy-MM-dd"));
    }
    setIsCalendarOpen(false);
  };

  const parsedDate = date ? new Date(date) : undefined;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-linear-to-br from-white to-slate-50/50">
      <CardHeader className="pb-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-t-lg">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg shadow-lg">
            <CalendarIcon className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="bg-linear-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent font-bold">
              Agendamento
            </span>
            <p className="text-sm text-slate-500 font-normal mt-1">
              Defina data e horários da reunião
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              📅 Data da Reunião *
            </Label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal h-11 border-slate-200 focus:border-green-500 focus:ring-green-500/20 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white",
                    !parsedDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-3 h-4 w-4 text-green-600" />
                  {parsedDate
                    ? format(parsedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
                    : "Selecione a data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto p-0 bg-white/95 backdrop-blur-sm border-slate-200"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={parsedDate}
                  onSelect={handleDateChange}
                  disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                  initialFocus
                  className="rounded-lg"
                />
              </PopoverContent>
            </Popover>
            {errors.date && (
              <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                <span>⚠️</span>
                {errors.date.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="startTime"
              className="text-sm font-semibold text-slate-700 flex items-center gap-2"
            >
              🕐 Horário de Início *
            </Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-600" />
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setValue("startTime", e.target.value)}
                className="pl-10 h-11 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white"
              />
            </div>
            {errors.startTime && (
              <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                <span>⚠️</span>
                {errors.startTime.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="endTime"
              className="text-sm font-semibold text-slate-700 flex items-center gap-2"
            >
              🕐 Horário de Término *
            </Label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-emerald-600" />
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setValue("endTime", e.target.value)}
                className="pl-10 h-11 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 bg-white/80 backdrop-blur-sm transition-all duration-200 hover:bg-white"
              />
            </div>
            {errors.endTime && (
              <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                <span>⚠️</span>
                {errors.endTime.message}
              </p>
            )}
          </div>
        </div>

        {startTime && endTime && (
          <div className="bg-linear-to-r from-emerald-50 to-green-50 rounded-lg p-4 border border-emerald-200/50">
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-emerald-600 font-medium">⏱️ Duração estimada:</span>
              <span className="text-slate-700 font-semibold">
                {(() => {
                  const start = new Date(`2000-01-01T${startTime}`);
                  const end = new Date(`2000-01-01T${endTime}`);
                  const diff = end.getTime() - start.getTime();
                  const hours = Math.floor(diff / (1000 * 60 * 60));
                  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                  return hours > 0
                    ? `${hours}h ${minutes > 0 ? `${minutes}min` : ""}`
                    : `${minutes}min`;
                })()}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
