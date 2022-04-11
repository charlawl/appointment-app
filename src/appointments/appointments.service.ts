import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, SelectQueryBuilder } from 'typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { RequestAppointmentsDto } from './dto/request-appointments.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';
import { Therapist } from './entities/therapist.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,

    @InjectRepository(Therapist)
    private therapistRepository: Repository<Therapist>
  ) {

    this.appointmentRepository = appointmentRepository
    this.therapistRepository = therapistRepository
  }

  findAll(): Promise<Appointment[]>{
    return this.appointmentRepository.find();
  }

  //NOTE: Composing conditions to filter appointments by optional parameters; date, type and specialism
  findBy(dto: RequestAppointmentsDto){
    var qb = this.appointmentRepository.createQueryBuilder("appointment").leftJoinAndSelect("appointment.therapist", "therapist")
    this.filterByDateRange(qb, dto)
    this.filterByAppointmentType(qb, dto)
    this.filterBySpecialism(qb, dto)
    //LOG: appointment found for the following criteria {dto}
    return qb.getMany()
  }

  filterByDateRange(builder: SelectQueryBuilder<Appointment>, {startDate, endDate}: RequestAppointmentsDto) : any { 
    //TODO: return findby Option instead of any
    if(!startDate || !endDate){
      return builder;
    }
    return builder.where("appointment.startTime >= :startDate", {startDate: startDate})
                  .andWhere("appointment.endTime <= :endDate", {endDate: endDate});
  }

  filterByAppointmentType(builder: SelectQueryBuilder<Appointment>, {appointmentType}: RequestAppointmentsDto) : any { 
    //TODO: return findby Option instead of any
    if(!appointmentType){
      return builder;
    }
    return builder.where("appointment.appointmentType = :appointmentType", {appointmentType: appointmentType});
  }

  filterBySpecialism(builder: SelectQueryBuilder<Appointment>, {specialisms}: RequestAppointmentsDto) : any { 
    //TODO: return findby Option instead of any
    if(!specialisms){
      return builder;
    }
    return builder.where("therapist.specialisms && (:specialisms)", {specialisms: specialisms});
  }

  async create(createAppointmentDto: CreateAppointmentDto){
    //NOTE:lots of awaiting - this could be more efficient
    //should be using query builder here to send one single query to the DB to minimize reads

    const therapist = await this.therapistRepository.findOne({where: {id: createAppointmentDto.therapistId}, relations: ['appointments']});
    const appointment = this.appointmentRepository.create(createAppointmentDto);

    
    //NOTE: Don't think I should be raising a HTTP exception at the service level
    if(appointment.conflicts(therapist.appointments)){
      //LOG: appointment conflicts for this slot
      throw new HttpException("This appointment conflicts with another", HttpStatus.CONFLICT)
    }

    therapist.appointments.push(appointment);
    await this.therapistRepository.save(therapist);
    //LOG: appointment created for {therapist}
    return appointment;
  }

  async findOne(findOne: FindOneOptions<Appointment>) {
    return await this.appointmentRepository.find(findOne);
  }

  //NOTE: left in the other service methods for extensibility in the future
  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
