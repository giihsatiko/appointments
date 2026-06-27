import axios from 'axios';
import { describe, expect, it } from 'vitest';
import { getApiErrorMessage } from '@/utils/api-error';

describe('getApiErrorMessage', () => {
  it('returns API message from axios errors', () => {
    const error = new axios.AxiosError(
      'Request failed',
      'ERR_BAD_REQUEST',
      undefined,
      undefined,
      {
        data: { message: 'Conflito de horário' },
        status: 409,
        statusText: 'Conflict',
        headers: {},
        config: { headers: new axios.AxiosHeaders() },
      },
    );

    expect(getApiErrorMessage(error, 'Fallback')).toBe('Conflito de horário');
  });

  it('joins array messages from axios errors', () => {
    const error = new axios.AxiosError(
      'Request failed',
      'ERR_BAD_REQUEST',
      undefined,
      undefined,
      {
        data: { message: ['Erro 1', 'Erro 2'] },
        status: 400,
        statusText: 'Bad Request',
        headers: {},
        config: { headers: new axios.AxiosHeaders() },
      },
    );

    expect(getApiErrorMessage(error, 'Fallback')).toBe('Erro 1, Erro 2');
  });

  it('returns fallback for unknown errors', () => {
    expect(getApiErrorMessage(new Error('boom'), 'Fallback')).toBe('Fallback');
  });
});
