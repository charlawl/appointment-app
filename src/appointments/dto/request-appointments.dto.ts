import {
  ArrayNotEmpty,
  IsArray,
    IsDate,
    IsEnum,
    IsOptional
  } from 'class-validator';
import { Type, Transform } from 'class-transformer'
import { AppointmentType } from '../entities/appointment.entity';
import { Specialism } from '../entities/therapist.entity';
import { ApiProperty } from '@nestjs/swagger';

export class RequestAppointmentsDto{
    @ApiProperty()
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    startDate: Date;

    @ApiProperty()
    @IsDate()
    @IsOptional()
    @Type(() => Date)
    endDate: Date;

    @ApiProperty()
    @IsOptional()
    @IsEnum(AppointmentType)
    appointmentType: AppointmentType

    @ApiProperty()
    @IsArray()
    @IsOptional()
    @Transform(({ value }) => value.split(','))
    @Type(() => Array)
    @IsEnum(Specialism, { each: true })
    specialisms: Specialism[]
}