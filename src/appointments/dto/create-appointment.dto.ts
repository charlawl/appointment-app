import { IsDate, IsEnum, IsNumber } from "class-validator"
import { Type } from 'class-transformer'
import { AppointmentType } from "../entities/appointment.entity"

export class CreateAppointmentDto {
    @IsNumber()
    therapistId: number

    @IsDate()
    @Type(() => Date)
    startTime: Date

    @IsDate()
    @Type(() => Date)
    endTime: Date

    @IsEnum(AppointmentType)
    appointmentType: AppointmentType
}
