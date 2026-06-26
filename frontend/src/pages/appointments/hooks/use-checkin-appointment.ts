import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { appointmentsApi } from '@/api/appointments';

export function useCheckInAppointment() {
  const queryClient = useQueryClient();

  const [checkingInId, setCheckingInId] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: appointmentsApi.checkIn,
    onMutate: (id) => {
      setCheckingInId(id);
    },
    onSuccess: (appointment) => {
      queryClient.invalidateQueries({
        queryKey: ['appointments'],
      });

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
    checkIn: mutation.mutate,
    checkInAsync: mutation.mutateAsync,
    isCheckingIn: mutation.isPending,
    checkingInId,
  };
}
