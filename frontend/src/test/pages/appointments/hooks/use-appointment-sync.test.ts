import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { AppointmentUpdatedPayload } from '@/api/appointments/types';
import type { Appointment } from '@/types/appointments';
import { createQueryWrapper, createTestQueryClient } from '@/test/query-wrapper';
import { useAppointmentSync } from '@/pages/appointments/hooks/use-appointment-sync';

const mockUnsubscribe = vi.fn();
const mockSubscribeAppointment = vi.fn();

vi.mock('@/api/appointments/socket', () => ({
  subscribeAppointment: (...args: unknown[]) => mockSubscribeAppointment(...args),
}));

const appointment: Appointment = {
  id: 'appt-1',
  name: 'Maria',
  date: '2026-06-25T10:00:00.000Z',
  location: 'Sala 2',
  status: 'PENDING',
  createdAt: '2026-06-25T09:00:00.000Z',
  updatedAt: '2026-06-25T09:00:00.000Z',
};

function getUpdateHandler() {
  const [, onUpdate] = mockSubscribeAppointment.mock.calls.at(-1) as [
    string,
    (payload: AppointmentUpdatedPayload) => void,
  ];

  return onUpdate;
}

describe('useAppointmentSync', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSubscribeAppointment.mockReturnValue(mockUnsubscribe);
  });

  it('calls subscribeAppointment on mount when enabled', () => {
    renderHook(() => useAppointmentSync('appt-1', true), {
      wrapper: createQueryWrapper(),
    });

    expect(mockSubscribeAppointment).toHaveBeenCalledWith('appt-1', expect.any(Function));
  });

  it('does not subscribe when disabled or id is missing', () => {
    renderHook(() => useAppointmentSync(undefined, true), {
      wrapper: createQueryWrapper(),
    });
    renderHook(() => useAppointmentSync('appt-1', false), {
      wrapper: createQueryWrapper(),
    });

    expect(mockSubscribeAppointment).not.toHaveBeenCalled();
  });

  it('calls unsubscribe on unmount', () => {
    const { unmount } = renderHook(() => useAppointmentSync('appt-1', true), {
      wrapper: createQueryWrapper(),
    });

    unmount();

    expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
  });

  it('updates React Query cache when receiving appointment updates', async () => {
    const queryClient = createTestQueryClient();
    const setQueryData = vi.spyOn(queryClient, 'setQueryData');

    renderHook(() => useAppointmentSync('appt-1', true), {
      wrapper: createQueryWrapper(queryClient),
    });

    const onUpdate = getUpdateHandler();
    onUpdate({
      serverTime: '2026-06-25T10:00:00.000Z',
      appointment,
    });

    await waitFor(() => {
      expect(setQueryData).toHaveBeenCalledWith(['appointment', 'appt-1'], appointment);
    });
  });

  it('removes query when appointment is deleted', async () => {
    const queryClient = createTestQueryClient();
    const removeQueries = vi.spyOn(queryClient, 'removeQueries');

    renderHook(() => useAppointmentSync('appt-1', true), {
      wrapper: createQueryWrapper(queryClient),
    });

    const onUpdate = getUpdateHandler();
    onUpdate({
      serverTime: '2026-06-25T10:00:00.000Z',
      appointment: { id: 'appt-1', deleted: true },
    });

    await waitFor(() => {
      expect(removeQueries).toHaveBeenCalledWith({ queryKey: ['appointment', 'appt-1'] });
    });
  });
});
