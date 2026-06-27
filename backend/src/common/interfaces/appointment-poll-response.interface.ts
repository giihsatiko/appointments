import { Appointment } from '@prisma/client';

export interface AppointmentPollResponse {
  serverTime: string;
  appointment: Appointment;
}
