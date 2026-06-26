import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { appointmentsApi } from '@/api/appointments';
import { getApiErrorMessage } from '@/utils/api-error';

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: appointmentsApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['appointments'],
      });

      toast.success('Agendamento criado com sucesso.');
    },

    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Erro ao criar agendamento.'));
    },
  });
}
