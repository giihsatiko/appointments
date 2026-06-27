import { AppointmentStatus } from '@/types/appointments';

export function formatStatus(status: AppointmentStatus): string {
  switch (status) {
    case AppointmentStatus.PENDING:
      return 'Pendente';
    case AppointmentStatus.CHECKED_IN:
      return 'Realizado';
    default:
      return status;
  }
}
