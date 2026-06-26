import { useAppointmentPoll } from './use-appointment-poll';

export function useAppointmentDetailsModal(viewingId?: string, isOpen = false) {
  const detailsPoll = useAppointmentPoll(viewingId, isOpen);

  return {
    appointment: detailsPoll.data?.appointment,
    isLoading: detailsPoll.isLoading,
    isError: detailsPoll.isError,
  };
}
