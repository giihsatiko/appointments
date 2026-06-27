import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { subscribeAppointment } from '@/api/appointments/socket';
import { isDeletedAppointment } from '@/api/appointments/events';
import { appointmentKeys } from './query-keys';

export function useAppointmentSync(id?: string, enabled = false) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!id || !enabled) return;

    const queryKey = appointmentKeys.detail(id);

    const unsubscribe = subscribeAppointment(id, (payload) => {
      const appointment = payload.appointment;

      if (isDeletedAppointment(appointment)) {
        queryClient.removeQueries({ queryKey });
        return;
      }

      queryClient.setQueryData(queryKey, appointment);
    });

    return () => {
      unsubscribe();
    };
  }, [id, enabled, queryClient]);
}
