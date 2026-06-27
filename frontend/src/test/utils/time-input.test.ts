import { describe, expect, it } from 'vitest';
import { maskTimeInput, normalizeTimeInput } from '@/utils/time-input';

describe('maskTimeInput', () => {
  it('masks digits as HH:mm', () => {
    expect(maskTimeInput('0930')).toBe('09:30');
    expect(maskTimeInput('09')).toBe('09');
  });
});

describe('normalizeTimeInput', () => {
  it('returns empty string for empty input', () => {
    expect(normalizeTimeInput('')).toBe('');
    expect(normalizeTimeInput('   ')).toBe('');
  });

  it('keeps already normalized values', () => {
    expect(normalizeTimeInput('09:30')).toBe('09:30');
  });

  it('normalizes partial numeric input', () => {
    expect(normalizeTimeInput('9')).toBe('09:00');
    expect(normalizeTimeInput('930')).toBe('93:00');
  });
});
