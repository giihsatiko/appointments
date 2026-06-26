import type { Appointment } from '@/types/appointment';
import type { View } from '@/pages/appointments/types';

export interface AppointmentsDesktopProps {
  data: Appointment[];
  onOpenModal: (mode: NonNullable<View>['mode'], id?: string) => void;
  onCheckIn: (id: string) => void;
  onRemove: (id: string) => void;
  isCheckingIn: boolean;
  checkingInId: string | null;
  isDeleting: boolean;
  deletingId: string | null;
}
