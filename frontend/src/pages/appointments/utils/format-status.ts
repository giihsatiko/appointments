import { AppointmentStatusEnum, type AppointmentStatus } from '@/types/appointments';

export function formatStatus(status: AppointmentStatus): string {
  switch (status) {
    case AppointmentStatusEnum.PENDING:
      return 'Pendente';
    case AppointmentStatusEnum.CHECKED_IN:
      return 'Realizado';
    default:
      return status;
  }
}
