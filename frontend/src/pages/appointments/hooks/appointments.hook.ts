import { usePagination } from '@/hooks/use-pagination';
import { useAppointments } from './use-appointments';
import { useAppointmentMutations } from './use-appointment-mutations';

const ITEMS_PER_PAGE = 10;

export function useAppointmentsPage() {
  const appointments = useAppointments();
  const pagination = usePagination(appointments.data ?? [], ITEMS_PER_PAGE);
  const mutations = useAppointmentMutations();

  return {
    data: pagination.paginatedData,
    isLoading: appointments.isLoading,
    isError: appointments.isError,
    error: appointments.error,
    refetch: appointments.refetch,
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    onPageChange: pagination.setCurrentPage,
    ...mutations,
  };
}
