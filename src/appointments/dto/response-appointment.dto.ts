import { AppointmentType } from "../entities/appointment.entity"

export class AppointmentResponseDto{
    therapistName: string
    appointmentTime: Date
    appointmentDuration: number
    appointmentType: AppointmentType
}