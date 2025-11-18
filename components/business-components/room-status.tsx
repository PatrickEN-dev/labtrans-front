import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function RoomStatus() {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-white/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900">Status das Salas</CardTitle>
        <CardDescription>Funcionalidade em desenvolvimento</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center">
              <span className="text-gray-400 text-sm">🚧</span>
            </div>
            <p className="text-sm text-gray-500">Status das salas em tempo real</p>
            <p className="text-xs text-gray-400 mt-1">Disponível em breve</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
