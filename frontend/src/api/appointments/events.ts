import type { AppointmentUpdatedPayload } from '@/api/appointments/types';

export const APPOINTMENT_UPDATED_EVENT = 'appointmentUpdated';

export function isDeletedAppointment(
  appointment: AppointmentUpdatedPayload['appointment'],
): appointment is { id: string; deleted: true } {
  return 'deleted' in appointment && appointment.deleted === true;
}