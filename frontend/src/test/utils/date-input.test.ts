import { describe, expect, it } from 'vitest';
import { formatMaskedDate, maskDateInput, parseMaskedDate } from '@/utils/date-input';

describe('maskDateInput', () => {
  it('masks digits as dd/mm/yyyy', () => {
    expect(maskDateInput('25122026')).toBe('25/12/2026');
    expect(maskDateInput('25')).toBe('25');
  });
});

describe('formatMaskedDate', () => {
  it('formats a date as dd/mm/yyyy', () => {
    expect(formatMaskedDate(new Date(2026, 11, 25))).toBe('25/12/2026');
  });
});

describe('parseMaskedDate', () => {
  it('parses a valid masked date', () => {
    const parsed = parseMaskedDate('25/12/2026');

    expect(parsed).toEqual(new Date(2026, 11, 25));
  });

  it('returns null for invalid dates', () => {
    expect(parseMaskedDate('31/02/2026')).toBeNull();
    expect(parseMaskedDate('25/12')).toBeNull();
  });
});
