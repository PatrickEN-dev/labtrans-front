import React, { useState, useEffect } from "react";
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
import useLocationsApi from "../hooks/api/useLocationsApi";
import useRoomsApi from "../hooks/api/useRoomsApi";

interface BookingLocationProps {
  form: any;
}

export function BookingLocation({ form }: BookingLocationProps) {
  const [useCustomLocation, setUseCustomLocation] = useState(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);

  const locationsApi = useLocationsApi();
  const roomsApi = useRoomsApi();

  const { setValue, watch } = form;
  const locationId = watch("locationId");
  const customLocation = watch("customLocation");
  const roomId = watch("roomId");

  useEffect(() => {
    let isMounted = true;

    const loadLocations = async () => {
      try {
        const fetchedLocations = await locationsApi.getLocations();
        if (isMounted) {
          setLocations(fetchedLocations);
        }
      } catch (error) {
        console.error("Erro ao carregar locais:", error);
      }
    };

    loadLocations();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    if (!locationId) {
      setRooms([]);
      return;
    }

    const loadRooms = async () => {
      try {
        const fetchedRooms = await roomsApi.getRooms({ location_id: locationId });
        if (isMounted) {
          setRooms(fetchedRooms);
        }
      } catch (error) {
        console.error("Erro ao carregar salas:", error);
      }
    };

    loadRooms();

    return () => {
      isMounted = false;
    };
  }, [locationId]);

  const handleLocationChange = (value: string) => {
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
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="h-5 w-5 text-purple-600" />
          Local
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
            <Select value={roomId} onValueChange={(value) => setValue("roomId", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecione a sala" />
              </SelectTrigger>
              <SelectContent>
                {rooms.length === 0 ? (
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
