import type { Appointment, AppointmentStatus } from '@/types/appointments';

export interface CreateAppointmentInput {
  name: string;
  date: string;
  location: string;
}

export interface UpdateAppointmentInput extends Partial<CreateAppointmentInput> {
  status?: AppointmentStatus;
}

export interface AppointmentUpdatedPayload {
  serverTime: string;
  appointment: Appointment | { id: string; deleted: true };
}
