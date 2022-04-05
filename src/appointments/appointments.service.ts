import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, QueryBuilder, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { RequestAppointmentsDto } from './dto/request-appointments.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment, AppointmentType } from './entities/appointment.entity';
import { Specialism } from './entities/therapist.entity';



@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>
  ) {}

  findAll(): Promise<Appointment[]>{
    return this.appointmentRepository.find();
  }

  //Composing conditions to filter
  findBy(dto: RequestAppointmentsDto){
    var qb = this.appointmentRepository.createQueryBuilder("appointment").leftJoinAndSelect("appointment.therapist", "therapist")
    this.filterByDateRange(qb, dto)
    this.filterByAppointmentType(qb, dto)
    this.filterBySpecialism(qb, dto)
    return qb.getMany()
  }

  filterByDateRange(builder: SelectQueryBuilder<Appointment>, {startDate, endDate}: RequestAppointmentsDto) : any { 
    //TODO: return findby Option instead of any
    if(!startDate || !endDate){
      return builder
    }

    return builder.where("appointment.startTime > :startDate", {startDate: startDate})
                  .andWhere("appointment.endTime < :endDate", {endDate: endDate})
  }

  filterByAppointmentType(builder: SelectQueryBuilder<Appointment>, {appointmentType}: RequestAppointmentsDto) : any { 
    //TODO: return findby Option instead of any
    if(!appointmentType){
      return builder
    }
    return builder.where("appointment.appointmentType = :appointmentType", {appointmentType: appointmentType})
  }

  filterBySpecialism(builder: SelectQueryBuilder<Appointment>, {specialisms}: RequestAppointmentsDto) : any { 
    //TODO: return findby Option instead of any
    if(!specialisms){
      return builder
    }
    return builder.where("therapist.specialisms && (:specialisms)", {specialisms: specialisms})
  }

  create(createAppointmentDto: CreateAppointmentDto) {
    return 'This action adds a new appointment';
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
