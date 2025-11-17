# Estrutura de Componentes

Este projeto utiliza uma arquitetura de componentes dividida em duas categorias principais:

## 📁 Generic Components (`components/generic-components/`)

Componentes genéricos e reutilizáveis que não contêm regras de negócio específicas. Estes componentes podem ser utilizados em qualquer parte da aplicação.

### Componentes Disponíveis:

- **`StatsCard`** - Cartão genérico para exibir estatísticas com ícone
- **`Header`** - Cabeçalho genérico da aplicação
- **`Footer`** - Rodapé genérico da aplicação
- **`ActionButton`** - Botão genérico com ícone
- **`HeroSection`** - Seção hero genérica para páginas
- **`StatusBadge`** - Badge genérico para indicar status
- **`TermsModal`** - Modal genérico para exibir termos e condições

### Características:

- ✅ Reutilizáveis
- ✅ Configuráveis via props
- ✅ Sem lógica de negócio
- ✅ Focados na apresentação

## 📁 Business Components (`components/business-components/`)

Componentes que contêm regras de negócio específicas do domínio da aplicação (sistema de reserva de salas).

### Componentes Disponíveis:

- **`DashboardStats`** - Estatísticas específicas do dashboard de reservas
- **`DashboardHero`** - Hero section específica do sistema de reservas
- **`UpcomingMeetings`** - Lista de reuniões próximas com dados específicos
- **`QuickActions`** - Ações rápidas específicas do sistema
- **`RoomStatus`** - Status das salas de reunião
- **`LabTransTerms`** - Componente de termos de uso específico do LabTrans

### Características:

- ✅ Contêm mock data e regras específicas
- ✅ Implementam funcionalidades do domínio
- ✅ Utilizam componentes genéricos internamente
- ✅ Focados na lógica de negócio

## 🏗️ Padrões de Uso

### Importações

```typescript
// Componentes genéricos
import { StatsCard, Header } from "@/components/generic-components";

// Componentes de negócio
import { DashboardStats, UpcomingMeetings } from "@/components/business-components";
```

### Estrutura de Pastas

```
components/
├── generic-components/
│   ├── stats-card.tsx
│   ├── header.tsx
│   ├── action-button.tsx
│   ├── hero-section.tsx
│   ├── status-badge.tsx
│   └── index.ts
├── business-components/
│   ├── dashboard-stats.tsx
│   ├── dashboard-hero.tsx
│   ├── upcoming-meetings.tsx
│   ├── quick-actions.tsx
│   ├── room-status.tsx
│   └── index.ts
└── ui/ (shadcn/ui components)
```

## 🎯 Benefícios

1. **Separação de Responsabilidades** - Componentes genéricos vs específicos
2. **Reutilização** - Componentes genéricos podem ser usados em qualquer lugar
3. **Manutenibilidade** - Fácil localização e modificação de código
4. **Testabilidade** - Componentes isolados são mais fáceis de testar
5. **Escalabilidade** - Estrutura preparada para crescimento do projeto
