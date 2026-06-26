import { api } from './axios';
import type {
  Appointment,
  CreateAppointmentInput,
  UpdateAppointmentInput,
  PollResponse,
} from '@/types/appointment';

export const appointmentsApi = {
  findAll: async (): Promise<Appointment[]> => {
    const { data } = await api.get<Appointment[]>('/appointments');
    return data;
  },

  findOne: async (id: string): Promise<Appointment> => {
    const { data } = await api.get<Appointment>(`/appointments/${id}`);
    return data;
  },

  create: async (appointment: CreateAppointmentInput): Promise<Appointment> => {
    const { data } = await api.post<Appointment>('/appointments', appointment);
    return data;
  },

  update: async (id: string, appointment: UpdateAppointmentInput): Promise<Appointment> => {
    const { data } = await api.put<Appointment>(`/appointments/${id}`, appointment);
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/appointments/${id}`);
  },

  checkIn: async (id: string): Promise<Appointment> => {
    const { data } = await api.post<Appointment>(`/appointments/${id}/check-in`);
    return data;
  },

  poll: async (id: string): Promise<PollResponse> => {
    const { data } = await api.post<PollResponse>(`/appointments/${id}/poll`);
    return data;
  },
};
