import { describe, expect, it } from 'vitest';
import { AppointmentStatusEnum } from '@/types/appointments';
import { formatStatus } from '@/pages/appointments/utils/format-status';

describe('formatStatus', () => {
  it('formats pending status in Portuguese', () => {
    expect(formatStatus(AppointmentStatusEnum.PENDING)).toBe('Pendente');
  });

  it('formats checked-in status in Portuguese', () => {
    expect(formatStatus(AppointmentStatusEnum.CHECKED_IN)).toBe('Realizado');
  });
});
