import { usePagination } from '@/hooks/use-pagination';
import { useAppointments } from './use-appointments';
import { useCheckInAppointment } from './use-checkin-appointment';
import { useDeleteAppointment } from './use-delete-appointment';

const ITEMS_PER_PAGE = 10;

export function useAppointmentsPage() {
  const appointments = useAppointments();
  const pagination = usePagination(appointments.data ?? [], ITEMS_PER_PAGE);
  const { remove, removeAsync, isDeleting, deletingId } = useDeleteAppointment();
  const { checkIn, checkInAsync, isCheckingIn, checkingInId } = useCheckInAppointment();

  return {
    data: pagination.paginatedData,
    isLoading: appointments.isLoading,
    isError: appointments.isError,
    error: appointments.error,
    refetch: appointments.refetch,
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    onPageChange: pagination.setCurrentPage,
    remove,
    removeAsync,
    isDeleting,
    deletingId,
    checkIn,
    checkInAsync,
    isCheckingIn,
    checkingInId,
  };
}
