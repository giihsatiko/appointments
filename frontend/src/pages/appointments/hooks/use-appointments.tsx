import { useQuery } from '@tanstack/react-query';
import { appointmentsApi } from '@/api/appointments';

export function useAppointments() {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: appointmentsApi.findAll,
  });
}
