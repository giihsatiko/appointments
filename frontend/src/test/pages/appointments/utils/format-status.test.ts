import { AppointmentStatus } from '@/types/appointments';
import { formatStatus } from '@/pages/appointments/utils/format-status';

describe('formatStatus', () => {
  it('formats pending status in Portuguese', () => {
    expect(formatStatus(AppointmentStatus.PENDING)).toBe('Pendente');
  });

  it('formats checked-in status in Portuguese', () => {
    expect(formatStatus(AppointmentStatus.CHECKED_IN)).toBe('Realizado');
  });
});
