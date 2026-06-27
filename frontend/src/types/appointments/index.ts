export const AppointmentStatus = {
  PENDING: 'PENDING',
  CHECKED_IN: 'CHECKED_IN',
} as const;

export type AppointmentStatus = (typeof AppointmentStatus)[keyof typeof AppointmentStatus];

export interface Appointment {
  id: string;
  name: string;
  date: string;
  location: string;
  status: AppointmentStatus;
  createdAt: string;
  updatedAt: string;
}
