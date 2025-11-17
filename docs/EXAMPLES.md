# Exemplos de Uso dos Componentes

## Componentes Genéricos

### StatsCard

```tsx
import { StatsCard } from "@/components/generic-components/stats-card";
import { Clock } from "lucide-react";

<StatsCard
  title="Reuniões Hoje"
  value={12}
  description="+3 em relação a ontem"
  icon={Clock}
  iconColor="text-blue-600"
  changeColor="text-green-600"
/>;
```

### Header

```tsx
import { Header } from "@/components/generic-components/header";

<Header title="LabTrans" subtitle="Reservas de Salas" logoText="LT" loginHref="/login" />;
```

### ActionButton

```tsx
import { ActionButton } from "@/components/generic-components/action-button";
import { Plus } from "lucide-react";

<ActionButton
  icon={Plus}
  variant="default"
  size="lg"
  className="bg-blue-600 hover:bg-blue-700 text-white"
  onClick={() => console.log("Clicked")}
>
  Nova Reserva
</ActionButton>;
```

### HeroSection

```tsx
import { HeroSection } from "@/components/generic-components/hero-section";

<HeroSection
  title="Sistema de Reservas"
  subtitle="Agende sua sala em segundos"
  description="Gerencie reservas de salas de reuniões de forma simples e eficiente"
>
  {/* Botões ou outros elementos filhos */}
</HeroSection>;
```

### StatusBadge

```tsx
import { StatusBadge } from "@/components/generic-components/status-badge";

<StatusBadge status="available">Sala A1</StatusBadge>;
```

## Componentes de Negócio

### DashboardStats

```tsx
import { DashboardStats } from "@/components/business-components/dashboard-stats";

<DashboardStats />;
```

### DashboardHero

```tsx
import { DashboardHero } from "@/components/business-components/dashboard-hero";

<DashboardHero />;
```

### UpcomingMeetings

```tsx
import { UpcomingMeetings } from "@/components/business-components/upcoming-meetings";

<UpcomingMeetings />;
```

### QuickActions

```tsx
import { QuickActions } from "@/components/business-components/quick-actions";

<QuickActions />;
```

### RoomStatus

```tsx
import { RoomStatus } from "@/components/business-components/room-status";

<RoomStatus />;
```
