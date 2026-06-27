import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { subscribeAppointment } from '@/api/appointments/socket';
import { isDeletedAppointment } from '@/api/appointments/events';

export function useAppointmentSync(id?: string, enabled = false) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!id || !enabled) return;

    const queryKey = ['appointment', id] as const;

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
