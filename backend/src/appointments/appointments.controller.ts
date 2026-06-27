import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentsGateway } from './appointments.gateway';

@Controller('appointments')
export class AppointmentsController {
  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly appointmentsGateway: AppointmentsGateway,
  ) {}

  @Post()
  async create(@Body() createAppointmentDto: CreateAppointmentDto) {
    const appointment =
      await this.appointmentsService.create(createAppointmentDto);
    this.appointmentsGateway.notifyUpdate(appointment);
    return appointment;
  }

  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    const appointment = await this.appointmentsService.update(
      id,
      updateAppointmentDto,
    );
    this.appointmentsGateway.notifyUpdate(appointment);
    return appointment;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.appointmentsService.remove(id);
    this.appointmentsGateway.notifyUpdate({ id, deleted: true });
    return result;
  }

  @Post(':id/check-in')
  async checkIn(@Param('id') id: string) {
    const appointment = await this.appointmentsService.checkIn(id);
    this.appointmentsGateway.notifyUpdate(appointment);
    return appointment;
  }
}
