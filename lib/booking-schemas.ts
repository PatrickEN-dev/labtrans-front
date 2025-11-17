import { z } from "zod";

export const basicInfoSchema = z.object({
  title: z
    .string()
    .min(3, "Título deve ter pelo menos 3 caracteres")
    .max(100, "Título muito longo"),
  description: z.string().optional(),
});

export const locationSchema = z
  .object({
    locationId: z.string().optional(),
    customLocation: z.string().optional(),
    roomId: z.string().min(1, "Selecione uma sala"),
  })
  .refine(
    (data) => {
      return data.locationId || data.customLocation;
    },
    {
      message: "Informe uma localização",
      path: ["customLocation"],
    }
  );

export const dateTimeSchema = z
  .object({
    date: z.string().min(1, "Selecione uma data"),
    startTime: z.string().min(1, "Selecione o horário de início"),
    endTime: z.string().min(1, "Selecione o horário de fim"),
  })
  .refine(
    (data) => {
      if (data.startTime && data.endTime) {
        const start = parseInt(data.startTime.replace(":", ""));
        const end = parseInt(data.endTime.replace(":", ""));
        return end > start;
      }
      return true;
    },
    {
      message: "Horário de fim deve ser posterior ao horário de início",
      path: ["endTime"],
    }
  );

export const additionalConfigSchema = z
  .object({
    managerId: z.string().min(1, "Responsável é obrigatório"),
    numberOfParticipants: z.number().min(1, "Número de participantes deve ser pelo menos 1"),
    hasVideoCall: z.boolean(),
    videoPlatform: z.string().optional(),
    hasRefreshments: z.boolean(),
    refreshmentQuantity: z.number().optional(),
    refreshmentDescription: z.string().optional(),
    equipmentNeeded: z.array(z.string()),
    notes: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.hasVideoCall) {
        return data.videoPlatform && data.videoPlatform.length > 0;
      }
      return true;
    },
    {
      message: "Selecione uma plataforma para videochamada",
      path: ["videoPlatform"],
    }
  )
  .refine(
    (data) => {
      if (data.hasRefreshments) {
        return data.refreshmentQuantity && data.refreshmentQuantity > 0;
      }
      return true;
    },
    {
      message: "Informe a quantidade para o coffee break",
      path: ["refreshmentQuantity"],
    }
  );

export const fullBookingSchema = z
  .object({
    title: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
    description: z.string().optional(),
    locationId: z.string().optional(),
    customLocation: z.string().optional(),
    roomId: z.string().min(1, "Selecione uma sala"),
    date: z.string().min(1, "Selecione uma data"),
    startTime: z.string().min(1, "Selecione o horário de início"),
    endTime: z.string().min(1, "Selecione o horário de fim"),
    managerId: z.string().min(1, "Responsável é obrigatório"),
    numberOfParticipants: z.number().min(1, "Número de participantes deve ser pelo menos 1"),
    hasVideoCall: z.boolean(),
    videoPlatform: z.string().optional(),
    hasRefreshments: z.boolean(),
    refreshmentQuantity: z.number().optional(),
    refreshmentDescription: z.string().optional(),
    equipmentNeeded: z.array(z.string()),
    notes: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.startTime && data.endTime) {
        const start = parseInt(data.startTime.replace(":", ""));
        const end = parseInt(data.endTime.replace(":", ""));
        return end > start;
      }
      return true;
    },
    {
      message: "Horário de fim deve ser posterior ao horário de início",
      path: ["endTime"],
    }
  )
  .refine(
    (data) => {
      return data.locationId || data.customLocation;
    },
    {
      message: "Informe uma localização",
      path: ["customLocation"],
    }
  )
  .refine(
    (data) => {
      if (data.hasVideoCall) {
        return data.videoPlatform && data.videoPlatform.length > 0;
      }
      return true;
    },
    {
      message: "Selecione uma plataforma para videochamada",
      path: ["videoPlatform"],
    }
  )
  .refine(
    (data) => {
      if (data.hasRefreshments) {
        return data.refreshmentQuantity && data.refreshmentQuantity > 0;
      }
      return true;
    },
    {
      message: "Informe a quantidade para o coffee break",
      path: ["refreshmentQuantity"],
    }
  );

export type BasicInfo = z.infer<typeof basicInfoSchema>;
export type LocationData = z.infer<typeof locationSchema>;
export type DateTimeData = z.infer<typeof dateTimeSchema>;
export type AdditionalConfig = z.infer<typeof additionalConfigSchema>;
export type BookingFormData = z.infer<typeof fullBookingSchema>;

export function validateStep(step: number, data: Partial<BookingFormData>) {
  switch (step) {
    case 0:
      return basicInfoSchema.safeParse(data);
    case 1:
      return locationSchema.safeParse(data);
    case 2:
      return dateTimeSchema.safeParse(data);
    case 3:
      return additionalConfigSchema.safeParse(data);
    default:
      return { success: false, error: { issues: [] } };
  }
}
