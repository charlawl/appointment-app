import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository, SelectQueryBuilder } from 'typeorm';
import { domainToASCII } from 'url';
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
      return builder;
    }

    return builder.where("appointment.startTime > :startDate", {startDate: startDate})
                  .andWhere("appointment.endTime < :endDate", {endDate: endDate});
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
    //lots of awaiting - this could be more efficient
    //should be using query builder here to send one single query to the DB to minimize reads

    // var qb = builder.where("therapist.id = :createAppointmentDto.therapistId",{relations: ['appointments']})
    // var x = qb.insert().into(Therapist).values(appointment)

    const appointment = this.appointmentRepository.create(createAppointmentDto);
    const therapist = await this.therapistRepository.findOne({where: {id: createAppointmentDto.therapistId}, relations: ['appointments']});
    therapist.appointments.push(appointment);
    await this.therapistRepository.save(therapist);
    return appointment;
  }

  findOne(findOne: FindOneOptions<Appointment>) {
    return this.appointmentRepository.find(findOne);
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
