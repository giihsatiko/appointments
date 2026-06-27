import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Appointment } from '@prisma/client';
import { AppointmentsService } from './appointments.service';

export const APPOINTMENT_UPDATED_EVENT = 'appointmentUpdated';

export type AppointmentUpdatedPayload = {
  serverTime: string;
  appointment: Appointment | { id: string; deleted: true };
};

@WebSocketGateway({ cors: { origin: true } })
export class AppointmentsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly appointmentsService: AppointmentsService) {}

  @SubscribeMessage('subscribeAppointment')
  async handleSubscribe(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { appointmentId: string },
  ): Promise<AppointmentUpdatedPayload> {
    const room = this.getAppointmentRoom(data.appointmentId);
    await client.join(room);

    const appointment = await this.appointmentsService.findOne(data.appointmentId);

    return {
      serverTime: new Date().toISOString(),
      appointment,
    };
  }

  @SubscribeMessage('unsubscribeAppointment')
  handleUnsubscribe(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { appointmentId: string },
  ) {
    client.leave(this.getAppointmentRoom(data.appointmentId));
  }

  notifyUpdate(appointment: Appointment | { id: string; deleted: true }) {
    const payload: AppointmentUpdatedPayload = {
      serverTime: new Date().toISOString(),
      appointment,
    };

    this.server
      .to(this.getAppointmentRoom(appointment.id))
      .emit(APPOINTMENT_UPDATED_EVENT, payload);
  }

  private getAppointmentRoom(appointmentId: string) {
    return `appointment:${appointmentId}`;
  }
}
