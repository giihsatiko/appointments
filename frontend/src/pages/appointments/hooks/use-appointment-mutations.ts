import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { appointmentsApi } from '@/api/appointments';
import type { UpdateAppointmentInput } from '@/types/appointment';
import { getApiErrorMessage } from '@/utils/api-error';

type UpdateParams = {
  id: string;
  data: UpdateAppointmentInput;
};

export function useAppointmentMutations() {
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [checkingInId, setCheckingInId] = useState<string | null>(null);

  function invalidateList() {
    return queryClient.invalidateQueries({ queryKey: ['appointments'] });
  }

  const create = useMutation({
    mutationFn: appointmentsApi.create,
    onSuccess: async () => {
      await invalidateList();
      toast.success('Agendamento criado com sucesso.');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Erro ao criar agendamento.'));
    },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: UpdateParams) => appointmentsApi.update(id, data),
    onSuccess: async (_, variables) => {
      await invalidateList();
      await queryClient.invalidateQueries({ queryKey: ['appointment', variables.id] });
      toast.success('Agendamento atualizado com sucesso.');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Erro ao atualizar agendamento.'));
    },
  });

  const remove = useMutation({
    mutationFn: appointmentsApi.remove,
    onMutate: (id) => {
      setDeletingId(id);
    },
    onSuccess: async () => {
      await invalidateList();
      toast.success('Agendamento excluído com sucesso.');
    },
    onError: () => {
      toast.error('Erro ao excluir agendamento.');
    },
    onSettled: () => {
      setDeletingId(null);
    },
  });

  const checkIn = useMutation({
    mutationFn: appointmentsApi.checkIn,
    onMutate: (id) => {
      setCheckingInId(id);
    },
    onSuccess: async (appointment) => {
      await invalidateList();
      queryClient.setQueryData(['appointment', appointment.id], appointment);
      toast.success('Check-in realizado com sucesso.');
    },
    onError: () => {
      toast.error('Erro ao realizar check-in.');
    },
    onSettled: () => {
      setCheckingInId(null);
    },
  });

  return {
    create,
    update,
    remove: remove.mutate,
    removeAsync: remove.mutateAsync,
    isDeleting: remove.isPending,
    deletingId,
    checkIn: checkIn.mutate,
    checkInAsync: checkIn.mutateAsync,
    isCheckingIn: checkIn.isPending,
    checkingInId,
  };
}

export type AppointmentMutations = ReturnType<typeof useAppointmentMutations>;
