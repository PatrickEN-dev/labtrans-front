import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/generic-components/modal";
import { Stepper, Step } from "@/components/generic-components/stepper";
import { Button } from "@/components/ui/button";
import {
  BookingBasicInfo,
  BookingLocation,
  BookingDateTime,
  BookingAdditionalConfig,
} from "./booking";
import { fullBookingSchema, type BookingFormData, validateStep } from "@/lib/booking-schemas";
import { toast } from "sonner";
import {
  FileText,
  MapPin,
  CalendarIcon,
  Settings,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import useBookingsApi from "@/components/business-components/hooks/api/useBookingsApi";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

const STEPS: Step[] = [
  {
    id: "basic-info",
    title: "Informações",
    description: "Dados básicos",
    icon: FileText,
  },
  {
    id: "location",
    title: "Local",
    description: "Sala e localização",
    icon: MapPin,
  },
  {
    id: "datetime",
    title: "Data/Hora",
    description: "Quando será",
    icon: CalendarIcon,
  },
  {
    id: "config",
    title: "Configuração",
    description: "Ajustes finais",
    icon: Settings,
  },
];

export function BookingModalSteps({ open, onClose }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bookingsApi = useBookingsApi();

  const form = useForm<BookingFormData>({
    resolver: zodResolver(fullBookingSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      locationId: "",
      customLocation: "",
      roomId: "",
      date: "",
      startTime: "",
      endTime: "",
      managerId: "",
      numberOfParticipants: 1,
      hasVideoCall: false,
      videoPlatform: "",
      hasRefreshments: false,
      refreshmentQuantity: 0,
      refreshmentDescription: "",
      equipmentNeeded: [],
      notes: "",
    },
  });

  const handleClose = useCallback(() => {
    form.reset();
    setCurrentStep(0);
    onClose();
  }, [form, onClose]);

  const handleSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);
      const formData = form.getValues();

      let allStepsValid = true;
      for (let i = 0; i < STEPS.length; i++) {
        const validation = validateStep(i, formData);
        if (!validation.success) {
          allStepsValid = false;
          const firstError =
            validation.error?.issues[0]?.message || "Campos obrigatórios não preenchidos";
          toast.error(`Erro no passo ${i + 1}: ${firstError}`);
          setCurrentStep(i);
          break;
        }
      }

      if (!allStepsValid) return;

      // Construir start_date e end_date no formato correto da API
      const startDateTime = `${formData.date}T${formData.startTime}:00Z`;
      const endDateTime = `${formData.date}T${formData.endTime}:00Z`;

      const bookingData: CreateBookingData = {
        room: formData.roomId,
        manager: formData.managerId,
        start_date: startDateTime,
        end_date: endDateTime,
        coffee_option: formData.hasRefreshments,
        coffee_quantity: formData.hasRefreshments ? formData.refreshmentQuantity || 1 : 0,
        coffee_description: formData.hasRefreshments
          ? formData.refreshmentDescription || "Coffee break incluído"
          : "",
      };

      await bookingsApi.createBooking(bookingData);
      toast.success("Reserva criada com sucesso!");
      handleClose();
    } catch (error) {
      console.error("Erro ao criar reserva:", error);
      toast.error("Erro ao criar reserva. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }, [form, bookingsApi, handleClose]);

  const handleNext = useCallback(async () => {
    const currentStepData = form.getValues();
    console.log("Dados do step atual:", currentStep, currentStepData); // Debug
    const validation = validateStep(currentStep, currentStepData);
    console.log("Resultado da validação:", validation); // Debug

    if (validation.success) {
      if (currentStep < STEPS.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        await handleSubmit();
      }
    } else {
      console.error("Erro de validação:", validation.error); // Debug
      const firstError =
        validation.error?.issues[0]?.message || "Campos obrigatórios não preenchidos";
      toast.error(firstError);
    }
  }, [currentStep, form, handleSubmit]);

  const handlePrevious = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const handleStepClick = useCallback(
    (stepIndex: number) => {
      // Só permitir navegar para steps anteriores ou o atual
      if (stepIndex <= currentStep) {
        setCurrentStep(stepIndex);
        return;
      }

      // Para steps futuros, validar o step atual primeiro
      const currentStepData = form.getValues();
      const validation = validateStep(currentStep, currentStepData);
      if (validation.success) {
        setCurrentStep(stepIndex);
      } else {
        const firstError =
          validation.error?.issues[0]?.message || "Preencha os campos obrigatórios";
        toast.error(firstError);
      }
    },
    [currentStep, form]
  );

  const renderStepContent = useCallback(() => {
    const stepProps = { form };

    switch (currentStep) {
      case 0:
        return <BookingBasicInfo {...stepProps} />;
      case 1:
        return <BookingLocation {...stepProps} />;
      case 2:
        return <BookingDateTime {...stepProps} />;
      case 3:
        return <BookingAdditionalConfig {...stepProps} />;
      default:
        return null;
    }
  }, [currentStep, form]);

  // Verificação simples do step atual
  const checkCanProceed = () => {
    const currentStepData = form.getValues();
    const validation = validateStep(currentStep, currentStepData);
    return validation.success;
  };

  const canProceed = checkCanProceed();

  const footer = (
    <div className="flex items-center justify-between px-6 py-4 border-t">
      <Button
        type="button"
        variant="outline"
        onClick={handlePrevious}
        disabled={currentStep === 0}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Anterior
      </Button>

      <div className="flex items-center gap-2">
        {currentStep === STEPS.length - 1 ? (
          <Button
            onClick={handleSubmit}
            disabled={!canProceed || isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? "Criando..." : "Criar Reserva"}
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={!canProceed} className="flex items-center gap-2">
            Próximo
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );

  const formErrors = form.formState.errors;
  const hasErrors = !canProceed && Object.keys(formErrors).length > 0;
  const firstError = Object.values(formErrors)[0]?.message as string;

  return (
    <Modal
      open={open}
      toggle={handleClose}
      title="Nova Reserva"
      size="lg"
      footer={footer}
      className="max-w-4xl"
      contentClassName="px-0"
    >
      <div className="px-6 pb-6">
        <div className="mb-6">
          <Stepper
            steps={STEPS}
            currentStep={currentStep}
            onStepClick={handleStepClick}
            allowStepClick={true}
          />
        </div>

        <div className="min-h-[400px]">
          {hasErrors && firstError && (
            <div className="mb-4 p-3 border border-red-200 bg-red-50 rounded-lg flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
              <span className="text-red-800 text-sm">{firstError}</span>
            </div>
          )}

          <div>{renderStepContent()}</div>
        </div>
      </div>
    </Modal>
  );
}
