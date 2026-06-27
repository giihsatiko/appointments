import { useQuery } from '@tanstack/react-query';
import { appointmentsApi } from '@/api/appointments';
import { appointmentKeys } from './query-keys';

export function useAppointment(id?: string, enabled = true) {
  return useQuery({
    queryKey: appointmentKeys.detail(id!),
    queryFn: () => appointmentsApi.findOne(id!),
    enabled: !!id && enabled,
  });
}
