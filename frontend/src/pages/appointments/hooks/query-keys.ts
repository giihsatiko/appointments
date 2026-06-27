import { DEFAULT_LIMIT } from '@/types/pagination';

export const appointmentKeys = {
  all: ['appointments'] as const,
  list: (page: number, limit: number = DEFAULT_LIMIT) =>
    [...appointmentKeys.all, { page, limit }] as const,
  detail: (id: string) => ['appointment', id] as const,
};
