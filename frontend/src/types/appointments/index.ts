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
