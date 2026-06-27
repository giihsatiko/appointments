import type { Appointment } from '@/types/appointments';
import type { PaginatedResponse, PaginationParams } from '@/types/pagination';
import { api } from '../axios';
import type { CreateAppointmentInput, UpdateAppointmentInput } from './types';

export const appointmentsApi = {
  findAll: async (
    params: PaginationParams = {},
  ): Promise<PaginatedResponse<Appointment>> => {
    const { data } = await api.get<PaginatedResponse<Appointment>>('/appointments', {
      params,
    });
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
};
