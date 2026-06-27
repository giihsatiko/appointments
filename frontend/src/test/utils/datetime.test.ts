import { describe, expect, it } from 'vitest';
import { combineDateAndTime, isValidTimeValue } from '@/utils/datetime';

describe('isValidTimeValue', () => {
  it('accepts valid 24h times', () => {
    expect(isValidTimeValue('09:00')).toBe(true);
    expect(isValidTimeValue('23:59')).toBe(true);
  });

  it('rejects invalid times', () => {
    expect(isValidTimeValue('24:00')).toBe(false);
    expect(isValidTimeValue('9:00')).toBe(false);
    expect(isValidTimeValue('09:60')).toBe(false);
  });
});

describe('combineDateAndTime', () => {
  it('merges date and time into a single local datetime', () => {
    const date = new Date(2026, 5, 25);
    const combined = combineDateAndTime(date, '14:30');

    expect(combined.getFullYear()).toBe(2026);
    expect(combined.getMonth()).toBe(5);
    expect(combined.getDate()).toBe(25);
    expect(combined.getHours()).toBe(14);
    expect(combined.getMinutes()).toBe(30);
    expect(combined.getSeconds()).toBe(0);
  });
});
