import { useQuery } from '@tanstack/react-query';
import { appointmentsApi } from '@/api/appointments';

export function useAppointmentPoll(id?: string, enabled = true) {
  return useQuery({
    queryKey: ['appointment', id, 'poll'],
    queryFn: () => appointmentsApi.poll(id!),
    enabled: !!id && enabled,
    refetchInterval: 10000,
  });
}
