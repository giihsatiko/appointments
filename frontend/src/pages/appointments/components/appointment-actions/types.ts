import type { AppointmentStatus } from '@/types/appointment';
import type { View } from '@/pages/appointments/types';

export interface AppointmentActionsProps {
  appointmentId: string;
  appointmentName: string;
  status: AppointmentStatus;
  layout: 'desktop' | 'mobile';
  onOpenModal: (mode: NonNullable<View>['mode'], id?: string) => void;
  onCheckIn: (id: string) => void;
  onRemove: (id: string) => void;
  isCheckingIn: boolean;
  checkingInId: string | null;
  isDeleting: boolean;
  deletingId: string | null;
}
