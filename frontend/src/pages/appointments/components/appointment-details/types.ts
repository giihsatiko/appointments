import type { Appointment } from '@/types/appointments';

export interface AppointmentDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  viewingId?: string;
  onEdit: (id: string) => void;
  appointment?: Appointment;
  isLoading: boolean;
  isError: boolean;
}
