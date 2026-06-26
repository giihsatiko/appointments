import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Appointment } from '@prisma/client';

@WebSocketGateway({ cors: true })
export class AppointmentsGateway {
  @WebSocketServer()
  server: Server;

  notifyUpdate(appointment: Appointment | { id: string; deleted: boolean }) {
    this.server.emit('appointmentUpdated', {
      serverTime: new Date().toISOString(),
      appointment,
    });
  }
}
