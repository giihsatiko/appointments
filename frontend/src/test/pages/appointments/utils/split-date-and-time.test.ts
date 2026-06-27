import { describe, expect, it } from 'vitest';
import { splitDateAndTime } from '@/pages/appointments/utils/split-date-and-time';

describe('splitDateAndTime', () => {
  it('splits an ISO string into local date and HH:mm time', () => {
    const source = new Date(2026, 5, 25, 14, 30, 0, 0);
    const { date, time } = splitDateAndTime(source.toISOString());

    expect(date.getFullYear()).toBe(2026);
    expect(date.getMonth()).toBe(5);
    expect(date.getDate()).toBe(25);
    expect(time).toBe('14:30');
  });
});
