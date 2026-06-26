import { useQuery } from '@tanstack/react-query';
import { appointmentsApi } from '@/api/appointments';

export function useAppointment(id?: string, enabled = true) {
  return useQuery({
    queryKey: ['appointment', id],
    queryFn: () => appointmentsApi.findOne(id!),
    enabled: !!id && enabled,
  });
}
