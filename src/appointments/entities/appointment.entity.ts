import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne } from 'typeorm';
import { Therapist } from './therapist.entity';

export enum AppointmentType{
    ONEOFF = "oneOff",
    CONSULTATION = "consultation"
}

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default:null})
    clientId: string;

    @Column()
    duration: number;

    @Column()
    startDate: Date

    @Column({
        type:"enum",
        enum: AppointmentType,
    })
    appointmentType: AppointmentType

    @ManyToOne(type => Therapist, therapist => therapist.appointments, {cascade: true})
    therapist: Therapist 
}
