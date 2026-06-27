import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { combineDateAndTime } from '@/utils/datetime';
import type { AppointmentMutations } from '@/pages/appointments/hooks/use-appointment-mutations';
import { useAppointmentModal } from '@/pages/appointments/hooks/use-appointment-modal';

const mockUseAppointment = vi.fn();
const mockUseAppointmentSync = vi.fn();

vi.mock('@/pages/appointments/hooks/use-appointment', () => ({
  useAppointment: (...args: unknown[]) => mockUseAppointment(...args),
}));

vi.mock('@/pages/appointments/hooks/use-appointment-sync', () => ({
  useAppointmentSync: (...args: unknown[]) => mockUseAppointmentSync(...args),
}));

function createMutations(): AppointmentMutations {
  return {
    create: {
      mutate: vi.fn(),
      isPending: false,
    },
    update: {
      mutate: vi.fn(),
      isPending: false,
    },
    remove: vi.fn(),
    removeAsync: vi.fn(),
    isDeleting: false,
    deletingId: null,
    checkIn: vi.fn(),
    checkInAsync: vi.fn(),
    isCheckingIn: false,
    checkingInId: null,
  } as unknown as AppointmentMutations;
}

describe('useAppointmentModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAppointment.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
    });
  });

  it('handles missing view safely', () => {
    const mutations = createMutations();

    const { result } = renderHook(() => useAppointmentModal(null, mutations));

    expect(result.current.form.editingId).toBeUndefined();
    expect(result.current.detail.viewingId).toBeUndefined();
    expect(mockUseAppointmentSync).toHaveBeenCalledWith(undefined, false);
  });

  it('differentiates create vs update based on formId', () => {
    const mutations = createMutations();

    const { result: createResult } = renderHook(() =>
      useAppointmentModal({ mode: 'form' }, mutations),
    );
    const { result: updateResult } = renderHook(() =>
      useAppointmentModal({ mode: 'form', id: 'appt-1' }, mutations),
    );

    expect(createResult.current.form.editingId).toBeUndefined();
    expect(updateResult.current.form.editingId).toBe('appt-1');
    expect(mockUseAppointment).toHaveBeenCalledWith(undefined, false);
    expect(mockUseAppointment).toHaveBeenCalledWith('appt-1', true);
  });

  it('calls create mutation with correct payload when creating', () => {
    const mutations = createMutations();
    const onSuccess = vi.fn();
    const date = new Date(2026, 5, 25);
    const time = '10:30';

    const { result } = renderHook(() => useAppointmentModal({ mode: 'form' }, mutations));

    act(() => {
      result.current.form.submit(
        {
          name: 'João',
          date,
          time,
          location: 'Sala 1',
        },
        onSuccess,
      );
    });

    expect(mutations.create.mutate).toHaveBeenCalledWith(
      {
        name: 'João',
        location: 'Sala 1',
        date: combineDateAndTime(date, time).toISOString(),
      },
      { onSuccess },
    );
    expect(mutations.update.mutate).not.toHaveBeenCalled();
  });

  it('calls update mutation with correct payload when editing', () => {
    const mutations = createMutations();
    const onSuccess = vi.fn();
    const date = new Date(2026, 5, 26);
    const time = '15:00';

    const { result } = renderHook(() =>
      useAppointmentModal({ mode: 'form', id: 'appt-1' }, mutations),
    );

    act(() => {
      result.current.form.submit(
        {
          name: 'Maria',
          date,
          time,
          location: 'Sala 2',
        },
        onSuccess,
      );
    });

    expect(mutations.update.mutate).toHaveBeenCalledWith(
      {
        id: 'appt-1',
        data: {
          name: 'Maria',
          location: 'Sala 2',
          date: combineDateAndTime(date, time).toISOString(),
        },
      },
      { onSuccess },
    );
    expect(mutations.create.mutate).not.toHaveBeenCalled();
  });

  it('enables live sync only for detail view', () => {
    const mutations = createMutations();

    renderHook(() => useAppointmentModal({ mode: 'detail', id: 'appt-1' }, mutations));

    expect(mockUseAppointmentSync).toHaveBeenCalledWith('appt-1', true);
  });
});
