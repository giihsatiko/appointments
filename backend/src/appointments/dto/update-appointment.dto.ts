import { IsString, IsOptional, IsDateString } from 'class-validator';

export class UpdateAppointmentDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsOptional()
  location?: string;
}
