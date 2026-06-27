import { useCallback } from 'react';
import type { AppointmentFormValues } from '@/pages/appointments/components/appointment-form/schemas/appointment';
import { combineDateAndTime } from '@/utils/datetime';
import type { View } from '../types';
import { useAppointment } from './use-appointment';
import type { AppointmentMutations } from './use-appointment-mutations';
import { useAppointmentPoll } from './use-appointment-poll';

export function useAppointmentModal(view: View, mutations: AppointmentMutations) {
  const isFormOpen = view?.mode === 'form';
  const isDetailOpen = view?.mode === 'detail';
  const formId = isFormOpen ? view.id : undefined;
  const detailId = isDetailOpen ? view.id : undefined;

  const { create, update } = mutations;

  const editingAppointment = useAppointment(formId, isFormOpen && !!formId);
  const detailsPoll = useAppointmentPoll(detailId, isDetailOpen);

  const submitForm = useCallback(
    (data: AppointmentFormValues, onSuccess: () => void) => {
      const { time, date, ...rest } = data;
      const payload = { ...rest, date: combineDateAndTime(date, time).toISOString() };

      if (formId) {
        update.mutate({ id: formId, data: payload }, { onSuccess });
      } else {
        create.mutate(payload, { onSuccess });
      }
    },
    [formId, create, update],
  );

  return {
    form: {
      editingId: formId,
      appointment: editingAppointment.data,
      isLoadingAppointment: !!formId && editingAppointment.isLoading,
      submit: submitForm,
      isSubmitting: create.isPending || update.isPending,
    },
    detail: {
      viewingId: detailId,
      appointment: detailsPoll.data?.appointment,
      isLoading: detailsPoll.isLoading,
      isError: detailsPoll.isError,
    },
  };
}
