import { useState } from 'react';
import type { AppointmentFormValues } from '@/schemas/appointment.schema';
import { combineDateAndTime } from '@/utils/datetime';
import { getApiErrorMessage } from '@/utils/api-error';
import { useAppointment } from './use-appointment';
import { useCreateAppointment } from './use-create-appointment';
import { useUpdateAppointment } from './use-update-appointment';

export function useAppointmentFormModal(editingId?: string, isOpen = false) {
  const editingAppointment = useAppointment(editingId, isOpen && !!editingId);
  const createMutation = useCreateAppointment();
  const updateMutation = useUpdateAppointment();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const submit = (data: AppointmentFormValues, onSuccess: () => void) => {
    setSubmitError(null);

    const { time, date, ...rest } = data;
    const payload = { ...rest, date: combineDateAndTime(date, time).toISOString() };

    const handleError = (error: unknown) => {
      setSubmitError(
        getApiErrorMessage(
          error,
          editingId ? 'Erro ao atualizar agendamento.' : 'Erro ao criar agendamento.',
        ),
      );
    };

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: payload }, { onSuccess, onError: handleError });
    } else {
      createMutation.mutate(payload, { onSuccess, onError: handleError });
    }
  };

  return {
    appointment: editingAppointment.data,
    isLoadingAppointment: !!editingId && editingAppointment.isLoading,
    submit,
    submitError: isOpen ? submitError : null,
    isSubmitting: createMutation.isPending || updateMutation.isPending,
  };
}
