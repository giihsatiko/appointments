import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { AppointmentStatus, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { createPaginatedResponse } from '../common/interfaces/paginated-response.interface';
import { AppointmentPollResponse } from '../common/interfaces/appointment-poll-response.interface';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const { name, date, location } = createAppointmentDto;

    const existing = await this.prisma.appointment.findFirst({
      where: {
        date: new Date(date),
        location,
      },
    });

    if (existing) {
      throw new ConflictException(
        'Já existe um agendamento para este horário e local.',
      );
    }

    return this.prisma.appointment.create({
      data: {
        name,
        date: new Date(date),
        location,
      },
    });
  }

  async findAll(query: PaginationQueryDto) {
    const { page, limit } = query;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.appointment.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.appointment.count(),
    ]);

    return createPaginatedResponse(data, page, limit, total);
  }

  async findOne(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
    });

    if (!appointment) {
      throw new NotFoundException('Agendamento não encontrado.');
    }

    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.findOne(id);

    if (updateAppointmentDto.date || updateAppointmentDto.location) {
      const date = updateAppointmentDto.date
        ? new Date(updateAppointmentDto.date)
        : appointment.date;
      const location = updateAppointmentDto.location || appointment.location;

      const existing = await this.prisma.appointment.findFirst({
        where: {
          date,
          location,
          id: { not: id },
        },
      });

      if (existing) {
        throw new ConflictException(
          'Já existe um agendamento para este horário e local.',
        );
      }
    }

    const data: Prisma.AppointmentUpdateInput = { ...updateAppointmentDto };
    if (updateAppointmentDto.date) {
      data.date = new Date(updateAppointmentDto.date);
    }

    return this.prisma.appointment.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.appointment.delete({
      where: { id },
    });
  }

  async checkIn(id: string) {
    await this.findOne(id);
    return this.prisma.appointment.update({
      where: { id },
      data: { status: AppointmentStatus.CHECKED_IN },
    });
  }

  async poll(id: string): Promise<AppointmentPollResponse> {
    const appointment = await this.findOne(id);

    return {
      serverTime: new Date().toISOString(),
      appointment,
    };
  }
}
