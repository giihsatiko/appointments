import { useState } from 'react';
import { DEFAULT_LIMIT } from '@/types/pagination';
import { useAppointments } from './use-appointments';
import { useAppointmentMutations } from './use-appointment-mutations';

export function useAppointmentsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const appointments = useAppointments(currentPage, DEFAULT_LIMIT);
  const mutations = useAppointmentMutations();

  const meta = appointments.data?.meta;
  const data = appointments.data?.data ?? [];

  return {
    data,
    meta,
    isLoading: appointments.isLoading,
    isFetching: appointments.isFetching,
    isError: appointments.isError,
    error: appointments.error,
    refetch: appointments.refetch,
    currentPage: meta?.page ?? currentPage,
    totalPages: meta?.totalPages ?? 0,
    total: meta?.total ?? 0,
    onPageChange: setCurrentPage,
    ...mutations,
  };
}
