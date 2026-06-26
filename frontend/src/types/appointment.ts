export const AppointmentStatusEnum = {
  PENDING: 'PENDING',
  CHECKED_IN: 'CHECKED_IN',
} as const;

export type AppointmentStatus = 'PENDING' | 'CHECKED_IN';

export interface Appointment {
  id: string;
  name: string;
  date: string;
  location: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentInput {
  name: string;
  date: string;
  location: string;
}

export interface UpdateAppointmentInput extends Partial<CreateAppointmentInput> {
  status?: AppointmentStatus;
}

export interface PollResponse {
  serverTime: string;
  appointment: Appointment;
}
