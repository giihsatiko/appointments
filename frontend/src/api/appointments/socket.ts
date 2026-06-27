import { getSocket } from '@/lib/socket';
import { APPOINTMENT_UPDATED_EVENT } from './events';
import type { AppointmentUpdatedPayload } from './types';

export function subscribeAppointment(
  id: string,
  onUpdate: (payload: AppointmentUpdatedPayload) => void,
) {
  const socket = getSocket();

  if (!socket.connected) {
    socket.connect();
  }

  const handler = (payload: AppointmentUpdatedPayload) => {
    if (payload.appointment.id !== id) return;
    onUpdate(payload);
  };

  socket.on(APPOINTMENT_UPDATED_EVENT, handler);

  socket.emit('subscribeAppointment', { appointmentId: id });

  return () => {
    socket.emit('unsubscribeAppointment', { appointmentId: id });
    socket.off(APPOINTMENT_UPDATED_EVENT, handler);
  };
}
