import {
  IsArray,
    IsDate,
    IsEnum,
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
    @IsEnum(AppointmentType)
    appointmentType: AppointmentType

    @IsArray()
    @IsOptional()
    @Transform(({ value }) => value.split(','))
    @Type(() => Array)
    @IsEnum(Specialism, { each: true })
    specialisms: Specialism[]
}