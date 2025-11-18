import React, { useState, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Home, Building2 } from "lucide-react";
import type { Location, Room } from "@/lib/mock-data";

interface BookingLocationProps {
  form: any;
  locations: Location[];
  rooms: Room[];
}

export function BookingLocation({ form, locations, rooms }: BookingLocationProps) {
  const [useCustomLocation, setUseCustomLocation] = useState(false);
  const { setValue, watch } = form;
  const locationId = watch("locationId");
  const customLocation = watch("customLocation");
  const roomId = watch("roomId");

  const handleLocationChange = useCallback(
    (value: string) => {
      if (value === "custom") {
        setUseCustomLocation(true);
        setValue("locationId", "");
        setValue("customLocation", "");
      } else {
        setUseCustomLocation(false);
        setValue("locationId", value);
        setValue("customLocation", "");
      }
      setValue("roomId", "");
    },
    [setValue]
  );

  return (
    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-linear-to-br from-white to-slate-50/50">
      <CardHeader className="pb-4 bg-linear-to-r from-purple-50 to-blue-50 rounded-t-lg">
        <CardTitle className="flex items-center gap-3 text-xl">
          <div className="p-2 bg-linear-to-br from-purple-500 to-blue-600 rounded-lg shadow-lg">
            <MapPin className="h-5 w-5 text-white" />
          </div>
          <div>
            <span className="bg-linear-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent font-bold">
              Localização & Ambiente
            </span>
            <p className="text-sm text-slate-500 font-normal mt-1">
              Selecione o local e sala ideal
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium">
              <Home className="inline h-4 w-4 mr-1" />
              Localização *
            </Label>
            <Select
              value={useCustomLocation ? "custom" : locationId}
              onValueChange={handleLocationChange}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecione a localização" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.name}
                  </SelectItem>
                ))}
                <SelectItem value="custom">
                  <Building2 className="inline h-4 w-4 mr-1" />
                  Outra localização...
                </SelectItem>
              </SelectContent>
            </Select>
            {useCustomLocation && (
              <Input
                value={customLocation}
                onChange={(e) => setValue("customLocation", e.target.value)}
                placeholder="Digite a localização"
                className="mt-2"
              />
            )}
          </div>
          <div>
            <Label className="text-sm font-medium">
              <MapPin className="inline h-4 w-4 mr-1" />
              Sala *
            </Label>
            <Select
              value={roomId}
              onValueChange={(value) => setValue("roomId", value)}
              disabled={!locationId}
            >
              <SelectTrigger className="mt-1">
                <SelectValue
                  placeholder={
                    !locationId
                      ? "Selecione primeiro a localização"
                      : rooms.length === 0
                      ? "Nenhuma sala disponível"
                      : "Selecione a sala"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {locationId && rooms.length === 0 ? (
                  <SelectItem value="no-rooms" disabled>
                    Nenhuma sala disponível
                  </SelectItem>
                ) : (
                  rooms.map((room) => (
                    <SelectItem key={room.id} value={room.id}>
                      {room.name} {room.capacity && `(${room.capacity} pessoas)`}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
