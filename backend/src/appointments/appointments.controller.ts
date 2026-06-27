import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentsGateway } from './appointments.gateway';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

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
  findAll(@Query() query: PaginationQueryDto) {
    return this.appointmentsService.findAll(query);
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

  @Post(':id/poll')
  poll(@Param('id') id: string) {
    return this.appointmentsService.poll(id);
  }
}
