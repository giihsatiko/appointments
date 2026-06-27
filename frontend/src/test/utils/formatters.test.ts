import { describe, expect, it } from 'vitest';
import { formatDate, formatDateTime, formatTime } from '@/utils/formatters';

describe('formatters', () => {
  const iso = '2026-06-25T14:30:00.000Z';

  it('returns empty string for missing values', () => {
    expect(formatDate('')).toBe('');
    expect(formatTime('')).toBe('');
    expect(formatDateTime('')).toBe('');
  });

  it('formats date, time, and datetime in pt-BR', () => {
    const date = new Date(2026, 5, 25, 14, 30);
    const localIso = date.toISOString();

    expect(formatDate(localIso)).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    expect(formatTime(localIso)).toMatch(/\d{2}:\d{2}/);
    expect(formatDateTime(localIso)).toContain(' às ');
  });

  it('formats a known UTC instant consistently', () => {
    expect(formatDate(iso)).toBeTruthy();
    expect(formatTime(iso)).toBeTruthy();
    expect(formatDateTime(iso)).toContain(' às ');
  });
});
