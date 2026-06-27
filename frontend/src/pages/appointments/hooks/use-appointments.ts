import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { appointmentsApi } from '@/api/appointments';
import { DEFAULT_LIMIT } from '@/types/pagination';
import { appointmentKeys } from './query-keys';

export function useAppointments(page: number, limit: number = DEFAULT_LIMIT) {
  return useQuery({
    queryKey: appointmentKeys.list(page, limit),
    queryFn: () => appointmentsApi.findAll({ page, limit }),
    placeholderData: keepPreviousData,
  });
}
