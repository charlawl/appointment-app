import {
  IsArray,
    IsDate,
    IsDateString,
    IsOptional
  } from 'class-validator';
import { Type, Transform } from 'class-transformer'
import { AppointmentType } from '../entities/appointment.entity';
import { Specialism } from '../entities/therapist.entity';

export class RequestAppointmentsDto{
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    startDate: Date;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    endDate: Date;

    @IsOptional()
    appointmentType: AppointmentType

    @IsArray()
    @IsOptional()
    @Transform(({ value }) => value.split(','))
    @Type(() => Array)
    specialisms: Specialism[]
}