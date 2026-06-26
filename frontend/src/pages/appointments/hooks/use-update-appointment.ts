import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { appointmentsApi } from '@/api/appointments';
import { getApiErrorMessage } from '@/utils/api-error';
import type { UpdateAppointmentInput } from '@/types/appointment';

type UpdateParams = {
  id: string;
  data: UpdateAppointmentInput;
};

export function useUpdateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateParams) => appointmentsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['appointments'],
      });
      queryClient.invalidateQueries({
        queryKey: ['appointment', variables.id],
      });
      toast.success('Agendamento atualizado com sucesso.');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Erro ao atualizar agendamento.'));
    },
  });
}
