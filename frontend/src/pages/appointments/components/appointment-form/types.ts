import type { Appointment } from '@/types/appointment';
import type { AppointmentFormValues } from '@/schemas/appointment.schema';

export interface AppointmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  editingId?: string;
  appointment?: Appointment;
  isLoadingAppointment: boolean;
  onSubmit: (data: AppointmentFormValues) => void;
  isSubmitting: boolean;
}
