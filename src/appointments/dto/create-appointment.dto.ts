import { IsDate, IsEnum, IsNumber } from "class-validator"
import { Type } from 'class-transformer'
import { AppointmentType } from "../entities/appointment.entity"
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
    @ApiProperty()
    @IsNumber()
    therapistId: number

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    startTime: Date

    @ApiProperty()
    @IsDate()
    @Type(() => Date)
    endTime: Date

    @ApiProperty()
    @IsEnum(AppointmentType)
    appointmentType: AppointmentType
}
