import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { appointmentsApi } from '@/api/appointments';

export function useDeleteAppointment() {
  const queryClient = useQueryClient();

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: appointmentsApi.remove,
    onMutate: (id) => {
      setDeletingId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['appointments'],
      });

      toast.success('Agendamento excluído com sucesso.');
    },
    onError: () => {
      toast.error('Erro ao excluir agendamento.');
    },
    onSettled: () => {
      setDeletingId(null);
    },
  });

  return {
    remove: mutation.mutate,
    removeAsync: mutation.mutateAsync,
    isDeleting: mutation.isPending,
    deletingId,
  };
}
