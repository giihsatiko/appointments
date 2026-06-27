import { describe, expect, it } from 'vitest';
import { isDeletedAppointment } from '@/api/appointments/events';
import type { Appointment } from '@/types/appointments';
import { AppointmentStatus } from '@/types/appointments';

const appointment: Appointment = {
  id: '1',
  name: 'João',
  date: '2026-06-25T10:00:00.000Z',
  location: 'Sala 1',
  status: AppointmentStatus.PENDING,
  createdAt: '2026-06-25T09:00:00.000Z',
  updatedAt: '2026-06-25T09:00:00.000Z',
};

describe('isDeletedAppointment', () => {
  it('returns true for deleted appointment payloads', () => {
    expect(isDeletedAppointment({ id: '1', deleted: true })).toBe(true);
  });

  it('returns false for full appointment objects', () => {
    expect(isDeletedAppointment(appointment)).toBe(false);
  });

  it('returns false when deleted flag is missing', () => {
    expect(isDeletedAppointment({ id: '1' } as Appointment)).toBe(false);
  });

  it('returns false when deleted is not true', () => {
    expect(isDeletedAppointment({ id: '1', deleted: false } as never)).toBe(false);
  });
});
